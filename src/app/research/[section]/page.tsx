'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { SECTION_ICONS } from '@/components/SectionIcons';

const API_URL = 'https://plan-b-admin-api-production.up.railway.app';

interface ResearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  publishedAt: string;
  externalUrl: string;
  pdfUrl: string;
  featured: boolean;
}

const SECTIONS: Record<string, { iconKey: string; en: string; ru: string; pt: string; categories: string[] }> = {
  'market-reports': {
    iconKey: 'MarketReports', en: 'Market Reports & Forecasts', ru: 'Рыночные отчёты и прогнозы', pt: 'Relatórios de Mercado',
    categories: ['Market Report'],
  },
  'city-reports': {
    iconKey: 'CityReports', en: 'City Reports', ru: 'Городские отчёты', pt: 'Relatórios por Cidade',
    categories: ['Region Analysis', 'City Report'],
  },
  'district-guides': {
    iconKey: 'DistrictGuides', en: 'District Guides', ru: 'Гайды по районам', pt: 'Guias por Bairro',
    categories: ['Investment Guide', 'District Guide'],
  },
  'developer-reviews': {
    iconKey: 'DeveloperReviews', en: 'Developer Reviews', ru: 'Обзоры застройщиков', pt: 'Análise de Desenvolvedores',
    categories: ['Developer Review'],
  },
  'guides': {
    iconKey: 'GuidesResources', en: 'Guides & Resources', ru: 'Гайды и ресурсы', pt: 'Guias e Recursos',
    categories: ['Tax & Legal', 'Relocation'],
  },
};

export default function ResearchSectionPage() {
  const params = useParams();
  const section = params?.section as string;
  const { language } = useLanguage();
  const [items, setItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionData = section ? SECTIONS[section] : undefined;

  useEffect(() => {
    if (!section || !sectionData) { setLoading(false); return; }

    fetch(`${API_URL}/api/research?limit=50`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.data?.length) {
          const filtered = data.data
            .filter((r: any) => {
              const cat = r.category || '';
              const status = r.status || 'published';
              return status !== 'draft' && sectionData.categories.includes(cat);
            })
            .map((r: any) => ({
              id: String(r.id || ''),
              title: String(r.title || ''),
              description: String(r.description || ''),
              category: String(r.category || ''),
              coverImage: String(r.cover_image || ''),
              publishedAt: String(r.published_at || ''),
              externalUrl: String(r.external_url || ''),
              pdfUrl: String(r.pdf_url || ''),
              featured: Boolean(r.featured),
            }))
            .sort((a: ResearchItem, b: ResearchItem) => {
              if (a.featured !== b.featured) return a.featured ? -1 : 1;
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
            });
          setItems(filtered);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [section]);

  if (!sectionData && section) {
    return (
      <main className="min-h-screen bg-navy-950">
        <Header />
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-2xl text-white mb-4">Section not found</h1>
            <Link href="/#research" className="text-gold-400 hover:underline">← Back to Research</Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!section) return null;

  const sectionTitle = sectionData?.[language as keyof typeof sectionData] || sectionData?.en || section;
  const IconComponent = SECTION_ICONS[section || ''];

  return (
    <main className="min-h-screen bg-navy-950">
      <Header />

      <section className="py-20 bg-gradient-to-b from-navy-950 to-navy-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/#research" className="text-gold-400/60 hover:text-gold-400 text-sm transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Research
            </Link>
          </div>

          {/* Section Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-gold-400/50" />
              {IconComponent && <IconComponent className="w-10 h-10" />}
              <span className="text-gold-400 text-xs tracking-[0.25em] uppercase font-semibold">{sectionTitle}</span>
              <div className="w-8 h-[1px] bg-gold-400/50" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">{sectionTitle}</h1>
            <p className="mt-4 text-sm text-white/50 max-w-2xl mx-auto">
              {items.length} report{items.length !== 1 ? 's' : ''} available for download
            </p>
          </motion.div>

          {/* Cards Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/40">No reports in this category yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((item, index) => {
                const linkUrl = item.pdfUrl || item.externalUrl || '#';
                const isDownload = !!item.pdfUrl;
                return (
                  <motion.a
                    key={item.id}
                    href={linkUrl}
                    target={linkUrl.startsWith('http') ? '_blank' : undefined}
                    download={isDownload ? true : undefined}
                    rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="group relative rounded-xl overflow-hidden bg-navy-900/80 border border-white/10 hover:border-gold-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-400/5"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-navy-800">
                      {item.coverImage ? (
                        <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        {item.category && (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-400 border border-amber-500/30">
                            {item.category}
                          </span>
                        )}
                        {item.publishedAt && (
                          <span className="text-white/30 text-[10px]">
                            {new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-sm text-white mb-2 group-hover:text-gold-400 transition-colors duration-300 line-clamp-2 leading-snug">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-3">{item.description}</p>
                      )}

                      <div className="flex items-center gap-2 text-xs font-semibold text-gold-400 group-hover:opacity-80 transition-opacity">
                        Download
                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
