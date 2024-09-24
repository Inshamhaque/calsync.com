'use client';
import { OTPbox } from "@/components/auth/OTPbox";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export const OTPClient = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const [time, setTime] = useState(60);
    const [otp, setOtp] = useState<number>(0);
    const [mail, setMail] = useState<string | null>(null); // Use state to manage mail
    const [canresend,setcanresend] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedMail = localStorage.getItem('mail :');
        setMail(storedMail);
    }, []);

    const error = () => {
        return toast.error('Invalid OTP', {
            position: 'top-right',
            delay: 5000
        });
    };
    // not in use tho 
    const success = () => {
        return toast.success('User verified', {
            position: 'top-right',
            delay: 5000
        });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        
        return () => {
            clearInterval(timer);
        };
    }, []);

    const onClickHandler = async () => {
        if (!mail) {
            error(); // Handle case where mail is not available
            return;
        }

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/verify`, {
                mail,
                otp
            });
            if (res.data.status === 200) {
                router.push(`${BASE_URL}/home`);
                success();
                localStorage.setItem('flag','Welcome user')
                console.log('User verified');
                return;
            }
            error();
            console.log('Invalid OTP');
        } catch (err) {
            console.error('Error verifying OTP:', err);
            error();
        }
    };
    // try again click handler
    const resendOtp = async () => {
        if (!mail) {
            error(); 
            return;
        }
        if(time!=0){
            return;
        }
        try {
            await axios.post(`${BASE_URL}/api/auth/resend`, { mail }); 
            toast.success('OTP resent successfully!', {
                position: 'top-right',
                delay: 5000
            });
            setTime(60); 
            setcanresend(false);
        } catch (err) {
            console.error('Error resending OTP:', err);
            toast.error('Failed to resend OTP.', {
                position: 'top-right',
                delay: 5000
            });
        }
    };
    return (
        <div className="flex justify-center items-center m-20">
            <div className="flex-col justify-center items-center border bg-gray-800 p-10 rounded-md">
                {/* CTA */}
                <div className="mb-10">
                    <h2 className="font-bold text-xl text-center">Check your email</h2>
                    <p className="text-xs text-gray-400">We've sent an email to {mail}. Kindly verify by entering the OTP.</p>
                </div>
                {/* OTP box */}
                <div className="flex justify-center mb-10">
                    <OTPbox setotp={setOtp} />
                </div>
                <div className={`flex justify-center text-sm mb-10 text-gray-400 ${time === 0 ? 'hover:cursor-pointer' : null}`}>
                    {time > 0 ? `Try again after 00:00:${time > 9 ? time : `0${time}`}` : 
                        <button className="text-blue-500 hover:cursor-pointer" onClick={resendOtp}>
                            Resend OTP
                        </button>}
                </div>
                <div>
                    <button className="w-full bg-blue-500 rounded-lg p-2 hover:bg-blue-600" onClick={onClickHandler}>VERIFY</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
