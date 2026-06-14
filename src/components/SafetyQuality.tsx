import React from 'react';
import { ShieldCheck, Flame, Trees, Award, Heart, CheckCircle2, FlaskConical, Bell } from 'lucide-react';

export default function SafetyQuality() {
  const safetyProcedures = [
    {
      title: 'Digital Density Profiling',
      description: 'Incoming tankers are tested with digital hydrometers before discharge. This locks out moisture or density corruption entirely.',
      icon: FlaskConical,
      tag: 'UNBS Standards'
    },
    {
      title: 'Vapor Return Containment',
      description: 'Our nozzles utilize progressive vacuum containment to absorb volatile organic molecules, keeping the forecourts odor-free and safe.',
      icon: Trees,
      tag: 'Eco-Friendly'
    },
    {
      title: 'Auto-Shutoff Forecourt Valves',
      description: 'Critical isolation switches are mapped across all fuel dispensers to enable instant fuel flow isolation in less than 0.5 seconds.',
      icon: Bell,
      tag: 'Under-forecourt protection'
    },
    {
      title: 'Active Flame & Spark Guards',
      description: 'Non-conductive nozzle plates combined with lightning grounding grids isolate and redirect mechanical static instantly.',
      icon: Flame,
      tag: 'Hazard Neutralized'
    }
  ];

  return (
    <section id="safety" className="py-24 transition-colors duration-300 bg-neutral-50 dark:bg-black border-t border-neutral-150 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest font-mono">Zero Toxicity Policy</span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mt-1">
              SAFETY & FUEL CONTROLS
            </h2>
            <div className="w-16 h-1 bg-green-500 mt-3 rounded-full" />
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
              At Olayo Petroleum, safety is our primary engineering metric. Our state-of-the-art underground storage is built using double-walled high density composite materials to guarantee zero soil seepage. All tankers are certified by the Uganda Ministry of Energy and Mineral Development, and forecourt staffs undergo routine high stress fire drills.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-150 dark:border-neutral-800 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-neutral-950 dark:text-white">UNBS ISO 9001</span>
            <p className="text-[10px] text-green-650 dark:text-green-500 mt-1 uppercase font-mono tracking-widest font-bold">
              Corporate Safety Quality Certification
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-405 mt-2 max-w-xs leading-relaxed">
              Fully approved under the National Weights and Measures standards for accurate forecourt volumetric outputs.
            </p>
          </div>
        </div>

        {/* Procedures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyProcedures.map((proc, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-150 dark:border-neutral-800 flex flex-col justify-between group hover:border-green-500/30 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center mb-4">
                  <proc.icon className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-1.5">
                  {proc.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
                  {proc.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 text-[10px] font-mono text-green-600 dark:text-green-400 font-bold uppercase tracking-wider">
                {proc.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications and visual logs under forecourt */}
        <div className="mt-12 bg-green-500/5 border border-green-500/10 p-8 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="space-y-1">
              <div className="flex items-center justify-center text-green-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase">Weekly Tank Calibration</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Every reservoir is verified weekly via high-reliability automated ultrasonic sounders.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center text-green-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase">EPA Grade Interceptors</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                High capacity storm-water catchers separate heavy oil and road grease before discharge.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center text-green-500">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase">First-Aid Certified Staff</h4>
              <p className="text-xs text-neutral-505 dark:text-neutral-400">
                100% of standard supervisors on active duty are trained first-responder personnel.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
