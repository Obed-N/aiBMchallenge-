import React, { useState } from "react";
import { motion } from "motion/react";
import { useExchangeRate } from "./CurrencyConverter";
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Award, 
  ArrowRight, 
  DollarSign, 
  HelpCircle,
  Percent,
  CheckCircle2,
  Calendar
} from "lucide-react";

interface ROICalculatorProps {
  theme: 'light' | 'dark';
}

export function InteractiveROICalculator({ theme }: ROICalculatorProps) {
  const isDark = theme === "dark";
  const { rate: exchangeRate } = useExchangeRate();

  // Inputs
  const [clientCount, setClientCount] = useState<number>(3);
  const [monthlyRetainer, setMonthlyRetainer] = useState<number>(100000); // Default 100k NGN
  const [activePackage, setActivePackage] = useState<string>("standard");

  // Core calculations
  const totalInvestment = 50000; // Entry fee ₦50,000
  const monthlyRevenue = clientCount * monthlyRetainer;
  const annualRevenue = monthlyRevenue * 12;
  const netProfitAnnual = annualRevenue - totalInvestment;
  const roiPercentage = ((annualRevenue / totalInvestment) * 100);
  
  // Dynamic breakeven (days to make back 50k NGN based on run-rate)
  const dailyIncome = monthlyRevenue / 30;
  const breakEvenDays = dailyIncome > 0 ? Math.ceil(totalInvestment / dailyIncome) : 0;

  // Preset package buttons to update inputs instantly
  const applyPreset = (preset: string) => {
    setActivePackage(preset);
    if (preset === "starter") {
      setClientCount(2);
      setMonthlyRetainer(75000);
    } else if (preset === "standard") {
      setClientCount(4);
      setMonthlyRetainer(120000);
    } else if (preset === "elite") {
      setClientCount(6);
      setMonthlyRetainer(200000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`glass-panel border-2 rounded-3xl p-6 sm:p-10 mb-16 relative overflow-hidden shadow-2xl ${
        isDark 
          ? "border-cyan-500/20 shadow-cyan-900/15" 
          : "border-amber-500/35 shadow-[0_15px_40px_rgba(234,179,8,0.2)]"
      }`}
    >
      {/* Dynamic top-right radial light bubble */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
        isDark ? "bg-cyan-500/5" : "bg-amber-400/10"
      }`} />

      {/* Calculator Header */}
      <div className="text-center mb-8 relative z-10">
        <span className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full ${
          isDark ? "bg-cyan-500/15 text-[#00E5FF]" : "bg-amber-500/12 text-amber-600"
        }`}>
          Interactive Financial Simulator
        </span>
        <h3 className={`text-xl sm:text-2xl font-black mt-3 tracking-tight ${
          isDark ? "text-white" : "text-slate-900"
        }`}>
          Sovereign Growth Calculator
        </h3>
        <p className={`text-xs mt-1.5 font-light max-w-md mx-auto ${
          isDark ? "text-gray-400" : "text-slate-500"
        }`}>
          Tweak and estimate your dynamic side-yield in real-time. Uncover your potential return compared against the ₦50,000 Challenge cost.
        </p>
      </div>

      {/* Preset Packages */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 relative z-10">
        {[
          { id: "starter", name: "Starter Sprint", desc: "2 clients @ ₦75k" },
          { id: "standard", name: "Standard Agency", desc: "4 clients @ ₦120k" },
          { id: "elite", name: "Sovereign Elite", desc: "6 clients @ ₦200k" },
        ].map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => applyPreset(pkg.id)}
            className={`px-4 py-2.5 rounded-xl border text-left transition-all duration-300 pointer-events-auto cursor-pointer ${
              activePackage === pkg.id
                ? isDark
                  ? "bg-[#00E5FF]/10 border-[#00E5FF]/40 text-white shadow-lg"
                  : "bg-amber-400/15 border-amber-500/50 text-slate-900 shadow-md"
                : isDark
                  ? "bg-slate-950/40 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                  : "bg-amber-500/5 border-amber-500/15 text-slate-550 hover:border-amber-500/30"
            }`}
          >
            <div className="text-xs font-bold leading-none">{pkg.name}</div>
            <div className="text-[10px] font-mono opacity-80 mt-1">{pkg.desc}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* INPUT PANEL: Left (Lg: col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Slider 1: Client Count */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isDark ? "bg-slate-950/40 border-white/5" : "bg-amber-500/5 border-amber-500/15"
          }`}>
            <div className="flex justify-between items-center mb-2.5">
              <span className={`text-xs font-semibold flex items-center gap-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                <Users className={`w-4 h-4 ${isDark ? "text-cyan-400" : "text-amber-500"}`} />
                Retainer Clients
              </span>
              <span className={`text-sm font-bold font-mono px-2.5 py-0.5 rounded-full ${
                isDark ? "bg-[#00E5FF]/10 text-[#00E5FF]" : "bg-amber-500/12 text-amber-600"
              }`}>
                {clientCount} Clients
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={clientCount}
              onChange={(e) => {
                setClientCount(Number(e.target.value));
                setActivePackage("");
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-orange-500 bg-slate-800/80"
              style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(234,179,8,0.12)"
              }}
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-mono">
              <span>1 Client</span>
              <span>8 Clients</span>
              <span>15 Clients</span>
            </div>
          </div>

          {/* Slider 2: Retainer Amount */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isDark ? "bg-slate-950/40 border-white/5" : "bg-amber-500/5 border-amber-500/15"
          }`}>
            <div className="flex justify-between items-center mb-2.5">
              <span className={`text-xs font-semibold flex items-center gap-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                <Briefcase className={`w-4 h-4 ${isDark ? "text-cyan-400" : "text-amber-500"}`} />
                Monthly Value per Client
              </span>
              <span className={`text-sm font-bold font-mono px-2.5 py-0.5 rounded-full ${
                isDark ? "bg-[#00E5FF]/10 text-[#00E5FF]" : "bg-amber-500/12 text-amber-600"
              }`}>
                ₦{monthlyRetainer.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="30000"
              max="400000"
              step="5000"
              value={monthlyRetainer}
              onChange={(e) => {
                setMonthlyRetainer(Number(e.target.value));
                setActivePackage("");
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-orange-500 bg-slate-800/80"
              style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(234,179,8,0.12)"
              }}
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-mono">
              <span>₦30k / client</span>
              <span>₦215k / client</span>
              <span>₦400k / client</span>
            </div>
          </div>

          {/* Bullet proofs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-start gap-2 text-xs font-light text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className={isDark ? "text-gray-400" : "text-slate-600"}>Bypass server setup costs completely</span>
            </div>
            <div className="flex items-start gap-2 text-xs font-light text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className={isDark ? "text-gray-400" : "text-slate-600"}>Sovereign assets leverage 100% free AI tools</span>
            </div>
          </div>

        </div>

        {/* OUTPUT STATISTICS PANEL: Right (Lg: col-span-5) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Main big box */}
          <div className={`p-6 rounded-2xl border text-center relative overflow-hidden transition-all ${
            isDark 
              ? "bg-[#070b19] border-cyan-500/30" 
              : "bg-amber-500/12 border-amber-400/40"
          }`}>
            <span className={`text-[9px] uppercase font-mono font-black tracking-widest px-2.5 py-1.5 rounded ${
              isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-500/12 text-emerald-600"
            }`}>
              Projected ROI Return
            </span>

            {/* Huge Yield Display */}
            <div className="mt-4 mb-4">
              <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Estimated Monthly Harvest
              </p>
              <h4 className={`text-2xl sm:text-3xl font-black font-mono tracking-tight flex items-center justify-center gap-1.5 ${
                isDark ? "text-emerald-400" : "text-emerald-600"
              }`}>
                ₦{monthlyRevenue.toLocaleString()}
                <span className={`text-xs font-light font-sans ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  / month
                </span>
              </h4>
              <p className="text-[10px] font-mono text-[#00E5FF] mt-1.5 font-bold">
                (~ ${(monthlyRevenue / exchangeRate).toFixed(2)} USD)
              </p>
            </div>

            {/* Split KPIs */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="text-center">
                <p className={`text-[10px] uppercase font-mono ${isDark ? "text-gray-500" : "text-slate-500"}`}>Annual Run-Rate</p>
                <p className={`text-sm font-extrabold font-mono mt-0.5 ${isDark ? "text-white" : "text-slate-900"}`}>
                  ₦{annualRevenue.toLocaleString()}
                </p>
                <p className="text-[9px] text-[#00E5FF] font-mono font-medium">
                  (${(annualRevenue / exchangeRate).toFixed(0)} USD)
                </p>
              </div>
              <div className="text-center border-l border-white/5">
                <p className={`text-[10px] uppercase font-mono ${isDark ? "text-gray-500" : "text-slate-500"}`}>Calculated ROI</p>
                <p className="text-sm font-extrabold text-orange-400 font-mono mt-0.5 animate-pulse-subtle">
                  +{roiPercentage.toLocaleString()}%
                </p>
                <p className={`text-[9px] font-light ${isDark ? "text-gray-400" : "text-slate-550"}`}>on ₦50k budget</p>
              </div>
            </div>

          </div>

          {/* Break even estimation card */}
          <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
            isDark ? "bg-slate-950/60 border-white/5" : "bg-amber-400/10 border-amber-300/30"
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? "bg-orange-500/10 text-orange-400" : "bg-orange-500/15 text-orange-600"}`}>
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-800"}`}>Break-Even Duration</p>
                <p className={`text-[10px] font-light ${isDark ? "text-gray-400" : "text-slate-600"}`}>Recoup the ₦50,000 Challenge cost</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black font-mono text-orange-400">
                {breakEvenDays === 0 ? "No Revenue" : `${breakEvenDays} Days`}
              </p>
              <p className="text-[8px] font-mono text-emerald-400 font-medium">Instant Yield</p>
            </div>
          </div>

        </div>
      </div>

    </motion.div>
  );
}
