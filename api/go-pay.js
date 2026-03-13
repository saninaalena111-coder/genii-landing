/**
 * Vercel Serverless Function
 * GET /api/go-pay
 *
 * Accepts visitor from BotHelp via landing page URL params
 * and redirects to Prodamus XL payment page with required params.
 *
 * Query params:
 *   tg_id    (required) — Telegram user ID
 *   cuid     (optional) — BotHelp contact unique ID
 *   product  (optional) — product slug, default: "genii"
 *
 * Returns: 302 redirect to https://genii.lpxl.ru/
 */

const XL_BASE_URL = 'https://genii.lpxl.ru/';
const DEFAULT_PRODUCT = 'genii';

export default function handler(req, res) {
  try {
    const { tg_id, cuid, product } = req.query;

    console.log('[go-pay] Incoming request:', req.url);
    console.log('[go-pay] Query params:', { tg_id, cuid, product });

    if (!tg_id) {
      console.warn('[go-pay] Missing required param: tg_id');
      return res.status(400).json({ error: 'tg_id is required' });
    }

    const resolvedProduct = product || DEFAULT_PRODUCT;

    const params = new URLSearchParams();
    params.set('tg_id', tg_id);
    if (cuid) params.set('cuid', cuid);
    params.set('contactData.tg_id', tg_id);
    if (cuid) params.set('contactData.cuid', cuid);
    params.set('product', resolvedProduct);

    const redirectUrl = `${XL_BASE_URL}?${params.toString()}`;

    console.log('[go-pay] Redirecting to:', redirectUrl);

    res.setHeader('Location', redirectUrl);
    return res.status(302).end();
  } catch (err) {
    console.error('[go-pay] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
