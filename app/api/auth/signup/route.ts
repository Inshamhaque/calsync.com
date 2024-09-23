import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import client from '@/prisma/index'
export async function POST(req:NextRequest){
    const {username,password,mail} = await req.json();
    const hashedpassword = await  bcrypt.hash(password,10);
    //check if user exists or not
    try{
        //checking if user exists or not 
        const existing_user = await client.user.findFirst({
            where :{
                mail
            }
        })
        if(existing_user){
            return NextResponse.json({
                message : "user already exists, try logging in",
                status : 404
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
            return NextResponse.json({
                msg : "Try again later",
                status : 402
            })
        }
        return NextResponse.json({
            msg : "user created successfully",
            status : 200
        })

    }
    catch(e){
        return NextResponse.json({
            message : 'some error occurred',
            status : 500
        })

    }
}