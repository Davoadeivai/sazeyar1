import React, { useState } from 'react';
import { Star, ThumbsUp, User } from 'lucide-react';

interface Review {
    id: number;
    user: string;
    rating: number;
    date: string;
    avatar?: string;
    comment: string;
    likes: number;
    projectTitle: string;
}

// Mock Data
const MOCK_REVIEWS: Review[] = [
    { id: 1, user: 'علی محمدی', rating: 5, date: '1402/10/12', comment: 'کیفیت کار فوق‌العاده بود. نظافت نهایی عالی.', likes: 12, projectTitle: 'بازسازی آپارتمان مدرن' },
    { id: 2, user: 'سارا رضایی', rating: 4, date: '1402/09/25', comment: 'زمانبندی کمی طولانی شد اما نتیجه ارزشش را داشت.', likes: 5, projectTitle: 'نوسازی آشپزخانه کلاسیک' },
    { id: 3, user: 'رضا کریمی', rating: 5, date: '1402/08/10', comment: 'بسیار حرفه‌ای و خوش برخورد. قیمت مناسب نسبت به کیفیت.', likes: 8, projectTitle: 'طراحی داخلی مینیمال' },
];

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const review: Review = {
            id: Date.now(),
            user: 'کاربر مهمان', // In real app, get from auth context
            rating: newRating,
            date: new Date().toLocaleDateString('fa-IR'),
            comment: newComment,
            likes: 0,
            projectTitle: 'پروژه عمومی'
        };
        setReviews([review, ...reviews]);
        setNewComment('');
        setNewRating(5);
        alert('نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود.');
    };

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">نظرات مشتریان</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex text-yellow-500">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} fill="currentColor" />)}
                            </div>
                            <span className="text-gray-600 font-bold">4.8 از 5</span>
                            <span className="text-gray-400 text-sm">(بر اساس 48 نظر)</span>
                        </div>
                    </div>
                    <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                        ثبت نظر جدید
                    </button>
                </div>

                {/* Review Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200">
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">امتیاز شما</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setNewRating(star)}
                                    className={`transition-transform hover:scale-110 ${star <= newRating ? 'text-yellow-500' : 'text-gray-300'}`}
                                >
                                    <Star size={24} fill={star <= newRating ? "currentColor" : "none"} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">نظر شما</label>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all h-24 resize-none"
                            placeholder="تجربه خود را بنویسید..."
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="text-brand-600 font-bold text-sm hover:text-brand-700">ارسال نظر</button>
                </form>
            </div>

            <div className="divide-y divide-gray-100">
                {reviews.map((review) => (
                    <div key={review.id} className="p-8 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{review.user}</h4>
                                    <span className="text-xs text-gray-500">{review.projectTitle} | {review.date}</span>
                                </div>
                            </div>
                            <div className="flex text-yellow-500">
                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">{review.comment}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <button className="flex items-center gap-1 hover:text-brand-500 transition-colors">
                                <ThumbsUp size={16} />
                                <span>مفید بود ({review.likes})</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 text-center border-t border-gray-100">
                <button className="text-brand-600 font-bold text-sm hover:text-brand-700">نمایش نظرات بیشتر</button>
            </div>
        </div>
    );
};

export default Reviews;
