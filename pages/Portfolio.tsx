import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storageService';
import { PortfolioItem, User, UserRole } from '../types';
import { MapPin, Calendar, Layers, Edit2, Save, X, Video, Image as ImageIcon, Search, Share2, Check, Clock } from 'lucide-react';
import VideoComparison from '../components/VideoComparison';
import { Link } from 'react-router-dom';

const Portfolio: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<PortfolioItem>>({});

  useEffect(() => {
    setItems(StorageService.getPortfolioItems());
    setCurrentUser(StorageService.getCurrentUser());
  }, []);

  const startEditing = (item: PortfolioItem) => {
    setEditingId(item.id);
    setEditFormData(item);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const saveProject = async () => {
    if (!editingId) return;
    
    const originalItem = items.find(i => i.id === editingId);
    if (!originalItem) return;

    const updatedItem = { 
      ...originalItem, 
      ...editFormData,
      updatedAt: new Date().toISOString()
    } as PortfolioItem;
    
    // Optimistic update for UI
    setItems(prev => prev.map(item => item.id === editingId ? updatedItem : item));
    setEditingId(null);

    // Save to backend
    await StorageService.updatePortfolioItem(updatedItem);
  };

  const handleShare = async (item: PortfolioItem) => {
    const url = `${window.location.origin}${window.location.pathname}#${item.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `پروژه ${item.title} | سازه‌یار`,
          text: item.description,
          url: url
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) {
        alert('مرورگر شما از قابلیت اشتراک‌گذاری پشتیبانی نمی‌کند.');
      }
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-brand-600 font-bold tracking-wider text-sm uppercase bg-brand-50 px-3 py-1 rounded-full">گالری تصاویر</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">نمونه‌کارهای بازسازی</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            تغییرات واقعی را ببینید. مستندات ویدیویی از پروژه‌های انجام شده توسط تیم متخصص سازه‌یار.
          </p>
        </div>

        {/* Search Bar */}
        {items.length > 0 && (
          <div className="max-w-xl mx-auto mb-16 relative">
            <div className="relative group">
              <input
                type="text"
                placeholder="جستجو در پروژه‌ها (عنوان، توضیحات، موقعیت)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-gray-100 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all text-gray-700 shadow-sm group-hover:shadow-md"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-500 transition-colors" size={20} />
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <Layers size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">هنوز پروژه‌ای ثبت نشده است</h3>
            <p className="text-gray-500 mt-2 mb-6">به زودی نمونه‌کارهای جدید اضافه خواهد شد.</p>
            <Link to="/" className="text-brand-600 font-bold hover:underline">بازگشت به صفحه اصلی</Link>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white inline-flex p-4 rounded-full mb-4 shadow-sm">
              <Search size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">نتیجه‌ای یافت نشد</h3>
            <p className="text-gray-500 mt-1">لطفا با کلمات کلیدی دیگری جستجو کنید.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-brand-600 font-medium hover:underline"
            >
              نمایش همه پروژه‌ها
            </button>
          </div>
        ) : (
          <div className="space-y-24">
            {filteredItems.map((item, index) => (
              <div id={item.id} key={item.id} className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 group transition-all hover:border-brand-100">
                
                {/* Cover Image Header */}
                {item.coverImage && editingId !== item.id && (
                  <div className="w-full h-64 md:h-80 relative">
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                  </div>
                )}

                <div className="p-6 md:p-10 relative">
                    {/* Action Controls (Admin + Share) */}
                    <div className="absolute top-6 left-6 flex gap-2 z-20">
                        {/* Admin Controls */}
                        {currentUser?.role === UserRole.ADMIN && (
                            <>
                                {editingId === item.id ? (
                                    <>
                                        <button onClick={saveProject} className="bg-green-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg hover:bg-green-600 transition-all hover:scale-105">
                                        <Save size={18} />
                                        ذخیره پروژه
                                        </button>
                                        <button onClick={cancelEditing} className="bg-gray-100 text-gray-600 px-3 py-2 rounded-xl hover:bg-red-100 hover:text-red-500 transition-all">
                                        <X size={20} />
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => startEditing(item)} className="bg-white/90 backdrop-blur text-brand-600 border border-brand-200 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold shadow-sm hover:bg-brand-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                                        <Edit2 size={16} />
                                        ویرایش
                                    </button>
                                )}
                            </>
                        )}
                        
                        {/* Share Button */}
                        {editingId !== item.id && (
                            <button
                                onClick={() => handleShare(item)}
                                className={`bg-white/90 backdrop-blur border p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 text-sm font-bold shadow-sm transition-all ${
                                    copiedId === item.id 
                                    ? 'text-green-600 border-green-200 bg-green-50' 
                                    : 'text-gray-500 border-gray-200 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200'
                                }`}
                                title="اشتراک‌گذاری"
                            >
                                {copiedId === item.id ? <Check size={18} /> : <Share2 size={18} />}
                                <span className="hidden md:inline">{copiedId === item.id ? 'کپی شد' : 'اشتراک'}</span>
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div className="flex-grow w-full md:w-auto">
                            {editingId === item.id ? (
                            <div className="space-y-3 w-full">
                                <input 
                                type="text" 
                                value={editFormData.title || ''}
                                onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                                className="text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-brand-500 focus:outline-none bg-transparent w-full pb-1"
                                placeholder="عنوان پروژه"
                                />
                                <div className="flex flex-wrap gap-4">
                                <input 
                                    type="text"
                                    value={editFormData.location || ''}
                                    onChange={(e) => setEditFormData({...editFormData, location: e.target.value})}
                                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                                    placeholder="موقعیت (مثلا: تهران)"
                                />
                                </div>
                            </div>
                            ) : (
                            <>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 border-r-4 border-brand-500 pr-4">
                                {item.title}
                                </h2>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 pr-5">
                                    {item.location && (
                                        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                                            <MapPin size={14} /> {item.location}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                                        <Calendar size={14} /> {new Date(item.createdAt).toLocaleDateString('fa-IR')}
                                    </span>
                                    {item.updatedAt && (
                                      <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs" title="آخرین بروزرسانی">
                                          <Clock size={14} /> 
                                          بروزرسانی: {new Date(item.updatedAt).toLocaleDateString('fa-IR')}
                                      </span>
                                    )}
                                </div>
                            </>
                            )}
                        </div>
                        <div className="hidden md:block text-brand-100">
                            <span className="text-6xl font-black opacity-20">{(index + 1).toLocaleString('fa-IR')}</span>
                        </div>
                    </div>

                    {editingId === item.id ? (
                    <textarea
                        value={editFormData.description || ''}
                        onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                        className="w-full p-4 border border-gray-200 rounded-xl mb-8 focus:ring-2 focus:ring-brand-500 outline-none min-h-[120px]"
                        placeholder="توضیحات پروژه..."
                    />
                    ) : (
                    <p className="text-gray-600 leading-relaxed mb-8 text-lg max-w-4xl">
                        {item.description}
                    </p>
                    )}

                    {editingId === item.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                        <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 flex items-center gap-1"><Video size={14}/> لینک ویدیو قبل</label>
                        <input 
                            type="text" 
                            dir="ltr"
                            value={editFormData.beforeVideoUrl || ''}
                            onChange={(e) => setEditFormData({...editFormData, beforeVideoUrl: e.target.value})}
                            className="w-full p-2 rounded-lg border border-gray-200 text-sm font-mono"
                        />
                        </div>
                        <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 flex items-center gap-1"><Video size={14}/> لینک ویدیو بعد</label>
                        <input 
                            type="text" 
                            dir="ltr"
                            value={editFormData.afterVideoUrl || ''}
                            onChange={(e) => setEditFormData({...editFormData, afterVideoUrl: e.target.value})}
                            className="w-full p-2 rounded-lg border border-gray-200 text-sm font-mono"
                        />
                        </div>
                    </div>
                    ) : null}

                    {/* Video Comparison */}
                    <div className="mb-12">
                         <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Video className="text-brand-500" size={20}/>
                            ویدیوهای پروژه
                         </h3>
                         <VideoComparison 
                             beforeUrl={editingId === item.id ? (editFormData.beforeVideoUrl || '') : item.beforeVideoUrl} 
                             afterUrl={editingId === item.id ? (editFormData.afterVideoUrl || '') : item.afterVideoUrl} 
                         />
                    </div>
                    
                    {/* Gallery Grid */}
                    {item.galleryImages && item.galleryImages.length > 0 && (
                        <div className="border-t border-gray-100 pt-8">
                             <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <ImageIcon className="text-brand-500" size={20}/>
                                گالری تصاویر
                             </h3>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {item.galleryImages.map((img, idx) => (
                                    <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all">
                                        <img src={img} alt={`${item.title} - ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    )}
                    
                    <div className="mt-8 text-center md:text-right">
                        <span className="inline-block text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                            شناسه پروژه: {item.id.split('-')[0]}
                        </span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;