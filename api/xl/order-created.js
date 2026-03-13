/**
 * Vercel Serverless Function
 * GET /api/xl/order-created
 *
 * TEMPORARY DEBUG ENDPOINT for Prodamus XL webhook testing.
 * Always returns HTTP 200. Logs everything XL sends.
 * No validation, no external API calls.
 *
 * Remove / replace this version once tg_id delivery is confirmed.
 */

export default async function handler(req, res) {
  try {
    const { tg_id, cuid, contact_id, email, phone } = req.query;
    const allQuery = req.query;

    console.log('[xl/order-created] ── DEBUG WEBHOOK HIT ──────────────────');
    console.log('[xl/order-created] Full URL:', req.url);
    console.log('[xl/order-created] All query params:', JSON.stringify(allQuery, null, 2));
    console.log('[xl/order-created] Known params:');
    console.log('  tg_id      =', tg_id      ?? '(missing)');
    console.log('  cuid       =', cuid       ?? '(missing)');
    console.log('  contact_id =', contact_id ?? '(missing)');
    console.log('  email      =', email      ?? '(missing)');
    console.log('  phone      =', phone      ?? '(missing)');
    console.log('[xl/order-created] ─────────────────────────────────────────');

    return res.status(200).json({
      status: 'debug_ok',
      received: {
        tg_id:      tg_id      ?? null,
        cuid:       cuid       ?? null,
        contact_id: contact_id ?? null,
        email:      email      ?? null,
        phone:      phone      ?? null,
      },
      allQuery,
    });
  } catch (err) {
    console.error('[xl/order-created] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

