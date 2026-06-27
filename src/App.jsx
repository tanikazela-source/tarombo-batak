import React, { useState } from "react";
import Hero from "./components/Hero";
import FamilyTree from "./components/FamilyTree";
import MemberModal from "./components/MemberModal";
import Timeline from "./components/Timeline";
import PartuturanCalculator from "./components/PartuturanCalculator";
import ParticlesBg from "./components/ParticlesBg";
import BatakAudio from "./components/BatakAudio";
import { GorgaBorder, GorgaCicak } from "./components/GorgaOrnament";
import { Landmark, Users, Compass, Globe } from "lucide-react";

export default function App() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#111111] text-white flex flex-col font-poppins selection:bg-[#8B0000] selection:text-white overflow-x-hidden">
      
      {/* 1. Global Floating Particle Canvas Background */}
      <ParticlesBg />

      {/* 2. Floating Ambient Music Synthesizer Widget (Fixed Bottom-Right for easy access) */}
      <div className="fixed bottom-6 right-6 z-40 max-w-[calc(100vw-32px)]">
        <BatakAudio />
      </div>

      {/* 3. Hero Section (Landing) */}
      <Hero />

      {/* 4. Family Tree Section (Interactive Dashboard) */}
      <div className="relative z-10 w-full">
        <FamilyTree onSelectMember={handleSelectMember} />
      </div>

      {/* 4.5. Batak Kinship (Partuturan) Calculator */}
      <div className="relative z-10 w-full">
        <PartuturanCalculator />
      </div>

      {/* 5. Historical Narrative Timeline */}
      <Timeline />

      {/* 6. Profile Details Sliding Drawer */}
      <MemberModal
        isOpen={isModalOpen}
        member={selectedMember}
        onClose={handleCloseModal}
      />

      {/* 7. Premium Traditional Footer */}
      <footer className="relative bg-zinc-950 border-t border-[#8B0000]/30 py-16 px-6 overflow-hidden">
        
        {/* Gorga Watermark Background - Boraspati (Cicak Batak) */}
        <div className="absolute bottom-[-90px] right-[-90px] opacity-[0.03] rotate-[-35deg] pointer-events-none">
          <GorgaCicak size={450} />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          
          {/* Col 1: About Tarombo Batak */}
          <div className="space-y-4">
            <h3 className="text-xl font-cinzel font-black tracking-wide text-white flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#D4AF37]" />
              TAROMBO BATAK TOBA
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Sebuah platform digital pelestarian warisan budaya dan silsilah suku Batak Toba. Dirancang secara modern untuk mempermudah generasi muda memahami garis keturunan mereka langsung dari leluhur spiritual Pusuk Buhit.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#D4AF37] font-cinzel font-bold text-sm tracking-widest">
              <span>HORAS!</span>
              <span>•</span>
              <span>MEJUAH-JUAH!</span>
              <span>•</span>
              <span>JUAH-JUAH!</span>
            </div>
          </div>

          {/* Col 2: Dalihan Na Tolu values */}
          <div className="space-y-4">
            <h3 className="text-sm font-cinzel font-bold tracking-widest text-[#D4AF37] uppercase">
              Dalihan Na Tolu
            </h3>
            <ul className="space-y-2 text-xs font-light text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-[#8B0000] font-bold">1.</span>
                <span><strong>Somba Marhula-hula</strong>: Menghormati keluarga pihak istri / pemberi berkat kehidupan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B0000] font-bold">2.</span>
                <span><strong>Elek Marboru</strong>: Lemah lembut, mengayomi keluarga anak perempuan / penerima istri.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B0000] font-bold">3.</span>
                <span><strong>Manat Mardongan Tubu</strong>: Berhati-hati dan menjaga kerukunan dengan kerabat satu marga.</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Credits */}
          <div className="space-y-4">
            <h3 className="text-sm font-cinzel font-bold tracking-widest text-zinc-300 uppercase">
              Navigasi Halaman
            </h3>
            <div className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <a href="#" className="hover:text-[#D4AF37] transition font-medium flex items-center gap-1.5">
                • Kembali Ke Atas
              </a>
              <a href="#pohon" className="hover:text-[#D4AF37] transition font-medium flex items-center gap-1.5">
                • Board Silsilah Interaktif
              </a>
              <a href="#kalkulator" className="hover:text-[#D4AF37] transition font-medium flex items-center gap-1.5">
                • Kalkulator Partuturan Adat
              </a>
              <a href="#sejarah" className="hover:text-[#D4AF37] transition font-medium flex items-center gap-1.5">
                • Lini Masa Migrasi
              </a>
            </div>
            
            {/* Tech stack badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-2 py-0.5 rounded font-mono">React JS</span>
              <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-2 py-0.5 rounded font-mono">React Flow</span>
              <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-2 py-0.5 rounded font-mono">Tailwind v4</span>
              <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-2 py-0.5 rounded font-mono">Web Audio API</span>
            </div>
          </div>

        </div>

        {/* Copyright Panel */}
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Tarombo Keluarga Batak Digital. Nilai tradisi abadi sepanjang masa.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <a href="#" className="hover:text-white transition" aria-label="GitHub">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2005/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition"><Globe className="w-4.5 h-4.5" /></a>
          </div>
        </div>

        {/* Gorga border line bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <GorgaBorder height={12} className="opacity-40" />
        </div>
      </footer>

    </div>
  );
}
