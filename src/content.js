// All site copy lives here. Components just render it.

export const site = {
  firstName: 'Eamon',
  lastName: 'Cobb',
  eyebrow: 'Data & Analytics',
  bio: 'Mathematics at Queen’s University, now a Data Analyst at TechInsights in Ottawa.',
  status: 'Currently at TechInsights',
  location: 'Ottawa, ON',
  email: 'eamoncobb2003@gmail.com',
  linkedin: {
    label: 'eamon-alexander-cobb',
    url: 'https://linkedin.com/in/eamon-alexander-cobb',
  },
  github: {
    label: 'eamoncobb03',
    url: 'https://github.com/eamoncobb03',
  },
}

// ids must match the section ids rendered in App.jsx.
export const nav = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

// The card in the hero. Set this to null while nothing is shippable and the
// card renders its waiting state instead.
export const currentProject = {
  name: 'Investment Planner',
  stage: 'In progress',
  blurb: 'A tool for modelling contributions and projecting portfolio growth.',
  href: '/investmentplanner/',
}

// `highlights` is optional. Add lines to a role and it becomes expandable in
// the Experience list; leave it empty and the role renders as a plain row.
export const roles = [
  {
    title: 'Data Analyst',
    org: 'TechInsights',
    year: '2026',
    current: true,
    highlights: [],
  },
  { title: 'Technical Team Intern', org: 'TechInsights', year: '2025', highlights: [] },
  { title: 'Data Analyst Intern', org: 'SOGH Ottawa', year: '2024', highlights: [] },
  { title: 'Web Developer Intern', org: 'BlackToe Running', year: '2023', highlights: [] },
]

// Closes out the Experience section rather than getting its own. `graduated`
// is separate from `years` so the card can say it's finished without anything
// having to parse the range.
export const education = {
  years: '2022 – 2026',
  graduated: '2026',
  degree: 'BSc Honours, Mathematics',
  school: 'Queen’s University',
  location: 'Kingston, ON',
}

export const skillGroups = [
  { label: 'Programming', items: ['Python', 'SQL', 'R', 'JavaScript', 'C'] },
  { label: 'Visualization & BI', items: ['React', 'QuickSight', 'Tableau', 'Power BI', 'Excel'] },
  { label: 'Data Engineering', items: ['AWS', 'Snowflake', 'PostgreSQL', 'ETL Pipelines'] },
  { label: 'Tools & Workflow', items: ['Git', 'Jira', 'Confluence', 'Power Automate', 'Claude Code'] },
]

// Add entries to `items` and the waiting state disappears on its own.
// Each one takes: title, year, and optionally blurb, tags and href.
//
//   {
//     title: 'Investment Planner',
//     year: '2026',
//     blurb: 'One or two lines on what it does and what you built.',
//     tags: ['Python', 'PostgreSQL'],
//     href: '/investmentplanner',   // omit and the card is not a link
//   }
export const projects = {
  blurb:
    'Data tools and interactive builds. The first few are in progress and will show up here as they ship.',
  items: [],
}
