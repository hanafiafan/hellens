import React, { useRef, useEffect } from 'react';

// One pinned section, continuous phases (no section jump):
//   1) scrub the window frames
//   2) crossfade to the looping grassland video and dwell
//   3) fade the video out and scrub the clouds-ascent frames
//   4) cross-dissolve into the clouds pull-back frames (plane window)
//   5) cross-dissolve into the airplane-cabin walkthrough frames
const WIN_COUNT = 285;
const CLOUD_COUNT = 285;   // ascent
const CLOUD2_COUNT = 285;  // pull-back (plane window)
const CABIN_COUNT = 477;   // cabin walkthrough
// Satu klip panjang: kokpit -> jet di langit -> morph -> BMW M4 di garasi.
// Sumber 4K 60fps native 37.6 dtk, tanpa interpolasi. Penomoran 4 digit (>999 frame).
const FINALE_COUNT = 2259;
const winPath = (i) => `/window-frames/frame_${String(i).padStart(3, '0')}.webp`;
const cloudPath = (i) => `/clouds-frames/frame_${String(i).padStart(3, '0')}.webp`;
const cloud2Path = (i) => `/clouds2-frames/frame_${String(i).padStart(3, '0')}.webp`;
const cabinPath = (i) => `/cabin-frames/frame_${String(i).padStart(3, '0')}.webp`;
const finalePath = (i) => `/finale-frames/frame_${String(i).padStart(4, '0')}.webp`;

// Fase dari CLOUD dst. mengikuti satu klip demi satu klip, dipisah GAP vh yang
// sama-sama "diam" (outgoing tahan frame terakhir, incoming tahan frame pertama)
// sambil alpha dissolve — makin lebar GAP, makin landai pergantiannya terasa.
const GAP = 64; // dulu 32vh; digandakan supaya seam tidak terasa seperti "cut"
const WIN_END_VH = 240;
const GVID_START_VH = 304;    // video padang rumput fade in
const GVID_FULL_VH = 384;
const VOUT_START_VH = 544;
const VOUT_END_VH = 624;
const CANVAS_SWITCH_VH = 528; // canvas tukar window->clouds selagi video menutup
const CLOUD_START_VH = 608;

const CLIP_DURATIONS = [
  ['CLOUD', 272],    // awan naik
  ['CLOUD2', 240],   // awan tarik-mundur (jendela pesawat)
  ['CABIN', 416],    // kabin
  ['FINALE', 1600],  // kokpit -> jet -> mobil BMW M4 (satu klip utuh, 37.6 dtk sumber)
];
const CLIP_VH = {};
{
  let cursor = CLOUD_START_VH;
  for (const [name, dur] of CLIP_DURATIONS) {
    CLIP_VH[`${name}_START`] = cursor;
    cursor += dur;
    CLIP_VH[`${name}_END`] = cursor;
    cursor += GAP;
  }
}

// Setelah frame terakhir, crossfade ke video loop garasi lalu diam sejenak
// sambil video berputar (pola yang sama dengan video padang rumput di awal).
const LOOP_FADE_VH = 100;  // jarak crossfade frame -> video
const LOOP_DWELL_VH = 220; // ruang diam sambil loop berputar
const TRACK_VH = CLIP_VH.FINALE_END + LOOP_FADE_VH + LOOP_DWELL_VH + 100; // + 1 layar sticky
const SCROLL_VH = TRACK_VH - 100;
const p = (vh) => vh / SCROLL_VH;   // posisi absolut (vh) -> progress 0..1

const WIN_END = p(WIN_END_VH);
const GVID_START = p(GVID_START_VH);
const GVID_FULL = p(GVID_FULL_VH);
const VOUT_START = p(VOUT_START_VH);
const VOUT_END = p(VOUT_END_VH);
const CANVAS_SWITCH = p(CANVAS_SWITCH_VH);
const CLOUD_START = p(CLIP_VH.CLOUD_START);
const CLOUD_END = p(CLIP_VH.CLOUD_END);
const CLOUD2_START = p(CLIP_VH.CLOUD2_START);
const CLOUD2_END = p(CLIP_VH.CLOUD2_END);
const CABIN_START = p(CLIP_VH.CABIN_START);
const CABIN_END = p(CLIP_VH.CABIN_END);
const FINALE_START = p(CLIP_VH.FINALE_START);
const FINALE_END = p(CLIP_VH.FINALE_END);
const LOOP_IN0 = p(CLIP_VH.FINALE_END);
const LOOP_IN1 = p(CLIP_VH.FINALE_END + LOOP_FADE_VH);

const smooth = (a, b, x) => Math.min(1, Math.max(0, (x - a) / (b - a)));
// smoothstep — landai di kedua ujung, dipakai khusus untuk alpha dissolve/fade
// (bukan untuk target scrub frame) supaya transisi terasa melembut, bukan linear rata.
const ease = (t) => t * t * (3 - 2 * t);

export default function ScrollFrameSequence() {
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const loopVideoRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const loopVideo = loopVideoRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Tiap sequence di-fetch menjelang gilirannya dipakai (lihat gate di tick),
    // supaya tidak berebut bandwidth dengan frame yang terlihat lebih dulu.
    const seq = (path, n) => ({ path, n, imgs: [] });
    const winImgs = seq(winPath, WIN_COUNT);
    const cloudImgs = seq(cloudPath, CLOUD_COUNT);
    const cloud2Imgs = seq(cloud2Path, CLOUD2_COUNT);
    const cabinImgs = seq(cabinPath, CABIN_COUNT);
    const finaleImgs = seq(finalePath, FINALE_COUNT);

    const start = (s) => {
      if (s.imgs.length) return;
      for (let i = 1; i <= s.n; i++) {
        const img = new Image();
        // decoding async saja; JANGAN panggil img.decode() di onload — memaksa
        // decode penuh 2.259 bitmap 1600x900 sekaligus itu pemborosan memori,
        // sementara decode saat digambar terukur cuma ~0-2 ms.
        img.decoding = 'async';
        img.src = s.path(i);
        s.imgs.push(img);
      }
    };

    let winDisp = 0, cloudDisp = 0, cloud2Disp = 0, cabinDisp = 0, finaleDisp = 0;
    let raf = 0;

    const ready = (img) => img && img.complete && img.naturalWidth > 0;
    const drawImg = (img, alpha) => {
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale, h = ih * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };
    const drawSeq = ({ imgs }, count, pos, outA = 1) => {
      const i0 = Math.max(0, Math.min(count - 1, Math.floor(pos)));
      const i1 = Math.min(count - 1, i0 + 1);
      const t = pos - i0;
      const a = imgs[i0];
      if (!ready(a)) return;
      drawImg(a, outA);
      if (t > 0.001 && i1 !== i0 && ready(imgs[i1])) drawImg(imgs[i1], t * outA);
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w === canvas.width && h === canvas.height) return;
      canvas.width = w; canvas.height = h;
    };

    const tick = () => {
      const track = trackRef.current;
      if (track) {
        const total = track.offsetHeight - window.innerHeight;
        const rect = track.getBoundingClientRect();
        const prog = total > 0
          ? Math.min(1, Math.max(0, -rect.top / total))
          : 0;

        // ponytail: ambang fetch dipatok kasar ke progress, bukan ke bandwidth nyata.
        // Kalau di koneksi lambat masih ada frame yang telat, turunkan angkanya.
        if (rect.top < window.innerHeight * 1.5) {
          start(winImgs);
          start(cloudImgs);
          if (video.preload === 'none') { video.preload = 'auto'; video.load(); }
        }
        if (prog > p(400)) start(cloud2Imgs);
        if (prog > p(720)) start(cabinImgs);
        if (prog > p(1100)) start(finaleImgs); // 2256 frame, butuh runway panjang

        // scrub targets
        const winTarget = Math.min(1, prog / WIN_END) * (WIN_COUNT - 1);
        const cloudTarget = smooth(CLOUD_START, CLOUD_END, prog) * (CLOUD_COUNT - 1);
        const cloud2Target = smooth(CLOUD2_START, CLOUD2_END, prog) * (CLOUD2_COUNT - 1);
        const cabinTarget = smooth(CABIN_START, CABIN_END, prog) * (CABIN_COUNT - 1);
        const finaleTarget = smooth(FINALE_START, FINALE_END, prog) * (FINALE_COUNT - 1);
        winDisp = winTarget;
        cloudDisp = cloudTarget;
        cloud2Disp = cloud2Target;
        cabinDisp = cabinTarget;
        finaleDisp = finaleTarget;

        // grassland video opacity: fade in, hold, fade out
        const vOpacity = ease(smooth(GVID_START, GVID_FULL, prog)) * (1 - ease(smooth(VOUT_START, VOUT_END, prog)));
        video.style.opacity = vOpacity;
        if (prog >= GVID_START && prog <= VOUT_END + 0.02) {
          if (video.paused) { try { video.currentTime = 0; } catch { /* not seekable yet */ } video.play().catch(() => {}); }
        } else if (!video.paused) {
          video.pause();
          try { video.currentTime = 0; } catch { /* ignore */ }
        }

        // Video loop garasi: fade in di ujung fase FINALE lalu berputar terus.
        const loopOpacity = ease(smooth(LOOP_IN0, LOOP_IN1, prog));
        loopVideo.style.opacity = loopOpacity;
        if (prog > LOOP_IN0 - p(300) && loopVideo.preload === 'none') {
          loopVideo.preload = 'auto';
          loopVideo.load();
        }
        // prog mentok di 1 setelah track terlewat, jadi opacity saja tidak cukup:
        // cek juga panggungnya masih terlihat, supaya video tidak terus mendekode
        // di luar layar saat pengunjung sudah lanjut ke section berikutnya.
        const stageVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        if (loopOpacity > 0.01 && stageVisible) {
          if (loopVideo.paused) loopVideo.play().catch(() => {});
        } else if (!loopVideo.paused) {
          loopVideo.pause();
        }

        // canvas only matters when neither video is fully covering it
        if (vOpacity < 0.999 && loopOpacity < 0.999) {
          if (prog >= CANVAS_SWITCH) {
            // fade inside the gap where the outgoing seq holds its last frame and
            // the incoming seq holds its first frame -> still-to-still, no motion ghost
            const diss1 = ease(smooth(CLOUD_END, CLOUD2_START, prog)); // clouds2 over clouds
            const diss2 = ease(smooth(CLOUD2_END, CABIN_START, prog)); // cabin over clouds2
            const diss3 = ease(smooth(CABIN_END, FINALE_START, prog)); // finale over cabin
            if (diss1 < 0.999) drawSeq(cloudImgs, CLOUD_COUNT, cloudDisp, 1);
            if (diss1 > 0.001 && diss2 < 0.999) drawSeq(cloud2Imgs, CLOUD2_COUNT, cloud2Disp, diss1);
            if (diss2 > 0.001 && diss3 < 0.999) drawSeq(cabinImgs, CABIN_COUNT, cabinDisp, diss2);
            if (diss3 > 0.001) drawSeq(finaleImgs, FINALE_COUNT, finaleDisp, diss3);
          } else {
            drawSeq(winImgs, WIN_COUNT, winDisp, 1);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section ref={trackRef} id="window-sequence" className="relative" style={{ height: `${TRACK_VH}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
          style={{ opacity: 0 }}
        >
          <source src="/loop-section.mp4" type="video/mp4" />
        </video>
        <video
          ref={loopVideoRef}
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
          style={{ opacity: 0 }}
        >
          <source src="/garage-loop.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
