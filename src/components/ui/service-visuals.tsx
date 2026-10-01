type ServiceVisualProps = {
  type: 'website' | 'automation' | 'system' | 'creativity'
}

export function ServiceGlyph({ type }: ServiceVisualProps) {
  const common = { className: 'service-glyph', viewBox: '0 0 64 64', 'aria-hidden': true }
  if (type === 'website') return <svg {...common}><rect x="8" y="12" width="38" height="30" /><rect x="20" y="24" width="36" height="28" /><path d="M8 20h38M20 32h36" /></svg>
  if (type === 'automation') return <svg {...common}><circle cx="12" cy="32" r="6" /><circle cx="32" cy="14" r="6" /><circle cx="52" cy="32" r="6" /><circle cx="32" cy="50" r="6" /><path d="m17 27 10-9m10 0 10 9m0 10-10 9m-10 0-10-9" /></svg>
  if (type === 'system') return <svg {...common}><path d="M10 18c0-5 10-9 22-9s22 4 22 9-10 9-22 9-22-4-22-9Z" /><path d="M10 18v14c0 5 10 9 22 9s22-4 22-9V18M10 32v14c0 5 10 9 22 9s22-4 22-9V32" /></svg>
  return <svg {...common}><path d="M32 5v54M5 32h54M13 13l38 38M51 13 13 51" /><circle cx="32" cy="32" r="12" /></svg>
}

export function ServiceBackdrop({ type }: ServiceVisualProps) {
  void type
  return null
  /* Legacy vector backdrops are intentionally kept below for easy comparison,
     but no longer rendered: the new cards use focused object illustrations. */
  if (type === 'website') return <svg className="service-backdrop service-backdrop--website" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden><path d="M0 180h1600M0 450h1600M0 720h1600M320 0v900M800 0v900M1280 0v900" /><rect x="160" y="120" width="560" height="600" /><rect x="880" y="240" width="560" height="480" /></svg>
  if (type === 'automation') return <svg className="service-backdrop service-backdrop--automation" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden><path d="M0 650h280c120 0 120-400 240-400h240c120 0 120 280 240 280h220c120 0 120-350 260-350h140" /><circle cx="280" cy="650" r="18" /><circle cx="760" cy="250" r="18" /><circle cx="1000" cy="530" r="18" /><circle cx="1460" cy="180" r="18" /></svg>
  if (type === 'system') return <svg className="service-backdrop service-backdrop--system" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden><path d="M180 160h1240v580H180zM180 320h1240M560 160v580M1040 160v580" /><path d="M0 90h350M1250 810h350M800 0v160M800 740v160" /><circle cx="560" cy="320" r="12" /><circle cx="1040" cy="320" r="12" /><circle cx="560" cy="740" r="12" /><circle cx="1040" cy="740" r="12" /></svg>
  return <svg className="service-backdrop service-backdrop--creativity" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden><circle cx="260" cy="700" r="380" /><circle cx="1370" cy="180" r="300" /><path d="M-80 240C360 20 560 820 940 560s430-460 760-260" /><rect x="650" y="120" width="360" height="360" transform="rotate(18 830 300)" /></svg>
}

export function ServiceVisual({ type }: ServiceVisualProps) {
  const captions = {
    website: ['Responsive interface', 'Design · Build · Launch'],
    automation: ['Connected workflow', 'Trigger · Process · Deliver'],
    system: ['Operational intelligence', 'Collect · Analyse · Control'],
    creativity: ['Creative technology', 'Explore · Prototype · Experience'],
  } as const

  return (
    <figure className={`service-object service-object--${type}`}>
      <div className="service-object__frame">
        <span className="service-object__index">0{(['website', 'automation', 'system', 'creativity'] as const).indexOf(type) + 1}</span>
        <img src={`/assets/services/${type}.svg`} alt="" aria-hidden="true" />
      </div>
      <figcaption>
        <strong>{captions[type][0]}</strong>
        <span>{captions[type][1]}</span>
      </figcaption>
    </figure>
  )

  /* Previous line-art studies remain below temporarily for source history. */
  if (type === 'website') {
    return (
      <svg className="service-visual service-visual--website" viewBox="0 0 640 480" role="img" aria-label="Layered website interface diagram">
        <g className="service-visual__microgrid"><path d="M32 64H608M32 104H608M32 144H608M32 184H608M32 224H608M32 264H608M32 304H608M32 344H608M32 384H608M72 32V448M112 32V448M152 32V448M192 32V448M232 32V448M272 32V448M312 32V448M352 32V448M392 32V448M432 32V448M472 32V448M512 32V448M552 32V448" /></g>
        <g className="service-visual__layer service-visual__layer--rear">
          <rect x="38" y="44" width="214" height="154" rx="4" />
          <path d="M38 72h214M58 94h70M58 116h158M58 138h104M58 168h54" />
        </g>
        <rect className="service-visual__surface" x="72" y="72" width="420" height="282" rx="4" />
        <path d="M72 112h420M102 92h1m18 0h1m18 0h1" />
        <rect className="service-visual__media" x="112" y="148" width="190" height="116" />
        <path d="M330 150h116M330 178h86M330 206h102M112 294h334" />
        <rect className="service-visual__accent" x="356" y="242" width="90" height="30" />
        <rect className="service-visual__surface" x="214" y="198" width="354" height="218" rx="4" />
        <path d="M214 238h354M248 278h118M248 306h244M248 334h190" />
        <path className="service-visual__accent" d="m486 354 34 14-17 8-8 18Z" />
        <g className="service-visual__data-bars"><path d="M98 326v-18M112 326v-34M126 326v-25M140 326v-52M154 326v-39M168 326v-66" /></g>
        <g className="service-visual__device">
          <rect x="500" y="92" width="92" height="190" rx="14" />
          <path d="M524 112h44M516 146h60M516 164h44M516 210h60M516 228h34" />
          <circle cx="546" cy="258" r="5" />
        </g>
      </svg>
    )
  }

  if (type === 'automation') {
    return (
      <svg className="service-visual service-visual--automation" viewBox="0 0 640 480" role="img" aria-label="Automation workflow node diagram">
        <g className="service-visual__microgrid"><path d="M40 80H600M40 160H600M40 240H600M40 320H600M40 400H600M80 40V440M160 40V440M240 40V440M320 40V440M400 40V440M480 40V440M560 40V440" /></g>
        <path className="service-visual__dash" d="M90 240h92c42 0 42-108 84-108h84M350 132h82c42 0 42 82 84 82h44M182 240h84c42 0 42 106 84 106h88M438 346h52c38 0 38-76 70-76" />
        <rect className="service-visual__node" x="50" y="204" width="92" height="72" rx="4" />
        <rect className="service-visual__node" x="266" y="94" width="84" height="76" rx="4" />
        <rect className="service-visual__node" x="266" y="308" width="84" height="76" rx="4" />
        <rect className="service-visual__node" x="516" y="178" width="84" height="72" rx="4" />
        <rect className="service-visual__node" x="516" y="234" width="84" height="72" rx="4" />
        <circle className="service-visual__accent" cx="182" cy="240" r="13" />
        <circle className="service-visual__accent" cx="438" cy="346" r="13" />
        <path d="M80 228h32m-32 24h20M288 120h40m-40 24h24M288 334h40m-40 24h28M538 202h40m-40 72h40" />
        <g className="service-visual__chips">
          <rect x="74" y="72" width="112" height="34" rx="17"/><rect x="452" y="370" width="116" height="34" rx="17"/>
          <path d="M96 89h66M474 387h72" />
        </g>
        <circle className="service-visual__runner service-visual__runner--one" cx="0" cy="0" r="7"><animateMotion dur="4s" repeatCount="indefinite" path="M90 240h92c42 0 42-108 84-108h84" /></circle>
        <circle className="service-visual__runner service-visual__runner--two" cx="0" cy="0" r="5"><animateMotion dur="5s" repeatCount="indefinite" path="M182 240h84c42 0 42 106 84 106h88" /></circle>
      </svg>
    )
  }

  if (type === 'system') {
    return (
      <svg className="service-visual service-visual--system" viewBox="0 0 640 480" role="img" aria-label="System architecture and data topology diagram">
        <g className="service-visual__microgrid service-visual__microgrid--dense"><path d="M32 64H608M32 96H608M32 128H608M32 160H608M32 192H608M32 224H608M32 256H608M32 288H608M32 320H608M32 352H608M32 384H608M32 416H608M64 32V448M96 32V448M128 32V448M160 32V448M192 32V448M224 32V448M256 32V448M288 32V448M320 32V448M352 32V448M384 32V448M416 32V448M448 32V448M480 32V448M512 32V448M544 32V448M576 32V448" /></g>
        <ellipse className="service-visual__surface" cx="320" cy="96" rx="112" ry="38" />
        <path d="M208 96v82c0 21 50 38 112 38s112-17 112-38V96M208 154c0 21 50 38 112 38s112-17 112-38" />
        <path d="M320 216v68M126 332h388M126 332v58m194-106v48m194 0v58" />
        <rect className="service-visual__node" x="72" y="390" width="108" height="42" rx="3" />
        <rect className="service-visual__node service-visual__node--strong" x="266" y="332" width="108" height="100" rx="3" />
        <rect className="service-visual__node" x="460" y="390" width="108" height="42" rx="3" />
        <path d="M288 358h64m-64 22h42m-42 22h52M94 411h64m324 0h64" />
        <circle className="service-visual__accent" cx="320" cy="284" r="14" />
        <circle className="service-visual__accent" cx="126" cy="332" r="10" />
        <circle className="service-visual__accent" cx="514" cy="332" r="10" />
        <g className="service-visual__telemetry">
          <path d="M70 78h122M70 98h76M448 78h122M494 98h76" />
          <text x="70" y="62">NODE / 01</text><text x="486" y="62">SYNC / LIVE</text>
        </g>
        <g className="service-visual__packet"><rect x="305" y="245" width="30" height="18" rx="2"/><path d="m313 254 5 5 10-11" /></g>
      </svg>
    )
  }

  return (
    <svg className="service-visual service-visual--creativity" viewBox="0 0 640 480" role="img" aria-label="Creative coding Bezier composition">
      <g className="service-visual__constellation"><path d="M52 90 132 54l82 58 88-70 96 78 92-50 98 82M52 390l92-58 74 86 94-62 108 68 72-92 96 54"/><circle cx="52" cy="90" r="3"/><circle cx="132" cy="54" r="3"/><circle cx="214" cy="112" r="3"/><circle cx="302" cy="42" r="3"/><circle cx="398" cy="120" r="3"/><circle cx="490" cy="70" r="3"/><circle cx="588" cy="152" r="3"/></g>
      <path className="service-visual__heavy" d="M62 360C190 78 394 76 574 328" />
      <path className="service-visual__heavy" d="M62 284C192 422 404 406 574 158" />
      <path d="M94 94 548 388M548 94 94 388" />
      <circle cx="62" cy="360" r="9" /><circle cx="574" cy="328" r="9" />
      <circle cx="62" cy="284" r="9" /><circle cx="574" cy="158" r="9" />
      <rect className="service-visual__surface" x="174" y="132" width="162" height="162" transform="rotate(13 255 213)" />
      <circle className="service-visual__accent" cx="388" cy="246" r="92" />
      <path className="service-visual__cut" d="M323 246h130M388 181v130" />
      <path d="M94 94h54m-27-27v54M548 388h-54m27-27v54" />
      <g className="service-visual__orbit service-visual__orbit--a"><ellipse cx="320" cy="240" rx="248" ry="82"/><circle cx="568" cy="240" r="7"/></g>
      <g className="service-visual__orbit service-visual__orbit--b"><ellipse cx="320" cy="240" rx="196" ry="126"/><circle cx="124" cy="240" r="5"/></g>
      <g className="service-visual__coordinates"><text x="42" y="452">X 0640 / Y 0480</text><text x="476" y="452">GEN / 04</text></g>
    </svg>
  )
}
