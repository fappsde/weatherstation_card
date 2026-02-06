import {
  getWindDirection,
  getUVLevel,
  formatTemperature,
  formatPressure,
  formatSpeed,
  formatRain,
  formatDate,
  formatShortDate,
  getWindDirectionDegrees,
  degreesToRadians,
  linearRegression,
  calculateTrend,
} from '../utils';
import { SparklinePoint } from '../types';

describe('Utils', () => {
  describe('getWindDirection', () => {
    it('should return correct wind direction for North', () => {
      expect(getWindDirection(0)).toBe('N');
      expect(getWindDirection(360)).toBe('N');
    });

    it('should return correct wind direction for East', () => {
      expect(getWindDirection(90)).toBe('E');
    });

    it('should return correct wind direction for South', () => {
      expect(getWindDirection(180)).toBe('S');
    });

    it('should return correct wind direction for West', () => {
      expect(getWindDirection(270)).toBe('W');
    });

    it('should handle intermediate directions', () => {
      expect(getWindDirection(45)).toBe('NE');
      expect(getWindDirection(135)).toBe('SE');
      expect(getWindDirection(225)).toBe('SW');
      expect(getWindDirection(315)).toBe('NW');
    });
  });

  describe('getUVLevel', () => {
    it('should return Low for UV index 0-2', () => {
      expect(getUVLevel(0).label).toBe('Low');
      expect(getUVLevel(2).label).toBe('Low');
    });

    it('should return Moderate for UV index 3-5', () => {
      expect(getUVLevel(3).label).toBe('Moderate');
      expect(getUVLevel(5).label).toBe('Moderate');
    });

    it('should return High for UV index 6-7', () => {
      expect(getUVLevel(6).label).toBe('High');
      expect(getUVLevel(7).label).toBe('High');
    });

    it('should return Very High for UV index 8-10', () => {
      expect(getUVLevel(8).label).toBe('Very High');
      expect(getUVLevel(10).label).toBe('Very High');
    });

    it('should return Extreme for UV index > 10', () => {
      expect(getUVLevel(11).label).toBe('Extreme');
      expect(getUVLevel(15).label).toBe('Extreme');
    });

    it('should return correct colors', () => {
      expect(getUVLevel(1).color).toBe('#289500');
      expect(getUVLevel(4).color).toBe('#F7E400');
      expect(getUVLevel(6).color).toBe('#F85900');
      expect(getUVLevel(9).color).toBe('#D8001D');
      expect(getUVLevel(12).color).toBe('#6B49C8');
    });
  });

  describe('formatTemperature', () => {
    it('should format temperature with default unit', () => {
      expect(formatTemperature(20)).toBe('20°C');
      expect(formatTemperature(20.5)).toBe('20.5°C');
    });

    it('should round to one decimal place', () => {
      expect(formatTemperature(20.123)).toBe('20.1°C');
      expect(formatTemperature(20.567)).toBe('20.6°C');
    });

    it('should handle custom units', () => {
      expect(formatTemperature(68, '°F')).toBe('68°F');
    });
  });

  describe('formatPressure', () => {
    it('should format pressure with default unit', () => {
      expect(formatPressure(1013)).toBe('1013 hPa');
    });

    it('should round to nearest integer', () => {
      expect(formatPressure(1013.5)).toBe('1014 hPa');
      expect(formatPressure(1013.2)).toBe('1013 hPa');
    });

    it('should handle custom units', () => {
      expect(formatPressure(29.92, 'inHg')).toBe('30 inHg');
    });
  });

  describe('formatSpeed', () => {
    it('should format speed with default unit', () => {
      expect(formatSpeed(10)).toBe('10 km/h');
      expect(formatSpeed(10.5)).toBe('10.5 km/h');
    });

    it('should round to one decimal place', () => {
      expect(formatSpeed(10.123)).toBe('10.1 km/h');
      expect(formatSpeed(10.567)).toBe('10.6 km/h');
    });

    it('should handle custom units', () => {
      expect(formatSpeed(6.2, 'mph')).toBe('6.2 mph');
    });
  });

  describe('formatRain', () => {
    it('should format rain with default unit', () => {
      expect(formatRain(5)).toBe('5 mm');
      expect(formatRain(5.5)).toBe('5.5 mm');
    });

    it('should round to two decimal places', () => {
      expect(formatRain(5.123)).toBe('5.12 mm');
      expect(formatRain(5.567)).toBe('5.57 mm');
    });

    it('should handle custom units', () => {
      expect(formatRain(0.2, 'in')).toBe('0.2 in');
    });
  });

  describe('formatDate', () => {
    it('should format a date with month, day, hour, minute', () => {
      const date = new Date(2024, 5, 15, 14, 30); // June 15, 2024 14:30
      const formatted = formatDate(date);
      expect(formatted).toBeDefined();
      expect(typeof formatted).toBe('string');
      expect(formatted.length).toBeGreaterThan(0);
    });
  });

  describe('formatShortDate', () => {
    it('should format a date with month and day only', () => {
      const date = new Date(2024, 0, 1); // Jan 1, 2024
      const formatted = formatShortDate(date);
      expect(formatted).toBeDefined();
      expect(typeof formatted).toBe('string');
      expect(formatted.length).toBeGreaterThan(0);
    });
  });

  describe('getWindDirectionDegrees', () => {
    it('should return degrees for cardinal directions', () => {
      expect(getWindDirectionDegrees('N')).toBe(0);
      expect(getWindDirectionDegrees('E')).toBe(90);
      expect(getWindDirectionDegrees('S')).toBe(180);
      expect(getWindDirectionDegrees('W')).toBe(270);
    });

    it('should return degrees for intermediate directions', () => {
      expect(getWindDirectionDegrees('NE')).toBe(45);
      expect(getWindDirectionDegrees('SE')).toBe(135);
      expect(getWindDirectionDegrees('SW')).toBe(225);
      expect(getWindDirectionDegrees('NW')).toBe(315);
    });

    it('should return 0 for unknown direction', () => {
      expect(getWindDirectionDegrees('INVALID')).toBe(0);
    });
  });

  describe('degreesToRadians', () => {
    it('should convert degrees to radians', () => {
      expect(degreesToRadians(0)).toBe(0);
      expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
      expect(degreesToRadians(360)).toBeCloseTo(2 * Math.PI);
      expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
    });
  });

  // =========================================================
  // Smart trend tests (linear regression)
  // =========================================================

  /** Helper: generate evenly spaced points over `hours` */
  function makePoints(values: number[], hours: number): SparklinePoint[] {
    const MS_PER_HOUR = 3_600_000;
    const t0 = Date.now() - hours * MS_PER_HOUR;
    return values.map((v, i) => ({
      timestamp: t0 + (i / (values.length - 1)) * hours * MS_PER_HOUR,
      value: v,
    }));
  }

  describe('linearRegression', () => {
    it('should return zero slope for constant values', () => {
      const pts = makePoints([20, 20, 20, 20, 20], 1);
      const { slope, r2 } = linearRegression(pts);
      expect(slope).toBeCloseTo(0);
      expect(r2).toBeCloseTo(0);
    });

    it('should find positive slope for steadily rising data', () => {
      // 20 → 25 over 1 hour = 5 per hour
      const pts = makePoints([20, 21, 22, 23, 24, 25], 1);
      const { slope, r2 } = linearRegression(pts);
      expect(slope).toBeCloseTo(5, 0);
      expect(r2).toBeCloseTo(1, 1);
    });

    it('should find negative slope for steadily falling data', () => {
      const pts = makePoints([25, 24, 23, 22, 21, 20], 2);
      const { slope, r2 } = linearRegression(pts);
      expect(slope).toBeLessThan(0);
      expect(r2).toBeCloseTo(1, 1);
    });

    it('should handle a single point gracefully', () => {
      const { slope, r2 } = linearRegression([{ timestamp: Date.now(), value: 15 }]);
      expect(slope).toBe(0);
      expect(r2).toBe(0);
    });

    it('should handle empty array', () => {
      const { slope, r2 } = linearRegression([]);
      expect(slope).toBe(0);
      expect(r2).toBe(0);
    });

    it('should report low R² for noisy oscillating data', () => {
      // zigzag: no clear direction
      const pts = makePoints([20, 22, 19, 23, 18, 21, 20], 3);
      const { r2 } = linearRegression(pts);
      expect(r2).toBeLessThan(0.15);
    });
  });

  describe('calculateTrend (smart)', () => {
    it('1h up then 2h down → downtrend', () => {
      // Rise for 1h: 20→23, then fall for 2h: 23→18
      // 4 points rising over 1h, 8 points falling over 2h
      const MS = 3_600_000;
      const t0 = Date.now() - 3 * MS;
      const points: SparklinePoint[] = [];

      // Rising phase: 0h to 1h (5 points)
      for (let i = 0; i <= 4; i++) {
        points.push({ timestamp: t0 + (i / 4) * MS, value: 20 + (3 * i) / 4 });
      }
      // Falling phase: 1h to 3h (9 points)
      for (let i = 1; i <= 8; i++) {
        points.push({ timestamp: t0 + MS + (i / 8) * 2 * MS, value: 23 - (5 * i) / 8 });
      }

      const trend = calculateTrend(18, points, 'temperature', '3h');
      expect(trend.direction).toBe('down');
      expect(trend.absoluteChange).toBeLessThan(0);
      expect(trend.confidence).toBeGreaterThan(0);
    });

    it('2h up then 6h down → downtrend', () => {
      const MS = 3_600_000;
      const t0 = Date.now() - 8 * MS;
      const points: SparklinePoint[] = [];

      // Rising 2h: 20→24
      for (let i = 0; i <= 4; i++) {
        points.push({ timestamp: t0 + (i / 4) * 2 * MS, value: 20 + (4 * i) / 4 });
      }
      // Falling 6h: 24→15
      for (let i = 1; i <= 12; i++) {
        points.push({ timestamp: t0 + 2 * MS + (i / 12) * 6 * MS, value: 24 - (9 * i) / 12 });
      }

      const trend = calculateTrend(15, points, 'temperature', '12h');
      expect(trend.direction).toBe('down');
    });

    it('small oscillations → stable', () => {
      // Temperature bouncing ±0.2°C around 20°C
      const pts = makePoints([20, 20.1, 19.9, 20.2, 19.8, 20, 20.1, 19.9, 20], 3);
      const trend = calculateTrend(20, pts, 'temperature', '3h');
      expect(trend.direction).toBe('stable');
    });

    it('steady rise → uptrend with high confidence', () => {
      const pts = makePoints([20, 20.5, 21, 21.5, 22, 22.5, 23], 1);
      const trend = calculateTrend(23, pts, 'temperature', '1h');
      expect(trend.direction).toBe('up');
      expect(trend.absoluteChange).toBeGreaterThan(0);
      expect(trend.confidence).toBeGreaterThan(0.9);
    });

    it('steady fall → downtrend with high confidence', () => {
      const pts = makePoints([1020, 1019, 1018, 1017, 1016], 3);
      const trend = calculateTrend(1016, pts, 'pressure', '3h');
      expect(trend.direction).toBe('down');
      expect(trend.confidence).toBeGreaterThan(0.9);
    });

    it('empty history → stable', () => {
      const trend = calculateTrend(20, [], 'temperature', '1h');
      expect(trend.direction).toBe('stable');
      expect(trend.confidence).toBe(0);
    });

    it('single point fallback still works', () => {
      const pts: SparklinePoint[] = [{ timestamp: Date.now() - 3_600_000, value: 18 }];
      const trend = calculateTrend(21, pts, 'temperature', '1h');
      // 3°C change exceeds 0.3 threshold
      expect(trend.direction).toBe('up');
      expect(trend.absoluteChange).toBeCloseTo(3, 0);
    });

    it('rise then plateau → weaker uptrend', () => {
      // Sharp rise in first hour, then flat for 2 hours
      const MS = 3_600_000;
      const t0 = Date.now() - 3 * MS;
      const points: SparklinePoint[] = [];

      // Rising 1h: 20→24
      for (let i = 0; i <= 4; i++) {
        points.push({ timestamp: t0 + (i / 4) * MS, value: 20 + (4 * i) / 4 });
      }
      // Flat 2h: 24
      for (let i = 1; i <= 8; i++) {
        points.push({ timestamp: t0 + MS + (i / 8) * 2 * MS, value: 24 });
      }

      const trend = calculateTrend(24, points, 'temperature', '3h');
      // Still up overall but confidence lower than pure rise
      expect(trend.direction).toBe('up');
      expect(trend.absoluteChange).toBeGreaterThan(0);
    });
  });
});
