import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import CompanyBranches from './components/CompanyBranches';
import Services from './components/Services';
import CorporateSolutions from './components/CorporateSolutions';
import SafetyQuality from './components/SafetyQuality';
import NewsUpdates from './components/NewsUpdates';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import DeveloperHub from './components/DeveloperHub';

import { 
  INITIAL_FUEL_PRICES, 
  INITIAL_SERVICES, 
  INITIAL_GALLERY, 
  INITIAL_TESTIMONIALS, 
  INITIAL_NEWS,
  INITIAL_BRANCHES
} from './data';
import { FuelPrice, ServiceItem, GalleryItem, Testimonial, NewsArticle, ContactInquiry, Branch } from './types';
import { MessageSquare, ShieldAlert, ArrowUpCircle } from 'lucide-react';

export default function App() {
  // --- Core State synced via localStorage ---
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('olayo_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  const [fuelPrices, setFuelPrices] = useState<FuelPrice[]>(() => {
    const saved = localStorage.getItem('olayo_fuel_prices');
    return saved ? JSON.parse(saved) : INITIAL_FUEL_PRICES;
  });

  const [branches, setBranches] = useState<Branch[]>(() => {
    const saved = localStorage.getItem('olayo_branches');
    return saved ? JSON.parse(saved) : INITIAL_BRANCHES;
  });

  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES); // Services remain static catalog

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('olayo_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('olayo_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('olayo_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem('olayo_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Utility View States ---
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isAdminAuthorized, setIsAdminAuthorized] = useState<boolean>(() => {
    return sessionStorage.getItem('olayo_admin_authorized') === 'true';
  });
  const [activeSection, setActiveSection] = useState<string>('home');
  const [serviceFilterInquiry, setServiceFilterInquiry] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync admin authorized state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('olayo_admin_authorized', String(isAdminAuthorized));
  }, [isAdminAuthorized]);

  // Revoke authorized state when admin mode is turned off
  useEffect(() => {
    if (!isAdminMode) {
      setIsAdminAuthorized(false);
    }
  }, [isAdminMode]);

  // --- Sync State Hooks ---
  useEffect(() => {
    localStorage.setItem('olayo_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('olayo_fuel_prices', JSON.stringify(fuelPrices));
  }, [fuelPrices]);

  useEffect(() => {
    localStorage.setItem('olayo_branches', JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    localStorage.setItem('olayo_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('olayo_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('olayo_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('olayo_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Scroll to top controller visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      // Basic scroll-spy mechanism
      const sections = ['home', 'about', 'branches', 'services', 'corporate', 'safety', 'news', 'gallery', 'contact'];
      for (const section of sections) {
        const elem = document.getElementById(section);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 350) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Handlers ---
  const handleAddNewInquiry = (newInquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => {
    const created: ContactInquiry = {
      id: `inq_${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-US') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'new',
      ...newInquiry
    };
    setInquiries([created, ...inquiries]);
  };

  const handleScrollTopAction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
    setIsAdminMode(false);
  };

  // WhatsApp shortcut url
  const floatingWhatsappUrl = `https://wa.me/256701474562?text=Hello%20Olayo%20Petroleum,%20I%20visited%20your%20website%20and%20can%20you%20guide%20me%20on%20bulk%20fuel%20delivery%3F`;

  return (
    <div className={`min-h-screen text-neutral-800 transition-colors duration-300 font-sans ${theme === 'dark' ? 'bg-black dark text-white' : 'bg-neutral-100 text-neutral-900'}`}>
      
      {/* Dynamic Banner Alert on top of site */}
      {!isAdminMode && (
        <div className="bg-emerald-600 text-white py-2 px-4 shadow sticky top-0 z-[60] text-center text-xs font-bold leading-relaxed flex items-center justify-center gap-1.5 border-b border-emerald-500/30">
          <span className="inline-flex w-2 h-2 rounded-full bg-white animate-ping" />
          <span>Olayo Fuel Index Updates: Standard competitive diesel wholesale tariffs are active for B2B fleet logistics.</span>
          <button 
            onClick={() => {
              setActiveSection('corporate');
              const comp = document.getElementById('corporate');
              if (comp) comp.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:underline text-[10px] bg-white/20 px-2 py-0.5 rounded ml-2 transition-all uppercase tracking-wider"
          >
            Review Quote
          </button>
        </div>
      )}

      {/* Primary Sticky Header */}
      <Header 
        theme={theme}
        setTheme={setTheme}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Container Views Router */}
      <main className="transition-all">
        {isAdminMode ? (
          isAdminAuthorized ? (
            /* Secure bypass Admin CMS workspace panel */
            <AdminPanel 
              fuelPrices={fuelPrices}
              setFuelPrices={setFuelPrices}
              gallery={gallery}
              setGallery={setGallery}
              news={news}
              setNews={setNews}
              testimonials={testimonials}
              setTestimonials={setTestimonials}
              inquiries={inquiries}
              setInquiries={setInquiries}
              setIsAdminMode={setIsAdminMode}
              branches={branches}
              setBranches={setBranches}
            />
          ) : (
            /* Access Gatekeeper Admin authentication login view */
            <AdminLogin 
              onLoginSuccess={() => setIsAdminAuthorized(true)}
              onCancel={() => {
                setIsAdminMode(false);
                setIsAdminAuthorized(false);
              }}
            />
          )
        ) : (
          /* Clean, fully responsive corporate website */
          <div className="relative">
            
            {/* 1. Hero Landing Slide Stage & Prices Widget */}
            <Hero 
              prices={fuelPrices} 
              setActiveSection={setActiveSection}
              setIsAdminMode={setIsAdminMode}
            />

            {/* 2. Structured Bento Corporate About Section */}
            <AboutUs />

            {/* 2.5. Company Branches & IT Tech Ecosystem Section */}
            <CompanyBranches branches={branches} />

            {/* 2.7. Go Backend Architecture & Interactive Tech Hub */}
            <DeveloperHub />

            {/* 3. Operational Filtered Energy Services */}
            <Services 
              services={services} 
              setActiveSection={setActiveSection} 
              setIsAdminMode={setIsAdminMode} 
              setServiceFilterInquiry={setServiceFilterInquiry}
            />

            {/* 4. Strategic Corporate Enterprise B2B quote manager */}
            <CorporateSolutions 
              serviceFilterInquiry={serviceFilterInquiry}
              onAddInquiry={handleAddNewInquiry}
            />

            {/* 5. Zero Hazard Safety standard procedures */}
            <SafetyQuality />

            {/* 6. Recurrent Milestones & news stories */}
            <NewsUpdates news={news} />

            {/* 7. Zoomable Infrastructure Gallery */}
            <Gallery gallery={gallery} />

            {/* 8. Driver reviews with glow ratings */}
            <Testimonials testimonials={testimonials} />

            {/* 9. Directions and contact mail form with Map */}
            <Contact 
              onAddInquiry={handleAddNewInquiry}
              serviceFilterInquiry={serviceFilterInquiry}
            />

          </div>
        )}
      </main>

      {/* Compact Copyright Footer */}
      <Footer 
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        setActiveSection={setActiveSection}
      />

      {/* --- Action Float Buttons --- */}
      
      {/* Floating help WhatsApp Launcher */}
      <a 
        href={floatingWhatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:scale-105 transition-transform"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-white text-emerald-500" />
      </a>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={handleScrollTopAction}
          className="fixed bottom-24 right-7 z-40 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white hover:bg-black transition-all shadow-xl cursor-pointer"
          title="Scroll back to Top header"
        >
          <ArrowUpCircle className="w-5 h-5 text-emerald-500" />
        </button>
      )}

    </div>
  );
}
