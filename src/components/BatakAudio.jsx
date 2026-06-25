import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, HelpCircle, Loader2 } from "lucide-react";

export default function BatakAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const playerRef = useRef(null);
  const visualizerCanvasRef = useRef(null);
  const visualizerAnimRef = useRef(null);
  const checkIntervalRef = useRef(null);

  // Video ID of "Siantar Rap Foundation - Dolok Pusuk Buhit" on YouTube (User Custom URL)
  const videoId = "s7e1LO1b1Ss";

  useEffect(() => {
    // 1. Inject the YouTube Iframe Player API script if not already present
    if (!document.getElementById("yt-iframe-api-script")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api-script";
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // 2. Poll for YT API availability to initialize player safely
    const initPlayer = () => {
      try {
        playerRef.current = new window.YT.Player("yt-player", {
          height: "0",
          width: "0",
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: videoId, // Required for loop in single-video playback
            modestbranding: 1,
            rel: 0,
            origin: window.location.origin
          },
          events: {
            onReady: (event) => {
              setIsPlayerReady(true);
              setIsLoading(false);
              event.target.setVolume(volume * 100);
            },
            onStateChange: (event) => {
              // YT.PlayerState: 1 = PLAYING, 2 = PAUSED, 0 = ENDED, -1 = UNSTARTED
              if (event.data === 1) {
                setIsPlaying(true);
              } else {
                setIsPlaying(false);
              }
            },
            onError: () => {
              setIsLoading(false);
              console.error("YouTube Player API failed to load the video.");
            }
          }
        });
      } catch (err) {
        console.error("Error instantiating YT Player: ", err);
        setIsLoading(false);
      }
    };

    const checkYT = () => {
      if (window.YT && window.YT.Player) {
        clearInterval(checkIntervalRef.current);
        initPlayer();
      }
    };

    checkIntervalRef.current = setInterval(checkYT, 200);

    // 3. Start wave visualizer drawing loop
    startWaveform();

    return () => {
      clearInterval(checkIntervalRef.current);
      if (visualizerAnimRef.current) {
        cancelAnimationFrame(visualizerAnimRef.current);
      }
      // Stop and clean up YT Player
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // ignore destroy errors during unmount
        }
      }
    };
  }, []);

  // Sync volume changes to the YouTube player
  useEffect(() => {
    if (isPlayerReady && playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(volume * 100);
    }
  }, [volume, isPlayerReady]);

  // Handle Play/Pause
  const handleToggle = () => {
    if (!isPlayerReady || !playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  // Draw simulated dancing waveform matching the rap beat
  const startWaveform = () => {
    const canvas = visualizerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    let offset = 0;

    const draw = () => {
      if (!visualizerCanvasRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barCount = 35;
      const barWidth = 3;
      const gap = 2;
      
      ctx.fillStyle = "rgba(212, 175, 55, 0.75)"; // Gold audio bars
      
      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + gap);
        // Generate values resembling an active audio spectrum
        let heightMultiplier = 3;
        if (isPlaying) {
          // Complex sine inputs to simulate active frequency bands
          heightMultiplier = 5 + Math.sin(i * 0.35 + offset) * 10 + Math.cos(i * 0.75 - offset) * 8;
          heightMultiplier = Math.max(2, heightMultiplier * volume * 1.5);
        }
        
        const h = Math.min(canvas.height - 4, heightMultiplier);
        const y = canvas.height / 2 - h / 2;
        
        ctx.fillRect(x, y, barWidth, h);
      }

      offset += isPlaying ? 0.18 : 0.02; // speed up wave translation when playing
      visualizerAnimRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  return (
    <div className="bg-black/80 border border-[#8B0000]/40 backdrop-blur-md rounded-full md:rounded-2xl p-2 md:p-4 flex flex-row items-center gap-3 md:gap-4 max-w-[260px] md:max-w-md shadow-[0_0_30px_rgba(139,0,0,0.3)] z-20">
      
      {/* Hidden YouTube Iframe Anchor */}
      <div id="yt-player" className="absolute w-0 h-0 opacity-0 pointer-events-none" />

      {/* Control Button */}
      <button
        onClick={handleToggle}
        disabled={isLoading || !isPlayerReady}
        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer shrink-0 ${
          isPlaying
            ? "bg-[#8B0000] text-white shadow-[0_0_15px_rgba(139,0,0,0.6)] border border-red-500/50 scale-105"
            : "bg-zinc-900 border border-zinc-700/60 text-[#D4AF37] hover:border-[#D4AF37]/50 disabled:opacity-40"
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin text-[#D4AF37]" />
        ) : isPlaying ? (
          <Volume2 className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 md:w-5 md:h-5" />
        )}
      </button>

      {/* Song details */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] uppercase tracking-wider text-zinc-300 font-semibold font-poppins flex items-center gap-1.5 truncate">
            <Music className="w-3.5 h-3.5 text-[#D4AF37] animate-spin-slow shrink-0" />
            <span className="truncate">Dolok Pusuk Buhit</span>
          </span>
          <span className="hidden md:inline-block text-[9px] text-[#D4AF37] font-mono tracking-tighter shrink-0 bg-[#8B0000]/10 border border-[#8B0000]/25 px-1.5 py-0.2 rounded">
            Siantar Rap Foundation
          </span>
        </div>
        
        {/* Desktop-only visualizer & controls */}
        <div className="hidden md:flex flex-col gap-1 mt-1.5">
          <canvas
            ref={visualizerCanvasRef}
            width={180}
            height={32}
            className="h-8 w-full bg-zinc-950/70 rounded border border-zinc-800/40"
          />

          <div className="flex items-center gap-2 mt-1 justify-between">
            <span className="text-[9px] text-zinc-500 font-mono">
              {isLoading ? "Menghubungkan..." : isPlaying ? "Memutar Audio" : "Muted / Jeda"}
            </span>
            
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 accent-[#8B0000] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
