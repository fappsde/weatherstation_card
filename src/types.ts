import { LovelaceCardConfig } from 'custom-card-helpers';

export interface WeatherStationCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  name?: string;
  show_temperature?: boolean;
  show_humidity?: boolean;
  show_pressure?: boolean;
  show_wind?: boolean;
  show_rain?: boolean;
  show_uv?: boolean;
  show_solar?: boolean;
  theme?: string;
}

export interface WeatherData {
  temperature?: number;
  humidity?: number;
  pressure?: number;
  wind_speed?: number;
  wind_direction?: number;
  rain?: number;
  rain_rate?: number;
  uv_index?: number;
  solar_radiation?: number;
  feels_like?: number;
  dew_point?: number;
}
