/**
 * Vercel Serverless Function
 * GET|POST /api/xl/payment-success
 *
 * Prodamus XL webhook: payment successful event.
 * Adds BotHelp tag `payment_success` to the subscriber identified by cuid.
 *
 * Required env variables:
 *   BOTHELP_CLIENT_ID     — BotHelp OAuth2 client ID
 *   BOTHELP_CLIENT_SECRET — BotHelp OAuth2 client secret
 *   BOTHELP_API_BASE      — BotHelp Open API base URL (e.g. https://api.bothelp.io)
 *
 * Params (query or body):
 *   cuid       (required)
 *   tg_id      (optional)
 *   contact_id (optional)
 *   email      (optional)
 *   phone      (optional)
 *   order_id   (optional)
 *   product    (optional)
 */

import { addTagByCuid } from '../_bothelp.js';

const TAG = 'payment_success';

export default async function handler(req, res) {
  try {
    const source = req.method === 'POST' ? req.body : req.query;

    const {
      cuid,
      tg_id,
      contact_id,
      email,
      phone,
      order_id,
      product,
    } = source ?? {};

    console.log('[xl/payment-success] Incoming webhook:', req.method, req.url);
    console.log('[xl/payment-success] Params:', { cuid, tg_id, contact_id, email, phone, order_id, product });

    if (!cuid) {
      console.warn('[xl/payment-success] Missing required param: cuid');
      return res.status(400).json({ error: 'cuid missing' });
    }

    await addTagByCuid(cuid, TAG);

    console.log(`[xl/payment-success] Tag "${TAG}" successfully sent for cuid=${cuid}`);

    return res.status(200).json({
      status: 'ok',
      event: 'payment_success_sent',
      cuid,
    });
  } catch (err) {
    console.error('[xl/payment-success] Unexpected error:', err.message ?? err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
