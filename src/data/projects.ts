import { pick, type Localized } from '../i18n/localized';
import { asset, type Locale } from '../lib/href';

type Dimension = '2D' | '3D';

/**
 * Same production facts as the game posts in `content.config.ts`, so both
 * grids can render the same fact sheet. Unlike posts, projects have no
 * `pubDate`, so `year` is stored here instead of being baked into the title.
 */
interface ProjectEntry {
  techStack: string[];
  ctaLink: string;
  image: string;
  year: number;
  dimension?: Dimension;
  engine?: string;
  genre?: Localized<string>;
  role?: Localized<string[]>;
  team?: Localized<string>;
  duration?: Localized<string>;
  /** Path under `public/`. See `videoPreview` in `content.config.ts`. */
  videoPreview?: string;
  title: Localized<string>;
  description: Localized<string>;
  ctaText: Localized<string>;
}

const VIDEO_CTA: Localized<string> = { en: 'Video →', es: 'Vídeo →' };
const GITHUB_CTA: Localized<string> = { en: 'GitHub →', es: 'GitHub →' };

const SOLO: Localized<string> = { en: 'Solo', es: 'Individual' };
const TEAM_OF_2: Localized<string> = { en: 'Team of 2', es: 'Equipo de 2' };
const MULTIPLAYER: Localized<string> = { en: 'Online multiplayer', es: 'Multijugador online' };
const NETWORK_PROGRAMMER: Localized<string[]> = { en: ['Network Programmer'], es: ['Programador de red'] };
const GRAPHICS_PROGRAMMER: Localized<string[]> = { en: ['Graphics Programmer'], es: ['Programador gráfico'] };

const entries: ProjectEntry[] = [
  {
    techStack: ['Unity', 'C#', 'Combat System', 'AI FSM', 'Scriptable Objects', 'Rider'],
    ctaLink: 'https://youtu.be/51P_9O86KOE',
    ctaText: VIDEO_CTA,
    image: asset('/images/projects/combat_souls.png'),
    dimension: '3D',
    year: 2025,
    engine: 'Unity',
    genre: { en: 'Combat system', es: 'Sistema de combate' },
    role: { en: ['Gameplay Programmer'], es: ['Programador de gameplay'] },
    team: SOLO,
    duration: { en: '3 weeks', es: '3 semanas' },
    title: {
      en: 'Souls-like Combat System',
      es: 'Sistema de Combate Souls-like',
    },
    description: {
      en: 'A 3D Souls-like combat system in Unity, where I focused on building a clean, optimized, and modular player system with solid architecture. For example, you can set and customize player combos through Scriptable Objects.',
      es: 'Sistema de combate 3D estilo Souls en Unity, centrado en una arquitectura limpia, optimizada y modular para el jugador. Por ejemplo, se pueden definir y personalizar combos mediante Scriptable Objects.',
    },
  },
  {
    techStack: ['C++', 'UDP', 'ECS', 'Sockets', 'Visual Studio'],
    ctaLink: 'https://github.com/NahuelAparicio10/UDP_Shooter_GameServer',
    ctaText: GITHUB_CTA,
    image: asset('/images/projects/shooter_udp.png'),
    dimension: '2D',
    year: 2025,
    engine: 'C++',
    genre: MULTIPLAYER,
    role: NETWORK_PROGRAMMER,
    team: TEAM_OF_2,
    duration: { en: '2 weeks', es: '2 semanas' },
    title: {
      en: 'UDP Shooter Game',
      es: 'Shooter UDP',
    },
    description: {
      en: 'A 2D online multiplayer shooter built in C++ with UDP sockets. Includes a client, authoritative game server, and service server for matchmaking, authentication, and ranking.',
      es: 'Shooter multijugador online 2D desarrollado en C++ con sockets UDP. Incluye cliente, servidor de juego autoritativo y servidor de servicios para matchmaking, autenticación y ranking.',
    },
  },
  {
    techStack: ['C++', 'TCP', 'ECS', 'Visual Studio'],
    ctaLink: 'https://github.com/llucferrando/AA2_TCP_Parchis',
    ctaText: GITHUB_CTA,
    image: asset('/images/projects/splash.png'),
    dimension: '2D',
    year: 2025,
    engine: 'C++',
    genre: MULTIPLAYER,
    role: NETWORK_PROGRAMMER,
    team: TEAM_OF_2,
    duration: { en: '2 weeks', es: '2 semanas' },
    title: {
      en: 'TCP Parchis/Ludo Game',
      es: 'Parchís TCP',
    },
    description: {
      en: 'Online multiplayer version of the classic board game Parchis, built in C++ with TCP sockets and an ECS architecture. Includes login, lobby creation, and full gameplay loop.',
      es: 'Versión multijugador online del clásico Parchís, desarrollada en C++ con sockets TCP y arquitectura ECS. Incluye login, creación de salas y ciclo de juego completo.',
    },
  },
  {
    techStack: ['C++', 'C', 'OpenGL', 'Engine', 'ECS', '3D Scene', 'Lights'],
    ctaLink: 'https://github.com/NahuelAparicio10/OpenGL_MiniEngine',
    ctaText: GITHUB_CTA,
    image: asset('/images/projects/engine_spotlight.png'),
    dimension: '3D',
    year: 2024,
    engine: 'OpenGL',
    genre: { en: 'Rendering engine', es: 'Motor de render' },
    role: GRAPHICS_PROGRAMMER,
    team: SOLO,
    duration: { en: '2 weeks', es: '2 semanas' },
    title: {
      en: 'OpenGL - Mini Engine',
      es: 'OpenGL - Mini Motor',
    },
    description: {
      en: 'Mini engine built in C++ with OpenGL showcasing real-time lighting. Features day/night cycle, ambient light, dynamic flashlight, and procedural scene generation.',
      es: 'Mini motor desarrollado en C++ con OpenGL mostrando iluminación en tiempo real. Incluye ciclo día/noche, luz ambiental, linterna dinámica y generación procedural de escenas.',
    },
  },
  {
    techStack: ['C#', 'Custom Math', 'Unity'],
    ctaLink: 'https://github.com/NahuelAparicio10/GerstnerWaves',
    ctaText: GITHUB_CTA,
    image: asset('/images/projects/waves.png'),
    dimension: '3D',
    year: 2024,
    engine: 'Unity',
    genre: { en: 'Procedural simulation', es: 'Simulación procedural' },
    role: GRAPHICS_PROGRAMMER,
    team: SOLO,
    duration: { en: '1 day', es: '1 día' },
    title: {
      en: 'Gerstner Waves',
      es: 'Gerstner Waves',
    },
    description: {
      en: 'Recreation of sea waves using a mesh array of points and custom math. Implemented Gerstner waves for realistic motion and developed buoyancy logic so floating objects respond naturally to the sea surface.',
      es: 'Recreación de olas marinas usando una malla de puntos y matemáticas personalizadas. Implementación de olas de Gerstner para un movimiento realista y lógica de flotación para que los objetos respondan naturalmente a la superficie.',
    },
  },
];

export interface ProjectItem {
  title: string;
  techStack: string[];
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  year: number;
  dimension?: Dimension;
  engine?: string;
  genre?: string;
  role?: string[];
  team?: string;
  duration?: string;
  videoPreview?: string;
}

function pickOptional<T>(value: Localized<T> | undefined, locale: Locale): T | undefined {
  return value ? pick(value, locale) : undefined;
}

export function getProjects(locale: Locale): ProjectItem[] {
  return entries.map((entry) => ({
    techStack: entry.techStack,
    ctaLink: entry.ctaLink,
    image: entry.image,
    year: entry.year,
    dimension: entry.dimension,
    engine: entry.engine,
    genre: pickOptional(entry.genre, locale),
    role: pickOptional(entry.role, locale),
    team: pickOptional(entry.team, locale),
    duration: pickOptional(entry.duration, locale),
    videoPreview: entry.videoPreview,
    title: pick(entry.title, locale),
    description: pick(entry.description, locale),
    ctaText: pick(entry.ctaText, locale),
  }));
}
