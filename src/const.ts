export const CARD_VERSION = '1.0.0';
export const CARD_NAME = 'weatherstation-card';

export const DEFAULT_CONFIG = {
  show_temperature: true,
  show_humidity: true,
  show_pressure: true,
  show_wind: true,
  show_rain: true,
  show_uv: true,
  show_solar: true,
  display_mode: 'normal' as const,
  data_view: 'live' as const,
  history_period: 'day' as const,
  show_wind_arrows: true,
  enable_warnings: false,
  warnings: {
    wind_speed: {
      enabled: false,
      threshold: 50,
      message: '⚠️ High wind speed! Consider closing shades and securing outdoor items.',
    },
    temperature: {
      enabled: false,
      high_threshold: 35,
      low_threshold: 0,
      message_high: '🌡️ High temperature! Stay hydrated and avoid direct sunlight.',
      message_low: '❄️ Low temperature! Watch for frost and freezing conditions.',
    },
    uv: {
      enabled: false,
      threshold: 8,
      message: '☀️ Very high UV index! Use sun protection and limit outdoor exposure.',
    },
    rain_rate: {
      enabled: false,
      threshold: 10,
      message: '🌧️ Heavy rain! Check for flooding and secure outdoor items.',
    },
  },
};

export const WIND_DIRECTIONS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
];

export const UV_LEVELS = [
  { max: 2, label: 'Low', color: '#289500' },
  { max: 5, label: 'Moderate', color: '#F7E400' },
  { max: 7, label: 'High', color: '#F85900' },
  { max: 10, label: 'Very High', color: '#D8001D' },
  { max: Infinity, label: 'Extreme', color: '#6B49C8' },
];
