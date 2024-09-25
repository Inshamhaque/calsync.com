import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import client from '@/prisma/index'
import { z } from 'zod';
import { signinschema } from "@/support/zodschema";
export async function POST(req:NextRequest){
    const {password,mail} = await req.json();
    const hashedpassword = await  bcrypt.hash(password,10);
    //check if user exists or not
    try{
        //input validation using zod
        const result = signinschema.safeParse({
            mail,
            password
        })
        if(!result.success){
            return NextResponse.json({
                message : " Input validation failed",
                status : 411
            })
        }
        //checking if user exists or not 
        const existing_user = await client.user.findUnique({
            where :{
                mail
            },
            include : {
                otp : true
            }
        })
        if(!existing_user){
            return NextResponse.json({
                message : "user does not exists, try signing up",
            },{
                status : 404
            })
        }
        // else create a new user 
        //generate a random otp .. this syntax ensures that always 4 digit substring is generated
        const otp = Math.floor(Math.random()*10000+10000).toString().substring(1);
        const expiryMinutes = 10;//minutes 
        const expirydate = new Date(Date.now()+10*60*1000);
        const dbpassword = existing_user?.password;
        const currDate = new Date(Date.now());
        const success = await bcrypt.compare(password,dbpassword);
        if(!success){
            return NextResponse.json({
                message : "incorrect password"
            },{
                status : 411
            })
        }
        // if password matches, then :- 
        const updateOTP = await client.user.update({
            where: {
                mail,
            },
            data: {
                otp: {
                    update: {
                        number: otp,
                        expiry_At: expirydate,
                        created_At: currDate,
                    },
                },
            },
        });
        if(!updateOTP){
            return NextResponse.json({
                message : 'OTP update problem',
            },{
                status : 500
            })
        }
        return NextResponse.json({
            msg : 'User authenticated successfully',
            otp : otp
        },{
            status : 200
        })
    }
    catch(e){
        return NextResponse.json({
            message : 'some error occurred:' + e,
            status : 500
        })

    }
}