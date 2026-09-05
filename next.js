'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Tv, CircleDot, Sliders, Search, Newspaper, Trophy, Kaaba, Film, Child, Music, Star, Phone } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
}

const CHANNELS_DATA: Channel[] = [
  { id: '1', name: 'SOMOY NEWS', url: 'https://tvsen6.aynaott.com/4XcqdovJzbbC9WdJA9gk/index.m3u8', icon: <Newspaper className="w-5 h-5" /> },
  { id: '2', name: 'Gazi TV', url: 'https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI2/gazibdz.stream/live-orgin/gazibdz.stream/playlist.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '3', name: 'T Sports', url: 'https://tvsen5.aynaott.com/TnMn5kZz8aLm/index.m3u8', icon: <Trophy className="w-5 h-5" /> },
  { id: '4', name: 'DBC News HD', url: 'https://tvsen6.aynaott.com/pF66Tkz0qFwP2aMMqHyt/index.m3u8', icon: <Newspaper className="w-5 h-5" /> },
  { id: '5', name: 'ATN Bangla', url: 'https://tvsen5.aynaott.com/P3y2URgG7LDe/index.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '6', name: 'RTV', url: 'https://tvsen5.aynaott.com/RtvHD/index.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '7', name: 'News 24', url: 'https://tvsen6.aynaott.com/cdgr3tw6WoG7JyRnLbi0/index.m3u8', icon: <Newspaper className="w-5 h-5" /> },
  { id: '8', name: 'Ekhon', url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/globaltv.stream/index.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '9', name: 'Maasranga TV', url: 'https://mtv.sunplex.live/MAASRANGA/index.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '10', name: 'GLOBAL TV HD', url: 'http://116.204.149.16/globaltv/index.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '11', name: 'Bijoy Tv', url: 'https://stream.ottplus.live/live/bijoy_tv_abr/index.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '12', name: 'Peace tv Bangla', url: 'https://dzkyvlfyge.erbvr.com/PeaceTvBangla/tracks-v3a1/mono.m3u8', icon: <Kaaba className="w-5 h-5" /> },
  { id: '13', name: 'Islamic tv', url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/islamictvbd.stream/index.m3u8', icon: <Kaaba className="w-5 h-5" /> },
  { id: '14', name: 'Enter TV', url: 'https://live1.entertv.com.bd/entertv/index.fmp4.m3u8', icon: <Film className="w-5 h-5" /> },
  { id: '15', name: 'SRK', url: 'https://srknowapp.ncare.live/srktvhlswodrm/srktv.stream/playlist.m3u8', icon: <Film className="w-5 h-5" /> },
  { id: '16', name: 'JamunaTV', url: 'https://tvsen6.aynaott.com/KGdZEdA7qQ43dmPkgk1j/index.m3u8', icon: <Newspaper className="w-5 h-5" /> },
  { id: '17', name: 'Bangla Tv', url: 'https://tvsen6.aynaott.com/39ee93nUbCCmm5LsyD4t/index.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '18', name: 'News 21 Bangla TV', url: 'http://103.190.133.68:1935/news21live/live/playlist.m3u8', icon: <Newspaper className="w-5 h-5" /> },
  { id: '19', name: 'channelihd', url: 'https://tvsen6.aynaott.com/FNHpYvGZ7FkCE10PwTHm/index.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '20', name: 'Boishakhi', url: 'https://tvsen6.aynaott.com/1d3uG9VCgrR9DRtWZM57/index.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '21', name: 'banglaVision', url: 'http://103.165.93.31:8095/banglaVision/tracks-v1a1/mono.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '22', name: 'My TV', url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/mytv-up-off.stream/playlist.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '23', name: 'N TV', url: 'https://tvsen5.aynaott.com/xV4jEKf3D9zc/index.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '24', name: 'Dipto Tv', url: 'https://byphdgllyk.gpcdn.net/hls/deeptotv/index.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '25', name: 'RAJDHANI TV HD', url: 'https://stream.shariarsuvo.com/hls6/rajdhaniweb.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '26', name: 'Ananda TV', url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/anandatv.stream/tracks-v1a1/mono.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '27', name: 'Ekushey TV', url: 'http://210.4.72.204/hls-live/livepkgr/_definst_/liveevent/livestream3.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '28', name: 'Channel-16', url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/channel16bd.stream/tracks-v1a1/mono.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '29', name: 'G-Serise', url: 'https://vods2.aynaott.com/gseriesDrama/tracks-v1a1/mono.ts.m3u8', icon: <Film className="w-5 h-5" /> },
  { id: '30', name: 'SANANDA TV', url: 'https://live.sanandatelevision.in/sananda/index.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '31', name: 'ZB Cartun TV', url: 'https://server.zillarbarta.com/zbcatun/video.m3u8', icon: <Child className="w-5 h-5" /> },
  { id: '32', name: 'ZB Cinema', url: 'https://server.zillarbarta.com/ZBCINEMA/index.m3u8', icon: <Film className="w-5 h-5" /> },
  { id: '33', name: 'ZB Music', url: 'https://server.zillarbarta.com/zbmusic/tracks-v1a1/mono.m3u8', icon: <Music className="w-5 h-5" /> },
  { id: '34', name: 'Bangla Plus', url: 'https://live-stream.utkalbongo.com/hls/livebanglatvstream.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '35', name: 'Star Jalsha HD+', url: 'https://iptvcable.netlify.app/Altogether-007/Kolkata/StarJalsha.m3u8', icon: <Star className="w-5 h-5" /> },
  { id: '36', name: 'Zee Bangla HD', url: 'http://103.165.93.31:8095/zeeBangla/tracks-v1a1/mono.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '37', name: 'Jalsha Movies HD', url: 'http://103.165.93.31:8095/jalshaMovies/tracks-v1a1/mono.m3u8', icon: <Film className="w-5 h-5" /> },
  { id: '38', name: 'Zee Bangla Cinema', url: 'https://d1g8wgjurz8via.cloudfront.net/bpk-tv/ColorsHD/default/ColorsHD.m3u8', icon: <Film className="w-5 h-5" /> },
  { id: '39', name: 'Colors Bangla', url: 'http://103.165.93.31:8095/colorsBangla/tracks-v1a1/mono.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '40', name: 'Sony Aath', url: 'https://stream.ottplus.bd/live/sony_aath_abr/live/sony_aath_720/chunks.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '41', name: 'Enter 10 Bangla', url: 'https://amg01448-samsungin-enterr10bangla-samsungin-ad-gg.amagi.tv/playlist/amg01448-samsungin-enterr10bangla-samsungin/playlist.m3u8', icon: <Tv className="w-5 h-5" /> },
  { id: '42', name: 'Star Plus HD', url: 'http://202.70.146.135:8000/play/a009/index.m3u8', icon: <Star className="w-5 h-5" /> },
  { id: '43', name: '&PICTURES', url: 'https://stream.ottplus.bd/live/and_picture_hd_abr/live/and_picture_hd_720/chunks.m3u8', icon: <Film className="w-5 h-5" /> },
  { id: '44', name: 'Zee Cinema HD', url: 'https://d1g8wgjurz8via.cloudfront.net/bpk-tv/NGCHD/default/NGCHD.m3u8', icon: <Film className="w-5 h-5" /> },
  { id: '45', name: 'Star Movies Select HD', url: 'http://66.102.126.10:8000/play/a020/index.m3u8', icon: <Film className="w-5 h-5" /> },
  { id: '46', name: 'B4U Movies', url: 'https://amg00877-b4unew-amg00877c2-xiaomi-in-5489.playouts.now.amagi.tv/playlist.m3u8', icon: <Film className="w-5 h-5" /> },
  { id: '47', name: 'Sheemaroo Bollywood', url: 'https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg00864-shemarooenterta-shemabollywood-ono/playlist.m3u8', icon: <Film className="w-5 h-5" /> },
  { id: '48', name: 'Sony PIX', url: 'https://stream.ottplus.bd/live/pix_hd_abr/live/sony_pix_hd_720/chunks.m3u8', icon: <Film className="w-5 h-5" /> },
  { id: '49', name: '24/7 Gopal Bhar', url: 'https://live20.bozztv.com/giatvplayout7/giatv-209611/index.m3u8', icon: <Child className="w-5 h-5" /> },
];

export default function LiveTVPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [activeChannel, setActiveChannel] = useState<Channel>(CHANNELS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [qualities, setQualities] = useState<{ value: number; label: string }[]>([]);

  // Function to Load Video Stream
  const loadStream = (url: string) => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hlsRef.current = hls;
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        const levels = hls.levels.map((level, index) => ({
          value: index,
          label: level.height ? `${level.height}p` : `${Math.round(level.bitrate / 1000)} kbps`,
        }));
        setQualities(levels);

        video.play().catch((e) => console.log('Autoplay blocked:', e));
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  };

  useEffect(() => {
    loadStream(activeChannel.url);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [activeChannel]);

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = parseInt(e.target.value, 10);
    }
  };

  const filteredChannels = CHANNELS_DATA.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen pb-24 font-sans radial-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#121216]/75 backdrop-blur-md border-b border-white/10 px-4 py-4 shadow-2xl">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Tv className="w-6 h-6 text-[#ff5500] drop-shadow-[0_0_8px_rgba(255,85,0,0.8)]" />
            <h1 className="text-xl font-extrabold uppercase tracking-wide">
              Mehedi <span className="text-[#ff5500]">Internet</span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] px-3 py-1 rounded-full text-xs font-semibold">
            <CircleDot className="w-3.5 h-3.5 animate-pulse" /> Live Streaming HD
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 mt-6">
        {/* Player Card */}
        <div className="bg-[#121216]/75 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6">
          <div className="relative w-full aspect-video bg-black">
            <video ref={videoRef} controls autoPlay playsInline className="w-full h-full object-contain" />
          </div>

          <div className="bg-[#0f0f14]/95 px-5 py-3.5 flex flex-wrap justify-between items-center gap-3 border-t border-white/10">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <span className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/40 text-red-500 px-2 py-0.5 rounded text-[11px] font-extrabold uppercase">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" /> LIVE
              </span>
              <span>বর্তমানে চলছে: {activeChannel.name}</span>
            </div>

            {/* Quality Selector */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Sliders className="w-4 h-4" />
              <select
                onChange={handleQualityChange}
                className="bg-white/5 text-white border border-white/10 px-3 py-1.5 rounded-lg text-xs outline-none focus:border-[#ff5500] focus:bg-[#ff5500]/10 transition-all cursor-pointer"
              >
                <option value="-1" className="bg-[#0a0a0c]">Auto (স্বয়ংক্রিয়)</option>
                {qualities.map((q) => (
                  <option key={q.value} value={q.value} className="bg-[#0a0a0c]">
                    {q.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top.1/2 -translate-y-1/2 text-gray-400 w-5 h-5 top-[30%]" />
          <input
            type="text"
            placeholder="আপনার পছন্দের চ্যানেলটি খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-5 py-4 rounded-xl border border-white/10 bg-[#121216]/75 backdrop-blur-md text-white text-sm outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] transition-all"
          />
        </div>

        {/* Section Title */}
        <div className="text-sm font-bold mb-4 text-gray-400 flex items-center gap-2">
          <Tv className="w-4 h-4" /> টিভি চ্যানেলসমূহ
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {filteredChannels.map((channel) => {
            const isActive = activeChannel.id === channel.id;
            return (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel)}
                className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2.5 transition-all text-center border relative overflow-hidden group ${
                  isActive
                    ? 'border-[#ff5500] bg-gradient-to-br from-[#ff5500]/20 to-[#141419]/80 shadow-[0_0_15px_rgba(255,85,0,0.4)]'
                    : 'bg-[#1a1a20]/70 border-white/10 hover:border-[#ff5500] hover:bg-[#282832]/90 hover:-translate-y-1 hover:shadow-lg'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#ff5500] border border-white/10">
                  {channel.icon}
                </div>
                <h4 className="text-xs font-semibold text-white break-words z-10">{channel.name}</h4>
              </button>
            );
          })}
        </div>
      </main>

      {/* Floating Footer Bar */}
      <footer className="fixed bottom-0 left-0 w-full bg-[#121216]/80 backdrop-blur-md border-t border-white/10 px-6 py-3 z-50 flex justify-between items-center shadow-2xl">
        <div className="text-sm font-semibold text-white">
          <span className="text-[#ff5500]">Mehedi Internet</span> Live TV Service
        </div>
        <a
          href="tel:01626886070"
          className="bg-gradient-to-r from-[#ff5500] to-[#e04800] text-white px-5 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-[0_4px_15px_rgba(255,85,0,0.4)] hover:scale-105 transition-all"
        >
          <Phone className="w-4 h-4" /> Call: 01626886070
        </a>
      </footer>
    </div>
  );
  }
