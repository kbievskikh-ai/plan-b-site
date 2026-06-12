'use client';

import { useState, useEffect } from 'react';

const API_URL = 'https://api.planbbrazil.com';

const SECTIONS = [
  { key: 'section_hero', label: 'Hero Banner', icon: '🎬' },
  { key: 'section_featured_properties', label: 'Featured Properties', icon: '🏠' },
  { key: 'section_calculator', label: 'Investment Calculator', icon: '🧮' },
  { key: 'section_about', label: 'About Plan B', icon: '👥' },
  { key: 'section_why_trust', label: 'Why Trust Us', icon: '🤝' },
  { key: 'section_international_experience', label: 'International Client Experience', icon: '🌍' },
  { key: 'section_map', label: 'Interactive Map / Regions', icon: '🗺️' },
  { key: 'section_analytics', label: 'Investment Analytics', icon: '📊' },
  { key: 'section_property_management', label: 'Property Management', icon: '🔑' },
  { key: 'section_investment_packages', label: 'Investment Packages', icon: '📦' },
  { key: 'section_investment_intelligence', label: 'Market Intelligence', icon: '🧠' },
  { key: 'section_investor_guide', label: 'Investor Guide', icon: '📖' },
  { key: 'section_case_studies', label: 'Case Studies', icon: '📋' },
  { key: 'section_testimonials', label: 'Testimonials', icon: '⭐' },
  { key: 'section_why_brazil', label: 'Why Brazil', icon: '🇧🇷' },
  { key: 'section_faq', label: 'FAQ', icon: '❓' },
  { key: 'section_contact', label: 'Contact Form', icon: '📧' },
];

export default function AdminPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const login = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@planb.com', password }),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        setAuthed(true);
        localStorage.setItem('admin_token', data.token);
      } else {
        alert('Wrong password');
      }
    } catch {
      alert('Login failed');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('admin_token');
    if (saved) {
      setToken(saved);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch(`${API_URL}/api/settings`)
      .then(r => r.json())
      .then(data => { setSettings(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [authed]);

  const toggle = async (key: string) => {
    const newValue = settings[key] === 'false' ? 'true' : 'false';
    setSaving(key);
    try {
      await fetch(`${API_URL}/api/settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ [key]: newValue }),
      });
      setSettings(prev => ({ ...prev, [key]: newValue }));
    } catch {
      alert('Failed to save');
    }
    setSaving(null);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="bg-[#1B2951] p-8 rounded-2xl shadow-2xl w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#b8862d] rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-2xl" style={{fontFamily: 'serif'}}>G</span>
            </div>
            <h1 className="text-white text-xl font-bold">Section Manager</h1>
            <p className="text-white/50 text-sm mt-1">Plan B Admin</p>
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className="w-full px-4 py-3 bg-[#0a0e1a] border border-white/10 rounded-xl text-white placeholder-white/30 mb-4 focus:outline-none focus:border-[#D4AF37]"
          />
          <button
            onClick={login}
            className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#b8862d] text-white font-semibold rounded-xl hover:opacity-90 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-[#D4AF37] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-bold" style={{fontFamily: 'serif'}}>Section Manager</h1>
            <p className="text-white/40 text-sm">Toggle sections on/off on planbbrazil.com</p>
          </div>
          <a href="/" className="text-[#D4AF37] text-sm hover:underline">← Back to site</a>
        </div>

        <div className="space-y-3">
          {SECTIONS.map(s => {
            const enabled = settings[s.key] !== 'false';
            const isSaving = saving === s.key;
            return (
              <div
                key={s.key}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  enabled
                    ? 'bg-[#1B2951] border-[#D4AF37]/30'
                    : 'bg-[#0d1225] border-white/5 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{s.icon}</span>
                  <div>
                    <div className="text-white font-medium text-sm">{s.label}</div>
                    <div className="text-white/30 text-xs font-mono">{s.key}</div>
                  </div>
                </div>
                <button
                  onClick={() => toggle(s.key)}
                  disabled={isSaving}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    enabled ? 'bg-[#D4AF37]' : 'bg-white/10'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                      enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/30 text-xs">Changes apply instantly. Refresh planbbrazil.com to see updates.</p>
          <button
            onClick={() => { localStorage.removeItem('admin_token'); setAuthed(false); setToken(''); }}
            className="mt-4 text-white/30 text-xs hover:text-white/60 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
