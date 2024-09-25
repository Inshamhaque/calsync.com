import { OTPClient } from "@/Clients/auth/otpclient";

export default function(){
    return(
        <div className="bg-[#212121] h-screen w-screen">
            <OTPClient />
        </div>
    )
}