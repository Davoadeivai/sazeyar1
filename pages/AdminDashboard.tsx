
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { UserRole, PortfolioItem, SiteSettings, ServiceOrder, OrderStatus, User, UserChatSession } from '../types';
import { Video, MapPin, UploadCloud, Trash2, Plus, AlertTriangle, Image as ImageIcon, X, FileVideo, Layers, Settings, Globe, Smartphone, Map, Link as LinkIcon, Save, ClipboardList, Users, MessageSquare, Check, Clock, Phone, Search } from 'lucide-react';
import { addWatermark } from '../utils/imageProcessor';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'orders' | 'users' | 'chats' | 'settings'>('projects');
  
  // Data State
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [chatSessions, setChatSessions] = useState<UserChatSession[]>([]);
  // Fix: Default initialize siteSettings because StorageService.getSettings() is async
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    instagramUrl: '',
    telegramUrl: '',
    whatsappUrl: '',
    enamadUrl: '',
    phoneNumber: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Refs for file inputs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const beforeVideoInputRef = useRef<HTMLInputElement>(null);
  const afterVideoInputRef = useRef<HTMLInputElement>(null);

  // Project Form State
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    location: string;
    coverImage: string;
    galleryImages: string[];
    beforeVideoUrl: string;
    afterVideoUrl: string;
  }>({
    title: '',
    description: '',
    location: '',
    coverImage: '',
    galleryImages: [],
    beforeVideoUrl: '',
    afterVideoUrl: ''
  });

  useEffect(() => {
    const user = StorageService.getCurrentUser();
    if (!user || user.role !== UserRole.ADMIN) {
      navigate('/dashboard'); // Redirect non-admins
      return;
    }
    loadData();
  }, [navigate, activeTab]);

  // Fix: loadData must be async and await StorageService calls
  const loadData = async () => {
    try {
      const [itemsData, ordersData, usersData, sessionsData, settingsData] = await Promise.all([
        StorageService.getPortfolioItems(),
        StorageService.getOrders(),
        StorageService.getUsers(),
        StorageService.getAllChatSessions(),
        StorageService.getSettings()
      ]);
      setItems(itemsData);
      setOrders(ordersData);
      setUsers(usersData);
      setChatSessions(sessionsData);
      setSiteSettings(settingsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  const updateOrderStatus = async (id: string, newStatus: OrderStatus) => {
      await StorageService.updateOrderStatus(id, newStatus);
      const ordersData = await StorageService.getOrders();
      setOrders(ordersData);
  };

  const getStatusColor = (status: OrderStatus) => {
      switch(status) {
          case 'PENDING': return 'bg-yellow-100 text-yellow-700';
          case 'CONTACTED': return 'bg-blue-100 text-blue-700';
          case 'IN_PROGRESS': return 'bg-purple-100 text-purple-700';
          case 'COMPLETED': return 'bg-green-100 text-green-700';
          case 'CANCELLED': return 'bg-red-100 text-red-700';
          default: return 'bg-gray-100 text-gray-700';
      }
  };

  const getStatusText = (status: OrderStatus) => {
       switch(status) {
          case 'PENDING': return 'در انتظار';
          case 'CONTACTED': return 'تماس گرفته شد';
          case 'IN_PROGRESS': return 'در حال انجام';
          case 'COMPLETED': return 'تکمیل شده';
          case 'CANCELLED': return 'لغو شده';
          default: return status;
      }
  };

  // --- File Upload Logic ---
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'gallery' | 'beforeVideo' | 'afterVideo') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    setUploadProgress(0); 

    const interval = setInterval(() => {
      setUploadProgress(prev => (prev >= 90 ? 90 : prev + 10));
    }, 100);

    try {
        if (type === 'cover') {
            const file = files[0];
            const processedImage = await addWatermark(file);
            setFormData(prev => ({ ...prev, coverImage: processedImage }));
        } else if (type === 'gallery') {
            const promises = Array.from(files).map((file: File) => addWatermark(file));
            const processedImages = await Promise.all(promises);
            setFormData(prev => ({ ...prev, galleryImages: [...prev.galleryImages, ...processedImages] }));
        } else {
            // Video handling remains direct
            const file = files[0];
            if (file.size > 10 * 1024 * 1024) {
                alert('حجم ویدیو برای نسخه دمو نباید بیشتر از ۱۰ مگابایت باشد.');
                clearInterval(interval);
                setLoading(false);
                setUploadProgress(0);
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            await new Promise<void>((resolve) => {
                reader.onloadend = () => {
                    const result = reader.result as string;
                    if (type === 'beforeVideo') setFormData(prev => ({ ...prev, beforeVideoUrl: result }));
                    else setFormData(prev => ({ ...prev, afterVideoUrl: result }));
                    resolve();
                };
            });
        }
    } catch (error) {
        console.error("Upload error:", error);
        alert('خطا در آپلود فایل');
    } finally {
        finishUpload(interval);
    }
  };

  const finishUpload = (interval: any) => {
    clearInterval(interval);
    setUploadProgress(100);
    setTimeout(() => { setLoading(false); setUploadProgress(0); }, 500);
  };

  const fillSampleData = () => {
    setFormData({
      title: 'بازسازی آپارتمان ۱۸۰ متری فرمانیه',
      description: 'اجرای کامل دکوراسیون داخلی شامل کابینت ممبران، سنگ اسلب کف، سیستم هوشمند BMS و بازسازی کامل سرویس‌های بهداشتی.',
      location: 'تهران، فرمانیه',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=2000&auto=format&fit=crop'
      ],
      beforeVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 
      afterVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' 
    });
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert('لطفا عنوان پروژه را وارد کنید');
      return;
    }

    setLoading(true);
    try {
        await StorageService.addPortfolioItem(formData);
        setFormData({
          title: '',
          description: '',
          location: '',
          coverImage: '',
          galleryImages: [],
          beforeVideoUrl: '',
          afterVideoUrl: ''
        });
        await loadData();
        alert('پروژه با موفقیت ثبت شد');
    } catch (error) {
        console.error(error);
        alert('خطا در ثبت پروژه');
    } finally {
        setLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        await StorageService.saveSettings(siteSettings);
        alert('تنظیمات سایت با موفقیت بروزرسانی شد.');
        window.location.reload(); 
      } catch (error) {
        console.error("Error saving settings:", error);
        alert('خطا در ذخیره تنظیمات.');
      } finally {
        setLoading(false);
      }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('آیا از حذف این پروژه اطمینان دارید؟')) {
      try {
        await StorageService.deletePortfolioItem(id);
        await loadData();
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("خطا در حذف پروژه.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">پنل مدیریت یکپارچه</h1>
          <div className="flex gap-2">
              <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium border border-red-200">
                مدیر ارشد
              </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-2 border-b border-gray-200">
            <button onClick={() => setActiveTab('projects')} className={`flex items-center gap-2 pb-4 px-4 font-bold text-sm transition-all whitespace-nowrap border-b-2 ${activeTab === 'projects' ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                <Layers size={18} /> پروژه‌ها
            </button>
            <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-2 pb-4 px-4 font-bold text-sm transition-all whitespace-nowrap border-b-2 ${activeTab === 'orders' ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                <ClipboardList size={18} /> سفارشات 
                {orders.filter(o => o.status === 'PENDING').length > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{orders.filter(o => o.status === 'PENDING').length}</span>}
            </button>
            <button onClick={() => setActiveTab('users')} className={`flex items-center gap-2 pb-4 px-4 font-bold text-sm transition-all whitespace-nowrap border-b-2 ${activeTab === 'users' ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                <Users size={18} /> کاربران
            </button>
            <button onClick={() => setActiveTab('chats')} className={`flex items-center gap-2 pb-4 px-4 font-bold text-sm transition-all whitespace-nowrap border-b-2 ${activeTab === 'chats' ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                <MessageSquare size={18} /> چت‌ها
            </button>
            <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-2 pb-4 px-4 font-bold text-sm transition-all whitespace-nowrap border-b-2 ${activeTab === 'settings' ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                <Settings size={18} /> تنظیمات
            </button>
        </div>

        {/* --- PROJECTS TAB --- */}
        {activeTab === 'projects' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><Plus size={20} className="text-brand-500" /> افزودن پروژه جدید</h2>
                        <form onSubmit={handleSubmitProject} className="space-y-4">
                            {/* ... File Inputs ... */}
                            {loading && uploadProgress > 0 && (<div className="w-full bg-gray-200 rounded-full h-1.5 mb-4"><div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div></div>)}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">تصویر کاور</label>
                                <div onClick={() => coverInputRef.current?.click()} className="relative w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer border-gray-300 hover:border-brand-400">
                                    {formData.coverImage ? <img src={formData.coverImage} className="w-full h-full object-cover rounded-xl" /> : <ImageIcon className="text-gray-400" />}
                                    <input type="file" ref={coverInputRef} onChange={(e) => handleFileSelect(e, 'cover')} accept="image/*" className="hidden" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">گالری</label>
                                <div onClick={() => galleryInputRef.current?.click()} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-brand-400 text-gray-500 gap-2">
                                    <Layers size={20} /> <span className="text-xs">انتخاب تصاویر</span>
                                </div>
                                <input type="file" ref={galleryInputRef} onChange={(e) => handleFileSelect(e, 'gallery')} accept="image/*" multiple className="hidden" />
                            </div>
                            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="عنوان پروژه" />
                            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg h-24" placeholder="توضیحات..." />
                            <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="موقعیت" />
                            
                            {/* Videos */}
                            <div className="grid grid-cols-2 gap-2">
                                <button type="button" onClick={() => beforeVideoInputRef.current?.click()} className="bg-gray-100 p-2 rounded text-xs">ویدیو قبل</button>
                                <button type="button" onClick={() => afterVideoInputRef.current?.click()} className="bg-gray-100 p-2 rounded text-xs">ویدیو بعد</button>
                                <input type="file" ref={beforeVideoInputRef} onChange={(e) => handleFileSelect(e, 'beforeVideo')} accept="video/*" className="hidden" />
                                <input type="file" ref={afterVideoInputRef} onChange={(e) => handleFileSelect(e, 'afterVideo')} accept="video/*" className="hidden" />
                            </div>

                            <div className="flex gap-2">
                                <button type="button" onClick={fillSampleData} className="flex-1 bg-gray-100 py-2 rounded-lg text-sm">نمونه</button>
                                <button type="submit" disabled={loading} className="flex-1 bg-brand-500 text-white py-2 rounded-lg text-sm">{loading ? '...' : 'ثبت'}</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                    {items.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                            <img src={item.coverImage} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                            <div className="flex-grow">
                                <div className="flex justify-between">
                                    <h3 className="font-bold">{item.title}</h3>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={16}/></button>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- ORDERS TAB --- */}
        {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50 text-gray-500 text-sm">
                            <tr>
                                <th className="p-4">نام مشتری</th>
                                <th className="p-4">شماره تماس</th>
                                <th className="p-4">سرویس درخواستی</th>
                                <th className="p-4">تاریخ ثبت</th>
                                <th className="p-4">وضعیت</th>
                                <th className="p-4">عملیات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.length === 0 ? (
                                <tr><td colSpan={6} className="p-8 text-center text-gray-500">هیچ سفارشی ثبت نشده است.</td></tr>
                            ) : (
                                orders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="p-4 font-bold text-gray-800">{order.fullName}</td>
                                        <td className="p-4 text-gray-600 font-mono text-sm">{order.phone}</td>
                                        <td className="p-4 text-brand-600">{order.serviceTitle}</td>
                                        <td className="p-4 text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString('fa-IR')}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                                {getStatusText(order.status)}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <select 
                                                value={order.status} 
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                                className="bg-white border border-gray-200 text-xs rounded-lg p-1 outline-none focus:ring-2 focus:ring-brand-500"
                                            >
                                                <option value="PENDING">در انتظار</option>
                                                <option value="CONTACTED">تماس گرفته شد</option>
                                                <option value="IN_PROGRESS">در حال انجام</option>
                                                <option value="COMPLETED">تکمیل شده</option>
                                                <option value="CANCELLED">لغو شده</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* --- USERS TAB --- */}
        {activeTab === 'users' && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="p-4">نام</th>
                            <th className="p-4">ایمیل</th>
                            <th className="p-4">نقش</th>
                            <th className="p-4">تاریخ عضویت</th>
                            <th className="p-4">آخرین ورود</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="p-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-xs">{user.fullName.charAt(0)}</div>
                                    {user.fullName}
                                </td>
                                <td className="p-4 text-gray-500 text-sm">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {user.role === 'ADMIN' ? 'مدیر سیستم' : user.role === 'PROFESSIONAL' ? 'متخصص' : 'کارفرما'}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400 text-xs">{new Date(user.createdAt).toLocaleDateString('fa-IR')}</td>
                                <td className="p-4 text-gray-400 text-xs">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fa-IR') : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        )}

        {/* --- CHATS TAB --- */}
        {activeTab === 'chats' && (
            <div className="space-y-4">
                {chatSessions.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">هیچ چتی ثبت نشده است.</div>
                ) : (
                    chatSessions.map((session, idx) => {
                        const sessionUser = users.find(u => u.id === session.userId);
                        return (
                            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex justify-between items-center mb-4 border-b pb-2">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare size={18} className="text-brand-500" />
                                        <span className="font-bold">{sessionUser ? sessionUser.fullName : 'کاربر مهمان'}</span>
                                        <span className="text-xs text-gray-400">({session.messages.length} پیام)</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{new Date(session.lastUpdated).toLocaleString('fa-IR')}</span>
                                </div>
                                <div className="space-y-2 max-h-60 overflow-y-auto bg-gray-50 p-4 rounded-xl">
                                    {session.messages.map(msg => (
                                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] rounded-lg p-2 text-sm ${msg.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-white border border-gray-200'}`}>
                                                <span className="block text-[10px] opacity-50 mb-1">{msg.role === 'user' ? 'کاربر' : 'هوش مصنوعی'}</span>
                                                {msg.text.substring(0, 100)}{msg.text.length > 100 && '...'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        )}

        {/* --- SETTINGS TAB --- */}
        {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Settings size={20} className="text-brand-500"/>
                    تنظیمات عمومی سایت
                </h2>
                <form onSubmit={handleSaveSettings} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-500 border-b pb-2">شبکه‌های اجتماعی</h3>
                        <input type="text" className="w-full p-2 border rounded" placeholder="Instagram" value={siteSettings.instagramUrl} onChange={e => setSiteSettings({...siteSettings, instagramUrl: e.target.value})} />
                        <input type="text" className="w-full p-2 border rounded" placeholder="Telegram" value={siteSettings.telegramUrl} onChange={e => setSiteSettings({...siteSettings, telegramUrl: e.target.value})} />
                        <input type="text" className="w-full p-2 border rounded" placeholder="WhatsApp" value={siteSettings.whatsappUrl} onChange={e => setSiteSettings({...siteSettings, whatsappUrl: e.target.value})} />
                    </div>
                    <div className="space-y-4 pt-4">
                            <h3 className="text-sm font-bold text-gray-500 border-b pb-2">تماس و آدرس</h3>
                            <input type="text" className="w-full p-2 border rounded" placeholder="Phone" value={siteSettings.phoneNumber} onChange={e => setSiteSettings({...siteSettings, phoneNumber: e.target.value})} />
                            <input type="text" className="w-full p-2 border rounded" placeholder="Address" value={siteSettings.address} onChange={e => setSiteSettings({...siteSettings, address: e.target.value})} />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold">{loading ? '...' : 'ذخیره تغییرات'}</button>
                </form>
            </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
