# Weather Station Card

[![GitHub Release](https://img.shields.io/github/release/fappsde/weatherstation_card.svg?style=flat-square)](https://github.com/fappsde/weatherstation_card/releases)
[![GitHub License](https://img.shields.io/github/license/fappsde/weatherstation_card.svg?style=flat-square)](LICENSE)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=flat-square)](https://github.com/custom-components/hacs)
[![CI](https://img.shields.io/github/actions/workflow/status/fappsde/weatherstation_card/ci.yml?branch=main&style=flat-square)](https://github.com/fappsde/weatherstation_card/actions)

A beautiful and feature-rich Lovelace card for displaying weather data from Ecowitt WS90 weather stations in Home Assistant.

![Weather Station Card](https://via.placeholder.com/800x400.png?text=Weather+Station+Card+Screenshot)

## Features

- 📊 **Real-time weather data display** - Live updates from your weather station
- 📈 **Historical Data Views** - View data by day, week, month, or year
- 🎨 **Dual Display Modes** - Normal mode with full details or Compact mode for mobile devices
- 🌡️ **Temperature & Humidity** - Current readings with feels-like temperature
- 💨 **Wind Information** - Speed and direction with interactive compass visualization
- 🧭 **Wind Direction Arrows** - Visual compass with current and average direction indicators
- 🌧️ **Rainfall Data** - Total precipitation and rainfall rate
- ☀️ **UV Index** - Color-coded UV level warnings
- ⚡ **Solar Radiation** - Solar power measurements
- ⚠️ **Smart Warnings System** - Configurable alerts for high wind, extreme temperature, UV, and heavy rain
- 🎯 **Customizable** - Show/hide individual sensors and configure warning thresholds
- 📱 **Responsive Design** - Works on all screen sizes with adaptive layouts
- 🌈 **Theme Support** - Follows Home Assistant themes
- ♿ **Accessible** - WCAG compliant interface

## Installation

### HACS (Recommended)

1. Make sure you have [HACS](https://hacs.xyz/) installed
2. Open HACS in your Home Assistant instance
3. Click on "Frontend"
4. Click the "+" button and search for "Weather Station Card"
5. Click "Install"
6. Restart Home Assistant

### Manual Installation

1. Download the latest `weatherstation-card.js` from the [releases page](https://github.com/fappsde/weatherstation_card/releases)
2. Copy it to `<config directory>/www/weatherstation-card.js`
3. Add a resource reference in your Lovelace dashboard:

   **Via UI:**
   - Go to Settings → Dashboards → Resources
   - Click "+ Add Resource"
   - Set URL to `/local/weatherstation-card.js`
   - Set Resource type to "JavaScript Module"
   - Click "Create"

   **Via YAML:**
   ```yaml
   resources:
     - url: /local/weatherstation-card.js
       type: module
   ```

4. Restart Home Assistant

## Configuration

### Minimal Configuration

```yaml
type: custom:weatherstation-card
entity: weather.home
```

### Full Configuration (Auto Mode - Recommended)

Using device selection for automatic sensor discovery:

```yaml
type: custom:weatherstation-card
name: Backyard Weather Station

# Entity Mode (defaults to 'auto')
entity_mode: auto  # 'auto' uses device-based auto-discovery, 'manual' for individual sensors
device_id: abc123def456  # Your weather station device ID (selected via UI)

# Display Settings
display_mode: normal  # 'normal' or 'compact'
data_view: live       # 'live' or 'history'
history_period: day   # 'day', 'week', 'month', or 'year'

# Visible Sensors
show_temperature: true
show_humidity: true
show_pressure: true
show_wind: true
show_wind_arrows: true  # Show wind compass with direction arrows
show_rain: true
show_uv: true
show_solar: true

# Warnings System
enable_warnings: true
warnings:
  wind_speed:
    enabled: true
    threshold: 50  # km/h
    message: "⚠️ High wind speed! Consider closing shades and securing outdoor items."
  temperature:
    enabled: true
    high_threshold: 35  # °C
    low_threshold: 0    # °C
    message_high: "🌡️ High temperature! Stay hydrated and avoid direct sunlight."
    message_low: "❄️ Low temperature! Watch for frost and freezing conditions."
  uv:
    enabled: true
    threshold: 8
    message: "☀️ Very high UV index! Use sun protection and limit outdoor exposure."
  rain_rate:
    enabled: true
    threshold: 10  # mm/h
    message: "🌧️ Heavy rain! Check for flooding and secure outdoor items."
```

### Manual Entity Mode Configuration

If you want to use individual sensor entities instead of a weather entity:

```yaml
type: custom:weatherstation-card
name: Weather Station
entity_mode: manual

# Individual Sensor Entities
entities:
  temperature: sensor.ecowitt_outdoor_temperature
  humidity: sensor.ecowitt_humidity
  pressure: sensor.ecowitt_absolute_pressure
  wind_speed: sensor.ecowitt_wind_speed
  wind_direction: sensor.ecowitt_wind_direction
  wind_gust: sensor.ecowitt_gust_speed
  rain: sensor.ecowitt_rain_rate
  rain_rate: sensor.ecowitt_rain_rate_piezo
  uv_index: sensor.ecowitt_uvi
  solar_radiation: sensor.ecowitt_solar_radiation

# Display and other settings work the same way
display_mode: compact
show_wind_arrows: true
```

### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | **Required** | Must be `custom:weatherstation-card` |
| **Entity Configuration** |
| `entity_mode` | string | `auto` | Entity mode: `auto` (device-based discovery) or `manual` (individual sensors) |
| `device_id` | string | **Recommended** (auto mode) | Device ID for automatic sensor discovery (selected via card editor) |
| `entity` | string | Optional (auto mode fallback) | Weather entity ID (used if device_id not set) |
| `entities.temperature` | string | Optional | Temperature sensor entity (manual mode) |
| `entities.humidity` | string | Optional | Humidity sensor entity (manual mode) |
| `entities.pressure` | string | Optional | Pressure sensor entity (manual mode) |
| `entities.wind_speed` | string | Optional | Wind speed sensor entity (manual mode) |
| `entities.wind_direction` | string | Optional | Wind direction sensor entity (manual mode) |
| `entities.wind_gust` | string | Optional | Wind gust sensor entity (manual mode) |
| `entities.rain` | string | Optional | Rain sensor entity (manual mode) |
| `entities.rain_rate` | string | Optional | Rain rate sensor entity (manual mode) |
| `entities.uv_index` | string | Optional | UV index sensor entity (manual mode) |
| `entities.solar_radiation` | string | Optional | Solar radiation sensor entity (manual mode) |
| **General** |
| `name` | string | Optional | Card title. If not specified, no title is shown |
| **Display Options** |
| `display_mode` | string | `normal` | Display mode: `normal` (full details) or `compact` (mobile-optimized) |
| `data_view` | string | `live` | Data view: `live` (current data) or `history` (historical charts) |
| `history_period` | string | `day` | History period: `day`, `week`, `month`, or `year` |
| **Sensor Visibility** |
| `show_temperature` | boolean | `true` | Show temperature reading |
| `show_humidity` | boolean | `true` | Show humidity percentage |
| `show_pressure` | boolean | `true` | Show atmospheric pressure |
| `show_wind` | boolean | `true` | Show wind speed and direction |
| `show_wind_arrows` | boolean | `true` | Show wind compass with direction arrows |
| `show_rain` | boolean | `true` | Show rainfall data |
| `show_uv` | boolean | `true` | Show UV index |
| `show_solar` | boolean | `true` | Show solar radiation |
| **Warnings** |
| `enable_warnings` | boolean | `false` | Enable the warnings system |
| `warnings.wind_speed.enabled` | boolean | `false` | Enable wind speed warnings |
| `warnings.wind_speed.threshold` | number | `50` | Wind speed threshold in km/h |
| `warnings.wind_speed.message` | string | Custom | Custom warning message |
| `warnings.temperature.enabled` | boolean | `false` | Enable temperature warnings |
| `warnings.temperature.high_threshold` | number | `35` | High temperature threshold in °C |
| `warnings.temperature.low_threshold` | number | `0` | Low temperature threshold in °C |
| `warnings.uv.enabled` | boolean | `false` | Enable UV index warnings |
| `warnings.uv.threshold` | number | `8` | UV index threshold |
| `warnings.rain_rate.enabled` | boolean | `false` | Enable rain rate warnings |
| `warnings.rain_rate.threshold` | number | `10` | Rain rate threshold in mm/h |

## Ecowitt WS90 Integration

This card is designed to work with the [Ecowitt integration](https://www.home-assistant.io/integrations/ecowitt/) in Home Assistant. The WS90 is a 7-in-1 weather sensor that provides:

- Temperature
- Humidity
- Wind Speed & Direction
- Rainfall
- UV Index
- Solar Radiation
- Barometric Pressure

Make sure your Ecowitt device is properly set up and reporting to Home Assistant before using this card.

### Multi-Language Support

The card's auto-discovery feature supports both **English and German** entity names:

**English keywords:**
- temperature, temp, outdoor_temp, humidity, humid, pressure, wind_speed, wind_direction, gust, rain, rain_rate, uv_index, solar_radiation, light

**German keywords:**
- temperatur, außentemperatur, feuchtigkeit, feuchte, luftfeuchtigkeit, druck, luftdruck, geschwindigkeit, windgeschwindigkeit, richtung, windrichtung, böe, windboe, regen, niederschlag, regenrate, beleuchtungsstärke, licht

This means the card will automatically work with German weather station integrations (like "Wetterstation Dach" shown above) without any manual configuration.

## Development

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/fappsde/weatherstation_card.git
cd weatherstation_card

# Install dependencies
npm install

# Build the card
npm run build

# Watch for changes (development mode)
npm run watch
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Linting and Formatting

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Format code
npm run format
```

### Building for Production

```bash
# Build minified version
npm run build
```

The built file will be in `dist/weatherstation-card.js`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to:
- Update tests as appropriate
- Follow the existing code style
- Update documentation for any new features
- Run `npm run validate` before submitting

## Release Process

Releases are automated through GitHub Actions:

1. Update version in `package.json` and `src/const.ts`
2. Commit changes
3. Create and push a version tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
4. GitHub Actions will automatically:
   - Run tests
   - Build the card
   - Create a GitHub release
   - Attach built files

## Troubleshooting

### Card not appearing

1. Make sure the resource is properly added to your Lovelace configuration
2. Clear your browser cache (Ctrl+F5)
3. Check the browser console for errors

### Entity not found

1. Verify your Ecowitt integration is working
2. Check that the entity ID in your configuration matches your weather entity
3. Make sure the entity is available in Developer Tools → States

### Data not updating

1. Check your Ecowitt device connection
2. Verify data is updating in Home Assistant
3. Check entity attributes in Developer Tools → States

## Support

- 🐛 [Report a Bug](https://github.com/fappsde/weatherstation_card/issues/new?template=bug_report.md)
- 💡 [Request a Feature](https://github.com/fappsde/weatherstation_card/issues/new?template=feature_request.md)
- 💬 [Discussions](https://github.com/fappsde/weatherstation_card/discussions)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Lit](https://lit.dev/)
- Uses [custom-card-helpers](https://github.com/custom-cards/custom-card-helpers)
- Inspired by the Home Assistant community

## Star History

If you like this project, please give it a ⭐!

[![Star History Chart](https://api.star-history.com/svg?repos=fappsde/weatherstation_card&type=Date)](https://star-history.com/#fappsde/weatherstation_card&Date)

---

Made with ❤️ for the Home Assistant community
