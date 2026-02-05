# Weather Station Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
[![GitHub Release](https://img.shields.io/github/release/fappsde/weatherstation_card.svg)](https://github.com/fappsde/weatherstation_card/releases)
[![License](https://img.shields.io/github/license/fappsde/weatherstation_card.svg)](LICENSE)

A beautiful and feature-rich Lovelace card for displaying weather data from Ecowitt WS90 weather stations in Home Assistant.

## Features

- 📊 Real-time and historical weather data display
- 🎨 Dual display modes (Normal & Compact for mobile)
- 🌡️ Temperature, humidity, and pressure readings
- 💨 Wind speed and direction with interactive compass
- 🧭 Wind direction arrows showing current and average directions
- 🌧️ Rainfall measurements with rate
- ☀️ UV index and solar radiation
- ⚠️ Smart warnings system for high wind, extreme temps, UV, and heavy rain
- 📈 Historical data views (day/week/month/year)
- 🎯 Fully customizable appearance and settings
- 📱 Responsive design with adaptive layouts
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
display_mode: normal  # or 'compact' for mobile
data_view: live       # or 'history' for charts
show_wind_arrows: true
enable_warnings: true
```

### Key Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | string | **Required** | Weather entity ID |
| `name` | string | Optional | Card title |
| `display_mode` | string | `normal` | `normal` or `compact` |
| `data_view` | string | `live` | `live` or `history` |
| `show_wind_arrows` | boolean | `true` | Show wind compass |
| `enable_warnings` | boolean | `false` | Enable alert system |

For full configuration options including warning thresholds, see the [README](https://github.com/fappsde/weatherstation_card#readme).

## Support

If you like this card, please ⭐ the repo!

For issues and feature requests, please [open an issue](https://github.com/fappsde/weatherstation_card/issues).
