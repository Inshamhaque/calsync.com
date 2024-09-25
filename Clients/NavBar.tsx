// components/Navbar.tsx
'use client'
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <nav className={`bg-white dark:bg-gray-800 transition duration-300 border-b border-gray-600`}>
      <div className="flex justify-between items-center p-4">
        <div>
            <h2 className="font-semibold text-lg md:text-2xl">CalSync</h2> 
        </div>
        <div className="flex items-center gap-x-1 md:gap-x-5 text-sm md:text-md mr-2">
            <Link href='/home' className="hover:bg-slate-500 px-3 py-2">Home</Link>
            <Link href='/home/appointments' className="hover:bg-slate-500 px-3 py-2">Appointments</Link>
            <Link href='/profile'>
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:cursor-pointer">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>
            </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
