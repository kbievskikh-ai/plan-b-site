'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

type Lang = 'en' | 'ru' | 'pt';

const NAVY = '#1B2951';
const GOLD = '#D4AF37';

function formatBrl(n: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(n);
}

function formatUsd(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function ProjectPage() {
  const params = useParams();
  const slug = (params?.slug || '') as string;
  const [data, setData] = useState<Record<string, unknown> | null>(undefined as unknown as null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!slug) { setFetched(true); return; }
    console.log('Fetching slug:', slug);
    fetch('https://api.gronisbrazil.com/api/properties/slug/' + encodeURIComponent(slug))
      .then(r => { console.log('Response status:', r.status); return r.ok ? r.json() : null; })
      .then(d => { console.log('Data:', d ? 'got data' : 'null'); setData(d); setFetched(true); })
      .catch(e => { console.error('Fetch error:', e); setData(null); setFetched(true); });
  }, [slug]);

  // Loading state
  if (!fetched) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ed' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: GOLD, fontSize: 18 }}>Loading project...</div>
        </div>
      </div>
    );
  }

  // Not found
  if (!data) {
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

  // Got data - render project page
  const title = (data.project_name as string) || (data.title as string) || 'Project';
  const location = (data.location as string) || '';
  const listPrice = data.list_price as number;
  const images = (data.images as Array<{url: string}>) || [];
  const builtArea = data.built_area as number;
  const beds = data.beds as number;
  const parking = data.parking_spaces as number;
  const deliveryYear = data.delivery_year as number;
  const description = (data.full_description_en as string) || (data.description as string) || '';
  const features = (data.features as Array<{name: string; name_ru?: string; name_en?: string}>) || [];
  const latitude = data.latitude as number;
  const longitude = data.longitude as number;
  const status = (data.status as string) || '';
  const monthlyRent = data.monthly_rent_estimate as number;
  const roiPct = data.roi_percentage as number;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f5f3ed', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Header */}
      <header style={{ background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 56 }}>
        <a href="/" style={{ color: GOLD, fontWeight: 800, fontSize: 14, letterSpacing: 4, textDecoration: 'none' }}>G R O N I S</a>
        <span style={{ color: '#aaa', fontSize: 12 }}>International Real Estate</span>
      </header>

      {/* Hero */}
      <div style={{ position: 'relative', height: 400, background: images.length > 0 ? `url(${images[0].url}) center/cover` : `linear-gradient(135deg, ${NAVY}, #2a3f75)` }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 48px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{title}</h1>
          <div style={{ display: 'flex', gap: 16, color: '#ccc', fontSize: 14, flexWrap: 'wrap' }}>
            {location && <span>📍 {location}</span>}
            {deliveryYear && <span>📅 Delivery: {deliveryYear}</span>}
            {listPrice && <span style={{ color: GOLD, fontWeight: 700 }}>{formatBrl(listPrice)}</span>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
        {builtArea && <StatBox label="Area" value={`${builtArea} m²`} />}
        {beds && <StatBox label="Suites" value={`${beds}`} />}
        {parking && <StatBox label="Parking" value={`${parking}`} />}
        {deliveryYear && <StatBox label="Delivery" value={`${deliveryYear}`} />}
        {status && <StatBox label="Status" value={status} />}
      </div>

      {/* Description */}
      {description && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 32px' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, border: '1px solid #e5e5e5' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>About this project</h2>
            <p style={{ color: '#555', lineHeight: 1.8, fontSize: 14, whiteSpace: 'pre-line' }}>{description}</p>
          </div>
        </div>
      )}

      {/* Gallery */}
      {images.length > 1 && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 32px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>Gallery</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {images.slice(1).map((img, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', background: `url(${img.url}) center/cover`, border: '1px solid #e5e5e5' }} />
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {features.length > 0 && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 32px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>Features & Amenities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 8, padding: '12px 16px', border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: GOLD }}>✦</span>
                <span style={{ fontSize: 13, color: '#444' }}>{f.name_en || f.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Investment */}
      {listPrice && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 32px' }}>
          <div style={{ background: `linear-gradient(135deg, ${NAVY}, #2a3f75)`, borderRadius: 12, padding: 32, color: '#fff' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, fontFamily: "'Playfair Display', serif" }}>Investment Analysis</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
              <div>
                <div style={{ color: '#aaa', fontSize: 12 }}>Purchase Price</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: GOLD }}>{formatBrl(listPrice)}</div>
                <div style={{ color: '#aaa', fontSize: 13 }}>~{formatUsd(Math.round(listPrice / 5.3))} USD</div>
              </div>
              {monthlyRent && (
                <div>
                  <div style={{ color: '#aaa', fontSize: 12 }}>Est. Monthly Rent</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: GOLD }}>{formatBrl(monthlyRent)}</div>
                </div>
              )}
              {roiPct && (
                <div>
                  <div style={{ color: '#aaa', fontSize: 12 }}>Annual ROI</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: GOLD }}>{roiPct}%</div>
                </div>
              )}
            </div>
          </div>
          <p style={{ color: '#999', fontSize: 11, marginTop: 12, textAlign: 'center' }}>* Estimates at 5.3 BRL/USD. Past performance does not guarantee future results.</p>
        </div>
      )}

      {/* Map */}
      {latitude && longitude && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 32px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>Location</h2>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e5e5' }}>
            <iframe src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`} width="100%" height="350" style={{ border: 0 }} loading="lazy" />
          </div>
        </div>
      )}

      {/* CTA Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #e5e5e5', padding: '12px 24px', display: 'flex', justifyContent: 'center', gap: 12, zIndex: 40 }}>
        <a href="https://wa.me/5548988117424" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 24px', borderRadius: 8, background: '#25D366', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>💬 WhatsApp Us</a>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, padding: '18px 20px', border: '1px solid #e5e5e5', textAlign: 'center' }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: GOLD }}>{value}</div>
      <div style={{ fontSize: 11, color: '#888', marginTop: 4, textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}
