import { WIND_DIRECTIONS, UV_LEVELS } from './const';

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
