# Polokwane weather widget

The homepage weather desk is integrated with WeatherAPI.com.

## Activate the feed

1. Create a WeatherAPI.com account and obtain an API key: https://www.weatherapi.com/signup
2. Open `js/site.js`.
3. Replace the empty `WEATHER_API_KEY` value with the key.
4. Commit and deploy the change.

WeatherAPI.com currently advertises a free tier of 100,000 calls per month and explicitly permits commercial use. Its terms require visible WeatherAPI.com credit for free-tier use. The homepage includes that attribution. Confirm the provider's current terms and quota before production use.

The API key is sent from the browser and is therefore public. It must not be treated as a secret. Use a key dedicated to this website, monitor its quota, and rotate it if abused. A server-side proxy would be preferable if the site later gains a backend.

## Data displayed

- Current temperature and condition
- Feels-like temperature
- Relative humidity
- Wind speed
- Highest hourly chance of rain over the next six forecast hours

The rain figure is a forecast probability, not a measured rainfall amount. Weather is location-level API data, not a guaranteed observation from an SPTA weather station.

The widget refreshes every 15 minutes while the page is open. If no key is configured, or the service fails, the widget shows a setup or unavailable state rather than fabricated values.

Provider: https://www.weatherapi.com/
