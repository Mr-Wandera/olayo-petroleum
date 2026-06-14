import React from 'react';
import { Testimonial } from '../types';
import { Star, Quote, MessageSquare } from 'lucide-react';

interface TestimonialProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialProps) {
  return (
    <section className="py-24 transition-colors duration-300 bg-neutral-50 dark:bg-black border-b border-neutral-150 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest font-mono">Customer Affiliations</span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mt-1">
            CLIENT SUCCESS REVIEWS
          </h2>
          <div className="w-16 h-1 bg-green-500 mt-3 rounded-full" />
          <p className="mt-4 text-sm text-neutral-550 dark:text-neutral-450 leading-relaxed font-normal">
            Read from fleet procurement specialists, local transporters, taxi driver associations, and daily commuters who rely on Olayo Petroleum’s calibrated dispensers 24 hours a day.
          </p>
        </div>

        {/* Testimonials Grid review */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div 
              key={test.id}
              className="relative bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:border-green-500/20"
            >
              {/* Giant quote mark decoration */}
              <div className="absolute top-6 right-6 text-green-600/5 dark:text-green-500/5 pointer-events-none">
                <Quote className="w-16 h-16 transform translate-x-2 -translate-y-2" />
              </div>

              <div>
                {/* Rating element stars */}
                <div className="flex items-center space-x-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${
                        i < test.rating 
                          ? 'text-amber-500 fill-amber-500' 
                          : 'text-neutral-255 dark:text-neutral-750'
                      }`} 
                    />
                  ))}
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal italic mb-6">
                  "{test.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3.5 pt-5 border-t border-neutral-150 dark:border-neutral-800">
                {test.avatar ? (
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    className="w-11 h-11 rounded-full object-cover border border-neutral-200 dark:border-neutral-750" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center font-bold text-sm border border-emerald-500/10">
                    {test.name.charAt(0)}
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-tight">
                    {test.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-405 font-medium">
                    {test.role} • <span className="text-green-600 dark:text-green-400 font-semibold">{test.company}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic CTA at the bottom */}
        <div className="mt-12 text-center">
          <p className="text-xs text-neutral-550 dark:text-neutral-400 flex items-center justify-center gap-1.5 font-normal">
            <MessageSquare className="w-4 h-4 text-green-500" />
            Join over 100+ logistics and transport operators partnered in Tororo District.
          </p>
        </div>

      </div>
    </section>
  );
}
