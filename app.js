(() => {
  "use strict";

  // ---------- State ----------
  let player = null;
  let playerReady = false;
  let powered = false;
  let isPlaying = false;
  let stationIndex = 0;
  let songIndex = 0;
  let volume = Number(localStorage.getItem("xmasRadioVolume")) || 70;
  let vuTimer = null;
  let vuL = 6, vuR = 6;
  let ytWatchdog = null;

  const savedStation = Number(localStorage.getItem("xmasRadioStation"));
  if (Number.isInteger(savedStation) && savedStation >= 0 && savedStation < STATIONS.length) {
    stationIndex = savedStation;
  }

  const FREQ_MIN = 88, FREQ_MAX = 108;
  const FAVICON_DATA_URI = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230a1430'/%3E%3Cpolygon points='50,15 30,55 70,55' fill='%232f6b3a'/%3E%3Cpolygon points='50,35 25,75 75,75' fill='%233b7a3f'/%3E%3Crect x='42' y='75' width='16' height='14' fill='%235c3a26'/%3E%3Ccircle cx='50' cy='20' r='5' fill='%23ffb648'/%3E%3C/svg%3E";

  // ---------- DOM ----------
  const el = {
    display: document.getElementById("display"),
    marquee: document.getElementById("marquee"),
    marqueeTrack: document.querySelector(".marquee-track"),
    stationName: document.getElementById("stationName"),
    vuL: document.getElementById("vuL"),
    vuR: document.getElementById("vuR"),
    dialNeedle: document.getElementById("dialNeedle"),
    dialLabels: document.getElementById("dialLabels"),
    grille: document.getElementById("grille"),
    powerBtn: document.getElementById("powerBtn"),
    playBtn: document.getElementById("playBtn"),
    prevBtn: document.getElementById("prevBtn"),
    nextBtn: document.getElementById("nextBtn"),
    volumeKnob: document.getElementById("volumeKnob"),
    volDown: document.getElementById("volDown"),
    volUp: document.getElementById("volUp"),
    stationButtons: document.getElementById("stationButtons"),
    hint: document.getElementById("hint"),
    lights: document.getElementById("lights"),
    shareBtn: document.getElementById("shareBtn"),
    shareMoreToggle: document.getElementById("shareMoreToggle"),
    shareMenu: document.getElementById("shareMenu"),
    shareEmailLink: document.getElementById("shareEmailLink"),
    shareSmsLink: document.getElementById("shareSmsLink"),
    shareQrBtn: document.getElementById("shareQrBtn"),
    shareMoreBtn: document.getElementById("shareMoreBtn"),
    qrOverlay: document.getElementById("qrOverlay"),
    qrClose: document.getElementById("qrClose"),
    qrImage: document.getElementById("qrImage"),
    qrUrl: document.getElementById("qrUrl"),
    gnomeRow: document.getElementById("gnomeRow"),
    countdown: document.getElementById("countdown"),
    countdownDigits: document.getElementById("countdownDigits"),
    cdDays: document.getElementById("cdDays"),
    cdHours: document.getElementById("cdHours"),
    cdMins: document.getElementById("cdMins"),
    cdSecs: document.getElementById("cdSecs"),
  };

  // ---------- Christmas countdown ----------
  (function initCountdown() {
    const now = new Date();
    const target = new Date(now.getFullYear(), 11, 25, 0, 0, 0, 0);
    let timer = null;

    function pad(n) { return String(n).padStart(2, "0"); }

    function tick() {
      const diff = target - new Date();
      if (diff <= 0) {
        clearInterval(timer);
        el.countdown.classList.add("arrived");
        el.countdownDigits.innerHTML = `<span class="countdown-arrived-text">MERRY CHRISTMAS!</span>`;
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      el.cdDays.textContent = pad(days);
      el.cdHours.textContent = pad(hours);
      el.cdMins.textContent = pad(mins);
      el.cdSecs.textContent = pad(secs);
    }

    tick();
    timer = setInterval(tick, 1000);
  })();

  // ---------- Gnomes ----------
  const GNOME_PALETTE = [
    { hat: "#c23b3b", coat: "#c23b3b", skin: "#e0b183", cheek: "#e8899b" },
    { hat: "#3b7a3f", coat: "#3b7a3f", skin: "#d39a68", cheek: "#e37f85" },
    { hat: "#c9a24b", coat: "#8a5c2e", skin: "#e0b183", cheek: "#e8899b" },
    { hat: "#2f6b8f", coat: "#2f6b8f", skin: "#d39a68", cheek: "#e37f85" },
    { hat: "#7a3b8f", coat: "#7a3b8f", skin: "#e0b183", cheek: "#e8899b" },
  ];

  function gnomeSVG() {
    return `
      <svg viewBox="0 0 120 180">
        <ellipse class="gnome-boot" cx="44" cy="171" rx="13" ry="7"></ellipse>
        <ellipse class="gnome-boot" cx="76" cy="171" rx="13" ry="7"></ellipse>

        <path class="gnome-coat" d="M60,94 C34,94 20,122 24,150 C27,166 42,174 60,174 C78,174 93,166 96,150 C100,122 86,94 60,94 Z"></path>

        <path class="gnome-coat gnome-arm-l" d="M40,100 C20,106 12,124 20,140 C25,150 37,151 41,142 C33,130 34,114 44,104 Z"></path>
        <path class="gnome-coat gnome-arm-r" d="M80,100 C100,106 108,124 100,140 C95,150 83,151 79,142 C87,130 86,114 76,104 Z"></path>

        <rect class="gnome-belt" x="26" y="130" width="68" height="11" rx="5"></rect>
        <rect class="gnome-buckle" x="53" y="128" width="14" height="15" rx="2"></rect>

        <circle class="gnome-mitten" cx="19" cy="142" r="9"></circle>
        <circle class="gnome-mitten" cx="101" cy="142" r="9"></circle>

        <ellipse class="gnome-skin" cx="60" cy="56" rx="23" ry="19"></ellipse>

        <path class="gnome-beard" d="M34,68 C26,60 33,49 44,52 C46,41 74,41 76,52 C87,49 94,60 86,68 C96,77 93,96 84,103 C89,114 82,125 71,122 C69,133 51,133 49,122 C38,125 31,114 36,103 C27,96 24,77 34,68 Z"></path>

        <path class="gnome-fur" d="M32,46 C30,39 41,34 60,34 C79,34 90,39 88,46 C91,51 79,56 60,56 C41,56 29,51 32,46 Z"></path>
        <path class="gnome-hat" d="M37,42 C34,24 42,6 56,4 C68,2 80,10 82,22 C84,32 76,38 68,32 C72,42 64,48 55,44 C58,50 50,52 43,48 C39,46 37,44 37,42 Z"></path>
        <circle class="gnome-fur" cx="78" cy="22" r="7"></circle>

        <ellipse class="gnome-cheek" cx="43" cy="47" rx="6.5" ry="4.5"></ellipse>
        <ellipse class="gnome-cheek" cx="77" cy="47" rx="6.5" ry="4.5"></ellipse>
        <ellipse class="gnome-nose" cx="60" cy="63" rx="8.5" ry="7.5"></ellipse>
        <path class="gnome-brow" d="M42,44 Q49,37 56,44"></path>
        <path class="gnome-brow" d="M64,44 Q71,37 78,44"></path>
      </svg>`;
  }

  function buildGnomes() {
    el.gnomeRow.innerHTML = GNOME_PALETTE.map((c) => `
      <div class="gnome" style="--gnome-hat:${c.hat}; --gnome-coat:${c.coat}; --gnome-skin:${c.skin}; --gnome-cheek:${c.cheek};">
        ${gnomeSVG()}
      </div>`).join("");
  }

  // ---------- Lights ----------
  (function buildLights() {
    const colors = ["#e53935", "#43a047", "#fbc02d", "#1e88e5", "#ff6f91"];
    const count = Math.max(10, Math.floor(window.innerWidth / 40));
    for (let i = 0; i < count; i++) {
      const bulb = document.createElement("span");
      bulb.className = "bulb";
      const color = colors[i % colors.length];
      bulb.style.color = color;
      bulb.style.background = color;
      bulb.style.animationDelay = (Math.random() * 2.4).toFixed(2) + "s";
      el.lights.appendChild(bulb);
    }
  })();

  // ---------- Snow ----------
  (function snow() {
    const canvas = document.getElementById("snow");
    const ctx = canvas.getContext("2d");
    let flakes = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      flakes = Array.from({ length: count }, makeFlake);
    }
    function makeFlake() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.2 + 1,
        speed: Math.random() * 0.8 + 0.3,
        drift: Math.random() * 0.6 - 0.3,
        wobble: Math.random() * Math.PI * 2,
      };
    }
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      for (const f of flakes) {
        f.wobble += 0.01;
        f.x += f.drift + Math.sin(f.wobble) * 0.3;
        f.y += f.speed;
        if (f.y > canvas.height) { f.y = -4; f.x = Math.random() * canvas.width; }
        if (f.x > canvas.width) f.x = 0;
        if (f.x < 0) f.x = canvas.width;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    window.addEventListener("resize", resize);
    resize();
    tick();
  })();

  // ---------- Dial scale ----------
  (function buildDialScale() {
    const ticks = [88, 92, 96, 100, 104, 108];
    el.dialLabels.innerHTML = ticks.map((t) => `<span>${t}</span>`).join("");
  })();

  function freqToPercent(freq) {
    const pct = ((freq - FREQ_MIN) / (FREQ_MAX - FREQ_MIN)) * 100;
    return Math.min(95, Math.max(5, pct));
  }

  // ---------- Station presets ----------
  function buildStationButtons() {
    el.stationButtons.innerHTML = "";
    STATIONS.forEach((st, i) => {
      const btn = document.createElement("button");
      btn.className = "preset-btn";
      btn.textContent = `${st.name} ${st.freq}`;
      btn.addEventListener("click", () => selectStation(i, 0));
      el.stationButtons.appendChild(btn);
    });
    highlightStationButton();
  }
  function highlightStationButton() {
    [...el.stationButtons.children].forEach((btn, i) => {
      btn.classList.toggle("active", i === stationIndex);
    });
  }

  // ---------- Marquee ----------
  function escapeHtml(s) {
    return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }

  function setMarquee(text) {
    el.marquee.classList.remove("scroll");
    el.marquee.style.animationDuration = "";
    const safe = escapeHtml(text);
    el.marquee.innerHTML = `<span class="mq-copy">${safe}</span>`;

    requestAnimationFrame(() => {
      const copy = el.marquee.querySelector(".mq-copy");
      const overflow = copy.scrollWidth > el.marqueeTrack.clientWidth;
      if (!overflow) return;

      const gap = " ".repeat(10);
      el.marquee.innerHTML =
        `<span class="mq-copy">${safe}${gap}</span>` +
        `<span class="mq-copy">${safe}${gap}</span>`;

      requestAnimationFrame(() => {
        const singleWidth = el.marquee.querySelector(".mq-copy").scrollWidth;
        const duration = Math.max(8, singleWidth / 55);
        el.marquee.style.animationDuration = duration + "s";
        el.marquee.classList.add("scroll");
      });
    });
  }

  // ---------- VU meters ----------
  function startVU() {
    stopVU();
    let targetL = 30, targetR = 30;
    vuTimer = setInterval(() => {
      if (Math.random() < 0.35) targetL = Math.random() * 82 + 8;
      if (Math.random() < 0.35) targetR = Math.random() * 82 + 8;
      vuL += (targetL - vuL) * 0.35;
      vuR += (targetR - vuR) * 0.35;
      el.vuL.style.width = vuL + "%";
      el.vuR.style.width = vuR + "%";
    }, 120);
  }
  function stopVU() {
    clearInterval(vuTimer);
    vuTimer = null;
    vuL = vuR = 6;
    el.vuL.style.width = "6%";
    el.vuR.style.width = "6%";
  }

  // ---------- Playback ----------
  function currentStation() { return STATIONS[stationIndex]; }
  function currentSong() { return currentStation().songs[songIndex]; }

  function loadSong(autoplay) {
    const station = currentStation();
    const song = currentSong();
    el.dialNeedle.style.left = freqToPercent(parseFloat(station.freq)) + "%";
    el.stationName.textContent = `${station.name} • ${station.freq} FM`;
    setMarquee(`${song.title.toUpperCase()}  —  ${song.artist.toUpperCase()}`);
    highlightStationButton();
    updateMediaSessionMetadata(station, song);

    if (!playerReady) return;
    if (autoplay) {
      player.loadVideoById(song.videoId);
    } else {
      player.cueVideoById(song.videoId);
    }
  }

  function selectStation(idx, songIdx) {
    stationIndex = (idx + STATIONS.length) % STATIONS.length;
    songIndex = songIdx || 0;
    localStorage.setItem("xmasRadioStation", String(stationIndex));
    loadSong(powered && isPlaying);
  }

  function changeSong(delta) {
    const songs = currentStation().songs;
    songIndex = (songIndex + delta + songs.length) % songs.length;
    loadSong(true);
  }

  function setPlaying(playing) {
    isPlaying = playing;
    el.playBtn.textContent = playing ? "⏸" : "▶";
    el.grille.classList.toggle("playing", playing);
    el.gnomeRow.classList.toggle("dancing", playing);
    if (playing) startVU(); else stopVU();
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = playing ? "playing" : "paused";
    }
  }

  // ---------- Media Session (Mac/Windows media keys, Bluetooth remotes) ----------
  function updateMediaSessionMetadata(station, song) {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: song.title,
      artist: song.artist,
      album: station.name,
      artwork: [{ src: FAVICON_DATA_URI, sizes: "100x100", type: "image/svg+xml" }],
    });
  }

  function setupMediaSession() {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.setActionHandler("play", () => {
      if (!powered) { setPowered(true); return; }
      if (playerReady) player.playVideo();
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      if (playerReady) player.pauseVideo();
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => { if (powered) changeSong(-1); });
    navigator.mediaSession.setActionHandler("nexttrack", () => { if (powered) changeSong(1); });
  }

  function setPowered(on) {
    powered = on;
    el.powerBtn.classList.toggle("on", on);
    if (on) {
      el.playBtn.classList.remove("pulse-hint");
      el.hint.classList.remove("hint-glow");
      el.hint.textContent = "Use the preset buttons to change stations";
      if (playerReady) {
        loadSong(true);
      } else {
        setMarquee("TUNING IN…");
        clearTimeout(ytWatchdog);
        ytWatchdog = setTimeout(() => {
          if (!playerReady && powered) {
            setMarquee("CAN'T REACH YOUTUBE");
            el.hint.textContent = "Check your ad-blocker or connection, then reload the page";
          }
        }, 8000);
      }
    } else {
      if (playerReady) player.pauseVideo();
      setPlaying(false);
      setMarquee("POWER OFF");
      el.stationName.innerHTML = "&nbsp;";
      el.hint.textContent = "Tap the big ▶ button to play music again";
    }
  }

  // ---------- Volume knob ----------
  function applyVolume() {
    const deg = -135 + (volume / 100) * 270;
    el.volumeKnob.style.transform = `rotate(${deg}deg)`;
    if (playerReady) player.setVolume(volume);
    localStorage.setItem("xmasRadioVolume", String(volume));
  }
  function setupVolumeKnob() {
    let dragging = false;
    let startY = 0;
    let startVolume = volume;

    function start(y) {
      dragging = true;
      startY = y;
      startVolume = volume;
    }
    function move(y) {
      if (!dragging) return;
      const delta = startY - y;
      volume = Math.min(100, Math.max(0, startVolume + delta));
      applyVolume();
    }
    function end() { dragging = false; }

    el.volumeKnob.addEventListener("mousedown", (e) => start(e.clientY));
    window.addEventListener("mousemove", (e) => move(e.clientY));
    window.addEventListener("mouseup", end);

    el.volumeKnob.addEventListener("touchstart", (e) => start(e.touches[0].clientY), { passive: true });
    window.addEventListener("touchmove", (e) => move(e.touches[0].clientY), { passive: true });
    window.addEventListener("touchend", end);

    el.volumeKnob.addEventListener("wheel", (e) => {
      e.preventDefault();
      volume = Math.min(100, Math.max(0, volume - Math.sign(e.deltaY) * 4));
      applyVolume();
    }, { passive: false });

    el.volDown.addEventListener("click", () => {
      volume = Math.max(0, volume - 10);
      applyVolume();
    });
    el.volUp.addEventListener("click", () => {
      volume = Math.min(100, volume + 10);
      applyVolume();
    });
  }

  // ---------- Controls ----------
  el.powerBtn.addEventListener("click", () => setPowered(!powered));

  function togglePlayPause() {
    if (!powered) {
      setPowered(true);
      return;
    }
    if (!playerReady) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  }

  el.playBtn.addEventListener("click", togglePlayPause);

  // Fallback for hardware media keys (Mac rewind/play-pause/fast-forward, etc.)
  // that reach the page as regular key events rather than through the
  // Media Session API (e.g. when the OS hasn't claimed a Now Playing session).
  document.addEventListener("keydown", (e) => {
    if (e.code === "MediaTrackPrevious") {
      if (powered) changeSong(-1);
      e.preventDefault();
    } else if (e.code === "MediaTrackNext") {
      if (powered) changeSong(1);
      e.preventDefault();
    } else if (e.code === "MediaPlayPause") {
      togglePlayPause();
      e.preventDefault();
    }
  });

  el.prevBtn.addEventListener("click", () => { if (powered) changeSong(-1); });
  el.nextBtn.addEventListener("click", () => { if (powered) changeSong(1); });

  function isTouchPrimary() {
    return window.matchMedia("(pointer: coarse)").matches;
  }

  const SHARE_TEXT = "Check out this fun Christmas radio! 80+ Christmas songs across nine stations, with a countdown to Christmas morning.";

  async function nativeShare() {
    try {
      await navigator.share({ title: "Christmas Radio", text: SHARE_TEXT, url: location.href });
    } catch (e) { /* user cancelled */ }
  }

  async function copyLink(target) {
    try {
      await navigator.clipboard.writeText(location.href);
      flashCopied(target);
    } catch (e) {
      el.hint.textContent = location.href;
    }
  }

  function flashCopied(target) {
    const original = target.textContent;
    target.textContent = "Copied!";
    target.classList.add("copied");
    setTimeout(() => {
      target.textContent = original;
      target.classList.remove("copied");
    }, 2000);
  }

  function openShareMenu() {
    el.shareEmailLink.href = `mailto:?subject=${encodeURIComponent("Christmas Radio")}&body=${encodeURIComponent(SHARE_TEXT + " " + location.href)}`;
    el.shareSmsLink.href = `sms:?body=${encodeURIComponent(SHARE_TEXT + " " + location.href)}`;
    el.shareMoreBtn.hidden = !navigator.share;
    el.shareMenu.hidden = false;
  }

  function closeShareMenu() {
    el.shareMenu.hidden = true;
  }

  function openQrOverlay() {
    const url = location.href;
    el.qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`;
    el.qrUrl.textContent = url;
    el.qrOverlay.hidden = false;
  }

  function closeQrOverlay() {
    el.qrOverlay.hidden = true;
  }

  function setupShareMenu() {
    el.shareBtn.addEventListener("click", () => {
      if (isTouchPrimary() && navigator.share) {
        nativeShare();
        return;
      }
      copyLink(el.shareBtn);
    });

    el.shareMoreToggle.addEventListener("click", () => {
      el.shareMenu.hidden ? openShareMenu() : closeShareMenu();
    });

    el.shareQrBtn.addEventListener("click", () => {
      closeShareMenu();
      openQrOverlay();
    });
    el.shareMoreBtn.addEventListener("click", () => {
      closeShareMenu();
      nativeShare();
    });
    el.shareEmailLink.addEventListener("click", closeShareMenu);
    el.shareSmsLink.addEventListener("click", closeShareMenu);

    document.addEventListener("click", (e) => {
      if (!el.shareMenu.hidden && !e.target.closest(".share-wrap")) closeShareMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      closeShareMenu();
      closeQrOverlay();
    });

    el.qrClose.addEventListener("click", closeQrOverlay);
    el.qrOverlay.addEventListener("click", (e) => {
      if (e.target === el.qrOverlay) closeQrOverlay();
    });
  }

  // ---------- Init ----------
  buildGnomes();
  buildStationButtons();
  setupVolumeKnob();
  setupShareMenu();
  setupMediaSession();
  applyVolume();
  setMarquee("POWER OFF");

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("ytplayer", {
      height: "1",
      width: "1",
      playerVars: { autoplay: 0, controls: 0, modestbranding: 1, rel: 0, playsinline: 1 },
      events: {
        onReady: () => {
          playerReady = true;
          clearTimeout(ytWatchdog);
          player.setVolume(volume);
          if (powered) loadSong(true);
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) setPlaying(true);
          else if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
          else if (e.data === YT.PlayerState.ENDED) changeSong(1);
        },
      },
    });
  };
})();
