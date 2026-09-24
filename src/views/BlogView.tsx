import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  Tag, 
  ArrowRight, 
  Search, 
  ChevronRight,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { BLOGS } from '../data/blogs';
import { BlogPost } from '../types';

export const BlogView: React.FC = () => {
  const { selectedBlogId, setView } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentArticle, setCurrentArticle] = useState<BlogPost | null>(
    BLOGS.find((b) => b.id === selectedBlogId) || null
  );

  const categories = ['All', 'Chronic Care', 'Antibiotic Stewardship', 'Preventive Health', 'Seasonal Health', 'Ayurveda & Science', 'Child Health'];

  const filteredBlogs = BLOGS.filter((b) => {
    if (selectedCategory !== 'All' && b.category !== selectedCategory) return false;
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q);
    }
    return true;
  });

  if (currentArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <button
          onClick={() => setCurrentArticle(null)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5D57] dark:text-[#A8D5BA] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Health Articles</span>
        </button>

        <article className="space-y-6 bg-white dark:bg-[#132422] rounded-3xl p-6 sm:p-10 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DFF5EC] text-[#0B5D57]">
              {currentArticle.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white leading-tight">
              {currentArticle.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
              <span className="font-medium text-stone-700 dark:text-stone-300">By {currentArticle.author}</span>
              <span>•</span>
              <span>{currentArticle.date}</span>
              <span>•</span>
              <span>{currentArticle.readTime}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F0] dark:bg-stone-900 border border-[#E6DFD3] dark:border-stone-800 text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic">
            "{currentArticle.summary}"
          </div>

          <div className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 space-y-4">
            <p>{currentArticle.content}</p>
          </div>

          <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {currentArticle.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => setView('shop')}
              className="px-5 py-2.5 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white text-xs font-bold transition flex items-center gap-2"
            >
              <span>Explore Related Medications</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D57] dark:text-[#A8D5BA]">
          Clinical Advisory & Patient Education
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
          Apothecary Pharmacist Journal
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          Guidance on chronic care, antibiotic resistance, generic formulations, and wellness written by our licensed dispensary team in Pune.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedCategory === cat
                ? 'bg-[#0B5D57] text-white shadow-xs'
                : 'bg-white dark:bg-[#132422] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => setCurrentArticle(blog)}
            className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] hover:border-[#0B5D57] dark:hover:border-[#A8D5BA] cursor-pointer hover:shadow-md transition flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0B5D57] dark:text-[#A8D5BA]">{blog.category}</span>
                <span className="text-stone-400">{blog.readTime}</span>
              </div>

              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white group-hover:text-[#0B5D57] dark:group-hover:text-[#A8D5BA] transition line-clamp-2">
                {blog.title}
              </h3>

              <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                {blog.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400 text-[11px]">{blog.author}</span>
              <span className="font-bold text-[#0B5D57] dark:text-[#A8D5BA] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Article <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
