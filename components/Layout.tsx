import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, User, LogOut, ShieldCheck, Instagram, Send, MessageCircle } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { User as UserType, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(StorageService.getCurrentUser());
  }, [location.pathname]);

  const handleLogout = async () => {
    await StorageService.logout();
    navigate('/login');
    setUser(null);
  };

  const navLinks = [
    { name: 'صفحه اصلی', path: '/' },
    { name: 'نمونه‌کارها', path: '/portfolio' },
    { name: 'خدمات ساختمانی', path: '/services' },
    { name: 'مشاور هوشمند (AI)', path: '/ai-consultant' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-brand-500 p-2 rounded-lg text-white group-hover:bg-brand-600 transition-colors">
                <Home size={28} />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tighter">
                سازه‌یار
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-brand-500 ${
                    location.pathname === link.path ? 'text-brand-500' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700 font-medium flex items-center gap-2">
                    {user.role === UserRole.ADMIN ? <ShieldCheck size={18} className="text-red-500" /> : <User size={18} />}
                    {user.fullName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    title="خروج"
                  >
                    <LogOut size={20} />
                  </button>
                  {user.role === UserRole.ADMIN ? (
                    <Link 
                      to="/admin"
                      className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all text-sm"
                    >
                      پنل ادمین
                    </Link>
                  ) : (
                    <Link 
                      to="/dashboard"
                      className="bg-brand-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-brand-500/30 hover:bg-brand-600 transition-all hover:scale-105 active:scale-95 text-sm"
                    >
                      پنل کاربری
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-gray-700 font-medium hover:text-brand-500 transition-colors px-3 py-2"
                  >
                    ورود
                  </Link>
                  <Link
                    to="/register"
                    className="bg-brand-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-brand-500/30 hover:bg-brand-600 transition-all hover:scale-105 active:scale-95 text-sm flex items-center gap-2"
                  >
                    ثبت نام
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg animate-in slide-in-from-top-5 duration-200">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-brand-500 hover:bg-brand-50"
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 my-2 pt-2">
                 {user ? (
                   <>
                    {user.role === UserRole.ADMIN ? (
                         <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-red-600 font-bold">پنل ادمین</Link>
                    ) : (
                         <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-brand-600 font-bold">پنل کاربری</Link>
                    )}
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-right px-3 py-3 text-red-500">خروج</button>
                   </>
                 ) : (
                   <div className="flex flex-col gap-2 mt-2">
                     <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-center px-4 py-3 border border-gray-200 rounded-lg text-gray-700 font-medium">ورود</Link>
                     <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block text-center px-4 py-3 bg-brand-500 rounded-lg text-white font-medium">ثبت نام</Link>
                   </div>
                 )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-900 text-white pt-16 pb-8 mt-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl">
                    <Home className="text-brand-500" size={32} />
                </div>
                <div>
                    <span className="text-2xl font-bold block">سازه‌یار</span>
                    <span className="text-xs text-blue-200">پلتفرم هوشمند ساختمان</span>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed max-w-md text-sm text-justify">
                ما پلی هستیم میان رویاهای شما و واقعیت. با سازه‌یار، بهترین متخصصین ساختمانی و مشاورین هوشمند در کنار شما هستند تا خانه‌ای امن، زیبا و مدرن بسازید. کیفیت، سرعت و شفافیت، تعهد ما به شماست.
              </p>
              
              {/* Social Media Links */}
              <div className="pt-4">
                <h4 className="text-sm font-bold text-white mb-4">ما را دنبال کنید:</h4>
                <div className="flex gap-4">
                    <a href="#" className="bg-white/10 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 p-3 rounded-xl transition-all duration-300 group" title="اینستاگرام">
                        <Instagram size={20} className="text-white group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-[#2AABEE] p-3 rounded-xl transition-all duration-300 group" title="تلگرام">
                        <Send size={20} className="text-white group-hover:scale-110 transition-transform -ml-0.5 mt-0.5" />
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-[#25D366] p-3 rounded-xl transition-all duration-300 group" title="واتس‌اپ">
                        <MessageCircle size={20} className="text-white group-hover:scale-110 transition-transform" />
                    </a>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-brand-500 rounded-full"></span>
                دسترسی سریع
              </h3>
              <ul className="space-y-4 text-blue-100">
                <li><Link to="/portfolio" className="hover:text-brand-500 hover:translate-x-1 transition-all inline-block">نمونه‌کارها</Link></li>
                <li><Link to="/services" className="hover:text-brand-500 hover:translate-x-1 transition-all inline-block">خدمات ما</Link></li>
                <li><Link to="/ai-consultant" className="hover:text-brand-500 hover:translate-x-1 transition-all inline-block">مشاوره هوشمند</Link></li>
                <li><Link to="/about" className="hover:text-brand-500 hover:translate-x-1 transition-all inline-block">درباره ما</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                 <span className="w-1 h-6 bg-brand-500 rounded-full"></span>
                 تماس با ما
              </h3>
              <ul className="space-y-4 text-blue-100 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <span className="leading-relaxed">تهران، میدان ونک، خیابان ملاصدرا، برج همراه، طبقه ۱۰</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-xl">📞</span>
                  <span dir="ltr" className="font-mono text-lg tracking-wider">021-88888888</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-xl">✉️</span>
                  <span className="font-mono">info@sazeyar.ir</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-blue-200 text-sm">
            © ۱۴۰۳ تمامی حقوق برای <span className="text-white font-bold">سازه‌یار</span> محفوظ است. 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;