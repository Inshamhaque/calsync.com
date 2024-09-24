import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import client from '@/prisma';

export async function POST(req: NextRequest) {
    try {
        console.log('Resend OTP API invoked'); // Debug statement
        const { mail } = await req.json();

        if (!mail) {
            return NextResponse.json({ error: 'Please provide the email.' }, { status: 400 });
        }

        // Create a transporter using your SMTP credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or another email provider like SMTP
            auth: {
                user: process.env.SMTP_USER, // Your SMTP username (Gmail or other)
                pass: process.env.SMTP_PASS, // Your SMTP password (Gmail or other)
            },
        });

        // Prepare your OTP message
        const otp = generateOtp();
        const message = `
            <h1>Your OTP Code</h1>
            <p>Your OTP code is: <strong>${otp}</strong></p>
            <p>Please enter this code to verify your email.</p>
        `;

        // Send the email using nodemailer
        await transporter.sendMail({
            from: process.env.SMTP_USER, // Sender's email address
            to: mail,                    // Recipient's email address
            subject: 'Resend OTP',        // Subject of the email
            html: message,                 // Email content
        });

        // Update the OTP in the database
        const expirydate = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
        const createdAt = new Date(Date.now());

        const update = await client.user.update({
            where: {
                mail,
            },
            data: {
                otp: {
                    update: {
                        number: otp,
                        expiry_At: expirydate,
                        created_At: createdAt,
                    },
                },
            },
        });

        // Check if the update was successful
        if (!update) {
            return NextResponse.json({
                msg: 'Cannot resend OTP',
                status: 411,
            });
        }

        return NextResponse.json({
            msg: 'OTP resent',
            status: 200,
        });
    } catch (error) {
        console.error('Error resending OTP:', error);
        return NextResponse.json({ error: 'Failed to resend OTP.' }, { status: 500 });
    }
}

// Function to generate a 6-digit OTP
function generateOtp() {
    return Math.floor(10000 + Math.random() * 10000).toString().substring(1); // Generate a 6-digit OTP
}
