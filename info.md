# Weather Station Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
[![GitHub Release](https://img.shields.io/github/release/fappsde/weatherstation_card.svg)](https://github.com/fappsde/weatherstation_card/releases)
[![License](https://img.shields.io/github/license/fappsde/weatherstation_card.svg)](LICENSE)

A beautiful and feature-rich Lovelace card for displaying weather data from Ecowitt WS90 weather stations in Home Assistant.

## Features

- 📊 Real-time weather data display
- 🌡️ Temperature, humidity, and pressure readings
- 💨 Wind speed and direction
- 🌧️ Rainfall measurements
- ☀️ UV index and solar radiation
- 🎨 Customizable appearance
- 📱 Responsive design
- ♿ Accessible UI

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend"
3. Click the "+" button
4. Search for "Weather Station Card"
5. Click "Install"
6. Restart Home Assistant

### Manual Installation

1. Download `weatherstation-card.js` from the [latest release](https://github.com/fappsde/weatherstation_card/releases)
2. Copy it to `<config>/www/weatherstation-card.js`
3. Add a resource reference in your Lovelace config:

```yaml
resources:
  - url: /local/weatherstation-card.js
    type: module
```

## Configuration

Add the card to your Lovelace dashboard:

```yaml
type: custom:weatherstation-card
entity: weather.home
name: Weather Station
```

### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | string | **Required** | Weather entity ID |
| `name` | string | Optional | Card title |
| `show_temperature` | boolean | `true` | Show temperature |
| `show_humidity` | boolean | `true` | Show humidity |
| `show_pressure` | boolean | `true` | Show pressure |
| `show_wind` | boolean | `true` | Show wind data |
| `show_rain` | boolean | `true` | Show rainfall |
| `show_uv` | boolean | `true` | Show UV index |

## Support

If you like this card, please ⭐ the repo!

For issues and feature requests, please [open an issue](https://github.com/fappsde/weatherstation_card/issues).
