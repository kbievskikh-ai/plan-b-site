'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProjectPageClient from './ProjectPageClient';

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    fetch('https://api.gronisbrazil.com/api/properties/slug/' + slug)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setProperty(data); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ed' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#D4AF37', fontSize: 18, marginBottom: 8 }}>Loading...</div>
          <div style={{ color: '#999', fontSize: 12 }}>Loading project data</div>
        </div>
      </div>
    );
  }

  return <ProjectPageClient property={property} slug={slug} />;
}
