import React, { useState } from 'react';
import { Upload, Calculator, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { GeminiService } from '../services/geminiService';

const AI_COST_ESTIMATOR_PROMPT = `
به عنوان یک متخصص برآورد هزینه ساختمانی، لطفا تصویر آپلود شده را تحلیل کن و یک تخمین هزینه برای بازسازی آن ارائه بده.
خروجی باید دقیقاً در فرمت JSON زیر باشد (بدون هیچ متن اضافه):
{
  "renovation_type": "نوع بازسازی تشخیص داده شده (مثلا آشپزخانه مدرن)",
  "area_estimation": "متراژ تخمینی (عدد)",
  "duration_weeks": "مدت زمان تخمینی به هفته (عدد)",
  "min_cost": "حداقل هزینه (به تومان)",
  "max_cost": "حداکثر هزینه (به تومان)",
  "breakdown": [
    {"item": "عنوان آیتم هزینه‌ای", "cost": "هزینه تخمینی"}
  ],
  "suggestion": "یک پیشنهاد کوتاه برای کاهش هزینه"
}
`;

const AICostEstimator: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleEstimate = async () => {
        if (!file || !preview) return;

        setLoading(true);
        try {
            const base64Data = preview.split(',')[1];
            const response = await GeminiService.getConstructionAdvice(
                AI_COST_ESTIMATOR_PROMPT,
                { mimeType: file.type, data: base64Data }
            );

            // Clean up response to get JSON
            const jsonStr = response.replace(/```json|```/g, '').trim();
            const parsedResult = JSON.parse(jsonStr);
            setResult(parsedResult);
        } catch (error) {
            console.error('Estimation error:', error);
            alert('خطا در برآورد هزینه. لطفا تصویر واضح‌تری ارسال کنید.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-brand-600 p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                    <Calculator />
                    تخمین هوشمند هزینه بازسازی
                </h3>
                <p className="opacity-90 text-sm">عکس فضای فعلی را آپلود کنید تا هوش مصنوعی هزینه را محاسبه کند</p>
            </div>

            <div className="p-6">
                {!result ? (
                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-brand-500 transition-colors cursor-pointer relative bg-gray-50 hover:bg-white"
                            onClick={() => document.getElementById('cost-upload')?.click()}>
                            <input
                                type="file"
                                id="cost-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {preview ? (
                                <img src={preview} alt="Room" className="max-h-64 mx-auto rounded-lg shadow-md" />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-blue-100 text-brand-600 rounded-full flex items-center justify-center mb-4">
                                        <Upload size={32} />
                                    </div>
                                    <p className="font-bold text-gray-700">برای آپلود تصویر کلیک کنید</p>
                                    <p className="text-gray-400 text-sm mt-2">پشتیبانی از JPG و PNG</p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleEstimate}
                            disabled={!file || loading}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${!file || loading
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg hover:shadow-xl hover:-translate-y-1'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    در حال تحلیل مهندسی...
                                </>
                            ) : (
                                <>
                                    <Calculator />
                                    محاسبه آنلاین هزینه
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="animate-fade-in space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 p-4 rounded-2xl border border-green-100 text-center">
                                <span className="block text-green-600 text-xs font-bold mb-1">تخمین مترار</span>
                                <span className="text-xl font-black text-green-700">{result.area_estimation} متر</span>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center">
                                <span className="block text-blue-600 text-xs font-bold mb-1">مدت زمان</span>
                                <span className="text-xl font-black text-blue-700">{result.duration_weeks} هفته</span>
                            </div>
                        </div>

                        <div className="bg-gray-900 text-white p-6 rounded-2xl text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-brand-600 opacity-20 transform -skew-x-12"></div>
                            <div className="relative z-10">
                                <p className="text-gray-300 text-sm mb-2">هزینه تقریبی پروژه</p>
                                <div className="text-3xl font-black mb-1">
                                    {parseInt(result.min_cost).toLocaleString()}
                                    <span className="text-lg font-normal text-gray-400 mx-2">تا</span>
                                    {parseInt(result.max_cost).toLocaleString()}
                                </div>
                                <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs mt-2">تومان</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <CheckCircle size={18} className="text-brand-500" />
                                ریز هزینه‌ها
                            </h4>
                            <div className="space-y-2">
                                {result.breakdown.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-sm text-gray-600">{item.item}</span>
                                        <span className="text-sm font-bold text-gray-900">{item.cost}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-sm text-yellow-800">
                            <span className="font-bold block mb-1">💡 پیشنهاد هوشمند:</span>
                            {result.suggestion}
                        </div>

                        <button
                            onClick={() => setResult(null)}
                            className="w-full py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                        >
                            محاسبه مجدد
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AICostEstimator;
