import React, { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Download, Share2, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, initialIndex, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  // Reset state when opening a new image or changing index
  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
    setRotation(0);
  }, [initialIndex, isOpen]);

  // Handle Keyboard Navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-') handleZoomOut();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]); // Depend on currentIndex for nav

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
    setRotation(0);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
    setRotation(0);
  }, [images.length]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 0.5));
  const handleRotate = () => setRotation((prev) => prev + 90);

  const handleDownload = async () => {
    const imageUrl = images[currentIndex];
    try {
      // Create a fake anchor to download
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `sazeyar-project-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed', error);
    }
  };

  const handleShare = async () => {
    const imageUrl = images[currentIndex];
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'تصویر پروژه - سازه‌یار',
          text: 'این نمونه‌کار فوق‌العاده را ببینید!',
          url: window.location.href // Or image URL if public
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      // Fallback: Copy Image URL
      navigator.clipboard.writeText(imageUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      
      {/* Top Bar: Controls */}
      <div className="flex justify-between items-center p-4 text-white bg-gradient-to-b from-black/50 to-transparent z-50">
        <div className="text-sm font-mono opacity-80">
          {currentIndex + 1} / {images.length}
        </div>
        
        <div className="flex items-center gap-4">
           {/* Tools */}
           <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm border border-white/10">
              <button onClick={handleZoomOut} className="hover:text-brand-400 transition-colors"><ZoomOut size={20}/></button>
              <span className="text-xs w-8 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={handleZoomIn} className="hover:text-brand-400 transition-colors"><ZoomIn size={20}/></button>
              <div className="w-px h-4 bg-white/20 mx-1"></div>
              <button onClick={handleRotate} className="hover:text-brand-400 transition-colors" title="چرخش"><RotateCw size={20}/></button>
           </div>

           {/* Actions */}
           <div className="flex items-center gap-2">
              <button onClick={handleDownload} className="p-2 hover:bg-white/10 rounded-full transition-all" title="دانلود">
                  <Download size={20} />
              </button>
              <button onClick={handleShare} className="p-2 hover:bg-white/10 rounded-full transition-all" title="اشتراک‌گذاری">
                  {isCopied ? <Check size={20} className="text-green-500"/> : <Share2 size={20} />}
              </button>
              <button onClick={onClose} className="p-2 bg-white/10 hover:bg-red-500/80 rounded-full transition-all ml-4 border border-white/20">
                  <X size={24} />
              </button>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow relative flex items-center justify-center overflow-hidden p-4">
        
        {/* Navigation Buttons */}
        <button 
            onClick={handleNext} // RTL: Next is Left logically, but visually right usually. Let's stick to arrows.
            className="absolute left-4 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110"
        >
            <ChevronLeft size={32} />
        </button>

        <button 
            onClick={handlePrev} 
            className="absolute right-4 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110"
        >
            <ChevronRight size={32} />
        </button>

        {/* Image Container */}
        <div 
            className="relative transition-transform duration-300 ease-out"
            style={{ 
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                cursor: zoom > 1 ? 'grab' : 'default'
            }}
        >
            <img 
                src={images[currentIndex]} 
                alt={`Gallery ${currentIndex}`} 
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-md shadow-2xl"
                draggable={false}
            />
        </div>

      </div>
      
      {/* Footer / Thumbnails Preview (Optional - keeping simple for now) */}
      <div className="h-16 bg-black/50 flex items-center justify-center gap-2 overflow-x-auto px-4 py-2">
          {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => { setCurrentIndex(idx); setZoom(1); setRotation(0); }}
                className={`flex-shrink-0 w-10 h-10 rounded-md overflow-hidden border-2 transition-all ${currentIndex === idx ? 'border-brand-500 opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                  <img src={img} className="w-full h-full object-cover" />
              </button>
          ))}
      </div>

    </div>
  );
};

export default ImageLightbox;