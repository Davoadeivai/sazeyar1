
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, User, LogOut, ShieldCheck, Instagram, Send, MessageCircle, Heart, Sparkles, MapPin, Phone } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { User as UserType, UserRole, SiteSettings } from '../types';

// Default settings for initial render
const defaultSettings: SiteSettings = {
  instagramUrl: '#',
  telegramUrl: '#',
  whatsappUrl: '#',
  enamadUrl: '#',
  phoneNumber: '۰۲۱-۱۲۳۴۵۶۷۸',
  address: 'تهران، ...'
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Load user and settings
  useEffect(() => {
    setUser(StorageService.getCurrentUser());

    // Load settings asynchronously
    const loadSettings = async () => {
      try {
        const fetchedSettings = await StorageService.getSettings();
        setSettings(fetchedSettings);
      } catch (error) {
        console.error('Error loading settings:', error);
        // Keep default settings on error
      }
    };
    loadSettings();
  }, [location.pathname]);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await StorageService.logout();
    navigate('/login');
    setUser(null);
  };

  const navLinks = [
    { name: 'خانه', path: '/' },
    { name: 'گالری پروژه‌ها', path: '/portfolio' },
    { name: 'خدمات', path: '/services' },
    { name: 'مشاور هوشمند', path: '/ai-consultant' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fdfbfc]">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-2' : 'bg-transparent py-4'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="bg-gradient-to-br from-brand-500 to-happy-orange p-2.5 rounded-xl text-white shadow-lg shadow-brand-500/30 group-hover:rotate-6 transition-transform">
                <Home size={24} strokeWidth={2.5} />
              </div>
              <span className={`text-2xl font-black tracking-tighter ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                هرمس <span className="text-brand-500">سازه سبز</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-1 bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-gray-100/50 shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${location.pathname === link.path
                      ? 'bg-gray-900 text-white shadow-md transform scale-105'
                      : 'text-gray-600 hover:text-brand-600 hover:bg-white'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
                  <div className="flex flex-col items-end mr-2">
                    <span className="text-xs font-bold text-gray-800">{user.fullName}</span>
                    <span className="text-[10px] text-gray-500">{user.role === 'ADMIN' ? 'مدیر سیستم' : 'کاربر عادی'}</span>
                  </div>
                  {user.role === UserRole.ADMIN ? (
                    <Link to="/admin" className="bg-red-50 text-red-500 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all">
                      <ShieldCheck size={18} />
                    </Link>
                  ) : (
                    <Link to="/dashboard" className="bg-brand-50 text-brand-500 p-2 rounded-full hover:bg-brand-500 hover:text-white transition-all">
                      <User size={18} />
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 p-1 transition-colors">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-gray-700 font-bold text-sm hover:text-brand-500 transition-colors">ورود</Link>
                  <Link
                    to="/register"
                    className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-brand-500 hover:shadow-brand-500/30 transition-all flex items-center gap-2"
                  >
                    ثبت نام
                    <Sparkles size={16} className="text-yellow-400" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-800 bg-white p-2.5 rounded-xl shadow-sm border border-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl animate-in slide-in-from-top-5">
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-brand-50 hover:text-brand-600"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-3"></div>
              {user ? (
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-right px-4 py-3 text-red-500 font-bold">خروج از حساب</button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/login" className="text-center py-3 rounded-xl border border-gray-200 font-bold text-gray-700">ورود</Link>
                  <Link to="/register" className="text-center py-3 rounded-xl bg-brand-500 text-white font-bold shadow-lg shadow-brand-500/20">ثبت نام</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1e1b4b] text-white pt-20 pb-10 relative overflow-hidden mt-20">
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-happy-teal/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                  <Home className="text-happy-orange" size={28} />
                </div>
                <span className="text-3xl font-black tracking-tight">هرمس سازه سبز</span>
              </div>
              <p className="text-indigo-200 leading-relaxed max-w-sm text-justify">
                ما در هرمس سازه سبز باور داریم که ساختن خانه نباید استرس‌زا باشد. با ترکیب تکنولوژی هوش مصنوعی و تخصص انسانی، تجربه‌ای لذت‌بخش و شفاف از بازسازی را برایتان رقم می‌زنیم.
              </p>

              {/* Social Media Links from Settings */}
              <div className="flex gap-3 pt-4">
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-orange-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Instagram size={18} className="text-white" />
                </a>
                <a href={settings.telegramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Send size={18} className="text-white" />
                </a>
                <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-green-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <MessageCircle size={18} className="text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2 text-happy-yellow">
                <Sparkles size={16} />
                لینک‌های مفید
              </h4>
              <ul className="space-y-4 text-indigo-200 text-sm font-medium">
                <li><Link to="/portfolio" className="hover:text-white hover:translate-x-1 transition-transform inline-block">نمونه کارهای برتر</Link></li>
                <li><Link to="/ai-consultant" className="hover:text-white hover:translate-x-1 transition-transform inline-block">مشاوره رایگان AI</Link></li>
                <li><Link to="/services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">لیست قیمت‌ها</Link></li>
                <li>
                  {/* Enamad Logo (Dynamic Placeholder) */}
                  <a href="#" className="inline-block mt-2 bg-white rounded-lg p-2 hover:opacity-90 transition-opacity">
                    <div className="flex flex-col items-center justify-center w-20 h-20 border border-gray-200 rounded">
                      <ShieldCheck size={32} className="text-blue-600 mb-1" />
                      <span className="text-[10px] text-gray-800 font-bold">ایناماد</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2 text-happy-teal">
                <Heart size={16} />
                ارتباط با ما
              </h4>
              <div className="bg-white/5 p-5 rounded-2xl backdrop-blur-sm border border-white/5 space-y-4">
                <div>
                  <p className="text-indigo-300 text-xs mb-1">شماره تماس (پشتیبانی ۲۴ ساعته)</p>
                  <a href={`tel:${settings.phoneNumber}`} className="text-xl font-bold font-mono tracking-widest text-white hover:text-happy-orange transition-colors flex items-center gap-2">
                    <Phone size={18} />
                    {settings.phoneNumber}
                  </a>
                </div>
                <div>
                  <p className="text-indigo-300 text-xs mb-1">آدرس دفتر مرکزی</p>
                  <div className="text-sm text-white flex items-start gap-2">
                    <MapPin size={16} className="mt-1 flex-shrink-0 text-happy-orange" />
                    {settings.address}
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-indigo-300">
            <p>© ۱۴۰۳ تمامی حقوق محفوظ است.</p>
            <div className="flex items-center gap-2">
              <span>طراحی شده با</span>
              <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
              <span>توسط تیم هرمس سازه سبز</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
