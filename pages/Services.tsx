import React, { useState } from 'react';
import { PaintBucket, Hammer, Ruler, Zap, Droplet, Truck, CheckCircle2, X, ArrowLeft, Phone, User as UserIcon, FileText, Loader2, Home as HomeIcon, Sparkles } from 'lucide-react';
import { StorageService } from '../services/storageService';

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
    title: 'پکیج بازسازی کامل (VIP)', 
    icon: <Sparkles className="w-6 h-6"/>, 
    desc: 'صفر تا صد نوسازی واحد با طراحی اختصاصی، تعویض کامل تاسیسات و دکوراسیون داخلی مدرن.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop',
    color: 'from-brand-600 to-brand-400',
    features: ['طراحی ۳ بعدی رایگان', 'نظارت مقیم مهندسی', 'ضمانت‌نامه ۲ ساله کتبی']
  },
  { 
    id: 2, 
    title: 'نوسازی آشپزخانه', 
    icon: <Droplet className="w-6 h-6"/>, 
    desc: 'تعویض کابینت‌ها، سنگ رویه، لوله‌کشی و ایجاد فضای جزیره با جدیدترین متریال‌های اروپایی.',
    imageUrl: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2670&auto=format&fit=crop',
    color: 'from-blue-500 to-cyan-400',
    features: ['یراق‌آلات بلوم اتریش', 'سنگ کوارتز و کورین', 'نورپردازی سنسوریک']
  },
  { 
    id: 3, 
    title: 'طراحی و دکوراسیون', 
    icon: <Ruler className="w-6 h-6"/>, 
    desc: 'تغییر دکوراسیون بدون تخریب سنگین؛ شامل رنگ، پتینه، کاغذ دیواری و پارکت.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
    color: 'from-purple-500 to-indigo-600',
    features: ['سبک مدرن و نئوکلاسیک', 'پتینه کاری ایتالیایی', 'انتخاب اکسسوری هوشمند']
  },
  { 
    id: 4, 
    title: 'هوشمندسازی (Smart Home)', 
    icon: <Zap className="w-6 h-6"/>, 
    desc: 'تبدیل خانه قدیمی به خانه هوشمند؛ کنترل نور، دما و امنیت با موبایل بدون تخریب وسیع.',
    imageUrl: 'https://images.unsplash.com/photo-1558402529-d2638a7023e9?q=80&w=2070&auto=format&fit=crop',
    color: 'from-yellow-400 to-orange-500',
    features: ['سیستم BMS یکپارچه', 'پرده برقی هوشمند', 'قفل‌های بیومتریک']
  },
  { 
    id: 5, 
    title: 'تاسیسات و موتورخانه', 
    icon: <Droplet className="w-6 h-6"/>, 
    desc: 'نوسازی زیرساخت‌های گرمایشی و سرمایشی، تعویض لوله‌های فرسوده با لوله‌های ۵ لایه.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop',
    color: 'from-emerald-400 to-green-600',
    features: ['گرمایش از کف', 'نصب چیلر مرکزی', 'تصفیه آب استخری']
  },
  { 
    id: 6, 
    title: 'تخریب و بازیافت متریال', 
    icon: <Hammer className="w-6 h-6"/>, 
    desc: 'تخریب اصولی با رعایت ایمنی همسایگان و بازیافت متریال‌های قابل استفاده جهت کاهش هزینه.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
    color: 'from-gray-600 to-gray-400',
    features: ['تیم تخریب مجرب', 'حمل نخاله سریع', 'آماده‌سازی سطوح']
  },
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formStep, setFormStep] = useState<'details' | 'success'>('details');
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    description: ''
  });

  const handleOrderClick = (service: Service) => {
    setSelectedService(service);
    setFormStep('details');
    const user = StorageService.getCurrentUser();
    setFormData({ 
        fullName: user?.fullName || '', 
        phone: user?.phone || '', 
        description: '' 
    });
  };

  const handleCloseModal = () => setSelectedService(null);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    setSubmitting(true);
    try {
        const user = StorageService.getCurrentUser();
        await StorageService.addOrder({
            userId: user?.id,
            serviceTitle: selectedService.title,
            fullName: formData.fullName,
            phone: formData.phone,
            description: formData.description
        });
        setFormStep('success');
    } catch (error) {
        alert('خطا در ثبت سفارش.');
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-gray-900 text-white relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-brand-500/20 text-brand-400 text-sm font-bold mb-6 border border-brand-500/30">
            تعرفه‌های بازسازی ۱۴۰۳
          </span>
          <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
            سرویس‌های تخصصی <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-happy-orange">بازسازی و نوسازی</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            از یک اتاق خواب کوچک تا برج‌های مسکونی؛ ما با استفاده از متریال‌های درجه یک و تیم‌های متخصص، محیط شما را دگرگون می‌کنیم.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div key={service.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-70 mix-blend-multiply z-10 group-hover:opacity-50 transition-opacity`}></div>
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-6 right-6 z-20 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 text-white shadow-lg">
                  {service.icon}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-600 transition-colors">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">{service.desc}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                      <div className="bg-green-100 text-green-600 p-0.5 rounded-full">
                        <CheckCircle2 size={12} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleOrderClick(service)}
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg bg-gradient-to-r ${service.color} hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2`}
                >
                  درخواست بازدید و استعلام
                  <ArrowLeft size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={handleCloseModal}></div>
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className={`bg-gradient-to-r ${selectedService.color} p-8 text-white flex justify-between items-start`}>
              <div>
                <h3 className="text-2xl font-bold mb-2">مشاوره رایگان بازسازی</h3>
                <p className="text-white/80 text-sm">کارشناسان هرمس جهت بازدید رایگان با شما تماس می‌گیرند.</p>
              </div>
              <button onClick={handleCloseModal} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              {formStep === 'details' ? (
                <form onSubmit={handleSubmitOrder} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">نام کامل</label>
                    <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">شماره موبایل</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition-all ltr text-right" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">نوع پروژه (مثلا: بازسازی آشپزخانه ۱۲ متری)</label>
                    <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={submitting} className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl bg-gradient-to-r ${selectedService.color} flex justify-center items-center gap-2`}>
                    {submitting ? <Loader2 className="animate-spin" /> : 'ثبت درخواست بازدید رایگان'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">درخواست با موفقیت ثبت شد</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">تیم فنی هرمس سازه سبز به زودی جهت هماهنگی بازدید حضوری با شما تماس خواهند گرفت.</p>
                  <button onClick={handleCloseModal} className="bg-gray-100 text-gray-800 px-10 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-colors">متوجه شدم</button>
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