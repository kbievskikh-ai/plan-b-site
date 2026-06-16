'use client';

import { useLanguage } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLanguage();

  const properties = [
    t('footer.forSale'),
    t('footer.forRent'),
    t('footer.investment'),
    t('footer.newDevelopments'),
    t('footer.luxuryVillas'),
  ];

  const regions = [
    t('regions.florianopolis'),
    t('regions.balnearioCamboriu'),
    t('regions.itapema'),
    t('regions.portoBelo'),
    t('regions.bombinhas'),
    t('regions.imbituba'),
    t('regions.ranchoQueimado'),
  ];

  const company = [
    t('footer.aboutPlanB'),
    t('footer.ourTeam'),
    t('footer.investmentGuide'),
    t('footer.blog'),
    t('footer.privacyPolicy'),
    t('footer.contactLink'),
  ];

  return (
    <footer className="bg-navy-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 gold-gradient rounded-sm flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">B</span>
              </div>
              <div>
                <span className="text-white font-heading text-xl tracking-wide">Plan B</span>
                <span className="block text-gold-400 text-[10px] tracking-[0.2em] uppercase">
                  Investment Advisory
                </span>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mt-4">
              {t('footer.description')}
            </p>
            <p className="text-white/20 text-xs mt-3">
              Licensed Real Estate Professional — CRECI-SC 59616
            </p>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-white font-medium mb-4 tracking-wider uppercase text-sm">
              {t('nav.properties')}
            </h4>
            <ul className="space-y-3">
              {properties.map((item) => (
                <li key={item}>
                  <a href="#properties" className="text-white/30 hover:text-gold-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="text-white font-medium mb-4 tracking-wider uppercase text-sm">
              {t('nav.regions')}
            </h4>
            <ul className="space-y-3">
              {regions.map((item) => (
                <li key={item}>
                  <a href="#regions" className="text-white/30 hover:text-gold-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-medium mb-4 tracking-wider uppercase text-sm">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item}>
                  <a href="#about" className="text-white/30 hover:text-gold-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white/20 text-sm">
              © 2026 Plan B Brazil. {t('footer.allRightsReserved')}
            </p>
            <p className="text-white/15 text-xs mt-1">
              Officially licensed in Santa Catarina, Brazil — CRECI-SC 59616
            </p>
          </div>
          <div className="flex items-center gap-6">
            {[
              { name: "Instagram", href: "https://instagram.com/kbievskikh" },
              { name: "LinkedIn", href: "https://www.linkedin.com/in/konstantin-bievskikh-05b61731b" },
              { name: "YouTube", href: "https://www.youtube.com/watch?v=ggA2TiqVMww" },
              { name: t('footer.telegram'), href: "https://t.me/KBIEVSKIKH" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-white/20 hover:text-gold-400 text-xs tracking-wider uppercase transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
