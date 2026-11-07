import type { Project, SkillCategory, ExperienceQuest, OverworldNode } from '../types';

export const CONTACT = {
  email: 'roshanbinoj@gmail.com',
  github: 'https://github.com/roshanbinoj-iiitk',
  linkedin: 'https://www.linkedin.com/in/roshan-binoj-17m2005',
  location: 'Thiruvananthapuram, India',
};

export const HERO_PROFILE = {
  name: 'Roshan Binoj',
  title: 'Software Engineer | Full-Stack Developer | AI & Cloud',
  level: 4, // Current year of the B.Tech
  hp: '100/100',
  mp: '85/85',
  class: 'Full-Stack Developer',
  guild: 'IIIT Kottayam',
  location: CONTACT.location,
  tagline: 'CURRENT QUEST: B.TECH IN CSE, ENDS APR 2027',
  records: [
    { label: 'CGPA', value: '7.91 / 10' },
    { label: 'INTERNSHIPS', value: '1' },
    { label: 'PROJECTS', value: '7' },
    { label: 'PICOCTF 2025', value: 'TOP 4%' },
  ],
  bio: `Greetings, traveler! I'm Roshan Binoj, a software engineer and full-stack developer from Thiruvananthapuram, India. I'm studying Computer Science and Engineering at IIIT Kottayam and will finish in April 2027.`,
  bioDetail: `As a Data Science Intern at Kennedys IQ, I built a document extraction pipeline that reduced manual effort by 50%. My projects include a fleet and logistics platform, a C++17 duplicate-file detector, and an AI recipe assistant.`,
  education: {
    school: 'Indian Institute of Information Technology, Kottayam',
    degree: 'B.Tech in Computer Science and Engineering',
    period: 'Aug 2023 - Apr 2027',
    cgpa: '7.91 / 10',
    coursework: ['Data Structures and Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks', 'OOP', 'Machine Learning'],
  },
  achievements: [
    { title: 'DB COOPER 2.0', detail: 'Co-organized this cybersecurity hunt at IIIT Kottayam for 180+ participants.' },
    { title: 'AMAZON ML SUMMER SCHOOL 2025', detail: 'Ranked in the top 3,000 of 60,000 applicants.' },
    { title: 'PICOCTF', detail: 'Ranked in the top 4% globally in 2025 and the top 10% in 2024.' },
  ],
};

const KENNEDYS = 'Kennedys IQ';
const TRANSIT = 'TransitOps';
const FILES = 'Desktop File Analytics System';
const RECIPE = 'HackTheRecipe';
const TRADE = 'TradeBridge';
const FINTRACK = 'FinTrack';
const ASSEMBLER = '8051 Assembler & Emulator';
const SPOTIFY = 'Spotify Song Recommender';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    icon: '⚡',
    skills: [
      { name: 'C', usedIn: [] },
      { name: 'C++', usedIn: [FILES, ASSEMBLER] },
      { name: 'Java', usedIn: [] },
      { name: 'Python', usedIn: [KENNEDYS, RECIPE, SPOTIFY] },
      { name: 'JavaScript', usedIn: [] },
      { name: 'TypeScript', usedIn: [TRANSIT, FINTRACK, FILES, TRADE, RECIPE] },
      { name: 'SQL', usedIn: [TRADE] },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    icon: '🧪',
    skills: [
      { name: 'React', usedIn: [FINTRACK, FILES, TRADE, RECIPE] },
      { name: 'Next.js', usedIn: [TRANSIT, FINTRACK, TRADE] },
      { name: 'Node.js', usedIn: [] },
      { name: 'Express.js', usedIn: [] },
      { name: 'FastAPI', usedIn: [RECIPE] },
      { name: 'Flask', usedIn: [] },
      { name: 'Prisma', usedIn: [TRANSIT] },
      { name: 'TanStack Query', usedIn: [] },
      { name: 'Tailwind', usedIn: [TRANSIT, FINTRACK, TRADE, RECIPE] },
    ],
  },
  {
    id: 'ai/ml',
    title: 'AI / ML',
    icon: '✨',
    skills: [
      { name: 'LangChain', usedIn: [RECIPE] },
      { name: 'Gemini API', usedIn: [RECIPE] },
      { name: 'Groq API', usedIn: [KENNEDYS, FINTRACK] },
      { name: 'OpenCV', usedIn: [KENNEDYS] },
      { name: 'Tesseract OCR', usedIn: [KENNEDYS] },
      { name: 'NLP', usedIn: [KENNEDYS] },
      { name: 'Prompt Engineering', usedIn: [KENNEDYS] },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: '💾',
    skills: [
      { name: 'PostgreSQL', usedIn: [TRANSIT, TRADE] },
      { name: 'MySQL', usedIn: [] },
      { name: 'MongoDB', usedIn: [FINTRACK] },
      { name: 'SQLite', usedIn: [FILES, RECIPE] },
      { name: 'Redis', usedIn: [RECIPE] },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: '🛡️',
    skills: [
      { name: 'Git', usedIn: [KENNEDYS] },
      { name: 'GitHub Actions', usedIn: [TRANSIT] },
      { name: 'Linux', usedIn: [] },
      { name: 'Bash', usedIn: [] },
      { name: 'CMake', usedIn: [FILES, ASSEMBLER] },
      { name: 'Postman', usedIn: [] },
      { name: 'API and Integration Testing', usedIn: [] },
    ],
  },
];

export const EXPERIENCE_QUESTS: ExperienceQuest[] = [
  {
    stage: 'STAGE 1 (2025)',
    role: 'Data Science Intern',
    guild: 'Kennedys IQ',
    period: 'May 2025 - Jul 2025',
    location: 'On-site, Thiruvananthapuram, Kerala',
    levelTitle: 'Internship',
    bossDefeated: 'Manual document extraction (effort reduced by 50%)',
    questLog: [
      'Developed a document pipeline (Python, Groq LLaMA-4 Vision, Tesseract OCR) extracting policy IDs and holder details.',
      'Validated extracted data against JSON schemas, reducing manual extraction effort by 50%.',
      'Sped up processing 40% using OpenCV adaptive thresholding, bounding-box clustering, and fuzzy matching.',
    ],
    inventoryLoot: ['Python', 'Streamlit', 'OpenCV', 'Tesseract OCR', 'Groq API', 'NLP', 'Prompt Engineering', 'Regex', 'Git'],
    icon: '🧠',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'transitops',
    title: 'TransitOps',
    tagline: 'Fleet and logistics management platform built for the Odoo Hackathon',
    genre: 'Full-Stack Web App',
    period: 'Jun 2026 - Present',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'GitHub Actions'],
    cartridgeColor: '#0070ec',
    badge: 'TEAM OF 2',
    description: 'A fleet and logistics management platform built in a team of 2. I owned the database design and core backend features.',
    features: [
      'Designed a PostgreSQL schema (Prisma) with cascading deletes and atomic transactions to prevent orphaned data.',
      'Implemented JWT role-based access control securing 28+ REST API routes across 5 permission tiers.',
      'Set up a GitHub Actions CI pipeline that runs formatting, linting, and unit tests before every merge.',
    ],
    liveUrl: 'https://trytransitops.vercel.app/login',
    githubUrl: 'https://github.com/roshanbinoj-iiitk/Odoo-Hackathon-TransitOps',
  },
  {
    id: 'fintrack',
    title: 'FinTrack',
    tagline: 'Personal finance tracker with spending analytics and AI insights',
    genre: 'AI & Full-Stack',
    period: 'Jun 2026',
    techStack: ['Next.js', 'TypeScript', 'MongoDB', 'Mongoose', 'Groq API', 'Recharts', 'Tailwind CSS', 'Zod'],
    cartridgeColor: '#6844fc',
    badge: 'LIVE DEMO',
    description: 'A personal finance dashboard for logging income and expenses, exploring spending trends, and getting AI-generated recommendations.',
    features: [
      'Built transaction management on Next.js Server Actions with filtering, pagination, and bulk delete.',
      'Generated structured financial recommendations using Groq (Llama 4 Scout) in JSON mode.',
      'Added spending analytics with Recharts and CSV export of transaction data.',
    ],
    liveUrl: 'https://mini-fintech-dashboard-seven.vercel.app',
    githubUrl: 'https://github.com/roshanbinoj-iiitk/Mini-Fintech-Dashboard',
  },
  {
    id: '8051-assembler',
    title: '8051 Assembler & Emulator',
    tagline: 'C++17 assembler and cycle-counted CPU emulator for an 8051-style instruction subset',
    genre: 'Systems & Tooling',
    period: 'Apr 2026',
    techStack: ['C++17', 'CMake'],
    cartridgeColor: '#008888',
    badge: 'IN PROGRESS',
    description: 'A command-line toolchain that assembles a small 8051-inspired instruction subset into machine code and runs it in a cycle-counted emulator.',
    features: [
      'Wrote a two-pass assembler that collects labels, encodes instructions, and resolves relative jump offsets.',
      'Modeled memory and registers in a fetch-decode-execute emulator that tracks total cycles.',
      'Added checks for malformed instruction reads and out-of-range jumps, plus an optional per-step trace.',
    ],
    githubUrl: 'https://github.com/roshanbinoj-iiitk/8051-ISA-Assembler',
  },
  {
    id: 'desktop-file-analytics',
    title: 'Desktop File Analytics System',
    tagline: 'High-performance file scanner, duplicate detector, and disk space analyzer',
    genre: 'Systems & Tooling',
    period: 'Jan 2026 - Mar 2026',
    techStack: ['C++17', 'CMake', 'cpp-httplib', 'React', 'TypeScript', 'SQLite'],
    cartridgeColor: '#fcb000',
    badge: 'SPEED RUN',
    description: 'A C++17 REST API server with a React and TypeScript web client for scanning files, finding duplicates, and analyzing disk space.',
    features: [
      'Built a C++17 duplicate-file detector (size grouping, 4 KB quick hash, full XXH3-128) on an 8-thread work queue.',
      'Scanned 6,000 files (840 MB) in 0.10 s, 2.2x faster than before, with 100% precision and recall (1,480/1,480 groups).',
      'Swapped recursion for an iterative walker, cutting scan time 27% and peak memory 20% on a 22K-file tree.',
      'Designed a REST API (cpp-httplib, SQLite FTS5 search) with 1.3 ms median and under 15 ms p95 latency.',
    ],
    githubUrl: 'https://github.com/roshanbinoj-iiitk/Data-Vantage',
  },
  {
    id: 'tradebridge',
    title: 'TradeBridge',
    tagline: 'Peer-to-peer rental marketplace with payments and QR-verified pickups',
    genre: 'Full-Stack Web App',
    period: 'Aug 2025 - Nov 2025',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Stripe Connect', 'Tailwind CSS'],
    cartridgeColor: '#00a844',
    badge: 'LIVE DEMO',
    description: 'A rental marketplace where people list items, book them from each other, and pay through the platform, with community features built around trust.',
    features: [
      'Integrated Stripe Connect so lenders onboard and receive payouts, with a 10% platform fee on each checkout.',
      'Built item handover with short-lived signed QR codes (JWT, 10-minute expiry) checked on collection.',
      'Added Google sign-in, an admin panel, reviews, trust scores, follows, and a community forum.',
    ],
    liveUrl: 'https://trade-bridge-five.vercel.app',
    githubUrl: 'https://github.com/roshanbinoj-iiitk/TradeBridge',
  },
  {
    id: 'spotify-recommender',
    title: 'Spotify Song Recommender',
    tagline: 'Content-based music recommendations from a Spotify playlist',
    genre: 'AI & Machine Learning',
    period: 'Nov 2025',
    techStack: ['Python', 'scikit-learn', 'Pandas', 'Spotipy', 'Joblib', 'Jupyter'],
    cartridgeColor: '#a84000',
    badge: 'COURSE PROJECT',
    description: 'An Artificial Intelligence course project that recommends 30 new songs for a playlist by comparing it against a dataset of over 1 million tracks.',
    features: [
      'Built playlist feature vectors from normalized audio features and multi-hot encoded genres.',
      'Ranked tracks by cosine similarity, then selected 15, 10, and 5 songs from the top 3 genres.',
      'Parallelized playlist data fetching with Joblib.',
    ],
    githubUrl: 'https://github.com/roshanbinoj-iiitk/SpotifySongRecommender',
  },
  {
    id: 'hacktherecipe',
    title: 'HackTheRecipe',
    tagline: 'AI recipe assistant that turns a dish name into a grocery list',
    genre: 'AI & Full-Stack',
    period: 'Jul 2025 - Sep 2025',
    techStack: ['Python', 'FastAPI', 'Google Gemini API', 'LangChain', 'Redis', 'React', 'TypeScript', 'Tailwind CSS', 'SQLAlchemy', 'SQLite'],
    cartridgeColor: '#d82800',
    badge: 'LIVE DEMO',
    description: 'A shopping app where you name a dish, get its ingredient list, and add the matching products from a 27,000+ SKU catalog to your cart.',
    features: [
      'Created a LangChain and Gemini pipeline that turns dish queries into ingredient lists, rejecting non-food input.',
      'Added a Redis cache, cutting repeat-query latency by 95%+ (1.8 s to under 15 ms) and reducing LLM API calls.',
      'Engineered a ranking engine over a 27,000+ SKU catalog using synonym expansion, IDF scoring, and fuzzy fallbacks.',
      'Delivered a FastAPI, React 18, and TypeScript shopping app, cutting cart assembly from minutes to seconds.',
    ],
    liveUrl: 'https://hack-the-recipe.vercel.app/',
    githubUrl: 'https://github.com/roshanbinoj-iiitk/HackTheRecipe',
  },
];

export const OVERWORLD_NODES: OverworldNode[] = [
  { id: 'start', title: 'Start Screen', subTitle: 'Hero Spawn Point', x: 12, y: 70, zone: 'Spawn Village', unlocked: true, bossIcon: '🚩' },
  { id: 'about', title: 'About Me', subTitle: 'Background & Education', x: 28, y: 35, zone: 'Castle of Knowledge', unlocked: true, bossIcon: '🧙' },
  { id: 'skills', title: 'Skills', subTitle: 'Tech Tree & Magic', x: 46, y: 65, zone: 'Skill Forest', unlocked: true, bossIcon: '🌲' },
  { id: 'experience', title: 'Experience', subTitle: 'Quest Log Timeline', x: 62, y: 30, zone: 'Dungeon of Mastery', unlocked: true, bossIcon: '⚔️' },
  { id: 'projects', title: 'Projects', subTitle: 'Cartridge Arcade', x: 78, y: 60, zone: 'Arcade Realm', unlocked: true, bossIcon: '🕹️' },
  { id: 'contact', title: 'Contact', subTitle: 'Transmission Tower', x: 90, y: 25, zone: 'Beacon Citadel', unlocked: true, bossIcon: '📡' },
  { id: 'settings', title: 'Settings', subTitle: 'Arcade Config Box', x: 88, y: 82, zone: 'Airship Workshop', unlocked: true, bossIcon: '⚙️' },
];
