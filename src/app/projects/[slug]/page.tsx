import { Metadata } from 'next';
import ProjectPageClient from './ProjectPageClient';

const API_URL = 'https://migronis-admin-api-production.up.railway.app';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProperty(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/properties/slug/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return { title: 'Project Not Found — GRONIS' };

  const title = property.project_name || property.title || 'GRONIS Project';
  const desc = property.short_description_en || property.short_description_ru || property.description || '';
  const image = property.images?.[0]?.url || property.og_image || '/og-image.png';

  return {
    title: `${title} — GRONIS Brazil`,
    description: desc,
    openGraph: {
      title: `${title} — GRONIS Brazil`,
      description: desc,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const property = await getProperty(slug);
  return <ProjectPageClient property={property} slug={slug} />;
}
