import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Users, Award, BookOpen, Heart, Landmark } from "lucide-react";
import { GorgaCicak, GorgaBorder } from "./GorgaOrnament";

export default function MemberModal({ isOpen, member, onClose }) {
  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Panel Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="relative w-full max-w-lg md:max-w-xl h-full glass-panel-gold border-l border-[#D4AF37]/30 shadow-[0_0_50px_rgba(139,0,0,0.35)] flex flex-col z-10"
          >
            
            {/* Repeating Gorga Border Top */}
            <GorgaBorder height={12} className="opacity-80" />

            {/* Header Area */}
            <div className="p-6 pb-4 flex items-start justify-between border-b border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#8B0000]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-semibold text-lg">
                    G{member.generation}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-zinc-900 border border-[#8B0000] rounded-full flex items-center justify-center text-[8px] text-white">
                    ★
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-cinzel font-bold text-white tracking-wide">
                    {member.name}
                  </h2>
                  <p className="text-xs text-[#D4AF37] tracking-widest uppercase font-poppins mt-0.5">
                    {member.title}
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#8B0000] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Gorga Cicak Watermark background inside profile */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none">
                <GorgaCicak size={450} />
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3 relative z-10">
                <div className="bg-black/40 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-[#8B0000]/15 text-[#8B0000] shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Generasi</span>
                    <span className="text-xs sm:text-sm font-medium text-white block truncate">Ke-{member.generation}</span>
                  </div>
                </div>

                <div className="bg-black/40 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Asal / Huta</span>
                    <span className="text-xs sm:text-sm font-medium text-white block truncate" title={member.origin || "Toba"}>
                      {member.origin || "Toba"}
                    </span>
                  </div>
                </div>

                <div className="bg-black/40 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-3 col-span-2 min-w-0">
                  <div className="p-2 rounded-lg bg-pink-500/15 text-pink-400 shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Istri / Pasangan</span>
                    <span className="text-xs sm:text-sm font-medium text-white block break-words">
                      {member.spouse || "Tidak Terdaftar / Misteri Adat"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Biography Section */}
              <div className="space-y-2 relative z-10">
                <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold font-poppins flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Hikayat & Sejarah
                </h3>
                <div className="bg-black/30 border border-zinc-800/60 rounded-xl p-4 text-zinc-300 text-sm leading-relaxed font-light">
                  {member.bio || "Informasi tertulis mengenai riwayat tokoh silsilah ini belum tercatat lengkap dalam manuskrip Tarombo utama. Kisah hidupnya diturunkan secara lisan (turi-turian) dari generasi ke generasi."}
                </div>
              </div>

              {/* Children List */}
              {member.children && member.children.length > 0 && (
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold font-poppins flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> Keturunan Langsung ({member.children.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {member.children.map((child) => (
                      <div
                        key={child.id}
                        className="p-3 bg-zinc-950/60 border border-zinc-850 rounded-lg flex items-center justify-between hover:border-[#8B0000]/60 hover:bg-black/50 transition duration-300 min-w-0 gap-3"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-semibold text-white block truncate">{child.name}</span>
                          <span className="text-[10px] text-zinc-500 block truncate" title={child.title || `Generasi ke-${child.generation}`}>
                            {child.title || `Generasi ke-${child.generation}`}
                          </span>
                        </div>
                        <span className="text-[10px] bg-[#8B0000]/25 text-red-300 px-1.5 py-0.5 rounded border border-[#8B0000]/40 shrink-0">
                          G{child.generation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Descendant Clans (Margas) Section */}
              {member.margas && member.margas.length > 0 && (
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold font-poppins flex items-center gap-1.5">
                    <Landmark className="w-4 h-4" /> Marga Pemegang Keturunan (Pinompar)
                  </h3>
                  <p className="text-[11px] text-zinc-500 leading-normal mb-2">
                    Silsilah ini bercabang dan menurunkan sub-marga yang diakui secara sah dalam tatanan adat Dalihan Na Tolu:
                  </p>
                  <div className="space-y-2.5">
                    {member.margas.map((margaString, idx) => {
                      const splitParts = margaString.split("(");
                      const primaryMarga = splitParts[0].trim();
                      const subMargas = splitParts[1] ? splitParts[1].replace(")", "") : "";

                      return (
                        <div key={idx} className="p-3.5 bg-black/60 border border-[#8B0000]/20 rounded-xl relative overflow-hidden group shadow-[inset_0_0_10px_rgba(139,0,0,0.05)]">
                          {/* Soft golden left border accent */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] to-[#8B0000]" />
                          <div className="pl-2">
                            <span className="text-sm font-bold text-white tracking-wide block">
                              Marga {primaryMarga}
                            </span>
                            {subMargas && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {subMargas.split(",").map((sub, sidx) => (
                                  <span
                                    key={sidx}
                                    className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded hover:border-[#D4AF37]/50 transition cursor-default"
                                  >
                                    {sub.trim()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Footer Area with Gorga Motif Bottom */}
            <div className="p-4 border-t border-zinc-850 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span>TAROMBO DIGITAL SERIES</span>
              <span>© RAKYAT BATAK TOBA</span>
            </div>
            
            <GorgaBorder height={12} className="scale-y-[-1] opacity-80" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
