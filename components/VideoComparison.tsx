import React from 'react';
import { Play } from 'lucide-react';

interface VideoComparisonProps {
  beforeUrl: string;
  afterUrl: string;
}

const VideoComparison: React.FC<VideoComparisonProps> = ({ beforeUrl, afterUrl }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative group rounded-xl overflow-hidden bg-gray-900 aspect-video shadow-lg">
        <div className="absolute top-4 right-4 bg-red-600/90 text-white px-3 py-1 rounded-full text-sm font-bold z-10 backdrop-blur-sm shadow-md">
          قبل از بازسازی
        </div>
        <video 
          controls 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          src={beforeUrl}
        />
      </div>
      
      <div className="relative group rounded-xl overflow-hidden bg-gray-900 aspect-video shadow-lg ring-2 ring-brand-500/50">
        <div className="absolute top-4 right-4 bg-green-600/90 text-white px-3 py-1 rounded-full text-sm font-bold z-10 backdrop-blur-sm shadow-md">
          بعد از بازسازی
        </div>
        <video 
          controls 
          className="w-full h-full object-cover"
          src={afterUrl}
        />
      </div>
    </div>
  );
};

export default VideoComparison;
