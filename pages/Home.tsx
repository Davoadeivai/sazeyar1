import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Star, ShieldCheck, Ruler, PaintBucket, Hammer } from 'lucide-react';
import AIConsultant from '../components/AIConsultant';

const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative bg-brand-900 text-white pt-24 pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-600/20 to-transparent transform skew-x-12 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 text-brand-100 text-sm font-medium backdrop-blur-sm">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span>برترین پلتفرم ساختمانی ۱۴۰۳</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                رویای خانه‌تان را <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-yellow-400">هوشمندانه</span> بسازید
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                سازه‌یار تنها پلتفرمی است که قدرت هوش مصنوعی را با تخصص برترین مهندسان ایران ترکیب می‌کند تا بازسازی و ساخت‌وساز را برای شما ساده، شفاف و کم‌هزینه کند.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register" className="bg-brand-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-600 transition-all hover:scale-105 shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2">
                  شروع رایگان پروژه
                  <ArrowLeft size={20} />
                </Link>
                <Link to="/services" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                  مشاهده خدمات
                </Link>
              </div>
              
              <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-400" />
                  <span>۵۰۰+ پروژه موفق</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-400" />
                  <span>مشاوره رایگان</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              {/* Floating Image Composition */}
              <div className="relative w-full aspect-square">
                 <img 
                  src="https://picsum.photos/800/800?random=1" 
                  alt="Modern Interior" 
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/10"
                />
                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs animate-bounce-slow text-gray-800">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">تضمین کیفیت</h4>
                      <p className="text-xs text-gray-500">نظارت مرحله به مرحله</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">پروژه شما تحت نظارت مستقیم مهندسین ارشد انجام می‌شود.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <AIConsultant />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
             <span className="text-brand-600 font-bold tracking-wider text-sm uppercase">تکنولوژی برتر</span>
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">مشاور هوشمند ۲۴ ساعته</h2>
             <p className="text-gray-600 leading-relaxed text-lg">
               دیگر نیازی نیست منتظر وقت مشاوره باشید. با دستیار هوشمند سازه‌یار، در هر ساعت از شبانه‌روز می‌توانید:
             </p>
             <ul className="space-y-4">
               {[
                 'برآورد دقیق هزینه بازسازی و ساخت',
                 'پیشنهاد بهترین متریال با توجه به بودجه',
                 'ایده‌های دکوراسیون داخلی مدرن',
                 'پاسخ به سوالات فنی و مهندسی'
               ].map((item, idx) => (
                 <li key={idx} className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                   <div className="bg-brand-100 text-brand-600 rounded-full p-1">
                     <CheckCircle2 size={16} />
                   </div>
                   {item}
                 </li>
               ))}
             </ul>
             <Link to="/ai-consultant" className="inline-block mt-4 text-brand-600 font-bold hover:text-brand-700 hover:underline">
               تجربه گفتگوی هوشمند &larr;
             </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">خدمات جامع ساختمانی</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">از طراحی اولیه تا تحویل کلید، ما در تمام مراحل همراه شما هستیم.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <PaintBucket size={40} />, title: 'طراحی داخلی و دکوراسیون', desc: 'تغییر فضای خانه با جدیدترین متدها و طراحی سه بعدی قبل از اجرا.' },
              { icon: <Hammer size={40} />, title: 'بازسازی کامل', desc: 'نوسازی لوله‌کشی، برق‌کشی، کف‌سازی و دیوارها با تیم حرفه‌ای.' },
              { icon: <Ruler size={40} />, title: 'نظارت و اجرا', desc: 'مدیریت پیمان و نظارت دقیق مهندسی بر تمامی مراحل ساخت.' },
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-6">{service.desc}</p>
                <Link to="/services" className="text-sm font-bold text-brand-500 hover:text-brand-700">مشاهده جزئیات &larr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
           <div className="relative z-10">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">آماده شروع تغییر هستید؟</h2>
             <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
               همین حالا ثبت نام کنید و اولین مشاوره خود را به صورت رایگان دریافت کنید. تیم ما منتظر شنیدن ایده‌های شماست.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link to="/register" className="bg-brand-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-brand-600 transition-shadow shadow-lg shadow-brand-500/40">
                 ثبت نام رایگان
               </Link>
               <Link to="/about" className="bg-white text-brand-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
                 تماس با پشتیبانی
               </Link>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;