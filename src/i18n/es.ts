import type { TranslationSchema } from './en';

/**
 * Typed against the English schema, so a missing or renamed key is a build
 * error rather than a string that silently falls back at runtime.
 */
export const es: TranslationSchema = {
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    skills: 'Skills',
    games: 'Juegos',
    projects: 'Proyectos',
    contact: 'CV y Contacto',
    openMenu: 'Abrir menú',
    switchLanguage: 'Switch to English',
  },
  home: {
    role: 'Programador de Videojuegos',
    specialties: ['Gameplay', 'Herramientas', 'Automatización con IA'],
    tagline: 'Programo el puente entre el diseño y lo que siente el jugador.',
    ctaAbout: 'Sobre mí',
    ctaSkills: 'Skills',
    ctaGames: 'Juegos',
    ctaProjects: 'Proyectos',
    ctaContact: 'CV y contacto',
  },
  blog: {
    title: 'JUEGOS',
    previous: 'Anterior',
    next: 'Siguiente',
    page: 'Página',
    of: 'de',
    readingTime: 'min de lectura',
    allArticles: 'Todos los artículos',
    share: 'Compartir',
    subtitle: 'Una selección de los juegos que he desarrollado y en los que he contribuido. Haz clic en ellos para ver más información.',
  },
  showcase: {
    facts: {
      year: 'Año',
      engine: 'Motor',
      team: 'Equipo',
      duration: 'Duración',
      platforms: 'Plataformas',
      role: 'Rol',
    },
    featured: 'Destacado',
    playVideo: 'Reproducir vídeo',
    watchOnYouTube: 'Ver en YouTube',
  },
  skills: {
    expertiseTitle: 'ÁREAS DE ESPECIALIDAD',
    programming: 'LENGUAJES DE PROGRAMACIÓN',
    engines: 'MOTORES Y FRAMEWORKS',
    ides: 'IDEs Y EDITORES DE CÓDIGO',
    sourceControl: 'CONTROL DE VERSIONES Y GESTIÓN DE PROYECTOS',
    design: 'DISEÑO, MEDIA Y HERRAMIENTAS 3D',
    softTitle: 'SOFT SKILLS',
    soft: [
      'Trabajo en equipo',
      'Resolución de problemas',
      'Adaptabilidad',
      'Comunicación',
      'Pensamiento crítico',
      'Creatividad',
      'Atención al detalle',
      'Autodidacta',
      'Resiliencia',
    ],
    languagesTitle: 'IDIOMAS',
    languages: ['Español (Nativo)', 'Catalán (Nativo)', 'Inglés (Nivel B2)'],
  },
  about: {
    fullName: 'Nahuel Aparicio Del Blanco',
    role: 'Programador de Videojuegos · Gameplay, Herramientas e IA – Barcelona, España.',
    paragraphs: [
      'Desde que era pequeño me ha fascinado cómo los videojuegos crean mundos llenos de vida. Esa curiosidad se transformó en una pasión por el <b>desarrollo de videojuegos</b> y la <b>programación de gameplay</b>. Actualmente, me concentro en construir <b>sistemas eficientes, modulares y divertidos de jugar</b>.',
      'Me considero con gran capacidad de <b>resolución de problemas</b>, siempre buscando escribir código escalable y abierto a feedback constructivo que me ayude a mejorar tanto personal como profesionalmente.',
      'Comencé a programar en <b>2017</b>, enfocándome principalmente en <b>Unity (C#)</b>, mientras adquiría experiencia con <b>C++</b> y motores/frameworks como Unreal, OpenGL, SFML y Phaser.',
      'Mi objetivo final es programar <b>sistemas de juego</b> que den vida a ideas y diseños, combinando precisión técnica con la magia y diversión del juego.',
    ],
  },
  skillsPage: {
    title: 'SKILLS Y HERRAMIENTAS',
    subtitle: 'Mi stack técnico para desarrollo de videojuegos y programación.',
  },
  work: {
    title: 'Experiencia Laboral',
  },
  studies: {
    title: 'Estudios',
  },
  projects: {
    title: 'Proyectos',
    heading: 'PROYECTOS',
    subtitle: 'Una muestra de los proyectos que he desarrollado y en los que he contribuido.',
    metaDescription: 'Mejores proyectos.',
  },
  footer: {
    title: 'CONTACTO Y CV',
    subtitle: '¿Quieres saber más sobre mi trayectoria? Aquí tienes mi CV.',
    downloadCv: 'Descargar CV',
    cvFile: '/CV_Nahuel_ESP.pdf',
    rights: 'Todos los derechos reservados.',
  },
};
