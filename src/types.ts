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
    uv_index?: string;
    solar_radiation?: string;
  };

  // Display mode
  display_mode?: 'normal' | 'compact';

  // Data view mode
  data_view?: 'live' | 'history';
  history_period?: 'day' | 'week' | 'month' | 'year';

  // Wind settings
  show_wind_arrows?: boolean;

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

export interface HistoricalData {
  timestamp: Date;
  data: WeatherData;
}

export interface Warning {
  type: 'wind' | 'temperature' | 'uv' | 'rain';
  severity: 'low' | 'medium' | 'high';
  message: string;
  icon: string;
}

export interface UVLevel {
  max: number;
  label: string;
  color: string;
}
