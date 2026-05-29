import React, { useEffect, useState, useRef } from "react";

interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
  classNameFallback?: string;
  fallbackId?: "bonus-1" | "bonus-2" | "bonus-3";
}

export function TransparentImage({ src, alt, className = "", classNameFallback = "", fallbackId }: TransparentImageProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setHasFailed(false);

    let safetyTimeout: NodeJS.Timeout | null = null;

    // Safety timeout: if image stays stuck loading for more than 3.5 seconds,
    // gracefully fall back to displaying the original image directly.
    safetyTimeout = setTimeout(() => {
      if (!isMounted) return;
      console.warn("Safety timeout of 3.5s reached/triggered for TransparentImage, falling back to original:", src);
      setProcessedSrc(src);
      setIsLoading(false);
    }, 3500);

    const clearTimeouts = () => {
      if (safetyTimeout) {
        clearTimeout(safetyTimeout);
        safetyTimeout = null;
      }
    };

    const img = new Image();
    // Allow cross-origin canvas reading for imgbb URLs
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (!isMounted) return;
      clearTimeouts();

      try {
        // Create an offscreen canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setProcessedSrc(src);
          setIsLoading(false);
          return;
        }

        // Set dimensions to original image natural dimensions to preserve 100% high-res quality
        const nativeWidth = img.naturalWidth || img.width || 800;
        const nativeHeight = img.naturalHeight || img.height || 600;
        canvas.width = nativeWidth;
        canvas.height = nativeHeight;

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, nativeWidth, nativeHeight);

        const imageData = ctx.getImageData(0, 0, nativeWidth, nativeHeight);
        const data = imageData.data;

        // Optimized safe thresholds to prevent any mockup erosion while cleanly removing dark corners
        const thresholdLow = 5;
        const thresholdHigh = 15;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // If pixel is extremely close to pure black, make it completely or partially transparent
          if (r < thresholdHigh && g < thresholdHigh && b < thresholdHigh) {
            const maxVal = Math.max(r, g, b);
            if (maxVal < thresholdLow) {
              data[i + 3] = 0; // Pure transparent
            } else {
              // Smooth gradient alpha transition to avoid jagged edges
              const ratio = (maxVal - thresholdLow) / (thresholdHigh - thresholdLow);
              data[i + 3] = Math.min(data[i + 3], Math.round(ratio * 255));
            }
          }
        }

        // Write processed data back to canvas
        ctx.putImageData(imageData, 0, 0);

        // Convert canvas output to data URL
        const dataUrl = canvas.toDataURL("image/png");
        setProcessedSrc(dataUrl);
      } catch (err) {
        console.warn("CORS/Canvas error in TransparentImage, falling back to normal render:", err);
        setProcessedSrc(src);
      } finally {
        setIsLoading(false);
      }
    };

    img.onerror = () => {
      if (!isMounted) return;
      if (img.crossOrigin === "anonymous") {
        console.warn("CORS/anonymous load failed for:", src, " - retrying without crossOrigin.");
        const retryImg = new Image();
        retryImg.src = src;
        retryImg.onload = () => {
          if (!isMounted) return;
          clearTimeouts();
          console.log("CORS retry succeeded, rendering original image: ", src);
          setProcessedSrc(src);
          setHasFailed(false);
          setIsLoading(false);
        };
        retryImg.onerror = () => {
          if (!isMounted) return;
          clearTimeouts();
          console.error("CORS retry failed, rendering original image URL in DOM <img> tag:", src);
          setHasFailed(false); // Let DOM image load try to render it first; only fallback if actual <img> onError triggers.
          setProcessedSrc(src);
          setIsLoading(false);
        };
      } else {
        clearTimeouts();
        console.warn("Image load error direct background fetch failed for:", src);
        setHasFailed(false); // Let DOM image load try to render it first; only fallback if actual <img> onError triggers.
        setProcessedSrc(src);
        setIsLoading(false);
      }
    };

    return () => {
      isMounted = false;
      clearTimeouts();
    };
  }, [src]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-8 h-8 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
      </div>
    );
  }

  // If loading failed (e.g. 404, DNS error, CDN expiry) and we have a fallback mockup ID
  if ((hasFailed || !processedSrc) && fallbackId) {
    if (fallbackId === "bonus-1") {
      return (
        <div className={`relative flex items-center justify-center w-full h-full max-h-[250px] min-h-[170px] ${className}`}>
          {/* Beautiful interactive smartphone mock */}
          <div className="w-full max-w-[190px] h-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/40 shadow-2xl p-2.5 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
            {/* Notch */}
            <div className="w-12 h-2.5 bg-slate-800 rounded-full mx-auto mb-1.5 flex items-center justify-center gap-1 shrink-0">
              <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
            </div>

            {/* Screen Viewport */}
            <div className="flex-1 rounded-xl bg-slate-950 border border-white/5 p-2 flex flex-col justify-between overflow-hidden text-left relative">
              <div className="h-3 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center px-1.5 justify-between">
                <span className="text-[5px] font-mono text-cyan-400 font-bold">100% FREE FUNNEL</span>
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
              </div>

              {/* Stack items */}
              <div className="space-y-1 flex-1 py-1">
                <div className="h-[22px] rounded bg-slate-900/40 border border-white/5 p-1 flex items-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-gradient-to-tr from-cyan-500 to-blue-500 text-white font-mono text-[7px] font-bold flex items-center justify-center shrink-0">A</div>
                  <div className="space-y-0.5 flex-1">
                    <div className="w-8 h-1 bg-gray-200 rounded" />
                    <div className="w-12 h-0.5 bg-gray-500 rounded" />
                  </div>
                </div>
                <div className="h-[22px] rounded bg-slate-900/40 border border-white/5 p-1 flex items-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-mono text-[7px] font-bold flex items-center justify-center shrink-0">B</div>
                  <div className="space-y-0.5 flex-1">
                    <div className="w-10 h-1 bg-gray-200 rounded" />
                    <div className="w-6 h-0.5 bg-gray-500 rounded" />
                  </div>
                </div>
                <div className="h-[22px] rounded bg-slate-900/40 border border-white/5 p-1 flex items-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-gradient-to-tr from-orange-400 to-yellow-500 text-white font-mono text-[7px] font-bold flex items-center justify-center shrink-0">C</div>
                  <div className="space-y-0.5 flex-1">
                    <div className="w-7 h-1 bg-gray-200 rounded" />
                    <div className="w-9 h-0.5 bg-gray-500 rounded" />
                  </div>
                </div>
              </div>

              {/* Swipable action bar */}
              <div className="h-4.5 rounded bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center border border-orange-500/20 shadow shadow-orange-500/20 shrink-0">
                <span className="text-[5px] font-mono font-bold text-white tracking-widest animate-pulse">SWIPE & LOAD</span>
              </div>
            </div>

            {/* Sub-label banner */}
            <div className="mt-1.5 flex flex-col items-center shrink-0">
              <span className="text-[8px] font-mono font-bold text-cyan-400 uppercase tracking-wider">SMART FUNNELS</span>
              <span className="text-[6px] text-gray-400 font-light font-mono">Tap To Configure</span>
            </div>
          </div>
        </div>
      );
    }

    if (fallbackId === "bonus-2") {
      return (
        <div className={`relative flex items-center justify-center w-full h-full max-h-[250px] min-h-[170px] ${className}`}>
          {/* File Folder / Prompts Vault mockup */}
          <div className="w-full max-w-[190px] h-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 shadow-2xl p-2.5 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
            {/* Folder tab indicator */}
            <div className="absolute top-0 left-3.5 w-10 h-3 bg-amber-500/20 border-t border-x border-amber-500/30 rounded-t text-[6px] text-amber-300 font-mono text-center flex items-center justify-center font-bold">
              VAULT.DB
            </div>

            {/* Inner catalog viewport */}
            <div className="flex-1 mt-1.5 rounded-xl bg-slate-950 border border-white/5 p-2 flex flex-col justify-between overflow-hidden text-left">
              {/* Directory search header */}
              <div className="h-3 rounded bg-slate-900 border border-white/10 px-1 px-1.5 flex items-center gap-1 justify-between shrink-0">
                <div className="flex items-center gap-0.5">
                  <div className="w-1 h-1 bg-amber-400 rounded-full" />
                  <span className="text-[4.5px] font-mono text-gray-400">Search 1,200+ local prompts...</span>
                </div>
                <span className="text-[4.5px] font-mono text-amber-400 font-bold">Active</span>
              </div>

              {/* Prompt template entries */}
              <div className="space-y-1 flex-1 py-1">
                <div className="p-1 rounded bg-slate-900/30 border border-amber-500/10">
                  <div className="flex justify-between items-center text-[5px] font-mono font-bold text-amber-400">
                    <span>HOTEL BOOKING AGENT</span>
                    <span className="text-[5px] text-emerald-400 font-bold bg-emerald-500/10 px-0.5 rounded">₦₦₦</span>
                  </div>
                  <div className="w-full h-0.5 bg-gray-700 rounded mt-0.5" />
                  <div className="w-2/3 h-0.5 bg-gray-500 rounded mt-0.5" />
                </div>
                
                <div className="p-1 rounded bg-slate-900/30 border border-amber-500/10">
                  <div className="flex justify-between items-center text-[5px] font-mono font-bold text-amber-400">
                    <span>REAL ESTATE AUTOPILOT</span>
                    <span className="text-[5px] text-emerald-400 font-bold bg-emerald-500/10 px-0.5 rounded">₦₦₦</span>
                  </div>
                  <div className="w-2/3 h-0.5 bg-gray-700 rounded mt-0.5" />
                  <div className="w-1/2 h-0.5 bg-gray-500 rounded mt-0.5" />
                </div>

                <div className="p-1 rounded bg-slate-900/30 border border-amber-500/10">
                  <div className="flex justify-between items-center text-[5px] font-mono font-bold text-amber-400">
                    <span>LOGISTICS SCHEDULER</span>
                    <span className="text-[5px] text-emerald-400 font-bold bg-emerald-500/10 px-0.5 rounded">₦₦₦</span>
                  </div>
                  <div className="w-full h-0.5 bg-gray-700 rounded mt-0.5" />
                </div>
              </div>

              {/* Secure secure key sign */}
              <div className="h-3 rounded border border-amber-500/20 bg-amber-500/5 flex items-center justify-center shrink-0">
                <span className="text-[4.5px] font-mono text-amber-400 tracking-wider">🔒 CODES ACTIVATED & SECURED</span>
              </div>
            </div>

            {/* Labels under mockup */}
            <div className="mt-1.5 flex flex-col items-center shrink-0">
              <span className="text-[8px] font-mono font-bold text-amber-400 uppercase tracking-wider">PROMPT VAULT</span>
              <span className="text-[6px] text-gray-400 font-light font-mono">Daily Hot Directories</span>
            </div>
          </div>
        </div>
      );
    }

    if (fallbackId === "bonus-3") {
      return (
        <div className={`relative flex items-center justify-center w-full h-full max-h-[250px] min-h-[170px] ${className}`}>
          {/* Active Support Forum Chat Mockup */}
          <div className="w-full max-w-[190px] h-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-orange-500/40 shadow-2xl p-2.5 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-full blur-xl pointer-events-none" />
            
            {/* Header forum identifier */}
            <div className="h-5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-1.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[5px] font-mono text-emerald-400 font-bold">72H ELITE BOARD</span>
              </div>
              <span className="text-[4.5px] font-mono text-gray-400">Live (109 active)</span>
            </div>

            {/* Chat flow viewport */}
            <div className="flex-1 mt-1.5 rounded-xl bg-slate-950 border border-white/5 p-2 flex flex-col justify-end gap-1.5 overflow-hidden text-left">
              {/* Member A message */}
              <div className="self-start max-w-[85%] rounded bg-slate-900/65 border border-white/5 p-1 shrink-0">
                <div className="flex items-center gap-0.5 mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-[4.5px] font-mono font-bold text-blue-300">Chinedu O.</span>
                </div>
                <p className="text-[4.5px] text-gray-300 leading-tight">Just closed my 1st agency automation client! Recieved ₦120,000 upfront! 🙏</p>
              </div>

              {/* Coach Response back */}
              <div className="self-end max-w-[85%] rounded bg-emerald-500/10 border border-emerald-500/20 p-1 shrink-0">
                <div className="flex items-center gap-0.5 justify-end mb-0.5">
                  <span className="text-[4.5px] font-mono font-bold text-emerald-400">Coach</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[4.5px] text-gray-300 text-right leading-tight">Fantastic work! Drop proposal to workspace for review on Zoom tonight!</p>
              </div>
            </div>

            {/* Labels */}
            <div className="mt-1.5 flex flex-col items-center shrink-0">
              <span className="text-[8px] font-mono font-bold text-[#FF6D00] uppercase tracking-wider">ELITE SUPPORT</span>
              <span className="text-[6px] text-gray-400 font-light font-mono">24/7 WhatsApp Group</span>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <img
      src={processedSrc || src}
      alt={alt}
      className={`${className} ${!processedSrc ? classNameFallback : ""}`}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => {
        console.warn("Image load error caught inside DOM handler for:", src);
        setHasFailed(true);
      }}
    />
  );
}

