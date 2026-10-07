import { FEATURED_PROJECTS, ARCHIVE_PROJECTS, CERTIFICATIONS, PROFESSIONAL_CERTIFICATION } from './projectData';

export const SITE_URL = 'https://adityastawde.vercel.app';
export const HOME_TITLE = 'Aditya S. Tawde | AI & Data Science Student Portfolio';
export const HOME_DESCRIPTION = 'Aditya S. Tawde, B.Tech AI & Data Science student at JNEC. Explore generative AI, RAG, NLP and machine-learning projects, skills and IBM certification.';
export const PUBLIC_PATHS = ['/', '/archive', ...FEATURED_PROJECTS.map(project => `/systems/${project.id}`)];

export function pageMetadata(path) {
  const project = FEATURED_PROJECTS.find(item => `/systems/${item.id}` === path);
  if (project) return {
    title: `${project.title} | Aditya S. Tawde`,
    description: project.seoDescription,
    url: `${SITE_URL}${path}`, index: true,
  };
  if (path === '/archive') return {
    title: 'AI, Machine Learning & Software Projects | Aditya S. Tawde',
    description: 'Browse Aditya S. Tawde’s generative AI, NLP, machine-learning and software projects. Explore case studies, technology stacks and GitHub source code.',
    url: `${SITE_URL}/archive`, index: true,
  };
  return {
    title: path === '/' ? HOME_TITLE : 'Page Not Found | Aditya S. Tawde',
    description: path === '/' ? HOME_DESCRIPTION : 'This page could not be found. Explore Aditya S. Tawde’s portfolio and project case studies.',
    url: `${SITE_URL}${path}`, index: path === '/',
  };
}

export function pageStructuredData(path) {
  const metadata = pageMetadata(path);
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const graph = [
    {
      '@type': 'Person', '@id': personId,
      name: 'Aditya S. Tawde', alternateName: 'Aditya Tawde',
      url: `${SITE_URL}/`, email: 'adityatawde9699@gmail.com',
      description: 'B.Tech Artificial Intelligence & Data Science student building LLM applications and supervised machine-learning systems.',
      sameAs: ['https://github.com/adityatawde9699', 'https://www.linkedin.com/in/aditya-s-tawde'],
      affiliation: { '@type': 'CollegeOrUniversity', name: 'MGM’s Jawaharlal Nehru Engineering College (JNEC), MGM University' },
      knowsAbout: ['Generative AI', 'Machine Learning', 'Natural Language Processing', 'Retrieval-Augmented Generation', 'Python', 'LangGraph', 'scikit-learn', 'FastAPI', 'React'],
      hasCredential: [PROFESSIONAL_CERTIFICATION, ...CERTIFICATIONS].map(certificate => ({
        '@type': 'EducationalOccupationalCredential', name: certificate.name,
        credentialCategory: certificate.courses ? 'Professional Certificate' : 'Course Certificate',
        recognizedBy: { '@type': 'Organization', name: certificate.issuer.split(' / ')[0] },
      })),
    },
    { '@type': 'WebSite', '@id': websiteId, url: `${SITE_URL}/`, name: 'Aditya S. Tawde Portfolio', inLanguage: 'en-IN', publisher: { '@id': personId } },
  ];
  if (!metadata.index) return { '@context': 'https://schema.org', '@graph': graph };
  const project = FEATURED_PROJECTS.find(item => `/systems/${item.id}` === path);
  const page = {
    '@type': path === '/' ? 'ProfilePage' : path === '/archive' ? 'CollectionPage' : 'WebPage',
    '@id': `${metadata.url}#webpage`, url: metadata.url,
    name: metadata.title, description: metadata.description, inLanguage: 'en-IN',
    isPartOf: { '@id': websiteId }, about: { '@id': personId },
  };
  if (path === '/') page.mainEntity = { '@id': personId };
  if (path === '/archive') page.mainEntity = {
    '@type': 'ItemList', itemListElement: [...FEATURED_PROJECTS, ...ARCHIVE_PROJECTS].map((item, i) => ({
      '@type': 'ListItem', position: i + 1, name: item.title,
      ...(FEATURED_PROJECTS.includes(item) ? { url: `${SITE_URL}/systems/${item.id}` } : item.githubLink ? { url: item.githubLink } : {}),
    })),
  };
  if (project) {
    const sourceId = `${metadata.url}#project`;
    page.mainEntity = { '@id': sourceId };
    graph.push({
      '@type': 'SoftwareSourceCode', '@id': sourceId, name: project.title,
      description: project.built, codeRepository: project.githubLink,
      keywords: project.techStack.join(', '), author: { '@id': personId },
    });
    graph.push({
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Portfolio', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/archive` },
        { '@type': 'ListItem', position: 3, name: project.title, item: metadata.url },
      ],
    });
  }
  graph.push(page);
  return { '@context': 'https://schema.org', '@graph': graph };
}
