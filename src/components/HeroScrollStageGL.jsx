import React, { useEffect, useRef, useState } from 'react';
import HeroSection from './HeroSection';
import VerticalCutReveal from './VerticalCutReveal';

const FRAME_COUNT = 485; // native 60fps source (~8s), smooth
const framePath = (i) => `/scroll-frames/frame_${String(i).padStart(3, '0')}.webp`;
const TRACK_VH = 490;
const SCROLL_VH = TRACK_VH - 100;     // jarak scroll efektif (track - 1 layar sticky)
const p = (vh) => vh / SCROLL_VH;     // posisi absolut (vh) -> progress 0..1
const FRAME_LERP = 0.14;

// Semua fase dipatok dalam vh absolut, bukan pecahan progress, supaya kecepatan
// scrub tidak berubah kalau TRACK_VH digeser lagi.
const SEQ_START = p(17);
const SEQ_END = p(265);
const ENDV_IN0 = p(248), ENDV_IN1 = p(265);
const TAG_IN0 = p(262), TAG_IN1 = p(282);
const SEAM_IN0 = p(375), SEAM_IN1 = p(SCROLL_VH);

const smooth = (a, b, x) => Math.min(1, Math.max(0, (x - a) / (b - a)));

// WebGL version of the pinned hero + scroll frame sequence.
// Two frame textures (the pair around the eased position) are cross-dissolved in
// a fragment shader (mix), so the scrub is GPU-smooth with no decode flicker.
// Only 2 textures live on the GPU at once; frames upload on demand.
export default function HeroScrollStageGL({ active = true, lenisRef, ...heroProps }) {
  const [introActive, setIntroActive] = useState(false);
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const endVideoRef = useRef(null);
  const ctaRef = useRef(null);
  const seamRef = useRef(null);
  const introActiveRef = useRef(false);

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

        // Perkenalan di dinding kosong: muncul saat video settle dan bertahan
        // sampai seluruh stage terdorong keluar oleh section berikutnya.
        if (cta) {
          cta.style.opacity = smooth(TAG_IN0, TAG_IN1, prog);
          const shouldReveal = prog >= TAG_IN0;
          if (shouldReveal !== introActiveRef.current) {
            introActiveRef.current = shouldReveal;
            setIntroActive(shouldReveal);
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
      gl.deleteTexture(texA); gl.deleteTexture(texB);
      gl.deleteBuffer(quad); gl.deleteProgram(prog);
    };
  }, []);

  return (
    <section ref={trackRef} id="hero-scroll" className="relative" style={{ height: `${TRACK_VH}vh` }}>
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F5F1E8]" />
        </div>

        {/* Pengenalan studio setelah frame sequence menetap di ruang biru. */}
        <div
          ref={ctaRef}
          className="studio-intro pointer-events-none absolute inset-0 flex items-center justify-end"
          style={{ opacity: 0 }}
        >
          <div className="studio-intro-layout">
            <div className="studio-intro-copy">
              <p className="studio-intro-kicker">STUDIO DIGITAL · YOGYAKARTA</p>
              <h2 className="studio-intro-title">
                <VerticalCutReveal active={introActive}>KAMI ADALAH</VerticalCutReveal>
                <VerticalCutReveal active={introActive} reverse fromLast delay={0.18}>HELLENS.DEV</VerticalCutReveal>
              </h2>
              <p className="studio-intro-description">
                <VerticalCutReveal active={introActive} splitBy="words" delay={0.38}>Kami membuat website dan sistem digital</VerticalCutReveal>
                <VerticalCutReveal active={introActive} splitBy="words" delay={0.58}>yang mengikuti cara kerja bisnis Anda.</VerticalCutReveal>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
