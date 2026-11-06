export type PageId = 
  | 'start' 
  | 'about' 
  | 'skills' 
  | 'experience' 
  | 'projects' 
  | 'contact' 
  | 'settings' 
  | 'map';

export type ThemeId = 'nes' | 'gameboy' | 'cyberpunk' | 'famicom' | 'dungeon';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  cardBg: string;
  textColor: string;
  borderColor: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  genre: string; // Also drives the Projects page filter
  period: string;
  techStack: string[];
  description: string;
  features: string[];
  cartridgeColor: string;
  badge: string;
  liveUrl?: string;
  githubUrl?: string;
  stars?: number;
  bannerArt?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  usedIn: string[]; // Internship or project where the skill was used
}

export interface ExperienceQuest {
  stage: string;
  role: string;
  guild: string; // Company / Org
  period: string;
  location: string;
  levelTitle: string;
  bossDefeated: string;
  questLog: string[];
  inventoryLoot: string[];
  icon: string;
}

export interface ContactMessage {
  adventurerName: string;
  pigeonEmail: string;
  questCategory: 'hire' | 'freelance' | 'quest' | 'greeting';
  scrollMessage: string;
}

export interface OverworldNode {
  id: PageId;
  title: string;
  subTitle: string;
  x: number; // percentage on map
  y: number; // percentage on map
  zone: string;
  unlocked: boolean;
  bossIcon: string;
}
