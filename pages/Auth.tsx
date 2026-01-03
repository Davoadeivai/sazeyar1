import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { UserRole } from '../types';
import { Eye, EyeOff, Loader2, AlertCircle, ArrowRight, User, HardHat, CheckCircle2 } from 'lucide-react';

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        role: UserRole.HOMEOWNER
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isRegister) {
                await StorageService.registerUser(formData);
                navigate('/dashboard'); // Direct navigation after register
            } else {
                await StorageService.loginUser(formData.email, formData.password);
                const user = StorageService.getCurrentUser();
                if (user?.role === UserRole.ADMIN) {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'خطایی رخ داده است. لطفا مجدد تلاش کنید.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10 border border-white/50">

                {/* Image Section */}
                <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full">
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
                        alt="Interior Design"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-10 text-white">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold leading-tight">خانه رویایی خود را <br />با هوش مصنوعی بسازید</h2>
                            <p className="text-white/80 text-sm leading-relaxed">
                                به جمع ۲۰۰۰+ کاربر هرمس بپیوندید و از مشاوره هوشمند، تخمین هزینه دقیق و تیم‌های اجرایی متخصص استفاده کنید.
                            </p>
                            <div className="flex gap-4 pt-2">
                                <div className="flex items-center gap-1.5 text-xs font-medium bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">
                                    <CheckCircle2 size={14} className="text-brand-400" />
                                    تخمین آنلاین
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-medium bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">
                                    <CheckCircle2 size={14} className="text-brand-400" />
                                    مشاوره رایگان
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="text-center lg:text-right space-y-2">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            {isRegister ? 'ایجاد حساب کاربری' : 'ورود به حساب'}
                        </h1>
                        <p className="text-gray-500">
                            {isRegister ? 'اطلاعات خود را برای شروع وارد کنید' : 'برای ادامه وارد حساب خود شوید'}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2">
                            <AlertCircle size={20} className="flex-shrink-0" />
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isRegister && (
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">نام و نام خانوادگی</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none"
                                    placeholder="مثلا: علی محمدی"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">آدرس ایمیل</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none ltr text-left"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-gray-700">رمز عبور</label>
                                {!isRegister && (
                                    <a href="#" className="text-xs font-semibold text-brand-600 hover:text-brand-700">رمز عبور را فراموش کردید؟</a>
                                )}
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none ltr text-left"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        {isRegister && (
                            <div className="space-y-3 pt-2">
                                <label className="text-sm font-semibold text-gray-700">من هستم یک:</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: UserRole.HOMEOWNER })}
                                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${formData.role === UserRole.HOMEOWNER
                                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                                            }`}
                                    >
                                        <User size={24} />
                                        <span className="text-sm font-bold">کارفرما</span>
                                        <span className="text-xs text-gray-400">صاحب خانه یا ملک</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: UserRole.PROFESSIONAL })}
                                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${formData.role === UserRole.PROFESSIONAL
                                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                                            }`}
                                    >
                                        <HardHat size={24} />
                                        <span className="text-sm font-bold">متخصص</span>
                                        <span className="text-xs text-gray-400">مهندس یا پیمانکار</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] mt-4"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <>
                                    {isRegister ? 'ثبت نام رایگان' : 'ورود به پنل'}
                                    {!loading && <ArrowRight size={20} className="mr-1" />}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-2">
                        <p className="text-sm text-gray-500">
                            {isRegister ? 'قبلاً حساب کاربری ساخته‌اید؟' : 'هنوز حساب کاربری ندارید؟'}
                            <button
                                onClick={() => navigate(isRegister ? '/login' : '/register')}
                                className="text-brand-600 font-bold hover:text-brand-700 hover:underline mr-2"
                            >
                                {isRegister ? 'وارد شوید' : 'ثبت نام کنید'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
