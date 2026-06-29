import { Hono } from 'hono';
import { etag } from 'hono/etag';

import { config } from '../config.js';
import { cached } from '../lib/cache.js';
import {
  getCertifications,
  getEducation,
  getExperiences,
  getProjects,
  getSkills,
  getTechStacks,
} from '../lib/queries.js';

/**
 * Public read endpoints. All responses are read-through cached (TTL from
 * config) and carry ETag + Cache-Control so browsers/CDN can return 304s.
 *
 * Endpoint parity with the old DRF API is preserved; `/all/` is additive and
 * lets the client collapse ~7 load-time requests into one.
 */
const portfolio = new Hono();

const TTL = config.cacheTtlSeconds;

// ETag for conditional requests; Cache-Control for browser/CDN caching.
portfolio.use('*', etag());
portfolio.use('*', async (c, next) => {
  await next();
  if (c.req.method === 'GET' && c.res.ok) {
    c.res.headers.set('Cache-Control', `public, max-age=${TTL}`);
  }
});

portfolio.get('/projects/', async (c) => {
  const featured = c.req.query('featured')?.toLowerCase() === 'true';
  const category = c.req.query('category') ?? undefined;
  const key = `projects:${featured ? 'featured' : 'all'}:${category ?? ''}`;
  const data = await cached(key, TTL, () => getProjects({ featured, category }));
  return c.json(data);
});

portfolio.get('/tech-stack/', async (c) =>
  c.json(await cached('tech-stack', TTL, getTechStacks)),
);

portfolio.get('/skills/', async (c) => c.json(await cached('skills', TTL, getSkills)));

portfolio.get('/education/', async (c) =>
  c.json(await cached('education', TTL, getEducation)),
);

portfolio.get('/certifications/', async (c) =>
  c.json(await cached('certifications', TTL, getCertifications)),
);

portfolio.get('/experience/', async (c) =>
  c.json(await cached('experience', TTL, getExperiences)),
);

/**
 * Aggregated endpoint — every section in a single response so the client only
 * makes one round-trip on page load (big win against a sleeping free-tier DB).
 */
portfolio.get('/all/', async (c) => {
  const data = await cached('all', TTL, async () => {
    const [projects, featuredProjects, skills, techStack, certifications, education, experience] =
      await Promise.all([
        getProjects(),
        getProjects({ featured: true }),
        getSkills(),
        getTechStacks(),
        getCertifications(),
        getEducation(),
        getExperiences(),
      ]);
    return { projects, featuredProjects, skills, techStack, certifications, education, experience };
  });
  return c.json(data);
});

export default portfolio;
