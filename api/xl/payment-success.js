/**
 * Vercel Serverless Function
 * GET|POST /api/xl/payment-success
 *
 * Receives webhook from Prodamus XL on successful payment.
 * Logs all received data. No external API calls yet.
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

    const data = { tg_id, cuid, contact_id, email, phone, order_id, product };

    console.log('[XL PAYMENT SUCCESS] Incoming webhook:', req.method, req.url);
    console.log('[XL PAYMENT SUCCESS]', data);

    if (!tg_id) {
      console.warn('[XL PAYMENT SUCCESS] Missing required param: tg_id');
      return res.status(400).json({ error: 'tg_id missing' });
    }

    return res.status(200).json({
      status: 'ok',
      event: 'payment_success_received',
      tg_id: tg_id ?? null,
      order_id: order_id ?? null,
    });
  } catch (err) {
    console.error('[XL PAYMENT SUCCESS] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
