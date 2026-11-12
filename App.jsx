import { useState, useEffect, useRef, useMemo, createContext, useContext } from "react";
import {
  Github, Linkedin, Mail, Download, ArrowUpRight, Menu, X, Code2, Brain, Sparkles,
  Server, Database, Wrench, Send, Terminal, GraduationCap, Briefcase, Check,
  AlertCircle, ChevronRight, Layers, Bot, Workflow, Network, MessageSquare,
} from "lucide-react";

/* ==========================================================================
   1. EDITABLE CONTENT  (everything personal lives here)
   ========================================================================== */

const PROFILE = {
  name: "Vengatesh V",
  titles: ["AI Engineer", "Python Full Stack Developer", "Generative AI Developer"],
  github: "https://github.com/Vengatesh-01",
  linkedin: "https://www.linkedin.com/in/vengatesh-v-46573a318",
  email: "vvengatesh108@gmail.com",
  resumeUrl: "", // TODO: path to your resume, e.g. "/Vengatesh_V_Resume.pdf" (file in /public)
  // TODO: contact form endpoint. Formspree / Web3Forms / your own FastAPI route that accepts JSON POST.
  formEndpoint: "",
  college: "Francis Xavier Engineering College, Tirunelveli",
  degree: "B.Tech in Information Technology",
  graduation: "2027",
  cgpa: "8.12",
};

const META_DESCRIPTION =
  "Portfolio of Vengatesh V, an aspiring AI Engineer and Python Full Stack Developer building applications with Generative AI, LLMs, RAG and automation.";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "exploring", label: "Exploring" },
  { id: "contact", label: "Contact" },
];

/* Hero neural map: Python → ML → LLMs → RAG → Agents → Apps.
   `tech` only uses technologies from your profile and projects. */
const STAGES = [
  {
    label: "Python", title: "Python",
    blurb: "The language behind most of my projects: backend services, automation scripts and AI pipelines.",
    tech: ["FastAPI", "SQL", "C"], seen: "Most of my projects",
  },
  {
    label: "Machine Learning", title: "Machine Learning",
    blurb: "Machine learning and deep learning fundamentals that the rest of my work builds on.",
    tech: ["Deep Learning"], seen: "Foundations I'm building on",
  },
  {
    label: "LLMs", title: "Large Language Models",
    blurb: "Using hosted LLMs for structured generation, prompt design and content automation.",
    tech: ["Prompt Engineering", "LangChain", "Groq LLaMA", "Gemini API"],
    seen: "Cold Email Generator, YouTube automation system, Reelio",
  },
  {
    label: "RAG", title: "Retrieval-Augmented Generation",
    blurb: "Retrieving relevant context from a vector store so generated output is grounded in real information.",
    tech: ["ChromaDB", "LangChain", "WebBaseLoader"], seen: "Cold Email Generator",
  },
  {
    label: "AI Agents", title: "AI Agents",
    blurb: "The direction I'm exploring next: agentic workflows and multi-agent systems with LangGraph.",
    tech: ["LangGraph", "AI Automation"], seen: "Currently exploring",
  },
  {
    label: "Intelligent Apps", title: "Intelligent Applications",
    blurb: "Packaging models into things people can use: APIs, web interfaces and mobile apps.",
    tech: ["FastAPI", "Streamlit", "MongoDB", "REST APIs"],
    seen: "Reelio, YouTube automation system, FairMoto",
  },
];

const SKILL_GROUPS = [
  { title: "Programming Languages", icon: Code2, items: ["Python", "SQL", "C"] },
  { title: "AI & Machine Learning", icon: Brain, items: ["Machine Learning", "Deep Learning", "AI Automation"] },
  { title: "Generative AI & LLMs", icon: Sparkles, items: ["Generative AI", "Large Language Models", "RAG", "Prompt Engineering", "LangChain", "LangGraph"] },
  { title: "Backend Development", icon: Server, items: ["FastAPI", "REST APIs", "Streamlit", "Full Stack Development"] },
  { title: "Databases", icon: Database, items: ["MongoDB", "ChromaDB"] },
  { title: "Development Tools", icon: Wrench, items: ["Git", "GitHub", "FFmpeg"] },
];
const WORKING_STYLE = ["Problem Solving", "Logical Thinking", "Continuous Learning"];

/* contributionDraft / futureDraft = true shows a "Draft" badge in the detail view.
   Replace the text with your own specifics, then set the flag to false. */
const PROJECTS = [
  {
    id: "youtube-automation",
    name: "AI-Driven Automated YouTube Content Generation & Publishing System",
    badge: "Flagship · Final-year IEEE project",
    short: "An AI-powered framework that generates educational English communication videos and publishes them on YouTube.",
    tech: ["Python", "Large Language Models", "Text-to-Speech", "FFmpeg", "YouTube Data API"],
    github: null,
    visual: "pipeline",
    problem: "Producing educational English communication videos by hand means voiceovers, editing, subtitles, metadata and uploads for every single video. The repetitive work slows down consistent publishing.",
    solution: "A Python pipeline that takes user-provided scripts, thumbnails and background images, generates boy and girl voiceovers with text-to-speech, builds the video and subtitles with FFmpeg, generates metadata and hashtags with LLMs, and supports automated publishing through the YouTube Data API.",
    features: [
      "Boy and girl voice generation with text-to-speech",
      "Automatic subtitle generation",
      "Video generation and editing with FFmpeg",
      "Automated metadata and hashtag generation",
      "Automated publishing with the YouTube Data API",
    ],
    contribution: "Final-year IEEE project.",
    future: [],
  },
  {
    id: "cold-email",
    name: "Cold Email Generator",
    badge: "Generative AI",
    short: "Generates personalised professional cold emails by analysing job and career opportunity webpages.",
    tech: ["Python", "LangChain", "Groq", "LLaMA", "ChromaDB", "RAG"],
    github: "https://github.com/Vengatesh-01",
    visual: "emailflow",
    problem: "Writing a tailored outreach email for every job posting takes time, and generic emails get ignored.",
    solution: "The app reads a job or career page, cleans the extracted content, finds the most relevant items from a portfolio stored in ChromaDB, and asks a Groq-hosted LLaMA model to write a structured, personalised email.",
    features: [
      "Extracts webpage content with WebBaseLoader",
      "Cleans and processes the extracted information",
      "Structured email generation with Groq-hosted LLaMA models",
      "Portfolio retrieval with ChromaDB",
      "Matches portfolio information to job requirements",
    ],
    contribution: "",
    future: [],
  },
  {
    id: "reelio",
    name: "Reelio",
    badge: "Mobile app",
    short: "A Flutter and Dart mobile app with a FastAPI backend, MongoDB Atlas and an AI assistant powered by Google Gemini.",
    tech: ["Flutter", "Dart", "Python", "FastAPI", "MongoDB Atlas", "Google Gemini API", "Cloudinary", "YouTube Data API"],
    github: null,
    visual: "phone",
    problem: "A mobile product needs its app, backend, database and AI features to work together as one system.",
    solution: "A Flutter and Dart app connected to a FastAPI backend and a MongoDB Atlas database, with an AI assistant built on the Google Gemini API and integrations for Cloudinary and the YouTube Data API.",
    features: [
      "Cross-platform mobile app built with Flutter and Dart",
      "FastAPI backend integrated with the app",
      "Database connectivity with MongoDB Atlas",
      "AI assistant functionality using the Google Gemini API",
      "Cloudinary and YouTube Data API integrations",
    ],
    contribution: "",
    future: [],
  },
  {
    id: "fairmoto",
    name: "FairMoto",
    badge: "Concept",
    short: "An AI-powered bike price discovery concept that helps users explore motorcycle prices based on their location.",
    tech: ["Python", "GPS integration", "AI"],
    github: null,
    visual: "location",
    problem: "Motorcycle prices vary by place, and it is hard to know what a fair price looks like nearby.",
    solution: "A concept that uses the user's location to explore bike prices around them, with a Python-based backend and AI functionality.",
    features: ["Location-based discovery", "GPS integration", "Nearby bike price exploration", "Python-based backend and AI functionality"],
    contribution: "",
    future: [],
  },
];

const FLAGSHIP_STEPS = [
  { t: "Your inputs", s: "Script, thumbnail and background images" },
  { t: "Voiceover", s: "Text-to-speech with boy and girl voices" },
  { t: "Video", s: "FFmpeg processing and editing" },
  { t: "Subtitles", s: "Generated automatically" },
  { t: "Metadata", s: "Titles and hashtags generated" },
  { t: "Publish", s: "YouTube Data API" },
];

const INTERESTS = [
  { t: "Agentic AI", s: "How LLM-driven systems plan, use tools and act on goals.", icon: Sparkles },
  { t: "Multi-Agent Systems", s: "Coordinating several specialised agents on one task.", icon: Network },
  { t: "Advanced RAG", s: "Better retrieval and grounding beyond the basic pipeline.", icon: Layers },
  { t: "AI Workflow Automation", s: "Replacing repetitive multi-step work with reliable AI pipelines.", icon: Workflow },
  { t: "LLM Applications", s: "Turning model capabilities into products people can use.", icon: MessageSquare },
  { t: "Intelligent AI Assistants", s: "Assistants that answer with context and take useful actions.", icon: Bot },
];

/* ==========================================================================
   2. HELPERS
   ========================================================================== */

const ToastCtx = createContext(() => {});
const useToast = () => useContext(ToastCtx);

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

function useMedia(query) {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const h = () => setM(mq.matches);
    h();
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, [query]);
  return m;
}

const glowMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

/* A link that works when the URL is set, and explains itself when it is not. */
function SmartLink({ href, label, className, children, ariaLabel }) {
  const notify = useToast();
  if (href) {
    return (
      <a href={href} className={className} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={className} aria-label={`${ariaLabel || label} (not set yet)`}
      onClick={() => notify(`${label} is not set yet. Add it to PROFILE at the top of Portfolio.jsx.`)}>
      {children}
    </button>
  );
}

/* ==========================================================================
   3. STYLES
   ========================================================================== */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
html{scroll-behavior:smooth}
.pf{--bg:#0a0b10;--surface:#12141d;--line:rgba(255,255,255,.08);--line2:rgba(255,255,255,.17);--text:#eceef6;--muted:#a3a9bd;--blue:#3d68f2;--blue2:#8fb0ff;--violet:#7c4ddb;--violet2:#b79bff;
  font-family:'IBM Plex Sans',system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;line-height:1.6;overflow-x:hidden}
.pf *{box-sizing:border-box}
.pf h1,.pf h2,.pf h3,.display{font-family:'Sora','IBM Plex Sans',system-ui,sans-serif;letter-spacing:-.02em;margin:0}
.pf p{margin:0}
.pf a{color:inherit;text-decoration:none}
.pf button{font-family:inherit;color:inherit}
.mono{font-family:'JetBrains Mono',ui-monospace,Menlo,monospace}
.muted{color:var(--muted)}
.pf :focus-visible{outline:2px solid var(--blue2);outline-offset:3px;border-radius:6px}
.sec{scroll-margin-top:68px;padding:5.5rem 1.25rem}
.wrap{max-width:72rem;margin:0 auto}
.h2{font-size:clamp(1.75rem,4vw,2.5rem);font-weight:600;line-height:1.15}
.lead{max-width:34rem;margin-top:.75rem;color:var(--muted)}

.nav{position:fixed;top:0;left:0;right:0;z-index:40;background:rgba(10,11,16,.78);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.nav-link{padding:.4rem .75rem;border-radius:.6rem;font-size:.9rem;color:var(--muted);transition:color .2s,background .2s}
.nav-link:hover{color:var(--text);background:rgba(255,255,255,.05)}
.nav-link.on{color:var(--text)}
.mark{width:2.25rem;height:2.25rem;border-radius:.65rem;display:grid;place-items:center;font-family:'Sora',sans-serif;font-weight:600;font-size:.85rem;background:linear-gradient(135deg,var(--blue),var(--violet));color:#fff}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.72rem 1.15rem;border-radius:.75rem;font-weight:500;font-size:.925rem;cursor:pointer;border:1px solid var(--line2);background:transparent;color:var(--text);transition:background .2s,border-color .2s,transform .15s}
.btn:hover{border-color:rgba(143,176,255,.6);background:rgba(61,104,242,.1)}
.btn:active{transform:translateY(1px)}
.btn-primary{background:linear-gradient(135deg,var(--blue),var(--violet));border-color:transparent;color:#fff}
.btn-primary:hover{background:linear-gradient(135deg,#5379f5,#8d5ee6);border-color:transparent}
.btn-sm{padding:.5rem .85rem;font-size:.85rem;border-radius:.65rem}
.icon-btn{width:2.75rem;height:2.75rem;display:grid;place-items:center;border-radius:.75rem;border:1px solid var(--line2);background:transparent;cursor:pointer;transition:background .2s,border-color .2s}
.icon-btn:hover{border-color:rgba(143,176,255,.6);background:rgba(61,104,242,.1)}

.card{background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015));border:1px solid var(--line);border-radius:1.15rem}
.glow{position:relative;overflow:hidden}
.glow::before{content:"";position:absolute;inset:0;background:radial-gradient(280px circle at var(--mx,50%) var(--my,0%),rgba(120,140,255,.15),transparent 60%);opacity:0;transition:opacity .25s;pointer-events:none}
.glow:hover::before{opacity:1}
.glow>*{position:relative}
.chip{display:inline-flex;align-items:center;padding:.18rem .6rem;border-radius:999px;font-size:.78rem;border:1px solid var(--line);color:#cdd2e4;background:rgba(255,255,255,.03);white-space:nowrap}
.chip-b{border-color:rgba(143,176,255,.35);color:var(--blue2);background:rgba(61,104,242,.1)}
.chip-v{border-color:rgba(183,155,255,.35);color:var(--violet2);background:rgba(124,77,219,.12)}

/* hero */
.hero{position:relative;padding:7rem 1.25rem 4rem;min-height:100vh;display:flex;align-items:center}
.hero::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(60rem 40rem at 85% 20%,rgba(124,77,219,.20),transparent 60%),radial-gradient(50rem 36rem at 5% 90%,rgba(61,104,242,.16),transparent 60%)}
.hero-grid{position:relative;display:grid;gap:2.5rem;grid-template-columns:1fr;align-items:center}
.h1{font-size:clamp(2.4rem,6vw,4.1rem);font-weight:600;line-height:1.06}
.h1 .soft{background:linear-gradient(100deg,var(--blue2),var(--violet2));-webkit-background-clip:text;background-clip:text;color:transparent}
.rise{animation:rise .7s cubic-bezier(.2,.7,.2,1) both}
.d1{animation-delay:.08s}.d2{animation-delay:.16s}.d3{animation-delay:.24s}.d4{animation-delay:.32s}
@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.title-item{padding:0 .75rem;border-left:1px solid var(--line2);font-size:.88rem;color:var(--muted)}
.title-item:first-child{padding-left:0;border-left:none}
.map-card{border-radius:1.5rem;padding:1rem 1rem 1.25rem;border:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.015));backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 0 0 1px rgba(124,77,219,.12),0 30px 80px -30px rgba(61,104,242,.35)}
.node{cursor:pointer}
.ring{transform-box:fill-box;transform-origin:center;animation:ring 2.4s ease-out infinite}
@keyframes ring{0%{transform:scale(.7);opacity:.7}100%{transform:scale(1.9);opacity:0}}
.flow{stroke-dasharray:6 8;animation:flow 1.2s linear infinite}
@keyframes flow{to{stroke-dashoffset:-28}}
.fadein{animation:fadein .35s ease both}
@keyframes fadein{from{opacity:0}to{opacity:1}}

/* layouts */
.cols-2{display:grid;gap:2rem;grid-template-columns:1fr}
.skills-grid{display:grid;gap:1rem;grid-template-columns:1fr}
.pgrid{display:grid;gap:1.25rem;grid-template-columns:1fr}
.int-grid{display:grid;gap:.9rem;grid-template-columns:1fr}
.flag{display:grid;grid-template-columns:1fr}
.contact-grid{display:grid;gap:2rem;grid-template-columns:1fr}
@media(min-width:768px){
  .sec{padding:7rem 2rem}
  .hero{padding:7rem 2rem 4rem}
  .skills-grid{grid-template-columns:repeat(2,1fr)}
  .pgrid{grid-template-columns:repeat(2,1fr)}
  .pgrid .wide{grid-column:span 2}
  .pgrid .wide-md{grid-column:span 2}
  .int-grid{grid-template-columns:repeat(2,1fr)}
  .cols-2{grid-template-columns:1.2fr 1fr;gap:3rem}
  .contact-grid{grid-template-columns:1fr 1.1fr;gap:3rem}
  .flag{grid-template-columns:1.25fr 1fr}
}
@media(min-width:1024px){
  .hero-grid{grid-template-columns:1fr 1.05fr;gap:3rem}
  .skills-grid{grid-template-columns:repeat(3,1fr)}
  .pgrid{grid-template-columns:repeat(6,1fr)}
  .pgrid .p3{grid-column:span 2}
  .pgrid .p2{grid-column:span 3}
  .pgrid .wide{grid-column:span 6}
  .exp-grid{display:grid;gap:2rem;grid-template-columns:1fr 1fr}
}

/* project visuals */
.vis{height:9rem;border-bottom:1px solid var(--line);background:radial-gradient(circle at 50% 120%,rgba(124,77,219,.22),transparent 65%),rgba(255,255,255,.015);display:grid;place-items:center;overflow:hidden}
.pipe{position:relative;padding-left:1.75rem}
.pipe::before{content:"";position:absolute;left:.45rem;top:.7rem;bottom:.7rem;width:2px;background:linear-gradient(var(--blue),var(--violet));opacity:.7}
.pipe-step{position:relative;padding:.35rem 0 .9rem}
.pipe-step:last-child{padding-bottom:0}
.pipe-step::before{content:"";position:absolute;left:-1.75rem;top:.7rem;width:.95rem;height:.95rem;border-radius:50%;background:var(--bg);border:2px solid var(--blue2)}
.mini-flow{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;padding:0 1rem;justify-content:center}
.mini-box{padding:.3rem .6rem;border-radius:.5rem;border:1px solid var(--line2);font-size:.74rem;background:rgba(255,255,255,.04)}

/* timeline */
.tl{position:relative;padding-left:2rem}
.tl::before{content:"";position:absolute;left:7px;top:8px;bottom:8px;width:2px;background:linear-gradient(var(--blue),var(--violet) 75%,transparent)}
.tl-item{position:relative;margin-bottom:1.25rem}
.tl-dot{position:absolute;left:-2rem;top:1.35rem;width:16px;height:16px;border-radius:50%;background:var(--bg);border:2px solid var(--blue2)}
.tl-dot.fill{background:var(--blue);border-color:var(--blue2)}

/* terminal */
.term{border-radius:1rem;border:1px solid var(--line2);background:#0c0d14;overflow:hidden}
.term-bar{display:flex;align-items:center;gap:.5rem;padding:.6rem .9rem;border-bottom:1px solid var(--line);font-size:.8rem;color:var(--muted)}
.term-body{height:17rem;overflow-y:auto;padding:.9rem;font-size:.82rem;line-height:1.65}
.term-in{display:flex;gap:.5rem;align-items:center;padding:.6rem .9rem;border-top:1px solid var(--line)}
.term-input{flex:1;min-width:0;background:transparent;border:none;color:var(--text);font-size:16px;outline:none;font-family:'JetBrains Mono',monospace}
.term-input:focus-visible{outline:none}
.term-in:focus-within{box-shadow:inset 0 0 0 1px rgba(143,176,255,.5)}
.cmd{padding:.25rem .65rem;border-radius:.5rem;border:1px solid var(--line2);background:transparent;font-size:.78rem;cursor:pointer;font-family:'JetBrains Mono',monospace;color:var(--blue2)}
.cmd:hover{background:rgba(61,104,242,.12)}

/* form */
.field{width:100%;padding:.75rem .9rem;border-radius:.75rem;background:rgba(255,255,255,.04);border:1px solid var(--line2);color:var(--text);font-size:1rem;font-family:inherit}
.field::placeholder{color:#7c8298}
.field[aria-invalid="true"]{border-color:#ff8a98}
.err{color:#ffa3ae;font-size:.82rem;margin-top:.3rem}
.notice{display:flex;gap:.6rem;padding:.8rem .95rem;border-radius:.75rem;font-size:.88rem;border:1px solid var(--line2)}

/* modal */
.overlay{position:fixed;inset:0;z-index:60;background:rgba(4,5,9,.74);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:flex-end;justify-content:center;animation:fadein .2s ease both}
.modal{width:100%;max-width:46rem;max-height:92vh;overflow-y:auto;background:#10121a;border:1px solid var(--line2);border-radius:1.5rem 1.5rem 0 0;padding:1.5rem 1.25rem 2rem;animation:sheet .3s cubic-bezier(.2,.8,.2,1) both}
@keyframes sheet{from{transform:translateY(24px);opacity:0}to{transform:none;opacity:1}}
@media(min-width:768px){.overlay{align-items:center;padding:1.5rem}.modal{border-radius:1.5rem;padding:2rem}}
.ph{border:1.5px dashed var(--line2);border-radius:.85rem;padding:1rem;color:var(--muted);font-size:.85rem;text-align:center}
.draft{font-size:.72rem;padding:.1rem .5rem;border-radius:999px;border:1px dashed rgba(255,208,120,.55);color:#ffd78a;margin-left:.5rem;font-weight:500;vertical-align:middle}
.toast{position:fixed;left:50%;bottom:1.25rem;transform:translateX(-50%);z-index:80;max-width:min(92vw,28rem);padding:.8rem 1rem;border-radius:.85rem;background:#1a1d2b;border:1px solid var(--line2);font-size:.88rem;box-shadow:0 10px 40px rgba(0,0,0,.5);animation:fadein .2s ease both}

@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  .pf *,.pf *::before,.pf *::after{animation:none!important;transition:none!important}
}
`;

/* ==========================================================================
   4. HERO VISUAL: neural map
   ========================================================================== */

function NeuralMap() {
  const isMobile = useMedia("(max-width: 767px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual || reduced) return;
    const t = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 2600);
    return () => clearInterval(t);
  }, [manual, reduced]);

  const W = isMobile ? 360 : 640;
  const H = isMobile ? 500 : 440;
  const pts = useMemo(
    () => (isMobile
      ? [[90, 50], [260, 128], [100, 214], [260, 300], [100, 386], [250, 452]]
      : [[62, 300], [160, 150], [270, 300], [380, 150], [490, 300], [580, 150]]),
    [isMobile]
  );

  const edge = (a, b) =>
    isMobile
      ? `M${a[0]} ${a[1]} C ${a[0]} ${(a[1] + b[1]) / 2}, ${b[0]} ${(a[1] + b[1]) / 2}, ${b[0]} ${b[1]}`
      : `M${a[0]} ${a[1]} C ${(a[0] + b[0]) / 2} ${a[1]}, ${(a[0] + b[0]) / 2} ${b[1]}, ${b[0]} ${b[1]}`;

  const mesh = useMemo(() => {
    let s = 7;
    const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    const dots = Array.from({ length: isMobile ? 26 : 38 }, () => [r() * W, r() * H]);
    const links = [];
    dots.forEach((p, i) => dots.forEach((q, j) => {
      if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < (isMobile ? 85 : 100)) links.push([p, q]);
    }));
    return { dots, links };
  }, [isMobile, W, H]);

  const stage = STAGES[active];
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const sats = useMemo(() => {
    if (isMobile) return [];
    const [x, y] = pts[active];
    const up = y < 240;
    const angles = up ? [-150, -90, -30] : [150, 90, 30];
    const radii = [66, 88, 66];
    const idx = stage.tech.length === 2 ? [0, 2] : stage.tech.length === 3 ? [0, 1, 2] : [0, 1, 2];
    return stage.tech.slice(0, 3).map((label, k) => {
      const i = idx[k];
      const a = (angles[i] * Math.PI) / 180;
      const cx = x + radii[i] * Math.cos(a);
      const cy = y + radii[i] * Math.sin(a);
      const w = label.length * 6.3 + 18;
      return { label, cx, cy, w, px: clamp(cx - w / 2, 6, W - 6 - w) };
    });
  }, [active, isMobile, pts, stage, W]);

  return (
    <div className="map-card" onMouseLeave={() => setManual(false)}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="group" aria-label="Interactive map: Python to Machine Learning to LLMs to RAG to AI Agents to Intelligent Applications" style={{ display: "block", maxHeight: isMobile ? 520 : 460 }}>
        <defs>
          <linearGradient id="lit" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2={H}>
            <stop offset="0" stopColor="#5b86ff" />
            <stop offset="1" stopColor="#a47dff" />
          </linearGradient>
          <radialGradient id="halo">
            <stop offset="0" stopColor="#7c8cff" stopOpacity=".55" />
            <stop offset="1" stopColor="#7c8cff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {mesh.links.map(([p, q], i) => (
          <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="rgba(130,150,255,.10)" strokeWidth="1" />
        ))}
        {mesh.dots.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="1.6" fill="rgba(165,180,255,.35)" />)}

        {pts.slice(0, -1).map((p, i) => {
          const lit = i < active;
          return (
            <g key={i}>
              <path d={edge(p, pts[i + 1])} fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="1.5" />
              {lit && <path d={edge(p, pts[i + 1])} fill="none" stroke="url(#lit)" strokeWidth="2.2" className={i === active - 1 && !reduced ? "flow" : ""} />}
            </g>
          );
        })}

        {sats.map((s, i) => (
          <g key={s.label + active} className="fadein" style={{ animationDelay: `${i * 60}ms` }}>
            <line x1={pts[active][0]} y1={pts[active][1]} x2={s.cx} y2={s.cy} stroke="rgba(143,176,255,.4)" strokeWidth="1" />
            <rect x={s.px} y={s.cy - 11} width={s.w} height="22" rx="11" fill="#171a28" stroke="rgba(143,176,255,.45)" />
            <text x={s.px + s.w / 2} y={s.cy + 4} textAnchor="middle" fontSize="11" fill="#d7dcf0" fontFamily="IBM Plex Sans, sans-serif">{s.label}</text>
          </g>
        ))}

        {pts.map(([x, y], i) => {
          const on = i === active;
          const reached = i <= active;
          const labelUp = !isMobile && y > 240;
          const lx = isMobile ? (x < 180 ? x + 28 : x - 28) : x;
          const ly = isMobile ? y + 4 : labelUp ? y - 28 : y + 36;
          const anchor = isMobile ? (x < 180 ? "start" : "end") : "middle";
          const select = () => { setManual(true); setActive(i); };
          return (
            <g key={i} className="node" tabIndex={0} role="button" aria-pressed={on} aria-label={`${STAGES[i].title}: show details`}
              onClick={select} onMouseEnter={select} onFocus={select}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(); } }}>
              {on && <circle cx={x} cy={y} r="40" fill="url(#halo)" />}
              {on && !reduced && <circle cx={x} cy={y} r="16" fill="none" stroke="#8fb0ff" strokeWidth="1.5" className="ring" />}
              <circle cx={x} cy={y} r={on ? 17 : 14} fill="#0f1119" stroke={reached ? "url(#lit)" : "rgba(255,255,255,.3)"} strokeWidth="2" />
              <circle cx={x} cy={y} r={on ? 7 : 5} fill={reached ? "#8fb0ff" : "rgba(255,255,255,.35)"} />
              <circle cx={x} cy={y} r="30" fill="transparent" />
              <text x={lx} y={ly} textAnchor={anchor} fontSize="13" fontWeight={on ? 600 : 500}
                fill={on ? "#ffffff" : "#b4bad0"} fontFamily="Sora, sans-serif"
                stroke="#0a0b10" strokeWidth="4" paintOrder="stroke">{STAGES[i].label}</text>
            </g>
          );
        })}
      </svg>

      <div className="px-2 pt-3" style={{ minHeight: "8.5rem" }} aria-live={manual ? "polite" : "off"}>
        <h3 className="display" style={{ fontSize: "1.05rem", fontWeight: 600 }}>{stage.title}</h3>
        <p className="muted" style={{ fontSize: ".9rem", marginTop: ".25rem", maxWidth: "34rem" }}>{stage.blurb}</p>
        <div className="flex flex-wrap gap-2 mt-3 md:hidden">
          {stage.tech.map((t) => <span key={t} className="chip chip-b">{t}</span>)}
        </div>
        <p style={{ fontSize: ".85rem", marginTop: ".6rem" }}><span className="muted">In my work: </span>{stage.seen}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. SECTIONS
   ========================================================================== */

function Nav() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const jump = (e, id) => { e.preventDefault(); setOpen(false); go(id); };

  return (
    <header className="nav">
      <div className="wrap flex items-center justify-between" style={{ height: "4rem", padding: "0 1.25rem" }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-3" aria-label="Vengatesh V, back to top">
          <span className="mark">VV</span>
          <span className="display" style={{ fontWeight: 600 }}>{PROFILE.name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => jump(e, n.id)} className={`nav-link ${current === n.id ? "on" : ""}`} aria-current={current === n.id ? "true" : undefined}>{n.label}</a>
          ))}
        </nav>
        <button type="button" className="icon-btn md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="md:hidden" aria-label="Mobile" style={{ padding: ".5rem 1.25rem 1.25rem", borderTop: "1px solid var(--line)" }}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => jump(e, n.id)} className="nav-link" style={{ display: "block", padding: ".8rem .5rem", fontSize: "1rem" }}>{n.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid" style={{ width: "100%" }}>
        <div>
          <div className="rise flex items-center gap-3" style={{ marginBottom: "1.5rem" }}>
            <span className="mark" style={{ width: "3rem", height: "3rem", fontSize: "1rem", borderRadius: ".85rem" }}>VV</span>
            <div>
              <p className="display" style={{ fontSize: "1.15rem", fontWeight: 600 }}>{PROFILE.name}</p>
              <p className="flex flex-wrap" style={{ marginTop: ".15rem" }}>
                {PROFILE.titles.map((t) => <span key={t} className="title-item">{t}</span>)}
              </p>
            </div>
          </div>
          <h1 className="h1 rise d1">
            Building Intelligent Systems. <span className="soft">Turning AI Into Reality.</span>
          </h1>
          <p className="muted rise d2" style={{ marginTop: "1.25rem", maxWidth: "34rem", fontSize: "1.05rem" }}>
            I'm Vengatesh V, an aspiring AI Engineer and Python Full Stack Developer passionate about building intelligent applications using Generative AI, LLMs, RAG, and automation.
          </p>
          <div className="flex flex-wrap gap-3 rise d3" style={{ marginTop: "2rem" }}>
            <button type="button" className="btn btn-primary" onClick={() => go("projects")}>View my projects <ChevronRight size={16} /></button>
            <button type="button" className="btn" onClick={() => go("contact")}>Contact me</button>
          </div>
          <div className="flex gap-3 rise d4" style={{ marginTop: "1.5rem" }}>
            <SmartLink href={PROFILE.github} label="GitHub" className="icon-btn" ariaLabel="GitHub profile"><Github size={20} /></SmartLink>
            <SmartLink href={PROFILE.linkedin} label="LinkedIn URL" className="icon-btn" ariaLabel="LinkedIn profile"><Linkedin size={20} /></SmartLink>
          </div>
        </div>
        <div className="rise d2"><NeuralMap /></div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="sec">
      <div className="wrap cols-2">
        <div>
          <h2 className="h2">About me</h2>
          <div className="muted" style={{ marginTop: "1.25rem", maxWidth: "36rem", display: "grid", gap: "1rem" }}>
            <p>
              I'm a B.Tech Information Technology student at Francis Xavier Engineering College, Tirunelveli, graduating in 2027. I got into AI because it makes software do things that used to need a person: reading, writing and making sense of information. I like being the one who turns that into something people can actually use.
            </p>
            <p>
              Most of my work is in Python. I've built a pipeline that generates and publishes educational videos, an app that writes personalised cold emails using retrieval, and a Flutter mobile app with an AI assistant. I enjoy the whole path from idea to a running application: the model, the API, the database and the interface.
            </p>
            <p>
              I'm still learning, and I want to keep it that way. Right now I'm exploring agentic AI, advanced RAG and AI workflow automation.
            </p>
          </div>
        </div>
        <div className="card glow" style={{ padding: "1.5rem", alignSelf: "start" }} onMouseMove={glowMove}>
          <h3 className="display" style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "1rem" }}>At a glance</h3>
          <dl style={{ margin: 0, display: "grid", gap: ".9rem", fontSize: ".92rem" }}>
            {[
              ["Studying", `${PROFILE.degree}, expected ${PROFILE.graduation}`],
              ["CGPA", PROFILE.cgpa],
              ["Experience", "Python Intern at Prodigy Infotech"],
              ["Focus", "Generative AI, LLMs, RAG, Python full stack"],
              ["Flagship work", "AI-driven YouTube content system (IEEE project)"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "6.5rem 1fr", gap: ".75rem" }}>
                <dt className="muted">{k}</dt><dd style={{ margin: 0 }}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="sec">
      <div className="wrap">
        <h2 className="h2">Technical skills</h2>
        <p className="lead">The tools I use to build, grouped by what they do.</p>
        <div className="skills-grid" style={{ marginTop: "2.5rem" }}>
          {SKILL_GROUPS.map(({ title, icon: Icon, items }) => (
            <div key={title} className="card glow" style={{ padding: "1.4rem" }} onMouseMove={glowMove}>
              <div className="flex items-center gap-3" style={{ marginBottom: "1rem" }}>
                <span style={{ width: "2.4rem", height: "2.4rem", borderRadius: ".7rem", display: "grid", placeItems: "center", background: "rgba(61,104,242,.14)", color: "var(--blue2)", border: "1px solid rgba(143,176,255,.25)" }}><Icon size={18} /></span>
                <h3 className="display" style={{ fontSize: "1rem", fontWeight: 600 }}>{title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {items.map((s) => <li key={s} className="chip">{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="muted" style={{ marginTop: "1.5rem", fontSize: ".92rem" }}>
          How I work: {WORKING_STYLE.join(", ")}.
        </p>
      </div>
    </section>
  );
}

/* ---- project visuals ---- */

function ProjectVisual({ kind }) {
  const t = { fontSize: 10.5, fill: "#cdd2e4", fontFamily: "JetBrains Mono, monospace" };
  if (kind === "emailflow") {
    return (
      <div className="mini-flow" aria-hidden="true">
        {["Job page", "Extract", "Match portfolio", "Email"].map((s, i, a) => (
          <span key={s} className="flex items-center gap-2"><span className="mini-box" style={i === a.length - 1 ? { borderColor: "rgba(143,176,255,.6)", color: "#8fb0ff" } : undefined}>{s}</span>{i < a.length - 1 && <ChevronRight size={13} color="#7c8298" />}</span>
        ))}
      </div>
    );
  }
  if (kind === "phone") {
    return (
      <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <g stroke="rgba(143,176,255,.4)" fill="none">
          <path d="M132 50 H96 M132 90 H96 M188 50 H224 M188 90 H224" />
        </g>
        <rect x="132" y="14" width="56" height="112" rx="12" fill="#12141d" stroke="#8fb0ff" strokeWidth="1.5" />
        <rect x="142" y="28" width="36" height="8" rx="3" fill="rgba(143,176,255,.35)" />
        <rect x="142" y="44" width="36" height="46" rx="4" fill="rgba(124,77,219,.3)" />
        <rect x="142" y="98" width="24" height="6" rx="3" fill="rgba(255,255,255,.2)" />
        {[["Gemini", 10, 38], ["Cloudinary", 10, 78]].map(([l, x, y]) => (
          <g key={l}><rect x={x} y={y} width="86" height="24" rx="12" fill="#171a28" stroke="rgba(143,176,255,.4)" /><text x={x + 43} y={y + 16} textAnchor="middle" {...t}>{l}</text></g>
        ))}
        {[["FastAPI", 224, 38], ["MongoDB", 224, 78]].map(([l, x, y]) => (
          <g key={l}><rect x={x} y={y} width="86" height="24" rx="12" fill="#171a28" stroke="rgba(183,155,255,.45)" /><text x={x + 43} y={y + 16} textAnchor="middle" {...t}>{l}</text></g>
        ))}
      </svg>
    );
  }
  if (kind === "location") {
    return (
      <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        {[18, 38, 58].map((r, i) => <circle key={r} cx="160" cy="76" r={r} fill="none" stroke="rgba(143,176,255,.32)" strokeDasharray={i === 2 ? "3 5" : undefined} />)}
        {[[118, 52], [208, 62], [186, 108], [128, 98]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#b79bff" />)}
        <path d="M160 92 C150 78 146 72 146 66 a14 14 0 0 1 28 0 c0 6 -4 12 -14 26z" fill="#3d68f2" stroke="#8fb0ff" />
        <circle cx="160" cy="66" r="5" fill="#0a0b10" />
      </svg>
    );
  }
  if (kind === "explain") {
    const cells = Array.from({ length: 36 }, (_, i) => ((i * 37 + 11) % 10) / 10);
    return (
      <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        {cells.map((v, i) => <rect key={i} x={60 + (i % 9) * 22} y={22 + Math.floor(i / 9) * 22} width="18" height="18" rx="4" fill={v > 0.6 ? "#7c4ddb" : "#3d68f2"} opacity={0.15 + v * 0.75} />)}
        <polyline points="60,128 100,118 140,124 180,108 220,114 258,100" fill="none" stroke="#8fb0ff" strokeWidth="1.5" />
      </svg>
    );
  }
  if (kind === "loop") {
    return (
      <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <path d="M110 70 a50 50 0 1 1 18 38" fill="none" stroke="url(#lg2)" strokeWidth="2.5" strokeLinecap="round" />
        <defs><linearGradient id="lg2" x1="0" x2="1"><stop offset="0" stopColor="#5b86ff" /><stop offset="1" stopColor="#a47dff" /></linearGradient></defs>
        <path d="M118 112 l12 -6 l-3 -12" fill="none" stroke="#a47dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="160" cy="70" r="9" fill="#3d68f2" stroke="#8fb0ff" />
        <text x="160" y="132" textAnchor="middle" {...t}>Track 3</text>
      </svg>
    );
  }
  return null;
}

function ProjectCard({ p, cls, onOpen }) {
  return (
    <article className={`card glow ${cls}`} style={{ display: "flex", flexDirection: "column", borderRadius: "1.05rem" }} onMouseMove={glowMove}>
      <div className="vis"><ProjectVisual kind={p.visual} /></div>
      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <span className="chip chip-v" style={{ alignSelf: "flex-start", marginBottom: ".75rem" }}>{p.badge}</span>
        <h3 className="display" style={{ fontSize: "1.15rem", fontWeight: 600 }}>{p.name}</h3>
        <p className="muted" style={{ fontSize: ".92rem", marginTop: ".5rem" }}>{p.short}</p>
        <ul className="flex flex-wrap gap-2" style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }}>
          {p.tech.slice(0, 5).map((t) => <li key={t} className="chip">{t}</li>)}
          {p.tech.length > 5 && <li className="chip">+{p.tech.length - 5} more</li>}
        </ul>
        <div className="flex flex-wrap gap-2" style={{ marginTop: "auto", paddingTop: "1.25rem" }}>
          <button type="button" className="btn btn-sm btn-primary" onClick={(e) => onOpen(p, e.currentTarget)} aria-label={`View details: ${p.name}`}>View details</button>
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm" aria-label={`${p.name} on GitHub`}><Github size={15} /> GitHub</a>}
        </div>
      </div>
    </article>
  );
}

function Flagship({ p, onOpen }) {
  return (
    <article className="card glow wide flag" style={{ borderRadius: "1.5rem", borderColor: "rgba(143,176,255,.28)", boxShadow: "0 0 0 1px rgba(124,77,219,.1), 0 40px 90px -40px rgba(61,104,242,.45)" }} onMouseMove={glowMove}>
      <div style={{ padding: "1.75rem" }}>
        <span className="chip chip-b">{p.badge}</span>
        <h3 className="display" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 600, lineHeight: 1.2, marginTop: "1rem" }}>{p.name}</h3>
        <p className="muted" style={{ marginTop: ".9rem", maxWidth: "34rem" }}>{p.short} It focuses on Generative AI, intelligent automation, multimedia processing and API integration.</p>
        <ul className="flex flex-wrap gap-2" style={{ listStyle: "none", margin: "1.25rem 0 0", padding: 0 }}>
          {p.tech.map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
        <div className="flex flex-wrap gap-2" style={{ marginTop: "1.75rem" }}>
          <button type="button" className="btn btn-primary" onClick={(e) => onOpen(p, e.currentTarget)} aria-label={`View details: ${p.name}`}>View details</button>
        </div>
      </div>
      <div style={{ padding: "1.75rem", borderTop: "1px solid var(--line)", background: "radial-gradient(circle at 80% 0%, rgba(124,77,219,.2), transparent 60%)" }} className="flag-side">
        <p className="display" style={{ fontSize: ".95rem", fontWeight: 600, marginBottom: "1rem" }}>How a video gets made</p>
        <div className="pipe">
          {FLAGSHIP_STEPS.map((s) => (
            <div key={s.t} className="pipe-step">
              <p style={{ fontWeight: 500, fontSize: ".95rem" }}>{s.t}</p>
              <p className="muted" style={{ fontSize: ".85rem" }}>{s.s}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function Section({ title, children, draft }) {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h4 className="display" style={{ fontSize: ".95rem", fontWeight: 600, marginBottom: ".5rem", margin: 0 }}>
        {title}{draft && <span className="draft">Draft, edit this</span>}
      </h4>
      <div className="muted" style={{ fontSize: ".95rem", marginTop: ".5rem" }}>{children}</div>
    </div>
  );
}

function ProjectModal({ p, trigger, onClose }) {
  const ref = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll("a[href],button:not([disabled])");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      trigger?.focus?.();
    };
  }, [onClose, trigger]);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="pm-title" ref={ref}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="chip chip-v">{p.badge}</span>
            <h3 id="pm-title" className="display" style={{ fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.2, marginTop: ".75rem" }}>{p.name}</h3>
          </div>
          <button type="button" ref={closeRef} className="icon-btn" style={{ flexShrink: 0 }} aria-label="Close details" onClick={onClose}><X size={20} /></button>
        </div>



        <Section title="Problem statement"><p>{p.problem}</p></Section>
        <Section title="Proposed solution"><p>{p.solution}</p></Section>
        <Section title="Technologies used">
          <ul className="flex flex-wrap gap-2" style={{ listStyle: "none", margin: 0, padding: 0 }}>{p.tech.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
        </Section>
        <Section title="Key features">
          <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "grid", gap: ".3rem" }}>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
        </Section>
        {p.contribution && <Section title="Project context"><p>{p.contribution}</p></Section>}
        {p.future.length > 0 && (
          <Section title="Future improvements">
            <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "grid", gap: ".3rem" }}>{p.future.map((f) => <li key={f}>{f}</li>)}</ul>
          </Section>
        )}

        <div className="flex flex-wrap gap-2" style={{ marginTop: "2rem" }}>
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn"><Github size={16} /> View on GitHub</a>}
          <button type="button" className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [open, setOpen] = useState(null);
  const [trigger, setTrigger] = useState(null);
  const openIt = (p, el) => { setTrigger(el); setOpen(p); };
  const [flag, ...rest] = PROJECTS;
  const cls = (i) => "p3" + (i === 2 ? " wide-md" : "");
  return (
    <section id="projects" className="sec">
      <div className="wrap">
        <h2 className="h2">Featured projects</h2>
        <p className="lead">Four projects across generative AI, mobile and automation. Open any card for the full breakdown.</p>
        <div className="pgrid" style={{ marginTop: "2.5rem" }}>
          <Flagship p={flag} onOpen={openIt} />
          {rest.map((p, i) => <ProjectCard key={p.id} p={p} cls={cls(i)} onOpen={openIt} />)}
        </div>
      </div>
      {open && <ProjectModal p={open} trigger={trigger} onClose={() => setOpen(null)} />}
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="sec">
      <div className="wrap">
        <h2 className="h2">Experience and education</h2>
        <div className="tl" style={{ marginTop: "2.5rem", maxWidth: "40rem" }}>
          <div className="tl-item">
            <span className="tl-dot fill" aria-hidden="true" />
            <div className="card" style={{ padding: "1.25rem 1.4rem" }}>
              <p className="flex items-center gap-2 muted" style={{ fontSize: ".85rem" }}><GraduationCap size={16} /> Education, in progress</p>
              <h3 className="display" style={{ fontSize: "1.1rem", fontWeight: 600, marginTop: ".4rem" }}>{PROFILE.degree}</h3>
              <p style={{ marginTop: ".25rem" }}>{PROFILE.college}</p>
              <div className="flex flex-wrap gap-2" style={{ marginTop: ".9rem" }}>
                <span className="chip chip-b">CGPA {PROFILE.cgpa}</span>
                <span className="chip">Expected graduation {PROFILE.graduation}</span>
              </div>
            </div>
          </div>
          <div className="tl-item">
            <span className="tl-dot fill" aria-hidden="true" />
            <div className="card" style={{ padding: "1.25rem 1.4rem" }}>
              <p className="flex items-center gap-2 muted" style={{ fontSize: ".85rem" }}><Briefcase size={16} /> Internship</p>
              <h3 className="display" style={{ fontSize: "1.1rem", fontWeight: 600, marginTop: ".4rem" }}>Python Intern</h3>
              <p style={{ marginTop: ".25rem" }}>Prodigy Infotech</p>
              {/* Add dates or responsibilities here when you want to show them. */}
            </div>
          </div>
          <div className="tl-item" style={{ marginBottom: 0 }}>
            <span className="tl-dot" aria-hidden="true" />
            <p className="muted" style={{ padding: ".6rem 0" }}>Graduating in {PROFILE.graduation}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const COMMANDS = {
  help: ["Available commands:", "  about      who I am", "  interests  what I'm exploring", "  skills     my toolkit", "  projects   what I've built", "  contact    how to reach me", "  clear      clear the screen"],
  about: ["Vengatesh V, B.Tech IT student (graduating 2027).", "I build intelligent applications with Python, LLMs and RAG."],
  interests: INTERESTS.map((i) => `- ${i.t}`).concat(["These are areas I'm learning, not finished work."]),
  skills: SKILL_GROUPS.map((g) => `${g.title}: ${g.items.join(", ")}`),
  projects: PROJECTS.map((p) => `- ${p.name}`),
  contact: [`GitHub: ${PROFILE.github}`, `Email: ${PROFILE.email || "(add your email in PROFILE)"}`, "Or use the contact form below."],
};

function AITerminal() {
  const [lines, setLines] = useState([{ t: "out", x: "Welcome. Tap a command below or type one. Try \"interests\"." }]);
  const [val, setVal] = useState("");
  const box = useRef(null);
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [lines]);

  const run = (cmd) => {
    const c = cmd.trim().toLowerCase();
    if (!c) return;
    if (c === "clear") { setLines([]); return; }
    const out = COMMANDS[c] || [`command not found: ${c}. Type "help" to see commands.`];
    setLines((l) => [...l, { t: "in", x: c }, ...out.map((x) => ({ t: "out", x }))]);
  };

  return (
    <div className="term mono">
      <div className="term-bar"><Terminal size={15} /> <span>ask-vengatesh</span></div>
      <div className="term-body" ref={box} role="log" aria-live="polite" tabIndex={0} aria-label="Terminal output">
        {lines.map((l, i) => (
          <p key={i} style={{ whiteSpace: "pre-wrap", color: l.t === "in" ? "#8fb0ff" : "#cdd2e4" }}>
            {l.t === "in" ? `$ ${l.x}` : l.x}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap gap-2" style={{ padding: ".6rem .9rem", borderTop: "1px solid var(--line)" }}>
        {["help", "interests", "skills", "projects", "contact"].map((c) => (
          <button key={c} type="button" className="cmd" onClick={() => run(c)}>{c}</button>
        ))}
      </div>
      <div className="term-in">
        <span style={{ color: "#8fb0ff" }} aria-hidden="true">$</span>
        <input className="term-input" aria-label="Terminal command" placeholder="type a command" value={val} autoComplete="off" autoCapitalize="off" spellCheck={false}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { run(val); setVal(""); } }} />
      </div>
    </div>
  );
}

function Exploring() {
  return (
    <section id="exploring" className="sec">
      <div className="wrap">
        <h2 className="h2">What I'm exploring</h2>
        <p className="lead">Areas I'm learning right now. These are directions I'm moving in, not finished professional work.</p>
        <div className="cols-2" style={{ marginTop: "2.5rem", alignItems: "start" }}>
          <div className="int-grid">
            {INTERESTS.map(({ t, s, icon: Icon }) => (
              <div key={t} className="card glow" style={{ padding: "1.2rem", borderRadius: ".95rem" }} onMouseMove={glowMove}>
                <Icon size={18} color="#8fb0ff" />
                <h3 className="display" style={{ fontSize: ".98rem", fontWeight: 600, marginTop: ".7rem" }}>{t}</h3>
                <p className="muted" style={{ fontSize: ".88rem", marginTop: ".3rem" }}>{s}</p>
              </div>
            ))}
          </div>
          <AITerminal />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [errs, setErrs] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | demo | error

  const validate = (x) => {
    const e = {};
    if (x.name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.email)) e.email = "Enter a valid email address, like name@company.com.";
    if (x.message.trim().length < 10) e.message = "Write a message of at least 10 characters.";
    return e;
  };
  const set = (k) => (e) => {
    const nv = { ...v, [k]: e.target.value };
    setV(nv);
    if (errs[k]) setErrs(validate(nv));
  };

  /* In a Next.js port, wrap these fields in a real <form onSubmit>. */
  const submit = async () => {
    const e = validate(v);
    setErrs(e);
    if (Object.keys(e).length) return;
    if (!PROFILE.formEndpoint) {
      const subject = encodeURIComponent(`Portfolio message from ${v.name.trim()}`);
      const body = encodeURIComponent(`${v.message.trim()}\n\nFrom: ${v.name.trim()} (${v.email.trim()})`);
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(PROFILE.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(v),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("sent");
      setV({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const field = (k, label, props = {}) => (
    <div>
      <label htmlFor={`f-${k}`} style={{ display: "block", fontSize: ".9rem", marginBottom: ".4rem" }}>{label}</label>
      {k === "message"
        ? <textarea id="f-message" rows={5} className="field" value={v[k]} onChange={set(k)} aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `e-${k}` : undefined} {...props} />
        : <input id={`f-${k}`} className="field" value={v[k]} onChange={set(k)} aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `e-${k}` : undefined} {...props} />}
      {errs[k] && <p id={`e-${k}`} className="err" role="alert">{errs[k]}</p>}
    </div>
  );

  return (
    <section id="contact" className="sec" style={{ paddingBottom: "4rem" }}>
      <div className="wrap contact-grid">
        <div>
          <h2 className="h2">Have an idea worth building? Let's turn it into something intelligent.</h2>
          <div style={{ marginTop: "2rem", display: "grid", gap: ".9rem", maxWidth: "26rem" }}>
            <p className="display" style={{ fontSize: "1.1rem", fontWeight: 600 }}>{PROFILE.name}</p>
            <SmartLink href={PROFILE.email ? `mailto:${PROFILE.email}` : ""} label="Email" className="btn" ariaLabel="Email me">
              <Mail size={16} /> {PROFILE.email || "your.email@example.com (placeholder)"}
            </SmartLink>
            <SmartLink href={PROFILE.linkedin} label="LinkedIn URL" className="btn" ariaLabel="LinkedIn profile">
              <Linkedin size={16} /> {PROFILE.linkedin ? "LinkedIn" : "LinkedIn (add your URL)"}
            </SmartLink>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn"><Github size={16} /> github.com/Vengatesh-01</a>
          </div>
        </div>

        <div className="card" style={{ padding: "1.5rem", display: "grid", gap: "1rem", alignSelf: "start", borderRadius: "1.25rem" }} role="group" aria-label="Contact form">
          {field("name", "Your name", { autoComplete: "name" })}
          {field("email", "Your email", { type: "email", autoComplete: "email", inputMode: "email" })}
          {field("message", "Message")}
          <button type="button" className="btn btn-primary" onClick={submit} disabled={status === "sending"}>
            <Send size={16} /> {status === "sending" ? "Sending..." : "Send message"}
          </button>
          <div aria-live="polite">
            {status === "sent" && <div className="notice" style={{ background: "rgba(80,200,140,.08)", borderColor: "rgba(80,200,140,.4)" }}><Check size={18} color="#6fe0a8" style={{ flexShrink: 0 }} /> Message sent. Thanks for reaching out.</div>}
            {status === "error" && <div className="notice" style={{ background: "rgba(255,120,140,.08)", borderColor: "rgba(255,120,140,.4)" }}><AlertCircle size={18} color="#ffa3ae" style={{ flexShrink: 0 }} /> The message could not be sent. Try again, or use the email or LinkedIn buttons.</div>}
            {status === "mailto" && <div className="notice" style={{ background: "rgba(61,104,242,.08)", borderColor: "rgba(143,176,255,.4)" }}><Check size={18} color="#8fb0ff" style={{ flexShrink: 0 }} /> Your email app should open with the message ready to send. If it doesn't, write to {PROFILE.email}.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "1.75rem 1.25rem" }}>
      <div className="wrap flex flex-wrap items-center justify-between gap-3 muted" style={{ fontSize: ".85rem" }}>
        <p>© {new Date().getFullYear()} {PROFILE.name}</p>
        <p>Built with React and Tailwind CSS</p>
      </div>
    </footer>
  );
}

/* ==========================================================================
   6. APP
   ========================================================================== */

export default function Portfolio() {
  const [toast, setToast] = useState("");
  const timer = useRef(null);
  const notify = (m) => {
    setToast(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 4200);
  };

  /* SEO: in Next.js, move these into the `metadata` export of app/layout.tsx. */
  useEffect(() => {
    document.title = `${PROFILE.name} | AI Engineer and Python Full Stack Developer`;
    const set = (sel, attr, key, val) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", val);
    };
    set('meta[name="description"]', "name", "description", META_DESCRIPTION);
    set('meta[property="og:title"]', "property", "og:title", `${PROFILE.name} | AI Engineer`);
    set('meta[property="og:description"]', "property", "og:description", META_DESCRIPTION);
    set('meta[name="theme-color"]', "name", "theme-color", "#0a0b10");
  }, []);

  return (
    <ToastCtx.Provider value={notify}>
      <style>{CSS}</style>
      <div className="pf">
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Exploring />
          <Contact />
        </main>
        <Footer />
        {toast && <div className="toast" role="status">{toast}</div>}
      </div>
    </ToastCtx.Provider>
  );
}
