import { Poppins } from '@next/font/google';
import { Header } from '@/components/Landing/Header';
import { Hero } from '@/components/Landing/Hero';
const poppins = Poppins({
    weight: ['400', '700'], // Add the weights you need
    subsets: ['latin'],     // Choose the subsets you need
});

export const Landing  = ()=>{
    return(
        <div className={`${poppins.className} text-black bg-gradient-to-r from-slate-50 to-gray-300 h-screen pl-3 pr-3 pt-4 md:p-5 space-y-10`}>
            <Header />
            < Hero />
        </div>
    )
}