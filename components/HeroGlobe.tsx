"use client";

import React, { useEffect, useRef, useState } from "react";
import createGlobe, { type Globe } from "cobe";
import { motion } from "motion/react";
import Image from "next/image";
import { Globe as GlobeIcon, MapPin, Sparkles } from "lucide-react";

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let animId: number;
    let globe: Globe | null = null;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth;
        if (globe && width > 0) {
          globe.update({
            width: width * 2,
            height: width * 2,
          });
        }
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const initialSize = width * 2 || 800;

    globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: initialSize,
      height: initialSize,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      mapBaseBrightness: 0.05,
      baseColor: [0.08, 0.32, 0.18],
      markerColor: [0.85, 0.94, 0.4],
      glowColor: [0.08, 0.45, 0.25],
      opacity: 0.95,
      markers: [
        // Malawi (Core Mission Hub)
        { location: [-13.9626, 33.7741], size: 0.12, color: [0.92, 0.96, 0.5] },
        // Global outreach & partner hubs
        { location: [38.9072, -77.0369], size: 0.06, color: [0.3, 0.85, 0.5] }, // USA
        { location: [51.5074, -0.1278], size: 0.06, color: [0.3, 0.85, 0.5] },  // UK
        { location: [-1.2921, 36.8219], size: 0.07, color: [0.9, 0.6, 0.3] },   // Kenya
        { location: [-26.2041, 28.0473], size: 0.07, color: [0.9, 0.6, 0.3] }, // South Africa
        { location: [28.6139, 77.209], size: 0.05, color: [0.3, 0.85, 0.5] },   // India
        { location: [-33.8688, 151.2093], size: 0.05, color: [0.3, 0.85, 0.5] },// Australia
        { location: [-15.7975, -47.8919], size: 0.05, color: [0.3, 0.85, 0.5] },// Brazil
      ],
      arcs: [
        { from: [38.9072, -77.0369], to: [-13.9626, 33.7741], color: [0.85, 0.94, 0.4] },
        { from: [51.5074, -0.1278], to: [-13.9626, 33.7741], color: [0.3, 0.85, 0.5] },
        { from: [-1.2921, 36.8219], to: [-13.9626, 33.7741], color: [0.85, 0.94, 0.4] },
        { from: [-26.2041, 28.0473], to: [-13.9626, 33.7741], color: [0.3, 0.85, 0.5] },
        { from: [-33.8688, 151.2093], to: [-13.9626, 33.7741], color: [0.85, 0.94, 0.4] },
      ],
      arcColor: [0.4, 0.8, 0.5],
      arcWidth: 0.8,
      arcHeight: 0.35,
    });

    const animate = () => {
      if (!pointerInteracting.current) {
        phi += 0.0035;
      }
      globe?.update({ phi: phi + r });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100);

    return () => {
      cancelAnimationFrame(animId);
      globe?.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [r]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-visible select-none">
      {/* Ambient background glow & radial gradient */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-radial from-brand-green/25 via-brand-forest/40 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-radial from-brand-lime/10 via-transparent to-transparent blur-2xl" />

      {/* Floating Mission Badge Top Left */}
   

      {/* Floating Impact Card Bottom Right with photo snippet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        whileHover={{ scale: 1.03 }}
        className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6 z-20 flex items-center gap-3 rounded-2xl border border-white/25 bg-brand-forest/90 p-2.5 sm:p-3 shadow-2xl backdrop-blur-md max-w-[280px]"
      >
       
      </motion.div>

      {/* 3D WebGL Canvas Globe */}
      <div className="relative aspect-square w-full max-w-[min(340px,calc(100vw-36px))] sm:max-w-[560px] lg:max-w-[680px]">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            canvasRef.current && (canvasRef.current.style.cursor = "grabbing");
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            canvasRef.current && (canvasRef.current.style.cursor = "grab");
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            canvasRef.current && (canvasRef.current.style.cursor = "grab");
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              setR(delta / 200);
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              setR(delta / 200);
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            contain: "layout paint size",
            opacity: 0,
            transition: "opacity 1s ease",
            cursor: "grab",
          }}
        />
      </div>
    </div>
  );
}
