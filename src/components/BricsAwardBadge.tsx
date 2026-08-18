'use client';

import { useLanguage } from '@/lib/i18n';

// BRICS Property Awards 2026 jury badge.
// STATUS NOTE: "Invited" wording is used until the official jury list is
// published (expected after Aug 25, 2026). Once the contract is signed and
// the final list is public, remove "invited"/"приглашённый"/"convidado"
// from this file AND from BricsAwardSection.tsx (three languages, both
// files — six edits total).
const TEXT = {
  ru: {
    pre: 'Приглашённый член международного жюри ',
    linkText: 'BRICS Property Awards 2026',
  },
  en: {
    pre: 'Invited Member of the International Jury, ',
    linkText: 'BRICS Property Awards 2026',
  },
  pt: {
    pre: 'Membro convidado do júri internacional do ',
    linkText: 'BRICS Property Awards 2026',
  },
};

export default function BricsAwardBadge({ className = '' }: { className?: string }) {
  const { language } = useLanguage();
  const t = TEXT[language] || TEXT.en;

  return (
    <span className={className}>
      {t.pre}
      <a
        href="https://bricsweek.ru/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:no-underline"
      >
        {t.linkText}
      </a>
    </span>
  );
}
