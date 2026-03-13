/**
 * Vercel Serverless Function
 * GET|POST /api/xl/payment-success
 *
 * Prodamus XL webhook: payment successful event.
 * Adds BotHelp tag `payment_success` to the subscriber by tg_id.
 *
 * Required env variable:
 *   BOTHELP_TOKEN — BotHelp API Bearer token
 *
 * Params (query or body):
 *   tg_id      (required)
 *   cuid       (optional)
 *   contact_id (optional)
 *   email      (optional)
 *   phone      (optional)
 *   order_id   (optional)
 *   product    (optional)
 */

const BOTHELP_TAG_URL = 'https://bothelp.io/widget/api/v2/tag-subscriber';
const TAG = 'payment_success';

export default async function handler(req, res) {
  try {
    const source = req.method === 'POST' ? req.body : req.query;

    const {
      tg_id,
      cuid,
      contact_id,
      email,
      phone,
      order_id,
      product,
    } = source ?? {};

    console.log('[xl/payment-success] Incoming webhook:', req.method, req.url);
    console.log('[xl/payment-success] Params:', { tg_id, cuid, contact_id, email, phone, order_id, product });

    if (!tg_id) {
      console.warn('[xl/payment-success] Missing required param: tg_id');
      return res.status(400).json({ error: 'tg_id missing' });
    }

    const token = process.env.BOTHELP_TOKEN;
    if (!token) {
      console.error('[xl/payment-success] BOTHELP_TOKEN env variable is not set');
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
      console.error(`[xl/payment-success] BotHelp API error ${bhResponse.status}:`, errorText);
      return res.status(502).json({ error: 'BotHelp API request failed', detail: errorText });
    }

    console.log(`[xl/payment-success] Tag "${TAG}" added successfully for tg_id=${tg_id}`);

    return res.status(200).json({
      status: 'ok',
      event: 'payment_success_sent',
      tg_id: tg_id ?? null,
      order_id: order_id ?? null,
    });
  } catch (err) {
    console.error('[xl/payment-success] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
