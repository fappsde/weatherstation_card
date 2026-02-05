import { Warning, WarningConfig, WeatherData } from './types';

export function checkWarnings(weatherData: WeatherData, warningConfig?: WarningConfig): Warning[] {
  if (!warningConfig) {
    return [];
  }

  const warnings: Warning[] = [];

  // Wind speed warning
  if (
    warningConfig.wind_speed?.enabled &&
    weatherData.wind_speed !== undefined &&
    weatherData.wind_speed >= warningConfig.wind_speed.threshold
  ) {
    warnings.push({
      type: 'wind',
      severity:
        weatherData.wind_speed >= warningConfig.wind_speed.threshold * 1.5 ? 'high' : 'medium',
      message:
        warningConfig.wind_speed.message || `High wind speed: ${weatherData.wind_speed} km/h`,
      icon: '💨',
    });
  }

  // Temperature warnings
  if (warningConfig.temperature?.enabled && weatherData.temperature !== undefined) {
    if (
      warningConfig.temperature.high_threshold !== undefined &&
      weatherData.temperature >= warningConfig.temperature.high_threshold
    ) {
      warnings.push({
        type: 'temperature',
        severity:
          weatherData.temperature >= warningConfig.temperature.high_threshold + 5
            ? 'high'
            : 'medium',
        message:
          warningConfig.temperature.message_high ||
          `High temperature: ${weatherData.temperature}°C`,
        icon: '🌡️',
      });
    }

    if (
      warningConfig.temperature.low_threshold !== undefined &&
      weatherData.temperature <= warningConfig.temperature.low_threshold
    ) {
      warnings.push({
        type: 'temperature',
        severity:
          weatherData.temperature <= warningConfig.temperature.low_threshold - 5
            ? 'high'
            : 'medium',
        message:
          warningConfig.temperature.message_low || `Low temperature: ${weatherData.temperature}°C`,
        icon: '❄️',
      });
    }
  }

  // UV index warning
  if (
    warningConfig.uv?.enabled &&
    weatherData.uv_index !== undefined &&
    weatherData.uv_index >= warningConfig.uv.threshold
  ) {
    warnings.push({
      type: 'uv',
      severity: weatherData.uv_index >= 11 ? 'high' : 'medium',
      message: warningConfig.uv.message || `High UV index: ${weatherData.uv_index}`,
      icon: '☀️',
    });
  }

  // Rain rate warning
  if (
    warningConfig.rain_rate?.enabled &&
    weatherData.rain_rate !== undefined &&
    weatherData.rain_rate >= warningConfig.rain_rate.threshold
  ) {
    warnings.push({
      type: 'rain',
      severity: weatherData.rain_rate >= warningConfig.rain_rate.threshold * 2 ? 'high' : 'medium',
      message: warningConfig.rain_rate.message || `Heavy rain: ${weatherData.rain_rate} mm/h`,
      icon: '🌧️',
    });
  }

  return warnings;
}
