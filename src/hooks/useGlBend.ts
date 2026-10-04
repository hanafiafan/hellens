import { useEffect } from 'react'

// Curved page fold for images, drawn in WebGL on one fixed canvas: each image is a mesh whose lower part is bent
// toward the viewer along a cylinder as it crosses the bottom fold zone (same look as the landing Work section).
const ZONE = 150
const ANGLE = 36 * Math.PI / 180
const ROUND = 132
const PERSP = 1100
const FADE_IN = 380
const FADE_OUT = 1000
const ROWS = 96

const VERT = `#version 300 es
in vec2 aUV;
uniform vec2 uRes; uniform vec4 uRect; uniform vec2 uCover;
uniform float uLine, uAngle, uRound, uPersp; uniform vec2 uFade;
out vec2 vUV; out vec2 vQuad; out float vFade;
vec2 foldAt(float s) {
  float arc = uRound * uAngle;
  if (s < arc) { float th = s / uRound; return vec2(uRound * sin(th), uRound * (1.0 - cos(th))); }
  float d = s - arc;
  return vec2(uRound * sin(uAngle) + d * cos(uAngle), uRound * (1.0 - cos(uAngle)) + d * sin(uAngle));
}
void main() {
  vUV = (aUV - 0.5) * uCover + 0.5; vQuad = aUV;
  vec2 p = uRect.xy + aUV * uRect.zw;
  float y = p.y; float z = 0.0;
  if (p.y > uLine) { vec2 f = foldAt(p.y - uLine); y = uLine + f.x; z = f.y; }
  vec2 eye = uRes * 0.5;
  float k = uPersp / max(uPersp - z, uPersp * 0.25);
  vec2 sp = eye + (vec2(p.x, y) - eye) * k;
  vFade = 1.0 - smoothstep(uFade.x, uFade.y, z);
  gl_Position = vec4(sp.x / uRes.x * 2.0 - 1.0, 1.0 - sp.y / uRes.y * 2.0, 0.0, 1.0);
}`

const FRAG = `#version 300 es
precision highp float;
in vec2 vUV; in vec2 vQuad; in float vFade;
uniform sampler2D uTex; uniform vec2 uSize; uniform float uRadius;
out vec4 frag;
void main() {
  vec2 q = abs((vQuad - 0.5) * uSize) - (uSize * 0.5 - uRadius);
  float d = length(max(q, vec2(0.0))) + min(max(q.x, q.y), 0.0) - uRadius;
  float mask = 1.0 - smoothstep(-0.75, 0.75, d);
  vec2 inside2 = step(vec2(0.0), vUV) * step(vUV, vec2(1.0));
  float a = mask * inside2.x * inside2.y * clamp(vFade, 0.0, 1.0);
  if (a < 0.003) discard;
  frag = vec4(texture(uTex, vUV).rgb * a, a);
}`

function program(gl: WebGL2RenderingContext) {
  const make = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s }
  const p = gl.createProgram()!
  gl.attachShader(p, make(gl.VERTEX_SHADER, VERT))
  gl.attachShader(p, make(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(p)
  return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null
}

export function useGlBend(selector: string) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = document.createElement('canvas')
    canvas.setAttribute('aria-hidden', 'true')
    canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:5'
    const gl = canvas.getContext('webgl2', { premultipliedAlpha: true, alpha: true, antialias: true })
    const prog = gl && program(gl)
    if (!gl || !prog) return
    document.body.append(canvas)

    // Mesh: 2 columns x ROWS rows (the fold only bends along y; x stays linear per row).
    const uv: number[] = []
    for (let r = 0; r <= ROWS; r++) uv.push(0, r / ROWS, 1, r / ROWS)
    const idx: number[] = []
    for (let r = 0; r < ROWS; r++) { const a = r * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2) }
    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    const vbo = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'aUV')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const ibo = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW)
    gl.useProgram(prog)
    const u = (n: string) => gl.getUniformLocation(prog, n)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const textures = new Map<HTMLImageElement, WebGLTexture>()
    const visible = new Set<HTMLImageElement>()
    let raf = 0
    let sized = ''

    const texture = (img: HTMLImageElement) => {
      let t = textures.get(img)
      if (!t) {
        t = gl.createTexture()!
        gl.bindTexture(gl.TEXTURE_2D, t)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
        gl.generateMipmap(gl.TEXTURE_2D)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        textures.set(img, t)
      }
      return t
    }

    const frame = () => {
      const w = innerWidth, h = innerHeight, dpr = Math.min(devicePixelRatio || 1, 2)
      const key = `${w}x${h}x${dpr}`
      if (key !== sized) { sized = key; canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr) }
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(u('uRes'), w, h)
      gl.uniform1f(u('uLine'), h - ZONE)
      gl.uniform1f(u('uAngle'), ANGLE)
      gl.uniform1f(u('uRound'), ROUND)
      gl.uniform1f(u('uPersp'), PERSP)
      gl.uniform2f(u('uFade'), FADE_IN, FADE_OUT)
      for (const img of visible) {
        const rect = img.getBoundingClientRect()
        const folding = rect.height > 0 && rect.bottom > h - ZONE && rect.top < h && img.complete && img.naturalWidth > 0
        img.classList.toggle('bend-hidden', folding)
        if (!folding) continue
        const cs = getComputedStyle(img)
        const rectAR = rect.width / rect.height, imgAR = img.naturalWidth / img.naturalHeight
        const contain = cs.objectFit === 'contain'
        const wide = rectAR > imgAR
        const cover: [number, number] = (wide !== contain) ? [1, imgAR / rectAR] : [rectAR / imgAR, 1]
        gl.bindTexture(gl.TEXTURE_2D, texture(img))
        gl.uniform4f(u('uRect'), rect.left, rect.top, rect.width, rect.height)
        gl.uniform2f(u('uCover'), cover[0], cover[1])
        gl.uniform2f(u('uSize'), rect.width, rect.height)
        gl.uniform1f(u('uRadius'), parseFloat(cs.borderTopLeftRadius) || 0)
        gl.drawElements(gl.TRIANGLES, ROWS * 6, gl.UNSIGNED_SHORT, 0)
      }
      raf = visible.size ? requestAnimationFrame(frame) : 0
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const img = e.target as HTMLImageElement
        if (e.isIntersecting) visible.add(img); else { visible.delete(img); img.classList.remove('bend-hidden') }
      }
      if (!raf && visible.size) raf = requestAnimationFrame(frame)
    }, { rootMargin: '10% 0px' })
    document.querySelectorAll<HTMLImageElement>(selector).forEach((img) => io.observe(img))

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      visible.forEach((img) => img.classList.remove('bend-hidden'))
      textures.forEach((t) => gl.deleteTexture(t))
      canvas.remove()
    }
  }, [selector])
}
