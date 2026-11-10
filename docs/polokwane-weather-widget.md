# Polokwane weather widget

The homepage uses the original SPTA-designed weather desk. Its layout, weather artwork, status treatment and responsive styling are maintained locally; MET Norway supplies forecast data through a Cloudflare Worker proxy.

## Architecture

- Front end: `index.html` and `js/site.js`
- Proxy: `workers/weather-api/src/index.js`
- Provider: MET Norway Locationforecast 2.0, global coverage
- Fixed coordinates: Polokwane, South Africa (four decimal places)
- Cache: three hours. Outside the Nordic region, MET Norway's global forecast is updated every six hours; identical requests must not be repeated more often than every three hours.
- No API key or provider secret is stored in the browser.

The Worker supplies the identifying `User-Agent` and restricts browser requests to the published GitHub Pages origin. It returns a small normalised JSON response.

## Deploy the Worker

1. Install Wrangler and authenticate with Cloudflare.
2. From `workers/weather-api`, run `npx wrangler deploy`.
3. Copy the deployed Worker HTTPS URL.
4. Set `window.SPTA_WEATHER_API_URL` to that URL before the weather widget initialises in `js/site.js`.
5. Deploy the GitHub Pages site.

The endpoint is intentionally not hard-coded until the Worker has actually been deployed. Without it, the widget displays a setup state rather than invented values.

## Data displayed

- Current forecast air temperature
- Apparent (feels-like) temperature
- Relative humidity
- Wind speed, converted from metres per second to kilometres per hour
- Accumulated forecast precipitation over the next six forecast hours

The rain value is millimetres of forecast precipitation, not a probability or measured rainfall. Conditions are model forecasts, not readings from an SPTA weather station.

## Attribution and operating limits

Weather data © MET Norway, distributed under CC BY 4.0. Attribution is shown next to the widget and links to the provider. MET Norway requires an identifying User-Agent, caching, and no unnecessary repeat requests. For locations outside the Nordic region, identical requests must not be repeated more often than every three hours.

MET Norway does not provide an SLA. Forecast availability and accuracy are not guaranteed. Review current terms before material changes:

- https://api.met.no/
- https://api.met.no/doc/TermsOfService
- https://api.met.no/weatherapi/locationforecast/2.0/documentation
