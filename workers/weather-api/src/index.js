const ALLOWED_ORIGIN = 'https://nick-lab43.github.io';

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Accept',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function json(body, status, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...headers
    }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (origin !== ALLOWED_ORIGIN) {
      return json({ error: 'Origin not allowed' }, 403);
    }

    const headers = corsHeaders(origin);
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }
    if (request.method !== 'GET') {
      return json({ error: 'Method not allowed' }, 405, headers);
    }
    if (!env.WEATHER_API_KEY) {
      return json({ error: 'Weather service is not configured' }, 503, headers);
    }

    const providerUrl = new URL('https://api.weatherapi.com/v1/forecast.json');
    providerUrl.search = new URLSearchParams({
      key: env.WEATHER_API_KEY,
      q: 'Polokwane,South Africa',
      days: '1',
      aqi: 'no',
      alerts: 'no'
    }).toString();

    try {
      const upstream = await fetch(providerUrl.toString(), {
        headers: { Accept: 'application/json' },
        cf: { cacheTtl: 600, cacheEverything: true }
      });
      if (!upstream.ok) {
        return json({ error: 'Weather provider request failed' }, 502, headers);
      }
      const payload = await upstream.json();
      if (!payload.current || !payload.location) {
        return json({ error: 'Weather provider returned incomplete data' }, 502, headers);
      }
      return new Response(JSON.stringify(payload), {
        status: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=600'
        }
      });
    } catch {
      return json({ error: 'Weather provider is temporarily unavailable' }, 502, headers);
    }
  }
};
