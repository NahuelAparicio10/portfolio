export const en = {
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    games: 'Game Projects',
    projects: 'Projects',
    contact: 'CV & Contact',
    openMenu: 'Open menu',
    switchLanguage: 'Cambiar a Español',
  },
  home: {
    role: 'Game Programmer',
    /** Rotated in the hero. The first one is rendered server-side. */
    specialties: ['Gameplay', 'Tools', 'AI Automation'],
    tagline: 'Building the systems, and the tools that build them.',
    ctaAbout: 'About Me',
    ctaSkills: 'Skills',
    ctaGames: 'Game Projects',
    ctaProjects: 'Projects',
    ctaContact: 'Contact Me',
  },
  blog: {
    title: 'GAME PROJECTS',
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',
    readingTime: 'min read',
    allArticles: 'All articles',
    share: 'Share',
    subtitle: 'A selection of the games I’ve developed and contributed to. Click on them to see more info about it.',
  },
  showcase: {
    facts: {
      year: 'Year',
      engine: 'Engine',
      team: 'Team',
      duration: 'Duration',
      platforms: 'Platforms',
      role: 'Role',
    },
    featured: 'Featured',
    playVideo: 'Play video',
    watchOnYouTube: 'Watch on YouTube',
  },
  skills: {
    expertiseTitle: 'CORE EXPERTISE',
    programming: 'PROGRAMMING LANGUAGES',
    engines: 'ENGINES & FRAMEWORKS',
    ides: 'IDEs & CODE EDITORS',
    sourceControl: 'SOURCE CONTROL & PROJECT MANAGEMENT',
    design: 'DESIGN, MEDIA & 3D TOOLS',
    softTitle: 'SOFT SKILLS',
    soft: [
      'Teamwork & Collaboration',
      'Problem-Solving',
      'Adaptability',
      'Communication',
      'Critical Thinking',
      'Creativity',
      'Attention to Detail',
      'Self-Learning',
      'Resilience',
    ],
    languagesTitle: 'LANGUAGES',
    languages: ['Spanish (Native)', 'Catalan (Native)', 'English (B2)'],
  },
  about: {
    fullName: 'Nahuel Aparicio Del Blanco',
    role: 'Game Programmer · Gameplay, Tools & AI – Barcelona, Spain.',
    /** Rendered with set:html because the copy contains inline emphasis. */
    paragraphs: [
      'Since I was a kid, I have been fascinated by how games create worlds that feel alive. That curiosity grew into a passion for <b>game development</b> and <b>gameplay programming</b>, where I now focus on building <b>efficient, modular, and fun-to-play systems</b>.',
      'I see myself as a <b>problem solver</b>, always striving to write maintainable code and open to constructive feedback that helps me improve both personally and professionally.',
      'I started programming in <b>2017</b>, focusing mostly on <b>Unity (C#)</b>, while also gaining experience with <b>C++</b> and engines/frameworks such as Unreal, OpenGL, SFML and Phaser.',
      'My ultimate goal is to craft <b>game systems</b> that bring ideas and designs to life, combining technical precision with the magic of play.',
    ],
  },
  skillsPage: {
    title: 'SKILLS & TOOLS',
    subtitle: 'My technical stack for game development and programming.',
  },
  work: {
    title: 'Work Experience',
  },
  studies: {
    title: 'Studies',
  },
  projects: {
    title: 'Projects',
    heading: 'PROJECTS',
    subtitle: 'A showcase of projects I have developed and contributed to.',
    metaDescription: 'Selected projects.',
  },
  footer: {
    title: 'CONTACT & CV',
    subtitle: 'Want to know more about my journey? Here’s my CV.',
    downloadCv: 'Download CV',
    /** Filename in public/. Kept here because the CV itself is language-specific. */
    cvFile: '/CV_Nahuel_ENG.pdf',
    rights: 'All rights reserved.',
  },
} as const;

export type TranslationSchema = typeof en;
