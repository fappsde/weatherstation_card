import { LovelaceCardConfig, HomeAssistant } from 'custom-card-helpers';

/**
 * Entity registry entry available at runtime on HomeAssistant object
 * but not included in custom-card-helpers type definitions.
 */
export interface EntityRegistryEntry {
  entity_id: string;
  device_id?: string;
}

/**
 * Extended HomeAssistant type that includes the entity registry,
 * which is available at runtime but missing from custom-card-helpers types.
 */
export type HomeAssistantExtended = HomeAssistant & {
  entities?: Record<string, EntityRegistryEntry>;
};

/**
 * Trend data for a metric showing direction and magnitude of change
 */
export interface TrendData {
  direction: 'up' | 'down' | 'stable';
  percentChange: number;
  absoluteChange: number;
  timeframe: string; // e.g., "1h", "24h"
  previousValue: number;
}

/**
 * Sparkline data point for mini charts
 */
export interface SparklinePoint {
  timestamp: number;
  value: number;
}

/**
 * Forecast prediction for a metric
 */
export interface ForecastData {
  predictedValue: number;
  confidence: number; // 0-100%
  timeframe: string; // e.g., "1h", "3h"
  trend: 'rising' | 'falling' | 'stable';
}

/**
 * Enhanced metric data with history and trends
 */
export interface MetricData {
  current: number;
  trend?: TrendData;
  sparkline?: SparklinePoint[];
  forecast?: ForecastData;
  min24h?: number;
  max24h?: number;
  avg24h?: number;
}

/**
 * Time of day for theming
 */
export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';

/**
 * Weather condition derived from metrics
 */
export type WeatherCondition =
  | 'sunny'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rainy'
  | 'stormy'
  | 'windy'
  | 'clear-night'
  | 'unknown';

export interface WeatherStationCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string; // Primary entity (for backwards compatibility) or main weather entity
  name?: string;
  show_temperature?: boolean;
  show_humidity?: boolean;
  show_pressure?: boolean;
  show_wind?: boolean;
  show_rain?: boolean;
  show_uv?: boolean;
  show_solar?: boolean;
  theme?: string;

  // Entity selection mode
  entity_mode?: 'auto' | 'manual'; // auto = use device, manual = individual entities
  device_id?: string; // For auto mode

  // Individual entity overrides (for manual mode or overriding auto mode)
  entities?: {
    temperature?: string;
    humidity?: string;
    pressure?: string;
    wind_speed?: string;
    wind_direction?: string;
    wind_gust?: string;
    rain?: string;
    rain_rate?: string;
    moisture?: string;
    dew_point?: string;
    uv_index?: string;
    solar_radiation?: string;
  };

  // Display mode - now includes 'hero' for featured metric view
  display_mode?: 'normal' | 'compact' | 'hero' | 'minimal';

  // Data view mode
  data_view?: 'live' | 'history';
  history_period?: 'day' | 'week' | 'month' | 'year';

  // Wind settings
  show_wind_arrows?: boolean;

  // NEW: Trend and history settings
  show_trends?: boolean;
  show_sparklines?: boolean;
  show_forecast?: boolean;
  show_min_max?: boolean;
  trend_period?: '1h' | '3h' | '6h' | '12h' | '24h';

  // NEW: Hero section settings
  hero_metric?: 'temperature' | 'auto'; // 'auto' picks most significant
  show_weather_condition?: boolean;

  // NEW: Theme settings
  color_theme?: 'auto' | 'light' | 'dark' | 'vibrant';
  use_time_based_theme?: boolean;

  // NEW: Animation settings
  enable_animations?: boolean;

  // NEW: Layout options
  grid_layout?: '2x2' | '3x2' | 'auto';
  card_style?: 'glass' | 'solid' | 'minimal';

  // Warnings
  enable_warnings?: boolean;
  warnings?: WarningConfig;
}

export interface WarningConfig {
  wind_speed?: {
    enabled: boolean;
    threshold: number;
    message?: string;
  };
  temperature?: {
    enabled: boolean;
    high_threshold?: number;
    low_threshold?: number;
    message_high?: string;
    message_low?: string;
  };
  uv?: {
    enabled: boolean;
    threshold: number;
    message?: string;
  };
  rain_rate?: {
    enabled: boolean;
    threshold: number;
    message?: string;
  };
}

export interface WeatherData {
  temperature?: number;
  humidity?: number;
  pressure?: number;
  wind_speed?: number;
  wind_direction?: number;
  wind_gust?: number;
  wind_avg?: number;
  wind_direction_avg?: number;
  rain?: number;
  rain_rate?: number;
  uv_index?: number;
  solar_radiation?: number;
  feels_like?: number;
  dew_point?: number;
}

/**
 * Enhanced weather data with trends and history
 */
export interface EnhancedWeatherData extends WeatherData {
  trends?: {
    temperature?: TrendData;
    humidity?: TrendData;
    pressure?: TrendData;
    wind_speed?: TrendData;
    rain?: TrendData;
    uv_index?: TrendData;
  };
  sparklines?: {
    temperature?: SparklinePoint[];
    humidity?: SparklinePoint[];
    pressure?: SparklinePoint[];
    wind_speed?: SparklinePoint[];
  };
  extremes?: {
    temperature?: { min: number; max: number; minTime: Date; maxTime: Date };
    humidity?: { min: number; max: number };
    wind_speed?: { max: number; maxTime: Date };
    rain?: { total: number };
  };
  condition?: WeatherCondition;
  timeOfDay?: TimeOfDay;
}

export interface HistoricalData {
  timestamp: Date;
  data: WeatherData;
}

import { TemplateResult } from 'lit';

export interface Warning {
  type: 'wind' | 'temperature' | 'uv' | 'rain';
  severity: 'low' | 'medium' | 'high';
  message: string;
  icon: TemplateResult;
}

export interface UVLevel {
  max: number;
  label: string;
  color: string;
}
