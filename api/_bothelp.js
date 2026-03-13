/**
 * BotHelp Open API — shared helpers
 *
 * Not an API route (underscore prefix prevents Vercel from exposing it).
 *
 * Required env variables:
 *   BOTHELP_CLIENT_ID     — OAuth2 client ID
 *   BOTHELP_CLIENT_SECRET — OAuth2 client secret
 *   BOTHELP_API_BASE      — BotHelp Open API base URL
 *                           e.g. https://api.bothelp.io
 */

const BOTHELP_OAUTH_URL = 'https://oauth.bothelp.io/oauth2/token';

/**
 * Obtain a short-lived OAuth2 access token via client_credentials flow.
 * @returns {Promise<string>} access_token
 */
export async function getBotHelpAccessToken() {
  const clientId = process.env.BOTHELP_CLIENT_ID;
  const clientSecret = process.env.BOTHELP_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing env: BOTHELP_CLIENT_ID or BOTHELP_CLIENT_SECRET');
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  });

  console.log('[bothelp] Requesting OAuth token from:', BOTHELP_OAUTH_URL);

  const oauthRes = await fetch(BOTHELP_OAUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const oauthText = await oauthRes.text();
  console.log('[bothelp] OAuth response status:', oauthRes.status);

  if (!oauthRes.ok) {
    throw new Error(`OAuth token request failed: ${oauthRes.status} — ${oauthText}`);
  }

  let oauthData;
  try {
    oauthData = JSON.parse(oauthText);
  } catch {
    throw new Error(`OAuth response is not valid JSON: ${oauthText}`);
  }

  if (!oauthData.access_token) {
    throw new Error(`OAuth response missing access_token: ${oauthText}`);
  }

  console.log('[bothelp] Access token obtained successfully');
  return oauthData.access_token;
}

/**
 * Add a tag to a BotHelp subscriber identified by cuid.
 * @param {string} cuid
 * @param {string} tag
 * @returns {Promise<void>}  throws on failure
 */
export async function addTagByCuid(cuid, tag) {
  const apiBase = process.env.BOTHELP_API_BASE;
  if (!apiBase) {
    throw new Error('Missing env: BOTHELP_API_BASE');
  }

  const accessToken = await getBotHelpAccessToken();

  const url = `${apiBase}/v1/subscribers/cuid/${encodeURIComponent(cuid)}`;
  const requestBody = [{ op: 'add', path: '/tags', value: [tag] }];

  console.log('[bothelp] PATCH', url);
  console.log('[bothelp] Body:', JSON.stringify(requestBody));

  const bhRes = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  const bhText = await bhRes.text();
  console.log('[bothelp] Response status:', bhRes.status);
  console.log('[bothelp] Response body:', bhText);

  if (!bhRes.ok) {
    throw new Error(`BotHelp API error ${bhRes.status}: ${bhText}`);
  }
}
