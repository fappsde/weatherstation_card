import { WIND_DIRECTIONS, UV_LEVELS, TREND_THRESHOLDS, NORMAL_RANGES } from './const';
import { TrendData, SparklinePoint, TimeOfDay, WeatherCondition, WeatherData } from './types';

export function getWindDirection(degrees: number): string {
  const index = Math.round(degrees / 22.5) % 16;
  return WIND_DIRECTIONS[index];
}

export function getUVLevel(uvIndex: number): { label: string; color: string } {
  const level = UV_LEVELS.find((l) => uvIndex <= l.max);
  return level || UV_LEVELS[UV_LEVELS.length - 1];
}

export function formatTemperature(temp: number, unit: string = '°C'): string {
  return `${Math.round(temp * 10) / 10}${unit}`;
}

export function formatPressure(pressure: number, unit: string = 'hPa'): string {
  return `${Math.round(pressure)} ${unit}`;
}

export function formatSpeed(speed: number, unit: string = 'km/h'): string {
  return `${Math.round(speed * 10) / 10} ${unit}`;
}

export function formatRain(rain: number, unit: string = 'mm'): string {
  return `${Math.round(rain * 100) / 100} ${unit}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function getWindDirectionDegrees(direction: string): number {
  const index = WIND_DIRECTIONS.indexOf(direction);
  return index >= 0 ? index * 22.5 : 0;
}

export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// ============================================
// NEW: Trend and History Utilities
// ============================================

/**
 * Calculate trend data from history values
 */
export function calculateTrend(
  currentValue: number,
  historyValues: SparklinePoint[],
  metric: keyof typeof TREND_THRESHOLDS,
  timeframe: string = '1h'
): TrendData {
  if (historyValues.length === 0) {
    return {
      direction: 'stable',
      percentChange: 0,
      absoluteChange: 0,
      timeframe,
      previousValue: currentValue,
    };
  }

  const previousValue = historyValues[0].value;
  const absoluteChange = currentValue - previousValue;
  const percentChange = previousValue !== 0 ? (absoluteChange / previousValue) * 100 : 0;

  const thresholds = TREND_THRESHOLDS[metric] || { significant: 0.1, major: 1 };
  let direction: TrendData['direction'] = 'stable';

  if (Math.abs(absoluteChange) >= thresholds.significant) {
    direction = absoluteChange > 0 ? 'up' : 'down';
  }

  return {
    direction,
    percentChange: Math.round(percentChange * 10) / 10,
    absoluteChange: Math.round(absoluteChange * 10) / 10,
    timeframe,
    previousValue,
  };
}

/**
 * Determine if a trend is significant enough to highlight
 */
export function isSignificantTrend(
  metric: keyof typeof TREND_THRESHOLDS,
  absoluteChange: number
): boolean {
  const thresholds = TREND_THRESHOLDS[metric] || { significant: 0.1, major: 1 };
  return Math.abs(absoluteChange) >= thresholds.significant;
}

/**
 * Determine if a trend is major (requires attention)
 */
export function isMajorTrend(
  metric: keyof typeof TREND_THRESHOLDS,
  absoluteChange: number
): boolean {
  const thresholds = TREND_THRESHOLDS[metric] || { significant: 0.1, major: 1 };
  return Math.abs(absoluteChange) >= thresholds.major;
}

/**
 * Get the time of day based on current hour and optionally sun position
 */
export function getTimeOfDay(date: Date = new Date()): TimeOfDay {
  const hour = date.getHours();

  if (hour >= 5 && hour < 8) return 'dawn';
  if (hour >= 8 && hour < 18) return 'day';
  if (hour >= 18 && hour < 21) return 'dusk';
  return 'night';
}

/**
 * Derive weather condition from sensor data
 */
export function deriveWeatherCondition(data: WeatherData): WeatherCondition {
  const timeOfDay = getTimeOfDay();
  const isNight = timeOfDay === 'night';

  // Check rain first
  if (data.rain_rate !== undefined && data.rain_rate > 0) {
    if (data.wind_speed !== undefined && data.wind_speed > 50) {
      return 'stormy';
    }
    return 'rainy';
  }

  // Check wind
  if (data.wind_speed !== undefined && data.wind_speed > 40) {
    return 'windy';
  }

  // Use solar radiation to estimate cloud cover
  if (data.solar_radiation !== undefined) {
    const hour = new Date().getHours();
    const expectedMax = getSolarMaxForHour(hour);
    const ratio = expectedMax > 0 ? data.solar_radiation / expectedMax : 1;

    if (ratio > 0.7) {
      return isNight ? 'clear-night' : 'sunny';
    } else if (ratio > 0.3) {
      return 'partly-cloudy';
    } else {
      return 'cloudy';
    }
  }

  // Default based on time
  return isNight ? 'clear-night' : 'sunny';
}

/**
 * Get expected max solar radiation for a given hour (simplified)
 */
function getSolarMaxForHour(hour: number): number {
  // Simplified solar curve - peaks at noon
  if (hour < 6 || hour > 20) return 0;
  const hoursFromNoon = Math.abs(hour - 12);
  return Math.max(0, 1000 * (1 - hoursFromNoon / 8));
}

/**
 * Calculate progress percentage within a normal range
 */
export function getProgressPercentage(value: number, metric: keyof typeof NORMAL_RANGES): number {
  const range = NORMAL_RANGES[metric];
  const clamped = Math.max(range.min, Math.min(range.max, value));
  return ((clamped - range.min) / (range.max - range.min)) * 100;
}

/**
 * Generate SVG path for sparkline from data points
 */
export function generateSparklinePath(
  points: SparklinePoint[],
  width: number,
  height: number,
  padding: number = 4
): {
  path: string;
  min: number;
  max: number;
  points: Array<{ x: number; y: number; value: number }>;
} {
  if (points.length < 2) {
    return { path: '', min: 0, max: 0, points: [] };
  }

  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  const pathPoints = points.map((point, index) => {
    const x = padding + (index / (points.length - 1)) * usableWidth;
    const y = padding + usableHeight - ((point.value - min) / range) * usableHeight;
    return { x, y, value: point.value };
  });

  const pathData = pathPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  return { path: pathData, min, max, points: pathPoints };
}

/**
 * Format trend change for display
 */
export function formatTrendChange(trend: TrendData, metric: string): string {
  const sign = trend.absoluteChange > 0 ? '+' : '';

  switch (metric) {
    case 'temperature':
      return `${sign}${trend.absoluteChange}°`;
    case 'humidity':
      return `${sign}${trend.absoluteChange}%`;
    case 'pressure':
      return `${sign}${trend.absoluteChange} hPa`;
    case 'wind_speed':
      return `${sign}${trend.absoluteChange} km/h`;
    case 'rain':
      return `${sign}${trend.absoluteChange} mm`;
    case 'uv_index':
      return `${sign}${trend.absoluteChange}`;
    default:
      return `${sign}${trend.absoluteChange}`;
  }
}

/**
 * Get color for trend direction
 */
export function getTrendColor(direction: TrendData['direction'], metric: string): string {
  // For some metrics, "up" is good, for others it's bad
  const upIsBad = ['uv_index', 'rain_rate', 'wind_speed'];

  if (direction === 'stable') {
    return 'var(--secondary-text-color, #666)';
  }

  const isNegative = upIsBad.includes(metric) ? direction === 'up' : direction === 'down';

  if (metric === 'temperature') {
    // Temperature is neutral - use blue for down, red for up
    return direction === 'up' ? 'var(--error-color, #f44336)' : 'var(--info-color, #2196f3)';
  }

  return isNegative ? 'var(--error-color, #f44336)' : 'var(--success-color, #4caf50)';
}

/**
 * Determine which metric should be the "hero" based on significance
 */
export function selectHeroMetric(data: WeatherData, trends?: Record<string, TrendData>): string {
  const priorities: Array<{ metric: string; check: () => boolean }> = [
    // Check for extreme conditions first
    { metric: 'rain', check: () => (data.rain_rate || 0) > 5 },
    { metric: 'wind_speed', check: () => (data.wind_speed || 0) > 50 },
    { metric: 'uv_index', check: () => (data.uv_index || 0) >= 8 },
    // Then check for significant trends
    {
      metric: 'temperature',
      check: () =>
        trends?.temperature
          ? isMajorTrend('temperature', trends.temperature.absoluteChange)
          : false,
    },
    {
      metric: 'pressure',
      check: () =>
        trends?.pressure ? isMajorTrend('pressure', trends.pressure.absoluteChange) : false,
    },
  ];

  for (const { metric, check } of priorities) {
    if (check()) return metric;
  }

  // Default to temperature
  return 'temperature';
}

/**
 * Format value based on metric type
 */
export function formatMetricValue(value: number, metric: string): string {
  switch (metric) {
    case 'temperature':
    case 'feels_like':
    case 'dew_point':
      return formatTemperature(value);
    case 'humidity':
      return `${Math.round(value)}%`;
    case 'pressure':
      return formatPressure(value);
    case 'wind_speed':
    case 'wind_gust':
      return formatSpeed(value);
    case 'rain':
    case 'rain_rate':
      return formatRain(value);
    case 'uv_index':
      return `${Math.round(value * 10) / 10}`;
    case 'solar_radiation':
      return `${Math.round(value)} W/m²`;
    default:
      return `${Math.round(value * 10) / 10}`;
  }
}

/**
 * Get a human-readable description of the weather
 */
export function getWeatherDescription(data: WeatherData): string {
  const conditions: string[] = [];

  if (data.temperature !== undefined) {
    if (data.temperature > 30) conditions.push('Hot');
    else if (data.temperature > 20) conditions.push('Warm');
    else if (data.temperature > 10) conditions.push('Mild');
    else if (data.temperature > 0) conditions.push('Cool');
    else conditions.push('Cold');
  }

  if (data.rain_rate !== undefined && data.rain_rate > 0) {
    if (data.rain_rate > 10) conditions.push('heavy rain');
    else if (data.rain_rate > 2) conditions.push('rain');
    else conditions.push('light rain');
  }

  if (data.wind_speed !== undefined && data.wind_speed > 20) {
    if (data.wind_speed > 50) conditions.push('strong winds');
    else conditions.push('breezy');
  }

  return conditions.join(', ') || 'Pleasant conditions';
}
