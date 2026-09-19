import React, { useEffect, useRef } from 'react';
import HeroSection from './HeroSection';
import { ArrowUpRight } from 'lucide-react';
import { LiquidGlass } from './LiquidGlass';
import { PILLARS } from './ServicesSection';

const FRAME_COUNT = 485; // native 60fps source (~8s), smooth
const framePath = (i) => `/scroll-frames/frame_${String(i).padStart(3, '0')}.webp`;
const TRACK_VH = 800;                 // 440vh scrub + ruang untuk kartu layanan
const SCROLL_VH = TRACK_VH - 100;     // jarak scroll efektif (track - 1 layar sticky)
const p = (vh) => vh / SCROLL_VH;     // posisi absolut (vh) -> progress 0..1
const FRAME_LERP = 0.14;

// Semua fase dipatok dalam vh absolut, bukan pecahan progress, supaya kecepatan
// scrub tidak berubah kalau TRACK_VH digeser lagi.
const SEQ_START = p(17);
const SEQ_END = p(265);               // frame selesai; sisanya video loop + kartu
const ENDV_IN0 = p(248), ENDV_IN1 = p(265);
const TAG_IN0 = p(275), TAG_IN1 = p(302), TAG_OUT0 = p(320), TAG_OUT1 = p(345);
const CARD_START = 340, CARD_VH = 100; // tiap kartu punya 100vh scroll sendiri
const CARD_IN1 = 30, CARD_OUT0 = 72;   // offset fade-in selesai / fade-out mulai
const SEAM_IN0 = p(CARD_START + PILLARS.length * CARD_VH), SEAM_IN1 = p(SCROLL_VH);

const smooth = (a, b, x) => Math.min(1, Math.max(0, (x - a) / (b - a)));

// WebGL version of the pinned hero + scroll frame sequence.
// Two frame textures (the pair around the eased position) are cross-dissolved in
// a fragment shader (mix), so the scrub is GPU-smooth with no decode flicker.
// Only 2 textures live on the GPU at once; frames upload on demand.
export default function HeroScrollStageGL({ active = true, lenisRef, ...heroProps }) {
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const endVideoRef = useRef(null);
  const ctaRef = useRef(null);
  const seamRef = useRef(null);
  const cardsRef = useRef([]);

  // Intro video loops at rest; scrolling drives the frame animation (no scroll lock).
  useEffect(() => {
    if (!active) return;
    const video = contentRef.current && contentRef.current.querySelector('video');
    if (video) { video.loop = true; video.play().catch(() => {}); }
  }, [active]);

  // WebGL renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    const content = contentRef.current;
    const video = content.querySelector('video');
    const endVideo = endVideoRef.current;
    const cta = ctaRef.current;
    const seam = seamRef.current;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false });
    if (!gl) { console.warn('WebGL unavailable — use HeroScrollStage (Canvas2D) instead.'); return; }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // --- program ---
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,
      'attribute vec2 aPos; varying vec2 vUv; void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }'));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER,
      'precision mediump float; varying vec2 vUv; uniform sampler2D uA; uniform sampler2D uB;' +
      'uniform float uMix; uniform vec2 uScale; uniform vec2 uOffset;' +
      'uniform float uBlur; uniform vec2 uDir;' +
      'const int TAPS = 6;' +
      'void main(){' +
      '  vec2 base = vUv*uScale+uOffset;' +
      '  vec3 col = vec3(0.0);' +
      '  for (int i=0;i<TAPS;i++){' +
      '    float f = (float(i)/float(TAPS-1) - 0.5);' +      // -0.5..0.5
      '    vec2 uv = base + uDir*uBlur*f;' +
      '    vec3 a = texture2D(uA,uv).rgb;' +
      '    vec3 b = texture2D(uB,uv).rgb;' +
      '    col += mix(a,b,uMix);' +
      '  }' +
      '  gl_FragColor = vec4(col/float(TAPS), 1.0);' +
      '}'));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uA = gl.getUniformLocation(prog, 'uA');
    const uB = gl.getUniformLocation(prog, 'uB');
    const uMix = gl.getUniformLocation(prog, 'uMix');
    const uScale = gl.getUniformLocation(prog, 'uScale');
    const uOffset = gl.getUniformLocation(prog, 'uOffset');
    const uBlur = gl.getUniformLocation(prog, 'uBlur');
    const uDir = gl.getUniformLocation(prog, 'uDir');
    gl.uniform1i(uA, 0);
    gl.uniform1i(uB, 1);
    gl.uniform2f(uDir, 1.0, 0.0); // blur along the horizontal camera pan

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const makeTex = () => {
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return t;
    };
    const texA = makeTex();
    const texB = makeTex();
    let idxA = -1, idxB = -1;
    const uploadTo = (tex, unit, img) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    };

    // --- frames ---
    const images = [];
    let imgAspect = 16 / 9;
    const ready = (img) => img && img.complete && img.naturalWidth > 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => { if (img.decode) img.decode().catch(() => {}); if (imgAspect === 16 / 9 && img.naturalHeight) imgAspect = img.naturalWidth / img.naturalHeight; };
      img.src = framePath(i);
      images.push(img);
    }

    let displayed = 0;
    let raf = 0;

    const resize = () => {
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w === canvas.width && h === canvas.height) return;
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    const setCoverUniforms = () => {
      const canvasAspect = canvas.width / canvas.height;
      let sx = 1, sy = 1;
      if (canvasAspect > imgAspect) sy = imgAspect / canvasAspect; else sx = canvasAspect / imgAspect;
      gl.uniform2f(uScale, sx, sy);
      gl.uniform2f(uOffset, (1 - sx) / 2, (1 - sy) / 2);
    };

    const tick = () => {
      const track = trackRef.current;
      if (track) {
        const total = track.offsetHeight - window.innerHeight;
        const prog = total > 0 ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / total)) : 0;

        const frameProg = smooth(SEQ_START, SEQ_END, prog);
        const target = frameProg * (FRAME_COUNT - 1);
        displayed += (target - displayed) * FRAME_LERP;
        if (Math.abs(target - displayed) < 0.001) displayed = target;

        const i0 = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(displayed)));
        const i1 = Math.min(FRAME_COUNT - 1, i0 + 1);
        const t = displayed - i0;

        if (idxA !== i0 && ready(images[i0])) { uploadTo(texA, 0, images[i0]); idxA = i0; }
        if (idxB !== i1 && ready(images[i1])) { uploadTo(texB, 1, images[i1]); idxB = i1; }

        if (idxA === i0) {
          setCoverUniforms();
          gl.uniform1f(uMix, idxB === i1 ? t : 0);
          gl.uniform1f(uBlur, 0); // motion blur disabled — crisp frames while scrubbing
          gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texA);
          gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texB);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }

        const contentOpacity = Math.max(0, 1 - prog / SEQ_START);
        content.style.opacity = contentOpacity;
        content.style.pointerEvents = contentOpacity < 0.1 ? 'none' : 'auto';

        if (video && video.loop) {
          if (prog < SEQ_START * 0.8) { if (video.paused) video.play().catch(() => {}); }
          else if (!video.paused) video.pause();
        }

        // End-of-sequence looping video: crossfade in as the frames finish (~SEQ_END).
        if (endVideo) {
          const endOpacity = smooth(ENDV_IN0, ENDV_IN1, prog);
          endVideo.style.opacity = endOpacity;
          if (prog > ENDV_IN0 - p(10)) { if (endVideo.paused) endVideo.play().catch(() => {}); }
          else if (!endVideo.paused) endVideo.pause();
        }

        // Seam softener: fade in the blur/color band as the bottom edge nears the next section.
        if (seam) seam.style.opacity = smooth(SEAM_IN0, SEAM_IN1, prog);

        // Tagline di dinding kosong: muncul saat video settle, lalu pamit sebelum kartu masuk.
        if (cta) {
          cta.style.opacity = smooth(TAG_IN0, TAG_IN1, prog) * (1 - smooth(TAG_OUT0, TAG_OUT1, prog));
        }

        // Kartu layanan: satu kartu per ~100vh scroll, hanya satu yang tampak.
        cardsRef.current.forEach((el, i) => {
          if (!el) return;
          const base = CARD_START + i * CARD_VH;
          const a = smooth(p(base), p(base + CARD_IN1), prog)
                  * (1 - smooth(p(base + CARD_OUT0), p(base + CARD_VH), prog));
          el.style.opacity = a;
          el.style.transform = `translateY(${(1 - a) * 28}px)`;
          el.style.visibility = a < 0.01 ? 'hidden' : 'visible';
        });
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      gl.deleteTexture(texA); gl.deleteTexture(texB);
      gl.deleteBuffer(quad); gl.deleteProgram(prog);
    };
  }, []);

  return (
    <section ref={trackRef} id="hero-scroll" className="relative" style={{ height: `${TRACK_VH}vh` }}>
      {/* Anchor nav "Layanan": konten layanan sekarang hidup di dalam track hero ini,
          jadi anchor-nya ditaruh tepat di kedalaman scroll tempat kartu pertama muncul. */}
      <span id="services" aria-hidden="true" className="absolute left-0 h-px w-px" style={{ top: `${CARD_START + 38}vh` }} />
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#8fd0d8]">
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full pointer-events-none" />

        {/* End-of-sequence seamless loop (fades in over the final frames) */}
        <video
          ref={endVideoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
          style={{ opacity: 0 }}
        >
          <source src="/end-loop.mp4" type="video/mp4" />
        </video>

        <div ref={contentRef} className="absolute inset-0">
          <HeroSection {...heroProps} />
        </div>

        {/* Soft blur + color fade at the bottom edge so the stage melts into the
            next section instead of a hard seam. Only appears as the seam nears. */}
        <div ref={seamRef} className="pointer-events-none absolute inset-x-0 bottom-0 h-[16vh]" style={{ opacity: 0 }}>
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(7px)',
              WebkitBackdropFilter: 'blur(7px)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, #000 90%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 90%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f4f9f7]" />
        </div>

        {/* Kartu layanan di dinding kosong — satu per satu mengikuti scroll.
            Kartu yang belum gilirannya dapat visibility:hidden, jadi otomatis
            lepas dari urutan tab dan tidak dibaca screen reader. */}
        <div className="pointer-events-none absolute inset-0">
          <div className="relative h-full w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
            {PILLARS.map(({ icon: Icon, name, desc, items, slug }, i) => (
              <div
                key={name}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="absolute inset-y-0 right-6 sm:right-12 lg:right-16 left-6 sm:left-auto flex items-center justify-center sm:justify-end pb-[10vh] sm:pb-[14vh]"
                style={{ opacity: 0, visibility: 'hidden', willChange: 'opacity, transform' }}
              >
                <LiquidGlass className="rounded-[28px] w-full sm:w-[26rem] lg:w-[30rem]">
                  <div className="rounded-[28px] bg-white/25 p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <Icon className="w-6 h-6 text-[#042718]" />
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#042718]/55">
                        {String(i + 1).padStart(2, '0')} / {String(PILLARS.length).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-4 font-heavy uppercase text-base sm:text-lg leading-[1.05] tracking-[-0.02em] text-[#042718]">{name}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#042718]/80 leading-relaxed">{desc}</p>
                    <ul className="mt-5 pt-4 border-t border-[#042718]/15 space-y-2">
                      {items.map((item) => (
                        <li key={item} className="text-[11px] sm:text-xs font-mono text-[#042718]/75 flex gap-2">
                          <span className="text-emerald-700">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`/karya/#${slug}`}
                      className="pointer-events-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#042718] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#063a22] transition-colors"
                    >
                      <span>Lihat karyanya</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </LiquidGlass>
              </div>
            ))}
          </div>
        </div>

        {/* Pengantar kartu layanan — susunannya cerminan headline layar pertama
            (eyebrow mono + rule, tumpukan baris pendek, satu kata hollow, spec line). */}
        <div
          ref={ctaRef}
          className="pointer-events-none absolute inset-0 flex items-start justify-end"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 flex justify-end pt-[12vh] sm:pt-[15vh] [text-shadow:_0_2px_24px_rgba(0,0,0,0.25)]">
            <div className="text-right">
              {/* eyebrow: rule + label chip (kebalikan layar pertama karena rata kanan) */}
              <div className="flex items-center justify-end gap-3 mb-5 sm:mb-6">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-white/80">
                  Est. 2021
                </span>
                <span className="h-px w-14 sm:w-20 bg-white/45" />
                <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] uppercase text-white border border-white/45 px-2 py-[5px]">
                  Layanan
                </span>
              </div>

              <p className="font-heavy uppercase text-white text-[clamp(1.75rem,4.6vw,4.5rem)] leading-[0.86] tracking-[-0.04em] whitespace-nowrap">
                <span className="block">Satu studio.</span>
                <span className="block text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.95)]">Tiga layanan.</span>
              </p>

              <div className="mt-6 sm:mt-8 flex items-center justify-end gap-3">
                <p className="font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.2em] uppercase text-white/90">
                  Gulir — satu per satu
                </p>
                <span className="h-px w-8 sm:w-10 bg-white/60 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
