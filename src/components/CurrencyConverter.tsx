import React, { useEffect, useState } from "react";
import { RefreshCw, DollarSign, Globe } from "lucide-react";

// Standard fallback: 1 USD = 1485 NGN (typical Nigerian merchant gateway rate)
const FALLBACK_RATE = 1485;

export interface ExchangeRateData {
  rate: number; // NGN per USD
  isLive: boolean;
  lastUpdated: string;
}

export function useExchangeRate() {
  const [rateData, setRateData] = useState<ExchangeRateData>({
    rate: FALLBACK_RATE,
    isLive: false,
    lastUpdated: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    let active = true;

    async function fetchRate() {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) throw new Error("API failed");
        
        const data = await response.json();
        if (data && data.rates && data.rates.NGN) {
          const ngnRate = data.rates.NGN;
          if (active) {
            setRateData({
              rate: ngnRate,
              isLive: true,
              lastUpdated: new Date().toLocaleTimeString(),
            });
          }
        }
      } catch (err) {
        console.warn("Failed to fetch live exchange rate, using default gateway fallback:", err);
      }
    }

    fetchRate();

    // Automatically check/update rate every 2 minutes (invisible 24/7 background worker)
    const interval = setInterval(fetchRate, 120000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return rateData;
}

interface NairaToUSDProps {
  naira: number;
  className?: string;
  showNaira?: boolean;
}

export function NairaToUSD({ naira, className = "", showNaira = true }: NairaToUSDProps) {
  const { rate, isLive, lastUpdated } = useExchangeRate();
  const usdAmount = naira / rate;

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      {showNaira && <span>₦{naira.toLocaleString()}</span>}
      <span className="text-emerald-400 font-semibold tracking-wide flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full text-[11px] sm:text-[12px] border border-emerald-500/10 shadow-sm animate-pulse-subtle">
        <DollarSign className="w-3 h-3 text-emerald-400 -mr-0.5 shrink-0" />
        {usdAmount.toFixed(2)} USD
      </span>
    </span>
  );
}

// Compact invisible indicator/status pill for currency parity assurance
export function LiveConverterStatus() {
  const { rate, isLive, lastUpdated } = useExchangeRate();
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 border border-white/5 shadow-inner text-[10px] font-mono text-gray-400 shrink-0 select-none">
      <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
      <span>24/7 Gateway: </span>
      <span className="text-[#00E5FF] font-bold">1 USD = ₦{rate.toFixed(2)}</span>
      {isLive ? (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-0.5" title="Live connection active" />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" title="Offline fallback active" />
      )}
    </div>
  );
}
