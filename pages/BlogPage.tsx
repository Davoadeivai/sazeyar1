import React from 'react';
import { Clock, User, Tag, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
    const posts = [
        {
            id: 1,
            title: 'راهنمای کامل بازسازی آشپزخانه کوچک',
            excerpt: 'چگونه با تغییرات هوشمندانه، فضای آشپزخانه خود را دلبازتر و کاربردی‌تر کنیم؟ نکات طلایی برای استفاده بهینه از فضاهای پرت.',
            image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            date: '۱۰ دی ۱۴۰۲',
            readTime: '۵ دقیقه',
            category: 'آشپزخانه',
            author: 'مهندس حسینی'
        },
        {
            id: 2,
            title: 'بهترین ترکیب رنگ برای پذیرایی مدرن',
            excerpt: 'بررسی روانشناسی رنگ‌ها و پالت‌های ترند سال ۲۰۲۴ برای دکوراسیون داخلی. چگونه با رنگ طوسی و مکمل‌های آن خانه را لوکس کنیم.',
            image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            date: '۰۵ دی ۱۴۰۲',
            readTime: '۷ دقیقه',
            category: 'طراحی داخلی',
            author: 'سارا راد'
        },
        {
            id: 3,
            title: 'کاهش ۴۰ درصدی هزینه‌ها با عایق‌کاری',
            excerpt: 'چرا عایق‌کاری پنجره‌ها و دیوارها مهمترین بخش بازسازی ساختمان است؟ بررسی انواع پنجره‌های دوجداره و عایق‌های صوتی.',
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            date: '۲۸ آذر ۱۴۰۲',
            readTime: '۴ دقیقه',
            category: 'تاسیسات',
            author: 'مهندس کریمی'
        },
        {
            id: 4,
            title: 'هوشمندسازی خانه در بازسازی',
            excerpt: 'چه امکاناتی را می‌توان در حین بازسازی اضافه کرد؟ از کلیدهای لمسی تا سیستم صوتی و نورپردازی هوشمند با هزینه مناسب.',
            image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            date: '۲۰ آذر ۱۴۰۲',
            readTime: '۶ دقیقه',
            category: 'تکنولوژی',
            author: 'علی محمدی'
        }
    ];

    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">مجله آموزشی هرمس</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        مجموعه‌ای از بهترین مقالات، راهنماها و ترفندهای بازسازی و دکوراسیون داخلی برای اینکه خانه‌ای رویایی بسازید.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-bold text-gray-900 shadow-sm">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                    <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                                    <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-brand-600 transition-colors">
                                    <Link to={`/blog/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                    <span className="text-xs text-gray-400">{post.date}</span>
                                    <Link to={`/blog/${post.id}`} className="group/btn flex items-center gap-2 text-sm font-bold text-brand-600">
                                        مطالعه مقاله
                                        <ChevronLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="bg-gray-50 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                        بارگذاری مقالات بیشتر
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BlogPage;
