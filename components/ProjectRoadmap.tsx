import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Lock, ArrowLeft, Settings, ChevronDown } from 'lucide-react';
import { RoadmapStep } from '../types';

// تعریف مراحل بدون وضعیت هاردکد شده
const stepsData: Omit<RoadmapStep, 'status'>[] = [
  { id: 1, title: 'مشاوره اولیه', description: 'تحلیل نیازها، برآورد هزینه و مشاوره تخصصی با هوش مصنوعی', icon: '🤖' },
  { id: 2, title: 'طراحی نقشه', description: 'طراحی پلان معماری، مدل‌سازی سه بعدی و تایید نهایی طرح', icon: '📐' },
  { id: 3, title: 'تخریب و آماده‌سازی', description: 'تخریب اصولی، حمل نخاله و زیرسازی سطوح برای شروع کار', icon: '🔨' },
  { id: 4, title: 'خرید متریال', description: 'انتخاب و خرید متریال باکیفیت شامل کاشی، پارکت و شیرآلات', icon: '🛍️' },
  { id: 5, title: 'اجرا و نصب', description: 'اجرای تاسیسات، گچ‌کاری، نقاشی و نصب دکوراسیون داخلی', icon: '🏗️' },
  { id: 6, title: 'تحویل نهایی', description: 'نظافت کامل، کنترل کیفیت نهایی و تحویل کلید به کارفرما', icon: '🔑' },
];

const ProjectRoadmap: React.FC = () => {
  // این استیت در یک اپلیکیشن واقعی از دیتابیس خوانده می‌شود
  const [currentStep, setCurrentStep] = useState<number>(3);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "50px"
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // محاسبه درصد پیشرفت برای نوار رنگی
  const progressPercentage = ((currentStep - 1) / (stepsData.length - 1)) * 100;

  return (
    <div className="w-full py-8" ref={containerRef}>
      <div className={`text-center mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">مسیر پیشرفت پروژه شما</h2>
        <p className="text-gray-500">
          پروژه بازسازی منزل شما هم‌اکنون در مرحله 
          <span className="font-bold text-happy-orange mx-1 text-lg">{currentStep}</span> 
          از 
          <span className="font-bold text-gray-700 mx-1">{stepsData.length}</span> 
          قرار دارد
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line (Background - Gray) */}
        <div className={`hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
        
        {/* Connecting Line (Progress - Colored) */}
        <div 
            className={`hidden md:block absolute top-1/2 right-0 h-1 bg-gradient-to-l from-happy-orange to-brand-500 -translate-y-1/2 z-0 rounded-full transition-all duration-1000 ease-out delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ width: isVisible ? `${progressPercentage}%` : '0%' }}
        ></div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 relative z-10">
          {stepsData.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isLocked = step.id > currentStep;

            return (
              <div 
                key={step.id} 
                className={`flex flex-col items-center group cursor-default transition-all duration-700 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                
                {/* Icon Bubble */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-all duration-500 transform mb-4 border-4 relative ${
                  isCompleted ? 'bg-green-100 border-green-500 text-green-600 scale-100' :
                  isCurrent ? 'bg-happy-orange text-white border-white ring-4 ring-happy-orange/30 scale-110' :
                  'bg-gray-100 border-gray-200 grayscale opacity-60 scale-95'
                }`}>
                  {step.icon}
                  
                  {/* Ripple Effect for Current Step */}
                  {isCurrent && (
                    <span className="absolute inline-flex h-full w-full rounded-xl bg-happy-orange opacity-20 animate-ping"></span>
                  )}
                </div>

                {/* Status Indicator (Mobile Line) */}
                <div className={`md:hidden h-8 w-1 my-2 rounded-full ${
                    isCompleted ? 'bg-green-500' : isCurrent ? 'bg-happy-orange' : 'bg-gray-200'
                }`}></div>

                {/* Text Info */}
                <div className="text-center px-2">
                  <h3 className={`font-bold text-sm mb-1 transition-colors duration-300 ${
                      isCurrent ? 'text-happy-orange text-base' : isCompleted ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                      {step.title}
                  </h3>
                  <p className={`text-xs leading-tight hidden md:block transition-colors duration-300 ${
                      isCurrent ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                      {step.description}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="mt-3 h-6">
                  {isCompleted && <CheckCircle2 size={16} className="text-green-500 animate-in zoom-in" />}
                  {isCurrent && <span className="bg-happy-orange text-white text-[10px] px-2 py-1 rounded-full shadow-sm animate-pulse">در حال انجام</span>}
                  {isLocked && <Lock size={14} className="text-gray-300" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Admin Control Panel (Simulation of Data Entry) */}
      <div className={`mt-16 bg-gray-50 border border-gray-200 rounded-xl p-4 max-w-2xl mx-auto transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-600">
                <Settings size={18} className="animate-spin-slow" />
                <span className="text-sm font-bold">پنل مدیریت پیشرفت پروژه (دمو)</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm w-full sm:w-auto">
                <span className="text-xs text-gray-500 whitespace-nowrap">به‌روزرسانی مرحله:</span>
                <div className="relative w-full">
                    <select 
                        value={currentStep}
                        onChange={(e) => setCurrentStep(Number(e.target.value))}
                        className="w-full appearance-none bg-transparent font-bold text-brand-600 text-sm outline-none pr-2 pl-6 cursor-pointer"
                    >
                        {stepsData.map(s => (
                            <option key={s.id} value={s.id}>مرحله {s.id}: {s.title}</option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>
        </div>
      </div>

      <div className={`mt-8 text-center transition-all duration-1000 delay-[1200ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <button className="text-gray-500 text-sm hover:text-brand-600 transition-colors inline-flex items-center gap-1">
            مشاهده جزئیات کامل برنامه زمان‌بندی
            <ArrowLeft size={14} />
        </button>
      </div>
    </div>
  );
};

export default ProjectRoadmap;