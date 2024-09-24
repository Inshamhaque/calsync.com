
'use client'
import { useRef } from "react"

export const OTPbox = ({ setotp } : {
    setotp : any 
})=>{
    //creating a input ref array which will help to easily shift focus from one to other block
    const inputRef = Array.from({length:4},()=>useRef<HTMLInputElement>(null));
    const number = useRef<string>('');
    const onChangehandler = (e: any, index: number) => {
        const value = e.target.value;

        // new number to handle the logic
        let newNumber = number.current.split('');
        newNumber[index] = value;
        number.current = newNumber.join('');

        setotp(number.current);
        console.log('input otp is : ', number.current);

        // Shift focus to the next input
        if (index < inputRef.length - 1 && value.length > 0) {
            inputRef[index + 1].current?.focus();
        }
    };

    // backspace handling 
    const keyDownhandler = (e:any,index:number)=>{
        const value = e.target.value;
        if(e.key=='Backspace'){
            if(index>0 && value.length==0){
                inputRef[index-1].current?.focus();
            }
        }
    }

    return(
        <div className="flex gap-x-10">
            {inputRef.map((number,index)=>(
                <div key={index}>
                    <input type="text" 
                    className="h-12 w-12 text-center text-black border border-gray-500 bg-gray-200"
                    ref={inputRef[index]}
                    onChange={(e)=>{onChangehandler(e,index)}}
                    onKeyDown={(e)=>{keyDownhandler(e,index)}}
                    maxLength={1}/>
                </div>
            ))}
        </div>
    )
}