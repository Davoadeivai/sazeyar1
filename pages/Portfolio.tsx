import React, { useEffect, useState, useRef } from 'react';
import { StorageService } from '../services/storageService';
import { PortfolioItem, User, UserRole } from '../types';
import { MapPin, Calendar, Layers, Edit2, Save, X, Video, Image as ImageIcon, Search, Share2, Check, Clock, Plus, Trash2, ArrowRight, ArrowLeft, Maximize2 } from 'lucide-react';
import VideoComparison from '../components/VideoComparison';
import ImageLightbox from '../components/ImageLightbox';
import { Link } from 'react-router-dom';
import { addWatermark } from '../utils/imageProcessor';

const Portfolio: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<PortfolioItem>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Fix: handle async StorageService call in useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioItems = await StorageService.getPortfolioItems();
        setItems(portfolioItems);
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
      }
      setCurrentUser(StorageService.getCurrentUser());
    };
    fetchData();
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

    // Fix: await the async updatePortfolioItem method
    try {
      await StorageService.updatePortfolioItem(updatedItem);
    } catch (error) {
      console.error("Error updating project:", error);
      // Rollback on failure
      const portfolioItems = await StorageService.getPortfolioItems();
      setItems(portfolioItems);
    }
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

  // Gallery Management Functions
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      // Fix: Explicitly type file as File to fix TS unknown parameter error
      const promises = Array.from(files).map((file: File) => addWatermark(file));
      const newImages = await Promise.all(promises);

      setEditFormData(prev => ({
        ...prev,
        galleryImages: [...(prev.galleryImages || []), ...newImages]
      }));
    } catch (err) {
      console.error("Gallery upload error:", err);
      alert('خطا در بارگذاری تصاویر. لطفا مجدد تلاش کنید.');
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeGalleryImage = (index: number) => {
    setEditFormData(prev => ({
      ...prev,
      galleryImages: (prev.galleryImages || []).filter((_, i) => i !== index)
    }));
  };

  const moveGalleryImage = (index: number, direction: number) => {
    const images = [...(editFormData.galleryImages || [])];
    const newIndex = index + direction;

    if (newIndex >= 0 && newIndex < images.length) {
      [images[index], images[newIndex]] = [images[newIndex], images[index]];
      setEditFormData(prev => ({ ...prev, galleryImages: images }));
    }
  };

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-gray-50 min-h-screen py-16">

      {/* Lightbox Component */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />

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

                {/* Cover Image Header - Clickable for Lightbox */}
                {item.coverImage && editingId !== item.id && (
                  <div
                    className="w-full h-64 md:h-80 relative cursor-pointer group/cover"
                    onClick={() => openLightbox([item.coverImage!, ...(item.galleryImages || [])], 0)}
                  >
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                      <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                        <Maximize2 size={20} />
                        مشاهده تمام صفحه
                      </span>
                    </div>
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
                        className={`bg-white/90 backdrop-blur border p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 text-sm font-bold shadow-sm transition-all ${copiedId === item.id
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
                          <label className="text-xs font-bold text-gray-500">عنوان پروژه</label>
                          <input
                            type="text"
                            value={editFormData.title || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                            className="text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-brand-500 focus:outline-none bg-transparent w-full pb-1"
                            placeholder="عنوان پروژه"
                          />
                          <div className="flex flex-wrap gap-4 pt-2">
                            <input
                              type="text"
                              value={editFormData.location || ''}
                              onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none w-full md:w-auto"
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
                              <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs" title="آخرین ویرایش">
                                <Clock size={14} />
                                ویرایش: {new Date(item.updatedAt).toLocaleString('fa-IR', { dateStyle: 'medium', timeStyle: 'short' })}
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
                    <div className="mb-8">
                      <label className="text-xs font-bold text-gray-500 block mb-1">توضیحات</label>
                      <textarea
                        value={editFormData.description || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none min-h-[120px]"
                        placeholder="توضیحات پروژه..."
                      />
                    </div>
                  ) : (
                    <p className="text-gray-600 leading-relaxed mb-8 text-lg max-w-4xl">
                      {item.description}
                    </p>
                  )}

                  {editingId === item.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 flex items-center gap-1"><Video size={14} /> لینک ویدیو قبل</label>
                        <input
                          type="text"
                          dir="ltr"
                          value={editFormData.beforeVideoUrl || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, beforeVideoUrl: e.target.value })}
                          className="w-full p-2 rounded-lg border border-gray-200 text-sm font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 flex items-center gap-1"><Video size={14} /> لینک ویدیو بعد</label>
                        <input
                          type="text"
                          dir="ltr"
                          value={editFormData.afterVideoUrl || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, afterVideoUrl: e.target.value })}
                          className="w-full p-2 rounded-lg border border-gray-200 text-sm font-mono"
                        />
                      </div>
                    </div>
                  ) : null}

                  {/* Video Comparison */}
                  <div className="mb-12">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Video className="text-brand-500" size={20} />
                      ویدیوهای پروژه
                    </h3>
                    <VideoComparison
                      beforeUrl={editingId === item.id ? (editFormData.beforeVideoUrl || '') : item.beforeVideoUrl}
                      afterUrl={editingId === item.id ? (editFormData.afterVideoUrl || '') : item.afterVideoUrl}
                    />
                  </div>

                  {/* Gallery Grid */}
                  {editingId === item.id ? (
                    <div className="border-t border-gray-100 pt-8 mt-8">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                          <ImageIcon className="text-brand-500" size={20} />
                          مدیریت گالری تصاویر
                        </h3>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-sm bg-brand-50 text-brand-600 px-3 py-1.5 rounded-lg hover:bg-brand-100 transition-colors flex items-center gap-1 font-bold"
                        >
                          <Plus size={16} />
                          افزودن تصویر
                        </button>
                        <input
                          type="file"
                          hidden
                          ref={fileInputRef}
                          multiple
                          accept="image/*"
                          onChange={handleGalleryUpload}
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {(editFormData.galleryImages || []).map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group bg-gray-100 border border-gray-200 shadow-sm">
                            <img src={img} className="w-full h-full object-cover" alt={`Edit ${idx}`} />

                            {/* Overlay Controls */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                              <button
                                onClick={() => removeGalleryImage(idx)}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-md"
                                title="حذف"
                              >
                                <Trash2 size={16} />
                              </button>
                              <div className="flex gap-2">
                                <button
                                  disabled={idx === 0}
                                  onClick={() => moveGalleryImage(idx, -1)}
                                  className="bg-white text-gray-800 p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-all"
                                  title="جابجایی به راست"
                                >
                                  <ArrowRight size={14} />
                                </button>
                                <button
                                  disabled={idx === (editFormData.galleryImages?.length || 0) - 1}
                                  onClick={() => moveGalleryImage(idx, 1)}
                                  className="bg-white text-gray-800 p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-all"
                                  title="جابجایی به چپ"
                                >
                                  <ArrowLeft size={14} />
                                </button>
                              </div>
                            </div>

                            <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                              {idx + 1}
                            </div>
                          </div>
                        ))}

                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-colors text-gray-400 hover:text-brand-500 bg-white"
                        >
                          <Plus size={32} />
                          <span className="text-xs font-medium mt-2">افزودن</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    item.galleryImages && item.galleryImages.length > 0 && (
                      <div className="border-t border-gray-100 pt-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                          <ImageIcon className="text-brand-500" size={20} />
                          گالری تصاویر
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {item.galleryImages.map((img, idx) => (
                            <div
                              key={idx}
                              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
                              onClick={() => openLightbox([item.coverImage!, ...item.galleryImages!], idx + 1)} // idx + 1 because cover is index 0
                            >
                              <img src={img} alt={`${item.title} - ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 className="text-white drop-shadow-md" size={32} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
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
