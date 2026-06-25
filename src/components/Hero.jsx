import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles, BookOpen } from "lucide-react";
import { GorgaCicak, GorgaHeaderDecal, GorgaBorder } from "./GorgaOrnament";

export default function Hero() {
  const handleScrollToTree = () => {
    const element = document.getElementById("pohon");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToHistory = () => {
    const element = document.getElementById("sejarah");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#111111] px-6">
      
      {/* Background Grid Pattern (Ulos Accent) */}
      <div className="absolute inset-0 ulos-bg opacity-20 pointer-events-none z-0" />

      {/* Cinematic Fog/Light Effect */}
      <div className="smoke-overlay z-0" />

      {/* Glowing center orb representing Pusuk Buhit spiritual energy */}
      <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#8B0000]/10 filter blur-[80px] md:blur-[120px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none z-0" />

      {/* Main Content Card Container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8">
        
        {/* Gorga Cicak Header Decor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 0.95, scale: 1, y: 0 }}
          transition={{ duration: 1.5, type: "spring", damping: 15 }}
          className="relative mb-2"
        >
          <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-full filter blur-xl animate-pulse-slow" />
          <GorgaCicak size={160} className="animate-float" />
        </motion.div>

        {/* Traditional Batak Roof Decal Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <GorgaHeaderDecal />
        </motion.div>

        {/* Small Intro Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#8B0000]/40 text-xs text-[#D4AF37] font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(139,0,0,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
          <span>PORTAL HIKAYAT SILSILAH BATAK TOBA</span>
        </motion.div>

        {/* Giant Title */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-4xl sm:text-6xl md:text-8xl font-cinzel font-black tracking-wider text-white select-none leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
          >
            TAROMBO <span className="text-gradient-gold animate-glow">BATAK</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-sm sm:text-lg md:text-xl font-poppins text-zinc-400 font-light max-w-2xl mx-auto tracking-wide"
          >
            Jelajahi silsilah keturunan, relasi kekerabatan, dan narasi sejarah marga dari leluhur pertama Pusuk Buhit.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full pt-4"
        >
          
          {/* Main Button: Enter Family Tree */}
          <button
            onClick={handleScrollToTree}
            className="w-64 sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#b30000] hover:from-[#a30000] hover:to-[#d60000] text-white font-semibold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(139,0,0,0.5)] hover:shadow-[0_0_35px_rgba(139,0,0,0.8)] border border-red-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
            Pohon Silsilah Interaktif
          </button>

          {/* Secondary Button: Read History */}
          <button
            onClick={handleScrollToHistory}
            className="w-64 sm:w-auto px-8 py-4 rounded-xl bg-black/60 hover:bg-zinc-900 text-[#D4AF37] font-semibold text-sm tracking-wider uppercase border border-zinc-800 hover:border-[#D4AF37]/50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            Lini Masa & Sejarah
          </button>

        </motion.div>
      </div>

      {/* Repeating Gorga border at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <GorgaBorder height={16} />
      </div>
    </section>
  );
}
