import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Star, ShieldCheck, Ruler, PaintBucket, Hammer, Wand2, PlayCircle, Sparkles, TrendingUp } from 'lucide-react';
import AIConsultant from '../components/AIConsultant';
import ProjectRoadmap from '../components/ProjectRoadmap';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const Home: React.FC = () => {
  return (
    <div className="space-y-32 pb-20 overflow-hidden bg-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-40 overflow-hidden">
        
        {/* Animated Background Grid & Gradients */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-brand-500 opacity-20 blur-[100px] animate-blob"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-happy-teal opacity-10 blur-[120px] animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Text Content */}
              <div className="space-y-8 text-center lg:text-right order-2 lg:order-1">
                 
                 {/* Badge */}
                 <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-brand-100 rounded-full pl-6 pr-2 py-1.5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4 fade-in duration-700">
                    <span className="bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-brand-500/40 animate-pulse">جدید</span>
                    <span className="text-xs font-bold text-gray-600">اولین پلتفرم هوشمند ساختمان در ایران</span>
                 </div>

                 {/* Headline */}
                 <h1 className="text-5xl md:text-7xl font-black leading-tight text-gray-900 tracking-tight animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-100">
                    ساختن خانه، <br/>
                    <span className="relative inline-block mt-2">
                        <span className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-happy-orange opacity-20 blur-lg rounded-lg transform -rotate-2"></span>
                        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-happy-orange to-brand-600 bg-[length:200%_auto] animate-gradient-x">
                            لذت‌بخش
                        </span>
                    </span>
                    <span className="mr-3">می‌شود!</span>
                 </h1>
                 
                 <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200">
                    دیگر نگران بدقولی‌ها و هزینه‌های پنهان نباشید. سازه‌یار با ترکیب <span className="font-bold text-gray-800">هوش مصنوعی</span> و <span className="font-bold text-gray-800">مهندسی دقیق</span>، شفاف‌ترین تجربه بازسازی را برای شما رقم می‌زند.
                 </p>

                 {/* CTA Buttons */}
                 <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300">
                    <Link to="/ai-consultant" className="group relative overflow-hidden bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(244,63,94,0.5)] flex items-center justify-center gap-3">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Wand2 size={20} className="text-happy-yellow group-hover:rotate-12 transition-transform" />
                        مشاوره رایگان با AI
                    </Link>
                    <Link to="/portfolio" className="group bg-white text-gray-800 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold hover:border-brand-200 hover:bg-brand-50/50 transition-all flex items-center justify-center gap-2">
                        <PlayCircle size={20} className="text-gray-400 group-hover:text-brand-600 transition-colors" />
                        دیدن نمونه‌کارها
                    </Link>
                 </div>

                 {/* Social Proof */}
                 <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500">
                    <div className="flex -space-x-4 space-x-reverse hover:space-x-reverse hover:-space-x-2 transition-all duration-300">
                        <img className="w-12 h-12 rounded-full border-4 border-white shadow-md object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100" alt=""/>
                        <img className="w-12 h-12 rounded-full border-4 border-white shadow-md object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100" alt=""/>
                        <img className="w-12 h-12 rounded-full border-4 border-white shadow-md object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100" alt=""/>
                        <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shadow-md">+۲k</div>
                    </div>
                    <div className="text-sm font-medium text-gray-500 text-right">
                        <div className="flex items-center gap-1 text-yellow-400 mb-1">
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                        </div>
                        <span className="text-gray-900 font-bold">۴.۹/۵</span> رضایت مشتریان
                    </div>
                 </div>
              </div>

              {/* Hero Image Composition */}
              <div className="relative order-1 lg:order-2 perspective-1000">
                 {/* Morphing Blob Behind */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-100 to-happy-yellow/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-blob -z-10"></div>
                 
                 {/* Main Image Container */}
                 <div className="relative z-10 bg-white p-3 rounded-[2.5rem] shadow-2xl shadow-brand-900/10 transform rotate-2 hover:rotate-0 transition-all duration-700 ease-out group">
                    <div className="relative overflow-hidden rounded-[2rem] w-full h-[400px] md:h-[550px]">
                        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop" alt="Modern House" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                        
                        {/* Overlay Text inside Image */}
                        <div className="absolute bottom-6 right-6 text-white">
                            <p className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-2 border border-white/20">پروژه فرمانیه</p>
                            <p className="text-lg font-bold">بازسازی مدرن ویلایی</p>
                        </div>
                    </div>

                    {/* Floating Card 1: Status */}
                    <div className="absolute -bottom-10 -left-6 md:-left-12 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 animate-float z-20 w-48">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2.5 rounded-xl text-green-600 shadow-inner">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">وضعیت</p>
                                <p className="font-bold text-gray-800 text-sm">تضمین کیفیت ۱۰۰٪</p>
                            </div>
                        </div>
                        <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-green-500 h-1.5 rounded-full w-full animate-[shimmer_2s_infinite]"></div>
                        </div>
                    </div>

                    {/* Floating Card 2: AI Feature */}
                    <div className="absolute top-12 -right-6 md:-right-12 bg-gray-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-700 animate-float z-20" style={{ animationDelay: '2s' }}>
                        <div className="flex items-center gap-2 mb-3">
                             <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                             </span>
                             <span className="text-[10px] font-bold text-gray-300">تحلیل هوشمند</span>
                        </div>
                        <div className="flex gap-3 items-center bg-white/10 p-2.5 rounded-xl border border-white/10">
                             <div className="bg-brand-500 p-1.5 rounded-lg shadow-lg shadow-brand-500/50"><TrendingUp size={16} className="text-white"/></div>
                             <div className="flex flex-col">
                                 <span className="text-xs text-gray-200 font-bold">برآورد هزینه</span>
                                 <span className="text-[10px] text-gray-400">دقیق و لحظه‌ای</span>
                             </div>
                        </div>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* NEW FEATURE: Before & After Showcase */}
      <section className="bg-gray-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800/50 skew-x-12 translate-x-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2 space-y-8 text-white">
                    <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 border border-brand-500/30 px-3 py-1 rounded-full text-xs font-bold">
                        <Sparkles size={14} />
                        معجزه بازسازی
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black leading-tight">
                        خانه‌ای که <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-yellow-400">عاشقش می‌شوید</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed border-r-2 border-brand-500 pr-4">
                        ما فقط دیوارها را رنگ نمی‌کنیم؛ ما به فضا جان می‌دهیم. با تکنیک‌های مدرن و طراحی هوشمندانه، فضاهای مرده را به محبوب‌ترین نقطه خانه تبدیل می‌کنیم.
                    </p>
                    <ul className="space-y-5 pt-4">
                        {[
                            'افزایش ۳۰٪ ارزش ملک با بازسازی اصولی',
                            'بهینه‌سازی مصرف انرژی و نور طبیعی',
                            'طراحی اختصاصی متناسب با سبک زندگی شما'
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 group cursor-default">
                                <div className="bg-green-500/20 p-1 rounded-full group-hover:bg-green-500/40 transition-colors">
                                    <CheckCircle2 className="text-green-400" size={18} />
                                </div>
                                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="pt-8">
                        <Link to="/portfolio" className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-brand-500 pb-1 hover:text-brand-500 hover:border-white transition-all">
                            مشاهده تمام پروژه‌ها <ArrowLeft size={18} className="rtl:rotate-180"/>
                        </Link>
                    </div>
                </div>
                
                <div className="w-full md:w-1/2">
                    <div className="p-2 bg-white/10 rounded-[2rem] backdrop-blur-sm border border-white/10">
                        <BeforeAfterSlider 
                            beforeImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop"
                            afterImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
                            className="rounded-[1.5rem]"
                        />
                    </div>
                    <p className="text-center text-gray-500 text-xs mt-6 flex items-center justify-center gap-3 opacity-60">
                        <span className="w-12 h-px bg-gray-700"></span>
                        برای مشاهده تغییرات، خط وسط را بکشید
                        <span className="w-12 h-px bg-gray-700"></span>
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <span className="text-happy-orange font-bold text-sm tracking-wider uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-100">شفافیت در اجرا</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-4">هر لحظه بدانید پروژه‌تان کجاست</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    ما تمام مراحل کار را در یک داشبورد تعاملی به شما نشان می‌دهیم. بدون نگرانی، فقط از پیشرفت لذت ببرید.
                </p>
            </div>
            
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl transition-shadow duration-500">
                <ProjectRoadmap />
            </div>
         </div>
      </section>

      {/* AI Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-white shadow-2xl shadow-gray-900/30">
           <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-[120px] opacity-20"></div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="order-2 lg:order-1 transform hover:scale-[1.01] transition-transform duration-500">
                 <AIConsultant />
              </div>
              <div className="order-1 lg:order-2 space-y-8">
                 <div className="inline-block bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-sm font-bold text-brand-200 animate-pulse">
                    ✨ تکنولوژی GPT-4 & Gemini
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black leading-tight">
                    هوش مصنوعی، <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brand-400">مهندس شخصی شما</span>
                 </h2>
                 <p className="text-lg text-gray-300 leading-relaxed">
                    سوالات فنی دارید؟ نمی‌دانید هزینه بازسازی آشپزخانه چقدر می‌شود؟ یا دنبال ایده‌های رنگ‌بندی هستید؟ 
                    <br/>
                    دستیار هوشمند ما ۲۴ ساعته و رایگان پاسخگوی شماست.
                 </p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {['برآورد هزینه آنی', 'پیشنهاد متریال', 'مشاوره قرارداد', 'ایده‌های دکوراسیون'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                            <div className="bg-white/10 p-1.5 rounded-lg group-hover:bg-green-500/20 transition-colors">
                                <CheckCircle2 className="text-green-400" size={18} />
                            </div>
                            <span className="font-medium group-hover:text-white transition-colors">{item}</span>
                        </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Services Grid (Compact) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 relative inline-block">
            خدمات ما در یک نگاه
            <span className="absolute -bottom-4 left-0 right-0 h-1 bg-brand-500 rounded-full w-12 mx-auto"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
           {[
               { title: 'طراحی داخلی', icon: <PaintBucket size={32}/>, color: 'text-purple-500', bg: 'bg-purple-50', border: 'hover:border-purple-200' },
               { title: 'بازسازی کامل', icon: <Hammer size={32}/>, color: 'text-brand-500', bg: 'bg-brand-50', border: 'hover:border-brand-200' },
               { title: 'نظارت مهندسی', icon: <Ruler size={32}/>, color: 'text-blue-500', bg: 'bg-blue-50', border: 'hover:border-blue-200' },
           ].map((s, i) => (
               <div key={i} className={`bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer ${s.border}`}>
                   <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 ${s.bg} ${s.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                       {s.icon}
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                   <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">مشاهده جزئیات و تعرفه‌ها</p>
               </div>
           ))}
        </div>
        <div className="mt-16">
            <Link to="/services" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:gap-4 transition-all bg-brand-50 px-6 py-3 rounded-xl hover:bg-brand-100">
                مشاهده تمام خدمات
                <ArrowLeft size={20} className="rtl:rotate-180" />
            </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;