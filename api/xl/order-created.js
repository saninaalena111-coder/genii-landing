/**
 * Vercel Serverless Function
 * GET /api/xl/order-created
 *
 * Prodamus XL webhook: order created event.
 * Adds BotHelp tag `payment_opened` to the subscriber by tg_id.
 *
 * Required env variable:
 *   BOTHELP_TOKEN — BotHelp API Bearer token
 *
 * Query params:
 *   tg_id      (required)
 *   cuid       (optional)
 *   contact_id (optional)
 *   email      (optional)
 *   phone      (optional)
 */

const BOTHELP_TAG_URL = 'https://bothelp.io/widget/api/v2/tag-subscriber';
const TAG = 'payment_opened';

export default async function handler(req, res) {
  try {
    const { tg_id, cuid, contact_id, email, phone } = req.query;

    console.log('[xl/order-created] Incoming webhook:', req.url);
    console.log('[xl/order-created] Params:', { tg_id, cuid, contact_id, email, phone });

    if (!tg_id) {
      console.warn('[xl/order-created] Missing required param: tg_id');
      return res.status(400).json({ error: 'tg_id missing' });
    }

    const token = process.env.BOTHELP_TOKEN;
    if (!token) {
      console.error('[xl/order-created] BOTHELP_TOKEN env variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const bhResponse = await fetch(BOTHELP_TAG_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        telegram_id: tg_id,
        tag: TAG,
      }),
    });

    if (!bhResponse.ok) {
      const errorText = await bhResponse.text();
      console.error(`[xl/order-created] BotHelp API error ${bhResponse.status}:`, errorText);
      return res.status(502).json({ error: 'BotHelp API request failed', detail: errorText });
    }

    console.log(`[xl/order-created] Tag "${TAG}" added successfully for tg_id=${tg_id}`);

    return res.status(200).json({
      status: 'ok',
      event: 'payment_opened_sent',
      tg_id: tg_id ?? null,
      contact_id: contact_id ?? null,
    });
  } catch (err) {
    console.error('[xl/order-created] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

