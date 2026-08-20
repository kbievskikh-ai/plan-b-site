/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        // Static assets served from /public (images, floor plans, videos) get
        // no long-term caching by default on Vercel, unlike /_next/static
        // (which is content-hashed and already immutable-cached). These paths
        // are effectively immutable in practice — filenames don't get
        // overwritten in place — so a 1-year immutable cache is safe and
        // removes the repeat-visit re-download PageSpeed flags.
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/floor-plans/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/frameworks/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // PDFs (reports/guides) at the /public root — shorter cache since these
        // do get replaced in place with updated content under the same filename.
        source: '/:path*.pdf',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, must-revalidate' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Porto Belo Area Investment Guide (District Guide) дублирует уже живой Porto Belo
      // Investment Report 2026 (City Report) — отдельная страница не нужна, 301 на основную статью.
      // Правило с ?lang=ru идёт первым (более специфичное), чтобы не потерять язык при редиректе.
      {
        source: '/research/report/porto-belo-area-investment-guide',
        has: [{ type: 'query', key: 'lang', value: 'ru' }],
        destination: '/research/report/porto-belo-investment-report-2026?lang=ru',
        permanent: true,
      },
      {
        source: '/research/report/porto-belo-area-investment-guide',
        destination: '/research/report/porto-belo-investment-report-2026',
        permanent: true,
      },
      // Foreign Buyer's Guide To Brazil (Tax & Legal) дублирует уже живой "How to Buy Property in
      // Brazil" (kak-kupit-nedvizhimost-braziliya) — исходная запись переведена в draft (не в листингах),
      // 301 на актуальную статью. VNZH (vnzh-braziliya-nedvizhimost) занимает освободившееся место
      // в категории Tax & Legal / Guides & Resources.
      {
        source: '/research/report/foreign-buyer-s-guide-to-brazil',
        has: [{ type: 'query', key: 'lang', value: 'ru' }],
        destination: '/research/report/kak-kupit-nedvizhimost-braziliya?lang=ru',
        permanent: true,
      },
      {
        source: '/research/report/foreign-buyer-s-guide-to-brazil',
        destination: '/research/report/kak-kupit-nedvizhimost-braziliya',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
