import { CARD_VERSION, CARD_NAME, DEFAULT_CONFIG, WIND_DIRECTIONS, UV_LEVELS } from '../const';

describe('Constants', () => {
  describe('Card metadata', () => {
    it('should have correct card version', () => {
      expect(CARD_VERSION).toBe('1.0.0');
    });

    it('should have correct card name', () => {
      expect(CARD_NAME).toBe('weatherstation-card');
    });
  });

  describe('Default config', () => {
    it('should have all display options enabled by default', () => {
      expect(DEFAULT_CONFIG.show_temperature).toBe(true);
      expect(DEFAULT_CONFIG.show_humidity).toBe(true);
      expect(DEFAULT_CONFIG.show_pressure).toBe(true);
      expect(DEFAULT_CONFIG.show_wind).toBe(true);
      expect(DEFAULT_CONFIG.show_rain).toBe(true);
      expect(DEFAULT_CONFIG.show_uv).toBe(true);
      expect(DEFAULT_CONFIG.show_solar).toBe(true);
    });
  });

  describe('Wind directions', () => {
    it('should have 16 directions', () => {
      expect(WIND_DIRECTIONS).toHaveLength(16);
    });

    it('should start with North', () => {
      expect(WIND_DIRECTIONS[0]).toBe('N');
    });

    it('should include cardinal directions', () => {
      expect(WIND_DIRECTIONS).toContain('N');
      expect(WIND_DIRECTIONS).toContain('E');
      expect(WIND_DIRECTIONS).toContain('S');
      expect(WIND_DIRECTIONS).toContain('W');
    });
  });

  describe('UV levels', () => {
    it('should have 5 UV levels', () => {
      expect(UV_LEVELS).toHaveLength(5);
    });

    it('should have correct structure', () => {
      UV_LEVELS.forEach((level) => {
        expect(level).toHaveProperty('max');
        expect(level).toHaveProperty('label');
        expect(level).toHaveProperty('color');
      });
    });

    it('should be in ascending order', () => {
      for (let i = 1; i < UV_LEVELS.length; i++) {
        expect(UV_LEVELS[i].max).toBeGreaterThan(UV_LEVELS[i - 1].max);
      }
    });
  });
});
