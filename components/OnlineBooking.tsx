import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Check, ChevronLeft, ChevronRight } from 'lucide-react';

const OnlineBooking: React.FC = () => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

    // Mock generic calendar days for demo
    const days = Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return {
            day: d.toLocaleDateString('fa-IR', { day: 'numeric' }),
            month: d.toLocaleDateString('fa-IR', { month: 'long' }),
            weekday: d.toLocaleDateString('fa-IR', { weekday: 'short' }),
            fullDate: d.toISOString().split('T')[0],
            isAvailable: i % 7 !== 6 // Fridays closed mockup
        };
    });

    const timeSlots = [
        '۰۹:۰۰ - ۱۱:۰۰', '۱۱:۰۰ - ۱۳:۰۰', '۱۴:۰۰ - ۱۶:۰۰', '۱۶:۰۰ - ۱۸:۰۰'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
        // Here you would call the API
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-md mx-auto">
            <div className="bg-gradient-to-r from-brand-600 to-brand-500 p-6 text-white text-center">
                <h3 className="text-xl font-bold flex items-center justify-center gap-2 mb-2">
                    <CalendarIcon />
                    رزرو آنلاین بازدید
                </h3>
                <p className="text-brand-100 text-sm">انتخاب زمان مناسب برای بازدید رایگان کارشناس</p>
            </div>

            <div className="p-6">
                {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-gray-800">۱. انتخاب تاریخ</h4>
                                <div className="flex gap-2">
                                    <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight size={20} /></button>
                                    <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft size={20} /></button>
                                </div>
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                                {days.map((d, i) => (
                                    <button
                                        key={i}
                                        disabled={!d.isAvailable}
                                        onClick={() => setSelectedDate(i)}
                                        className={`flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${selectedDate === i
                                                ? 'border-brand-500 bg-brand-50 text-brand-700'
                                                : d.isAvailable
                                                    ? 'border-gray-100 hover:border-gray-200 text-gray-600'
                                                    : 'border-gray-50 bg-gray-50 text-gray-300 cursor-not-allowed'
                                            }`}
                                    >
                                        <span className="text-xs">{d.weekday}</span>
                                        <span className="text-lg font-black">{d.day}</span>
                                        <span className="text-[10px]">{d.month}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-800 mb-4">۲. انتخاب ساعت</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${selectedTime === time
                                                ? 'border-brand-500 bg-brand-50 text-brand-700 font-bold'
                                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                    >
                                        <Clock size={16} />
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            disabled={selectedDate === null || !selectedTime}
                            onClick={() => setStep(2)}
                            className={`w-full py-4 rounded-xl font-bold transition-all ${selectedDate !== null && selectedTime
                                    ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            مرحله بعد: اطلاعات تماس
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-right duration-300">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">نام و نام خانوادگی</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:border-brand-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">شماره تماس (برای هماهنگی)</label>
                            <input
                                type="tel"
                                required
                                dir="ltr"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:border-brand-500 outline-none text-right"
                                placeholder="0912..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">آدرس دقیق پروژه</label>
                            <textarea
                                required
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:border-brand-500 outline-none h-24 resize-none"
                            ></textarea>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-1/3 py-3 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50"
                            >
                                بازگشت
                            </button>
                            <button
                                type="submit"
                                className="w-2/3 py-3 rounded-xl font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-lg"
                            >
                                ثبت نهایی رزرو
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <div className="text-center py-8 animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check size={40} strokeWidth={3} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">رزرو شما ثبت شد!</h3>
                        <p className="text-gray-500 mb-6">
                            کارشناسان ما به زودی با شماره <span className="font-bold text-gray-800 dir-ltr">{formData.phone}</span> برای تایید نهایی تماس خواهند گرفت.
                        </p>
                        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 mb-6">
                            <div className="flex justify-between mb-2">
                                <span>زمان بازدید:</span>
                                <span className="font-bold text-gray-900">{days[selectedDate!]?.day} {days[selectedDate!]?.month} - ساعت {selectedTime}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>کد پیگیری:</span>
                                <span className="font-bold text-gray-900 tracking-widest">{Math.floor(Math.random() * 100000)}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => { setStep(1); setSelectedDate(null); setSelectedTime(null); }}
                            className="text-brand-600 font-bold hover:text-brand-700"
                        >
                            ثبت رزرو جدید
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OnlineBooking;
