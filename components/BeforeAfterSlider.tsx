import React, { useState, useRef, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage, className = '' }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);
  
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isResizing || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let clientX;
    
    if ('touches' in e) {
       clientX = e.touches[0].clientX;
    } else {
       clientX = (e as MouseEvent).clientX;
    }

    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove as any);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove as any);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove as any);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className={`relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl cursor-col-resize select-none group shadow-2xl ${className}`} ref={containerRef}>
      {/* Before Image (Base) */}
      <img
        src={beforeImage}
        alt="Before"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-sm z-10">
        قبل از اجرا
      </div>

      {/* After Image (Clipped) */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt="After"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-brand-600/90 text-white px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-sm z-10 shadow-lg">
          بعد از اجرا
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-600 hover:scale-110 transition-transform">
          <ChevronsLeftRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;