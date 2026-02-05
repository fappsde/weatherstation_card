/**
 * Mock for icons.ts – provides plain string stubs so that
 * warning / card tests can run in Jest without pulling in lit ESM.
 */

export const iconTemperature = '<svg-temperature/>';
export const iconHumidity = '<svg-humidity/>';
export const iconPressure = '<svg-pressure/>';
export const iconWindSpeed = '<svg-wind-speed/>';
export const iconWindDirection = '<svg-wind-direction/>';
export const iconWindGust = '<svg-wind-gust/>';
export const iconRain = '<svg-rain/>';
export const iconRainRate = '<svg-rain-rate/>';
export const iconUV = '<svg-uv/>';
export const iconSolar = '<svg-solar/>';
export const iconFeelsLike = '<svg-feels-like/>';
export const iconDewPoint = '<svg-dew-point/>';
export const iconMoisture = '<svg-moisture/>';
export const iconChart = '<svg-chart/>';
export const iconAppearance = '<svg-appearance/>';
export const iconBolt = '<svg-bolt/>';
export const iconAlert = '<svg-alert/>';
export const iconPlug = '<svg-plug/>';
export const iconEdit = '<svg-edit/>';
export const iconEye = '<svg-eye/>';
export const iconFrame = '<svg-frame/>';
export const iconLightbulb = '<svg-lightbulb/>';
export const iconGear = '<svg-gear/>';
export const iconBell = '<svg-bell/>';
export const iconSparkle = '<svg-sparkle/>';
export const iconTrend = '<svg-trend/>';
export const iconCalendar = '<svg-calendar/>';
export const iconSnowflake = '<svg-snowflake/>';
export const iconDefault = '<svg-default/>';

export const METRIC_ICONS_SVG: Record<string, string> = {
  temperature: iconTemperature,
  humidity: iconHumidity,
  pressure: iconPressure,
  wind_speed: iconWindSpeed,
  wind_direction: iconWindDirection,
  wind_gust: iconWindGust,
  rain: iconRain,
  rain_rate: iconRainRate,
  uv_index: iconUV,
  solar_radiation: iconSolar,
  feels_like: iconFeelsLike,
  dew_point: iconDewPoint,
  moisture: iconMoisture,
};

export const WARNING_ICONS_SVG: Record<string, string> = {
  wind: iconWindSpeed,
  temperature_high: iconTemperature,
  temperature_low: iconSnowflake,
  uv: iconUV,
  rain: iconRain,
};
