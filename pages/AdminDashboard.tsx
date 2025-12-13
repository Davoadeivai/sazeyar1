import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { UserRole, PortfolioItem } from '../types';
import { Video, MapPin, UploadCloud, Trash2, Plus, AlertTriangle, Image as ImageIcon, X, FileVideo, Layers } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Refs for file inputs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const beforeVideoInputRef = useRef<HTMLInputElement>(null);
  const afterVideoInputRef = useRef<HTMLInputElement>(null);

  // Form State
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
    loadItems();
  }, [navigate]);

  const loadItems = () => {
    setItems(StorageService.getPortfolioItems());
  };

  const fillSampleData = () => {
    setFormData({
      title: 'بازسازی آپارتمان ۱۲۰ متری نیاوران',
      description: 'نوسازی کامل آشپزخانه، تغییر کفپوش‌ها به پارکت لمینت آلمانی و اجرای سقف کناف مدرن.',
      location: 'تهران، نیاوران',
      coverImage: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2071&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=2000&auto=format&fit=crop'
      ],
      beforeVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 
      afterVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' 
    });
  };

  // Handle File Selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'gallery' | 'beforeVideo' | 'afterVideo') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    setUploadProgress(0); // Reset progress

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => (prev >= 90 ? 90 : prev + 10));
    }, 100);

    if (type === 'cover') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, coverImage: reader.result as string }));
        finishUpload(interval);
      };
      reader.readAsDataURL(file);
    } else if (type === 'gallery') {
      // Handle multiple images
      const newImages: string[] = [];
      let processedCount = 0;
      
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          processedCount++;
          if (processedCount === files.length) {
             setFormData(prev => ({ ...prev, galleryImages: [...prev.galleryImages, ...newImages] }));
             finishUpload(interval);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      // Video handling (ObjectURL)
      const file = files[0];
      const url = URL.createObjectURL(file);
      if (type === 'beforeVideo') {
        setFormData(prev => ({ ...prev, beforeVideoUrl: url }));
      } else {
        setFormData(prev => ({ ...prev, afterVideoUrl: url }));
      }
      finishUpload(interval);
    }
  };

  const finishUpload = (interval: any) => {
    clearInterval(interval);
    setUploadProgress(100);
    setTimeout(() => { setLoading(false); setUploadProgress(0); }, 500);
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert('لطفا عنوان پروژه را وارد کنید');
      return;
    }

    setLoading(true);
    await StorageService.addPortfolioItem(formData);
    setLoading(false);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      location: '',
      coverImage: '',
      galleryImages: [],
      beforeVideoUrl: '',
      afterVideoUrl: ''
    });
    
    // Clear inputs
    if (coverInputRef.current) coverInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
    if (beforeVideoInputRef.current) beforeVideoInputRef.current.value = '';
    if (afterVideoInputRef.current) afterVideoInputRef.current.value = '';
    
    loadItems();
    alert('پروژه با موفقیت ثبت شد');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('آیا از حذف این پروژه اطمینان دارید؟')) {
      await StorageService.deletePortfolioItem(id);
      loadItems();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">پنل مدیریت محتوا</h1>
          <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium border border-red-200">
            دسترسی ادمین
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Plus size={20} className="text-brand-500" />
                افزودن پروژه جدید
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Upload Progress Bar */}
                {loading && uploadProgress > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                    <div className="bg-brand-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}

                {/* Cover Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تصویر اصلی (کاور)</label>
                  <div 
                    onClick={() => coverInputRef.current?.click()}
                    className={`relative w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${formData.coverImage ? 'border-brand-500 bg-brand-50' : 'border-gray-300 hover:border-brand-400 hover:bg-gray-50'}`}
                  >
                    {formData.coverImage ? (
                      <>
                        <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover rounded-xl opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-white/90 px-3 py-1 rounded-lg text-xs font-bold text-brand-700 shadow-sm">تغییر تصویر</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="text-gray-400 mb-2" size={24} />
                        <span className="text-xs text-gray-500">انتخاب عکس کاور</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={coverInputRef}
                      onChange={(e) => handleFileSelect(e, 'cover')}
                      accept="image/*"
                      className="hidden" 
                    />
                  </div>
                </div>

                {/* Gallery Upload */}
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">گالری تصاویر پروژه</label>
                   <div 
                     onClick={() => galleryInputRef.current?.click()}
                     className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-brand-400 hover:bg-gray-50 transition-all text-gray-500 gap-2"
                   >
                      <Layers size={20} />
                      <span className="text-xs">افزودن تصاویر بیشتر</span>
                   </div>
                   <input 
                      type="file" 
                      ref={galleryInputRef}
                      onChange={(e) => handleFileSelect(e, 'gallery')}
                      accept="image/*"
                      multiple
                      className="hidden" 
                   />
                   
                   {/* Gallery Preview Grid */}
                   {formData.galleryImages.length > 0 && (
                     <div className="grid grid-cols-4 gap-2 mt-3">
                        {formData.galleryImages.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(idx)}
                              className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                     </div>
                   )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عنوان پروژه</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="مثلا: بازسازی ویلای لواسان"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات کوتاه</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 h-24 resize-none"
                    placeholder="شرح عملیات انجام شده..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">موقعیت</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="تهران، شهرک غرب"
                  />
                </div>

                {/* Video Uploads */}
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  
                  {/* Before Video */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-2"><Video size={16} className="text-red-500" /> ویدیو قبل از کار</span>
                      {formData.beforeVideoUrl && <span className="text-xs text-green-600 flex items-center gap-1"><UploadCloud size={12}/> فایل انتخاب شد</span>}
                    </label>
                    <div className="flex gap-2">
                       <input
                          type="text"
                          value={formData.beforeVideoUrl}
                          onChange={e => setFormData({...formData, beforeVideoUrl: e.target.value})}
                          className="flex-grow px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-left ltr text-xs"
                          placeholder="لینک یا انتخاب فایل..."
                        />
                       <button 
                         type="button"
                         onClick={() => beforeVideoInputRef.current?.click()}
                         className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors"
                         title="آپلود فایل"
                       >
                         <FileVideo size={20} />
                       </button>
                       <input type="file" ref={beforeVideoInputRef} onChange={(e) => handleFileSelect(e, 'beforeVideo')} accept="video/*" className="hidden" />
                    </div>
                  </div>

                  {/* After Video */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-2"><Video size={16} className="text-green-600" /> ویدیو بعد از کار</span>
                      {formData.afterVideoUrl && <span className="text-xs text-green-600 flex items-center gap-1"><UploadCloud size={12}/> فایل انتخاب شد</span>}
                    </label>
                    <div className="flex gap-2">
                       <input
                          type="text"
                          value={formData.afterVideoUrl}
                          onChange={e => setFormData({...formData, afterVideoUrl: e.target.value})}
                          className="flex-grow px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-left ltr text-xs"
                          placeholder="لینک یا انتخاب فایل..."
                        />
                       <button 
                         type="button"
                         onClick={() => afterVideoInputRef.current?.click()}
                         className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors"
                         title="آپلود فایل"
                       >
                         <FileVideo size={20} />
                       </button>
                       <input type="file" ref={afterVideoInputRef} onChange={(e) => handleFileSelect(e, 'afterVideo')} accept="video/*" className="hidden" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                    <button
                        type="button"
                        onClick={fillSampleData}
                        className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors"
                    >
                        نمونه تستی
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-brand-500 text-white py-3 rounded-xl font-medium text-sm hover:bg-brand-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20"
                    >
                        {loading ? 'در حال آپلود...' : (
                            <>
                            <UploadCloud size={18} />
                            انتشار پروژه
                            </>
                        )}
                    </button>
                </div>
              </form>
            </div>
          </div>

          {/* List of Items */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">پروژه‌های منتشر شده</h2>
            {items.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 border-dashed p-12 text-center text-gray-500">
                    هنوز هیچ پروژه‌ای ثبت نشده است.
                </div>
            ) : (
                items.map(item => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-4 group hover:shadow-md transition-shadow flex gap-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden relative">
                           {item.coverImage ? (
                             <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center text-gray-400">
                               <ImageIcon size={24} />
                             </div>
                           )}
                           {item.galleryImages && item.galleryImages.length > 0 && (
                             <div className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] px-1.5 rounded-md flex items-center gap-0.5">
                               <Layers size={10} />
                               {item.galleryImages.length}
                             </div>
                           )}
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                <button 
                                    onClick={() => handleDelete(item.id)}
                                    className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                <span className="flex items-center gap-1"><MapPin size={14} /> {item.location || 'نامشخص'}</span>
                                <span>{new Date(item.createdAt).toLocaleDateString('fa-IR')}</span>
                            </div>
                            <p className="text-xs text-gray-400 truncate max-w-md">{item.description}</p>
                        </div>
                    </div>
                ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;