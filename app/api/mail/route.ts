

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        console.log('just entered the API')// initial debug statement
        const { email, subject, message } = await req.json();

        if (!email || !subject || !message) {
            return NextResponse.json({ error: 'Please provide all the required fields.' }, { status: 400 });
        }
 
        
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.SMTP_USER, 
                pass: process.env.SMTP_PASS, 
            },
        });    
         
        // Send the email using nodemailer
        await transporter.sendMail({
            from: process.env.SMTP_USER, 
            to: email,                    
            subject: subject,              
            html: message,                 
        });

        // Return a success response
        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }
}
