import React from 'react';
import { ShieldCheck, CheckCircle2, ShieldAlert, Users, Lightbulb, Award, Star, ArrowUpRight, Flame } from 'lucide-react';

export default function AboutUs() {
  const values = [
    {
      title: 'Integrity',
      description: 'Honest volumetric dispensing, clean business negotiations, and absolute transparency with all suppliers.',
      icon: ShieldCheck,
      color: 'text-blue-500 bg-blue-500/10'
    },
    {
      title: 'Reliability',
      description: 'We maintain reserve diesel capacities to prevent fleet interruption even in times of global supply chain strain.',
      icon: CheckCircle2,
      color: 'text-amber-500 bg-amber-500/10'
    },
    {
      title: 'Safety',
      description: 'Zero spill compliance, high standard safety valves in transport, and aggressive forecourt fire-prevention routines.',
      icon: ShieldAlert,
      color: 'text-rose-500 bg-rose-500/10'
    },
    {
      title: 'Customer Focus',
      description: 'Personalized corporate accounts, 24-hour phone support, and friendly, quick forecourt attendants.',
      icon: Users,
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      title: 'Innovation',
      description: 'Dynamic fleet cards, digital vehicle diagnostics services, and energy tracking client portals.',
      icon: Lightbulb,
      color: 'text-purple-500 bg-purple-500/10'
    },
    {
      title: 'Excellence',
      description: 'Continuous staff upskilling, top tier fuel additives, and high-efficiency logistics dispatch timers.',
      icon: Award,
      color: 'text-teal-500 bg-teal-500/10'
    }
  ];

  return (
    <section id="about" className="py-24 transition-colors duration-300 bg-neutral-50 dark:bg-black border-y border-neutral-150 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
         {/* Top Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest font-mono">Corporate Identity</span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mt-1">
            ABOUT OLAYO PETROLEUM
          </h2>
          <div className="w-16 h-1 bg-green-500 mt-3 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
            Olayo Petroleum is a Ugandan-owned petroleum and energy company based in Tororo. We are dedicated to delivering reliable fuel products and value-added retail and service solutions to individuals, transport operators, factories, and development institutions across Eastern Uganda and East Africa.
          </p>
        </div>

        {/* Corporate Profile Bento Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Mission & Vision Card */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm hover:border-green-500/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
                  <Flame className="w-6 h-6 fill-current text-green-500" />
                </div>
                <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-2">Our Mission</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                  To provide premium petroleum products and exceptional customer service while supporting economic development through reliable bulk energy and transport logistics solutions.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-50 dark:border-neutral-800 mt-4 text-[10px] font-bold text-neutral-450 dark:text-green-500 font-mono tracking-wider uppercase">
                Tororo District Co-op Partner
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm hover:border-green-500/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 fill-current text-green-500" />
                </div>
                <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-2">Our Vision</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                  To become one of East Africa’s most trusted energy networks, distinguished by absolute logistical excellence, environmentally positive storage, and elite automotive services.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-50 dark:border-neutral-800 mt-4 text-[10px] font-bold text-neutral-450 dark:text-green-500 font-mono tracking-wider uppercase">
                Global Fuel Frameworks
              </div>
            </div>

          </div>

          {/* Quick numbers / stats */}
          <div className="lg:col-span-5 bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border border-neutral-800 shadow-xl hover:border-green-500/20 transition-colors">
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-green-900/10 to-transparent pointer-events-none" />
            
            <div>
              <span className="text-xs font-bold text-green-400 uppercase tracking-widest font-mono">Operations Index</span>
              <h3 className="text-xl font-black uppercase mt-1">OLAYO AT A GLANCE</h3>
              <p className="text-xs text-neutral-400 mt-2">
                Providing reliable energy flow from Nile Basin to Kenyan Border ports.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 my-8">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">24/7</span>
                <p className="text-[10px] uppercase font-bold text-neutral-400 mt-1">Always Operating</p>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">100%</span>
                <p className="text-[10px] uppercase font-bold text-neutral-400 mt-1">UNBS Certified Fuel</p>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">40k+</span>
                <p className="text-[10px] uppercase font-bold text-neutral-400 mt-1">Litres Logged Daily</p>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-bold text-green-500 tracking-tight">0</span>
                <p className="text-[10px] uppercase font-bold text-neutral-400 mt-1">Spill Incidence Rate</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-neutral-400 font-bold">
              <span>Busia Road, Tororo, Uganda</span>
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            </div>
          </div>

        </div>

        {/* Core Values Section */}
        <div>
          <div className="text-center mb-10 max-w-xl mx-auto">
            <h3 className="text-lg font-black text-neutral-950 dark:text-white uppercase tracking-wider">
              Our Core Pillars
            </h3>
            <p className="text-xs text-neutral-550 dark:text-neutral-405 mt-1">
              Six foundational ethics guiding Olayo Petroleum’s administrative behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm hover:border-green-500/20 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-4`}>
                  <v.icon className="w-5 h-5 text-green-500" />
                </div>
                <h4 className="text-sm font-black text-neutral-900 dark:text-white mb-1 uppercase tracking-tight">
                  {v.title}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
