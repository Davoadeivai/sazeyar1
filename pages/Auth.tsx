import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { UserRole } from '../types';
import { Loader2, AlertCircle, ShieldCheck, User, HardHat, ArrowRight, Home } from 'lucide-react';

const Auth: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isRegister = location.pathname === '/register';

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: UserRole.HOMEOWNER
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegister) {
                if (!formData.fullName) throw new Error('نام کامل الزامی است');
                await StorageService.registerUser({
                    fullName: formData.fullName,
                    email: formData.email,
                    passwordHash: formData.password, // Mock hashing
                    role: formData.role
                });
            } else {
                await StorageService.loginUser(formData.email, formData.password);
            }

            const currentUser = StorageService.getCurrentUser();
            if (currentUser?.role === UserRole.ADMIN) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }

        } catch (err: any) {
            setError(err.message || 'خطایی رخ داده است');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Right Side - Image (Desktop Only) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-brand-900">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-overlay hover:scale-105 transition-transform duration-[20s]"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop")' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent"></div>

                <div className="relative z-10 p-16 flex flex-col justify-between h-full text-white">
                    <Link to="/" className="flex items-center gap-3 w-fit group">
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl group-hover:bg-white/30 transition-colors">
                            <Home size={28} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">هرمس سازه سبز</span>
                    </Link>

                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold leading-tight">
                            {isRegister
                                ? 'خانه رویایی خود را \n با ما بسازید'
                                : 'خوشحالیم که دوباره \n شما را می‌بینیم'}
                        </h2>
                        <p className="text-blue-100 text-lg max-w-md leading-relaxed">
                            به جامعه بزرگ متخصصین و کارفرمایان هرمس سازه سبز بپیوندید. ما کیفیت و اطمینان را در پروژه‌های ساختمانی شما تضمین می‌کنیم.
                        </p>
                    </div>

                    <div className="text-sm text-blue-200">
                        © ۱۴۰۳ تمامی حقوق محفوظ است.
                    </div>
                </div>
            </div>

            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
                <div className="w-full max-w-md space-y-8">

                    {/* Mobile Header */}
                    <div className="lg:hidden text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                            <div className="bg-brand-500 p-2 rounded-lg text-white">
                                <Home size={24} />
                            </div>
                            <span className="text-xl font-bold text-gray-900">هرمس سازه سبز</span>
                        </Link>
                    </div>

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