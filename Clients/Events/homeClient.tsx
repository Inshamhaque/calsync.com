'use client';

import { fetchUser as fetchUserAction } from "@/actions/fetchUser";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../Clients.css'

interface User {
    mail: string;
    username: string;
}

export const EventClient = () => {
    const [user, setUser] = useState<User>({
        mail: '',
        username: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await fetchUserAction();
                if (userData) {
                    const { mail, username } = userData as User;
                    setUser({ mail, username }); 
                } else {
                    toast.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                toast.error('Error fetching user data');
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="p-3 h-screen bg-gradient-to-b from-blue-900 to-slate-800">
            {/* Header */}
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-red-900 bg-clip-text text-transparent">Your Events</h1>
                    {user.username ? (
                        <p className="text-xl">Welcome, {user.username}</p>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
                <div className="flex items-center">
                    <button className="event-search-button">
                        Find events near you 
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
