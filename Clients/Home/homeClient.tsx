'use client'
import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export const HomeClient = () => {
    useEffect(() => {
        const success = () => {
            toast.success('Welcome "user"', {
                position: 'top-right',
                autoClose: 5000, // Display for 5 seconds
                pauseOnHover: true, // Optional: pause on hover
            });
        }
        success();
        localStorage.removeItem('flag');
        localStorage.removeItem('mail :');
    }, [localStorage.getItem('flag')==='Welcome User']);

    return (
        <div>
            <div>
                
            </div>
            <ToastContainer />
        </div>
    );
}
