import VisaPathClient from './VisaPathClient';
import { LanguageProvider } from '@/lib/i18n';

export const metadata = {
  title: 'Plan B — Brazil Visa & Residency Path Calculator',
  description: 'Find your best path to Brazilian residency or citizenship. Investment, retirement, digital nomad, family reunification — calculate your options.',
};

export default function VisaPathPage() {
  return (
    <LanguageProvider>
      <VisaPathClient />
    </LanguageProvider>
  );
}
