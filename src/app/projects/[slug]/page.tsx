'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProjectPageClient from './ProjectPageClient';

const API_URL = 'https://api.gronisbrazil.com';

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API_URL}/api/properties/slug/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ed' }}>
        <div style={{ color: '#D4AF37', fontSize: 18 }}>Loading...</div>
      </div>
    );
  }

  return <ProjectPageClient property={property} slug={slug} />;
}
