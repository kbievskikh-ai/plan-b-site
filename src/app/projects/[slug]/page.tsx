'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProjectPageClient from './ProjectPageClient';

const API_URL = 'https://api.gronisbrazil.com';

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [property, setProperty] = useState<Record<string, unknown> | null | false>(false);
  // false = loading, null = not found, object = found

  useEffect(() => {
    if (!slug) return;
    fetch(`${API_URL}/api/properties/slug/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setProperty(data))
      .catch(() => setProperty(null));
  }, [slug]);

  // Show loading state on initial SSR + client fetch
  if (property === false) {
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
