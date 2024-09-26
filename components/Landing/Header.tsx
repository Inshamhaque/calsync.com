export const Header  = ()=>{
    return(
        <div className="flex justify-between items-center ">
            <div className="font-semibold text-xl">CalSync.com</div>
            <div className="hidden md:flex">
                < Navbar />
            </div>
            <div>
                <button className="bg-black text-white px-4 py-2 rounded-full">SignIn</button>
            </div>
        </div>
    )
}
const Navbar = ()=>{
    return(
        <div className="flex space-x-3 border border-black px-10 py-2 rounded-3xl bg-white">
            <div className="hover:bg-[#212121] px-5 py-3 rounded-xl hover:text-white hover:cursor-pointer">Pricing</div>
            <div className="hover:bg-[#212121] px-5 py-3 rounded-xl hover:text-white hover:cursor-pointer">Products</div>
            <div className="hover:bg-[#212121] px-5 py-3 rounded-xl hover:text-white hover:cursor-pointer">Features</div>
            <div className="hover:bg-[#212121] px-5 py-3 rounded-xl hover:text-white hover:cursor-pointer">Docs</div>
            <div className="hover:bg-[#212121] px-5 py-3 rounded-xl hover:text-white hover:cursor-pointer">Blogs</div>
        </div>
    ) 
}