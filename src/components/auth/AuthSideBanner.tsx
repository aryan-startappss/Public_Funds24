import React from "react";

export default function AuthSideBanner() {
  return (
    <div className="w-full md:w-5/12 bg-primary p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden shrink-0 border-r border-slate-800">
      <div className="space-y-8 z-10 text-left">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-md">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="font-extrabold text-xl tracking-tight">Funds24</span>
        </div>

        <div className="space-y-4">
          <h3 className="text-3xl font-semibold tracking-tight leading-snug">
            Your Financial Journey Starts Here
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Access loans, insurance, and credit cards from 50+ trusted partners. Simple, transparent, and tailored to your needs.
          </p>
        </div>
      </div>

      {/* Bullet features */}
      <div className="space-y-3.5 z-10 py-6 border-t border-slate-800 text-left">
        {[
          "Quick approvals in 24-72 hours",
          "100% transparent comparisons",
          "Zero hidden fees or charges",
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-xs text-slate-300 font-semibold">
            <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              ✓
            </div>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Grid Pattern overlay for premium aesthetics */}
      <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none">
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-white"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
