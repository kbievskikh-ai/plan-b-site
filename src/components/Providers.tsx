'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { SettingsProvider } from '@/lib/settings';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SettingsProvider>
        {children}
      </SettingsProvider>
    </LanguageProvider>
  );
}
