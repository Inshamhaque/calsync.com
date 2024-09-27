'use client'

import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export const HomeClient = () => {
    return (
        <div className="relative flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-slate-800">
            <div className="text-center">
                {/* Animated text */}
                <h1 className="text-6xl font-extrabold text-white mb-8 animate-slidein">
                    Coming Soon
                </h1>

                {/* Subtext with fade effect */}
                <p className="text-lg font-medium text-gray-300 mb-12 animate-fadein">
                    Stay tuned! We’re launching something amazing.
                </p>

                {/* Call to action button */}
                <button className="px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full hover:from-indigo-500 hover:to-blue-600 transition-transform transform hover:scale-105 focus:ring-4 focus:ring-blue-300">
                    Notify Me
                </button>
            </div>

            {/* Adding a subtle floating effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-800 to-indigo-700 opacity-50 pointer-events-none animate-pulse"></div>

            {/* Optional Toast Container */}
            {/* <ToastContainer /> */}
        </div>
    );
}
