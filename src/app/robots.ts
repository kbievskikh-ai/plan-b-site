import type { MetadataRoute } from 'next';

const SITE = 'https://planbbrazil.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Обычные поисковики
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      {
        // AI-краулеры — явно разрешаем.
        // Твоя аудитория всё чаще спрашивает не Google, а ChatGPT/Perplexity:
        // "where to invest in Brazil real estate". Нужно быть в этих ответах.
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-User',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
        ],
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
