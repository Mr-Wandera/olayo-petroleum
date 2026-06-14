import React, { useState } from 'react';
import { ContactInquiry } from '../types';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ExternalLink, ShieldCheck, CheckCircle } from 'lucide-react';

interface ContactProps {
  onAddInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => void;
  serviceFilterInquiry: string;
}

export default function Contact({ onAddInquiry, serviceFilterInquiry }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    serviceRequired: serviceFilterInquiry || 'Fuel Retail Service',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const servicesList = [
    'Fuel Retail Service',
    'Bulk Petroleum Supply',
    'Logistics & Haulage transport',
    'Service Garage Maintenance',
    'High Pressure Wash bay detailing',
    'Oasis Convenience store inquiry',
    'Bulk Lubricants partnership',
    'Other General Inquiry'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill out all required fields.');
      return;
    }

    setLoading(true);

    // Simulate database write
    setTimeout(() => {
      onAddInquiry({
        name: formData.name,
        company: formData.company || 'Private Individual',
        phone: formData.phone,
        email: formData.email,
        serviceRequired: formData.serviceRequired,
        message: formData.message || 'Direct contact request from website submission form.'
      });
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  // WhatsApp shortcut link
  const whatsappUrl = `https://wa.me/256701474562?text=Hello%20Olayo%20Petroleum,%20I%2527m%20inquiring%20about%20your%20services.`;

  return (
    <section id="contact" className="py-24 transition-colors duration-300 bg-white dark:bg-black border-t border-neutral-150 dark:border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-xl mb-16">
          <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest font-mono">Location & Inquiries</span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mt-1">
            CONTACT OLAYO
          </h2>
          <div className="w-16 h-1 bg-green-500 mt-3 rounded-full" />
          <p className="mt-4 text-sm text-neutral-550 dark:text-neutral-450 leading-relaxed font-normal">
            Reach our administrative team around-the-clock. Find our 24-hour forecourt located strategically at the corridor intersection in Tororo, Uganda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Card left: Info & Map */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            
            {/* Quick stats details info card */}
            <div className="p-8 bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-6">
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center mr-4 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">Operations Address</h4>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white uppercase mt-1">
                    Busia Road, Tororo, Uganda
                  </p>
                  <p className="text-xs text-neutral-555 dark:text-neutral-400 mt-0.5 font-normal leading-relaxed">
                    Gateway corridor intersection: Plus Code M5JH+Q3C, Coord 0.6865° N, 34.1798° E (Corridor transit to Kenya border).
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center mr-4 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">Call Operations</h4>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white mt-1">
                    +256 701 474562
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-450 mt-0.5 font-normal">
                    Admin Office hours: Mon-Fri 8am to 5pm. Forecourt: 24 Hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center mr-4 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">Digital Inbound</h4>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white mt-1">
                    info@olayopetroleum.com
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-404 mt-0.5 font-mono">
                    b2b.trade@olayopetroleum.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center mr-4 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">Business Status</h4>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-950/45 text-green-650 dark:text-green-450 mt-1 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping mr-0.5" />
                    OPEN 24 HOURS
                  </div>
                </div>
              </div>

            </div>

            {/* Simulated interactive premium Leaflet map */}
            <div className="relative h-64 bg-neutral-100 dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between p-6">
              
              {/* Map background grids and shapes resembling land lines */}
              <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle, #000 8%, transparent 8%), linear-gradient(0deg, transparent 49%, #000 49%, #000 51%, transparent 51%), linear-gradient(90deg, transparent 49%, #000 49%, #000 51%, transparent 51%)`,
                  backgroundSize: '24px 24px, 120px 120px, 120px 120px'
                }} />
              </div>

              {/* Highway markings and markers */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Simulated Road Line */}
                <div className="absolute w-[200%] h-12 bg-neutral-300 dark:bg-neutral-800/80 transform -rotate-12 flex items-center justify-center border-y border-neutral-400 dark:border-neutral-700">
                  <span className="text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                    ========= TORORO - BUSIA HIGHWAY (CORRIDOR) =========
                  </span>
                </div>
                {/* Secondary Cross Street */}
                <div className="absolute h-[200%] w-10 bg-neutral-300 dark:bg-neutral-800/80 transform -rotate-75 border-x border-neutral-400 dark:border-neutral-700 flex items-center justify-center text-center">
                  <span className="text-[8px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest writing-vertical">
                    BUSIA ROAD
                  </span>
                </div>

                {/* Pinpoint glow */}
                <div className="absolute z-20 flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute" />
                  <div className="w-4 h-4 bg-green-600 text-white rounded-full flex items-center justify-center relative shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              {/* Map overlay controls */}
              <div className="relative z-10 self-start bg-neutral-900/90 text-white px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold tracking-tight uppercase shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span>Tororo Highway Branch</span>
              </div>

              <div className="relative z-10 self-end w-full flex items-center justify-between mt-auto bg-white/95 dark:bg-neutral-950/95 backdrop-blur px-3 py-2.5 rounded-2xl border border-neutral-205 dark:border-neutral-800 shadow-lg">
                <div className="text-[10px] font-normal text-neutral-500 dark:text-neutral-400 leading-normal">
                  <span className="font-bold text-neutral-900 dark:text-white uppercase block">Olayo Station Pin</span>
                  Busia Road, Tororo District.
                </div>
                <a 
                  href="https://maps.google.com/?q=Tororo+Uganda" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] font-bold text-green-600 dark:text-green-400 hover:underline shrink-0 uppercase tracking-wider"
                >
                  Nav Tools <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

          </div>

          {/* Card right: Form */}
          <div className="lg:col-span-12 xl:col-span-7 bg-neutral-50 dark:bg-neutral-900/60 p-8 sm:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
            
            {submitted ? (
              <div className="text-center py-10 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">Form Submitted Successfully!</h3>
                <p className="text-neutral-500 dark:text-neutral-405 text-sm max-w-sm mx-auto mt-2 leading-relaxed font-normal">
                  Hi, <span className="text-neutral-900 dark:text-white font-bold">{formData.name}</span>. Your operational inquiry regarding <span className="text-neutral-900 dark:text-white font-bold">{formData.serviceRequired}</span> has been securely logged. Our trade representative will contact you shortly.
                </p>
                <div className="bg-white dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800/80 p-5 rounded-2xl mt-6 text-left max-w-xs w-full text-xs font-normal">
                  <p className="text-[10px] font-bold text-neutral-405 mb-1.5 uppercase tracking-wide">Submission Blueprint:</p>
                  <p>Inquirer email: {formData.email}</p>
                  <p>Inquirer contact: {formData.phone}</p>
                  <p className="mt-1.5 text-green-600 dark:text-green-400 font-bold uppercase">Priority Status: 2 Hour Reply Guarantee</p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      company: '',
                      phone: '',
                      email: '',
                      serviceRequired: 'Fuel Retail Service',
                      message: ''
                    });
                  }}
                  className="mt-6 px-6 py-2.5 bg-neutral-900 hover:bg-black dark:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer uppercase tracking-wider"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase tracking-tight">Send Us a Direct Message</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Required fields are designated with an asterisk (*). All transmissions are secure and vetted directly by management.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-550 dark:text-neutral-450 uppercase mb-1.5 tracking-wider font-mono">Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Wandera"
                      className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-green-500 rounded-xl py-2.5 px-3.5 text-sm outline-none text-neutral-900 dark:text-white transition-all focus:bg-white dark:focus:bg-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-550 dark:text-neutral-450 uppercase mb-1.5 tracking-wider font-mono">Company Name</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Tororo Logistics Co."
                      className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-green-500 rounded-xl py-2.5 px-3.5 text-sm outline-none text-neutral-900 dark:text-white transition-all focus:bg-white dark:focus:bg-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-550 dark:text-neutral-450 uppercase mb-1.5 tracking-wider font-mono">Phone Contact *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +256 700 000000"
                      className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-green-500 rounded-xl py-2.5 px-3.5 text-sm outline-none text-neutral-900 dark:text-white transition-all focus:bg-white dark:focus:bg-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-550 dark:text-neutral-450 uppercase mb-1.5 tracking-wider font-mono">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. wander@gmail.com"
                      className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-green-500 rounded-xl py-2.5 px-3.5 text-sm outline-none text-neutral-900 dark:text-white transition-all focus:bg-white dark:focus:bg-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-550 dark:text-neutral-450 uppercase mb-1.5 tracking-wider font-mono">Service Sector Selected</label>
                  <select 
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-green-500 rounded-xl py-2.5 px-3 text-sm outline-none text-neutral-900 dark:text-white cursor-pointer transition-all"
                  >
                    {servicesList.map((srv, i) => (
                      <option value={srv} key={i}>{srv}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-550 dark:text-neutral-450 uppercase mb-1.5 tracking-wider font-mono font-semibold">Message Details</label>
                  <textarea 
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about your query or wholesale petroleum dispatch targets..."
                    className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-green-500 rounded-xl py-2.5 px-3.5 text-sm outline-none resize-none text-neutral-900 dark:text-white transition-all focus:bg-white dark:focus:bg-black"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer text-xs uppercase tracking-wider"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Submitting secure inquiry...' : 'Send Inquiry Message'}</span>
                  </button>
                  
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-1.5 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3.5 rounded-xl text-xs transition-all shadow-sm cursor-pointer uppercase tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-green-500" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
