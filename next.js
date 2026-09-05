<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mehedi Internet - Premium Live TV</title>
  
  <!-- Google Fonts & Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  
  <!-- HLS.js CDN Library -->
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>

  <style>
    :root {
      --primary: #ff5500;
      --primary-glow: rgba(255, 85, 0, 0.4);
      --bg-dark: #0a0a0c;
      --card-bg: rgba(26, 26, 32, 0.7);
      --card-hover: rgba(40, 40, 50, 0.9);
      --text-main: #ffffff;
      --text-muted: #a0a0ab;
      --border-color: rgba(255, 255, 255, 0.08);
      --glass-bg: rgba(18, 18, 22, 0.75);
      --glass-border: rgba(255, 255, 255, 0.12);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-dark);
      background-image: radial-gradient(circle at 50% 0%, rgba(255, 85, 0, 0.08) 0%, transparent 50%);
      color: var(--text-main);
      font-family: 'Poppins', 'Hind Siliguri', sans-serif;
      padding-bottom: 90px;
      min-height: 100vh;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: var(--bg-dark);
    }
    ::-webkit-scrollbar-thumb {
      background: #2a2a35;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--primary);
    }

    /* Header Section */
    .header {
      background: var(--glass-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--glass-border);
      text-align: center;
      padding: 18px 15px;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .header-content {
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .brand-logo i {
      font-size: 24px;
      color: var(--primary);
      filter: drop-shadow(0 0 8px var(--primary));
    }

    .brand-logo h1 {
      color: #fff;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .brand-logo h1 span {
      color: var(--primary);
    }

    .header-badge {
      background: rgba(255, 85, 0, 0.15);
      border: 1px solid rgba(255, 85, 0, 0.3);
      color: var(--primary);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .main-container {
      max-width: 1050px;
      margin: 25px auto;
      padding: 0 15px;
    }

    /* Player Card Styling */
    .player-card {
      background: var(--glass-bg);
      backdrop-filter: blur(12px);
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid var(--glass-border);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 85, 0, 0.1);
      margin-bottom: 25px;
      transition: all 0.3s ease;
    }

    .video-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
      background: #000;
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    /* Player Control Bar */
    .now-playing-bar {
      background: rgba(15, 15, 20, 0.95);
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      border-top: 1px solid var(--border-color);
    }

    .now-playing {
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .live-indicator {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 0, 0, 0.15);
      border: 1px solid rgba(255, 0, 0, 0.4);
      color: #ff4d4d;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .now-playing-dot {
      height: 7px;
      width: 7px;
      background-color: #ff4d4d;
      border-radius: 50%;
      box-shadow: 0 0 8px #ff4d4d;
      animation: pulse 1.2s infinite;
    }

    .quality-control {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--text-muted);
    }

    .quality-select {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      border: 1px solid var(--border-color);
      padding: 6px 14px;
      border-radius: 8px;
      outline: none;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .quality-select:hover, .quality-select:focus {
      border-color: var(--primary);
      background: rgba(255, 85, 0, 0.1);
    }

    /* Search Bar */
    .search-container {
      margin-bottom: 25px;
      position: relative;
    }

    .search-box {
      width: 100%;
      padding: 16px 20px 16px 48px;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      background: var(--glass-bg);
      backdrop-filter: blur(8px);
      color: #fff;
      font-size: 15px;
      outline: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .search-box:focus {
      border-color: var(--primary);
      box-shadow: 0 0 20px var(--primary-glow);
    }

    .search-icon {
      position: absolute;
      left: 18px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 16px;
    }

    /* Channel Grid */
    .section-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 15px;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .channel-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
      gap: 14px;
    }

    .channel-card {
      background: var(--card-bg);
      border-radius: 14px;
      padding: 16px 10px;
      text-align: center;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      position: relative;
      overflow: hidden;
    }

    .channel-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba(255,85,0,0.1) 0%, rgba(0,0,0,0) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .channel-card:hover {
      background: var(--card-hover);
      transform: translateY(-5px);
      border-color: var(--primary);
      box-shadow: 0 10px 20px rgba(0,0,0,0.5), 0 0 12px var(--primary-glow);
    }

    .channel-card:hover::before {
      opacity: 1;
    }

    .channel-card.active {
      border-color: var(--primary);
      background: linear-gradient(145deg, rgba(255, 85, 0, 0.2), rgba(20, 20, 25, 0.8));
      box-shadow: 0 0 15px var(--primary-glow);
    }

    .channel-icon {
      width: 42px;
      height: 42px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      font-size: 18px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .channel-card h4 {
      margin: 0;
      font-size: 13px;
      color: #fff;
      font-weight: 600;
      word-break: break-word;
      z-index: 1;
    }

    /* Fixed Bottom Footer */
    .footer-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: var(--glass-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-top: 1px solid var(--glass-border);
      padding: 12px 25px;
      z-index: 999;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 -10px 25px rgba(0,0,0,0.8);
    }

    .footer-text {
      color: #fff;
      font-size: 14px;
      font-weight: 600;
    }

    .footer-text span {
      color: var(--primary);
    }

    .call-btn {
      background: linear-gradient(135deg, var(--primary), #e04800);
      color: #fff;
      text-decoration: none;
      padding: 9px 20px;
      border-radius: 30px;
      font-weight: 700;
      font-size: 13px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 15px var(--primary-glow);
    }

    .call-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(255, 85, 0, 0.6);
    }

    @keyframes pulse {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(1.2); }
      100% { opacity: 1; transform: scale(1); }
    }

    @media (max-width: 600px) {
      .channel-grid {
        grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
        gap: 10px;
      }
      .channel-card {
        padding: 12px 6px;
      }
      .channel-card h4 {
        font-size: 12px;
      }
      .now-playing-bar {
        flex-direction: column;
        align-items: flex-start;
      }
      .header-badge {
        display: none;
      }
    }
  </style>
</head>
<body>

  <!-- Top Header Section -->
  <div class="header">
    <div class="header-content">
      <a href="#" class="brand-logo">
        <i class="fa-solid fa-tv"></i>
        <h1>Mehedi <span>Internet</span></h1>
      </a>
      <div class="header-badge">
        <i class="fa-solid fa-circle-dot"></i> Live Streaming HD
      </div>
    </div>
  </div>

  <div class="main-container">
    <!-- Player Card -->
    <div class="player-card">
      <div class="video-wrapper">
        <video id="tv-player" controls autoplay playsinline></video>
      </div>
      <div class="now-playing-bar">
        <div class="now-playing">
          <div class="live-indicator">
            <span class="now-playing-dot"></span> LIVE
          </div>
          <span id="channel-title">বর্তমানে চলছে: SOMOY NEWS</span>
        </div>
        <!-- Video Quality Selector Dropdown -->
        <div class="quality-control">
          <i class="fa-solid fa-sliders"></i>
          <select id="qualitySelect" class="quality-select" onchange="changeQuality(this.value)">
            <option value="-1">Auto (স্বয়ংক্রিয়)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Search Input -->
    <div class="search-container">
      <i class="fa-solid fa-magnifying-glass search-icon"></i>
      <input type="text" id="search" class="search-box" placeholder="আপনার পছন্দের চ্যানেলটি খুঁজুন..." onkeyup="filterChannels()">
    </div>

    <!-- Section Title -->
    <div class="section-title">
      <i class="fa-solid fa-list"></i> টিভি চ্যানেলসমূহ
    </div>

    <!-- Channel Grid -->
    <div class="channel-grid" id="channel-list">
      
      <div class="channel-card active" onclick="changeChannel(this, 'https://tvsen6.aynaott.com/4XcqdovJzbbC9WdJA9gk/index.m3u8', 'SOMOY NEWS')">
        <div class="channel-icon"><i class="fa-solid fa-newspaper"></i></div>
        <h4>SOMOY NEWS</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI2/gazibdz.stream/live-orgin/gazibdz.stream/playlist.m3u8', 'Gazi TV')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Gazi TV</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://tvsen5.aynaott.com/TnMn5kZz8aLm/index.m3u8', 'T Sports')">
        <div class="channel-icon"><i class="fa-solid fa-trophy"></i></div>
        <h4>T Sports</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://tvsen6.aynaott.com/pF66Tkz0qFwP2aMMqHyt/index.m3u8', 'DBC News HD')">
        <div class="channel-icon"><i class="fa-solid fa-newspaper"></i></div>
        <h4>DBC News HD</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://tvsen5.aynaott.com/P3y2URgG7LDe/index.m3u8', 'ATN Bangla')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>ATN Bangla</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://tvsen5.aynaott.com/RtvHD/index.m3u8', 'RTV')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>RTV</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://tvsen6.aynaott.com/cdgr3tw6WoG7JyRnLbi0/index.m3u8', 'News 24')">
        <div class="channel-icon"><i class="fa-solid fa-newspaper"></i></div>
        <h4>News 24</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/globaltv.stream/index.m3u8', 'Ekhon')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Ekhon</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://mtv.sunplex.live/MAASRANGA/index.m3u8', 'Maasranga TV')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Maasranga TV</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'http://116.204.149.16/globaltv/index.m3u8', 'GLOBAL TV HD')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>GLOBAL TV HD</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://stream.ottplus.live/live/bijoy_tv_abr/index.m3u8', 'Bijoy Tv')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Bijoy Tv</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://dzkyvlfyge.erbvr.com/PeaceTvBangla/tracks-v3a1/mono.m3u8', 'Peace tv Bangla')">
        <div class="channel-icon"><i class="fa-solid fa-kaaba"></i></div>
        <h4>Peace tv Bangla</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/islamictvbd.stream/index.m3u8', 'Islamic tv')">
        <div class="channel-icon"><i class="fa-solid fa-kaaba"></i></div>
        <h4>Islamic tv</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://live1.entertv.com.bd/entertv/index.fmp4.m3u8', 'Enter TV')">
        <div class="channel-icon"><i class="fa-solid fa-film"></i></div>
        <h4>Enter TV</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://srknowapp.ncare.live/srktvhlswodrm/srktv.stream/playlist.m3u8', 'SRK')">
        <div class="channel-icon"><i class="fa-solid fa-film"></i></div>
        <h4>SRK</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://tvsen6.aynaott.com/KGdZEdA7qQ43dmPkgk1j/index.m3u8', 'JamunaTV')">
        <div class="channel-icon"><i class="fa-solid fa-newspaper"></i></div>
        <h4>JamunaTV</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://tvsen6.aynaott.com/39ee93nUbCCmm5LsyD4t/index.m3u8', 'Bangla Tv')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Bangla Tv</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'http://103.190.133.68:1935/news21live/live/playlist.m3u8', 'News 21 Bangla TV')">
        <div class="channel-icon"><i class="fa-solid fa-newspaper"></i></div>
        <h4>News 21 Bangla TV</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://tvsen6.aynaott.com/FNHpYvGZ7FkCE10PwTHm/index.m3u8', 'channelihd')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>channelihd</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://tvsen6.aynaott.com/1d3uG9VCgrR9DRtWZM57/index.m3u8', 'Boishakhi')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Boishakhi</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'http://103.165.93.31:8095/banglaVision/tracks-v1a1/mono.m3u8', 'banglaVision')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>banglaVision</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/mytv-up-off.stream/playlist.m3u8', 'My TV')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>My TV</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://tvsen5.aynaott.com/xV4jEKf3D9zc/index.m3u8', 'N TV')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>N TV</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://byphdgllyk.gpcdn.net/hls/deeptotv/index.m3u8', 'Dipto Tv')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Dipto Tv</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://stream.shariarsuvo.com/hls6/rajdhaniweb.m3u8', 'RAJDHANI TV HD')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>RAJDHANI TV HD</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/anandatv.stream/tracks-v1a1/mono.m3u8', 'Ananda TV')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Ananda TV</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'http://210.4.72.204/hls-live/livepkgr/_definst_/liveevent/livestream3.m3u8', 'Ekushey TV')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Ekushey TV</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/channel16bd.stream/tracks-v1a1/mono.m3u8', 'Channel-16')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Channel-16</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://vods2.aynaott.com/gseriesDrama/tracks-v1a1/mono.ts.m3u8', 'G-Serise')">
        <div class="channel-icon"><i class="fa-solid fa-film"></i></div>
        <h4>G-Serise</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://live.sanandatelevision.in/sananda/index.m3u8', 'SANANDA TV')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>SANANDA TV</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://server.zillarbarta.com/zbcatun/video.m3u8', 'ZB Cartun TV')">
        <div class="channel-icon"><i class="fa-solid fa-child"></i></div>
        <h4>ZB Cartun TV</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://server.zillarbarta.com/ZBCINEMA/index.m3u8', 'ZB Cinema')">
        <div class="channel-icon"><i class="fa-solid fa-film"></i></div>
        <h4>ZB Cinema</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://server.zillarbarta.com/zbmusic/tracks-v1a1/mono.m3u8', 'ZB Music')">
        <div class="channel-icon"><i class="fa-solid fa-music"></i></div>
        <h4>ZB Music</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://live-stream.utkalbongo.com/hls/livebanglatvstream.m3u8', 'Bangla Plus')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Bangla Plus</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://iptvcable.netlify.app/Altogether-007/Kolkata/StarJalsha.m3u8', 'Star Jalsha HD')">
        <div class="channel-icon"><i class="fa-solid fa-star"></i></div>
        <h4>Star Jalsha HD+</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'http://103.165.93.31:8095/zeeBangla/tracks-v1a1/mono.m3u8', 'Zee Bangla HD')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Zee Bangla HD</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'http://103.165.93.31:8095/jalshaMovies/tracks-v1a1/mono.m3u8', 'Jalsha Movies HD')">
        <div class="channel-icon"><i class="fa-solid fa-film"></i></div>
        <h4>Jalsha Movies HD</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://d1g8wgjurz8via.cloudfront.net/bpk-tv/ColorsHD/default/ColorsHD.m3u8', 'Zee Bangla Cinema')">
        <div class="channel-icon"><i class="fa-solid fa-film"></i></div>
        <h4>Zee Bangla Cinema</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'http://103.165.93.31:8095/colorsBangla/tracks-v1a1/mono.m3u8', 'Colors Bangla')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Colors Bangla</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://stream.ottplus.bd/live/sony_aath_abr/live/sony_aath_720/chunks.m3u8', 'Sony Aath')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Sony Aath</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://amg01448-samsungin-enterr10bangla-samsungin-ad-gg.amagi.tv/playlist/amg01448-samsungin-enterr10bangla-samsungin/playlist.m3u8', 'Enter 10 Bangla')">
        <div class="channel-icon"><i class="fa-solid fa-tv"></i></div>
        <h4>Enter 10 Bangla</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'http://202.70.146.135:8000/play/a009/index.m3u8', 'Star Plus HD')">
        <div class="channel-icon"><i class="fa-solid fa-star"></i></div>
        <h4>Star Plus HD</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://stream.ottplus.bd/live/and_picture_hd_abr/live/and_picture_hd_720/chunks.m3u8', '&PICTURES')">
        <div class="channel-icon"><i class="fa-solid fa-film"></i></div>
        <h4>&PICTURES</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://d1g8wgjurz8via.cloudfront.net/bpk-tv/NGCHD/default/NGCHD.m3u8', 'Zee Cinema HD')">
        <div class="channel-icon"><i class="fa-solid fa-film"></i></div>
        <h4>Zee Cinema HD</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'http://66.102.126.10:8000/play/a020/index.m3u8', 'Star Movies Select HD')">
        <div class="channel-icon"><i class="fa-solid fa-film"></i></div>
        <h4>Star Movies Select HD</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://amg00877-b4unew-amg00877c2-xiaomi-in-5489.playouts.now.amagi.tv/playlist.m3u8', 'B4U Movies')">
        <div class="channel-icon"><i class="fa-solid fa-film"></i></div>
        <h4>B4U Movies</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg00864-shemarooenterta-shemabollywood-ono/playlist.m3u8', 'Sheemaroo Bollywood')">
        <div class="channel-icon"><i class="fa-solid fa-film"></i></div>
        <h4>Sheemaroo Bollywood</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://stream.ottplus.bd/live/pix_hd_abr/live/sony_pix_hd_720/chunks.m3u8', 'Sony PIX')">
        <div class="channel-icon"><i class="fa-solid fa-film"></i></div>
        <h4>Sony PIX</h4>
      </div>

      <div class="channel-card" onclick="changeChannel(this, 'https://live20.bozztv.com/giatvplayout7/giatv-209611/index.m3u8', '24/7 Gopal Bhar')">
        <div class="channel-icon"><i class="fa-solid fa-child"></i></div>
        <h4>24/7 Gopal Bhar</h4>
      </div>

    </div>
  </div>

  <!-- Bottom Floating Bar -->
  <div class="footer-bar">
    <div class="footer-text">
      <span>Mehedi Internet</span> Live TV Service
    </div>
    <a href="tel:01626886070" class="call-btn">
      <i class="fa-solid fa-phone"></i> Call: 01626886070
    </a>
  </div>

  <!-- HLS Script Integration -->
  <script>
    var video = document.getElementById('tv-player');
    var qualitySelect = document.getElementById('qualitySelect');
    var hls = null;
    var defaultUrl = 'https://tvsen6.aynaott.com/4XcqdovJzbbC9WdJA9gk/index.m3u8';

    // Play Stream Function using HLS.js
    function playHlsStream(url) {
      if (Hls.isSupported()) {
        if (hls) {
          hls.destroy();
        }
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true
        });
        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
          qualitySelect.innerHTML = '<option value="-1">Auto (স্বয়ংক্রিয়)</option>';
          
          hls.levels.forEach(function(level, index) {
            var res = level.height ? level.height + 'p' : Math.round(level.bitrate / 1000) + ' kbps';
            var option = document.createElement('option');
            option.value = index;
            option.text = res;
            qualitySelect.appendChild(option);
          });

          video.play().catch(function(e){ console.log("Autoplay blocked:", e); });
        });
      }
      else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function() {
          video.play();
        });
      }
    }

    // Dynamic Quality Change Function
    function changeQuality(levelIndex) {
      if (hls) {
        hls.currentLevel = parseInt(levelIndex);
      }
    }

    // Load Default Channel
    playHlsStream(defaultUrl);

    // Channel Switching Logic
    function changeChannel(element, m3u8Url, channelName) {
      var cards = document.getElementsByClassName('channel-card');
      for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove('active');
      }
      if (element) {
        element.classList.add('active');
      }

      document.getElementById('channel-title').innerText = "বর্তমানে চলছে: " + channelName;
      playHlsStream(m3u8Url);
    }

    // Search Filter Logic
    function filterChannels() {
      var input = document.getElementById('search').value.toLowerCase();
      var cards = document.getElementsByClassName('channel-card');

      for (var i = 0; i < cards.length; i++) {
        var title = cards[i].getElementsByTagName('h4')[0].innerText.toLowerCase();
        if (title.includes(input)) {
          cards[i].style.display = "flex";
        } else {
          cards[i].style.display = "none";
        }
      }
    }
  </script>

</body>
</html>
