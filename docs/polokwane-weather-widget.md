# Polokwane weather widget

The homepage uses the hosted AskWeather.ai weather widget for a fixed location: Polokwane, South Africa.

## How it works

The homepage contains the provider's widget container and loads its hosted script:

- Widget location: `Polokwane, South Africa`
- Script: `https://askweather.ai/widget.js?v=1.3`
- Provider: https://askweather.ai/weather-widget

No API key, account, Cloudflare Worker, backend, or local weather-fetching JavaScript is required. The provider says the widget refreshes hourly and includes current conditions, feels-like temperature, humidity, wind, UV, rain probability, and a daily summary. Its own attribution link is displayed inside the widget.

## Operational considerations

- The widget depends on AskWeather.ai and its third-party script being available.
- Weather data is supplied by the provider, not measured by SPTA.
- The provider's stated update interval is hourly; it is not a real-time station feed.
- The provider's availability, data accuracy, privacy statements, and continued free access have not been independently audited by SPTA.
- If the provider changes or removes its embed service, the weather panel may stop rendering.
- The location is fixed; visitors are not asked to share their location.

## Maintenance

No site-side key or configuration is needed. To remove the widget, delete the `weather-embed` block from `index.html` and its script include. The surrounding section and styling can remain.

