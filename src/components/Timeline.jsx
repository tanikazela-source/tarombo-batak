import React from "react";
import { motion } from "framer-motion";
import { Compass, Landmark, ShieldCheck, GitBranch } from "lucide-react";
import { GorgaCicak } from "./GorgaOrnament";

export default function Timeline() {
  const milestones = [
    {
      icon: <Landmark className="w-6 h-6 text-[#D4AF37]" />,
      title: "Asal Mula di Pusuk Buhit",
      era: "Abad Ke-13 / Awal Mula Silsilah",
      location: "Sianjur Mulamula, Samosir",
      description: "Di kaki Gunung Pusuk Buhit, legenda bermula. Si Raja Batak mendirikan perkampungan (Huta) pertama dan meletakkan dasar aksara, bahasa, hukum tata kemasyarakatan, serta ritual spiritual asli suku Batak.",
      glow: "rgba(139,0,0,0.3)"
    },
    {
      icon: <GitBranch className="w-6 h-6 text-[#D4AF37]" />,
      title: "Pembagian Garis Agung Silsilah",
      era: "Generasi ke-2",
      location: "Pusuk Buhit & Pangururan",
      description: "Silsilah terbagi menjadi dua pilar: Guru Tatea Bulan mewarisi ilmu kesaktian spiritual, seni budaya, dan ritus tradisi, sedangkan adiknya Raja Isombaon mewarisi kepemimpinan wilayah teritorial, hukum sipil, dan tata organisasi pertanahan.",
      glow: "rgba(212,175,55,0.2)"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
      title: "Terbentuknya Dalihan Na Tolu",
      era: "Konsensus Sosial & Adat",
      location: "Seluruh Wilayah Adat Toba",
      description: "Dirumuskannya filosofi Dalihan Na Tolu (Tungku Nan Tiga): Somba Marhula-hula (hormat kepada pemberi istri), Elek Marboru (lemah lembut kepada penerima istri), Manat Mardongan Tubu (waspada sesama marga). Sistem kekerabatan demokratis yang bertahan berabad-abad.",
      glow: "rgba(139,0,0,0.3)"
    },
    {
      icon: <Compass className="w-6 h-6 text-[#D4AF37]" />,
      title: "Diaspora Agung Marga-marga",
      era: "Abad Ke-15 hingga Kini",
      location: "Silindung, Humbang, Karo, Simalungun, Dairi, Angkola",
      description: "Pertumbuhan penduduk yang pesat memicu migrasi besar keluar dari Pulau Samosir. Keturunan Tuan Sorbadibanua, Raja Lottung, Borbor, dan Parna menyebar ke seluruh penjuru Sumatera Utara, melahirkan ratusan marga mandiri yang bersaudara erat.",
      glow: "rgba(212,175,55,0.2)"
    }
  ];

  return (
    <section id="sejarah" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#111111] via-[#151515] to-black border-t border-[#8B0000]/20">
      
      {/* Background Ornaments - Boraspati (Cicak Batak) */}
      <div className="absolute top-10 right-[-110px] opacity-[0.025] rotate-[25deg] pointer-events-none">
        <GorgaCicak size={460} />
      </div>
      <div className="absolute bottom-10 left-[-110px] opacity-[0.025] rotate-[-25deg] pointer-events-none">
        <GorgaCicak size={460} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold font-poppins px-3 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30"
          >
            Naratif Sejarah
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-5xl font-cinzel font-black tracking-wide text-white"
          >
            Lini Masa Tarombo & Migrasi
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-light"
          >
            Jelajahi garis sejarah bagaimana peradaban Batak Toba tumbuh, berkeluarga, menetapkan adat, hingga menyebarkan marganya ke seluruh dunia.
          </motion.p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-dashed border-[#8B0000]/30 ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2 space-y-16">
          
          {milestones.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div key={idx} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full">
                
                {/* Timeline node node connector */}
                <div className="absolute left-[-23px] md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-zinc-950 border border-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] z-10">
                  {item.icon}
                </div>

                {/* Left block (Desktop empty or Card) */}
                <div className={`w-full md:w-[45%] pl-8 md:pl-0 ${isEven ? "md:text-right" : "md:order-last"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, type: "spring" }}
                    className="p-6 bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/80 hover:border-[#8B0000]/50 transition duration-500 shadow-xl group relative overflow-hidden"
                    style={{
                      boxShadow: `0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 20px ${item.glow}`
                    }}
                  >
                    {/* Glowing highlight corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8B0000]/10 to-transparent pointer-events-none" />

                    <span className="text-[10px] text-[#D4AF37] font-semibold tracking-wider font-poppins block mb-1">
                      {item.era}
                    </span>
                    <h3 className="text-xl font-cinzel font-bold text-white mb-2 tracking-wide group-hover:text-[#D4AF37] transition duration-300">
                      {item.title}
                    </h3>
                    
                    <div className={`flex items-center gap-1.5 text-xs text-zinc-400 mb-3 ${isEven ? "md:justify-end" : ""}`}>
                      <Compass className="w-3.5 h-3.5 text-[#8B0000]" />
                      <span>{item.location}</span>
                    </div>

                    <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for desktop layout */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
