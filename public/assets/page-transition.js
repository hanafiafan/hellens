(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed", inset: "0", width: "100%", height: "100%", zIndex: "9999",
    pointerEvents: "none", visibility: "hidden", willChange: "contents",
    transform: "translateZ(0)"
  });
  document.documentElement.appendChild(canvas);

  const gl = !reduced && canvas.getContext("webgl", { alpha: true, antialias: false });
  let program = null;
  let position = null;
  let uniforms = null;
  let running = false;

  const vertex = `
    attribute vec2 a_position;
    void main(){ gl_Position=vec4(a_position,0.0,1.0); }
  `;
  const fragment = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform vec2 u_origin;
    uniform float u_progress;
    uniform float u_time;
    uniform float u_mode;
    uniform float u_reverse;

    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123); }
    float noise(vec2 p){
      vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);
    }
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      vec2 p=uv-u_origin;
      p.x*=u_resolution.x/u_resolution.y;
      float progress=u_reverse>.5?1.0-u_progress:u_progress;
      float n=noise(uv*5.0+vec2(u_time*.14,-u_time*.1));
      float alpha;
      float edge;
      if(u_mode<.5){
        float threshold=progress*1.34-.18;
        float liquid=uv.y+(n-.5)*.15+sin(uv.x*7.0+u_time*.65)*.018;
        alpha=1.0-smoothstep(threshold-.055,threshold+.055,liquid);
        edge=1.0-smoothstep(.0,.075,abs(liquid-threshold));
      }else{
        float d=length(p)+(n-.5)*.052;
        float radius=progress*1.62;
        alpha=1.0-smoothstep(radius-.045,radius+.045,d);
        edge=1.0-smoothstep(.015,.075,abs(d-radius));
      }
      vec3 cyan=vec3(.04,.72,1.0), violet=vec3(.58,.16,1.0);
      vec3 edgeColor=mix(cyan,violet,.5+.5*sin(u_time*2.2+uv.x*8.0));
      vec3 color=mix(vec3(.0),edgeColor,edge*.72);
      gl_FragColor=vec4(color,clamp(alpha+edge*.32,0.0,1.0));
    }
  `;

  const compile = (type, source) => {
    const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  };

  if (gl) {
    try {
      program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
      position = gl.getAttribLocation(program, "a_position");
      uniforms = {
        resolution: gl.getUniformLocation(program, "u_resolution"), origin: gl.getUniformLocation(program, "u_origin"),
        progress: gl.getUniformLocation(program, "u_progress"), time: gl.getUniformLocation(program, "u_time"),
        mode: gl.getUniformLocation(program, "u_mode"), reverse: gl.getUniformLocation(program, "u_reverse")
      };
      const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
    } catch (error) { program = null; }
  }

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(innerWidth * dpr); canvas.height = Math.round(innerHeight * dpr);
    if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
  };
  addEventListener("resize", resize, { passive: true }); resize();

  const ease = value => value < .5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
  const draw = ({ progress, origin, mode, reverse, time }) => {
    gl.useProgram(program); gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.origin, origin.x, 1 - origin.y);
    gl.uniform1f(uniforms.progress, progress); gl.uniform1f(uniforms.time, time);
    gl.uniform1f(uniforms.mode, mode); gl.uniform1f(uniforms.reverse, reverse ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const animate = ({ mode = 0, origin = { x: .5, y: .5 }, reverse = false, duration = 720 } = {}) => new Promise(resolve => {
    if (!program || reduced) { resolve(); return; }
    running = true; canvas.style.visibility = "visible";
    const started = performance.now();
    const frame = now => {
      const raw = Math.min(1, (now - started) / duration);
      draw({ progress: ease(raw), origin, mode, reverse, time: now / 1000 });
      if (raw < 1) requestAnimationFrame(frame);
      else { running = false; if (reverse) canvas.style.visibility = "hidden"; resolve(); }
    };
    requestAnimationFrame(frame);
  });

  const navigate = async (href, options) => {
    if (running) return;
    if (!program || reduced) { location.href = href; return; }
    sessionStorage.setItem("hellens-transition", JSON.stringify(options));
    const preload = fetch(href, { credentials: "same-origin", cache: "force-cache" }).catch(() => null);
    await animate(options);
    await Promise.race([preload, new Promise(resolve => setTimeout(resolve, 240))]);
    location.href = href;
  };

  document.addEventListener("click", async event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest("a[href]"); if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
    const url = new URL(link.href, location.href); if (url.origin !== location.origin || url.protocol === "mailto:") return;
    const point = { x: event.clientX / innerWidth, y: event.clientY / innerHeight };
    if (url.pathname === location.pathname && url.hash) {
      const target = document.querySelector(url.hash); if (!target) return;
      event.preventDefault(); await animate({ mode: 0, origin: point, duration: 620 });
      target.scrollIntoView({ behavior: "auto" }); history.pushState(null, "", url.hash);
      await animate({ mode: 0, origin: point, reverse: true, duration: 720 }); return;
    }
    event.preventDefault();
    const projectTransition = link.closest(".work__item") || /project\.html/.test(url.pathname) || /project\.html/.test(location.pathname);
    navigate(url.href, { mode: projectTransition ? 1 : 0, origin: point, duration: projectTransition ? 1050 : 900 });
  });

  try {
    const saved = JSON.parse(sessionStorage.getItem("hellens-transition") || "null");
    if (saved) {
      sessionStorage.removeItem("hellens-transition");
      requestAnimationFrame(() => requestAnimationFrame(() => animate({ ...saved, reverse: true, duration: 900 })));
    }
  } catch (_) { sessionStorage.removeItem("hellens-transition"); }
})();
