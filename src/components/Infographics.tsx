import React from "react";
import { Smartphone, ShieldAlert, TrendingDown, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";

interface InfographicProps {
  theme: 'dark' | 'light';
}

export function StruggleInfographic({ theme }: InfographicProps) {
  const isDark = theme === "dark";

  return (
    <div className={`border rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-white/5 shadow-2xl" 
        : "bg-white border-amber-200 shadow-[0_10px_30px_rgba(234,179,8,0.08)]"
    }`}>
      {/* Decorative radial glows */}
      <div className={`absolute -top-12 -left-12 w-40 h-40 rounded-full blur-3xl pointer-events-none ${
        isDark ? "bg-red-500/10" : "bg-red-400/15"
      }`} />
      <div className={`absolute -bottom-12 -right-12 w-45 h-45 rounded-full blur-3xl pointer-events-none ${
        isDark ? "bg-amber-600/5" : "bg-amber-400/10"
      }`} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* LEFT COMPONENT: GRAPHIC DISPLAY */}
        <div className="flex justify-center relative">
          <div className="w-full max-w-[280px] aspect-[4/3] rounded-xl relative p-4 flex flex-col justify-between border overflow-hidden min-h-[190px] select-none transition-transform duration-500 hover:scale-[1.02] bg-slate-950/70 border-white/10 shadow-lg">
            
            {/* Background elements */}
            <div className="absolute inset-0 bg-radial-gradient-dark pointer-events-none opacity-45" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-red-400 bg-red-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-red-400" /> Economic Leak
                </span>
                <span className="text-[9px] font-mono text-gray-500">Sub-Saharan Reality</span>
              </div>
              
              <p className="text-[10px] font-mono text-gray-400 mb-1">GRADUATE STARTING BASE</p>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-xl font-extrabold text-red-400 font-mono">₦45,000</span>
                <span className="text-[9px] text-gray-400">/ monthly salary</span>
              </div>

              {/* Progress bar leaking out */}
              <div className="w-full h-3 rounded-full bg-slate-800 border border-white/5 relative overflow-hidden mb-3">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full animate-pulse" style={{ width: "15%" }} />
                {/* Draining indicator line */}
                <div className="absolute top-0 right-0 h-full bg-slate-900/90 flex items-center justify-end px-1" style={{ width: "85%" }}>
                  <span className="text-[7px] text-red-400 font-mono font-bold tracking-widest leading-none">-85% DRAINED BY LOGISTICS</span>
                </div>
              </div>
            </div>

            {/* Draining details list */}
            <div className="space-y-1 relative z-10 pb-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                <span className="flex items-center gap-1"><TrendingDown className="w-3 h-3 text-red-500" /> Transport commute</span>
                <span className="text-red-400 font-semibold">-₦25,000</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                <span className="flex items-center gap-1"><TrendingDown className="w-3 h-3 text-red-500" /> Feeding bundles</span>
                <span className="text-red-400 font-semibold">-₦12,000</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/5 pt-1 mt-1 text-gray-305 font-bold">
                <span>Leftover Savings</span>
                <span className="text-amber-500">₦8,000</span>
              </div>
            </div>
            
          </div>
        </div>

        {/* RIGHT COMPONENT: CORE TEXT EXPLANATION */}
        <div className="space-y-3">
          <h4 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"} tracking-tight`}>
            The Visceral Underemployment Vortex
          </h4>
          <p className={`text-xs ${isDark ? "text-gray-300" : "text-slate-600"} leading-relaxed font-light`}>
            Traditional white-collar streams consume your dynamic vitality. Nearly <strong className="text-red-500">85% of standard starter salaries</strong> vanish directly back into transportation grids and daily internet bundles before the first business cycle has finished, leaving zero growth cash.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className={`text-[10px] font-mono uppercase bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-bold`}>
              High Friction
            </span>
            <span className={`text-[10px] font-mono uppercase bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded font-bold`}>
              Laptop Overhype
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LaunchInfographic({ theme }: InfographicProps) {
  const isDark = theme === "dark";

  return (
    <div className={`border rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-white/5 shadow-2xl" 
        : "bg-white border-amber-200 shadow-[0_10px_30px_rgba(234,179,8,0.08)]"
    }`}>
      {/* Decorative radial glows */}
      <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none ${
        isDark ? "bg-cyan-500/10" : "bg-cyan-400/15"
      }`} />
      <div className={`absolute -bottom-12 -left-12 w-45 h-45 rounded-full blur-3xl pointer-events-none ${
        isDark ? "bg-emerald-600/5" : "bg-emerald-400/10"
      }`} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* LEFT COMPONENT: GRAPHIC DISPLAY */}
        <div className="flex justify-center relative">
          <div className="w-full max-w-[280px] aspect-[4/3] rounded-xl relative p-4 flex flex-col justify-between border overflow-hidden min-h-[190px] select-none transition-transform duration-500 hover:scale-[1.02] bg-slate-950/70 border-white/10 shadow-lg">
            
            {/* Background elements */}
            <div className="absolute inset-0 bg-radial-gradient-dark pointer-events-none opacity-45" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#00E5FF] bg-cyan-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#00E5FF]" /> Rapid Formula
                </span>
                <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/15 px-1.5 py-0.5 rounded">
                  72-Hours Sprint
                </span>
              </div>
              
              <p className="text-[10px] font-mono text-gray-400 mb-1">SMARTPHONE PORTAL FUNNEL</p>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-xl font-extrabold text-emerald-400 font-mono">100% Free AI</span>
                <span className="text-[9px] text-gray-400">Zero overhead setup</span>
              </div>

              {/* Progress bar loading */}
              <div className="w-full h-3 rounded-full bg-slate-800 border border-white/5 relative overflow-hidden mb-3">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full" style={{ width: "100%" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8px] text-white font-mono font-bold uppercase tracking-widest leading-none">LAUNCH READY</span>
                </div>
              </div>
            </div>

            {/* Stages overview */}
            <div className="space-y-1 relative z-10">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-cyan-300">
                <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>Day 1: High-Ticket Offer Extracted</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-cyan-300">
                <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>Day 2: Two-click Layout Loaded</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-300 font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Day 3: Organic Launches Triggered</span>
              </div>
            </div>
            
          </div>
        </div>

        {/* RIGHT COMPONENT: CORE TEXT EXPLANATION */}
        <div className="space-y-3">
          <h4 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"} tracking-tight`}>
            The AI Smartphone Revolution
          </h4>
          <p className={`text-xs ${isDark ? "text-gray-300" : "text-slate-600"} leading-relaxed font-light`}>
            Deploying a mobile asset shouldn't require complex laptop architectures or costly database configurations. By using <strong className="text-emerald-400 font-semibold">100% free AI tools</strong>, you build custom solutions straight from your phone, complete with payment capabilities, loaded within an hour.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className={`text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold`}>
              No Laptop Required
            </span>
            <span className={`text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded font-bold`}>
              2-Click Import
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
