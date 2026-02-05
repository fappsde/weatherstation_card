import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { WeatherStationCardConfig, WeatherData } from './types';
import { CARD_VERSION, DEFAULT_CONFIG } from './const';
import {
  formatTemperature,
  formatPressure,
  formatSpeed,
  formatRain,
  getWindDirection,
  getUVLevel,
} from './utils';

console.info(
  `%c WEATHERSTATION-CARD %c ${CARD_VERSION} `,
  'color: white; background: #1976d2; font-weight: 700;',
  'color: #1976d2; background: white; font-weight: 700;'
);

// Register the card with Home Assistant
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'weatherstation-card',
  name: 'Weather Station Card',
  description: 'A card for displaying Ecowitt WS90 weather station data',
});

@customElement('weatherstation-card')
export class WeatherStationCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: WeatherStationCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement('weatherstation-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): WeatherStationCardConfig {
    return {
      type: 'custom:weatherstation-card',
      entity: '',
      name: 'Weather Station',
      ...DEFAULT_CONFIG,
    };
  }

  public setConfig(config: WeatherStationCardConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }

    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  public getCardSize(): number {
    return 5;
  }

  private getWeatherData(): WeatherData | null {
    if (!this.hass || !this.config.entity) {
      return null;
    }

    const entity = this.hass.states[this.config.entity];
    if (!entity) {
      return null;
    }

    return {
      temperature: entity.attributes.temperature,
      humidity: entity.attributes.humidity,
      pressure: entity.attributes.pressure,
      wind_speed: entity.attributes.wind_speed,
      wind_direction: entity.attributes.wind_bearing,
      rain: entity.attributes.precipitation,
      rain_rate: entity.attributes.precipitation_rate,
      uv_index: entity.attributes.uv_index,
      solar_radiation: entity.attributes.solar_radiation,
      feels_like: entity.attributes.feels_like,
      dew_point: entity.attributes.dew_point,
    };
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    const weatherData = this.getWeatherData();
    if (!weatherData) {
      return html`
        <ha-card>
          <div class="card-content">
            <div class="error">Entity not available: ${this.config.entity}</div>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        ${this.config.name
          ? html`<div class="card-header">${this.config.name}</div>`
          : ''}
        <div class="card-content">
          <div class="weather-grid">
            ${this.config.show_temperature && weatherData.temperature !== undefined
              ? this.renderDataItem(
                  '🌡️',
                  'Temperature',
                  formatTemperature(weatherData.temperature),
                  weatherData.feels_like
                    ? `Feels like ${formatTemperature(weatherData.feels_like)}`
                    : undefined
                )
              : ''}
            ${this.config.show_humidity && weatherData.humidity !== undefined
              ? this.renderDataItem('💧', 'Humidity', `${weatherData.humidity}%`)
              : ''}
            ${this.config.show_pressure && weatherData.pressure !== undefined
              ? this.renderDataItem('🔽', 'Pressure', formatPressure(weatherData.pressure))
              : ''}
            ${this.config.show_wind &&
            weatherData.wind_speed !== undefined &&
            weatherData.wind_direction !== undefined
              ? this.renderDataItem(
                  '💨',
                  'Wind',
                  formatSpeed(weatherData.wind_speed),
                  `Direction: ${getWindDirection(weatherData.wind_direction)} (${weatherData.wind_direction}°)`
                )
              : ''}
            ${this.config.show_rain && weatherData.rain !== undefined
              ? this.renderDataItem(
                  '🌧️',
                  'Rain',
                  formatRain(weatherData.rain),
                  weatherData.rain_rate
                    ? `Rate: ${formatRain(weatherData.rain_rate)}/h`
                    : undefined
                )
              : ''}
            ${this.config.show_uv && weatherData.uv_index !== undefined
              ? this.renderUVItem(weatherData.uv_index)
              : ''}
            ${this.config.show_solar && weatherData.solar_radiation !== undefined
              ? this.renderDataItem('☀️', 'Solar', `${weatherData.solar_radiation} W/m²`)
              : ''}
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderDataItem(
    icon: string,
    label: string,
    value: string,
    subtitle?: string
  ): TemplateResult {
    return html`
      <div class="data-item">
        <div class="data-icon">${icon}</div>
        <div class="data-content">
          <div class="data-label">${label}</div>
          <div class="data-value">${value}</div>
          ${subtitle ? html`<div class="data-subtitle">${subtitle}</div>` : ''}
        </div>
      </div>
    `;
  }

  private renderUVItem(uvIndex: number): TemplateResult {
    const uvLevel = getUVLevel(uvIndex);
    return html`
      <div class="data-item">
        <div class="data-icon">☀️</div>
        <div class="data-content">
          <div class="data-label">UV Index</div>
          <div class="data-value">
            ${uvIndex}
            <span class="uv-badge" style="background-color: ${uvLevel.color}">
              ${uvLevel.label}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      .card-header {
        font-size: 24px;
        font-weight: bold;
        padding-bottom: 16px;
      }

      .error {
        color: var(--error-color, #db4437);
        padding: 16px;
      }

      .weather-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }

      .data-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .data-icon {
        font-size: 32px;
        line-height: 1;
      }

      .data-content {
        flex: 1;
        min-width: 0;
      }

      .data-label {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }

      .data-value {
        font-size: 20px;
        font-weight: 600;
        color: var(--primary-text-color, #212121);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .data-subtitle {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        margin-top: 4px;
      }

      .uv-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        color: white;
        text-transform: uppercase;
      }

      @media (max-width: 600px) {
        .weather-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'weatherstation-card': WeatherStationCard;
  }
}
