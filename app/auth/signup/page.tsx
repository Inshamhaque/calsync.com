import { Signup } from "@/components/auth/signup";
import { Subpart } from "@/components/auth/subpart";
import { theme } from "@/theme";

export default function(){
    return(
        <div className="grid grid-cols-2">
            <div className="bg-gray-800">
            < Signup />
            </div>
            <div className="bg-slate-900">
            < Subpart />
            </div>
        </div>

    )
}