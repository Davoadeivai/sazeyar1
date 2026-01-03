import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { User, UserRole } from '../types';
import { Settings, FolderPlus, Clock, LogOut, FileText, Gift, CreditCard, ChevronLeft } from 'lucide-react';
import LoyaltyBanner from '../components/LoyaltyBanner';

// Mock Invoice Data
const MOCK_INVOICES = [
  { id: 1, number: 'INV-1402-101', date: '1402/10/15', amount: '150,000,000', status: 'PAID', project: 'بازسازی آشپزخانه' },
  { id: 2, number: 'INV-1402-105', date: '1402/10/20', amount: '45,000,000', status: 'PENDING', project: 'لوله کشی و تاسیسات' },
];

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'loyalty'>('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = StorageService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {user.fullName.charAt(0)}
                </div>
                <h2 className="font-bold text-gray-900">{user.fullName}</h2>
                <p className="text-xs text-gray-500 mt-1">
                  {user.role === UserRole.HOMEOWNER ? 'کارفرما (صاحب خانه)' : 'متخصص'}
                </p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'overview' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <FolderPlus size={18} />
                  پروژه‌های من
                </button>
                <button
                  onClick={() => setActiveTab('invoices')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'invoices' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <FileText size={18} />
                  فاکتورها و مالی
                </button>
                <button
                  onClick={() => setActiveTab('loyalty')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'loyalty' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Gift size={18} />
                  باشگاه مشتریان
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                  <Settings size={18} />
                  تنظیمات حساب
                </button>
                <button
                  onClick={() => { StorageService.logout(); navigate('/'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors mt-8"
                >
                  <LogOut size={18} />
                  خروج
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow space-y-8">

            {activeTab === 'overview' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-in fade-in duration-300">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">داشبورد کاربری</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg shadow-blue-500/20">
                    <span className="text-blue-100 text-sm">پروژه‌های فعال</span>
                    <div className="text-4xl font-bold mt-2">۰</div>
                  </div>
                  <div className="bg-gradient-to-br from-brand-500 to-brand-600 text-white p-6 rounded-2xl shadow-lg shadow-brand-500/20">
                    <span className="text-brand-100 text-sm">پیام‌های جدید</span>
                    <div className="text-4xl font-bold mt-2">۰</div>
                  </div>
                  <div className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col justify-center items-center text-gray-400 border-dashed">
                    <span className="text-sm">اعتبار کیف پول</span>
                    <div className="text-2xl font-bold text-gray-900 mt-1">۰ تومان</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-gray-400" />
                    فعالیت‌های اخیر
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
                    {user.lastLogin ? (
                      <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-500">
                        <span className="text-brand-600 font-bold text-lg">آخرین ورود شما</span>
                        <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 text-gray-800 font-medium">
                          {new Date(user.lastLogin).toLocaleString('fa-IR', { dateStyle: 'full', timeStyle: 'short' })}
                        </span>
                      </div>
                    ) : (
                      'هنوز فعالیتی ثبت نشده است. اولین پروژه خود را شروع کنید!'
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'invoices' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-in fade-in duration-300">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="text-brand-600" />
                  فاکتورهای من
                </h1>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-right">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 rounded-tr-xl">شماره فاکتور</th>
                        <th className="px-6 py-4">پروژه</th>
                        <th className="px-6 py-4">تاریخ</th>
                        <th className="px-6 py-4">مبلغ (تومان)</th>
                        <th className="px-6 py-4">وضعیت</th>
                        <th className="px-6 py-4 rounded-tl-xl text-center">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {MOCK_INVOICES.map(invoice => (
                        <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-800">{invoice.number}</td>
                          <td className="px-6 py-4 text-gray-600">{invoice.project}</td>
                          <td className="px-6 py-4 text-gray-500">{invoice.date}</td>
                          <td className="px-6 py-4 font-bold text-gray-800">{invoice.amount}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${invoice.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                              {invoice.status === 'PAID' ? 'پرداخت شده' : 'منتظر پرداخت'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button className="text-brand-600 hover:text-brand-800 font-bold text-xs border border-brand-200 hover:bg-brand-50 px-3 py-1.5 rounded-lg transition-colors">
                              دانلود PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <LoyaltyBanner />

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">وضعیت امتیازات من</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white relative overflow-hidden">
                      <div className="relative z-10">
                        <span className="text-gray-400 text-sm">موجودی امتیاز</span>
                        <div className="text-4xl font-black mt-2 mb-1">۰ <span className="text-lg font-normal text-gray-400">سکه هرمس</span></div>
                        <p className="text-xs text-gray-500">معادل ۰ تومان تخفیف در خدمات بعدی</p>
                      </div>
                      <Gift className="absolute bottom-4 left-4 text-white/5 w-24 h-24" />
                    </div>

                    <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                      <span className="text-purple-600 text-sm font-bold block mb-2">کد معرف اختصاصی شما</span>
                      <div className="bg-white border-2 border-dashed border-purple-200 rounded-xl p-4 flex justify-between items-center">
                        <span className="font-mono text-xl font-bold text-gray-800 tracking-widest">HRM-{Math.floor(Math.random() * 10000)}</span>
                        <button className="text-purple-600 text-sm font-bold hover:bg-purple-50 px-3 py-1 rounded-lg">کپی</button>
                      </div>
                      <p className="text-xs text-purple-400 mt-2 text-center">این کد را به دوستان خود بدهید تا با ۵٪ تخفیف ثبت‌نام کنند.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;