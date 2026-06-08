import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, timeline, budget, purpose, bedrooms, matchedProjects } = body;

    // Format message
    const purposeLabels: Record<string, string> = {
      investment: '📈 Investment',
      lifestyle: '🏖️ Lifestyle',
      rental: '🏠 Short-term Rental',
      residency: '🛂 Residency',
    };

    const budgetLabels: Record<string, string> = {
      '150000': '$100K – $200K',
      '250000': '$200K – $300K',
      '400000': '$300K – $500K',
      '750000': '$500K+',
    };

    const bedroomLabels: Record<string, string> = {
      'studio': 'Studio',
      '2': '2 Bedrooms',
      '3': '3 Bedrooms',
      'any': 'Any size',
    };

    const now = new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' });

    let message = `🔥 Plan B PROPERTY FINDER — NEW LEAD\n\n`;
    message += `📊 Funnel Data:\n`;
    message += `• Budget: ${budgetLabels[budget] || budget || 'N/A'}\n`;
    message += `• Goal: ${purposeLabels[purpose] || purpose || 'N/A'}\n`;
    message += `• Unit: ${bedroomLabels[bedrooms] || bedrooms || 'N/A'}\n\n`;
    message += `👤 Contact:\n`;
    message += `• Name: ${name || 'N/A'}\n`;
    message += `• Email: ${email || 'N/A'}\n`;
    if (phone) message += `• Phone: ${phone}\n`;
    if (timeline) message += `• Timeline: ${timeline}\n`;

    if (matchedProjects && matchedProjects.length > 0) {
      message += `\n🏠 Matched Projects:\n`;
      for (const p of matchedProjects) {
        message += `   • ${p.name} — ${p.units} units shown (from $${p.minPrice?.toLocaleString()})\n`;
      }
    }

    message += `\n📍 Source: planbbrazil.com/property-finder`;
    message += `\n🕐 ${now} BRT`;

    // Send to Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 });
  }
}
