

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        console.log('just entered the API')// initial debug statement
        const { email, subject, message } = await req.json();

        if (!email || !subject || !message) {
            return NextResponse.json({ error: 'Please provide all the required fields.' }, { status: 400 });
        }
 
        // Create a transporter using your SMTP credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or another email provider like SMTP
            auth: {
                user: process.env.SMTP_USER, // Your SMTP username (Gmail or other)
                pass: process.env.SMTP_PASS, // Your SMTP password (Gmail or other)
            },
        });    
         
        // Send the email using nodemailer
        await transporter.sendMail({
            from: process.env.SMTP_USER, // Sender's email address
            to: email,                    // Recipient's email address
            subject: subject,              // Subject of the email
            html: message,                 // Plaian text message
        });

        // Return a success response
        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }
}
