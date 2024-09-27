'use client'
import { Poppins } from "@next/font/google";
import { useState } from "react";

const poppins = Poppins({
    weight: ['400', '700'],
    subsets: ['latin'],
});

export const Header = () => {
    return (
        <div className={`${poppins.className} flex justify-between items-center`}>
            <div className="font-semibold text-xl">CalSync.com</div>
            <div className="hidden md:flex">
                <Navbar />
            </div>
            <div>
                <button className="bg-black text-white px-4 py-2 rounded-full">SignIn</button>
            </div>
        </div>
    );
};

const Navbar = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const menuItems = ['Pricing', 'Products', 'Features', 'Docs', 'Blogs'];

    return (
        <div className="flex space-x-3 border border-black px-10 py-2 rounded-3xl bg-white transition-all ease-in-out duration-200 relative">
            {menuItems.map((item, index) => (
                <div key={index} className="relative">
                    <div
                        className="hover:bg-[#212121] px-5 py-3 rounded-xl hover:text-white hover:cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {item}
                    </div>

                    {hoveredIndex === index && (
                        <div
                            className="absolute z-20 bg-gray-800 text-white text-xs px-4 py-2 rounded-md shadow-lg"
                            style={{
                                top: '100%',  // Positions the tooltip below the hovered item
                                left: '50%',  // Centers the tooltip under the item
                                transform: 'translateX(-50%) translateY(10px)', // Adjust position slightly below navbar
                                whiteSpace: 'nowrap'  // Prevents the tooltip text from breaking into lines
                            }}
                        >
                            Tooltip for {item}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
