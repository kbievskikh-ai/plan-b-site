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
