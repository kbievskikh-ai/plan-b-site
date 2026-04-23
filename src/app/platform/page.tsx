import { Metadata } from 'next';
import PlatformClient from './PlatformClient';

export const metadata: Metadata = {
  title: 'IKG Group Platform — Verified Real Estate Investments',
  description: 'Globally validated real estate opportunities with expert due diligence.',
};

export default function PlatformPage() {
  return <PlatformClient />;
}
