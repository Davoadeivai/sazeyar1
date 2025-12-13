import React, { useState } from 'react';
import { PaintBucket, Hammer, Ruler, Zap, Droplet, Truck, CheckCircle2, X, ArrowLeft, Phone, User as UserIcon, FileText } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  icon: React.ReactNode;
  desc: string;
  imageUrl: string;
  color: string;
  features: string[];
}

const servicesList: Service[] = [
  { 
    id: 1, 
    title: 'طراحی داخلی لوکس', 
    icon: <Ruler className="w-6 h-6"/>, 
    desc: 'خلق فضایی رویایی با طراحی مدرن، کلاسیک و نئوکلاسیک به همراه رندرهای ۳ بعدی.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
    color: 'from-purple-500 to-indigo-600',
    features: ['مشاوره رایگان رنگ و نور', 'طراحی سه بعدی (3D Max)', 'انتخاب متریال هوشمند']
  },
  { 
    id: 2, 
    title: 'بازسازی و نوسازی', 
    icon: <Hammer className="w-6 h-6"/>, 
    desc: 'تغییر نقشه، تخریب اصولی و ساخت مجدد با بهترین متریال‌های روز بازار.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop',
    color: 'from-orange-400 to-red-500',
    features: ['مدیریت پیمان دقیق', 'تخریب و حمل نخاله', 'دیوارچینی و گچ‌کاری']
  },
  { 
    id: 3, 
    title: 'نقاشی و پتینه', 
    icon: <PaintBucket className="w-6 h-6"/>, 
    desc: 'اجرای انواع رنگ‌های روغنی، پلاستیک، اکریلیک و تکنیک‌های خاص پتینه کاری.',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop',
    color: 'from-pink-500 to-rose-500',
    features: ['رنگ‌های قابل شستشو', 'زیرسازی حرفه‌ای', 'اجرای کاغذ دیواری']
  },
  { 
    id: 4, 
    title: 'تاسیسات و برق هوشمند', 
    icon: <Zap className="w-6 h-6"/>, 
    desc: 'هوشمندسازی ساختمان (BMS)، نورپردازی لاینر و اجرای تابلو برق‌های صنعتی.',
    imageUrl: 'https://images.unsplash.com/photo-1558402529-d2638a7023e9?q=80&w=2070&auto=format&fit=crop',
    color: 'from-yellow-400 to-orange-500',
    features: ['سیستم‌های صوتی و امنیتی', 'نورپردازی مدرن', 'سیم‌کشی استاندارد']
  },
  { 
    id: 5, 
    title: 'لوله کشی و موتورخانه', 
    icon: <Droplet className="w-6 h-6"/>, 
    desc: 'اجرای سیستم گرمایش از کف، لوله‌کشی آب و فاضلاب و تعمیرات موتورخانه.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop',
    color: 'from-cyan-400 to-blue-500',
    features: ['نصب شیرآلات توکار', 'گرمایش از کف', 'تصفیه آب مرکزی']
  },
  { 
    id: 6, 
    title: 'خدمات حمل و تخریب', 
    icon: <Truck className="w-6 h-6"/>, 
    desc: 'تیم مجهز جهت تخریب سریع و حمل نخاله با خاور و نیسان کمپرسی.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
    color: 'from-emerald-400 to-green-600',
    features: ['کارگران مجرب', 'سرعت بالا در تخلیه', 'نظافت نهایی']
  },
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formStep, setFormStep] = useState<'details' | 'success'>('details');

  const handleOrderClick = (service: Service) => {
    setSelectedService(service);
    setFormStep('details');
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send data to backend here
    setTimeout(() => {
      setFormStep('success');
    }, 500);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Hero Header */}
      <div className="bg-brand-900 text-white relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-[128px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-brand-200 text-sm font-bold mb-4 backdrop-blur-sm border border-white/10">
            خدمات حرفه‌ای ساختمان
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            هر آنچه برای <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-yellow-400">ساختن</span> نیاز دارید
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            از یک تعمیر کوچک تا ساخت برج‌های مجلل، تیم متخصصین سازه‌یار با گارانتی کیفیت و قیمت در کنار شماست.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div key={service.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full hover:-translate-y-2">
              
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-80 mix-blend-multiply z-10 group-hover:opacity-60 transition-opacity`}></div>
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 right-4 z-20 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 text-white shadow-lg">
                  {service.icon}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {service.desc}
                </p>
                
                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-600">
                      <CheckCircle2 size={14} className={`text-${service.color.split('-')[1]}-500`} /> 
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleOrderClick(service)}
                  className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r ${service.color} hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2`}
                >
                  ثبت سفارش / استعلام
                  <ArrowLeft size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleCloseModal}></div>
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${selectedService.color} p-6 text-white flex justify-between items-start`}>
              <div>
                <h3 className="text-xl font-bold mb-1">ثبت درخواست {selectedService.title}</h3>
                <p className="text-white/80 text-sm">کارشناسان ما در کمتر از ۱۵ دقیقه با شما تماس می‌گیرند.</p>
              </div>
              <button onClick={handleCloseModal} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {formStep === 'details' ? (
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">نام و نام خانوادگی</label>
                    <div className="relative">
                      <UserIcon className="absolute right-3 top-3.5 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="مثلا: رضا علوی"
                        className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">شماره تماس</label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3.5 text-gray-400" size={18} />
                      <input 
                        type="tel" 
                        required
                        placeholder="0912..."
                        className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all ltr text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">توضیحات مختصر (اختیاری)</label>
                    <div className="relative">
                      <FileText className="absolute right-3 top-3.5 text-gray-400" size={18} />
                      <textarea 
                        rows={3}
                        placeholder="مثلا: متراژ حدود ۱۰۰ متر، نیاز به بازدید حضوری دارم..."
                        className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-md bg-gradient-to-r ${selectedService.color} hover:opacity-90 transition-all mt-4`}
                  >
                    ارسال درخواست رایگان
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">درخواست ثبت شد!</h3>
                  <p className="text-gray-500 mb-6">
                    اطلاعات شما با موفقیت برای متخصصین {selectedService.title} ارسال شد. منتظر تماس همکاران ما باشید.
                  </p>
                  <button 
                    onClick={handleCloseModal}
                    className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                  >
                    متوجه شدم
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;