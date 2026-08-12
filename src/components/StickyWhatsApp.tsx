'use client';

const WHATSAPP_BASE = 'https://wa.me/5548988117424';
const TELEGRAM_URL = 'https://t.me/kbievskikh';

const WA_TEXT_RU = 'Здравствуйте! Хочу узнать больше об инвестициях в недвижимость в Бразилии';
const WA_TEXT_EN = "Hello! I'd like to learn more about real estate investment in Brazil";

function getWhatsappUrl() {
  if (typeof navigator === 'undefined') return WHATSAPP_BASE;
  const isRu = (navigator.language || '').toLowerCase().startsWith('ru');
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(isRu ? WA_TEXT_RU : WA_TEXT_EN)}`;
}

// NOTE: conversion tracking for these links is handled globally by
// <ContactLinkTracker /> (mounted once in layout.tsx), which delegates a
// single document-level click listener for any wa.me/t.me link on the
// site. Do NOT also fire gtagSendEvent()/dataLayer.push here — doing so
// double-counts the conversion (one click = two events), which is exactly
// the bug that inflated GA4 numbers on calculator.html.

export default function StickyWhatsApp() {
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-center gap-2.5">
      {/* Telegram first/larger — lower friction for desktop (no QR login),
          and preferred channel for the RU-speaking audience. */}
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="w-[60px] h-[60px] rounded-full bg-[#229ED9] shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,.25)' }}
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </a>
      <a
        href={WHATSAPP_BASE}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          window.open(getWhatsappUrl(), '_blank', 'noopener,noreferrer');
        }}
        aria-label="WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,.25)' }}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
          <path d="M20.52 3.48A11.94 11.94 0 0012.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.86 11.86 0 005.64 1.44h.01c6.53 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.44zM12.05 21.4h-.01a9.6 9.6 0 01-4.9-1.34l-.35-.21-3.65.96.98-3.56-.23-.36a9.53 9.53 0 01-1.47-5.07c0-5.28 4.3-9.58 9.6-9.58 2.56 0 4.97 1 6.78 2.81a9.5 9.5 0 012.8 6.78c0 5.28-4.3 9.57-9.55 9.57zm5.24-7.17c-.29-.14-1.7-.84-1.96-.93-.26-.1-.46-.14-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.14-1.21-.45-2.31-1.44-.85-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.44.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.58-.9-2.16-.24-.57-.48-.5-.65-.5-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.02 2.76 1.16 2.95.14.19 2.01 3.06 4.87 4.29.68.29 1.21.47 1.63.6.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
        </svg>
      </a>
    </div>
  );
}
