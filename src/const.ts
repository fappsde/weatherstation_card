export const CARD_VERSION = '2.0.0';
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
  // New defaults for enhanced features
  show_trends: true,
  show_sparklines: true,
  show_forecast: false,
  show_min_max: true,
  trend_period: '1h' as const,
  hero_metric: 'auto' as const,
  show_weather_condition: true,
  color_theme: 'auto' as const,
  use_time_based_theme: true,
  enable_animations: true,
  grid_layout: 'auto' as const,
  card_style: 'glass' as const,
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
  humidity: ['humidity', 'humid', 'feuchtigkeit', 'luftfeuchtigkeit'],
  pressure: ['pressure', 'absolute_pressure', 'relative_pressure', 'druck', 'luftdruck'],
  wind_speed: ['wind_speed', 'windspeed', 'geschwindigkeit', 'windgeschwindigkeit'],
  wind_direction: ['wind_direction', 'wind_bearing', 'winddirection', 'richtung', 'windrichtung'],
  wind_gust: ['gust', 'wind_gust', 'gust_speed', 'geschwindigkeit_2', 'boe', 'windböe', 'windboe'],
  rain: ['rain_total', 'daily_rain', 'rain', 'regen', 'niederschlag', 'regenmenge'],
  rain_rate: ['rain_rate', 'rainrate', 'rain_piezo', 'regenrate', 'niederschlagsrate'],
  moisture: ['moisture', 'wetness', 'feuchte', 'nass', 'trocken', 'regen_sensor', 'rain_sensor'],
  dew_point: ['dew_point', 'dewpoint', 'taupunkt', 'dew'],
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
  moisture: 'Moisture (Wetness)',
  dew_point: 'Dew Point',
  uv_index: 'UV Index',
  solar_radiation: 'Solar Radiation',
};

// Metric icons using modern emoji/icons
export const METRIC_ICONS: Record<string, string> = {
  temperature: '🌡️',
  humidity: '💧',
  pressure: '📊',
  wind_speed: '💨',
  wind_direction: '🧭',
  wind_gust: '🌬️',
  rain: '🌧️',
  rain_rate: '⛈️',
  uv_index: '☀️',
  solar_radiation: '🌤️',
  feels_like: '🤒',
  dew_point: '💦',
};

// Color themes for different conditions and times
export const THEME_COLORS = {
  dawn: {
    primary: '#FF9E80',
    secondary: '#FFCCBC',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    text: '#fff',
  },
  day: {
    primary: '#4FC3F7',
    secondary: '#B3E5FC',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    text: '#fff',
  },
  dusk: {
    primary: '#FF8A65',
    secondary: '#FFCCBC',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    text: '#fff',
  },
  night: {
    primary: '#7986CB',
    secondary: '#C5CAE9',
    background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)',
    text: '#fff',
  },
};

// Weather condition mappings
export const CONDITION_ICONS: Record<string, string> = {
  sunny: '☀️',
  'partly-cloudy': '⛅',
  cloudy: '☁️',
  rainy: '🌧️',
  stormy: '⛈️',
  windy: '💨',
  'clear-night': '🌙',
  unknown: '🌤️',
};

// Trend thresholds for determining significance
export const TREND_THRESHOLDS = {
  temperature: { significant: 2, major: 5 }, // °C change
  humidity: { significant: 10, major: 20 }, // % change
  pressure: { significant: 3, major: 8 }, // hPa change
  wind_speed: { significant: 10, major: 25 }, // km/h change
  rain: { significant: 1, major: 5 }, // mm change
  uv_index: { significant: 2, major: 4 }, // UV index change
};

// Normal ranges for progress bars
export const NORMAL_RANGES = {
  temperature: { min: -10, max: 40, unit: '°C' },
  humidity: { min: 0, max: 100, unit: '%' },
  pressure: { min: 970, max: 1050, unit: 'hPa' },
  wind_speed: { min: 0, max: 100, unit: 'km/h' },
  rain: { min: 0, max: 50, unit: 'mm' },
  uv_index: { min: 0, max: 11, unit: '' },
  solar_radiation: { min: 0, max: 1200, unit: 'W/m²' },
};

// Animation durations
export const ANIMATION_DURATION = {
  fast: '0.15s',
  normal: '0.3s',
  slow: '0.5s',
};

// Sparkline settings
export const SPARKLINE_CONFIG = {
  defaultPoints: 24, // 24 data points
  height: 30,
  strokeWidth: 2,
  dotRadius: 3,
};
