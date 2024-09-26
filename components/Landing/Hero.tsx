import Image from 'next/image';
import landing from '@/public/landing.png';

export const Hero = () => {
    return (
        <div className="md:grid md:grid-cols-3 p-8 text-black">
            <div className="md:col-span-2 max-w-2xl">
                <h1 className="text-5xl font-bold leading-tight">
                    Scheduling infrastructure for&nbsp;
                    <span className="text-gray-500 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
                        everyone.
                    </span>
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Meet CalSync.com, the event-juggling scheduler for everyone. Focus on meeting, not making meetings. Free for individuals.
                </p>
                <button className='px-20 py-5 rounded-2xl hover:bg-gray-800 mt-10 bg-[#212121] text-white'>
                    Signup
                </button>
            </div>
            <div className="md:col-span-1">
                {/* Use Next.js Image for better optimization */}
                <Image src={landing} alt="Landing" layout="responsive" />
            </div>
        </div>
    );
};
