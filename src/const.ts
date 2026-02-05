export const CARD_VERSION = '1.0.0';
export const CARD_NAME = 'weatherstation-card';

export const DEFAULT_CONFIG = {
  entity_mode: 'auto' as const,
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

export const ENTITY_KEYWORDS: Record<string, string[]> = {
  temperature: [
    'temperature',
    'temp',
    'outdoor_temp',
    'temperatur',
    'aussentemperatur',
    'außentemperatur',
  ],
  humidity: ['humidity', 'humid', 'feuchtigkeit', 'feuchte', 'luftfeuchtigkeit'],
  pressure: ['pressure', 'absolute_pressure', 'relative_pressure', 'druck', 'luftdruck'],
  wind_speed: ['wind_speed', 'windspeed', 'geschwindigkeit', 'windgeschwindigkeit'],
  wind_direction: ['wind_direction', 'wind_bearing', 'winddirection', 'richtung', 'windrichtung'],
  wind_gust: ['gust', 'wind_gust', 'gust_speed', 'geschwindigkeit_2', 'boe', 'windböe', 'windboe'],
  rain: ['rain_total', 'daily_rain', 'rain', 'regen', 'niederschlag', 'regenmenge'],
  rain_rate: ['rain_rate', 'rainrate', 'rain_piezo', 'regenrate', 'niederschlagsrate'],
  uv_index: ['uv_index', 'uvi', 'uv'],
  solar_radiation: [
    'solar_radiation',
    'solar',
    'light',
    'solarstrahlung',
    'sonnenstrahlung',
    'beleuchtungsstarke',
    'beleuchtungsstärke',
    'licht',
  ],
};

export const ENTITY_LABELS: Record<string, string> = {
  temperature: 'Temperature',
  humidity: 'Humidity',
  pressure: 'Pressure',
  wind_speed: 'Wind Speed',
  wind_direction: 'Wind Direction',
  wind_gust: 'Wind Gust',
  rain: 'Rain',
  rain_rate: 'Rain Rate',
  uv_index: 'UV Index',
  solar_radiation: 'Solar Radiation',
};
