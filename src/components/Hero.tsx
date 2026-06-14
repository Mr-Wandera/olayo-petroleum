import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FuelPrice } from '../types';
import FuelPriceBoard from './FuelPriceBoard';
import { ChevronLeft, ChevronRight, Phone, Send, MapPin, Shield, Zap, Sparkles } from 'lucide-react';

interface HeroProps {
  prices: FuelPrice[];
  setActiveSection: (section: string) => void;
  setIsAdminMode: (admin: boolean) => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=1600',
    tagline: '24-HOUR ENERGY & RETAIL STATION',
    title: 'Powering Journeys.',
    highlight: 'Fueling Growth.',
    description: 'We supply high-grade, UNBS-certified Petrol and Diesel on a state-of-the-art forecourt in Tororo. Open 24/7 with reliable, armed security and high speed pumps.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1600',
    tagline: 'BULK ENERGY DISTRIBUTION & LOGISTICS',
    title: 'Driving Businesses.',
    highlight: 'No Stalls.',
    description: 'Specialized commercial refueling solutions for transport fleets, infrastructure construction gear, agricultural centers, factories, and standby generators across East Africa.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=1600',
    tagline: 'SERVICE BAY, SPARES & JET WASHING',
    title: 'Comprehensive Spares.',
    highlight: 'Expert Automotive Care.',
    description: 'Your premium automobile care ecosystem in Tororo. Advanced digital diagnostics, custom oil changes, wheel services, and premium deep-foam detailing bays.'
  }
];

export default function Hero({ prices, setActiveSection, setIsAdminMode }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const scrollSection = (id: string) => {
    setIsAdminMode(false);
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative transition-colors duration-300 bg-black text-white overflow-hidden pb-12">
      {/* Slide Track */}
      <div className="relative h-[560px] md:h-[660px] w-full overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/55 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-[1]" />

            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover transform scale-100 transition-transform duration-[7000ms]"
              referrerPolicy="no-referrer"
            />

            {/* Slide Content */}
            <div className="absolute inset-0 z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center space-x-2 bg-green-950/40 border border-green-500/20 px-3 py-1.5 rounded-full text-[10px] font-bold text-green-400 font-mono uppercase tracking-widest backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>{slide.tagline}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-tight uppercase font-sans">
                  {slide.title} <br className="hidden sm:inline" />
                  <span className="text-green-500 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                    {slide.highlight}
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-xl">
                  {slide.description}
                </p>

                {/* CTAs */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    onClick={() => scrollSection('contact')}
                    className="group flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-wider transition-all shadow-lg hover:shadow-green-500/20 cursor-pointer text-center"
                  >
                    <span>Contact Us</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => scrollSection('corporate')}
                    className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-wider border border-white/10 transition-all cursor-pointer backdrop-blur-md text-center"
                  >
                    <span>Request Supply Deal</span>
                  </button>

                  <button
                    onClick={() => scrollSection('contact')}
                    className="flex items-center justify-center space-x-2 hover:bg-white/5 text-neutral-300 hover:text-white px-4 py-3 rounded-lg font-bold uppercase text-xs tracking-wider transition-all cursor-pointer text-center"
                  >
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Slide Indicators */}
        <div className="absolute bottom-8 left-4 sm:left-8 z-20 flex space-x-2.5">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide ? 'w-8 bg-green-500' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              title={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide Controls */}
        <div className="absolute right-4 sm:right-8 bottom-8 z-20 flex space-x-2">
          <button
            onClick={handlePrev}
            className="p-2 sm:p-3 rounded-lg bg-black/60 border border-white/5 text-white hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm"
            title="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 sm:p-3 rounded-lg bg-black/60 border border-white/5 text-white hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm"
            title="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Fuel Price Index on Hero Overlap */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 z-30">
        <FuelPriceBoard prices={prices} />
      </div>

      {/* Key Badges of Prominence as Bento Blocks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="flex flex-col items-center p-6 bg-neutral-900 rounded-3xl border border-neutral-800 hover:border-green-500/20 transition-colors duration-300">
          <Shield className="w-8 h-8 text-green-500 mb-2" />
          <h4 className="text-base font-black uppercase tracking-tight text-white">100% Calibrated</h4>
          <p className="text-xs text-neutral-450 mt-1">Zero Moisture Density Rules</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-neutral-900 rounded-3xl border border-neutral-800 hover:border-green-500/20 transition-colors duration-300">
          <Zap className="w-8 h-8 text-green-500 mb-2" />
          <h4 className="text-base font-black uppercase tracking-tight text-white">24 Hours Active</h4>
          <p className="text-xs text-neutral-450 mt-1">Ready Forecourts & Spares</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-neutral-900 rounded-3xl border border-neutral-800 hover:border-green-500/20 transition-colors duration-300">
          <Sparkles className="w-8 h-8 text-green-500 mb-2" />
          <h4 className="text-base font-black uppercase tracking-tight text-white">Full Service</h4>
          <p className="text-xs text-neutral-450 mt-1">Diagnostics & Quick Wash</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-neutral-900 rounded-3xl border border-neutral-800 hover:border-green-500/20 transition-colors duration-300">
          <MapPin className="w-8 h-8 text-green-500 mb-2" />
          <h4 className="text-base font-black uppercase tracking-tight text-white">Tororo Hub</h4>
          <p className="text-xs text-neutral-450 mt-1">Mile One Corridor Gateway</p>
        </div>
      </div>
    </section>
  );
}
