import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import client from '@/prisma/index'
import { signupschema } from "@/support/zodschema";
export async function POST(req:NextRequest){
    const {username,password,mail} = await req.json();
    const hashedpassword = await  bcrypt.hash(password,10);
    //check if user exists or not
    try{
        //input validation using zod
        const result = signupschema.safeParse({
            username,
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
        const existing_user = await client.user.findFirst({
            where :{
                mail
            }
        })
        if(existing_user){
            return NextResponse.json({
                message : "user already exists, try logging in",
                status : 409
            })
        }
        // else create a new user 
        //generate a random otp .. this syntax ensures that always 4 digit substring is generated
        const otp = Math.floor(Math.random()*10000+10000).toString().substring(1);
        const expiryMinutes = 10;//minutes 
        const expirydate = new Date(Date.now()+10*60*1000);

        const new_user = await client.user.create({
            data : {
                username,
                mail,
                password : hashedpassword,
                otp :{
                    create :{
                        expiry_At : expirydate,
                        number : otp
                    }
                }
            }
        });
        if(!new_user){
            console.log('user not created');
            return NextResponse.json({
                msg : "Try again later",
                status : 422
            })
        }
        console.log('user created successfully');
        return NextResponse.json({
            msg : "user created successfully",
            otp : otp,
            status : 200
        })
        

    }
    catch(e){
        console.log('error occurred while signing up'+e);
        return NextResponse.json({
            message : 'some error occurred:' + e,
            status:500
        })
        
    }
}