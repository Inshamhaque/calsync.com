import { Signin } from "@/components/auth/signin";

export default function(){
    return(
        <div className="max-w-screen bg-[#212121] p-2">
            <div>
                <h2 className="text-white text-center font-bold text-xl pt-5">CalSync.com</h2>
            </div>
            <div className="flex justify-center ">
                < Signin />
            </div>
        </div>
    )
}