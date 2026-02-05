import { checkWarnings } from '../warnings';
import { WeatherData, WarningConfig } from '../types';

describe('Warning System', () => {
  const mockWeatherData: WeatherData = {
    temperature: 36,
    humidity: 65,
    pressure: 1013,
    wind_speed: 55,
    wind_direction: 180,
    rain: 5,
    rain_rate: 12,
    uv_index: 9,
    solar_radiation: 850,
  };

  describe('Wind Speed Warnings', () => {
    it('should trigger wind speed warning when threshold exceeded', () => {
      const config: WarningConfig = {
        wind_speed: {
          enabled: true,
          threshold: 50,
          message: 'High wind!',
        },
      };

      const warnings = checkWarnings(mockWeatherData, config);
      expect(warnings).toHaveLength(1);
      expect(warnings[0].type).toBe('wind');
      expect(warnings[0].message).toBe('High wind!');
    });

    it('should not trigger when disabled', () => {
      const config: WarningConfig = {
        wind_speed: {
          enabled: false,
          threshold: 50,
        },
      };

      const warnings = checkWarnings(mockWeatherData, config);
      expect(warnings).toHaveLength(0);
    });

    it('should have high severity when threshold exceeded by 50%', () => {
      const config: WarningConfig = {
        wind_speed: {
          enabled: true,
          threshold: 30,
        },
      };

      const warnings = checkWarnings(mockWeatherData, config);
      expect(warnings[0].severity).toBe('high');
    });
  });

  describe('Temperature Warnings', () => {
    it('should trigger high temperature warning', () => {
      const config: WarningConfig = {
        temperature: {
          enabled: true,
          high_threshold: 35,
          message_high: 'Too hot!',
        },
      };

      const warnings = checkWarnings(mockWeatherData, config);
      expect(warnings).toHaveLength(1);
      expect(warnings[0].type).toBe('temperature');
      expect(warnings[0].message).toBe('Too hot!');
    });

    it('should trigger low temperature warning', () => {
      const coldData = { ...mockWeatherData, temperature: -5 };
      const config: WarningConfig = {
        temperature: {
          enabled: true,
          low_threshold: 0,
          message_low: 'Freezing!',
        },
      };

      const warnings = checkWarnings(coldData, config);
      expect(warnings).toHaveLength(1);
      expect(warnings[0].type).toBe('temperature');
      expect(warnings[0].message).toBe('Freezing!');
    });
  });

  describe('UV Index Warnings', () => {
    it('should trigger UV warning when threshold exceeded', () => {
      const config: WarningConfig = {
        uv: {
          enabled: true,
          threshold: 8,
          message: 'High UV!',
        },
      };

      const warnings = checkWarnings(mockWeatherData, config);
      expect(warnings).toHaveLength(1);
      expect(warnings[0].type).toBe('uv');
    });
  });

  describe('Rain Rate Warnings', () => {
    it('should trigger rain rate warning', () => {
      const config: WarningConfig = {
        rain_rate: {
          enabled: true,
          threshold: 10,
          message: 'Heavy rain!',
        },
      };

      const warnings = checkWarnings(mockWeatherData, config);
      expect(warnings).toHaveLength(1);
      expect(warnings[0].type).toBe('rain');
    });
  });

  describe('Multiple Warnings', () => {
    it('should trigger multiple warnings when multiple conditions met', () => {
      const config: WarningConfig = {
        wind_speed: {
          enabled: true,
          threshold: 50,
        },
        temperature: {
          enabled: true,
          high_threshold: 35,
        },
        uv: {
          enabled: true,
          threshold: 8,
        },
      };

      const warnings = checkWarnings(mockWeatherData, config);
      expect(warnings.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('No Warnings', () => {
    it('should return empty array when no config provided', () => {
      const warnings = checkWarnings(mockWeatherData, undefined);
      expect(warnings).toEqual([]);
    });

    it('should return empty array when all warnings disabled', () => {
      const config: WarningConfig = {
        wind_speed: { enabled: false, threshold: 50 },
        temperature: { enabled: false },
        uv: { enabled: false, threshold: 8 },
      };

      const warnings = checkWarnings(mockWeatherData, config);
      expect(warnings).toEqual([]);
    });
  });
});
