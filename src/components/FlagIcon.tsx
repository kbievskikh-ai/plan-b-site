// Simple inline SVG flags. Emoji flags (🇬🇧🇷🇺🇧🇷) don't render as flags on
// Windows (Chrome/Edge/Firefox show plain "GB"/"RU"/"BR" letters instead,
// since Windows lacks color emoji glyphs for regional indicator sequences).
// SVGs render identically on every OS/browser.

type FlagCode = 'en' | 'ru' | 'pt';

export default function FlagIcon({ code, className = 'w-4 h-3' }: { code: FlagCode; className?: string }) {
  if (code === 'en') {
    // UK flag (simplified Union Jack)
    return (
      <svg className={className} viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="36" fill="#00247d" />
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="7" />
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#cf142b" strokeWidth="3" />
        <path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="12" />
        <path d="M30,0 V36 M0,18 H60" stroke="#cf142b" strokeWidth="6" />
      </svg>
    );
  }
  if (code === 'ru') {
    return (
      <svg className={className} viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="12" y="0" fill="#fff" />
        <rect width="60" height="12" y="12" fill="#0039a6" />
        <rect width="60" height="12" y="24" fill="#d52b1e" />
      </svg>
    );
  }
  // pt -> Brazil (simplified)
  return (
    <svg className={className} viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="36" fill="#009c3b" />
      <path d="M30,3 L57,18 L30,33 L3,18 Z" fill="#ffdf00" />
      <circle cx="30" cy="18" r="8" fill="#002776" />
    </svg>
  );
}
