import React from 'react';
import { Fuel, MapPin, Phone, Mail, Clock, Lock, Sparkles, MessageSquare } from 'lucide-react';

interface FooterProps {
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  setActiveSection: (sec: string) => void;
}

export default function Footer({ isAdminMode, setIsAdminMode, setActiveSection }: FooterProps) {
  
  const handleNavClick = (id: string) => {
    setIsAdminMode(false);
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAdminClick = () => {
    setIsAdminMode(!isAdminMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const targetKeywords = [
    'Fuel station in Tororo',
    'Petroleum company Uganda',
    'Fuel distribution Uganda',
    'Diesel supply Uganda',
    'Petrol station Tororo',
    'Garage services Tororo',
    'Vehicle washing Tororo',
    'Bulk fuel supply Uganda'
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-neutral-900">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-600 text-white shadow-md">
                <Fuel className="w-4.5 h-4.5" />
              </div>
              <span className="text-lg font-black tracking-tight text-white uppercase">
                Olayo <span className="text-green-500">Petroleum</span>
              </span>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Trusted, high-purity petroleum retail, bulk fuel distribution logistics, professional state diagnostics, and retail systems serving Tororo and Eastern Uganda since 24/7.
            </p>

            <div className="pt-2 text-xs text-neutral-400 font-mono flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-green-500 animate-pulse" />
              <span className="font-bold tracking-wider text-[10px] text-green-450 uppercase">OPEN 24 HOURS DAILY</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono mb-4">Operations Units</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-green-450 transition-colors cursor-pointer text-left">
                  Fuel Station Retail forecourt
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-green-450 transition-colors cursor-pointer text-left">
                  Bulk Diesel & Petrol supply
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-green-450 transition-colors cursor-pointer text-left">
                  Service Bay Garage & Parts
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-green-450 transition-colors cursor-pointer text-left">
                  Oasis Convenience Supermarket
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-green-450 transition-colors cursor-pointer text-left">
                  Automotive Oils & Grease
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate info links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono mb-4">Enterprise</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-green-450 transition-colors cursor-pointer text-left">
                  Our Strategic Mission & Core Values
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('corporate')} className="hover:text-green-450 transition-colors cursor-pointer text-left">
                  Corporate Fuel Solutions B2B rates
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('safety')} className="hover:text-green-450 transition-colors cursor-pointer text-left">
                  Zero Spill Safety & Quality Control
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('news')} className="hover:text-green-450 transition-colors cursor-pointer text-left">
                  Press releases & Milestones
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('gallery')} className="hover:text-green-450 transition-colors cursor-pointer text-left">
                  Facilityforecourt gallery images
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Quick Inquiry */}
          <div className="space-y-3.5 text-xs text-neutral-400">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono mb-2">Location Coordinates</h4>
            
            <div className="flex items-start">
              <MapPin className="w-4.5 h-4.5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>Busia Road,<br />Tororo District, Uganda</span>
            </div>

            <div className="flex items-center">
              <Phone className="w-4.5 h-4.5 text-green-500 mr-2 shrink-0" />
              <span>+256 701 474562</span>
            </div>

            <div className="flex items-center">
              <Mail className="w-4.5 h-4.5 text-green-500 mr-2 shrink-0" />
              <span>info@olayopetroleum.com</span>
            </div>

            <div className="pt-2">
              <a 
                href="https://wa.me/256701474562" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center bg-green-600/15 hover:bg-green-600/25 border border-green-500/20 text-green-400 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase font-mono tracking-wider transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-1.5 fill-current" />
                <span>Active WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* SEO Tag Zone */}
        <div className="py-6 border-b border-neutral-900">
          <div className="flex items-center gap-1.5 mb-2.5 text-neutral-500 uppercase text-[10px] font-bold tracking-widest font-mono">
            <Sparkles className="w-3 h-3 text-green-500" /> SEO Optimization Index Directories:
          </div>
          <div className="flex flex-wrap gap-2">
            {targetKeywords.map((tag, i) => (
              <span 
                key={i} 
                className="text-[10px] bg-neutral-900 border border-neutral-900 px-2.5 py-1 rounded-full text-neutral-500 hover:text-neutral-300 pointer-events-none transition-colors"
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic copyright container & Admin bypass button */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-550 leading-relaxed">
          <span>
            © {new Date().getFullYear()} Olayo Petroleum Limited. Tororo, Uganda. All Rights Reserved. Fully Certified and Licensed by the Petroleum Authority of Uganda (PAU).
          </span>

          <button 
            onClick={handleAdminClick}
            className="flex items-center gap-1.5 text-neutral-600 hover:text-amber-500 transition-colors mt-4 sm:mt-0 cursor-pointer self-start sm:self-center font-semibold text-[11px]"
            title="Administrator access panel"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isAdminMode ? 'Exit Admin View Mode' : 'Admin Area Secure Bypass'}</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
