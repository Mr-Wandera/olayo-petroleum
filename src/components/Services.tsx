import React, { useState } from 'react';
import { ServiceItem, ServiceCategory } from '../types';
import { Fuel, Truck, Navigation, Wrench, Droplets, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ServicesProps {
  services: ServiceItem[];
  setActiveSection: (sec: string) => void;
  setIsAdminMode: (admin: boolean) => void;
  setServiceFilterInquiry: (service: string) => void;
}

// Icon mapper helper
const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'Fuel':
      return <Fuel className="w-6 h-6" />;
    case 'Truck':
      return <Truck className="w-6 h-6" />;
    case 'Navigation':
      return <Navigation className="w-6 h-6" />;
    case 'Wrench':
      return <Wrench className="w-6 h-6" />;
    case 'Droplets':
      return <Droplets className="w-6 h-6" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-6 h-6" />;
    default:
      return <Fuel className="w-6 h-6" />;
  }
};

export default function Services({ 
  services, 
  setActiveSection, 
  setIsAdminMode, 
  setServiceFilterInquiry 
}: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'fuel', label: 'Fuel Services' },
    { id: 'automotive', label: 'Automotive & Wash' },
    { id: 'logistics', label: 'Retail & Logistics' }
  ];

  const handleFilteredServices = () => {
    if (selectedCategory === 'all') return services;
    if (selectedCategory === 'fuel') {
      return services.filter(s => s.category === 'fuel-retail' || s.category === 'fuel-distribution' || s.category === 'lubricants');
    }
    if (selectedCategory === 'automotive') {
      return services.filter(s => s.category === 'service-bay' || s.category === 'washing-bay');
    }
    if (selectedCategory === 'logistics') {
      return services.filter(s => s.category === 'logistics' || s.category === 'convenience');
    }
    return services;
  };

  const handleInquire = (serviceTitle: string) => {
    setServiceFilterInquiry(serviceTitle);
    setIsAdminMode(false);
    setActiveSection('contact');
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentServicesList = handleFilteredServices();

  return (
    <section id="services" className="py-24 transition-colors duration-300 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest font-mono">Our Operations</span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mt-1">
              PREMIUM ENERGY & OPERATIONS
            </h2>
            <div className="w-16 h-1 bg-green-500 mt-3 rounded-full" />
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
              Olayo Petroleum provides multi-sector solutions, combining highly calibrated fuel dispensing, bulk deliveries, complex fleet mechanics, dynamic regional logistics, and dynamic retail shopping.
            </p>
          </div>

          {/* Service Filters */}
          <div className="flex flex-wrap gap-1.5 mt-6 md:mt-0 bg-neutral-100 dark:bg-neutral-900 p-1.5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-neutral-600 dark:text-neutral-350 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentServicesList.map((service) => (
            <div 
              key={service.id}
              className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-150 dark:border-neutral-800 hover:border-green-500/25 dark:hover:border-green-500/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-neutral-950">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/95 dark:bg-black/95 shadow-lg flex items-center justify-center text-green-600 dark:text-green-400">
                    {getServiceIcon(service.icon)}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-2 flex items-center justify-between">
                    <span>{service.title}</span>
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-405 leading-relaxed font-normal mb-6">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.benefits.slice(0, 3).map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start text-xs text-neutral-500 dark:text-neutral-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span className="font-normal">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-100 dark:border-neutral-850/85 flex items-center justify-between mt-auto">
                <button
                  onClick={() => setActiveItem(service)}
                  className="text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-green-500 dark:hover:text-green-400 flex items-center gap-1 cursor-pointer"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleInquire(service.title)}
                  className="bg-green-600/10 hover:bg-green-600/20 text-green-600 dark:text-green-400 text-xs font-bold py-1.5 px-3 rounded-lg border border-green-500/10 hover:border-green-500/20 transition-all cursor-pointer"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal Popup */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden max-w-2xl w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl relative animate-in fade-in-50 zoom-in-95 duration-200">
              <div className="relative h-56 bg-neutral-950 p-8 flex items-end">
                <img 
                  src={activeItem.image} 
                  alt={activeItem.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center mb-4">
                    {getServiceIcon(activeItem.icon)}
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs text-neutral-300 uppercase tracking-widest font-mono font-bold">
                    {activeItem.category.replace('-', ' ')}
                  </p>
                </div>
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 bg-black/40 text-neutral-300 hover:text-white p-2 rounded-lg cursor-pointer"
                  title="Close Dialog"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <h4 className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest font-mono mb-2">Service Overview</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal mb-6">
                  {activeItem.fullDescription}
                </p>

                <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest font-mono mb-3">Key Features & Metrics</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {activeItem.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start bg-neutral-50 dark:bg-black/60 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300">
                      <ShieldCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-150 dark:border-neutral-800">
                  <button
                    onClick={() => setActiveItem(null)}
                    className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-bold hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
                  >
                    Close Overview
                  </button>
                  <button
                    onClick={() => {
                      const title = activeItem.title;
                      setActiveItem(null);
                      handleInquire(title);
                    }}
                    className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Request Professional Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
