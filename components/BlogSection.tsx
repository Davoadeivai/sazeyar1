import React from 'react';
import { ArrowLeft, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogSection: React.FC = () => {
    const posts = [
        {
            id: 1,
            title: 'راهنمای کامل بازسازی آشپزخانه کوچک',
            excerpt: 'چگونه با تغییرات هوشمندانه، فضای آشپزخانه خود را دلبازتر و کاربردی‌تر کنیم؟',
            image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            date: '۱۰ دی ۱۴۰۲',
            readTime: '۵ دقیقه',
            category: 'آشپزخانه'
        },
        {
            id: 2,
            title: 'بهترین ترکیب رنگ برای پذیرایی مدرن',
            excerpt: 'بررسی روانشناسی رنگ‌ها و پالت‌های ترند سال ۲۰۲۴ برای دکوراسیون داخلی.',
            image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            date: '۰۵ دی ۱۴۰۲',
            readTime: '۷ دقیقه',
            category: 'طراحی داخلی'
        },
        {
            id: 3,
            title: 'کاهش ۴۰ درصدی هزینه‌ها با عایق‌کاری',
            excerpt: 'چرا عایق‌کاری پنجره‌ها و دیوارها مهمترین بخش بازسازی ساختمان است؟',
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            date: '۲۸ آذر ۱۴۰۲',
            readTime: '۴ دقیقه',
            category: 'تاسیسات'
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 mb-2">مجله آموزشی هرمس</h2>
                        <p className="text-gray-500">جدیدترین مقالات و ترفندهای بازسازی و دکوراسیون</p>
                    </div>
                    <Link to="/blog" className="hidden md:flex items-center gap-2 text-brand-600 font-bold hover:gap-3 transition-all">
                        مشاهده همه مقالات
                        <ArrowLeft size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-800">
                                    {post.category}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime} مطالعه</span>
                                <span>•</span>
                                <span>{post.date}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                {post.excerpt}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-brand-600 font-bold">
                        مشاهده همه مقالات
                        <ArrowLeft size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
