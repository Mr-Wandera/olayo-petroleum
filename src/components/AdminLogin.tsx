import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldAlert, ArrowLeft, RefreshCw } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export default function AdminLogin({ onLoginSuccess, onCancel }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!username.trim() || !password) {
      setErrorMsg('Please populate both Username and Access Password fields.');
      return;
    }

    setIsLoading(true);

    // Simulate cryptographic gateway auth handshake in 1 second
    setTimeout(() => {
      setIsLoading(false);
      // We check for default admin credentials
      if (username.trim().toLowerCase() === 'admin' && password === 'olayo-admin-2026') {
        onLoginSuccess();
      } else {
        setErrorMsg('Invalid Administrator credentials. Please verify your security card or SMS keyring token.');
      }
    }, 1000);
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center p-4 sm:p-8 bg-neutral-100 dark:bg-black/40 transition-colors duration-300">
      <div id="admin-login-card" className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-805 rounded-3xl p-6 sm:p-10 max-w-md w-full shadow-2xl relative overflow-hidden transition-all text-left">
        
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs font-bold text-neutral-550 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-all cursor-pointer mb-6 border border-neutral-200 dark:border-neutral-800 rounded-lg px-2.5 py-1 w-fit bg-neutral-50 dark:bg-neutral-950"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Portal</span>
        </button>

        {/* Lock visual indicator header */}
        <div className="text-center space-y-3 mb-8">
          <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 shadow-sm animate-pulse">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
              Gateway Gatekeeper
            </h2>
            <p className="text-xs text-neutral-450 dark:text-neutral-400 mt-1">
              Authorized personnel only. Enter central administrative credentials to proceed.
            </p>
          </div>
        </div>

        {/* Credentials hints panel */}
        <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl mb-6 space-y-1.5">
          <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest block font-mono">
            Demo Portal Credentials
          </span>
          <p className="text-[10.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
            For validation purposes, utilize the built-in system administrator keychain:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono leading-none pt-0.5 text-neutral-700 dark:text-neutral-300">
            <div className="bg-white dark:bg-neutral-950/80 p-2 border border-neutral-200 dark:border-neutral-850 rounded-lg">
              <span className="text-[8px] font-bold text-neutral-400 block uppercase mb-1">Username</span>
              <span className="font-extrabold text-neutral-900 dark:text-white select-all">admin</span>
            </div>
            <div className="bg-white dark:bg-neutral-950/80 p-2 border border-neutral-200 dark:border-neutral-850 rounded-lg">
              <span className="text-[8px] font-bold text-neutral-450 block uppercase mb-1">Access Pass</span>
              <span className="font-extrabold text-neutral-905 dark:text-white select-all">olayo-admin-2026</span>
            </div>
          </div>
        </div>

        {/* Error Alert details */}
        {errorMsg && (
          <div className="flex items-start gap-2.5 p-3.5 bg-rose-500/10 border border-rose-500/25 rounded-2xl text-rose-600 dark:text-rose-450 text-[11px] mb-6 animate-shake">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span className="font-normal">{errorMsg}</span>
          </div>
        )}

        {/* Main form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* A. Username entry */}
          <div>
            <label className="block text-[10px] font-bold text-neutral-450 dark:text-neutral-550 uppercase tracking-wider mb-1.5">Administrative ID / User</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                placeholder="Manager alias or corporate login"
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl py-2.5 pl-10 pr-4 text-xs dark:text-white placeholder-neutral-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
              />
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* B. Password entry */}
          <div>
            <label className="block text-[10px] font-bold text-neutral-450 dark:text-neutral-550 uppercase tracking-wider mb-1.5">Secure Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                placeholder="••••••••••••••••"
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl py-2.5 pl-10 pr-10 text-xs dark:text-white placeholder-neutral-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3.5 top-3 text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-all cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Secure pipeline note */}
          <p className="text-[10px] text-neutral-450 leading-relaxed font-normal">
            Transactions and configuration changes are cryptographically bound to physical cash registers. Unsuccessful handshakes are instantly logged.
          </p>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5 shadow-md font-bold mt-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Initializing Core Handshake...</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Authenticate Credentials</span>
              </>
            )}
          </button>

        </form>

      </div>
    </section>
  );
}
