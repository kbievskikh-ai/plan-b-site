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
    const WA_HOST_RE = /(^|\.)(wa\.me|api\.whatsapp\.com)$/i;
    const TG_HOST_RE = /(^|\.)(t\.me)$/i;

    function getChannel(href: string): 'whatsapp' | 'telegram' | null {
      try {
        const url = new URL(href, window.location.href);
        if (WA_HOST_RE.test(url.hostname)) return 'whatsapp';
        if (TG_HOST_RE.test(url.hostname)) return 'telegram';
        return null;
      } catch {
        return null;
      }
    }

    // Fires BOTH the original combined event (kept for the existing GTM
    // Custom Event trigger, which only listens for conversion_event_contact)
    // AND a channel-specific event, so WhatsApp vs Telegram performance can
    // be split later without touching the GTM trigger config.
    function fireContactConversion(source: string, channel: 'whatsapp' | 'telegram') {
      const w = window as any;
      if (Array.isArray(w.dataLayer)) {
        w.dataLayer.push({ event: 'conversion_event_contact', contact_source: source, contact_channel: channel });
        w.dataLayer.push({ event: `conversion_event_contact_${channel}`, contact_source: source });
      }
      if (typeof w.fbq === 'function') {
        w.fbq('track', 'Contact', { contact_channel: channel });
      }
    }

    // Fire the conversion only if the click actually made the page lose
    // visibility (i.e. the OS/browser genuinely tried to switch to WhatsApp).
    // Some in-app browsers (Gmail, YouTube, Google app webviews — common
    // sources for Performance Max traffic, especially on iOS) intercept the
    // click but silently fail to open wa.me. Gating on visibilitychange stops
    // those from being counted as fake conversions.
    function trackClick(source: string, channel: 'whatsapp' | 'telegram') {
      let fired = false;
      function fire() {
        if (fired) return;
        fired = true;
        document.removeEventListener('visibilitychange', onVisible);
        fireContactConversion(source, channel);
      }
      function onVisible() {
        if (document.hidden) fire();
      }
      document.addEventListener('visibilitychange', onVisible);
      setTimeout(() => document.removeEventListener('visibilitychange', onVisible), 2500);
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      const channel = getChannel(href);
      if (!channel) return;
      trackClick(window.location.pathname, channel);
    }

    // Capture phase so it fires even if a child element stops propagation.
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
