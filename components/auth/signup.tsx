'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signuptype } from "@/support/zodschema";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [checked,setchecked] = useState(false);
    const [credentials,setcredentials] = useState<signuptype>({
        username : '',
        mail : '',
        password : ''
    })
    const BASE_URL  = process.env.NEXT_PUBLIC_BASE_URL;
    const [passwordcondition,setpasswordcondition] = useState({
        1: false,
        2: false,
        3: false 
    }) 
    const router = useRouter();
    const toggleCheckBox = ()=>{
        setchecked((prev)=>!prev);
    }
    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };
    //error toasts 
    const error = ()=>{
        return toast.error('Incorrect credentials',{
            position : 'top-right',
            delay : 5000
        })
    }
    const error2 = ()=>{
        return toast.error('User already exists',{
            position : 'top-right',
            delay : 5000
        })
    }
    const error3 = ()=>{
        return toast.error('Error creating user',{
            position : 'top-right',
            delay : 5000
        })
    }
    const error4 = ()=>{
        return toast.error('Some unknown error occurred',{
            position : 'top-right',
            delay : 5000
        })
    }
    const error5 = (e:any)=>{
        return toast.error('Catch block executed:  '+e,{
            position : 'top-right',
            delay : 5000
        })
    }
    // handling password on change seperately and dynamically 
    const passwordChangehandler = (e: any) => {
        const value = e.target.value;

        // regex conditions
        const condition1 = /^(?=.*[a-z])(?=.*[A-Z])/.test(value); 
        const condition2 = value.length >= 7; 
        const condition3 = /^(?=.*\d)/.test(value); 
        setpasswordcondition({
            1: condition1,
            2: condition2,
            3: condition3
        });
        setcredentials({
            ...credentials,
            password: value
        });
    };
    //onClickhandler to send request
    const handleClick = async(e:any)=>{
        e.preventDefault();
        console.log('base url is : ',BASE_URL);
        try{
            const res = await axios.post(`${BASE_URL}/api/auth/signup`,JSON.stringify({
                mail : credentials.mail,
                password : credentials.password,
                username : credentials.username 
            }),{
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            console.log('status is:',res.data.status);
            if(res.data.status!==200){
                if(res.data.status==411){
                    console.log('invlaid credentials');
                    error();
                    return;
                }
                if(res.data.status===409){
                    console.log('user already exists');
                    error2();
                    return;
                }
                if(res.data.status===422){
                    console.log('error creating user');
                    error3();
                    return;
                }
                if(res.data.status===500){
                    console.log('some other error occurred');
                    error4();
                    return;
                }
            }
            //send mail here and redirect the user to verify page
            const date = new Date();
            const today = new Date(Date.now());
            const res2 = await axios.post(`${BASE_URL}/api/mail`, {
            email: credentials.mail,
            subject: "Verification OTP",
            message: 
            `<html>
            <body style="font-family: 'Times New Roman', Times, serif; background-color: #f9f9f9; margin: 0; padding: 0;">
                <div style="border: 2px solid #000; padding: 20px; text-align: center; width: 600px; margin: 0 auto; background-color: #fff;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-weight: bold; font-size: 22px;">CalSync.com</div>
                </div>
                <div style="font-size: 18px; padding: 4px; margin-bottom: 20px;"></div>
                <hr style="border-top: 1px solid #000; margin: 20px 0;">
                <div style="font-size: 20px; font-weight: bold; padding: 10px; color: #333;">OTP Verification</div>
                <div style="font-size: 18px; padding: 4px; line-height: 1.5; color: #555;">
                    <p>Dear ${credentials.username}</p>
                    <p>Welcome to the CalSync!</p>
                    <p>To complete your registration, please verify your email by using the OTP below:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #007bff;">${res.data.otp}</p>
                    <p>This OTP is valid for the next 10 minutes. If you did not request this, please ignore this email.</p>
                </div>
                
                <hr style="border-top: 1px solid #000; margin: 20px 0;">
                <div style="font-size: 16px; padding-top: 10px; color: #777;">
                    <p>Date:${today}</p>
                </div>
                </div>
            </body>
            </html>   `
                });
            if(res2){
                localStorage.setItem('mail :',credentials.mail)
                router.push('/auth/verify');
            }
        }
        catch(e){
            error5(e);
            console.log('some error occurred'+e);
        }
    }
    return (
        <div className="w-inherit m-10 lg:m-20 rounded-lg shadow-md">
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
                            onChange={(e:any)=>{
                                setcredentials({
                                    ...credentials,
                                    username : e.target.value
                                })
                            }}
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
                            onChange={(e:any)=>{
                                setcredentials({
                                    ...credentials,
                                    mail : e.target.value
                                })  
                            }}
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
                                onChange={(e)=>passwordChangehandler(e)}
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
                            {credentials.password.length==0?
                            <li>
                                Mix of uppercase & lowercase letters
                            </li>:
                            !passwordcondition[1]?
                            //case when condition is false
                            <li className="text-red-500">
                                Mix of uppercase & lowercase letters
                            </li>
                            :
                            //case when conition is true
                            <li className="text-green-400">
                                Mix of uppercase & lowercase letters
                            </li>
                            }
                            {credentials.password.length==0?
                            <li>
                                Minimum 7 characters long
                            </li>:
                            !passwordcondition[2]?
                            //case when condition is false
                            <li className="text-red-500">
                                Minimum 7 characters long
                            </li>
                            :
                            //case when conition is true
                            <li className="text-green-400">
                                Minimum 7 characters long
                            </li>
                            }
                            {credentials.password.length==0?
                            <li>
                                Contains at least 1 number
                            </li>:
                            !passwordcondition[3]?
                            //case when condition is false
                            <li className="text-red-500">
                                Contains at least 1 number
                            </li>
                            :
                            //case when conition is true
                            <li className="text-green-400">
                                Contains at least 1 number
                            </li>
                            }
                            
                        </ul>
                    </div>
                    <div>
                            <button type="button">
                            {!checked?
                            <div className="flex items-center mb-4">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={toggleCheckBox}/>
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to the privacy policy and cookie usage</label>
                            </div>
                            :
                            <div className="flex items-center mb-4">
                                <input checked id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={toggleCheckBox}/>
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to the privacy policy and cookie usage</label>
                            </div>}

                            </button>
                    </div>
                    <div className="flex justify-center items-center text-sm text-gray-500 space-x-5">
                        <p>Already have an account?</p>
                        <p className="hover:text-blue-500 hover:cursor-pointer underline underline-offset-1" onClick={()=>{router.push('/auth/signin')}}>SignIn</p>
                    </div>
                    <button 
                        type="submit" 
                        className={`mt-4 bg-blue-500 text-white font-semibold py-2 rounded-md transition duration-200 ${checked?'hover:cursor-pointer hover:bg-blue-700':'hover:cursor-not-allowed'}`}
                        onClick={(e)=>handleClick(e)}
                        disabled = {!checked}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
            < ToastContainer />
        </div>
    );
};
