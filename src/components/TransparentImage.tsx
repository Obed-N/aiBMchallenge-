import React, { useEffect, useState, useRef } from "react";

interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
  classNameFallback?: string;
}

export function TransparentImage({ src, alt, className = "", classNameFallback = "" }: TransparentImageProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const img = new Image();
    // Allow cross-origin canvas reading for imgbb URLs
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (!isMounted) return;

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
      setProcessedSrc(src);
      setIsLoading(false);
    };

    return () => {
      isMounted = false;
    };
  }, [src]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-8 h-8 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <img
      src={processedSrc || src}
      alt={alt}
      className={`${className} ${!processedSrc ? classNameFallback : ""}`}
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  );
}
