'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import {
  Tv,
  Radio,
  Search,
  Phone,
  Maximize2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sliders,
  Sparkles,
  Layers,
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  category: string;
  logo: string;
  streamUrl: string;
}

const CHANNELS_DATA: Channel[] = [
  {
    id: '1',
    name: 'Somoy News',
    category: 'News',
    logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=150',
    streamUrl: 'https://tvsen6.aynaott.com/4XcqdovJzbbC9WdJA9gk/index.m3u8',
  },
  {
    id: '2',
    name: 'Gazi TV',
    category: 'Sports',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150',
    streamUrl:
      'https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI2/gazibdz.stream/live-orgin/gazibdz.stream/playlist.m3u8',
  },
  {
    id: '3',
    name: 'T Sports',
    category: 'Sports',
    logo: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=150',
    streamUrl: 'https://tvsen5.aynaott.com/TnMn5kZz8aLm/index.m3u8',
  },
  {
    id: '4',
    name: 'DBC News HD',
    category: 'News',
    logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=150',
    streamUrl: 'https://tvsen6.aynaott.com/pF66Tkz0qFwP2aMMqHyt/index.m3u8',
  },
  {
    id: '5',
    name: 'Jamuna TV',
    category: 'News',
    logo: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=150',
    streamUrl: 'https://tvsen6.aynaott.com/KGdZEdA7qQ43dmPkgk1j/index.m3u8',
  },
  {
    id: '6',
    name: 'RTV',
    category: 'Entertainment',
    logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=150',
    streamUrl: 'https://tvsen5.aynaott.com/RtvHD/index.m3u8',
  },
];

const CATEGORIES = ['All', 'News', 'Sports', 'Entertainment'];

export default function LiveTVPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [activeChannel, setActiveChannel] = useState<Channel>(CHANNELS_DATA[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [qualities, setQualities] = useState<{ value: number; label: string }[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const loadStream = (url: string) => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hlsRef.current = hls;
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const levels = hls.levels.map((level, index) => ({
          value: index,
          label: level.height ? `${level.height}p` : `${Math.round(level.bitrate / 1000)} kbps`,
        }));
        setQualities(levels);
        video.play().then(() => setIsPlaying(true)).catch((e) => console.log('Autoplay blocked:', e));
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        video.play();
        setIsPlaying(true);
      });
    }
  };

  useEffect(() => {
    loadStream(activeChannel.streamUrl);
    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [activeChannel]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch((err) => console.log(err));
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = parseInt(e.target.value, 10);
    }
  };

  const filteredChannels = CHANNELS_DATA.filter((channel) => {
    const matchesCategory = selectedCategory === 'All' || channel.category === selectedCategory;
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#08080c] text-slate-100 min-h-screen pb-28 font-sans selection:bg-[#ff5500] selection:text-white">
      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#ff5500]/10 via-transparent to-transparent blur-3xl opacity-70" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-[#0c0c14]/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#ff5500] to-[#ff8800] text-white shadow-lg shadow-[#ff5500]/30 animate-pulse">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Mehedi <span className="text-[#ff5500]">Internet</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#ff5500]" /> Ultra Live TV Portal
              </p>
            </div>
          </div>

          <a
            href="tel:01626886070"
            className="hidden sm:flex items-center gap-2 bg-[#ff5500]/15 hover:bg-[#ff5500] text-[#ff5500] hover:text-white border border-[#ff5500]/40 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-[#ff5500]/40"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Support: 01626886070</span>
          </a>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Box (2 Columns on Large Screens) */}
          <div className="lg:col-span-2">
            <div
              ref={containerRef}
              className="group relative bg-[#0d0d14] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80"
            >
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  playsInline
                  className="w-full h-full object-contain"
                  onClick={togglePlay}
                />

                {/* Overlaid Custom Player Controls */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-lg bg-white/10 hover:bg-[#ff5500] text-white transition"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-lg bg-white/10 hover:bg-[#ff5500] text-white transition"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-black/50 px-2.5 py-1 rounded-lg border border-white/10">
                      <Sliders className="w-3.5 h-3.5 text-[#ff5500]" />
                      <select
                        onChange={handleQualityChange}
                        className="bg-transparent text-white text-xs outline-none cursor-pointer"
                      >
                        <option value="-1" className="bg-[#0c0c14]">Auto Quality</option>
                        {qualities.map((q) => (
                          <option key={q.value} value={q.value} className="bg-[#0c0c14]">
                            {q.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={toggleFullscreen}
                      className="p-2 rounded-lg bg-white/10 hover:bg-[#ff5500] text-white transition"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Channel Meta Below Player */}
              <div className="bg-[#12121c] p-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <div>
                    <h2 className="font-bold text-base text-white">{activeChannel.name}</h2>
                    <span className="text-xs text-slate-400 font-medium">{activeChannel.category} Channel</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  <Radio className="w-3.5 h-3.5 animate-pulse" /> LIVE STREAM
                </div>
              </div>
            </div>
          </div>

          {/* Channel Selection Sidebar (1 Column) */}
          <div className="bg-[#0f0f18]/90 backdrop-blur-lg rounded-2xl p-4 border border-white/10 flex flex-col gap-4 max-h-[580px]">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search channel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5500] transition"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/30'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Channels List */}
            <div className="overflow-y-auto flex-1 space-y-2 pr-1 custom-scrollbar">
              {filteredChannels.map((channel) => {
                const isActive = activeChannel.id === channel.id;
                return (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel)}
                    className={`w-full p-3 rounded-xl flex items-center justify-between gap-3 border transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#ff5500]/20 to-transparent border-[#ff5500] shadow-lg shadow-[#ff5500]/10'
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-black/50 overflow-hidden border border-white/10 p-1 flex items-center justify-center">
                        <img
                          src={channel.logo}
                          alt={channel.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-white">{channel.name}</h4>
                        <span className="text-[10px] text-slate-400">{channel.category}</span>
                      </div>
                    </div>

                    {isActive && (
                      <span className="text-[10px] bg-[#ff5500] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        Playing
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Bottom Bar */}
      <footer className="fixed bottom-0 inset-x-0 z-50 bg-[#0a0a10]/90 backdrop-blur-xl border-t border-white/10 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-slate-400">Powered by</span>
            <span className="text-[#ff5500]">Mehedi Internet</span>
          </div>

          <a
            href="tel:01626886070"
            className="flex items-center gap-2 bg-gradient-to-r from-[#ff5500] to-[#e04800] text-white px-5 py-2 rounded-full font-bold text-xs shadow-lg shadow-[#ff5500]/30 hover:scale-105 transition-transform"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call: 01626886070</span>
          </a>
        </div>
      </footer>
    </div>
  );
                    }
