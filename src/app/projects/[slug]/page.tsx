'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProjectPageClient from './ProjectPageClient';

const NAVY = '#1B2951';
const GOLD = '#D4AF37';
const LANG_KEY = 'gronis_lang';

type Lang = 'en' | 'ru' | 'pt';

const LANGUAGES: { code: Lang; flag: string; name: string; native: string }[] = [
  { code: 'en', flag: '🇬🇧', name: 'English', native: 'English' },
  { code: 'ru', flag: '🇷🇺', name: 'Russian', native: 'Русский' },
  { code: 'pt', flag: '🇧🇷', name: 'Portuguese', native: 'Português' },
];

export default function ProjectPage() {
  const params = useParams();
  const slug = (params?.slug || '') as string;
  const [lang, setLang] = useState<Lang | null>(null);
  const [property, setProperty] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  // Check saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && ['en', 'ru', 'pt'].includes(saved)) {
      setLang(saved as Lang);
    }
  }, []);

  // Fetch property when language is selected
  useEffect(() => {
    if (!lang || !slug) return;
    setLoading(true);
    fetch('https://api.gronisbrazil.com/api/properties/slug/' + encodeURIComponent(slug))
      .then(r => r.ok ? r.json() : null)
      .then(data => { setProperty(data); setLoading(false); })
      .catch(() => { setProperty(null); setLoading(false); });
  }, [lang, slug]);

  const selectLang = (code: Lang) => {
    localStorage.setItem(LANG_KEY, code);
    setLang(code);
  };

  // Language selection screen
  if (!lang) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${NAVY} 0%, #2a3f75 50%, ${NAVY} 100%)`,
        padding: 24,
      }}>
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{ color: GOLD, fontWeight: 800, fontSize: 20, letterSpacing: 6, marginBottom: 8 }}>
            G R O N I S
          </div>
          <div style={{ color: '#8899bb', fontSize: 12, letterSpacing: 2 }}>
            INTERNATIONAL REAL ESTATE
          </div>
        </div>

        <div style={{ color: '#ccc', fontSize: 16, marginBottom: 32, textAlign: 'center' }}>
          Choose your language
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 320 }}>
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => selectLang(l.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '18px 28px',
                borderRadius: 12,
                border: '1px solid rgba(212,175,55,0.3)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: 17,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                backdropFilter: 'blur(4px)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(212,175,55,0.15)';
                e.currentTarget.style.borderColor = GOLD;
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span style={{ fontSize: 28 }}>{l.flag}</span>
              <span>{l.native}</span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 48, color: '#556', fontSize: 11 }}>
          You can change language later
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ed' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: GOLD, fontSize: 18 }}>Loading project...</div>
        </div>
      </div>
    );
  }

  // Not found
  if (!property) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ed' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: GOLD, fontSize: 64, fontWeight: 900 }}>404</div>
          <h1 style={{ color: NAVY, fontSize: 24, fontWeight: 700 }}>Project not found</h1>
          <a href="/" style={{ color: GOLD, marginTop: 24, display: 'inline-block' }}>← Back to GRONIS</a>
        </div>
      </div>
    );
  }

  return <ProjectPageClient property={property} slug={slug} />;
}
