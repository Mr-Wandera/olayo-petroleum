import React, { useState } from 'react';
import { Fuel, Menu, X, Sun, Moon, Lock, PhoneCall } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({
  theme,
  setTheme,
  isAdminMode,
  setIsAdminMode,
  activeSection,
  setActiveSection
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'branches', label: 'Branches' },
    { id: 'services', label: 'Services' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'safety', label: 'Safety' },
    { id: 'news', label: 'News' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleNavClick = (id: string) => {
    setIsAdminMode(false);
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAdminToggle = () => {
    setIsAdminMode(!isAdminMode);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-600 text-white shadow-md shadow-green-600/20">
              <Fuel className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tighter text-neutral-900 dark:text-white uppercase leading-none">
                Olayo <span className="text-green-500">Petroleum</span>
              </span>
              <p className="text-[9px] uppercase tracking-widest text-neutral-500 dark:text-green-500 font-bold">
                Tororo • Uganda
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center lg:space-x-0.5 xl:space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-1.5 xl:px-3 py-2 rounded-md text-[10px] xl:text-xs font-bold uppercase tracking-tight xl:tracking-wider transition-colors cursor-pointer ${
                  !isAdminMode && activeSection === item.id
                    ? 'text-green-600 dark:text-green-400 bg-green-500/10'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Utility Controls */}
          <div className="hidden lg:flex items-center lg:space-x-1.5 xl:space-x-3">
            {/* Quick Contact Ring */}
            <a 
              href="tel:+256701474562" 
              className="flex items-center justify-center p-2 rounded-lg text-neutral-600 dark:text-neutral-350 hover:text-green-500 transition-colors"
              title="Call Us: +256 701 474562"
            >
              <PhoneCall className="w-4 h-4 text-green-500" />
              <span className="hidden xl:inline ml-2 text-xs font-bold uppercase tracking-wider">+256 701 474562</span>
            </a>

            {/* Dark/Light mode Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-850 transition-colors cursor-pointer"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Admin Console Toggle */}
            <button
              onClick={handleAdminToggle}
              className={`flex items-center space-x-1.5 px-2 py-2 xl:px-4 xl:py-2.5 rounded-lg text-[10px] xl:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isAdminMode
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-neutral-900 hover:bg-black dark:bg-neutral-900 dark:hover:bg-neutral-855 text-white border border-neutral-200 dark:border-neutral-800'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{isAdminMode ? 'Exit Admin' : 'Admin Portal'}</span>
              <span className="inline xl:hidden">{isAdminMode ? 'Exit' : 'Portal'}</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 transition-colors cursor-pointer"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button
              onClick={handleAdminToggle}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isAdminMode 
                  ? 'bg-amber-500 text-white' 
                  : 'text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900'
              }`}
              title="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-neutral-150 dark:border-neutral-900 bg-white dark:bg-black py-4 px-4 shadow-lg absolute w-full left-0 transition-all">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${
                  !isAdminMode && activeSection === item.id
                    ? 'text-green-600 dark:text-green-400 bg-green-500/10 font-black'
                    : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-neutral-150 dark:border-neutral-900 mt-2 flex flex-col space-y-2">
              <a 
                href="tel:+256701474562" 
                className="flex items-center space-x-2 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-350 font-bold uppercase"
              >
                <PhoneCall className="w-4 h-4 text-green-500" />
                <span>+256 701 474562</span>
              </a>
              
              <button
                onClick={handleAdminToggle}
                className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-widest text-white transition-all ${
                  isAdminMode ? 'bg-amber-600' : 'bg-neutral-950 dark:bg-green-600'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>{isAdminMode ? 'Exit Admin Dashboard' : 'Enter Admin Dashboard'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
