'use client';

import { useRef } from 'react';
import { gsap, useGSAP, FULL_MOTION_QUERY } from '../../lib/gsap';
import './marketing-base.css';
import './autofleet.css';

/**
 * AutofleetApp — an ad-hoc, personalized application page for Bar Moshe's
 * "Full Stack Developer" application to Autofleet (autofleet.io,
 * fleet + mobility optimization platform, Tel Aviv; an Element Fleet
 * Management company). Built in Autofleet's REAL visual language, read
 * live off autofleet.io (computed styles + section walk, 2026-07-05):
 *
 *   - Near-white #F5F5F7 surface, ink #333333 headings (Visby CF → Poppins
 *     here), gray #707070 body, #11A4FF primary CTAs with radius 8 and the
 *     inset-white sheen, outline secondary buttons.
 *   - The sky #55C3FF → mint #1EF5B9 signature gradient: footer, card
 *     bottom edges, numbered steps, accent ribbons.
 *   - Light isometric 3D city scenes (pale blocks, ribbon roads, map pins,
 *     small vehicles). Every SVG below is drawn fresh in that style:
 *     nothing is copied from their asset pipeline.
 *   - Their section grammar: blue announcement strip, white sticky nav,
 *     left-aligned hero over the city, gray customer-logo strip (a stack
 *     strip here), alternating two-column feature rows with square teal
 *     bullets and left-accent-bar headings, the numbered 1-2-3 strip,
 *     white resource cards with pastel pill tags, a testimonial card with
 *     a gradient bottom edge, the "Ready to see it in action?" close
 *     panel, and the gradient footer.
 *
 * Copy is Bar's plain first-person register. All motion is gated on
 * prefers-reduced-motion; the page is fully legible with no JS.
 * Standalone sibling (the ADR-0132 pattern).
 */

const EMAIL =
  'mailto:1barmoshe1@gmail.com?subject=Full%20Stack%20Developer%20-%20Bar%20Moshe';
const CV = '/Bar_Moshe_Resume.pdf';
const LINKEDIN = 'https://www.linkedin.com/in/barmoshe/';
const GITHUB = 'https://github.com/barmoshe';
const WHATSAPP = 'https://wa.me/972546561465';

/* ── Stack strip, where their gray customer-logo row sits. ───────────── */
const STACK = [
  'Node.js',
  'Express',
  'React',
  'TypeScript',
  'PostgreSQL',
  'MongoDB',
  'REST APIs',
  'AWS',
  'Docker',
  'Kubernetes',
  'CI/CD',
];

/* ── Fit rows, their alternating two-column feature grammar. ─────────── */
const FIT: {
  kicker: string;
  h: string;
  sub: string;
  bullets: string[];
  art: 'dashboard' | 'network' | 'gauge';
}[] = [
  {
    kicker: 'Full stack',
    h: 'Web applications, built and run end to end',
    sub: 'Node.js and Express on the back, React on the front, and the deployment discipline around them.',
    bullets: [
      'Primary developer at Joomsy, an early-stage startup (team of five): React and Node in production, plus the DevOps that keeps it running.',
      'Israelify: a Spotify-style app. React over a Node + MongoDB REST API with auth, middleware, and a custom logger.',
      'MIDI GPT REST API: an Express + TypeScript service with a multi-step pipeline and OpenAI behind a clean REST surface.',
    ],
    art: 'dashboard',
  },
  {
    kicker: 'APIs & integrations',
    h: 'Third-party services, integrated so they hold up',
    sub: 'Production integration work is retries, validation, and observability, not just a fetch call.',
    bullets: [
      'One Temporal workflow orchestrating Go, Python, and TypeScript workers. Featured by Temporal on their Code Exchange.',
      'MDP: a Markdown-to-document compiler on npm with an MCP server and editor plugins on top. Other people install it.',
      'Client MVPs wired to real third-party APIs: payments, maps, currency, media pipelines.',
    ],
    art: 'network',
  },
  {
    kicker: 'How I work',
    h: 'Reviews, debugging, and performance as habits',
    sub: 'The parts of the role that are conduct, not stack.',
    bullets: [
      'In a five-person team, reviewing code and unblocking teammates is daily reality, not ceremony.',
      'Speed and scalability are concrete to me: AWS, EKS + Kubernetes, Terraform, Docker, and CI/CD (Wix DevOps workshop, then practice).',
      'Troubleshooting muscle from Wochit support engineering: user issues at scale, reproduced, root-caused, and turned into product fixes.',
    ],
    art: 'gauge',
  },
];

/* ── The 1-2-3 strip, their Setup/Training/Support motif reframed. ───── */
const STEPS = [
  {
    n: '1',
    h: 'Brief',
    p: 'I read the product, not just the ticket. Questions first, then scope.',
  },
  {
    n: '2',
    h: 'Build',
    p: 'Node + React, tested against the real flows, reviewed and readable.',
  },
  {
    n: '3',
    h: 'Run & support',
    p: 'Deployed, monitored, and debugged in production. Shipping is the start.',
  },
];

/* ── Shipped work. Their resource-card grammar (pill tag + link). ────── */
type GlyphKind =
  | 'deck'
  | 'flow'
  | 'logic'
  | 'wave'
  | 'api'
  | 'home'
  | 'route'
  | 'synth';

type Work = {
  tag: string;
  tone: 'green' | 'blue' | 'mint' | 'violet';
  title: string;
  desc: string;
  href: string;
  open: string;
  glyph: GlyphKind;
};

const WORK: Work[] = [
  {
    tag: 'npm',
    tone: 'blue',
    title: 'MDP',
    desc: 'Markdown-to-document compiler on npm, with an MCP server and Claude Code / Codex plugins on top.',
    href: 'https://barmoshe.github.io/mdp/',
    open: 'Open',
    glyph: 'deck',
  },
  {
    tag: 'Featured',
    tone: 'mint',
    title: 'Temporal pipeline',
    desc: 'One workflow orchestrating Go, Python, and TypeScript workers. Featured on Temporal’s Code Exchange.',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
    open: 'View',
    glyph: 'flow',
  },
  {
    tag: 'Open source',
    tone: 'green',
    title: 'entailer',
    desc: 'Logic-validity toolkit: six packages on npm that check whether a conclusion actually follows.',
    href: 'https://github.com/barmoshe/entailer',
    open: 'Code',
    glyph: 'logic',
  },
  {
    tag: 'Full stack',
    tone: 'violet',
    title: 'Israelify',
    desc: 'Spotify-style app: React over a Node + MongoDB REST API, with auth, middleware, and a custom logger.',
    href: 'https://github.com/barmoshe/Israelify-backend',
    open: 'Code',
    glyph: 'wave',
  },
  {
    tag: 'REST API',
    tone: 'blue',
    title: 'MIDI GPT REST API',
    desc: 'Express + TypeScript API generating MIDI: a multi-step Temporal pipeline calling OpenAI, with retries and validation.',
    href: 'https://github.com/barmoshe/AI_MIDI_API',
    open: 'Code',
    glyph: 'api',
  },
  {
    tag: 'Live',
    tone: 'green',
    title: 'apartment-hunter',
    desc: 'Real-estate decision tool: side-by-side comparison, Israeli purchase-tax brackets, mortgage math.',
    href: 'https://apartment-hunter-one.vercel.app',
    open: 'Open',
    glyph: 'home',
  },
  {
    tag: 'Live',
    tone: 'mint',
    title: 'trip-planner',
    desc: 'Itinerary, budget, and logistics in one view, with a live currency converter. Brief to live in days.',
    href: 'https://trip-planner-six-iota.vercel.app',
    open: 'Open',
    glyph: 'route',
  },
  {
    tag: 'Live',
    tone: 'violet',
    title: 'Biome Synth',
    desc: 'Browser instrument with an AI DJ across five states. Tone.js, Three.js, Canvas2D.',
    href: 'https://biome-synth.lovable.app/',
    open: 'Play',
    glyph: 'synth',
  },
];

/* ── On paper: the CV, compressed. ───────────────────────────────────── */
const CV_LINES: { h: string; lines: string[] }[] = [
  {
    h: 'Experience',
    lines: [
      'Software developer, Joomsy (2025-present). Primary developer, full stack + DevOps, team of five.',
      'Customer Support Engineer, Wochit (2021-present). Cloud video editor at scale; user issues into product fixes.',
    ],
  },
  {
    h: 'Education',
    lines: [
      'B.Sc. Computer Science, Afeka College of Engineering.',
      'Wix DevOps workshop (EKS, Kubernetes, Terraform). Coding Academy full-stack bootcamp.',
    ],
  },
];

/* =====================================================================
   Original isometric art, drawn in Autofleet's style: pale blocks,
   ribbon roads, gradient map pins, small white vehicles. Every SVG is
   hand-coded for this page. Coordinates are rounded to 2dp so server
   and client render the same strings (no hydration mismatch).
   ===================================================================== */

const R2 = (n: number) => Math.round(n * 100) / 100;

/** Project isometric grid coords (u,v,z) to screen (2:1 diamond). */
function iso(u: number, v: number, z = 0): [number, number] {
  return [R2(u - v), R2((u + v) * 0.5 - z)];
}

function poly(pts: [number, number][]): string {
  return pts.map((p) => `${p[0]},${p[1]}`).join(' ');
}

/** One isometric box (building block): top, front and side faces. */
function IsoBox({
  u,
  v,
  w,
  d,
  h,
  ox,
  oy,
  tone = 0,
}: {
  u: number;
  v: number;
  w: number;
  d: number;
  h: number;
  ox: number;
  oy: number;
  tone?: 0 | 1;
}) {
  const P = (a: number, b: number, z: number): [number, number] => {
    const [x, y] = iso(a, b, z);
    return [R2(x + ox), R2(y + oy)];
  };
  const top = [P(u, v, h), P(u + w, v, h), P(u + w, v + d, h), P(u, v + d, h)];
  const front = [
    P(u, v + d, h),
    P(u + w, v + d, h),
    P(u + w, v + d, 0),
    P(u, v + d, 0),
  ];
  const side = [
    P(u + w, v, h),
    P(u + w, v + d, h),
    P(u + w, v + d, 0),
    P(u + w, v, 0),
  ];
  return (
    <g stroke="#d9e2ea" strokeWidth="1" strokeLinejoin="round">
      <polygon points={poly(front)} fill="#e9eef4" />
      <polygon points={poly(side)} fill="#dfe7ef" />
      <polygon points={poly(top)} fill={tone ? '#f4f8fb' : '#ffffff'} />
    </g>
  );
}

/** A gradient map pin (their rounded pin with a tail). */
function MapPin({
  x,
  y,
  s = 1,
  tone = 'blue',
  bob = false,
}: {
  x: number;
  y: number;
  s?: number;
  tone?: 'blue' | 'mint';
  bob?: boolean;
}) {
  const fill = tone === 'blue' ? 'url(#af-pin-blue)' : 'url(#af-pin-mint)';
  return (
    <g
      className={bob ? 'af-pin af-pin--bob' : 'af-pin'}
      transform={`translate(${x} ${y}) scale(${s})`}
    >
      <path
        d="M0 34 L-7 22 A22 22 0 1 1 7 22 Z"
        fill={fill}
        stroke="#ffffff"
        strokeWidth="2.5"
      />
      <circle cx="0" cy="0" r="7.5" fill="#ffffff" />
    </g>
  );
}

/** Small top-down vehicle for the roads. */
function Car({ cls = '' }: { cls?: string }) {
  return (
    <g className={cls}>
      <ellipse cx="0" cy="4" rx="16" ry="7" fill="#c7d3de" opacity="0.5" />
      <rect
        x="-15"
        y="-8"
        width="30"
        height="16"
        rx="8"
        fill="#ffffff"
        stroke="#c7d3de"
        strokeWidth="1"
      />
      <rect x="-6" y="-5.5" width="9" height="11" rx="4" fill="#3a4a58" opacity="0.85" />
    </g>
  );
}

/** Shared gradient defs used across the page's SVGs. */
function GradientDefs() {
  return (
    <defs>
      <linearGradient id="af-road" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0.2" stopColor="#55C3FF" />
        <stop offset="1" stopColor="#1EF5B9" />
      </linearGradient>
      <linearGradient id="af-pin-blue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#11A4FF" />
        <stop offset="1" stopColor="#55C3FF" />
      </linearGradient>
      <linearGradient id="af-pin-mint" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2ad7c0" />
        <stop offset="1" stopColor="#1EF5B9" />
      </linearGradient>
      <radialGradient id="af-glow" cx="0.5" cy="0.4" r="0.7">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/** The hero scene: pale isometric city, ribbon roads, pins, vehicles. */
function HeroCity() {
  return (
    <svg
      className="af-hero__city"
      viewBox="0 0 980 640"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMaxYMid meet"
    >
      <GradientDefs />

      {/* soft ground glow */}
      <ellipse cx="560" cy="360" rx="520" ry="300" fill="url(#af-glow)" />

      {/* wide pale roads: two iso diagonals crossing */}
      <g fill="none" strokeLinecap="round">
        <path d="M60 300 L560 550" stroke="#e6ebf1" strokeWidth="56" />
        <path d="M300 620 L900 320" stroke="#e6ebf1" strokeWidth="56" />
        <path
          d="M60 300 L560 550"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeDasharray="14 18"
        />
        <path
          d="M300 620 L900 320"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeDasharray="14 18"
        />
        {/* the optimized route: a gradient ribbon over the roads */}
        <path
          className="af-route"
          d="M120 330 L468 504 Q496 518 524 504 L830 351"
          stroke="url(#af-road)"
          strokeWidth="7"
        />
      </g>

      {/* city blocks, upper-right cluster */}
      <IsoBox u={140} v={-60} w={70} d={70} h={54} ox={560} oy={130} />
      <IsoBox u={230} v={-58} w={56} d={56} h={96} ox={560} oy={130} />
      <IsoBox u={150} v={40} w={92} d={64} h={30} ox={560} oy={130} tone={1} />
      <IsoBox u={262} v={30} w={58} d={58} h={64} ox={560} oy={130} />
      <IsoBox u={352} v={20} w={44} d={44} h={110} ox={560} oy={130} />
      {/* low blocks, left of the road */}
      <IsoBox u={-40} v={70} w={64} d={64} h={40} ox={300} oy={60} tone={1} />
      <IsoBox u={46} v={80} w={48} d={48} h={72} ox={300} oy={60} />
      {/* foreground flat tiles */}
      <IsoBox u={110} v={240} w={84} d={84} h={8} ox={430} oy={180} tone={1} />
      <IsoBox u={230} v={260} w={60} d={60} h={8} ox={430} oy={180} />

      {/* vehicles on the route (drift under full motion) */}
      <g transform="translate(150 345)">
        <g transform="rotate(26.5)">
          <Car cls="af-car af-car--a" />
        </g>
      </g>
      <g transform="translate(840 355)">
        <g transform="rotate(-26.5)">
          <Car cls="af-car af-car--b" />
        </g>
      </g>

      {/* pins over the scene */}
      <MapPin x={480} y={430} tone="blue" bob />
      <MapPin x={700} y={280} s={0.8} tone="mint" bob />
      <MapPin x={260} y={210} s={0.7} tone="blue" />
    </svg>
  );
}

/* ── Small isometric vignettes for the fit rows. ─────────────────────── */

function ArtDashboard() {
  return (
    <svg viewBox="0 0 420 320" aria-hidden="true" focusable="false" className="af-art">
      <GradientDefs />
      {/* isometric tablet slab, their simulator motif */}
      <g stroke="#d9e2ea" strokeWidth="1">
        <polygon points="210,36 396,129 210,222 24,129" fill="#ffffff" />
        <polygon points="24,129 210,222 210,240 24,147" fill="#dfe7ef" />
        <polygon points="396,129 210,222 210,240 396,147" fill="#e9eef4" />
      </g>
      {/* screen grid */}
      <g stroke="#e6ebf1" strokeWidth="2" fill="none">
        <path d="M110 86 L296 179" />
        <path d="M160 61 L346 154" />
        <path d="M124 172 L310 79" />
      </g>
      {/* KPI bars rising off the slab */}
      <g>
        <rect x="150" y="94" width="18" height="52" rx="4" fill="url(#af-road)" />
        <rect x="196" y="74" width="18" height="84" rx="4" fill="url(#af-road)" opacity="0.85" />
        <rect x="242" y="98" width="18" height="66" rx="4" fill="url(#af-road)" opacity="0.7" />
      </g>
      <MapPin x={118} y={120} s={0.62} tone="blue" />
      <MapPin x={300} y={186} s={0.55} tone="mint" />
    </svg>
  );
}

/* hex tiles + connections: their hexagon service motif (static strings,
   precomputed so server/client match) */
const HEXES = (() => {
  const hex = (cx: number, cy: number, r: number) => {
    const pts: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      pts.push([R2(cx + r * Math.cos(a)), R2(cy + r * 0.62 * Math.sin(a))]);
    }
    return poly(pts);
  };
  return {
    left: hex(96, 164, 62),
    right: hex(324, 164, 62),
    top: hex(210, 84, 54),
    bottom: hex(210, 244, 54),
  };
})();

function ArtNetwork() {
  return (
    <svg viewBox="0 0 420 320" aria-hidden="true" focusable="false" className="af-art">
      <GradientDefs />
      <g fill="none" stroke="url(#af-road)" strokeWidth="3">
        <path d="M138 150 C180 120 240 120 282 150" />
        <path d="M138 178 C180 214 240 214 282 178" />
      </g>
      <g stroke="#d9e2ea" strokeWidth="1">
        <polygon points={HEXES.left} fill="#ffffff" />
        <polygon points={HEXES.right} fill="#ffffff" />
        <polygon points={HEXES.top} fill="#f4f8fb" />
        <polygon points={HEXES.bottom} fill="#f4f8fb" />
      </g>
      <g fill="none" stroke="#11A4FF" strokeWidth="3" strokeLinecap="round">
        <path d="M84 158 l8 10 l16 -18" />
      </g>
      <g fill="none" stroke="#1EC9A0" strokeWidth="3" strokeLinecap="round">
        <path d="M312 158 l8 10 l16 -18" />
      </g>
      <circle cx="210" cy="84" r="7" fill="#11A4FF" />
      <circle cx="210" cy="244" r="7" fill="#1EC9A0" />
    </svg>
  );
}

function ArtGauge() {
  return (
    <svg viewBox="0 0 420 320" aria-hidden="true" focusable="false" className="af-art">
      <GradientDefs />
      {/* speed gauge card */}
      <g stroke="#d9e2ea" strokeWidth="1">
        <rect x="60" y="56" width="200" height="150" rx="16" fill="#ffffff" />
        <rect x="284" y="98" width="120" height="52" rx="10" fill="#ffffff" />
        <rect x="284" y="162" width="120" height="52" rx="10" fill="#ffffff" />
      </g>
      <path
        d="M100 176 A60 60 0 0 1 220 176"
        fill="none"
        stroke="#e6ebf1"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M100 176 A60 60 0 0 1 196 129"
        fill="none"
        stroke="url(#af-road)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <circle cx="160" cy="176" r="7" fill="#333333" />
      <path d="M160 176 L196 140" stroke="#333333" strokeWidth="5" strokeLinecap="round" />
      {/* review checklist chips */}
      <g fill="none" stroke="#11A4FF" strokeWidth="3.4" strokeLinecap="round">
        <path d="M296 122 l7 8 l13 -15" />
      </g>
      <g fill="none" stroke="#1EC9A0" strokeWidth="3.4" strokeLinecap="round">
        <path d="M296 186 l7 8 l13 -15" />
      </g>
      <rect x="324" y="115" width="64" height="7" rx="3.5" fill="#e6ebf1" />
      <rect x="324" y="130" width="46" height="7" rx="3.5" fill="#eef2f6" />
      <rect x="324" y="179" width="64" height="7" rx="3.5" fill="#e6ebf1" />
      <rect x="324" y="194" width="46" height="7" rx="3.5" fill="#eef2f6" />
    </svg>
  );
}

/* ── Flat line glyphs for the work cards (their resource-card art). ──── */

function Glyph({ kind }: { kind: GlyphKind }) {
  const stroke = '#11A4FF';
  const mint = '#1EC9A0';
  switch (kind) {
    case 'deck':
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="14" y="10" width="44" height="32" rx="5" stroke={stroke} fill="#ffffff" />
          <path d="M22 22 h20 M22 30 h28" stroke={mint} />
          <path d="M8 50 h56" stroke={stroke} />
        </g>
      );
    case 'flow':
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 27 L34 18 M20 35 L34 44 M46 18 L56 27 M46 44 L56 35" stroke="#9db4c6" />
          <circle cx="14" cy="31" r="7" stroke={stroke} fill="#ffffff" />
          <circle cx="40" cy="14" r="7" stroke={mint} fill="#ffffff" />
          <circle cx="40" cy="48" r="7" stroke={mint} fill="#ffffff" />
          <circle cx="62" cy="31" r="7" stroke={stroke} fill="#ffffff" />
        </g>
      );
    case 'logic':
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 14 h22 M14 14 v34 h22" stroke={stroke} />
          <path d="M44 22 l8 9 l14 -16" stroke={mint} />
          <path d="M44 48 h22" stroke="#9db4c6" />
        </g>
      );
    case 'wave':
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round">
          <path d="M8 34 q8 -18 16 0 q8 18 16 0 q8 -18 16 0 q4 9 8 4" stroke={stroke} />
          <circle cx="60" cy="14" r="6" stroke={mint} fill="#ffffff" />
        </g>
      );
    case 'api':
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16 l-12 15 l12 15" stroke={stroke} />
          <path d="M50 16 l12 15 l-12 15" stroke={stroke} />
          <path d="M40 12 l-8 38" stroke={mint} />
        </g>
      );
    case 'home':
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 30 L36 12 L60 30" stroke={stroke} />
          <path d="M20 28 v22 h32 v-22" stroke={stroke} />
          <path d="M32 50 v-12 h8 v12" stroke={mint} />
        </g>
      );
    case 'route':
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round">
          <path d="M12 48 q22 4 22 -14 q0 -18 22 -14" stroke={stroke} strokeDasharray="7 7" />
          <circle cx="12" cy="48" r="6" fill="#ffffff" stroke={mint} />
          <path d="M56 12 l-6 14 l12 0 z" fill={mint} stroke={mint} />
        </g>
      );
    case 'synth':
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round">
          <path d="M12 44 v-12 M24 44 v-24 M36 44 v-8 M48 44 v-20 M60 44 v-14" stroke={stroke} />
          <path d="M8 52 h60" stroke={mint} />
        </g>
      );
  }
}

/** The loop mark for the "bar for autofleet" wordmark (an original mark
    in their gradient language; not their logo). */
function LoopMark() {
  return (
    <svg viewBox="0 0 44 28" aria-hidden="true" focusable="false" className="af-loop">
      <defs>
        <linearGradient id="af-loop-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#55C3FF" />
          <stop offset="1" stopColor="#1EF5B9" />
        </linearGradient>
      </defs>
      <path
        d="M22 14 C22 7 17 3 12 3 C6.5 3 3 8 3 14 C3 20 6.5 25 12 25 C17 25 22 21 22 14 C22 7 27 3 32 3 C37.5 3 41 8 41 14 C41 20 37.5 25 32 25 C27 25 22 21 22 14 Z"
        fill="none"
        stroke="url(#af-loop-g)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Close-panel ribbon: their diagonal teal road + a small car. */
function RibbonArt() {
  return (
    <svg
      className="af-close__artsvg"
      viewBox="0 0 560 300"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <GradientDefs />
      <path
        d="M-40 300 L280 120 Q310 103 340 120 L600 268"
        fill="none"
        stroke="url(#af-road)"
        strokeWidth="46"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M-40 300 L280 120 Q310 103 340 120 L600 268"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeDasharray="12 16"
        opacity="0.9"
      />
      <g transform="translate(268 132) rotate(-29)">
        <Car />
      </g>
      <MapPin x={352} y={96} s={0.85} tone="blue" bob />
    </svg>
  );
}

/* ===================================================================== */

export default function AutofleetApp() {
  const scope = useRef<HTMLDivElement | null>(null);

  /* Autofleet's motion language (a Webflow build): soft fade-up rises on
     the hero, fade-up reveals as sections enter. All gated on
     prefers-reduced-motion; the pin bob + car drift live in CSS. */
  useGSAP(
    () => {
      if (!matchMedia(FULL_MOTION_QUERY).matches) return;

      gsap.from('.af-hero [data-rise]', {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.05,
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    },
    { scope },
  );

  return (
    <div className="mp-root af-root" ref={scope}>
      <a className="af-skip" href="#main">Skip to content</a>

      {/* ── Announcement bar, their blue trends strip ─────────────────── */}
      <div className="af-announce">
        <p>
          Full Stack Developer application: the fit, the work, the CV.{' '}
          <a href="#fit">Read it now&gt;&gt;&gt;</a>
        </p>
      </div>

      {/* ── Top navigation, their white sticky bar ────────────────────── */}
      <header className="af-nav">
        <div className="af-nav__inner">
          <a className="af-brand" href="#main" aria-label="bar for autofleet">
            <LoopMark />
            <span className="af-brand__name">bar</span>
            <span className="af-brand__for">for autofleet</span>
          </a>
          <nav className="af-nav__links" aria-label="Sections">
            <a className="af-nav__link" href="#fit">Fit</a>
            <a className="af-nav__link" href="#work">Work</a>
            <a className="af-nav__link" href="#cv">CV</a>
          </nav>
          <a className="af-btn af-btn--primary af-btn--sm" href={EMAIL}>
            Let&rsquo;s talk
          </a>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* ── Hero: their left headline over the isometric city ───────── */}
        <section className="af-hero">
          <HeroCity />
          <div className="af-hero__inner">
            <h1 className="af-h1" data-rise>
              Ship Your Roadmap
              <br />
              with Confidence
            </h1>
            <p className="af-lede" data-rise>
              I&rsquo;m Bar Moshe, applying to Autofleet as a Full Stack
              Developer. I build and run web products end to end: Node.js and
              Express on the back, React on the front, and the deployment
              discipline around them.
            </p>
            <div className="af-hero__cta" data-rise>
              <a className="af-btn af-btn--primary" href={EMAIL}>
                Let&rsquo;s talk
              </a>
              <a className="af-btn af-btn--ghost" href="#work">
                The work in 90 seconds
                <span className="af-btn__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <circle cx="12" cy="12" r="11" fill="#11A4FF" />
                    <path d="M10 8.2 L16 12 L10 15.8 Z" fill="#ffffff" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Stack strip, their gray customer-logo row ───────────────── */}
        <div className="af-strip" role="list" aria-label="Stack Bar ships with">
          {STACK.map((s) => (
            <span key={s} role="listitem" className="af-strip__item">
              {s}
            </span>
          ))}
        </div>

        {/* ── Fit rows, their alternating two-column grammar ──────────── */}
        <section id="fit" className="af-section">
          <div className="af-wrap">
            <h2 className="af-h2 af-h2--center" data-reveal>
              The Posting, With Receipts
            </h2>
            <p className="af-sub af-sub--center" data-reveal>
              What the role asks for, next to what I have actually shipped.
              Everything named here is real; most of it is clickable below.
            </p>

            {FIT.map((f, i) => (
              <div
                key={f.h}
                className={`af-row ${i % 2 ? 'af-row--flip' : ''}`}
                data-reveal
              >
                <div className="af-row__text">
                  <p className="af-kicker">{f.kicker}</p>
                  <h3 className="af-h3 af-h3--bar">{f.h}</h3>
                  <p className="af-row__sub">{f.sub}</p>
                  <ul className="af-bullets">
                    {f.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="af-row__art">
                  {f.art === 'dashboard' && <ArtDashboard />}
                  {f.art === 'network' && <ArtNetwork />}
                  {f.art === 'gauge' && <ArtGauge />}
                </div>
              </div>
            ))}

            {/* their numbered 1-2-3 strip, reframed as my delivery arc */}
            <div className="af-steps" data-reveal>
              {STEPS.map((s) => (
                <div key={s.n} className="af-step">
                  <span className="af-step__n" aria-hidden="true">
                    {s.n}
                  </span>
                  <div className="af-step__chip">
                    <h3 className="af-step__h">{s.h}</h3>
                    <p className="af-step__p">{s.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Work grid, their resource-cards grammar ─────────────────── */}
        <section id="work" className="af-section af-section--tint">
          <div className="af-wrap">
            <h2 className="af-h2 af-h2--center" data-reveal>
              Shipped, In Public
            </h2>
            <p className="af-sub af-sub--center" data-reveal>
              Real and clickable. My employer&rsquo;s work at Joomsy stays
              theirs, so it is named above, not shown.
            </p>

            <div className="af-grid">
              {WORK.map((w) => (
                <a
                  key={w.title}
                  className="af-card"
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal
                >
                  <span className="af-card__art" aria-hidden="true">
                    <svg viewBox="0 0 72 62" focusable="false" aria-hidden="true">
                      <Glyph kind={w.glyph} />
                    </svg>
                  </span>
                  <span className={`af-pill af-pill--${w.tone}`}>{w.tag}</span>
                  <h3 className="af-card__title">{w.title}</h3>
                  <p className="af-card__desc">{w.desc}</p>
                  <span className="af-card__link">
                    {w.open} <span aria-hidden="true">→</span>
                  </span>
                </a>
              ))}
            </div>

            {/* their Zipcar testimonial card, holding my external proof */}
            <div className="af-quote" data-reveal>
              <div className="af-quote__who">
                <span className="af-quote__badge" aria-hidden="true">
                  T
                </span>
                <div>
                  <p className="af-quote__name">Temporal Code Exchange</p>
                  <p className="af-quote__role">Featured community project</p>
                </div>
              </div>
              <div className="af-quote__body">
                <p className="af-quote__text">
                  &ldquo;Cross-language data processing service with
                  Temporal&rdquo;: one workflow orchestrating Go, Python, and
                  TypeScript workers. Selected and published by Temporal, not
                  by me.
                </p>
                <a
                  className="af-quote__link"
                  href="https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View the feature &gt;
                </a>
              </div>
            </div>

            {/* CV columns + download */}
            <div id="cv" className="af-cv" data-reveal>
              {CV_LINES.map((col) => (
                <div key={col.h} className="af-cv__col">
                  <h3 className="af-cv__h">{col.h}</h3>
                  <ul className="af-cv__list">
                    {col.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="af-cv__col af-cv__col--cta">
                <h3 className="af-cv__h">Full CV</h3>
                <p className="af-cv__note">One page, PDF.</p>
                <a
                  className="af-btn af-btn--primary af-btn--sm"
                  href={CV}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Close: their "Ready to see Autofleet in action?" panel ──── */}
        <section className="af-closewrap">
          <div className="af-close" data-reveal>
            <RibbonArt />
            <div className="af-close__text">
              <h2 className="af-h2">
                Ready to see it
                <br />
                in action?
              </h2>
              <p className="af-close__sub">
                A conversation is the fastest demo. Tel Aviv based, happy to
                come by.
              </p>
              <div className="af-close__cta">
                <a className="af-btn af-btn--primary" href={EMAIL}>
                  Email me
                </a>
                <a
                  className="af-btn af-btn--ghost"
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer, their sky→mint gradient band ──────────────────────── */}
      <footer className="af-footer">
        <div className="af-footer__inner">
          <p className="af-footer__brand">
            <LoopMark />
            <span className="af-brand__name">bar</span>
            <span className="af-brand__for">for autofleet</span>
          </p>
          <nav className="af-footer__links" aria-label="Profiles">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={CV} target="_blank" rel="noopener noreferrer">
              CV
            </a>
            <a href={EMAIL}>Email</a>
          </nav>
          <p className="af-footer__note">
            An application page Bar Moshe built for the Full Stack
            Developer role, in Autofleet&rsquo;s design language. The
            illustrations are original, drawn for this page. Not affiliated
            with Autofleet or Element Fleet Management.
          </p>
          <p className="af-footer__meta">
            All rights reserved to Bar Moshe · 2026 &nbsp;|&nbsp;
            1barmoshe1@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
}
