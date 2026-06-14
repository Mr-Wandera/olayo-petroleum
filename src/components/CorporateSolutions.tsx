import React, { useState } from 'react';
import { ContactInquiry } from '../types';
import { Briefcase, Building, ShieldCheck, CheckCircle, Users2, FileText, Send, Loader2 } from 'lucide-react';

interface CorporateSolutionsProps {
  serviceFilterInquiry: string;
  onAddInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export default function CorporateSolutions({ serviceFilterInquiry, onAddInquiry }: CorporateSolutionsProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    serviceRequired: serviceFilterInquiry || 'Bulk Diesel Supply',
    industry: 'Logistics',
    volume: '5,000 to 10,000 Litres',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const industries = [
    'Logistics & Haulage',
    'Construction & Infrastructure',
    'Agriculture & Farming',
    'Manufacturing & Warehousing',
    'Schools & Higher Institutions',
    'Government & Public Works',
    'NGOs & Relief Operations'
  ];

  const fuelServicesList = [
    'Bulk Diesel Supply',
    'Bulk Petrol Supply',
    'Scheduled Depot Delivery',
    'On-site Equipment Refueling',
    'Long-Term Fuel Supply Contracts',
    'Corporate Fleet Card Agreements',
    'Lubricants Bulk Partnership'
  ];

  const volumeTiers = [
    'Under 2,000 Litres / month',
    '2,000 to 5,000 Litres / month',
    '5,000 to 10,005 Litres / month',
    '10,000 to 50,000 Litres / month',
    'Over 50,000 Litres / month'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out all required fields.');
      return;
    }

    setLoading(true);

    // Simulate submission flow
    setTimeout(() => {
      onAddInquiry({
        name: formData.name,
        company: `${formData.company} (${formData.industry})`,
        phone: formData.phone,
        email: formData.email,
        serviceRequired: `${formData.serviceRequired} [Est. Vol: ${formData.volume}]`,
        message: formData.message || `Corporate fuel partnership inquiry. Preferred industry: ${formData.industry}.`
      });
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="corporate" className="py-24 transition-colors duration-300 bg-neutral-950 dark:bg-black text-white relative overflow-hidden border-y border-neutral-900">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-700/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold text-green-400 uppercase tracking-widest font-mono">B2B Solutions</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-1">
            CORPORATE FUEL PARTNERSHIPS
          </h2>
          <div className="w-16 h-1 bg-green-500 mt-3 rounded-full" />
          <p className="mt-4 text-sm text-neutral-300 leading-relaxed font-normal">
            We understand the extreme stakes of commercial operations. Downtime is expensive. Olayo Petroleum powers logistics, mining equipment, schools, and heavy manufacturing with high quality diesel, bulk lubricants, and flexible credit terms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info grid Column */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800">
              <h3 className="text-lg font-black uppercase tracking-tight mb-4 text-green-400">
                What We Guarantee Corporate Clients:
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center mr-3 mt-1 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase">UNBS Certified Quality Assurance</h4>
                    <p className="text-xs text-neutral-450 mt-1 leading-relaxed">
                      Every batch undergoes digital testing before leaving the depot, fully guarding your equipment injectors from density drops.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center mr-3 mt-1 shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase">Scheduled & Emergency Dispatch</h4>
                    <p className="text-xs text-neutral-450 mt-1 leading-relaxed">
                      Dedicated heavy haul tankers on active alert with automated delivery calendars customized to your generator or field run rates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center mr-3 mt-1 shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase">Strategic Tororo Depot Positioning</h4>
                    <p className="text-xs text-neutral-450 mt-1 leading-relaxed">
                      Located right on Limbo Street, Mile One, providing immediate corridor connectivity for cross-border logistics.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Industries Served Carousel list */}
            <div>
              <h4 className="text-[10px] font-bold font-mono tracking-widest text-neutral-450 uppercase mb-3">
                Industries We Power Across Uganda:
              </h4>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-300"
                  >
                    <Users2 className="w-3.5 h-3.5 mr-1.5 text-green-400" />
                    {ind}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-neutral-900 p-8 sm:p-10 rounded-3xl border border-neutral-800 shadow-2xl relative">
            
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Quote Request Registered!</h3>
                <p className="text-neutral-300 text-sm max-w-md mx-auto mt-3">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your bulk energy solution request representing <span className="text-white font-semibold">{formData.company}</span> has been logged to our B2B trade specialists.
                </p>
                <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl mt-6 text-left max-w-md w-full">
                  <p className="text-xs text-neutral-400 font-mono mb-1">REFERENCE RECEIPT:</p>
                  <p className="text-xs font-semibold text-white">Client Service: {formData.serviceRequired}</p>
                  <p className="text-xs text-neutral-400 mt-1">Estimated volume: {formData.volume}</p>
                  <p className="text-xs text-neutral-400">Response Guarantee: Within 2 Business hours</p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      company: '',
                      phone: '',
                      email: '',
                      serviceRequired: 'Bulk Diesel Supply',
                      industry: 'Logistics',
                      volume: '5,000 to 10,000 Litres',
                      message: ''
                    });
                  }}
                  className="mt-8 px-5 py-2.5 bg-neutral-850 hover:bg-neutral-800 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Submit Another Corporate Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-400" /> B2B Quote Request Form
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Fill out our structured partnership blueprint for swift wholesale discount tiers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ronald Mukasa"
                      className="w-full bg-neutral-950 focus:bg-black border border-neutral-800 focus:border-green-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Tororo Logistical Freight"
                      className="w-full bg-neutral-950 focus:bg-black border border-neutral-800 focus:border-green-550 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Phone Contact (WhatsApp enabled) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +256 700 000000"
                      className="w-full bg-neutral-950 focus:bg-black border border-neutral-800 focus:border-green-550 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ronald@tororologistics.com"
                      className="w-full bg-neutral-950 focus:bg-black border border-neutral-800 focus:border-green-550 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Solution Needed
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-805 focus:border-green-500 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none cursor-pointer"
                    >
                      {fuelServicesList.map((srv, i) => (
                        <option value={srv} key={i}>{srv}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Industry Sector
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-805 focus:border-green-500 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none cursor-pointer"
                    >
                      {industries.map((ind, i) => (
                        <option value={ind} key={i}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Volume Target
                    </label>
                    <select
                      name="volume"
                      value={formData.volume}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-805 focus:border-green-500 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none cursor-pointer"
                    >
                      {volumeTiers.map((vol, i) => (
                        <option value={vol} key={i}>{vol}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Delivery Specifications / Requirements
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe delivery frequency, requested credit periods, or generator model specs..."
                    className="w-full bg-neutral-950 focus:bg-black border border-neutral-800 focus:border-green-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 disabled:opacity-50 cursor-pointer uppercase text-xs tracking-wider"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Negotiating Rates with Trade Specialist...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Commercial Fuel Deal Proposal</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
