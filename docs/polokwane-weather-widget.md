# Polokwane weather widget

The homepage is hosted on GitHub Pages. GitHub Pages only serves static files, so the WeatherAPI.com credential must not be placed in the website's JavaScript. The secure integration uses a separate Cloudflare Worker as a small API proxy.

## Architecture

- GitHub Pages serves the SPTA website.
- Cloudflare Worker at `workers/weather-api/src/index.js` calls WeatherAPI.com.
- The WeatherAPI.com key is stored as the encrypted Worker secret `WEATHER_API_KEY`.
- The browser calls the Worker URL. It never receives the provider key.
- The Worker only accepts browser requests from `https://nick-lab43.github.io` and only requests fixed-location Polokwane data.

## One-time setup

1. Rotate the WeatherAPI.com key that was previously shared in chat. Do not reuse it.
2. Create or sign in to a Cloudflare account: https://dash.cloudflare.com/
3. Install Node.js LTS on the computer used to deploy the Worker.
4. Open a terminal in the repository's `workers/weather-api` directory.
5. Authenticate Wrangler:
   ```sh
   npx wrangler login
   ```
6. Store the newly rotated key as an encrypted Worker secret. The command prompts for the value; do not put the key in a command, file, or Git commit:
   ```sh
   npx wrangler secret put WEATHER_API_KEY
   ```
7. Deploy the Worker:
   ```sh
   npx wrangler deploy
   ```
8. Wrangler prints a URL similar to `https://spta-weather-api.<account-subdomain>.workers.dev`. The API endpoint is that URL plus `/` (the Worker handles GET at its root).
9. In `js/site.js`, set `WEATHER_API_URL` to the full Worker URL, including `https://`, then commit and push the change to GitHub. GitHub Pages will publish the frontend update.

## Verification

Open the Worker URL in a browser while visiting the GitHub Pages site. A successful response is JSON containing `location`, `current`, and `forecast`. A direct request from another website origin is rejected. Confirm the weather desk displays Polokwane values and updates after a refresh.

The Worker caches upstream responses for ten minutes to reduce provider calls. The homepage refreshes every fifteen minutes. The Worker does not expose upstream error details or the API key.

## Important deployment constraints

- This repository's public GitHub Pages site cannot host the Worker function. Deploy the Worker separately to Cloudflare.
- The Worker currently allows the default project origin `https://nick-lab43.github.io`. If the GitHub Pages custom domain or repository owner changes, update `ALLOWED_ORIGIN` in `src/index.js` and redeploy.
- The WeatherAPI.com key shared previously should be considered compromised. Rotate it before configuring the Worker.
- Keep the WeatherAPI.com attribution visible on the website.
- The weather widget remains in its setup-required state until the Worker is deployed and its URL is configured in `js/site.js`.

## Data displayed

- Current temperature and condition
- Feels-like temperature
- Relative humidity
- Wind speed
- Highest hourly chance of rain over the next six forecast hours

The rain figure is a forecast probability, not a measured rainfall amount. Weather is location-level API data, not a guaranteed observation from an SPTA weather station.

Provider: https://www.weatherapi.com/
