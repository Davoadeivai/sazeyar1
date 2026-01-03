
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Ruler, Hammer, PaintBucket, Award, PlayCircle, CheckCircle2 } from 'lucide-react';

import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ProjectRoadmap from '../components/ProjectRoadmap';
import AIConsultant from '../components/AIConsultant';
import Reviews from '../components/Reviews';
import BlogSection from '../components/BlogSection';
import OnlineBooking from '../components/OnlineBooking';
import ARViewer from '../components/ARViewer';
import LoyaltyBanner from '../components/LoyaltyBanner';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="space-y-40 pb-20">

      {/* Hero Section: BIG, BOLD, IMMERSIVE */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-gray-900 mx-4 mt-4 rounded-[3rem] shadow-2xl">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow"
            alt="Modern Interior"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-sm font-bold mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <Sparkles size={16} className="text-yellow-400" />
            <span>اولین پلتفرم هوشمند بازسازی در ایران</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight mb-8 leading-tight animate-in zoom-in-50 duration-700 delay-100">
            خانه رویایی شما، <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-happy-orange">هوشمندانـه</span> ساخته می‌شود.
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
            هرمس سازه سبز با ترکیب <b>هوش مصنوعی</b> و <b>هنر معماری</b>، فرآیند بازسازی خانه شما را شفاف، سریع و مقرون به صرفه می‌کند.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
            <Link to="/ai-consultant" className="w-full sm:w-auto px-8 py-5 bg-brand-600 text-white rounded-2xl font-bold text-lg hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/30 flex items-center justify-center gap-3 group">
              <Sparkles className="group-hover:rotate-12 transition-transform" />
              مشاوره رایگان با هوش مصنوعی
            </Link>
            <button onClick={() => setIsVideoModalOpen(true)} className="w-full sm:w-auto px-8 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
              <PlayCircle size={24} />
              ویدیو معرفی
            </button>
          </div>

          {/* Stats Grid */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            {[
              { value: '۵۰۰+', label: 'پروژه موفق', icon: <Hammer className="text-blue-400" /> },
              { value: '۹۸٪', label: 'رضایت مشتریان', icon: <Award className="text-yellow-400" /> },
              { value: '۲۰٪', label: 'کاهش هزینه', icon: <TrendDown className="text-green-400" /> }, // TrendDown needs import or check
              { value: 'AI', label: 'طراحی هوشمند', icon: <Sparkles className="text-purple-400" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl text-center hover:-translate-y-1 transition-transform">
                <div className="flex justify-center mb-3 text-white/80">{stat.icon}</div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AR Experience Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 text-brand-600 font-bold bg-brand-50 px-4 py-2 rounded-full">
              <Award size={18} />
              تکنولوژی انحصاری هرمس
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              قبل از تخریب، <br />
              <span className="text-brand-600">آینده را ببینید!</span>
            </h2>
            <p className="text-lg text-gray-600 leading-loose">
              با تکنولوژی واقعیت افزوده (AR) ما، می‌توانید متریال‌های مختلف کف، کابینت و رنگ دیوار را به صورت زنده در خانه خود امتحان کنید. بدون هیچ هزینه‌ای، هزاران ترکیب را تست کنید.
            </p>
            <div className="pt-4">
              <Link to="/portfolio" className="inline-flex items-center gap-2 text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 hover:text-brand-600 hover:border-brand-600 transition-all">
                مشاهده نمونه کارهای اجرا شده
                <ArrowLeft size={20} />
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-500 to-purple-600 rounded-[2.5rem] opacity-20 blur-2xl"></div>
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

// Add this interface locally if not in types or just rely on generic
function TrendDown(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
}

export default Home;