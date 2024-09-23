
'use client'
import { useRef } from "react"
import { ToastContainer, toast } from "react-toastify"

export const OTPbox = ()=>{
    //creating a input ref array which will help to easily shift focus from one to other block
    const inputRef = Array.from({length:4},()=>useRef<HTMLInputElement>(null)) 
    // to shift automatically to the next input when that input box is filled
    const onChangehandler = (e:any,index:number)=>{
        const value = e.target.value;
        if(index<inputRef.length-1 && value.length>0){
            inputRef[index+1].current?.focus();
        }
    }
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
                <div>
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