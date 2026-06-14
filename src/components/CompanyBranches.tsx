import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Layers, 
  Smartphone, 
  Cpu, 
  Zap, 
  Wifi, 
  Database, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  Server, 
  ArrowRight, 
  ExternalLink,
  Table,
  ShieldCheck,
  Compass,
  Phone
} from 'lucide-react';
import { Branch } from '../types';

interface CompanyBranchesProps {
  branches: Branch[];
}

export default function CompanyBranches({ branches }: CompanyBranchesProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [activeTechTab, setActiveTechTab] = useState<'payments' | 'forecourt' | 'power' | 'opportunities'>('payments');

  // Automatically select the first available branch if current selection is invalid
  useEffect(() => {
    if (branches && branches.length > 0) {
      if (!selectedBranchId || !branches.some(b => b.id === selectedBranchId)) {
        setSelectedBranchId(branches[0].id);
      }
    }
  }, [branches, selectedBranchId]);

  const selectedBranch = branches.find(b => b.id === selectedBranchId) || branches[0] || {
    id: 'empty',
    name: 'No active stations',
    location: 'Pending administrative deployment...',
    coordinates: 'N/A',
    plusCode: 'N/A',
    strategicContext: 'Admin has cleared regional station registers. Use Admin Portal to re-insert regional fuel stations.',
    powerBackup: 'N/A',
    capacities: [],
    localStack: {
      payments: 'N/A',
      forecourt: 'N/A',
      connectivity: 'N/A'
    }
  };

  const devOpportunities = [
    {
      title: 'Bulk & Fleet Web Presence',
      current: 'Non-existent (Historically manual booking operations).',
      opportunity: 'A modern, SEO-optimized landing directory where freight operators can lock B2B wholesale fuel contracts online.',
      icon: ExternalLink,
      badge: 'Completed'
    },
    {
      title: 'Local Fleet Management API',
      current: 'Paper invoices and Excel sheet bookkeeping.',
      opportunity: 'Generate dynamic QR codes for haulage vehicles. Fleet operators scan these on the forecourt to deduct fuel allocations instantly and track mileage in real-time.',
      icon: QrCode,
      badge: 'Core Concept Active'
    },
    {
      title: 'Automatic Tank Gauging (ATG)',
      current: 'Manual dipstick readings in underground tanks.',
      opportunity: 'Integrate simple IoT telemetry loggers inside fuel chambers. Stream tank volumes continuously to Kampala HQ to prevent "run-dry" scenarios during peak border congestion.',
      icon: Compass,
      badge: 'Integrator Spec'
    },
    {
      title: 'Trucker Captive Wi-Fi Spot',
      current: 'No internet access offered on forecourts.',
      opportunity: 'Deploy specialized captive portal routers. Long-haul truck drivers receive high-speed complimentary Wi-Fi upon purchasing standard fuel volumes, boosting customer retention.',
      icon: Wifi,
      badge: 'Proposed Portal'
    }
  ];

  return (
    <section id="branches" className="py-24 transition-colors duration-300 bg-white dark:bg-black border-y border-neutral-150 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Zone */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest font-mono">Territorial Footprint</span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mt-1">
              GROWING BRANCH NETWORK
            </h2>
            <div className="w-16 h-1 bg-green-500 mt-3 rounded-full" />
            <p className="mt-4 text-sm text-neutral-550 dark:text-neutral-450 leading-relaxed font-normal">
              Olayo Petroleum is expanding its infrastructure footprints across strategic East African transit routes. Our stations operate on secure localized technology frames keeping transits fueled and safe 24 hours a day.
            </p>
          </div>

          {/* Quick Stats Summary Badge */}
          <div className="mt-6 md:mt-0 inline-flex items-center gap-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl shrink-0 shadow-sm">
            <Compass className="w-8 h-8 text-green-500 shrink-0" />
            <div>
              <span className="text-sm font-black text-neutral-900 dark:text-white uppercase block">Strategic Ports</span>
              <span className="text-xs text-neutral-500 font-bold font-mono">UGANDA BORDER CORRIDORS</span>
            </div>
          </div>
        </div>

        {/* Branch Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Branch List Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono mb-2">Select Growing Branch Unit:</p>
            {branches.map(branch => (
              <button
                key={branch.id}
                onClick={() => setSelectedBranchId(branch.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  selectedBranchId === branch.id
                    ? 'bg-neutral-50 dark:bg-neutral-900 border-green-500 shadow-sm'
                    : 'bg-white dark:bg-black border-neutral-150 dark:border-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-800'
                }`}
              >
                <div className="space-y-1">
                  <span className={`text-[10px] font-bold font-mono uppercase tracking-widest ${
                    selectedBranchId === branch.id ? 'text-green-600 dark:text-green-400' : 'text-neutral-400'
                  }`}>
                    {branch.plusCode.split(',')[1] || 'Regional Network'}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-950 dark:text-white transition-colors group-hover:text-green-500 uppercase tracking-tight">
                    {branch.name}
                  </h4>
                  <p className="text-xs text-neutral-550 dark:text-neutral-450 truncate max-w-[280px]">
                    {branch.location}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  selectedBranchId === branch.id
                    ? 'bg-green-500 text-white'
                    : 'bg-neutral-50 dark:bg-neutral-900 text-neutral-400 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-850'
                }`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>

          {/* Current Branch Profile Card */}
          <div className="lg:col-span-7 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-150 dark:border-neutral-900 p-8 sm:p-10 rounded-3xl relative">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800/80">
              <div>
                <span className="text-[10px] bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                  ACTIVE HUB PROFILE
                </span>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mt-2">
                  {selectedBranch.name}
                </h3>
              </div>
              
              <div className="text-right">
                <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-wider">Geo-Coordinates</span>
                <span className="text-sm font-bold text-neutral-900 dark:text-green-450 font-mono tracking-tight">
                  {selectedBranch.coordinates}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
              
              {/* Strategic Information Block */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono mb-2">Location Context</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                    {selectedBranch.strategicContext}
                  </p>
                  <p className="text-[11px] text-green-600 dark:text-green-400 mt-2 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Plus Code: {selectedBranch.plusCode}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono mb-2">Physical Address</h4>
                  <div className="p-3 bg-white dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800/80 rounded-xl text-xs font-bold uppercase tracking-wide text-neutral-800 dark:text-white">
                    {selectedBranch.location}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono mb-2">Power Safeguards</h4>
                  <p className="text-xs text-neutral-550 dark:text-neutral-400 leading-normal flex items-start gap-2">
                    <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{selectedBranch.powerBackup}</span>
                  </p>
                </div>
              </div>

              {/* Capacities & Local Hardware Details */}
              <div className="md:col-span-5 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono mb-3">Reservoir Capacities</h4>
                  <div className="space-y-2">
                    {selectedBranch.capacities.map((cap, idx) => (
                      <div key={idx} className="bg-white dark:bg-neutral-950 p-3 rounded-xl border border-neutral-150 dark:border-neutral-800/80 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400 uppercase">{cap.product}</span>
                        <span className="text-xs font-black text-green-600 dark:text-green-400 font-mono">{cap.capacity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-green-500/5 dark:bg-green-505/10 border border-green-500/10 space-y-2">
                  <span className="text-[9px] font-bold font-mono tracking-wider text-green-600 dark:text-green-400 uppercase block">Active QA Protocol</span>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-350 leading-relaxed font-normal">
                    Participates in strict manual inspection and QA fuel sample testing verifying absolute density, zero water contamination, and zero oxidation limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical site assessment developer section */}
        <div className="pt-16 border-t border-neutral-150 dark:border-neutral-900">
          
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono">API & IT Systems Integrators</span>
            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mt-1">
              ENERGY TECH ECOSYSTEM
            </h3>
            <p className="mt-2 text-xs text-neutral-550 dark:text-neutral-405 leading-relaxed font-normal">
              Olayo operates on high-reliability, customized IT frameworks tailored to survive power fluctuations and cellular latency variations across border transit checkpoints. Connect with our engineering terminals below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Tech Stack Categories Left Column */}
            <div className="lg:col-span-4 space-y-2.5">
              <button
                onClick={() => setActiveTechTab('payments')}
                className={`w-full text-left p-4 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  activeTechTab === 'payments'
                    ? 'bg-neutral-900 dark:bg-neutral-900 border-neutral-800 text-white shadow'
                    : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-150 dark:border-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-tight block">Payment Gateways</span>
                  <span className="text-[10px] opacity-80 block uppercase font-mono font-bold">MoMo NFC • Local POS Uptime</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTechTab('forecourt')}
                className={`w-full text-left p-4 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  activeTechTab === 'forecourt'
                    ? 'bg-neutral-900 dark:bg-neutral-900 border-neutral-800 text-white shadow'
                    : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-150 dark:border-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-tight block">Forecourt Offline Cache</span>
                  <span className="text-[10px] opacity-80 block uppercase font-mono font-bold">Transaction Queue sync</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTechTab('power')}
                className={`w-full text-left p-4 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  activeTechTab === 'power'
                    ? 'bg-neutral-900 dark:bg-neutral-900 border-neutral-800 text-white shadow'
                    : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-150 dark:border-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-tight block">Power & Grid Stability</span>
                  <span className="text-[10px] opacity-80 block uppercase font-mono font-bold">Generator takeover • UPS</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTechTab('opportunities')}
                className={`w-full text-left p-4 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  activeTechTab === 'opportunities'
                    ? 'bg-neutral-900 dark:bg-neutral-900 border-neutral-800 text-white shadow'
                    : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-150 dark:border-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-tight block">Developer Opportunities</span>
                  <span className="text-[10px] opacity-80 block uppercase font-mono font-bold">Gap analysis & API Targets</span>
                </div>
              </button>
            </div>

            {/* Tech Stack Details Panel Right Column */}
            <div className="lg:col-span-8 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-805 p-8 sm:p-10 rounded-3xl min-h-[320px] flex flex-col justify-between">
              
              <div>
                {/* 1. PAYMENTS ACTIVE VIEW */}
                {activeTechTab === 'payments' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-green-500" />
                      <h4 className="text-base font-black text-neutral-900 dark:text-white uppercase tracking-tight">Payment Gateways & POS Terminal Uptime</h4>
                    </div>
                    <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="text-xs font-normal text-neutral-600 dark:text-neutral-300 leading-normal">
                        <span className="font-bold text-neutral-900 dark:text-white block uppercase mb-1">Developer Context Node:</span>
                        NFC Payments rely heavily on Airtel Money and MTN Mobile Money APIs. In Eastern Uganda border highways, cellular datalinks fluctuate seasonally. Our infrastructure implements graceful system timeout rules to ensure fueling operations parameters are logged securely.
                      </div>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-normal">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Handheld Android POS terminals utilizing cell carrier fallback bands.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>NFC contactless reader integration syncing over secure sandbox payloads.</span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* 2. FORECOURT ACTIVE VIEW */}
                {activeTechTab === 'forecourt' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2">
                      <Server className="w-5 h-5 text-green-500" />
                      <h4 className="text-base font-black text-neutral-900 dark:text-white uppercase tracking-tight">Forecourt Control & Offline Transaction Caching</h4>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                      Each volumetric pump counts fuel batches using localized electronic counting processors. For maximum reliability, our application architecture utilizes a localized offline-first pattern.
                    </p>
                    <div className="p-5 bg-green-500/5 rounded-2xl border border-green-500/15">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-green-650 dark:text-green-450 block uppercase mb-2">Offline Queue-to-Cloud Sync Protocol</span>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
                        When cellular drops are encountered, transaction and quantity data points are cached locally in a highly lightweight database ledger. Once network connection bounds are restored, the transaction queue is automatically popped and updated to the central corporate cloud ledger at Kampala HQ without requiring manual operator intervention.
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. POWER & GRID ACTIVE VIEW */}
                {activeTechTab === 'power' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-500" />
                      <h4 className="text-base font-black text-neutral-900 dark:text-white uppercase tracking-tight">Power Stability & UPS Server Safeguards</h4>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                      Tororo District grid networks experience frequent load shifts and voltage sags, presenting high risks to electronic flow counters and system routes.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-normal">
                      <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800 rounded-xl space-y-1">
                        <span className="font-bold text-neutral-900 dark:text-white block uppercase">True Double-Conversion UPS</span>
                        <p className="text-neutral-500">Filters incoming wave transients, regulating clean 240V energy feeds into ticketing registers and routers continuously.</p>
                      </div>
                      <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800 rounded-xl space-y-1">
                        <span className="font-bold text-neutral-900 dark:text-white block uppercase">Diesel Generator Backing</span>
                        <p className="text-neutral-500">Launches under auto-transfer switches in under 12 seconds during total power grid failover occurrences.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. DEVELOPER JOBS ACTIVE VIEW */}
                {activeTechTab === 'opportunities' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2">
                      <Table className="w-5 h-5 text-green-500" />
                      <h4 className="text-base font-black text-neutral-900 dark:text-white uppercase tracking-tight">Developer Opportunities & Gap Analysis</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left text-neutral-500 dark:text-neutral-400 font-normal">
                        <thead className="text-[10px] text-neutral-700 dark:text-neutral-300 uppercase tracking-wider font-bold bg-neutral-100 dark:bg-neutral-950/80">
                          <tr>
                            <th scope="col" className="px-3 py-2.5 rounded-l-lg">Target Feature</th>
                            <th scope="col" className="px-3 py-2.5">Likely Current Status</th>
                            <th scope="col" className="px-3 py-2.5 rounded-r-lg">Engineering Opportunity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                          {devOpportunities.map((op, idx) => (
                            <tr key={idx} className="hover:bg-neutral-100/50 dark:hover:bg-neutral-950/20">
                              <td className="px-3 py-3 font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-1">
                                <op.icon className="w-3.5 h-3.5 text-green-500 inline shrink-0" />
                                <span>{op.title}</span>
                              </td>
                              <td className="px-3 py-3 text-neutral-500">{op.current}</td>
                              <td className="px-3 py-3 text-neutral-600 dark:text-neutral-300 font-normal leading-normal">{op.opportunity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Developer action footer info */}
              <div className="pt-6 border-t border-neutral-250 dark:border-neutral-800 mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>Developer Direct Phone: <span className="font-bold text-neutral-900 dark:text-white font-mono">+254 798 080038</span></span>
                </div>
                
                <span className="text-[9px] font-mono bg-green-100 dark:bg-green-950/45 text-green-850 dark:text-green-450 px-2 rounded font-bold uppercase tracking-widest">
                  Offline-First Architecture Standard
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
