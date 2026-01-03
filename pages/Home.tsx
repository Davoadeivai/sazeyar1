import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Ruler, PaintBucket, Hammer, Wand2, PlayCircle, Sparkles, TrendingUp, ShieldCheck, Wind, Layers } from 'lucide-react';
import AIConsultant from '../components/AIConsultant';
import ProjectRoadmap from '../components/ProjectRoadmap';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import AICostEstimator from '../components/AICostEstimator';
import ARViewer from '../components/ARViewer';
import OnlineBooking from '../components/OnlineBooking';
import Reviews from '../components/Reviews';
import BlogSection from '../components/BlogSection';
import LoyaltyBanner from '../components/LoyaltyBanner';

const Home: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="space-y-32 pb-20 overflow-hidden bg-white">

            {/* --- HERO SECTION: RENOVATION FOCUS --- */}
            <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-40 overflow-hidden">
                <div
                    className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] will-change-transform"
                    style={{ transform: `translateY(${scrollY * 0.08}px)` }}
                ></div>

                <div
                    className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-brand-500 opacity-20 blur-[100px] animate-blob will-change-transform"
                    style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.2}px)` }}
                ></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        <div
                            className="space-y-8 text-center lg:text-right order-2 lg:order-1 will-change-transform"
                            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
                        >
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-brand-100 rounded-full pl-6 pr-2 py-1.5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4">
                                <span className="bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-brand-500/40 animate-pulse">رتبه ۱ بازسازی</span>
                                <span className="text-xs font-bold text-gray-600">متخصص بازسازی واحدهای لوکس و تجاری</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black leading-tight text-gray-900 tracking-tight">
                                بازسازی هوشمند، <br />
                                <span className="relative inline-block mt-2">
                                    <span className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-happy-orange opacity-20 blur-lg rounded-lg transform -rotate-2"></span>
                                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-happy-orange to-brand-600 bg-[length:200%_auto] animate-gradient-x">
                                        تحول ماندگار
                                    </span>
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                دیگر نیازی به تعویض خانه نیست؛ ما خانه فعلی شما را به قصری که همیشه آرزویش را داشتید تبدیل می‌کنیم. با <span className="font-bold text-brand-600">هرمس سازه سبز</span>، بازسازی دیگر یک دغدغه نیست، یک لذت است.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                <Link to="/ai-consultant" className="group relative overflow-hidden bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-3">
                                    <Wand2 size={20} className="text-happy-yellow group-hover:rotate-12 transition-transform" />
                                    تخمین هزینه بازسازی با AI
                                </Link>
                                <Link to="/portfolio" className="group bg-white text-gray-800 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold hover:border-brand-200 hover:bg-brand-50/50 transition-all flex items-center justify-center gap-2">
                                    <PlayCircle size={20} className="text-gray-400 group-hover:text-brand-600 transition-colors" />
                                    گالری قبل و بعد پروژه‌ها
                                </Link>
                            </div>
                        </div>

                        <div
                            className="relative order-1 lg:order-2 perspective-1000 will-change-transform"
                            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-100 to-happy-orange/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-blob -z-10"></div>

                            <div className="relative z-10 bg-white p-3 rounded-[2.5rem] shadow-2xl shadow-brand-900/10 transform rotate-2 hover:rotate-0 transition-all duration-700 ease-out group">
                                <div className="relative overflow-hidden rounded-[2rem] w-full h-[400px] md:h-[550px]">
                                    <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop" alt="Luxury Renovation" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-brand-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">In Progress</span>
                                    </div>
                                </div>

                                {/* Floating Status Card */}
                                <div className="absolute -bottom-10 -left-6 md:-left-12 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/50 animate-float z-20 w-56">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600 shadow-inner">
                                            <TrendingUp size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold">ارزش افزوده ملک</p>
                                            <p className="font-bold text-gray-800 text-sm">حدود ۳۵٪ افزایش</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- WHY RENOVATION? --- */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'سرعت در اجرا', desc: 'بازسازی تخصصی در کوتاه‌ترین زمان ممکن با تیم‌های موازی', icon: <Wind /> },
                        { title: 'بهینه‌سازی هزینه', desc: 'حذف واسطه‌ها و خرید مستقیم متریال از تولیدکنندگان', icon: <TrendingUp /> },
                        { title: 'تضمین کیفیت', desc: 'گارانتی ۱۲ ماهه تمامی خدمات بازسازی و نوسازی', icon: <ShieldCheck /> },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-5 p-6 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-gray-100">
                            <div className="shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-500 shadow-sm group-hover:bg-brand-500 group-hover:text-white transition-all">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- AI TOOLS SECTION (NEW) --- */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-[3.5rem] p-8 md:p-16 border border-gray-100">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
                            <Sparkles size={16} />
                            ابزارهای هوشمند (Beta)
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-4">مهندسی و طراحی با هوش مصنوعی</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">برای اولین بار در ایران، قبل از شروع بازسازی، هزینه دقیق را محاسبه کنید و دیوارهای خانه‌تان را به‌صورت مجازی رنگ‌آمیزی کنید.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <AICostEstimator />
                        <ARViewer />
                    </div>
                </div>
            </section>

            {/* Before & After Showcase: THE CORE OF RENOVATION */}
            <section className="bg-gray-900 py-24 relative overflow-hidden rounded-[4rem] mx-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 text-white">
                        <h2 className="text-3xl md:text-5xl font-black mb-4">جادوی تغییر در دستان ماست</h2>
                        <p className="text-gray-400 max-w-xl mx-auto">تفاوت بین یک فضای خسته و یک خانه مدرن را با حرکت دادن اسلایدر ببینید.</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-3/5">
                            <BeforeAfterSlider
                                beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop"
                                afterImage="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2670&auto=format&fit=crop"
                                className="rounded-[3rem] shadow-3xl shadow-brand-500/10"
                            />
                        </div>
                        <div className="w-full md:w-2/5 space-y-8 text-white">
                            <div className="space-y-4">
                                <h4 className="text-brand-400 font-bold flex items-center gap-2">
                                    <CheckCircle2 size={18} />
                                    پروژه مسکونی الهیه
                                </h4>
                                <p className="text-gray-300 leading-relaxed">
                                    این پروژه شامل بازسازی کامل آشپزخانه، تعویض کف‌پوش‌ها به سنگ اسلب و اجرای نورپردازی لاینر هوشمند بود که در مدت ۳۰ روز کاری به اتمام رسید.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <span className="block text-2xl font-black text-brand-500">۳۰</span>
                                    <span className="text-xs text-gray-400">روز کاری</span>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <span className="block text-2xl font-black text-brand-500">۱۸۰</span>
                                    <span className="text-xs text-gray-400">مترمربع</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Project Roadmap */}
            <section className="bg-gradient-to-b from-white to-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ProjectRoadmap />
                </div>
            </section>

            {/* Loyalty Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <LoyaltyBanner />
            </section>

            {/* AI Assistant for Renovation Advice */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-900 rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div className="order-2 lg:order-1">
                            <AIConsultant />
                        </div>
                        <div className="order-1 lg:order-2 text-white space-y-8">
                            <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-400 border border-brand-500/30 px-4 py-1.5 rounded-full text-xs font-bold">
                                <Sparkles size={16} />
                                مشاور هوشمند بازسازی
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black leading-tight">پروژه بازسازی را با <span className="text-brand-400">اطمینان</span> شروع کنید</h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                دستیار هوشمند ما با تحلیل هزاران پروژه بازسازی، بهترین متریال‌ها و دقیق‌ترین هزینه‌ها را به شما پیشنهاد می‌دهد.
                                <br /><br />
                                <span className="bg-white/10 px-3 py-1 rounded-lg text-happy-yellow">کافیست از آشپزخانه یا پذیرایی خود عکس بگیرید و بفرستید!</span>
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                                    <Ruler className="text-brand-400" />
                                    <span className="text-sm font-bold">اندازه‌گیری مجازی</span>
                                </div>
                                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                                    <PaintBucket className="text-happy-orange" />
                                    <span className="text-sm font-bold">تست رنگ هوشمند</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reviews />
            </section>

            {/* Blog Section */}
            <BlogSection />

            {/* Booking & Call to Action */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                    <OnlineBooking />
                </div>
                <div className="w-full md:w-1/2 bg-blue-600 rounded-3xl p-12 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <CheckCircle2 size={200} />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-6">هنوز سوال دارید؟</h2>
                        <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                            مشاوران ما آماده پاسخگویی به تمام سوالات شما در مورد هزینه، زمان و روند بازسازی هستند. مشاوره اولیه کاملا رایگان است.
                        </p>
                        <Link to="/services" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all w-fit shadow-xl">
                            مشاهده لیست قیمت‌ها
                            <ArrowLeft size={20} className="rtl:rotate-180" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;