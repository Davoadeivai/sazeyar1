import React from 'react';
import { Gift, ArrowLeft, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoyaltyBanner: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/2 -translate-y-1/2">
                <Gift size={300} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-right">
                    <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/50 px-4 py-1.5 rounded-full text-sm font-bold text-purple-200 mb-4">
                        <Users size={16} />
                        باشگاه مشتریان و همکاران
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">پروژه معرفی کنید، <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-400 to-pink-400">پورسانت میلیونی</span> بگیرید!</h2>
                    <p className="text-gray-300 text-lg max-w-2xl">
                        با عضویت در باشگاه مشتریان هرمس، به ازای معرفی هر پروژه بازسازی، تا ۵٪ مبلغ قرارداد را به عنوان پاداش نقدی دریافت کنید.
                    </p>
                </div>

                <div className="flex-shrink-0">
                    <Link to="/auth?mode=register" className="group inline-flex items-center gap-3 bg-white text-purple-900 px-8 py-4 rounded-xl font-black text-lg hover:bg-purple-50 transition-all hover:scale-105 shadow-lg hover:shadow-purple-500/50">
                        عضویت و دریافت کد معرف
                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoyaltyBanner;
