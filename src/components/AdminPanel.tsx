import React, { useState } from 'react';
import { FuelPrice, ServiceItem, GalleryItem, Testimonial, ContactInquiry, NewsArticle, Branch } from '../types';
import { 
  DollarSign, Image, Newspaper, Award, Inbox, Edit3, Trash2, Plus, 
  Check, X, RefreshCw, Eye, ClipboardCheck, LayoutGrid, Fuel, Clock, MapPin
} from 'lucide-react';

interface AdminPanelProps {
  fuelPrices: FuelPrice[];
  setFuelPrices: (prices: FuelPrice[]) => void;
  gallery: GalleryItem[];
  setGallery: (gallery: GalleryItem[]) => void;
  news: NewsArticle[];
  setNews: (news: NewsArticle[]) => void;
  testimonials: Testimonial[];
  setTestimonials: (testimonials: Testimonial[]) => void;
  inquiries: ContactInquiry[];
  setInquiries: (inquiries: ContactInquiry[]) => void;
  setIsAdminMode: (admin: boolean) => void;
  branches: Branch[];
  setBranches: (branches: Branch[]) => void;
}

export default function AdminPanel({
  fuelPrices,
  setFuelPrices,
  gallery,
  setGallery,
  news,
  setNews,
  testimonials,
  setTestimonials,
  inquiries,
  setInquiries,
  setIsAdminMode,
  branches,
  setBranches
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'prices' | 'gallery' | 'news' | 'testimonials' | 'inquiries' | 'branches'>('prices');

  // --- 1. Price Management Sub-states ---
  const handlePriceChange = (id: string, field: keyof FuelPrice, value: any) => {
    const updated = fuelPrices.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [field]: value,
          lastUpdated: 'Just now'
        };
      }
      return item;
    });
    setFuelPrices(updated);
  };

  // --- 2. Gallery Management States ---
  const [newPhoto, setNewPhoto] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    category: 'station',
    imageUrl: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800',
    description: ''
  });

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title || !newPhoto.imageUrl) {
      alert('Must populate title and URL');
      return;
    }
    const created: GalleryItem = {
      id: `photo_${Date.now()}`,
      ...newPhoto
    };
    setGallery([created, ...gallery]);
    setNewPhoto({
      title: '',
      category: 'station',
      imageUrl: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800',
      description: ''
    });
    alert('Gallery image added successfully!');
  };

  const handleDeletePhoto = (id: string) => {
    if (window.confirm('Are you sure you want to remove this image from the gallery?')) {
      setGallery(gallery.filter(item => item.id !== id));
    }
  };

  // --- 3. News Management States ---
  const [newArticle, setNewArticle] = useState<Omit<NewsArticle, 'id' | 'date'>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'General',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=800'
  });

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.content) {
      alert('Must fill out title and content details.');
      return;
    }
    const created: NewsArticle = {
      id: `news_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      ...newArticle
    };
    setNews([created, ...news]);
    setNewArticle({
      title: '',
      excerpt: '',
      content: '',
      category: 'General',
      readTime: '3 min read',
      imageUrl: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=800'
    });
    alert('Press release article posted successfully!');
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Delete this news article?')) {
      setNews(news.filter(n => n.id !== id));
    }
  };

  // --- 4. Testimonial Management States ---
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  });

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.content) {
      alert('Populate name and content review');
      return;
    }
    const created: Testimonial = {
      id: `test_${Date.now()}`,
      ...newTestimonial
    };
    setTestimonials([created, ...testimonials]);
    setNewTestimonial({
      name: '',
      role: '',
      company: '',
      content: '',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    });
    alert('Testimonial uploaded successfully!');
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Remove this customer testimonial?')) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  // --- 5. Inquiries Review States ---
  const handleInquiryStatus = (id: string, newStatus: 'new' | 'reviewed' | 'resolved') => {
    const updated = inquiries.map(inq => {
      if (inq.id === id) {
        return { ...inq, status: newStatus };
      }
      return inq;
    });
    setInquiries(updated);
  };

  const handleClearInquiries = () => {
    if (confirm('Clear all historical inquiries from standard localStorage log list?')) {
      setInquiries([]);
    }
  };

  // --- 6. Branch Management States ---
  const [newBranch, setNewBranch] = useState<Omit<Branch, 'id'>>({
    name: '',
    location: '',
    coordinates: '',
    plusCode: '',
    strategicContext: '',
    powerBackup: 'Standard ATS backup generator with localized stabilizer racks.',
    capacities: [],
    localStack: {
      payments: 'Handheld Android POS terminals (Pesapal) supporting MTN and Airtel Money integration.',
      forecourt: 'Electronic calibrated volumetric dispensers synced to administrative monitors.',
      connectivity: 'Primary 4G LTE cellular data link with localized transaction caching queue.'
    }
  });

  const [dieselCapacity, setDieselCapacity] = useState('60,000 Litres');
  const [petrolCapacity, setPetrolCapacity] = useState('45,000 Litres');
  const [lubeCapacity, setLubeCapacity] = useState('10,000 Litres');

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranch.name || !newBranch.location) {
      alert('Must populate branch name and physical address.');
      return;
    }

    const compiledCapacities = [
      { product: 'Bulk Diesel', capacity: dieselCapacity },
      { product: 'Premium Petrol', capacity: petrolCapacity }
    ];
    if (lubeCapacity && lubeCapacity.trim() !== '') {
      compiledCapacities.push({ product: 'Lubricants & Lubes', capacity: lubeCapacity });
    }

    // Auto-compute random-ish coordinate coordinates and plusCode if left blank
    const computedCoords = newBranch.coordinates || `${(Math.random() * 0.5 + 0.3).toFixed(4)}° N, ${(Math.random() * 2 + 32).toFixed(4)}° E`;
    const computedPlus = newBranch.plusCode || `M${Math.floor(Math.random() * 8 + 1)}JH+Q${Math.floor(Math.random() * 8 + 1)}C, Eastern Uganda`;
    const computedStrategic = newBranch.strategicContext || `Newly deployed highway refuelling station strategically covering core distribution fleets and commuter transits.`;

    const created: Branch = {
      id: `branch_${Date.now()}`,
      ...newBranch,
      coordinates: computedCoords,
      plusCode: computedPlus,
      strategicContext: computedStrategic,
      capacities: compiledCapacities
    };

    setBranches([...branches, created]);

    // Reset Form
    setNewBranch({
      name: '',
      location: '',
      coordinates: '',
      plusCode: '',
      strategicContext: '',
      powerBackup: 'Standard ATS backup generator with localized stabilizer racks.',
      capacities: [],
      localStack: {
        payments: 'Handheld Android POS terminals (Pesapal) supporting MTN and Airtel Money integration.',
        forecourt: 'Electronic calibrated volumetric dispensers synced to administrative monitors.',
        connectivity: 'Primary 4G LTE cellular data link with localized transaction caching queue.'
      }
    });
    setDieselCapacity('60,000 Litres');
    setPetrolCapacity('45,000 Litres');
    setLubeCapacity('10,000 Litres');
    alert('New regional station branch deployed successfully!');
  };

  const handleDeleteBranch = (id: string) => {
    if (confirm('Are you sure you want to remove this station branch from corporate directories?')) {
      setBranches(branches.filter(b => b.id !== id));
    }
  };

  return (
    <section className="py-12 transition-colors duration-300 bg-neutral-100 dark:bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 dark:border-neutral-805 pb-6 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-700 bg-amber-500/10 border border-amber-500/20 font-mono tracking-wide uppercase">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
              Administrative CMS Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-905 dark:text-white uppercase mt-1 tracking-tight">
              Olayo Corporate Dashboard
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Active Session: Secure Developer Bypass. Make real-time adjustments to prices, stories, and images.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setIsAdminMode(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-neutral-900 hover:bg-black dark:bg-neutral-800 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer flex items-center gap-1"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Back to Corporate Website</span>
            </button>
          </div>
        </div>

        {/* CMS Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-neutral-900 p-1.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          
          <button
            onClick={() => setActiveTab('prices')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'prices'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-55 dark:hover:bg-neutral-950'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Manage Fuel Prices</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-55 dark:hover:bg-neutral-950'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Customer Inquiries</span>
            {inquiries.filter(i => i.status === 'new').length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold animate-bounce shadow">
                {inquiries.filter(i => i.status === 'new').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-55 dark:hover:bg-neutral-950'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Manage Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'news'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-55 dark:hover:bg-neutral-950'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Operational News</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'testimonials'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-55 dark:hover:bg-neutral-950'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Testimonial Quotes</span>
          </button>

          <button
            onClick={() => setActiveTab('branches')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'branches'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-55 dark:hover:bg-neutral-950'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Manage Branches</span>
          </button>

        </div>

        {/* --- Content Area --- */}

        {/* 1. PRICE CONTROLS */}
        {activeTab === 'prices' && (
          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase tracking-tight flex items-center gap-1.5">
                <Fuel className="w-5 h-5 text-green-500" /> Dynamic Price Dispatch
              </h3>
              <p className="text-xs text-neutral-550 dark:text-neutral-400 font-normal">
                Update prices of standard fuel retail batches across all pump displays instantly. Price inputs are tracked in Uganda Shillings (UGX).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fuelPrices.map((item) => (
                <div key={item.id} className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-800 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-neutral-400 font-mono tracking-wider">Product Name</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      {item.id.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-neutral-950 dark:text-white leading-tight uppercase font-sans">
                    {item.name}
                  </h4>

                  <div className="grid grid-cols-2 gap-3 pb-2">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Price Rate (UGX)</label>
                      <input 
                        type="number"
                        value={item.price}
                        onChange={(e) => handlePriceChange(item.id, 'price', parseInt(e.target.value) || 0)}
                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-sm focus:outline-none dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Batch unit</label>
                      <input 
                        type="text"
                        value={item.unit}
                        onChange={(e) => handlePriceChange(item.id, 'unit', e.target.value)}
                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-sm focus:outline-none dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Trend dropdown buttons */}
                  <div className="flex gap-1.5 overflow-hidden">
                    {(['up', 'down', 'stable'] as const).map((trendOption) => (
                      <button
                        key={trendOption}
                        type="button"
                        onClick={() => handlePriceChange(item.id, 'trend', trendOption)}
                        className={`flex-1 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          item.trend === trendOption
                            ? trendOption === 'up'
                              ? 'bg-rose-500 text-white shadow'
                              : trendOption === 'down'
                                ? 'bg-emerald-500 text-white shadow'
                                : 'bg-neutral-500 text-white shadow'
                            : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-750'
                        }`}
                      >
                        {trendOption}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 2. INBOX CUSTOMER INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="bg-white dark:bg-neutral-850 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase tracking-tight flex items-center gap-1.5">
                  <Inbox className="w-5 h-5 text-emerald-500" /> B2B & General Inquiries Inbox
                </h3>
                <p className="text-xs text-neutral-500">
                  Manage incoming quote petitions, logistics fleet contract submissions, and general support inquiries.
                </p>
              </div>

              <button
                onClick={handleClearInquiries}
                disabled={inquiries.length === 0}
                className="px-3.5 py-2 bg-rose-600/10 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-bold rounded-lg border border-rose-500/10 hover:border-rose-500/20 transition-all cursor-pointer text-center disabled:opacity-40"
              >
                Clear All Logs
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-16 bg-neutral-50 dark:bg-neutral-905 rounded-xl border border-neutral-100 dark:border-neutral-800 space-y-4">
                <Inbox className="w-12 h-12 text-neutral-300 mx-auto" />
                <p className="text-sm font-semibold text-neutral-500 uppercase tracking-tight">Inquiries Inbox is Empty</p>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Go back to the public site, submit the Contact Form or request a Corporate bulk Petroleum Quote, then reload this portal to review!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div 
                    key={inq.id} 
                    className="p-5 bg-neutral-50 dark:bg-neutral-900/40 rounded-xl border border-neutral-150 dark:border-neutral-800 flex flex-col md:flex-row justify-between gap-4 relative overflow-hidden"
                  >
                    {/* Status side indicators */}
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase">
                          {inq.name}
                        </span>
                        {inq.company && (
                          <span className="text-[10px] bg-neutral-200/60 dark:bg-neutral-800/80 px-2 py-0.5 rounded-md text-neutral-600 dark:text-neutral-400 font-bold font-mono">
                            {inq.company}
                          </span>
                        )}
                        <span className="text-[9px] text-neutral-400 font-mono">
                          {inq.createdAt}
                        </span>
                      </div>

                      <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                        Contact: <span className="text-neutral-750 dark:text-neutral-250 font-bold">{inq.phone}</span> | <span className="text-neutral-750 dark:text-neutral-250 font-mono">{inq.email}</span>
                      </div>

                      <div className="text-xs text-neutral-600 bg-white dark:bg-neutral-900 p-3 rounded-lg border border-neutral-200/50 dark:border-neutral-800 italic leading-relaxed font-normal">
                        "{inq.message}"
                      </div>

                      <div className="flex flex-wrap gap-2 text-[10px] items-center">
                        <span className="font-bold uppercase text-neutral-400 font-mono">Service Required:</span>
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 rounded-md font-bold uppercase">
                          {inq.serviceRequired}
                        </span>
                      </div>
                    </div>

                    {/* Status Toggle buttons */}
                    <div className="flex flex-row md:flex-col items-stretch justify-center gap-1.5 shrink-0 min-w-[120px]">
                      <span className="text-[10px] font-bold text-neutral-405 font-mono uppercase text-center hidden md:block">Process Status</span>
                      
                      <button
                        onClick={() => handleInquiryStatus(inq.id, 'new')}
                        className={`px-3 py-1.5 rounded-lg text-center text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          inq.status === 'new'
                            ? 'bg-rose-500 text-white'
                            : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        New
                      </button>

                      <button
                        onClick={() => handleInquiryStatus(inq.id, 'reviewed')}
                        className={`px-3 py-1.5 rounded-lg text-center text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          inq.status === 'reviewed'
                            ? 'bg-amber-500 text-white'
                            : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        In Progress
                      </button>

                      <button
                        onClick={() => handleInquiryStatus(inq.id, 'resolved')}
                        className={`px-3 py-1.5 rounded-lg text-center text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          inq.status === 'resolved'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        Resolved
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* 3. GALLERY ADMIN */}
        {activeTab === 'gallery' && (
          <div className="bg-white dark:bg-neutral-850 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-8">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase tracking-tight flex items-center gap-1.5">
                <Image className="w-5 h-5 text-emerald-500" /> Facility Gallery CMS Editor
              </h3>
              <p className="text-xs text-neutral-500">
                Register newer forecourt photography assets, logistics fleet images, or operational events for automatic display.
              </p>
            </div>

            {/* Photo Adder Form */}
            <form onSubmit={handleAddPhoto} className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-800 space-y-4">
              <h4 className="text-xs font-bold uppercase text-neutral-405 font-mono tracking-wider flex items-center gap-1">
                <Plus className="w-4 h-4 text-emerald-500" /> Insert New Image Record
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Image Title *</label>
                  <input 
                    type="text" 
                    required
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    placeholder="e.g. Armed 24H Security Guard"
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Photo Category</label>
                  <select 
                    value={newPhoto.category}
                    onChange={(e: any) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="station">Fuel Station forecourt</option>
                    <option value="tankers">Distribution Fleet Tanker</option>
                    <option value="garage">Automotive Garage bay</option>
                    <option value="washing">High Foam Washing bay</option>
                    <option value="supermarket">Oasis Convenience store</option>
                    <option value="operations">General Operations / Night</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Unsplash/CDN URL *</label>
                  <input 
                    type="text" 
                    required
                    value={newPhoto.imageUrl}
                    onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Context Summary or Description</label>
                <input 
                  type="text" 
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                  placeholder="e.g. Equipped with standard pressure gauges, fully guarded"
                  className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                />
              </div>

              <button 
                type="submit" 
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Upload & Publish to Gallery
              </button>
            </form>

            {/* List current photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="relative bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden p-3 flex gap-3">
                  <div className="w-20 h-20 bg-neutral-900 rounded-lg overflow-hidden shrink-0">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex flex-col justify-between overflow-hidden">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase truncate">{item.title}</h4>
                      <p className="text-[10px] font-mono text-emerald-600 font-bold uppercase mt-0.5">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => handleDeletePhoto(item.id)}
                      className="text-[10px] font-bold text-rose-500 hover:text-rose-600 inline-flex items-center gap-1 cursor-pointer self-start"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove asset
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 4. OPERATIONAL NEWS */}
        {activeTab === 'news' && (
          <div className="bg-white dark:bg-neutral-850 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-8">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase tracking-tight flex items-center gap-1.5">
                <Newspaper className="w-5 h-5 text-emerald-500" /> Operational Announcements & News Press Desk
              </h3>
              <p className="text-xs text-neutral-500">
                Publish corporate messages about newly acquired tanker assets, standard price discount programs, or seasonal operations schedules.
              </p>
            </div>

            {/* News Poster Form */}
            <form onSubmit={handleAddArticle} className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-800 space-y-4">
              <h4 className="text-xs font-bold uppercase text-neutral-405 font-mono tracking-wider flex items-center gap-1">
                <Plus className="w-4 h-4 text-emerald-500" /> Draft New Press Release
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Title (Headline) *</label>
                  <input 
                    type="text" 
                    required
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    placeholder="e.g. Tororo Station Expansion Project"
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Category Label</label>
                  <input 
                    type="text" 
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                    placeholder="e.g. Safety, Community, Fuel Deals"
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Estimated Reading Time</label>
                  <input 
                    type="text" 
                    value={newArticle.readTime}
                    onChange={(e) => setNewArticle({ ...newArticle, readTime: e.target.value })}
                    placeholder="e.g. 3 min read"
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Asset Image Link (CDN)</label>
                  <input 
                    type="text" 
                    value={newArticle.imageUrl}
                    onChange={(e) => setNewArticle({ ...newArticle, imageUrl: e.target.value })}
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Short Executive Excerpt (One-sentence teaser) *</label>
                <input 
                  type="text" 
                  required
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                  placeholder="e.g. Olayo Petroleum is standardizing price scales for multi-fleet transport operators in Eastern Uganda..."
                  className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Detailed Editorial Content *</label>
                <textarea 
                  required
                  rows={4}
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  placeholder="Write the full corporate body message details here..."
                  className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2.5 px-3.5 text-xs dark:text-white focus:outline-none resize-none font-sans"
                />
              </div>

              <button 
                type="submit" 
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Publish Press Release Article
              </button>
            </form>

            {/* News List */}
            <div className="space-y-3.5">
              {news.map((n) => (
                <div key={n.id} className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white uppercase leading-tight">{n.title}</h4>
                    <p className="text-[10px] text-neutral-450 dark:text-neutral-500 mt-0.5">Category: {n.category} | Created: {n.date}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteArticle(n.id)}
                    className="text-xs font-bold text-rose-500 hover:text-rose-600 inline-flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 5. TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="bg-white dark:bg-neutral-850 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-8">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase tracking-tight flex items-center gap-1.5">
                <Award className="w-5 h-5 text-emerald-500" /> Testimonial Quotes Editor
              </h3>
              <p className="text-xs text-neutral-500">
                Register positive reviews from active regional logistics drivers or local agricultural partners. Keep ratings out of 5 stars.
              </p>
            </div>

            {/* Testimonials Adder */}
            <form onSubmit={handleAddTestimonial} className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-800 space-y-4">
              <h4 className="text-xs font-bold uppercase text-neutral-405 font-mono tracking-wider flex items-center gap-1">
                <Plus className="w-4 h-4 text-emerald-500" /> Catalog New Customer Review
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Customer Name *</label>
                  <input 
                    type="text" 
                    required
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    placeholder="e.g. Moses Ali"
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Role/Title</label>
                  <input 
                    type="text" 
                    value={newTestimonial.role}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                    placeholder="e.g. Senior Tanker Operator"
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Industry / Company Name</label>
                  <input 
                    type="text" 
                    value={newTestimonial.company}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                    placeholder="e.g. Eastern Sugarcane Tractors"
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Star Rating (1 - 5)</label>
                  <select 
                    value={newTestimonial.rating}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) || 5 })}
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                    <option value="3">⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Detailed Feedback Review *</label>
                <textarea 
                  required
                  rows={3}
                  value={newTestimonial.content}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                  placeholder="Insert feedback message..."
                  className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none resize-none font-normal"
                />
              </div>

              <button 
                type="submit" 
                className="px-5 py-2 whitespace-nowrap bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Log Testimonial
              </button>
            </form>

            {/* Testimonials List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-xl space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-905 dark:text-white uppercase leading-tight">{t.name}</h4>
                      <p className="text-[10px] text-neutral-450 dark:text-neutral-500">{t.role} | {t.company}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteTestimonial(t.id)}
                      className="text-neutral-400 hover:text-rose-500 transition-colors p-1.5 cursor-pointer"
                      title="Delete feedback"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal font-normal italic">
                    "{t.content}"
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

        {activeTab === 'branches' && (
          <div className="space-y-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-805 rounded-3xl p-6 sm:p-8 shadow-sm">
            
            {/* Header segment */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-neutral-850 pb-5 gap-3">
              <div>
                <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase tracking-tight">
                  Regional Branch & Localized Tech Directory
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Deploy new fueling facilities across critical logistics corridors and configure their automated local technology configurations.
                </p>
              </div>
              <span className="text-[10px] font-mono px-3 py-1 font-bold bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-600 dark:text-neutral-400 shrink-0">
                Total Station Records: {branches.length}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Column 1: Add Branch Form */}
              <div className="lg:col-span-5 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-150 dark:border-neutral-850 space-y-4">
                <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-850 pb-3">
                  <Plus className="w-4 h-4 text-green-500" />
                  <h4 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-wider">
                    Authorize New Station
                  </h4>
                </div>

                <form onSubmit={handleAddBranch} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Station Branch Name *</label>
                    <input 
                      type="text"
                      required
                      value={newBranch.name}
                      onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                      placeholder="e.g. Jinja Highway Express Node"
                      className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Physical Location Address *</label>
                    <input 
                      type="text"
                      required
                      value={newBranch.location}
                      onChange={(e) => setNewBranch({ ...newBranch, location: e.target.value })}
                      placeholder="e.g. Jinja-Iganga Highway, Jinja, Uganda"
                      className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">GPS Coordinates (Optional)</label>
                      <input 
                        type="text"
                        value={newBranch.coordinates}
                        onChange={(e) => setNewBranch({ ...newBranch, coordinates: e.target.value })}
                        placeholder="e.g. 0.4321° N, 33.2104° E"
                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Google Plus Code (Optional)</label>
                      <input 
                        type="text"
                        value={newBranch.plusCode}
                        onChange={(e) => setNewBranch({ ...newBranch, plusCode: e.target.value })}
                        placeholder="e.g. G3RF+789, Jinja"
                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Trade Corridor Strategic Context (Optional)</label>
                    <textarea 
                      rows={2}
                      value={newBranch.strategicContext}
                      onChange={(e) => setNewBranch({ ...newBranch, strategicContext: e.target.value })}
                      placeholder="Context about freight loads, commuter flows or custom corridors..."
                      className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none resize-none font-normal shadow-none"
                    />
                  </div>

                  <div className="bg-neutral-100 dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800 space-y-3">
                    <span className="text-[9px] font-black text-neutral-400 block tracking-widest uppercase text-left font-mono">Initial Capacities Configuration</span>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[8px] font-bold text-neutral-500 mb-1 uppercase">Bulk Diesel</label>
                        <input 
                          type="text"
                          required
                          value={dieselCapacity}
                          onChange={(e) => setDieselCapacity(e.target.value)}
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 text-[11px] dark:text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-neutral-500 mb-1 uppercase">Premium Petrol</label>
                        <input 
                          type="text"
                          required
                          value={petrolCapacity}
                          onChange={(e) => setPetrolCapacity(e.target.value)}
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 text-[11px] dark:text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-neutral-500 mb-1 uppercase">Lubricants (Opt)</label>
                        <input 
                          type="text"
                          value={lubeCapacity}
                          onChange={(e) => setLubeCapacity(e.target.value)}
                          placeholder="None"
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 text-[11px] dark:text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 bg-neutral-100 dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                    <span className="text-[9px] font-black text-neutral-400 block tracking-widest uppercase font-mono text-left">Local IT Configuration Defaults</span>
                    
                    <div className="space-y-1 text-left">
                      <label className="block text-[8px] font-bold text-neutral-500 uppercase">Power Grid Backup Generator</label>
                      <input 
                        type="text"
                        value={newBranch.powerBackup}
                        onChange={(e) => setNewBranch({ ...newBranch, powerBackup: e.target.value })}
                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 text-[11px] dark:text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="block text-[8px] font-bold text-neutral-500 uppercase">Local Cashless Payments Stack</label>
                      <input 
                        type="text"
                        value={newBranch.localStack.payments}
                        onChange={(e) => setNewBranch({ 
                          ...newBranch, 
                          localStack: { ...newBranch.localStack, payments: e.target.value }
                        })}
                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 text-[11px] dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wide"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Deploy Station Branch</span>
                  </button>
                </form>
              </div>

              {/* Column 2: Current Registered Branches */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-wider">
                    Active Station Fleet Directory
                  </h4>
                </div>

                {branches.length === 0 ? (
                  <div className="p-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
                    <MapPin className="w-10 h-10 text-neutral-300 dark:text-neutral-700 mx-auto mb-3" />
                    <p className="text-xs font-bold text-neutral-400 uppercase">No regional stations deployed</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-500 mt-1">Configure your first East African highway refueling terminal on the left form layout.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[660px] overflow-y-auto pr-2 overflow-x-hidden">
                    {branches.map((branch) => (
                      <div 
                        key={branch.id} 
                        className="p-5 bg-neutral-55 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 rounded-2xl relative space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[9px] font-mono bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                {branch.coordinates}
                              </span>
                              {branch.id.startsWith('branch_') && (
                                <span className="text-[9px] font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                                  Custom Node
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-neutral-900 dark:text-white uppercase mt-1.5 leading-tight">{branch.name}</h4>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">{branch.location}</p>
                          </div>
                          
                          <button 
                            type="button"
                            onClick={() => handleDeleteBranch(branch.id)}
                            className="bg-neutral-100 dark:bg-neutral-900 hover:bg-rose-100 dark:hover:bg-rose-950/30 hover:text-rose-500 text-neutral-400 p-2 rounded-xl transition-colors cursor-pointer"
                            title="Decommission Station"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed italic text-left">
                          "{branch.strategicContext}"
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-850 text-[11px]">
                          <div className="text-left">
                            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block font-mono mb-1">Capacities:</span>
                            <div className="space-y-0.5 font-medium text-neutral-700 dark:text-neutral-300">
                              {branch.capacities.map((cap, idx) => (
                                <div key={idx} className="flex justify-between max-w-[200px]">
                                  <span className="text-neutral-400">{cap.product}:</span>
                                  <span>{cap.capacity}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="text-left">
                            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block font-mono mb-1">Local IT Systems:</span>
                            <div className="space-y-0.5 text-neutral-600 dark:text-neutral-400">
                              <p className="truncate"><strong className="text-neutral-440 dark:text-neutral-500 font-normal">Grid:</strong> {branch.powerBackup}</p>
                              <p className="truncate"><strong className="text-neutral-450 dark:text-neutral-500 font-normal">POS:</strong> {branch.localStack.payments}</p>
                              <p className="truncate"><strong className="text-neutral-450 dark:text-neutral-500 font-normal">Link:</strong> {branch.localStack.connectivity}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
