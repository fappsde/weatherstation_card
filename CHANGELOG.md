# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-02-05

### Added
- **Glassmorphism Design** - Three card styles: glass, solid, and minimal with backdrop blur effects
- **Trend Indicators** - Up/down arrows showing metric changes over time with color coding
- **Mini Sparkline Charts** - SVG-based history graphs for each metric
- **Four Display Modes** - Normal, Compact, Hero, and Minimal layouts
- **Time-of-Day Theming** - Dynamic backgrounds based on dawn, day, dusk, and night
- **Weather Condition Badge** - Auto-derived weather conditions from sensor data with icons
- **Expandable Detail Cards** - Tap to expand metrics for detailed history information
- **Progress Bars** - Visual range indicators for humidity, UV index, and other bounded metrics
- **Enhanced Wind Compass** - Glow effects, tick marks, cardinal direction highlighting, and animations
- **Tabbed Configuration Editor** - Four-tab interface (Data, Appearance, Features, Warnings)
- **Forecast Integration** - Support for weather forecast entities
- **Smart Hero Metric** - Auto-selects the most relevant metric to highlight
- **Min/Max History Values** - Shows daily highs and lows for each metric

### Changed
- Complete UI redesign with modern styling
- Improved responsive grid layout with CSS Grid
- Enhanced animations and transitions
- Better Home Assistant History API integration

### New Configuration Options
- `display_mode`: normal, compact, hero, minimal
- `card_style`: glass, solid, minimal
- `show_trends`: Enable trend indicators
- `show_sparklines`: Enable mini charts
- `show_min_max`: Show daily min/max values
- `trend_period`: Time period for trend calculation (1h, 3h, 6h, 12h, 24h)
- `hero_metric`: Select which metric to highlight in hero mode
- `use_time_based_theme`: Enable dynamic time-of-day backgrounds
- `enable_animations`: Toggle animations on/off
- `show_weather_condition`: Display derived weather condition badge

## [1.0.0] - TBD

### Added
- Initial release
- Basic weather station card functionality
- Ecowitt WS90 support
- HACS compatibility

[Unreleased]: https://github.com/fappsde/weatherstation_card/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/fappsde/weatherstation_card/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/fappsde/weatherstation_card/releases/tag/v1.0.0
