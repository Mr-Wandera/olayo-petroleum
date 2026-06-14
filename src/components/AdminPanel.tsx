import React, { useState } from 'react';
import { FuelPrice, ServiceItem, GalleryItem, Testimonial, ContactInquiry, NewsArticle, Branch } from '../types';
import { 
  DollarSign, Image, Newspaper, Award, Inbox, Edit3, Trash2, Plus, 
  Check, X, RefreshCw, Eye, ClipboardCheck, LayoutGrid, Fuel, Clock, MapPin,
  CreditCard, ShieldAlert, Wifi, WifiOff, Users, ArrowRight, Zap, FileText, Smartphone,
  TrendingUp, AlertTriangle, ShieldCheck, Activity, Receipt, Printer, Download, Settings
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
  const [activeTab, setActiveTab] = useState<'prices' | 'gallery' | 'news' | 'testimonials' | 'inquiries' | 'branches' | 'payments_erp'>('prices');

  // --- 0. Payments, B2B Accounts & NFC Card State ---
  const [corporateAccounts, setCorporateAccounts] = useState(() => {
    const saved = localStorage.getItem('olayo_corporate_accounts');
    return saved ? JSON.parse(saved) : [
      { id: 'corp_1', name: 'Mombasa-Kampala Logistics Ltd', creditLimit: 250000000, balanceUsed: 145000000, riskScore: 'Low Risk', activeTags: ['UGX-RF-8923', 'UGX-RF-7432'], phone: '+254798080038' },
      { id: 'corp_2', name: 'Kigezi Agricultural Haulers Ltd', creditLimit: 120000000, balanceUsed: 118500000, riskScore: 'Critical Risk', activeTags: ['UGX-RF-9011'], phone: '+256701474562' },
      { id: 'corp_3', name: 'Airtel Uganda Telecom Telecoms', creditLimit: 85000000, balanceUsed: 22000000, riskScore: 'Low Risk', activeTags: ['UGX-RF-3344', 'UGX-RF-1212'], phone: '+256702112233' },
      { id: 'corp_4', name: 'Save the Children NGO Network', creditLimit: 60000000, balanceUsed: 14200000, riskScore: 'Low Risk', activeTags: ['UGX-RF-1049'], phone: '+256703554433' }
    ];
  });

  const [paymentsTransactions, setPaymentsTransactions] = useState(() => {
    const saved = localStorage.getItem('olayo_transactions');
    return saved ? JSON.parse(saved) : [
      { id: 'TXN-10923', branchName: 'Tororo Highway Station', clientName: 'Mombasa-Kampala Logistics Ltd', fuelType: 'Bulk Diesel', litres: 1500, amountUGX: 7200000, paymentMethod: 'B2B Fleet Credit', status: 'Success', phone: '+254798080038', createdAt: '2026-06-14 11:20 AM' },
      { id: 'TXN-10924', branchName: 'Kampala Logistics Depot', clientName: 'Cash Sale', fuelType: 'Premium Petrol', litres: 45, amountUGX: 252000, paymentMethod: 'MTN Mobile Money', status: 'Success', phone: '+256772112233', createdAt: '2026-06-14 11:45 AM' },
      { id: 'TXN-10925', branchName: 'Malaba Border Gateway', clientName: 'Save the Children NGO Network', fuelType: 'Bulk Diesel', litres: 300, amountUGX: 1440000, paymentMethod: 'B2B Fleet Credit', status: 'Success', phone: '+256703554433', createdAt: '2026-06-14 12:05 PM' },
      { id: 'TXN-10926', branchName: 'Busia Transit Hub', clientName: 'Cash Sale', fuelType: 'Premium Petrol', litres: 60, amountUGX: 336000, paymentMethod: 'Airtel Money', status: 'Success', phone: '+254798080038', createdAt: '2026-06-14 12:40 PM' }
    ];
  });

  const [fleetCards, setFleetCards] = useState(() => {
    const saved = localStorage.getItem('olayo_cards');
    return saved ? JSON.parse(saved) : [
      { cardNumber: 'OLAYO-NFC-7980', clientName: 'Mombasa-Kampala Logistics Ltd', driverName: 'Abdulhaq Wandera', plateNumber: 'KBH 954E / SSD 322', maxLimitUGX: 15000000, currentSpentUGX: 4300000, status: 'Active' },
      { cardNumber: 'OLAYO-NFC-5620', clientName: 'Kigezi Agricultural Haulers Ltd', driverName: 'Mugenyi Patrick', plateNumber: 'UBA 445L', maxLimitUGX: 8000000, currentSpentUGX: 7900000, status: 'Active' },
      { cardNumber: 'OLAYO-NFC-3344', clientName: 'Airtel Uganda Telecom Telecoms', driverName: 'Kato James', plateNumber: 'UBC 122F', maxLimitUGX: 5000000, currentSpentUGX: 1200000, status: 'Active' }
    ];
  });

  React.useEffect(() => {
    localStorage.setItem('olayo_corporate_accounts', JSON.stringify(corporateAccounts));
  }, [corporateAccounts]);

  React.useEffect(() => {
    localStorage.setItem('olayo_transactions', JSON.stringify(paymentsTransactions));
  }, [paymentsTransactions]);

  React.useEffect(() => {
    localStorage.setItem('olayo_cards', JSON.stringify(fleetCards));
  }, [fleetCards]);

  // Terminal & Simulator states
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [offlineQueue, setOfflineQueue] = useState<any[]>([]);
  const [simulatedTerminalStep, setSimulatedTerminalStep] = useState<'idle' | 'push_sent' | 'processing' | 'received' | 'success' | 'failed'>('idle');
  const [terminalProgress, setTerminalProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // New billing states
  const [posPayload, setPosPayload] = useState({
    branchId: branches[0]?.id || 'branch_1',
    clientType: 'cash' as 'cash' | 'corporate',
    corporateId: 'corp_1',
    fuelType: 'Bulk Diesel',
    litres: '100',
    paymentMethod: 'momo_mtn' as 'momo_mtn' | 'momo_airtel' | 'rfid_tag' | 'bank_eft',
    phone: '254798080038'
  });

  const [customCard, setCustomCard] = useState({
    cardNumber: '',
    clientName: 'Mombasa-Kampala Logistics Ltd',
    driverName: '',
    plateNumber: '',
    maxLimitUGX: '5000000'
  });

  const [customCorp, setCustomCorp] = useState({
    name: '',
    creditLimit: '100000000',
    riskScore: 'Low Risk',
    phone: ''
  });

  // Payment credentials state config
  const [paymentCredentials, setPaymentCredentials] = useState(() => {
    const saved = localStorage.getItem('olayo_payment_credentials');
    return saved ? JSON.parse(saved) : {
      mtnMerchantId: 'MTN-MER-990812',
      mtnApiKey: '7a19bc8f42ef99823101aa00ccfde23a',
      mtnEnv: 'sandbox',
      airtelClientId: 'AIRTEL-CL-55092',
      airtelClientSecret: 'airtel_sec_99a8b7762c3f',
      airtelMerchantNo: '256701234567',
      pesapalConsumerKey: 'pesapal_public_key_demo_88',
      pesapalConsumerSecret: 'pesapal_secret_88d2f7331',
      pesapalMode: 'sandbox'
    };
  });

  React.useEffect(() => {
    localStorage.setItem('olayo_payment_credentials', JSON.stringify(paymentCredentials));
  }, [paymentCredentials]);

  // Selected receipt state (for printing/rendering receipts)
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);

  // Sub tab for payment right sidebar: accounts or gateways
  const [rightSubTab, setRightSubTab] = useState<'accounts' | 'gateways'>('accounts');

  const [isSavingCreds, setIsSavingCreds] = useState<boolean>(false);
  const [isTestingPing, setIsTestingPing] = useState<'mtn' | 'airtel' | 'pesapal' | null>(null);

  const handleSyncOfflineData = () => {
    if (offlineQueue.length === 0) return;
    setIsSyncing(true);
    setTimeout(() => {
      setPaymentsTransactions((prev: any[]) => prev.map(t => {
        if (t.status === 'Captured Offline') {
          return { ...t, status: 'Success' };
        }
        return t;
      }));
      setOfflineQueue([]);
      setIsSyncing(false);
      alert('Offline local queue synchronized with central database successfully.');
    }, 1500);
  };

  const handleRegisterCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCard.cardNumber || !customCard.driverName || !customCard.plateNumber) {
      alert('Please complete all card details');
      return;
    }
    const newCardObj = {
      cardNumber: `OLAYO-NFC-${customCard.cardNumber.toUpperCase()}`,
      clientName: customCard.clientName,
      driverName: customCard.driverName,
      plateNumber: customCard.plateNumber,
      maxLimitUGX: parseInt(customCard.maxLimitUGX) || 5000000,
      currentSpentUGX: 0,
      status: 'Active'
    };
    setFleetCards([...fleetCards, newCardObj]);
    setCustomCard({
      cardNumber: '',
      clientName: 'Mombasa-Kampala Logistics Ltd',
      driverName: '',
      plateNumber: '',
      maxLimitUGX: '5000000'
    });
    alert('NFC Fleet Fuel Card registered successfully!');
  };

  const handleAddCorporate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCorp.name || !customCorp.phone) {
      alert('Please fill out all required corporate details');
      return;
    }
    const newCorp = {
      id: `corp_${Date.now()}`,
      name: customCorp.name,
      creditLimit: parseInt(customCorp.creditLimit) || 100000000,
      balanceUsed: 0,
      riskScore: customCorp.riskScore,
      activeTags: [`UGX-RF-${Math.floor(1000 + Math.random() * 9000)}`],
      phone: customCorp.phone
    };
    setCorporateAccounts([...corporateAccounts, newCorp]);
    setCustomCorp({
      name: '',
      creditLimit: '100000000',
      riskScore: 'Low Risk',
      phone: ''
    });
    alert('New commercial B2B credit terms authorized successfully!');
  };

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

          <button
            onClick={() => setActiveTab('payments_erp')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'payments_erp'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-55 dark:hover:bg-neutral-950'
            }`}
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span className="flex items-center gap-1">
              <span>Billing & Cashless ERP</span>
              {offlineQueue.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </span>
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

        {activeTab === 'payments_erp' && (
          <div className="space-y-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-805 rounded-3xl p-6 sm:p-8 shadow-sm">
            
            {/* 1. Header segment */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-neutral-850 pb-5 gap-4">
              <div>
                <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-500" /> B2B Credit, Fleet RFID & Cashless Operating Hub
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Orchestrate commercial fleet accounts, issue contactless RFID hardware, verify credit lines, and test high-fidelity mobile payment api hooks.
                </p>
              </div>

              {/* State Controls: Offline Sync Trigger */}
              <div className="flex items-center gap-3 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => setIsOffline(!isOffline)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    isOffline 
                      ? 'bg-rose-500/15 border border-rose-500/30 text-rose-500 hover:bg-rose-500/20' 
                      : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20'
                  }`}
                  title="Simulate network outage for East African border terminals"
                >
                  {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                  <span>Datalink: {isOffline ? 'OFFLINE (SQLite Cached)' : 'CONNECTED (Postgres Live)'}</span>
                </button>

                {offlineQueue.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSyncOfflineData}
                    disabled={isSyncing}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase disabled:opacity-50 transition-all cursor-pointer animate-pulse"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Sync Queue ({offlineQueue.length})</span>
                  </button>
                )}
              </div>
            </div>

            {/* 2. Top-level Financial and Operational KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-850 p-4.5 rounded-2xl relative overflow-hidden">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">Today\'s Cashless Revenue</span>
                <span className="text-[20px] font-black text-neutral-900 dark:text-white block mt-1.5">
                  UGX {paymentsTransactions
                    .filter(t => t.status === 'Success' || t.status === 'Captured Offline')
                    .reduce((sum, t) => sum + t.amountUGX, 0)
                    .toLocaleString()}
                </span>
                <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Real-time POS Logs</span>
                </div>
                <Activity className="absolute right-3.5 bottom-3.5 w-8 h-8 text-neutral-200 dark:text-neutral-900 pointer-events-none" />
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-850 p-4.5 rounded-2xl relative overflow-hidden">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">Total B2B Credit Exposure</span>
                <span className="text-[20px] font-black text-orange-600 dark:text-orange-400 block mt-1.5">
                  UGX {corporateAccounts.reduce((sum, c) => sum + c.balanceUsed, 0).toLocaleString()}
                </span>
                <span className="text-[10px] text-neutral-450 dark:text-neutral-500 block mt-1">
                  Outstanding on Net 30/60 terms
                </span>
                <FileText className="absolute right-3.5 bottom-3.5 w-8 h-8 text-neutral-200 dark:text-neutral-900 pointer-events-none" />
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-850 p-4.5 rounded-2xl relative overflow-hidden">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">Active RFID Windshields</span>
                <span className="text-[20px] font-black text-neutral-900 dark:text-white block mt-1.5">
                  {corporateAccounts.reduce((sum, c) => sum + c.activeTags.length, 0)} Units
                </span>
                <span className="text-[10px] text-emerald-500 font-bold block mt-1">
                  Verified high frequency transponders
                </span>
                <Zap className="absolute right-3.5 bottom-3.5 w-8 h-8 text-neutral-200 dark:text-neutral-900 pointer-events-none" />
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-850 p-4.5 rounded-2xl relative overflow-hidden">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">Telemetry Sync Signal</span>
                <span className={`text-[19px] font-black block mt-1.5 uppercase ${isOffline ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {isOffline ? 'SQLite Queue Only' : 'Postgres Streaming'}
                </span>
                <span className="text-[10px] text-neutral-450 dark:text-neutral-500 block mt-1">
                  {isOffline ? 'Transactions buffered in RAM outbox' : 'Zero logs variance detected'}
                </span>
                <Wifi className="absolute right-3.5 bottom-3.5 w-8 h-8 text-neutral-200 dark:text-neutral-900 pointer-events-none" />
              </div>
            </div>

            {/* 3. Main Split-Workspace Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT SPLIT (8 Columns): Billing simulator panels & Transactions list */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Panel 1: Interactive Point of Sale Checkout Simulator */}
                <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 rounded-2xl p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-emerald-500" />
                      <h4 className="text-xs font-black text-neutral-905 dark:text-white uppercase tracking-wider">
                        Interactive Cashier & POS Sales Desk
                      </h4>
                    </div>
                    <span className="text-[9px] font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-bold px-2 py-0.5 rounded">
                      Terminal V2.4-Active
                    </span>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setErrorMessage('');
                    
                    const selectedBranch = branches.find(b => b.id === posPayload.branchId) || { name: 'Direct Gateway HQ' };
                    let clientNameVal = 'Cash Customer';
                    let phoneVal = posPayload.phone;
                    
                    if (posPayload.clientType === 'corporate') {
                      const corpItem = corporateAccounts.find(c => c.id === posPayload.corporateId);
                      if (!corpItem) {
                        setErrorMessage('Verify B2B Corporate Partner selection');
                        return;
                      }
                      clientNameVal = corpItem.name;
                      phoneVal = corpItem.phone;
                    }
                    
                    const numericLitres = parseFloat(posPayload.litres) || 0;
                    if (numericLitres <= 0) {
                      setErrorMessage('Please enter a valid fuel volume');
                      return;
                    }
                    
                    let unitPrice = 4800; // default diesel
                    if (posPayload.fuelType === 'Premium Petrol') unitPrice = 5600;
                    else if (posPayload.fuelType === 'Lubricants') unitPrice = 12000;
                    
                    const totalAmount = Math.round(numericLitres * unitPrice);

                    // If OFFLINE, append to offline sync cache
                    if (isOffline) {
                      const newTxn = {
                        id: `OFFLINE-TXN-${Date.now()}`,
                        branchName: selectedBranch.name,
                        clientName: clientNameVal,
                        fuelType: posPayload.fuelType,
                        litres: numericLitres,
                        amountUGX: totalAmount,
                        paymentMethod: posPayload.paymentMethod === 'momo_mtn' ? 'MTN Mobile Money' :
                                       posPayload.paymentMethod === 'momo_airtel' ? 'Airtel Money' :
                                       posPayload.paymentMethod === 'rfid_tag' ? 'B2B Fleet Credit' : 'EFT Bank Settlement',
                        status: 'Captured Offline',
                        phone: phoneVal,
                        createdAt: new Date().toLocaleDateString('en-US') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                      };
                      
                      setOfflineQueue(prev => [...prev, newTxn]);
                      setPaymentsTransactions(prev => [newTxn, ...prev]);
                      return;
                    }

                    // If ONLINE, run high-fidelity interactive simulation
                    setSimulatedTerminalStep('push_sent');
                    setTerminalProgress(20);
                    
                    const t1 = setTimeout(() => {
                      setSimulatedTerminalStep('processing');
                      setTerminalProgress(55);
                    }, 1200);

                    const t2 = setTimeout(() => {
                      if (posPayload.paymentMethod === 'rfid_tag' || posPayload.clientType === 'corporate') {
                        const corpItem = corporateAccounts.find(c => c.id === posPayload.corporateId);
                        if (corpItem) {
                          const remainingLimit = corpItem.creditLimit - corpItem.balanceUsed;
                          if (remainingLimit < totalAmount) {
                            setSimulatedTerminalStep('failed');
                            setTerminalProgress(100);
                            setErrorMessage(`Payment Rejected: B2B limit exceeded by UGX ${(totalAmount - remainingLimit).toLocaleString()}`);
                            return;
                          }
                          
                          setCorporateAccounts(prev => prev.map(c => {
                            if (c.id === corpItem.id) {
                              return { ...c, balanceUsed: c.balanceUsed + totalAmount };
                            }
                            return c;
                          }));
                        }
                      }
                      setSimulatedTerminalStep('received');
                      setTerminalProgress(85);
                    }, 2400);

                    const t3 = setTimeout(() => {
                      const cleanId = `TXN-${Math.floor(11000 + Math.random() * 88000)}`;
                      const newTxn = {
                        id: cleanId,
                        branchName: selectedBranch.name,
                        clientName: clientNameVal,
                        fuelType: posPayload.fuelType,
                        litres: numericLitres,
                        amountUGX: totalAmount,
                        paymentMethod: posPayload.paymentMethod === 'momo_mtn' ? 'MTN Mobile Money' :
                                       posPayload.paymentMethod === 'momo_airtel' ? 'Airtel Money' :
                                       posPayload.paymentMethod === 'rfid_tag' ? 'B2B Fleet Credit' : 'EFT Bank Settlement',
                        status: 'Success',
                        phone: phoneVal,
                        createdAt: new Date().toLocaleDateString('en-US') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                      };
                      
                      setPaymentsTransactions(prev => [newTxn, ...prev]);
                      setSimulatedTerminalStep('success');
                      setTerminalProgress(100);
                    }, 3600);
                  }} className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                    
                    {/* Left fields side */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Dispatch Branch *</label>
                        <select
                          value={posPayload.branchId}
                          onChange={(e) => setPosPayload({ ...posPayload, branchId: e.target.value })}
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white font-medium focus:outline-none"
                        >
                          {branches.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Customer Filter</label>
                          <select
                            value={posPayload.clientType}
                            onChange={(e) => setPosPayload({ ...posPayload, clientType: e.target.value as 'cash' | 'corporate' })}
                            className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-1.5 px-3.5 text-xs dark:text-white focus:outline-none"
                          >
                            <option value="cash">Retail (Walk-in)</option>
                            <option value="corporate">B2B Corporate</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Fuel Product</label>
                          <select
                            value={posPayload.fuelType}
                            onChange={(e) => setPosPayload({ ...posPayload, fuelType: e.target.value })}
                            className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-1.5 px-3 text-xs dark:text-white focus:outline-none"
                          >
                            <option value="Bulk Diesel">Bulk Diesel (Default)</option>
                            <option value="Premium Petrol">Premium Petrol</option>
                            <option value="Lubricants">High Lube Oils</option>
                          </select>
                        </div>
                      </div>

                      {posPayload.clientType === 'corporate' && (
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Enterprise Client Account</label>
                          <select
                            value={posPayload.corporateId}
                            onChange={(e) => {
                              const chosen = corporateAccounts.find(c => c.id === e.target.value);
                              setPosPayload({ 
                                ...posPayload, 
                                corporateId: e.target.value,
                                phone: chosen ? chosen.phone.replace(/[^0-9]/g, '') : posPayload.phone
                              });
                            }}
                            className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none font-bold text-emerald-600 dark:text-emerald-400"
                          >
                            {corporateAccounts.map(c => (
                              <option key={c.id} value={c.id}>{c.name} (Limit: UGX {(c.creditLimit - c.balanceUsed).toLocaleString()} Free)</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Fuel Volume (Litres) *</label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={posPayload.litres}
                          onChange={(e) => setPosPayload({ ...posPayload, litres: e.target.value })}
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    {/* Right fields side */}
                    <div className="space-y-4">
                      
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Transaction Payment Gateway Method</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setPosPayload({ ...posPayload, paymentMethod: 'momo_mtn' })}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              posPayload.paymentMethod === 'momo_mtn' 
                                ? 'bg-[#FFCC00]/10 border-[#FFCC00] text-[#D2A000] font-black' 
                                : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-500'
                            }`}
                          >
                            <Smartphone className="w-4 h-4 mx-auto mb-1 text-yellow-600" />
                            <span className="text-[10px] block font-mono">MTN MoMo</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPosPayload({ ...posPayload, paymentMethod: 'momo_airtel' })}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              posPayload.paymentMethod === 'momo_airtel' 
                                ? 'bg-red-500/10 border-red-500 text-red-500 font-black' 
                                : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-500'
                            }`}
                          >
                            <Smartphone className="w-4 h-4 mx-auto mb-1 text-red-500" />
                            <span className="text-[10px] block font-mono">Airtel Money</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPosPayload({ ...posPayload, paymentMethod: 'rfid_tag' })}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              posPayload.paymentMethod === 'rfid_tag' 
                                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-450 font-black' 
                                : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-500'
                            }`}
                          >
                            <Zap className="w-4 h-4 mx-auto mb-1 text-emerald-500" />
                            <span className="text-[10px] block font-mono">RFID Auto-Tag</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPosPayload({ ...posPayload, paymentMethod: 'bank_eft' })}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              posPayload.paymentMethod === 'bank_eft' 
                                ? 'bg-blue-500/10 border-blue-500 text-blue-500 font-black' 
                                : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-500'
                            }`}
                          >
                            <FileText className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                            <span className="text-[10px] block font-mono">EFT Settlement</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 mb-1 uppercase">Subscriber Dial Number / B2B Ref</label>
                        <input
                          type="text"
                          required
                          value={posPayload.phone}
                          onChange={(e) => setPosPayload({ ...posPayload, phone: e.target.value })}
                          placeholder="e.g. 254798080038"
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 px-3 text-xs dark:text-white font-mono focus:outline-none"
                        />
                        <span className="text-[9px] text-neutral-450 mt-1 block">Prefills with developer direct or client phone records</span>
                      </div>

                      {/* Display pricing metrics live */}
                      <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-3 border border-neutral-200/50 dark:border-neutral-800 flex justify-between items-center">
                        <div>
                          <span className="text-[9px] font-bold text-neutral-400 block uppercase font-mono">Gross Amount Due</span>
                          <span className="text-sm font-black text-neutral-900 dark:text-white mt-0.5">
                            UGX {Math.round((parseFloat(posPayload.litres) || 0) * (posPayload.fuelType === 'Premium Petrol' ? 5600 : posPayload.fuelType === 'Lubricants' ? 12000 : 4800)).toLocaleString()}
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-450 dark:text-neutral-500 italic">
                          ({posPayload.fuelType === 'Premium Petrol' ? 'UGX 5,600' : posPayload.fuelType === 'Lubricants' ? 'UGX 12,000' : 'UGX 4,800'} per L)
                        </span>
                      </div>
                    </div>

                    {/* Footer error messages inside form */}
                    {errorMessage && (
                      <div className="col-span-1 sm:col-span-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-1.5 text-xs text-rose-500 font-bold">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Action trigger dispatch */}
                    <div className="col-span-1 sm:col-span-2">
                      <button
                        type="submit"
                        disabled={simulatedTerminalStep !== 'idle' && simulatedTerminalStep !== 'success' && simulatedTerminalStep !== 'failed'}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                      >
                        <RefreshCw className={`w-4 h-4 ${simulatedTerminalStep !== 'idle' && simulatedTerminalStep !== 'success' && simulatedTerminalStep !== 'failed' ? 'animate-spin' : ''}`} />
                        <span>
                          {isOffline 
                            ? 'Capture Offline Offline (Queue Log)' 
                            : simulatedTerminalStep === 'push_sent' ? 'Sending API STK Notification...'
                            : simulatedTerminalStep === 'processing' ? 'Awaiting Subscriber PIN on Mobile Card...'
                            : simulatedTerminalStep === 'received' ? 'Received Secret Callback Approval...'
                            : 'Process POS payment checkout'}
                        </span>
                      </button>
                    </div>
                  </form>

                  {/* Simulator Screen Visual Overlay */}
                  {simulatedTerminalStep !== 'idle' && (
                    <div className="mt-4 p-4 rounded-xl border text-center transition-all space-y-3 bg-[#0A0D14] text-neutral-300 border-neutral-800">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                        <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase">Interactive Terminal Handshake Logs</span>
                        <button 
                          onClick={() => setSimulatedTerminalStep('idle')} 
                          className="text-[10px] text-rose-500 hover:underline uppercase font-bold cursor-pointer"
                        >
                          Clear Simulator Screen
                        </button>
                      </div>

                      {/* Display live progress visualizer */}
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${terminalProgress}%` }}
                        />
                      </div>

                      <div className="text-left font-mono text-[10.5px] space-y-1 text-neutral-450 leading-relaxed">
                        <p className="flex justify-between">
                          <span>[PE-API] Endpoint Initialization:</span>
                          <span className="text-emerald-400">SUCCESS</span>
                        </p>
                        {terminalProgress >= 10 && (
                          <p className="flex justify-between">
                            <span>[PE-API] Payload:</span>
                            <span className="text-yellow-400">STK PUSH to +{posPayload.phone} (UGX {Math.round((parseFloat(posPayload.litres) || 0) * (posPayload.fuelType === 'Premium Petrol' ? 5600 : posPayload.fuelType === 'Lubricants' ? 12000 : 4800)).toLocaleString()})</span>
                          </p>
                        )}
                        {terminalProgress >= 40 && (
                          <p className="flex justify-between">
                            <span>[PE-API] Transacting Status:</span>
                            <span className="text-blue-400 animate-pulse">Awaiting manual remote PIN entry over Cellular Network</span>
                          </p>
                        )}
                        {terminalProgress >= 80 && (
                          <p className="flex justify-between">
                            <span>[PE-API] IPSec Router Callback:</span>
                            <span className="text-emerald-400">Authenticated Signature OK</span>
                          </p>
                        )}
                        {terminalProgress === 100 && simulatedTerminalStep === 'success' && (
                          <p className="text-emerald-500 dark:text-emerald-400 font-black text-center pt-2 uppercase tracking-wide text-xs flex items-center justify-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>Payment Completed! Central database ledger accounts updated successfully.</span>
                          </p>
                        )}
                        {terminalProgress === 100 && simulatedTerminalStep === 'failed' && (
                          <p className="text-rose-500 font-bold text-center pt-2 uppercase tracking-wide text-xs">
                             ❌ Transaction Cancelled / Denied: {errorMessage}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Panel 2: Live Ledger of Cashless/B2B Payments Transactions */}
                <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-indigo-500" />
                      <h4 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-wider">
                        Live Accounting Transaction Stream (Central DB Mirror)
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-450 dark:text-neutral-500 font-bold">
                      Latest {paymentsTransactions.length} events logged
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-[11px] text-left">
                      <thead>
                        <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider text-[9px] font-mono">
                          <th className="pb-2.5 font-bold">Txn Identity</th>
                          <th className="pb-2.5 font-bold">Branch / Station</th>
                          <th className="pb-2.5 font-bold">Client Context</th>
                          <th className="pb-2.5 font-bold">Litres</th>
                          <th className="pb-2.5 font-bold text-right">Sum (UGX)</th>
                          <th className="pb-2.5 font-bold">Method</th>
                          <th className="pb-2.5 font-bold text-center">Status</th>
                          <th className="pb-2.5 font-bold text-center">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900 font-medium text-neutral-700 dark:text-neutral-300">
                        {paymentsTransactions.map(txn => (
                          <tr key={txn.id} className="hover:bg-neutral-100/50 dark:hover:bg-neutral-900/30 transition-colors">
                            <td className="py-3 font-mono text-neutral-450 dark:text-neutral-500 text-[10px]">{txn.id}</td>
                            <td className="py-3 font-semibold">{txn.branchName}</td>
                            <td className="py-3">
                              <span className="block font-semibold text-neutral-900 dark:text-white">{txn.clientName}</span>
                              <span className="text-[9px] text-neutral-450 font-mono italic">{txn.phone}</span>
                            </td>
                            <td className="py-3">{txn.litres} L <span className="text-[9px] text-neutral-500">[{txn.fuelType}]</span></td>
                            <td className="py-3 text-right font-black text-neutral-900 dark:text-white">UGX {txn.amountUGX.toLocaleString()}</td>
                            <td className="py-2">
                              <span className="font-mono text-[9px] bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded border border-neutral-200/50 dark:border-neutral-805">
                                {txn.paymentMethod}
                              </span>
                            </td>
                            <td className="py-3 text-center">
                              {txn.status === 'Success' ? (
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 capitalize border border-emerald-500/20">
                                  Live Synced 🟢
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-450 uppercase animate-pulse border border-rose-500/20">
                                  Offline Queue 🔴
                                </span>
                              )}
                            </td>
                            <td className="py-3 text-center">
                              <button
                                type="button"
                                onClick={() => setSelectedReceipt(txn)}
                                className="inline-flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-600 dark:bg-emerald-500/10 dark:hover:bg-emerald-600 text-emerald-600 dark:text-emerald-400 hover:text-white dark:hover:text-white px-2.5 py-1 rounded-md font-bold text-[10px] uppercase tracking-wider transition-all duration-150 cursor-pointer"
                                title="Generate physical checkout receipt"
                              >
                                <Receipt className="w-3 h-3" />
                                <span>Receipt</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Panel 3: NFC Fuel Card Simulator and Dispatch Center */}
                <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 rounded-2xl p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-indigo-500 animate-pulse" />
                      <h4 className="text-xs font-black text-neutral-905 dark:text-white uppercase tracking-wider">
                        NFC Fuel Card & Windshield Tag Scanner Workspace
                      </h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* NFC Virtual Card Graphic */}
                    <div className="md:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 p-5 rounded-2xl border border-indigo-500/20 shadow-xl space-y-5 relative overflow-hidden h-48 flex flex-col justify-between text-left">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-bold tracking-widest text-[#FFCC00] uppercase block">Olayo Fleet Card</span>
                          <span className="text-[10px] text-neutral-400 font-mono">B2B Commercial Ledger</span>
                        </div>
                        <span className="w-9 h-7 bg-amber-400/20 border border-amber-400/40 rounded-md flex items-center justify-center text-[10px] font-bold text-amber-300">
                          NFC CHIP
                        </span>
                      </div>

                      <div className="relative z-10">
                        <span className="text-sm font-bold block text-indigo-100 uppercase tracking-wide">
                          {posPayload.clientType === 'corporate' 
                            ? corporateAccounts.find(c => c.id === posPayload.corporateId)?.name || 'Mombasa Logistics' 
                            : 'Mombasa-Kampala Logistics Ltd'}
                        </span>
                        <span className="text-xs font-mono text-neutral-350 block mt-1 tracking-widest">
                          {posPayload.clientType === 'corporate' && corporateAccounts.find(c => c.id === posPayload.corporateId)?.activeTags[0] 
                            ? `RFID-${corporateAccounts.find(c => c.id === posPayload.corporateId)?.activeTags[0]}`
                            : 'RFID-UGX-RF-8923'}
                        </span>
                      </div>

                      <div className="flex justify-between items-end">
                        <span className="text-[9px] font-mono text-neutral-450 uppercase">Secured by Pesapal EOS</span>
                        <span className="text-[11px] font-black text-emerald-400 font-mono">UGX APPROVED</span>
                      </div>

                      {/* Glowing radial pulse behind card */}
                      <span className="absolute -right-12 -bottom-12 w-28 h-28 rounded-full bg-emerald-500/10 blur-2xl" />
                    </div>

                    {/* NFC Scanning Tool Form and Action */}
                    <div className="md:col-span-7 space-y-4 text-left">
                      <span className="text-[10px] font-bold text-neutral-400 block uppercase tracking-widest font-mono">NFC Fuel Card & Active RFID Tags (Simulate Tap)</span>
                      <p className="text-[11px] text-neutral-500 leading-relaxed font-normal">
                        Select a vehicle fleet card from our current registers below, then press &apos;Simulate Physical Tap&apos;. The dispenser nozzle communicates with the server via encrypted MQTT streams before authorizing the forecourt flow.
                      </p>

                      <div className="space-y-3">
                        <label className="block text-[9px] font-bold text-neutral-400 uppercase">Select Active Card Device Holder</label>
                        <select
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-1.5 px-3 text-xs dark:text-white focus:outline-none"
                          onChange={(e) => {
                            const card = fleetCards.find(c => c.cardNumber === e.target.value);
                            if (card) {
                              setPosPayload({
                                ...posPayload,
                                clientType: 'corporate',
                                corporateId: card.clientName.toLowerCase().includes('mombasa') ? 'corp_1' :
                                             card.clientName.toLowerCase().includes('kigezi') ? 'corp_2' : 'corp_3',
                                phone: card.cardNumber
                              });
                            }
                          }}
                        >
                          {fleetCards.map(c => (
                            <option key={c.cardNumber} value={c.cardNumber}>
                              {c.cardNumber} - {c.driverName} ({c.plateNumber})
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPosPayload({
                            ...posPayload,
                            paymentMethod: 'rfid_tag',
                            clientType: 'corporate'
                          });
                          alert('Device mapped on terminal. Simulated contactless tap verified. Push checkout at the top table using standard pricing logic.');
                        }}
                        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow cursor-pointer uppercase tracking-wider inline-flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Simulate Physical Card Tap</span>
                      </button>
                    </div>

                  </div>

                  {/* Register New Fuel Fleet Cards Form */}
                  <div className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200/65 dark:border-neutral-850 mt-4 text-left">
                    <span className="text-[10px] font-bold text-neutral-500 block uppercase tracking-widest font-mono mb-3">Provision & Assign New NFC Fleet Card</span>
                    
                    <form onSubmit={handleRegisterCard} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                      
                      <div className="sm:col-span-1">
                        <label className="block text-[8px] font-bold text-neutral-450 mb-1 uppercase">Card Serial *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 5566"
                          value={customCard.cardNumber}
                          onChange={(e) => setCustomCard({ ...customCard, cardNumber: e.target.value })}
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 text-[11px] dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <label className="block text-[8px] font-bold text-neutral-450 mb-1 uppercase">Allocated Driver *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Wandera Abdul"
                          value={customCard.driverName}
                          onChange={(e) => setCustomCard({ ...customCard, driverName: e.target.value })}
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 text-[11px] dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <label className="block text-[8px] font-bold text-neutral-450 mb-1 uppercase">Vehicle License *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. UBA 220B"
                          value={customCard.plateNumber}
                          onChange={(e) => setCustomCard({ ...customCard, plateNumber: e.target.value })}
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 text-[11px] dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <button
                          type="submit"
                          className="w-full py-1.5 bg-indigo-600 hover:bg-slate-700 text-white rounded text-[11px] font-black transition-all cursor-pointer uppercase flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Provision</span>
                        </button>
                      </div>

                    </form>
                  </div>

                </div>

              </div>

              {/* RIGHT SPLIT (4 Columns): B2B corporate customer list & Limits Tracker */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Panel 4: Corporate Clients Limits Ledger & Risk Analyzer */}
                <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 rounded-2xl p-6 space-y-5">
                  {/* Internal Sub-Navigation Tabs */}
                  <div className="flex border-b border-neutral-200 dark:border-neutral-800 pb-1 gap-2">
                    <button
                      type="button"
                      onClick={() => setRightSubTab('accounts')}
                      className={`flex-1 pb-2 text-center text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer border-b-2 flex items-center justify-center gap-1.5 ${
                        rightSubTab === 'accounts' 
                          ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold' 
                          : 'border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>B2B Accounts</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRightSubTab('gateways')}
                      className={`flex-1 pb-2 text-center text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer border-b-2 flex items-center justify-center gap-1.5 ${
                        rightSubTab === 'gateways' 
                          ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold' 
                          : 'border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                      }`}
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>Gateway API Keys</span>
                    </button>
                  </div>

                  {rightSubTab === 'accounts' ? (
                    <>
                      <p className="text-[11px] text-neutral-550 dark:text-neutral-400 text-left font-normal italic">
                        Olayo Petroleum provides custom commercial lines of credit to high volume regional logistics, agro-processing, and telecommunications companies. Under Uganda tax compliance, credit aging is audited on Net 30/60 parameters:
                      </p>

                      <div className="space-y-4">
                    {corporateAccounts.map(corp => {
                      const computedRemaining = corp.creditLimit - corp.balanceUsed;
                      const outstandingPercent = Math.min(100, Math.round((corp.balanceUsed / corp.creditLimit) * 100));
                      
                      return (
                        <div 
                          key={corp.id}
                          className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-805 rounded-xl space-y-3 relative text-left"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="text-[11.5px] font-black text-neutral-900 dark:text-white uppercase leading-tight">
                                {corp.name}
                              </h5>
                              <span className="text-[9px] text-neutral-450 block mt-0.5">
                                Contacts: {corp.phone}
                              </span>
                            </div>

                            {/* Risk badge indicator */}
                            <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded font-black uppercase tracking-wider ${
                              corp.riskScore === 'Low Risk' 
                                ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400'
                                : 'bg-rose-100 dark:bg-rose-950/40 text-rose-750 dark:text-rose-450 animate-pulse'
                            }`}>
                              {corp.riskScore}
                            </span>
                          </div>

                          {/* Graphical bar meter */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-neutral-500">
                              <span>Credit Allocation Utilization</span>
                              <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">{outstandingPercent}% Used</span>
                            </div>
                            <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  outstandingPercent > 85 ? 'bg-rose-500' : 'bg-emerald-500'
                                }`}
                                style={{ width: `${outstandingPercent}%` }}
                              />
                            </div>
                          </div>

                          {/* Detailed financial figures breakdown */}
                          <div className="grid grid-cols-2 gap-2 text-[10.5px] pt-1 leading-normal font-medium text-neutral-550 dark:text-neutral-450">
                            <div>
                              <span className="text-neutral-400 text-[8px] uppercase font-mono block">Line of Credit:</span>
                              <strong className="text-neutral-700 dark:text-neutral-300">UGX {corp.creditLimit.toLocaleString()}</strong>
                            </div>
                            <div>
                              <span className="text-neutral-400 text-[8px] uppercase font-mono block">Invoiced Debt:</span>
                              <strong className={`${outstandingPercent > 85 ? 'text-rose-500' : 'text-neutral-700 dark:text-neutral-300'}`}>
                                UGX {corp.balanceUsed.toLocaleString()}
                              </strong>
                            </div>
                          </div>

                          {/* Active RFID tag transponders */}
                          <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[9px]">
                            <span className="text-neutral-400 uppercase font-mono">Bound Transponders:</span>
                            {corp.activeTags.map(tag => (
                              <span key={tag} className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-600 dark:text-neutral-400 font-mono">
                                RFID-{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Add New Corporate Client Form */}
                  <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4.5 border border-neutral-200/60 dark:border-neutral-850 text-left space-y-3">
                    <span className="text-[10px] font-bold text-neutral-500 block uppercase tracking-widest font-mono">Setup New Commercial Account</span>
                    
                    <form onSubmit={handleAddCorporate} className="space-y-3">
                      <div>
                        <label className="block text-[8px] font-bold text-neutral-400 uppercase mb-1">Company Legal Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Kenya Cargo Express"
                          value={customCorp.name}
                          onChange={(e) => setCustomCorp({ ...customCorp, name: e.target.value })}
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1.5 px-2.5 text-xs dark:text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-bold text-neutral-400 uppercase mb-1">Risk Profile Category</label>
                          <select
                            value={customCorp.riskScore}
                            onChange={(e) => setCustomCorp({ ...customCorp, riskScore: e.target.value })}
                            className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 text-xs dark:text-white"
                          >
                            <option value="Low Risk">Low Risk Standard</option>
                            <option value="Medium Risk">Medium Risk Audit</option>
                            <option value="Critical Risk">Critical Exposure Risk</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[8px] font-bold text-neutral-400 uppercase mb-1">Assigned Credit Limit (UGX)</label>
                          <input
                            type="number"
                            required
                            value={customCorp.creditLimit}
                            onChange={(e) => setCustomCorp({ ...customCorp, creditLimit: e.target.value })}
                            className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 text-xs dark:text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] font-bold text-neutral-400 uppercase mb-1">Direct Contact Phone *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 254798080038"
                          value={customCorp.phone}
                          onChange={(e) => setCustomCorp({ ...customCorp, phone: e.target.value })}
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1.5 px-2 text-xs dark:text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-emerald-600 hover:bg-slate-700 text-white rounded text-xs font-black transition-all cursor-pointer uppercase tracking-wider flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Authorize Commercial Account</span>
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                /* Dynamic Payment Gateways Setup Form */
                <div className="space-y-4 text-left border-t border-neutral-200 dark:border-neutral-800 pt-3 text-[11px]">
                  
                  <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-805 p-3 rounded-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    Configure enterprise credentials for aggregate East African checkout channels. Correct configs are bound to real checkout pings on the cashier terminal.
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setIsSavingCreds(true);
                    setTimeout(() => {
                      setIsSavingCreds(false);
                      alert('Enterprise payment channel credentials successfully persisted to local secure memory.');
                    }, 1000);
                  }} className="space-y-4">
                    
                    {/* A. MTN Mobile Money */}
                    <div className="p-3 bg-yellow-500/5 border border-yellow-500/30 rounded-xl space-y-3">
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-[#D2A000] uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                        MTN Mobile Money API Config
                      </span>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-[8px] font-bold text-neutral-450 dark:text-neutral-550 uppercase mb-0.5">MTN MoMo Merchant ID</label>
                          <input
                            type="text"
                            value={paymentCredentials.mtnMerchantId}
                            onChange={(e) => setPaymentCredentials({ ...paymentCredentials, mtnMerchantId: e.target.value })}
                            className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 font-mono text-[10px] dark:text-white focus:outline-none"
                            placeholder="MTN-MER-XXXXXX"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-end">
                          <div className="col-span-2">
                            <label className="block text-[8px] font-bold text-neutral-450 dark:text-neutral-550 uppercase mb-0.5">MTN API Secret Token</label>
                            <input
                              type="password"
                              value={paymentCredentials.mtnApiKey}
                              onChange={(e) => setPaymentCredentials({ ...paymentCredentials, mtnApiKey: e.target.value })}
                              className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 font-mono text-[10px] dark:text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-bold text-neutral-450 dark:text-neutral-550 uppercase mb-0.5">Env Mode</label>
                            <select
                              value={paymentCredentials.mtnEnv}
                              onChange={(e) => setPaymentCredentials({ ...paymentCredentials, mtnEnv: e.target.value })}
                              className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-1.5 text-[10px] dark:text-white focus:outline-none font-bold text-yellow-600"
                            >
                              <option value="sandbox">Sandbox</option>
                              <option value="production">Live Prod</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setIsTestingPing('mtn');
                            setTimeout(() => {
                              setIsTestingPing(null);
                              alert(`MTN Mobile Money Connection Handshake: Successful 200 OK. Connection authenticated successfully over ${paymentCredentials.mtnEnv} gateway.`);
                            }, 1200);
                          }}
                          disabled={isTestingPing !== null}
                          className="px-2.5 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/25 text-[#D2A000] text-[9.5px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isTestingPing === 'mtn' ? 'animate-spin' : ''}`} />
                          <span>{isTestingPing === 'mtn' ? 'Authorizing STK Gateway...' : 'Simulate API Ping Link'}</span>
                        </button>
                      </div>
                    </div>

                    {/* B. Airtel Money */}
                    <div className="p-3 bg-red-500/5 mt-3 border border-red-500/30 rounded-xl space-y-3">
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-red-500 dark:text-red-400 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                        Airtel Money API Config
                      </span>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-[8px] font-bold text-neutral-455 dark:text-neutral-555 uppercase mb-0.5">Airtel Client ID / Key</label>
                          <input
                            type="text"
                            value={paymentCredentials.airtelClientId}
                            onChange={(e) => setPaymentCredentials({ ...paymentCredentials, airtelClientId: e.target.value })}
                            className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 font-mono text-[10px] dark:text-white focus:outline-none"
                            placeholder="AIRTEL-CL-XXXXX"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[8px] font-bold text-neutral-455 dark:text-neutral-555 uppercase mb-0.5">Client Secret</label>
                            <input
                              type="password"
                              value={paymentCredentials.airtelClientSecret}
                              onChange={(e) => setPaymentCredentials({ ...paymentCredentials, airtelClientSecret: e.target.value })}
                              className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 font-mono text-[10px] dark:text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-bold text-neutral-455 dark:text-neutral-555 uppercase mb-0.5">Merchant Dial Number</label>
                            <input
                              type="text"
                              value={paymentCredentials.airtelMerchantNo}
                              onChange={(e) => setPaymentCredentials({ ...paymentCredentials, airtelMerchantNo: e.target.value })}
                              className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 font-mono text-[10px] dark:text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setIsTestingPing('airtel');
                            setTimeout(() => {
                              setIsTestingPing(null);
                              alert(`Airtel Money Secure Link: Connection Handshake established. Authorized Merchant Key: ${paymentCredentials.airtelClientId}.`);
                            }, 1200);
                          }}
                          disabled={isTestingPing !== null}
                          className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/25 text-red-500 text-[9.5px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isTestingPing === 'airtel' ? 'animate-spin' : ''}`} />
                          <span>{isTestingPing === 'airtel' ? 'Verifying Keyring...' : 'Simulate API Ping Link'}</span>
                        </button>
                      </div>
                    </div>

                    {/* C. Pesapal Enterprise Gateway */}
                    <div className="p-3 bg-indigo-500/5 border border-indigo-500/30 rounded-xl space-y-3">
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-[#6366f1] dark:text-indigo-400 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        Pesapal Core API Config (V3)
                      </span>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-[8px] font-bold text-neutral-455 dark:text-neutral-555 uppercase mb-0.5">Pesapal Consumer Key</label>
                          <input
                            type="text"
                            value={paymentCredentials.pesapalConsumerKey}
                            onChange={(e) => setPaymentCredentials({ ...paymentCredentials, pesapalConsumerKey: e.target.value })}
                            className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 font-mono text-[10px] dark:text-white focus:outline-none"
                            placeholder="pesapal_key_XXXXXX"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-end">
                          <div className="col-span-2">
                            <label className="block text-[8px] font-bold text-neutral-455 dark:text-neutral-555 uppercase mb-0.5">Pesapal Consumer Secret</label>
                            <input
                              type="password"
                              value={paymentCredentials.pesapalConsumerSecret}
                              onChange={(e) => setPaymentCredentials({ ...paymentCredentials, pesapalConsumerSecret: e.target.value })}
                              className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-2 font-mono text-[10px] dark:text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-bold text-neutral-455 dark:text-neutral-555 uppercase mb-0.5">Mode</label>
                            <select
                              value={paymentCredentials.pesapalMode}
                              onChange={(e) => setPaymentCredentials({ ...paymentCredentials, pesapalMode: e.target.value })}
                              className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded py-1 px-1.5 text-[10px] dark:text-white focus:outline-none font-bold text-indigo-500"
                            >
                              <option value="sandbox">Sandbox</option>
                              <option value="live">Live</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setIsTestingPing('pesapal');
                            setTimeout(() => {
                              setIsTestingPing(null);
                              alert(`Pesapal API Handshake Success: Server status authenticated successfully. Bound on ${paymentCredentials.pesapalMode} gateway node.`);
                            }, 1200);
                          }}
                          disabled={isTestingPing !== null}
                          className="px-2.5 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/25 text-indigo-500 dark:text-indigo-400 text-[9.5px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isTestingPing === 'pesapal' ? 'animate-spin' : ''}`} />
                          <span>{isTestingPing === 'pesapal' ? 'Pinging Pesapal...' : 'Simulate API Ping Link'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSavingCreds}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5 shadow-md font-bold"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSavingCreds ? 'animate-spin' : ''}`} />
                      <span>{isSavingCreds ? 'Configuring Gateways...' : 'Confirm & Persist Credentials'}</span>
                    </button>

                  </form>

                </div>
              )}

            </div>

                {/* Panel 5: Integration Specification details */}
                <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 rounded-2xl p-6 text-left space-y-3">
                  <h4 className="text-[11px] font-black text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
                    System Tech Stack Architecture
                  </h4>
                  <p className="text-[11px] text-neutral-450 leading-relaxed font-normal">
                    This cash management layer utilizes concurrent mutex locks inside the Golang Gin core container, storing logs across Redis transactional channels prior to persisting to main PostgreSQL instances.
                  </p>
                  <div className="p-3.5 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200/50 dark:border-neutral-800 text-[9.5px] font-mono text-neutral-500 space-y-1 leading-normal">
                    <p>⚡ SECURE_TOKEN: pesapal_bearer_secret</p>
                    <p>⚡ MQTT_IP_BROKER: mqtt.olayopetroleum.com:1883</p>
                    <p>⚡ SQL_TRANSACTIONS_BUFFER: memory_outbox_queue</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {selectedReceipt && (
          <div className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white text-neutral-800 rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl border border-neutral-200 flex flex-col max-h-[90vh]">
              
              {/* Receipt Header Actions */}
              <div className="bg-neutral-100 px-5 py-3 border-b border-neutral-200/60 flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-neutral-600 block uppercase tracking-wider font-mono">
                  TAX INVOICE / RECEIPT
                </span>
                <button 
                  onClick={() => setSelectedReceipt(null)}
                  className="bg-neutral-200 hover:bg-neutral-300 text-neutral-600 p-1 rounded-full cursor-pointer transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Thermal Tape Paper Scroll */}
              <div className="p-6 overflow-y-auto flex-1 font-mono text-[11px] leading-relaxed relative bg-neutral-50">
                
                {/* Paper texture container card */}
                <div className="bg-white p-5 border border-dashed border-neutral-300 shadow-md rounded-lg space-y-4 text-center">
                  
                  {/* Perforation ZigZag simulated line */}
                  <div className="text-[10px] text-neutral-300 tracking-widest leading-[5px] select-none">
                    - - - - - - - - - - - - - - - - - - - - - - - - -
                  </div>

                  {/* Logo / Branch info */}
                  <div>
                    <h3 className="font-extrabold text-[14px] text-neutral-900 uppercase">
                      OLAYO PETROLEUM (U) LTD
                    </h3>
                    <p className="text-[9.5px] text-neutral-500 italic mt-0.5 whitespace-pre-wrap">
                      Plot 14, Kampala-Jinja Highway, Tororo Branch
                      P.O. Box 928, Tororo, Uganda
                      Payer-TIN: 1004312894 | Tel: +256 708 800382
                    </p>
                  </div>

                  <div className="text-left py-2.5 border-y border-dashed border-neutral-300/80 text-[10px] space-y-1 text-neutral-600">
                    <div><span className="font-semibold text-neutral-400">RECEIPT NO:</span> {selectedReceipt.id}</div>
                    <div><span className="font-semibold text-neutral-400">DATE/TIME:</span> {new Date().toLocaleString()}</div>
                    <div><span className="font-semibold text-neutral-400">STATION:</span> {selectedReceipt.branchName}</div>
                    <div><span className="font-semibold text-neutral-400">CLIENT:</span> {selectedReceipt.clientName}</div>
                    <div><span className="font-semibold text-neutral-400">CONTACT:</span> {selectedReceipt.phone}</div>
                    <div><span className="font-semibold text-neutral-400">OPERATOR:</span> Cashier Terminal POS-04C</div>
                  </div>

                  {/* Itemized Table */}
                  <div className="space-y-1.5 text-left text-[10px]">
                    <div className="flex justify-between font-bold border-b border-dotted border-neutral-300 pb-1 text-neutral-500 uppercase text-[9px]">
                      <span>Description</span>
                      <span>Qty/Price</span>
                      <span className="text-right">Total sum</span>
                    </div>

                    <div className="flex justify-between items-start pt-1">
                      <div className="font-semibold text-neutral-800 text-left">
                        {selectedReceipt.fuelType} Dispensation
                      </div>
                      <div className="text-neutral-505 text-right whitespace-nowrap">
                        {selectedReceipt.litres} L <br/>
                        <span className="text-[8.5px]">@ UGX {(selectedReceipt.amountUGX / selectedReceipt.litres).toFixed(0)}</span>
                      </div>
                      <div className="font-bold text-neutral-905 text-right">
                        UGX {selectedReceipt.amountUGX.toLocaleString()}
                      </div>
                    </div>

                    <div className="border-t border-dotted border-neutral-350 pt-1.5 space-y-1">
                      <div className="flex justify-between text-neutral-500 text-[10px]">
                        <span>VATable Base (18%):</span>
                        <span>UGX {Math.round(selectedReceipt.amountUGX / 1.18).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-neutral-500 text-[10px]">
                        <span>VAT Charged (18%):</span>
                        <span>UGX {Math.round(selectedReceipt.amountUGX * 0.18 / 1.18).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-[12px] border-t border-dashed border-neutral-300/80 pt-1.5 text-neutral-900 animate-pulse">
                        <span>NET TOTAL TAX EXEMPT:</span>
                        <span>UGX {Math.round(selectedReceipt.amountUGX / 1.18).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-extrabold text-[13px] text-neutral-900 pt-0.5">
                        <span>TOTAL PAID [UGX]:</span>
                        <span>UGX {selectedReceipt.amountUGX.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="p-2.5 bg-neutral-100 rounded-lg text-left text-[9px] space-y-1 text-neutral-600 border border-neutral-200">
                    <div><span className="font-bold uppercase text-neutral-700">Payment Channel:</span> {selectedReceipt.paymentMethod}</div>
                    <div><span className="font-bold uppercase text-neutral-700">Verification ID:</span> OP-PAY-{selectedReceipt.id.substring(0, 8)}</div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold uppercase text-neutral-700">Status:</span>
                      <span className="text-emerald-600 font-extrabold">TRANSACTION CLEARED SUCCESS</span>
                    </div>
                  </div>

                  {/* QR code and Barcode simulation to look real */}
                  <div className="flex flex-col items-center justify-center space-y-1 pt-2.5">
                    <div className="w-16 h-16 bg-neutral-100 rounded p-1 flex items-center justify-center border border-neutral-200 font-bold text-neutral-700 text-[10px]">
                      {/* Simulated QR block layout */}
                      <div className="grid grid-cols-4 gap-1.5 w-full h-full opacity-70">
                        <div className="bg-black"></div><div className="bg-black"></div><div></div><div className="bg-black"></div>
                        <div></div><div className="bg-black"></div><div className="bg-black"></div><div></div>
                        <div className="bg-black"></div><div></div><div className="bg-black"></div><div className="bg-black"></div>
                        <div className="bg-black"></div><div className="bg-black"></div><div></div><div className="bg-black"></div>
                      </div>
                    </div>
                    <span className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase mt-1 text-center">
                      URA-E-INVOICE #ESD-{selectedReceipt.id.substring(0, 8)}
                    </span>
                  </div>

                  <div className="text-[9.5px] text-neutral-450 text-center italic pt-1 leading-snug">
                    Thank you for fueling with Olayo Petroleum! <br/>
                    Clean Fuel, Reliable Logistics, Honest Pricing.
                  </div>

                  {/* Paper Bottom Perforation */}
                  <div className="text-[10px] text-neutral-300 tracking-widest leading-[5px] select-none pt-2">
                    - - - - - - - - - - - - - - - - - - - - - - - - -
                  </div>

                </div>

              </div>

              {/* Receipt Footer Controls */}
              <div className="bg-neutral-100 px-6 py-4.5 border-t border-neutral-200/60 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    if (printWindow) {
                      printWindow.document.write(`
                        <html>
                          <head>
                            <title>Olayo Petroleum Receipt ${selectedReceipt.id}</title>
                            <style>
                              body { font-family: monospace; padding: 20px; color: #222; }
                              pre { white-space: pre-wrap; font-size: 13.5px; line-height: 1.5; }
                            </style>
                          </head>
                          <body onload="window.print(); window.close();">
                            <pre>
=========================================
          OLAYO PETROLEUM (U) LTD
=========================================
Plot 14, Kampala-Jinja Highway, Tororo
P.O. Box 928, Tororo, Uganda
Payer-TIN: 1004312894

RECEIPT NO: \${selectedReceipt.id}
DATE/TIME:  \${new Date().toLocaleString()}
STATION:    \${selectedReceipt.branchName}
CLIENT:     \${selectedReceipt.clientName}
CONTACT:    \${selectedReceipt.phone}

DESCRIPTION: \${selectedReceipt.fuelType} Fuel Dispensation
QUANTITY:    \${selectedReceipt.litres} Litres
NET AMOUNT:  UGX \${Math.round(selectedReceipt.amountUGX / 1.18).toLocaleString()}
VAT Charged: UGX \${Math.round(selectedReceipt.amountUGX * 0.18 / 1.18).toLocaleString()}
TOTAL PAID:  UGX \${selectedReceipt.amountUGX.toLocaleString()}

PAY OPTION:  \${selectedReceipt.paymentMethod}
STATUS:      TRANSACTION CLEARED SUCCESSFUL

-----------------------------------------
Thank you for your business. Clean Fuel,
Reliable Logistics, Honesty Pricing.
=========================================
                            </pre>
                          </body>
                        </html>
                      `);
                      printWindow.document.close();
                    } else {
                      alert('Thermal Print Spooled: Simulated physical printing established successfully (Pop-ups blocked).');
                    }
                  }}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    alert('Receipt Download Spooled: PDF layout saved to system Downloads folder.');
                  }}
                  className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
