'use client'
import { OTPbox } from "@/components/auth/OTPbox"
import { useEffect, useState } from "react";
export const OTPClient = ()=>{
    const [time,settime] = useState(60);
    useEffect(()=>{
        const timer = setInterval(()=>{
            settime((prevtime)=>(prevtime>0?prevtime-1:0));
        },1000)
        return ()=>{
            clearInterval(timer)
        } 
    },[])
    return(
        <div className="flex justify-center items-center m-20">
            <div className="flex-col justify-center items-center border bg-gray-800 p-10 rounded-md">
                {/* CTA */}
                <div className="mb-10">
                    <h2 className="font-bold text-xl text-center">Check your email</h2>
                    <p className="text-xs text-gray-400">We've sent an email to __put mail id here__. Kindly verify by entering the OTP.</p>
                </div>
                {/* OTP box */}
                <div className="flex justify-center mb-10 ">
                    < OTPbox />
                </div>
                <div className={`flex justify-center text-sm mb-10 text-gray-400 ${time==0?'hover:cursor-pointer':null}`}>
                    Try again after 00:00:{time>9?time:`0${time}`}
                </div>
                <div>
                    <button className="w-full bg-blue-500 rounded-lg p-2 hover:bg-blue-600">VERIFY</button>
                </div>
                
            </div>
        </div>
    )
}