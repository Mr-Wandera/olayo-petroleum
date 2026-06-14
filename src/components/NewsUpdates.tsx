import React, { useState } from 'react';
import { NewsArticle } from '../types';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

interface NewsUpdatesProps {
  news: NewsArticle[];
}

export default function NewsUpdates({ news }: NewsUpdatesProps) {
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  return (
    <section id="news" className="py-24 transition-colors duration-300 bg-white dark:bg-black border-b border-neutral-150 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-xl mb-16">
          <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest font-mono">Corporate news index</span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mt-1">
            NEWS & ANNOUNCEMENTS
          </h2>
          <div className="w-16 h-1 bg-green-500 mt-3 rounded-full" />
          <p className="mt-4 text-sm text-neutral-550 dark:text-neutral-450 leading-relaxed font-normal">
            Stay up-to-date with Olayo Petroleum’s operational milestones, expansion initiatives, safety seminars, and local fuel discount programs.
          </p>
        </div>

        {/* News Grid articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {news.map((item) => (
            <div 
              key={item.id} 
              className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 relative h-48 sm:h-full bg-neutral-900">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[10px] text-green-650 dark:text-green-400 font-bold uppercase font-mono tracking-wider mb-2">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="text-base font-black text-neutral-900 dark:text-white uppercase leading-snug mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed font-normal">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-150 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{item.date}</span>
                  </div>
                  <button 
                    onClick={() => setActiveArticle(item)}
                    className="text-xs font-bold text-green-600 dark:text-green-400 hover:text-green-500 cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    Read Release <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden max-w-3xl w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl relative animate-in fade-in-50 zoom-in-95 duration-200">
              
              <div className="relative h-64 bg-neutral-900 p-8 flex items-end">
                <img 
                  src={activeArticle.imageUrl} 
                  alt={activeArticle.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="text-xs font-bold font-mono text-green-400 uppercase tracking-widest">{activeArticle.category}</span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase mt-1 tracking-tight leading-tight">
                    {activeArticle.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 bg-black/60 text-neutral-300 hover:text-white p-2 rounded-lg cursor-pointer z-20"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-450 dark:text-neutral-500 border-b border-neutral-100 dark:border-neutral-800 pb-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <span>Published: {activeArticle.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span>Estimated: {activeArticle.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-green-500" />
                    <span>Author: Trade Relations Board</span>
                  </div>
                </div>

                {/* Content body */}
                <p className="text-sm sm:text-base text-neutral-655 dark:text-neutral-300 leading-relaxed font-normal whitespace-pre-wrap">
                  {activeArticle.content}
                </p>
              </div>

              {/* Modal footer Close */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-150 dark:border-neutral-800 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 bg-neutral-900 hover:bg-black dark:bg-neutral-800 text-white rounded-xl text-xs font-bold cursor-pointer uppercase tracking-wider"
                >
                  Close Press Release
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
