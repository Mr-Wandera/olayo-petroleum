import React from 'react';
import { FuelPrice } from '../types';
import { TrendingUp, TrendingDown, Minus, Clock, Droplet } from 'lucide-react';

interface FuelPriceBoardProps {
  prices: FuelPrice[];
}

export default function FuelPriceBoard({ prices }: FuelPriceBoardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 md:p-8 shadow-xl border border-neutral-100 dark:border-neutral-800 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest font-mono">Real-Time Board</span>
          <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
            <Droplet className="w-5 h-5 text-green-500 fill-green-500/20" /> Tororo Fuel Index
          </h3>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-neutral-500 dark:text-neutral-450 font-medium">
          <Clock className="w-3.5 h-3.5 text-green-500" />
          <span className="font-bold">Live Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {prices.map((item) => (
          <div 
            key={item.id} 
            className="group relative overflow-hidden bg-neutral-50 dark:bg-black/50 hover:bg-white dark:hover:bg-neutral-950/80 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800 hover:border-green-500/40 dark:hover:border-green-500/40 transition-all duration-300 shadow-sm"
          >
            {/* Ambient Background decoration */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 rounded-bl-full group-hover:scale-110 transition-transform duration-300" />

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 max-w-[160px] truncate">
                {item.name}
              </span>
              <span>
                {item.trend === 'up' && (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
                    <TrendingUp className="w-3 h-3" /> Up
                  </span>
                )}
                {item.trend === 'down' && (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400">
                    <TrendingDown className="w-3 h-3" /> Down
                  </span>
                )}
                {item.trend === 'stable' && (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-150 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                    <Minus className="w-3 h-3" /> Stable
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-3xl font-black text-neutral-950 dark:text-green-500 tracking-tighter">
                {item.price.toLocaleString()}
              </span>
              <span className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">
                {item.currency} / {item.unit}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-400 dark:text-neutral-500">
              <span className="font-bold">UNBS Certified</span>
              <span className="font-mono">Updated: {item.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-green-500/5 border border-green-500/10 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-600 dark:text-neutral-300">
        <span className="flex items-center gap-1.5 font-bold">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping shrink-0" />
          Daily live rates calibrated and sealed under Uganda Weights & Measures standards.
        </span>
        <span className="mt-1 sm:mt-0 font-black text-green-600 dark:text-green-400 font-mono">
          24H SERVICE • +256 700 000 000
        </span>
      </div>
    </div>
  );
}
