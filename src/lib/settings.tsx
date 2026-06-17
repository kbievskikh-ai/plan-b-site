'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const API_URL = 'https://plan-b-admin-api-production.up.railway.app';

interface SettingsContextType {
  settings: Record<string, string>;
  show: (key: string) => boolean;
  loaded: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: {},
  show: () => true,
  loaded: false,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/settings`)
      .then(res => res.json())
      .then(data => { setSettings(data); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  const show = (key: string) => settings[key] !== 'false';

  return (
    <SettingsContext.Provider value={{ settings, show, loaded }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
