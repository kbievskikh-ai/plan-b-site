import type { MetadataRoute } from 'next';
import { getAllProperties } from '@/lib/properties-server';
import { getAllResearch } from '@/lib/research-server';

const SITE = 'https://planbbrazil.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/platform`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE}/research/all`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/research/market-reports`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/research/city-reports`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/research/district-guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/research/developer-reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/research/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/visa-path`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/ideal-regions`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/brazil-fit-score`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/birth-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];

  // Блог — статьи, которые уже написаны
  const blogSlugs = [
    'florianopolis-neighborhoods',
    'sc-vs-algarve',
    'brazil-property-taxes',
    'buy-property-brazil-foreigner',
    'investor-visa',
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Объекты — динамически из API
  let propertyPages: MetadataRoute.Sitemap = [];
  try {
    const props = await getAllProperties();
    propertyPages = props
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${SITE}/projects/${p.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));
  } catch (e) {
    console.warn('[sitemap] failed to load properties:', e);
  }

  // Отчёты — динамически из API
  let reportPages: MetadataRoute.Sitemap = [];
  try {
    const research = await getAllResearch();
    reportPages = research.map((r) => ({
      url: `${SITE}/research/report/${r.slug}`,
      lastModified: r.publishedAt ? new Date(r.publishedAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (e) {
    console.warn('[sitemap] failed to load research:', e);
  }

  return [...staticPages, ...blogPages, ...propertyPages, ...reportPages];
}
