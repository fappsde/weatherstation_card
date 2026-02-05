import {
  getWindDirection,
  getUVLevel,
  formatTemperature,
  formatPressure,
  formatSpeed,
  formatRain,
} from '../utils';

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
});
