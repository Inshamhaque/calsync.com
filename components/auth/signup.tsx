'use client';
import { useState } from "react";

export const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [checked,setchecked] = useState(false);
    const toggleCheckBox = ()=>{
        setchecked((prev)=>!prev);
    }
    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    return (
        <div className="m-20 rounded-lg shadow-md">
            {/* CTA */}
            <div className="mb-10">
                <h2 className="text-white font-bold text-3xl">Create your CalSync.com account</h2>
                <p className="text-gray-400">Free for individuals. Team plans for collaborative features.</p>
            </div>
            {/* Signup Form */}
            <div>
                <form className="flex flex-col space-y-4" action="">
                    <div>
                        <label htmlFor="username" className="text-white">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            className="mt-1 p-2 w-full rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
                            required 
                            placeholder="username"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-white">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="mt-1 p-2 w-full rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="johndoe@gmail.com"
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-white">Password</label>
                        <div className="relative flex items-center mt-1">
                            <input 
                                type={passwordVisible ? "text" : "password"} 
                                id="password" 
                                className="p-2 w-full rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500 pr-10"
                                placeholder="password"
                                required 
                            />
                            <button 
                                type="button" 
                                onClick={togglePasswordVisibility} 
                                className="absolute right-0 p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none"
                            >
                                {!passwordVisible?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
                              </svg>
                              
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clip-rule="evenodd" />
                                <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                </svg>

                                }
                            </button>
                        </div>
                        <ul className="mt-2 text-gray-400 list-disc list-inside">
                            <li>Mix of uppercase & lowercase letters</li>
                            <li>Minimum 7 characters long</li>
                            <li>Contain at least 1 number</li>
                        </ul>
                    </div>
                    <div>
                            <button type="button">
                            {!checked?
                            <div className="flex items-center mb-4">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to the privacy policy and cookie usage</label>
                            </div>:
                            <div className="flex items-center">
                                <input checked id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to the privacy policy and cookie usage</label>
                            </div>}

                            </button>
                    </div>
                    <button 
                        type="submit" 
                        className="mt-4 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};
