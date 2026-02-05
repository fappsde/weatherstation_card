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
