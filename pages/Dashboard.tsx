import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { User, UserRole } from '../types';
import { Settings, FolderPlus, Clock, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
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
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-brand-50 text-brand-700 rounded-xl font-medium transition-colors">
                  <FolderPlus size={18} />
                  پروژه‌های من
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;