'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProjectPageClient from './ProjectPageClient';

const API_URL = 'https://api.gronisbrazil.com';

type PropData = Record<string, unknown> | null;
type FetchState = { loading: true } | { loading: false; data: PropData };

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [state, setState] = useState<FetchState>({ loading: true });

  useEffect(() => {
    if (!slug) { setState({ loading: false, data: null }); return; }
    fetch(`${API_URL}/api/properties/slug/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setState({ loading: false, data }))
      .catch(() => setState({ loading: false, data: null }));
  }, [slug]);

  if (state.loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ed' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#D4AF37', fontSize: 18, marginBottom: 8 }}>Loading...</div>
          <div style={{ color: '#999', fontSize: 12 }}>Loading project data</div>
        </div>
      </div>
    );
  }

  return <ProjectPageClient property={'data' in state ? state.data : null} slug={slug} />;
}
