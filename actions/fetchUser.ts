
'use server';

import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export async function fetchUser() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        console.log('Cookie not present || User not logged in... middleware malfunctioned');
        return null;
    }

    try {
        const user = jwt.verify(token, 'JWT_SECRET');
        return user;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}
