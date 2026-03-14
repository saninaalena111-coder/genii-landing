/**
 * Vercel Serverless Function
 * GET /api/go-pay
 *
 * Redirects visitor to Prodamus XL payment page.
 * If cuid is present, adds BotHelp tag `click_button` before redirect.
 * Works for both BotHelp traffic (with tg_id/cuid) and organic traffic (without).
 *
 * Query params:
 *   tg_id    (optional) — Telegram user ID from BotHelp
 *   cuid     (optional) — BotHelp contact unique ID
 *   product  (optional) — product slug, default: "genii"
 *
 * Returns: 302 redirect to https://genii.lpxl.ru/
 */

import { addTagByCuid } from './_bothelp.js';

const XL_BASE_URL = 'https://genii.lpxl.ru/';
const DEFAULT_PRODUCT = 'genii';

export default async function handler(req, res) {
  try {
    const { tg_id, cuid, product } = req.query;

    console.log('[go-pay] Incoming request:', req.url);
    console.log('[go-pay] Query params:', { tg_id, cuid, product });

    // Tag BotHelp subscriber if cuid is present
    if (cuid) {
      try {
        await addTagByCuid(cuid, 'click_button');
        console.log('[go-pay] Tag "click_button" sent for cuid=', cuid);
      } catch (tagErr) {
        // Non-fatal: log and continue to redirect
        console.error('[go-pay] Failed to add BotHelp tag:', tagErr.message ?? tagErr);
      }
    }

    const productName = product || DEFAULT_PRODUCT;

    if (tg_id) {
      const redirectUrl =
        `${XL_BASE_URL}?tg_id=${encodeURIComponent(tg_id)}` +
        `&cuid=${encodeURIComponent(cuid || '')}` +
        `&product=${encodeURIComponent(productName)}`;

      console.log('[go-pay] BotHelp traffic — redirecting with params');
      console.log('[go-pay] Redirecting to:', redirectUrl);
      return res.redirect(302, redirectUrl);
    }

    console.log('[go-pay] Organic traffic — redirecting without params');
    console.log('[go-pay] Redirecting to:', XL_BASE_URL);
    return res.redirect(302, XL_BASE_URL);
  } catch (err) {
    console.error('[go-pay] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
