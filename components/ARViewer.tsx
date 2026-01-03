import React, { useState, useRef, useEffect } from 'react';
import { Camera, Layers, Eraser, Download, Share2 } from 'lucide-react';

const ARViewer: React.FC = () => {
    const [mode, setMode] = useState<'camera' | 'upload'>('upload');
    const [image, setImage] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>('#ffffff');
    const [opacity, setOpacity] = useState(0.5);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const colors = [
        '#ffffff', '#f3f4f6', '#e5e7eb', // Whites
        '#fee2e2', '#fecaca', // Reds
        '#dbeafe', '#bfdbfe', // Blues
        '#dcfce7', '#bbf7d0', // Greens
        '#fef9c3', '#fde047', // Yellows
        '#fae8ff', '#f0abfc', // Purples
    ];

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => setImage(event.target?.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // In a real app, we'd stream this to a video element and capture a frame
            alert('قابلیت دوربین در نسخه دمو در دسترس نیست. لطفا از آپلود تصویر استفاده کنید.');
        } catch (err) {
            console.error(err);
            alert('عدم دسترسی به دوربین');
        }
    };

    // Canvas drawing logic would go here for advanced AR
    // For this demo, we use CSS blending

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-4xl mx-auto">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold flex items-center gap-2 text-gray-800">
                    <Layers className="text-purple-600" />
                    تست رنگ مجازی (AR)
                </h3>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-white rounded-full transition-colors" title="ذخیره">
                        <Download size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-full transition-colors" title="اشتراک‌گذاری">
                        <Share2 size={20} className="text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
                {/* Controls Sidebar */}
                <div className="p-6 bg-white border-l border-gray-100 order-2 md:order-1 flex flex-col gap-6 overflow-y-auto">
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-3">انتخاب تصویر</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => document.getElementById('ar-upload')?.click()}
                                className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-gray-500"
                            >
                                <Upload size={24} />
                                <span className="text-xs mt-2">آپلود</span>
                            </button>
                            <input type="file" id="ar-upload" className="hidden" onChange={handleFileUpload} accept="image/*" />

                            <button
                                onClick={handleCamera}
                                className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-gray-500"
                            >
                                <Camera size={24} />
                                <span className="text-xs mt-2">دوربین</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-3">پالت رنگ</label>
                        <div className="grid grid-cols-5 gap-3">
                            {colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border shadow-sm transition-transform hover:scale-110 ${selectedColor === color ? 'ring-2 ring-purple-500 ring-offset-2 scale-110' : ''}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                            <input
                                type="color"
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                                className="w-8 h-8 rounded-full overflow-hidden border-0 p-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-3 flex justify-between">
                            <span>غلظت رنگ</span>
                            <span className="text-purple-600">{Math.round(opacity * 100)}%</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={opacity}
                            onChange={(e) => setOpacity(parseFloat(e.target.value))}
                            className="w-full accent-purple-600 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="mt-auto p-4 bg-purple-50 rounded-xl text-xs text-purple-800 leading-relaxed">
                        <strong>نکته:</strong> برای نتیجه بهتر، روی دیوارهای روشن و با نور مناسب تست کنید. این یک شبیه‌سازی است و رنگ نهایی ممکن است متفاوت باشد.
                    </div>
                </div>

                {/* Preview Area */}
                <div className="col-span-1 md:col-span-2 bg-gray-100 relative overflow-hidden flex items-center justify-center order-1 md:order-2">
                    {image ? (
                        <div className="relative w-full h-full">
                            <img
                                src={image}
                                alt="Preview"
                                className="w-full h-full object-contain absolute inset-0 z-0"
                            />
                            {/* Simulated AR Overlay - In real app, use canvas for wall detection */}
                            <div
                                className="absolute inset-0 z-10 mix-blend-multiply pointer-events-none"
                                style={{
                                    backgroundColor: selectedColor,
                                    opacity: opacity
                                }}
                            ></div>

                            <div className="absolute top-4 left-4 z-20 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md pointer-events-none">
                                پیش‌نمایش زنده
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400">
                            <Layers size={64} className="mx-auto mb-4 opacity-50" />
                            <p>تصویری انتخاب نشده است</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ARViewer;
