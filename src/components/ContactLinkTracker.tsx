'use client';

import { useEffect } from 'react';

/**
 * Global delegated click tracker for WhatsApp/Telegram contact links.
 * Catches ANY click on an <a> whose href points to wa.me, api.whatsapp.com,
 * or t.me — anywhere on the page, including content added later (blog posts,
 * new components, etc.) — and pushes a single dataLayer event that both the
 * GTM "Conversion Contact" trigger and Meta Pixel already listen for.
 *
 * This removes the need to hand-wire onClick={gtagSendEvent} on every new
 * WhatsApp/Telegram link across the site.
 */
export default function ContactLinkTracker() {
  useEffect(() => {
    const CONTACT_HOST_RE = /(^|\.)(wa\.me|api\.whatsapp\.com|t\.me)$/i;

    function isContactLink(href: string): boolean {
      try {
        const url = new URL(href, window.location.href);
        return CONTACT_HOST_RE.test(url.hostname);
      } catch {
        return false;
      }
    }

    function fireContactConversion(source: string) {
      const w = window as any;
      if (Array.isArray(w.dataLayer)) {
        w.dataLayer.push({ event: 'conversion_event_contact', contact_source: source });
      }
      if (typeof w.fbq === 'function') {
        w.fbq('track', 'Contact');
      }
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || !isContactLink(href)) return;
      fireContactConversion(window.location.pathname);
    }

    // Capture phase so it fires even if a child element stops propagation.
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
