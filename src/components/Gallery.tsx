import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Eye, ZoomIn, Grid, Image as ImageIcon } from 'lucide-react';

interface GalleryProps {
  gallery: GalleryItem[];
}

export default function Gallery({ gallery }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [zoomImage, setZoomImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'station', label: 'Fuel Station' },
    { id: 'tankers', label: 'Distribution Fleet' },
    { id: 'garage', label: 'Service Bay' },
    { id: 'washing', label: 'Washing Bay' },
    { id: 'supermarket', label: 'Oasis Market' },
    { id: 'operations', label: 'Night Operations' }
  ];

  const filteredGallery = selectedCategory === 'all'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 transition-colors duration-300 bg-neutral-50 dark:bg-black border-y border-neutral-150 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest font-mono">Visual forecourt tour</span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mt-1">
              OLAYO FACILITY GALLERY
            </h2>
            <div className="w-16 h-1 bg-green-500 mt-3 rounded-full" />
            <p className="mt-4 text-sm text-neutral-550 dark:text-neutral-450 font-normal leading-relaxed">
              Get an insider view of Olayo Petroleum’s infrastructure, from our highly digital service garage and high-pressure washing bay to the premium heavy duty logistics fleet on dispatch.
            </p>
          </div>

          {/* Filter list */}
          <div className="flex flex-wrap gap-1.5 mt-6 md:mt-0 bg-white dark:bg-neutral-900 p-1.5 rounded-2xl border border-neutral-150 dark:border-neutral-800 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-950 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredGallery.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-150 dark:border-neutral-800">
            <ImageIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-sm font-semibold text-neutral-500">No media assets in this category yet.</p>
            <p className="text-xs text-neutral-400 mt-1">You can log into the Admin portal to append custom URLs instantly!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div 
                key={item.id}
                onClick={() => setZoomImage(item)}
                className="group relative h-72 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-lg cursor-pointer bg-neutral-900 transition-all duration-300 hover:border-green-500/30"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col justify-end p-6" />
                
                {/* Visual content on hover */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none z-15">
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center shadow-lg">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[10px] font-bold font-mono tracking-widest text-green-400 uppercase">
                      {item.category.toUpperCase()}
                    </span>
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight mt-0.5">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-[11px] text-neutral-300 leading-normal font-normal mt-1 max-w-[280px]">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Zoom Lightbox */}
        {zoomImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="max-w-4xl w-full relative overflow-hidden flex flex-col items-center">
              <button
                onClick={() => setZoomImage(null)}
                className="absolute -top-12 sm:top-4 right-0 sm:right-4 bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white p-2.5 rounded-lg cursor-pointer"
                title="Close Lightbox"
              >
                ✕
              </button>

              <div className="bg-neutral-950 p-2 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl max-h-[80vh] flex items-center justify-center">
                <img 
                  src={zoomImage.imageUrl} 
                  alt={zoomImage.title} 
                  className="max-w-full max-h-[70vh] object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-center mt-4 max-w-xl text-neutral-350">
                <span className="text-[10px] tracking-widest font-mono text-green-400 font-bold uppercase">{zoomImage.category}</span>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mt-0.5">{zoomImage.title}</h3>
                {zoomImage.description && (
                  <p className="text-xs text-neutral-400 mt-1">{zoomImage.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
