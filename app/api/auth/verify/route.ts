import client from "@/prisma/index";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    const { mail, otp } = await req.json();

    try {
        console.log('Received OTP from client: ', otp); // debug 2 
        console.log('Received mail from client: ', mail); // debug 1 

        // Find the user by mail
        const res = await client.user.findFirst({
            where: {
                mail
            },
            include: {
                otp: true 
            }
        });

        if (!res) {
            return NextResponse.json({
                message: 'User not found',
                status: 404
            });
        }

        console.log('Stored OTP in database: ', res.otp.number); // clearer debugging

        // otp verification 
        if (String(otp) == String(res.otp.number)) {
            await client.user.update({
                where: {
                    username: res.username
                },
                data: {
                    is_verified: true
                }
            });

            console.log('User verified successfully'); // debugging 
            const payload = {
                mail: res.mail,
                username: res.username
            };
            const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
            const token = jwt.sign(payload, JWT_SECRET || '');

            const response = NextResponse.json({
                message: "User verified successfully",
                status: 200
            });

            response.cookies.set('token', token, {
                path: '/',
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', // true in production, false in development
                maxAge: 60 * 60 
            });

            return response;
        }

        // invalid otp
        return NextResponse.json({
            message: 'Invalid OTP',
            status: 400
        });

    } catch (e) {
        console.error('Error occurred:', e); 

        return NextResponse.json({
            message: "Internal server error",
            status: 500
        });
    }
}
