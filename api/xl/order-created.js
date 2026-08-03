/**
 * Vercel Serverless Function
 * GET /api/xl/order-created
 *
 * Prodamus XL webhook: order created event.
 * Adds BotHelp tag `payment_opened` to the subscriber identified by cuid.
 *
 * Required env variables:
 *   BOTHELP_CLIENT_ID     — BotHelp OAuth2 client ID
 *   BOTHELP_CLIENT_SECRET — BotHelp OAuth2 client secret
 *   BOTHELP_API_BASE      — BotHelp Open API base URL (e.g. https://api.bothelp.io)
 *
 * Query params:
 *   cuid       (required)
 *   tg_id      (optional)
 *   contact_id (optional)
 *   email      (optional)
 *   phone      (optional)
 */

import { addTagByCuid } from '../_bothelp.js';

const TAG = 'payment_opened';

export default async function handler(req, res) {
  try {
    const { cuid, tg_id, contact_id, email, phone } = req.query;

    console.log('[xl/order-created] Incoming webhook:', req.url);
    console.log('[xl/order-created] Params:', { cuid, tg_id, contact_id, email, phone });

    if (!cuid) {
      console.warn('[xl/order-created] Missing required param: cuid');
      return res.status(400).json({ error: 'cuid missing' });
    }

    await addTagByCuid(cuid, TAG);

    console.log(`[xl/order-created] Tag "${TAG}" successfully sent for cuid=${cuid}`);

    return res.status(200).json({
      status: 'ok',
      event: 'payment_opened_sent',
      cuid,
    });
  } catch (err) {
    console.error('[xl/order-created] Unexpected error:', err.message ?? err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

