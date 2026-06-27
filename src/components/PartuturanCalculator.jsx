import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, User, Users, RefreshCw, Award, Heart, HelpCircle } from "lucide-react";
import { GorgaCicak, GorgaBorder } from "./GorgaOrnament";

const COMMON_MARGAS = [
  "Simatupang", "Siagian", "Situmorang", "Sinaga", "Pandiangan", "Nainggolan", 
  "Aritonang", "Siregar", "Pasaribu", "Tinendang", "Matondang", "Saruksuk", 
  "Tarihoran", "Parapat", "Rangkuti", "Sipahutar", "Harahap", "Tanjung", 
  "Lubis", "Hutasuhut", "Simargolang", "Limbong", "Sihole", "Habeahan", 
  "Malau", "Manik", "Ambarita", "Gurning", "Simbolon", "Tamba", "Siallagan", 
  "Tomok", "Sidabutar", "Sijabat", "Gusar", "Siadari", "Sidabolak", 
  "Rumahorbo", "Napitu", "Saragi", "Simalango", "Saing", "Simarmata", 
  "Nadeak", "Sidabungke", "Munte", "Sitanggang", "Manihuruk", "Sidauruk", 
  "Turnip", "Sitio", "Sigalingging", "Sitorus", "Sirait", "Butarbutar", 
  "Manurung", "Pane", "Tampubolon", "Baringbing", "Silaen", "Siahaan", 
  "Simanjuntak", "Hutagaol", "Nasution", "Panjaitan", "Sianipar", 
  "Pangaribuan", "Hutapea", "Sibarani", "Sibuea", "Silalahi", "Tambunan", 
  "Tambun", "Naibaho", "Sihotang", "Bakkara", "Sinambela", "Sihite", 
  "Simanullang", "Maha", "Sambo", "Pardosi", "Simamora", "Purba", 
  "Manalu", "Debataraja", "Hutajulu", "Hutahaean", "Aruan", "Sitompul", 
  "Hasibuan", "Sibagariang", "Hutauruk", "Simanungkalit", "Situmeang", 
  "Marbun", "Sagala", "Hutabagas", "Hutaruar", "Hutaurat"
].sort();

export default function PartuturanCalculator() {
  // Inputs
  const [myMarga, setMyMarga] = useState("");
  const [motherMarga, setMotherMarga] = useState("");
  const [myGender, setMyGender] = useState("L"); // 'L' or 'P'
  
  const [otherMarga, setOtherMarga] = useState("");
  const [otherGender, setOtherGender] = useState("L"); // 'L' or 'P'
  const [otherAge, setOtherAge] = useState("same_older"); 
  // 'grandparent', 'parent_older', 'parent_younger', 'same_older', 'same_younger', 'child'

  // Dropdown Autocomplete States
  const [showMyMargaList, setShowMyMargaList] = useState(false);
  const [showMotherMargaList, setShowMotherMargaList] = useState(false);
  const [showOtherMargaList, setShowOtherMargaList] = useState(false);

  // Filtered lists for autocomplete
  const filteredMyMargas = useMemo(() => {
    if (!myMarga) return COMMON_MARGAS;
    return COMMON_MARGAS.filter(m => m.toLowerCase().includes(myMarga.toLowerCase()));
  }, [myMarga]);

  const filteredMotherMargas = useMemo(() => {
    if (!motherMarga) return COMMON_MARGAS;
    return COMMON_MARGAS.filter(m => m.toLowerCase().includes(motherMarga.toLowerCase()));
  }, [motherMarga]);

  const filteredOtherMargas = useMemo(() => {
    if (!otherMarga) return COMMON_MARGAS;
    return COMMON_MARGAS.filter(m => m.toLowerCase().includes(otherMarga.toLowerCase()));
  }, [otherMarga]);

  // Reset
  const handleReset = () => {
    setMyMarga("");
    setMotherMarga("");
    setMyGender("L");
    setOtherMarga("");
    setOtherGender("L");
    setOtherAge("same_older");
  };

  // Calculation Logic
  const result = useMemo(() => {
    const normalMy = myMarga.trim().toLowerCase();
    const normalMother = motherMarga.trim().toLowerCase();
    const normalOther = otherMarga.trim().toLowerCase();

    if (!normalMy || !normalMother || !normalOther) {
      return { 
        term: "Belum Lengkap", 
        description: "Silakan masukkan marga Anda, marga ibu Anda (boru mamak), dan marga orang yang Anda temui terlebih dahulu untuk melihat hasil perhitungan tutur sapa adat.",
        category: "info"
      };
    }

    const isSameMarga = normalMy === normalOther;
    const isMotherMarga = normalMother === normalOther;

    let term = "";
    let description = "";
    let category = "umum"; // 'dongan_tubu', 'hula_hula', 'umum'

    if (isSameMarga) {
      category = "dongan_tubu";
      if (otherAge === "grandparent") {
        if (otherGender === "L") {
          term = "Ompung Doli";
          description = `Karena marga orang tersebut (${otherMarga}) sama dengan marga Anda (${myMarga}) dan ia berada di generasi Kakek (lebih tua dari orang tua), Anda memanggilnya Ompung Doli.`;
        } else {
          term = "Ompung Boru";
          description = `Karena marga orang tersebut (${otherMarga}) sama dengan marga Anda (${myMarga}) dan ia berada di generasi Nenek, Anda memanggilnya Ompung Boru.`;
        }
      } else if (otherAge === "parent_older") {
        if (otherGender === "L") {
          term = "Amangtua";
          description = `Karena marga orang tersebut (${otherMarga}) sama dengan marga Anda (${myMarga}), berjenis kelamin laki-laki, dan generasinya setara orang tua (lebih tua dari Ayah kandung Anda), Anda memanggilnya Amangtua. Istrinya Anda panggil Inangtua (Maktua).`;
        } else {
          term = "Namboru";
          description = `Karena marga orang tersebut (${otherMarga}) sama dengan marga Anda, berjenis kelamin perempuan di generasi orang tua, ia adalah saudara perempuan Ayah Anda (Bibi adat), sehingga dipanggil Namboru. Suaminya dipanggil Amangboru.`;
        }
      } else if (otherAge === "parent_younger") {
        if (otherGender === "L") {
          term = "Amanguda";
          description = `Karena marga orang tersebut (${otherMarga}) sama dengan marga Anda (${myMarga}), berjenis kelamin laki-laki, dan generasinya setara orang tua (lebih muda dari Ayah kandung Anda), Anda memanggilnya Amanguda. Istrinya Anda panggil Inanguda (Makuda).`;
        } else {
          term = "Namboru";
          description = `Karena ia perempuan semarga (${otherMarga}) di generasi orang tua, ia berkedudukan sebagai saudara perempuan Ayah Anda, sehingga dipanggil Namboru.`;
        }
      } else if (otherAge === "same_older") {
        if (otherGender === "L") {
          if (myGender === "L") {
            term = "Haha / Angkang";
            description = `Karena Anda laki-laki bertemu laki-laki yang semarga (${myMarga}) dan sebaya tetapi lebih tua, Anda memanggilnya Haha atau Angkang (Abang). Sapaan akrab persaudaraan semarga adalah Appara.`;
          } else {
            term = "Abang / Angkang";
            description = `Karena Anda perempuan bertemu laki-laki yang semarga (${myMarga}) dan sebaya tetapi lebih tua, Anda memanggilnya Abang atau Angkang.`;
          }
        } else {
          if (myGender === "L") {
            term = "Ito / Iboto";
            description = `Karena Anda laki-laki bertemu perempuan semarga (${myMarga}) dan sebaya, ia adalah saudara perempuan marga Anda (Ito). Berdasarkan hukum adat Batak, hubungan asmara atau pernikahan dengannya dilarang keras (padan/semarga).`;
          } else {
            term = "Kakak / Angkang";
            description = `Karena Anda perempuan bertemu perempuan semarga (${myMarga}) yang sebaya tetapi lebih tua, Anda memanggilnya Kakak atau Angkang.`;
          }
        }
      } else if (otherAge === "same_younger") {
        if (otherGender === "L") {
          if (myGender === "L") {
            term = "Anggi / Adek";
            description = `Karena Anda laki-laki bertemu laki-laki semarga (${myMarga}) yang sebaya tetapi lebih muda, Anda memanggilnya Anggi (Adik). Sapaan akrab semarga adalah Appara.`;
          } else {
            term = "Ito / Iboto";
            description = `Karena Anda perempuan bertemu laki-laki semarga (${myMarga}) yang sebaya tetapi lebih muda, ia adalah adik laki-laki marga Anda, sehingga dipanggil Ito.`;
          }
        } else {
          if (myGender === "L") {
            term = "Ito / Iboto";
            description = `Karena Anda laki-laki bertemu perempuan semarga (${myMarga}) yang sebaya tetapi lebih muda, ia adalah adik perempuan marga Anda, sehingga dipanggil Ito.`;
          } else {
            term = "Anggi / Adek";
            description = `Karena Anda perempuan bertemu perempuan semarga (${myMarga}) yang sebaya tetapi lebih muda, Anda memanggilnya Anggi atau Adek.`;
          }
        }
      } else if (otherAge === "child") {
        if (myGender === "L") {
          if (otherGender === "L") {
            term = "Anak";
            description = `Karena Anda laki-laki bertemu laki-laki semarga (${myMarga}) di generasi anak, ia diposisikan seperti Anak kandung/keponakan kandung Anda.`;
          } else {
            term = "Boru";
            description = `Karena Anda laki-laki bertemu perempuan semarga (${myMarga}) di generasi anak, ia diposisikan seperti anak perempuan kandung Anda (Boru).`;
          }
        } else {
          term = "Bere";
          description = `Karena Anda perempuan, keturunan dari saudara laki-laki atau perempuan semarga Anda (${myMarga}) di generasi anak/keponakan secara adat disapa Bere.`;
        }
      }
    } else if (isMotherMarga) {
      category = "hula_hula";
      if (otherAge === "grandparent") {
        if (otherGender === "L") {
          term = "Ompung Tulang";
          description = `Karena orang tersebut bermarga ${otherMarga} (marga ibu kandung Anda / Hula-hula utama) dan berada di generasi Kakek, maka ia adalah Ompung Tulang Anda (kakek dari pihak ibu).`;
        } else {
          term = "Ompung Boru";
          description = `Karena orang tersebut perempuan bermarga ${otherMarga} (marga ibu Anda) dan berada di generasi Nenek, Anda menyapanya Ompung Boru.`;
        }
      } else if (otherAge === "parent_older" || otherAge === "parent_younger") {
        if (otherGender === "L") {
          term = "Tulang";
          description = `Karena marga orang tersebut (${otherMarga}) adalah marga asal ibu Anda (pemberi kehidupan/Hula-hula) dan ia laki-laki di generasi orang tua, maka ia adalah Tulang (Paman) Anda. Istrinya disapa Nantulang. Posisi Tulang sangat dihormati sesuai asas "Somba Marhula-hula".`;
        } else {
          if (otherAge === "parent_older") {
            term = "Inangtua (Maktua)";
            description = `Karena ia perempuan bermarga ${otherMarga} (sama dengan ibu Anda) dan di generasi orang tua yang usianya lebih tua dari ibu Anda, secara adat ia adalah saudara perempuan ibu yang dipanggil Inangtua atau Maktua.`;
          } else {
            term = "Inanguda / Maktek";
            description = `Karena ia perempuan bermarga ${otherMarga} (sama dengan ibu Anda) dan di generasi orang tua yang usianya lebih muda dari ibu Anda, secara adat ia adalah adik perempuan ibu yang dipanggil Inanguda atau Maktek.`;
          }
        }
      } else if (otherAge === "same_older" || otherAge === "same_younger") {
        if (otherGender === "L") {
          if (myGender === "L") {
            term = "Lae";
            description = `Karena Anda laki-laki bertemu laki-laki bermarga ${otherMarga} (marga ibu Anda) di generasi sebaya, ia adalah anak laki-laki dari Tulang Anda (sepupu). Hubungan ini disapa dengan Lae.`;
          } else {
            term = "Tulang / Tulang Naposo";
            description = `Karena Anda perempuan bertemu laki-laki bermarga ${otherMarga} (marga ibu Anda) di generasi sebaya, secara adat ia berposisi sebagai saudara dari ibu Anda (meski sebaya), maka disapa Tulang atau Tulang Naposo. Ia akan menyapa Anda Pariban.`;
          }
        } else {
          if (myGender === "L") {
            term = "Pariban";
            description = `Karena Anda laki-laki bertemu perempuan bermarga ${otherMarga} (marga ibu Anda) di generasi sebaya (anak perempuan dari Tulang Anda), ia adalah Pariban Anda. Dalam adat Batak Toba, hubungan ini adalah jodoh yang direkomendasikan secara adat ("Marpariban").`;
          } else {
            term = "Eda";
            description = `Karena Anda perempuan bertemu perempuan bermarga ${otherMarga} (marga ibu Anda) di generasi sebaya (anak perempuan dari Tulang Anda), Anda memanggilnya Eda. Ini sapaan akrab antarsepupu perempuan.`;
          }
        }
      } else if (otherAge === "child") {
        if (otherGender === "L") {
          term = "Tulang Naposo";
          description = `Meskipun usianya di generasi anak, karena ia laki-laki pembawa garis marga ibu Anda (${otherMarga}), untuk menghormati hula-hula ia dipanggil Tulang Naposo (Tulang Muda).`;
        } else {
          if (myGender === "L") {
            term = "Pariban";
            description = `Karena ia perempuan pembawa garis marga ibu Anda (${otherMarga}) di generasi yang lebih muda, secara adat tetap dikategorikan sebagai Pariban (anak perempuan Tulang).`;
          } else {
            term = "Eda / Boru ni Tulang";
            description = `Karena ia perempuan pembawa garis marga ibu Anda (${otherMarga}) di generasi muda, ia dipanggil Eda atau Boru ni Tulang.`;
          }
        }
      }
    } else {
      category = "umum";
      if (otherAge === "grandparent") {
        if (otherGender === "L") {
          term = "Ompung";
          description = `Karena orang tersebut berada di generasi kakek dengan marga berbeda (${otherMarga}), Anda memanggilnya Ompung sebagai sapaan hormat umum kepada orang tua/leluhur.`;
        } else {
          term = "Ompung Boru";
          description = `Karena orang tersebut berada di generasi nenek dengan marga berbeda (${otherMarga}), Anda memanggilnya Ompung Boru.`;
        }
      } else if (otherAge === "parent_older" || otherAge === "parent_younger") {
        if (otherGender === "L") {
          term = "Amang / Om";
          description = `Karena ia laki-laki bermarga lain (${otherMarga}) di generasi orang tua, Anda menyapanya secara sopan dengan Amang, Bapa, atau Om. Jika ia merupakan suami dari bibi (Namboru) Anda, secara adat ia adalah Amangboru Anda.`;
        } else {
          term = "Inang / Tante";
          description = `Karena ia perempuan bermarga lain (${otherMarga}) di generasi orang tua, Anda menyapanya secara sopan dengan Inang, Omak, atau Tante.`;
        }
      } else if (otherAge === "same_older" || otherAge === "same_younger") {
        if (otherGender === "L") {
          if (myGender === "L") {
            term = "Lae";
            description = `Karena Anda laki-laki bertemu laki-laki yang berbeda marga (${otherMarga}) di generasi sebaya, sapaan adat umum yang sangat sopan dan akrab digunakan adalah Lae.`;
          } else {
            term = "Ito / Abang";
            description = `Karena Anda perempuan bertemu laki-laki berbeda marga (${otherMarga}) di generasi sebaya, Anda memanggilnya Ito (saudara laki-laki secara adat) atau Abang.`;
          }
        } else {
          if (myGender === "L") {
            term = "Ito / Kakak";
            description = `Karena Anda laki-laki bertemu perempuan berbeda marga (${otherMarga}) di generasi sebaya, Anda memanggilnya Ito (saudara perempuan secara adat) atau Kakak.`;
          } else {
            term = "Eda";
            description = `Karena Anda perempuan bertemu perempuan berbeda marga (${otherMarga}) di generasi sebaya, sapaan adat umum yang sangat sopan antarwanita adalah Eda.`;
          }
        }
      } else if (otherAge === "child") {
        term = "Bere / Adek";
        description = `Karena orang tersebut berada di generasi anak/keponakan dengan marga berbeda (${otherMarga}), Anda dapat memanggilnya Bere atau Adek.`;
      }
    }

    return { term, description, category };
  }, [myMarga, motherMarga, myGender, otherMarga, otherGender, otherAge]);

  return (
    <section id="kalkulator" className="relative py-24 px-6 bg-zinc-950 border-t border-[#8B0000]/20 overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 ulos-bg opacity-[0.08] pointer-events-none z-0" />
      
      {/* Decorative Blur */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8B0000]/5 filter blur-[100px] top-1/3 left-1/4 pointer-events-none z-0" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#D4AF37]/5 filter blur-[100px] bottom-1/3 right-1/4 pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Title Section */}
        <div className="text-center space-y-3 mb-16">
          <div className="flex justify-center mb-2">
            <GorgaCicak size={100} className="opacity-80" />
          </div>
          <h2 className="text-3xl md:text-5xl font-cinzel font-black tracking-wide text-white">
            KALKULATOR <span className="text-gradient-gold">PARTUTURAN</span>
          </h2>
          <div className="h-[1.5px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
          <p className="text-sm font-light text-zinc-400 max-w-xl mx-auto">
            Cari tahu sebutan panggilan adat Batak Toba yang sopan dan tepat berdasarkan hubungan silsilah marga Ayah (Dongan Tubu) dan marga Ibu (Hula-hula).
          </p>
        </div>

        {/* Interactive Dashboard Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* Subsection 1: Identitas Anda */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold font-poppins flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#D4AF37]/10 flex items-center justify-center text-[10px] text-[#D4AF37]">1</span>
                Identitas Diri Anda
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* My Marga (Ayah) */}
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">Marga Kandung (Ayah)</label>
                  <input
                    type="text"
                    value={myMarga}
                    onChange={(e) => {
                      setMyMarga(e.target.value);
                      setShowMyMargaList(true);
                    }}
                    onFocus={() => setShowMyMargaList(true)}
                    onBlur={() => setTimeout(() => setShowMyMargaList(false), 200)}
                    placeholder="Contoh: Simatupang"
                    className="w-full bg-black/40 border border-zinc-800 hover:border-zinc-700 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition"
                  />
                  {showMyMargaList && filteredMyMargas.length > 0 && (
                    <ul className="absolute z-20 w-full mt-1 max-h-48 overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-xl py-1.5 shadow-2xl text-xs text-zinc-300">
                      {filteredMyMargas.map((m) => (
                        <li
                          key={m}
                          onMouseDown={() => setMyMarga(m)}
                          className="px-4 py-2 hover:bg-[#8B0000]/25 hover:text-white cursor-pointer transition"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Mother's Marga (Boru Mamak) */}
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">Boru ni Mamak (Marga Ibu)</label>
                  <input
                    type="text"
                    value={motherMarga}
                    onChange={(e) => {
                      setMotherMarga(e.target.value);
                      setShowMotherMargaList(true);
                    }}
                    onFocus={() => setShowMotherMargaList(true)}
                    onBlur={() => setTimeout(() => setShowMotherMargaList(false), 200)}
                    placeholder="Contoh: Siagian"
                    className="w-full bg-black/40 border border-zinc-800 hover:border-zinc-700 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition"
                  />
                  {showMotherMargaList && filteredMotherMargas.length > 0 && (
                    <ul className="absolute z-20 w-full mt-1 max-h-48 overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-xl py-1.5 shadow-2xl text-xs text-zinc-300">
                      {filteredMotherMargas.map((m) => (
                        <li
                          key={m}
                          onMouseDown={() => setMotherMarga(m)}
                          className="px-4 py-2 hover:bg-[#8B0000]/25 hover:text-white cursor-pointer transition"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* My Gender */}
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">Jenis Kelamin Anda</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMyGender("L")}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold tracking-wider transition cursor-pointer ${
                        myGender === "L"
                          ? "bg-[#8B0000]/15 border-[#8B0000] text-red-400"
                          : "bg-black/20 border-zinc-800 text-zinc-400 hover:bg-black/40"
                      }`}
                    >
                      <User className="w-4 h-4" /> LAKI-LAKI
                    </button>
                    <button
                      type="button"
                      onClick={() => setMyGender("P")}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold tracking-wider transition cursor-pointer ${
                        myGender === "P"
                          ? "bg-pink-950/20 border-pink-700/60 text-pink-400"
                          : "bg-black/20 border-zinc-800 text-zinc-400 hover:bg-black/40"
                      }`}
                    >
                      <User className="w-4 h-4" /> PEREMPUAN
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Subsection 2: Lawan Bicara */}
            <div className="space-y-4 pt-2 border-t border-zinc-800/60">
              <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold font-poppins flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#D4AF37]/10 flex items-center justify-center text-[10px] text-[#D4AF37]">2</span>
                Profil Orang yang Anda Temui
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Other Marga */}
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">Marga Lawan Bicara</label>
                  <input
                    type="text"
                    value={otherMarga}
                    onChange={(e) => {
                      setOtherMarga(e.target.value);
                      setShowOtherMargaList(true);
                    }}
                    onFocus={() => setShowOtherMargaList(true)}
                    onBlur={() => setTimeout(() => setShowOtherMargaList(false), 200)}
                    placeholder="Contoh: Siagian"
                    className="w-full bg-black/40 border border-zinc-800 hover:border-zinc-700 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition"
                  />
                  {showOtherMargaList && filteredOtherMargas.length > 0 && (
                    <ul className="absolute z-20 w-full mt-1 max-h-48 overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-xl py-1.5 shadow-2xl text-xs text-zinc-300">
                      {filteredOtherMargas.map((m) => (
                        <li
                          key={m}
                          onMouseDown={() => setOtherMarga(m)}
                          className="px-4 py-2 hover:bg-[#8B0000]/25 hover:text-white cursor-pointer transition"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Other Gender */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">Jenis Kelamin Lawan Bicara</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOtherGender("L")}
                      className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-[11px] font-semibold transition cursor-pointer ${
                        otherGender === "L"
                          ? "bg-[#8B0000]/15 border-[#8B0000] text-red-400"
                          : "bg-black/20 border-zinc-800 text-zinc-500 hover:bg-black/40"
                      }`}
                    >
                      COWO (Laki)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtherGender("P")}
                      className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-[11px] font-semibold transition cursor-pointer ${
                        otherGender === "P"
                          ? "bg-pink-950/20 border-pink-700/60 text-pink-400"
                          : "bg-black/20 border-zinc-800 text-zinc-500 hover:bg-black/40"
                      }`}
                    >
                      CEWE (Perempuan)
                    </button>
                  </div>
                </div>

                {/* Other Age / Generation */}
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">Hubungan Generasi / Usia</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setOtherAge("grandparent")}
                      className={`py-2 px-1 rounded-xl border text-[10px] font-medium transition cursor-pointer ${
                        otherAge === "grandparent"
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]"
                          : "bg-black/20 border-zinc-800 text-zinc-400 hover:bg-black/40"
                      }`}
                    >
                      Generasi Ompung (Kakek/Nenek)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtherAge("parent_older")}
                      className={`py-2 px-1 rounded-xl border text-[10px] font-medium transition cursor-pointer ${
                        otherAge === "parent_older"
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]"
                          : "bg-black/20 border-zinc-800 text-zinc-400 hover:bg-black/40"
                      }`}
                    >
                      Gen Orang Tua (Lebih Tua)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtherAge("parent_younger")}
                      className={`py-2 px-1 rounded-xl border text-[10px] font-medium transition cursor-pointer ${
                        otherAge === "parent_younger"
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]"
                          : "bg-black/20 border-zinc-800 text-zinc-400 hover:bg-black/40"
                      }`}
                    >
                      Gen Orang Tua (Lebih Muda)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtherAge("same_older")}
                      className={`py-2 px-1 rounded-xl border text-[10px] font-medium transition cursor-pointer ${
                        otherAge === "same_older"
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]"
                          : "bg-black/20 border-zinc-800 text-zinc-400 hover:bg-black/40"
                      }`}
                    >
                      Sebaya dengan Anda (Lebih Tua)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtherAge("same_younger")}
                      className={`py-2 px-1 rounded-xl border text-[10px] font-medium transition cursor-pointer ${
                        otherAge === "same_younger"
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]"
                          : "bg-black/20 border-zinc-800 text-zinc-400 hover:bg-black/40"
                      }`}
                    >
                      Sebaya dengan Anda (Lebih Muda)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtherAge("child")}
                      className={`py-2 px-1 rounded-xl border text-[10px] font-medium transition cursor-pointer ${
                        otherAge === "child"
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]"
                          : "bg-black/20 border-zinc-800 text-zinc-400 hover:bg-black/40"
                      }`}
                    >
                      Generasi Anak / Keponakan
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Clear Form Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 text-xs text-zinc-500 hover:text-[#D4AF37] hover:bg-zinc-800/40 rounded-lg transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Input
              </button>
            </div>

          </div>

          {/* Result Card Side */}
          <div className="lg:col-span-5 h-full flex flex-col justify-stretch">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`${myMarga}-${motherMarga}-${otherMarga}-${otherAge}-${otherGender}-${myGender}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                {/* Result Card Container */}
                <div className="relative rounded-2xl p-7 md:p-8 flex-1 flex flex-col justify-between overflow-hidden border border-[#D4AF37]/20 bg-zinc-950/80 shadow-[0_0_40px_rgba(139,0,0,0.15)]">
                  
                  {/* Decorative Border top */}
                  <div className="absolute top-0 left-0 right-0">
                    <GorgaBorder height={10} className="opacity-30" />
                  </div>

                  {/* Watermark decors */}
                  <div className="absolute bottom-[-50px] right-[-50px] opacity-[0.02] rotate-[-20deg] pointer-events-none">
                    <GorgaCicak size={320} />
                  </div>

                  {/* Card Body */}
                  <div className="space-y-6 relative z-10 py-2">
                    
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">HASIL PERHITUNGAN TUTUR</span>
                      <h4 className="text-xs uppercase tracking-wide text-zinc-500 font-semibold font-poppins">
                        SAPAAN / KEKERABATAN ADAT
                      </h4>
                    </div>

                    {/* Term Display Card */}
                    <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 text-center shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]">
                      
                      {result.category === "dongan_tubu" && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B0000]/15 text-red-400 text-[10px] font-bold tracking-widest uppercase border border-[#8B0000]/30 mb-3">
                          <Award className="w-3.5 h-3.5" /> Dongan Tubu (Semarga)
                        </div>
                      )}

                      {result.category === "hula_hula" && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase border border-[#D4AF37]/30 mb-3">
                          <Heart className="w-3.5 h-3.5" /> Hula-hula (Marga Ibu)
                        </div>
                      )}

                      {result.category === "umum" && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-[10px] font-bold tracking-widest uppercase border border-zinc-700 mb-3">
                          <Compass className="w-3.5 h-3.5" /> Berbeda Marga (Umum)
                        </div>
                      )}

                      <div className="text-4xl md:text-5xl font-cinzel font-black text-white tracking-wider my-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {result.term}
                      </div>

                      <div className="text-xs text-zinc-500 font-mono mt-2">
                        {myMarga ? `Hubungan: ${myMarga} ➔ ${otherMarga}` : "Lengkapi formulir sebelah kiri"}
                      </div>

                    </div>

                    {/* Description Paragraph */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase font-poppins flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
                        Penjelasan Tradisi Dalihan Na Tolu:
                      </div>
                      <p className="text-zinc-300 text-sm leading-relaxed font-light bg-black/20 rounded-xl p-4 border border-zinc-900">
                        {result.description}
                      </p>
                    </div>

                  </div>

                  {/* Quick Etiquette Advice */}
                  {myMarga && motherMarga && otherMarga && (
                    <div className="mt-8 pt-4 border-t border-zinc-900 text-xs text-zinc-500 font-poppins relative z-10">
                      {result.category === "hula_hula" && (
                        <div className="flex items-start gap-2 bg-[#D4AF37]/5 border border-[#D4AF37]/15 p-3 rounded-lg text-zinc-400">
                          <span className="text-[#D4AF37] font-bold">Adat:</span>
                          <span>"Somba Marhula-hula" — Hormatilah marga ini seperti pembawa berkat dalam hidup Anda. Bersikap sopan dan santunlah saat berbicara dengan {result.term}.</span>
                        </div>
                      )}
                      {result.category === "dongan_tubu" && (
                        <div className="flex items-start gap-2 bg-[#8B0000]/5 border border-[#8B0000]/15 p-3 rounded-lg text-zinc-400">
                          <span className="text-red-400 font-bold">Adat:</span>
                          <span>"Manat Mardongan Tubu" — Hati-hati dan jagalah persaudaraan sesama marga Anda. Pertahankan kerukunan bersama {result.term}.</span>
                        </div>
                      )}
                      {result.category === "umum" && (
                        <div className="flex items-start gap-2 bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-zinc-400">
                          <span className="text-zinc-500 font-bold">Adat:</span>
                          <span>Sapaan {result.term} adalah bentuk tutur sapa persaudaraan Batak yang sangat akrab untuk menjaga keharmonisan pertemanan di perantauan.</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Decorative Border bottom */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <GorgaBorder height={10} className="scale-y-[-1] opacity-30" />
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
