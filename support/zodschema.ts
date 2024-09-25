import { z } from 'zod';
//signup schema 
export const signupschema = z.object({
    username : z.string(),
    mail : z.string().email(),
    password : z.string().refine((value)=>{
        //used a regex generator to searh for the required conditions
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/.test(value);
    },{
        message : 'Password must be 7 characters long, mix of uppercase and lowercase letters, and atleast one number'
    })
})
export type signuptype = z.infer<typeof signupschema>;
//singin schema
export const signinschema = z.object({
    mail : z.string(),
    password : z.string()
})
export type signintype = z.infer<typeof signinschema>