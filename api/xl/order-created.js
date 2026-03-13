/**
 * Vercel Serverless Function
 * GET /api/xl/order-created
 *
 * Safe test endpoint for incoming Prodamus XL webhooks.
 * Logs all received params and returns them in the response.
 * No external API calls — safe for initial testing.
 *
 * Query params accepted:
 *   tg_id       (required)
 *   cuid        (optional)
 *   contact_id  (optional)
 *   email       (optional)
 *   phone       (optional)
 */

export default async function handler(req, res) {
  try {
    const { tg_id, cuid, contact_id, email, phone } = req.query;

    console.log('[xl/order-created] Incoming webhook params:', {
      tg_id,
      cuid,
      contact_id,
      email,
      phone,
    });

    if (!tg_id) {
      console.warn('[xl/order-created] Missing required param: tg_id');
      return res.status(400).json({ error: 'tg_id is required' });
    }

    return res.status(200).json({
      status: 'ok',
      action: 'order_created_received',
      received: {
        tg_id: tg_id ?? null,
        cuid: cuid ?? null,
        contact_id: contact_id ?? null,
        email: email ?? null,
        phone: phone ?? null,
      },
    });
  } catch (err) {
    console.error('[xl/order-created] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

