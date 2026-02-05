import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { WeatherStationCardConfig, WeatherData, Warning } from './types';
import { CARD_VERSION, DEFAULT_CONFIG } from './const';
import { formatTemperature, formatPressure, formatSpeed, formatRain, getUVLevel } from './utils';
import { checkWarnings } from './warnings';
import './wind-compass';
import './card-editor';

console.info(
  `%c WEATHERSTATION-CARD %c ${CARD_VERSION} `,
  'color: white; background: #1976d2; font-weight: 700;',
  'color: #1976d2; background: white; font-weight: 700;'
);

// Register the card with Home Assistant
interface CustomCardInfo {
  type: string;
  name: string;
  description: string;
}

declare global {
  interface Window {
    customCards?: CustomCardInfo[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'weatherstation-card',
  name: 'Weather Station Card',
  description: 'A card for displaying Ecowitt WS90 weather station data',
});

@customElement('weatherstation-card')
export class WeatherStationCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: WeatherStationCardConfig;
  @state() private currentDataView: 'live' | 'history' = 'live';
  @state() private currentHistoryPeriod: 'day' | 'week' | 'month' | 'year' = 'day';

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

    this.currentDataView = this.config.data_view || 'live';
    this.currentHistoryPeriod = this.config.history_period || 'day';
  }

  public getCardSize(): number {
    return this.config.display_mode === 'compact' ? 3 : 5;
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
      wind_gust: entity.attributes.wind_gust_speed,
      wind_avg: entity.attributes.wind_speed,
      wind_direction_avg: entity.attributes.wind_bearing_avg,
      rain: entity.attributes.precipitation,
      rain_rate: entity.attributes.precipitation_rate,
      uv_index: entity.attributes.uv_index,
      solar_radiation: entity.attributes.solar_radiation,
      feels_like: entity.attributes.feels_like,
      dew_point: entity.attributes.dew_point,
    };
  }

  private getWarnings(): Warning[] {
    if (!this.config.enable_warnings) {
      return [];
    }

    const weatherData = this.getWeatherData();
    if (!weatherData) {
      return [];
    }

    return checkWarnings(weatherData, this.config.warnings);
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

    const warnings = this.getWarnings();
    const isCompact = this.config.display_mode === 'compact';

    return html`
      <ha-card class="${isCompact ? 'compact' : 'normal'}">
        ${this.renderHeader()} ${this.renderControls()}
        ${warnings.length > 0 ? this.renderWarnings(warnings) : ''}
        <div class="card-content">
          ${this.currentDataView === 'live'
            ? this.renderLiveData(weatherData, isCompact)
            : this.renderHistoricalData(isCompact)}
        </div>
      </ha-card>
    `;
  }

  private renderHeader(): TemplateResult {
    if (!this.config.name) {
      return html``;
    }

    return html`<div class="card-header">${this.config.name}</div>`;
  }

  private renderControls(): TemplateResult {
    return html`
      <div class="controls">
        <div class="view-selector">
          <button
            class="control-btn ${this.currentDataView === 'live' ? 'active' : ''}"
            @click=${() => this.setDataView('live')}
          >
            Live
          </button>
          <button
            class="control-btn ${this.currentDataView === 'history' ? 'active' : ''}"
            @click=${() => this.setDataView('history')}
          >
            History
          </button>
        </div>
        ${this.currentDataView === 'history' ? this.renderPeriodSelector() : ''}
      </div>
    `;
  }

  private renderPeriodSelector(): TemplateResult {
    const periods: Array<'day' | 'week' | 'month' | 'year'> = ['day', 'week', 'month', 'year'];

    return html`
      <div class="period-selector">
        ${periods.map(
          (period) => html`
            <button
              class="control-btn ${this.currentHistoryPeriod === period ? 'active' : ''}"
              @click=${() => this.setHistoryPeriod(period)}
            >
              ${period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          `
        )}
      </div>
    `;
  }

  private renderWarnings(warnings: Warning[]): TemplateResult {
    return html`
      <div class="warnings">
        ${warnings.map(
          (warning) => html`
            <div class="warning ${warning.severity}">
              <span class="warning-icon">${warning.icon}</span>
              <span class="warning-message">${warning.message}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  private renderLiveData(weatherData: WeatherData, isCompact: boolean): TemplateResult {
    const gridClass = isCompact ? 'weather-grid compact' : 'weather-grid';

    return html`
      <div class="${gridClass}">
        ${this.config.show_temperature && weatherData.temperature !== undefined
          ? this.renderDataItem(
              '🌡️',
              'Temperature',
              formatTemperature(weatherData.temperature),
              weatherData.feels_like
                ? `Feels like ${formatTemperature(weatherData.feels_like)}`
                : undefined,
              isCompact
            )
          : ''}
        ${this.config.show_humidity && weatherData.humidity !== undefined
          ? this.renderDataItem('💧', 'Humidity', `${weatherData.humidity}%`, undefined, isCompact)
          : ''}
        ${this.config.show_pressure && weatherData.pressure !== undefined
          ? this.renderDataItem(
              '🔽',
              'Pressure',
              formatPressure(weatherData.pressure),
              undefined,
              isCompact
            )
          : ''}
        ${this.config.show_wind &&
        weatherData.wind_speed !== undefined &&
        weatherData.wind_direction !== undefined
          ? this.renderWindItem(weatherData, isCompact)
          : ''}
        ${this.config.show_rain && weatherData.rain !== undefined
          ? this.renderDataItem(
              '🌧️',
              'Rain',
              formatRain(weatherData.rain),
              weatherData.rain_rate ? `Rate: ${formatRain(weatherData.rain_rate)}/h` : undefined,
              isCompact
            )
          : ''}
        ${this.config.show_uv && weatherData.uv_index !== undefined
          ? this.renderUVItem(weatherData.uv_index, isCompact)
          : ''}
        ${this.config.show_solar && weatherData.solar_radiation !== undefined
          ? this.renderDataItem(
              '☀️',
              'Solar',
              `${weatherData.solar_radiation} W/m²`,
              undefined,
              isCompact
            )
          : ''}
      </div>
    `;
  }

  private renderHistoricalData(_isCompact: boolean): TemplateResult {
    // For now, display a placeholder. In a real implementation,
    // you would fetch historical data from Home Assistant's history API
    return html`
      <div class="historical-placeholder">
        <div class="placeholder-icon">📊</div>
        <div class="placeholder-text">Historical data for ${this.currentHistoryPeriod}</div>
        <div class="placeholder-subtext">
          Connect to Home Assistant history API to display charts
        </div>
      </div>
    `;
  }

  private renderWindItem(weatherData: WeatherData, isCompact: boolean): TemplateResult {
    if (this.config.show_wind_arrows && !isCompact) {
      return html`
        <div class="data-item wind-item">
          <wind-compass
            .windDirection=${weatherData.wind_direction || 0}
            .windSpeed=${weatherData.wind_speed || 0}
            .windDirectionAvg=${weatherData.wind_direction_avg}
            .showArrows=${this.config.show_wind_arrows}
            .compact=${false}
          ></wind-compass>
          <div class="wind-info">
            <div class="data-label">Wind Speed</div>
            <div class="data-value">${formatSpeed(weatherData.wind_speed || 0)}</div>
            ${weatherData.wind_gust
              ? html`<div class="data-subtitle">Gust: ${formatSpeed(weatherData.wind_gust)}</div>`
              : ''}
          </div>
        </div>
      `;
    }

    // Compact mode without compass
    return this.renderDataItem(
      '💨',
      'Wind',
      formatSpeed(weatherData.wind_speed || 0),
      weatherData.wind_gust ? `Gust: ${formatSpeed(weatherData.wind_gust)}` : undefined,
      isCompact
    );
  }

  private renderDataItem(
    icon: string,
    label: string,
    value: string,
    subtitle?: string,
    isCompact: boolean = false
  ): TemplateResult {
    return html`
      <div class="data-item ${isCompact ? 'compact' : ''}">
        ${!isCompact ? html`<div class="data-icon">${icon}</div>` : ''}
        <div class="data-content">
          <div class="data-label">${isCompact ? icon + ' ' : ''}${label}</div>
          <div class="data-value">${value}</div>
          ${subtitle ? html`<div class="data-subtitle">${subtitle}</div>` : ''}
        </div>
      </div>
    `;
  }

  private renderUVItem(uvIndex: number, isCompact: boolean): TemplateResult {
    const uvLevel = getUVLevel(uvIndex);
    return html`
      <div class="data-item ${isCompact ? 'compact' : ''}">
        ${!isCompact ? html`<div class="data-icon">☀️</div>` : ''}
        <div class="data-content">
          <div class="data-label">${isCompact ? '☀️ ' : ''}UV Index</div>
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

  private setDataView(view: 'live' | 'history'): void {
    this.currentDataView = view;
  }

  private setHistoryPeriod(period: 'day' | 'week' | 'month' | 'year'): void {
    this.currentHistoryPeriod = period;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      ha-card.compact {
        padding: 12px;
      }

      .card-header {
        font-size: 24px;
        font-weight: bold;
        padding-bottom: 12px;
      }

      .compact .card-header {
        font-size: 20px;
        padding-bottom: 8px;
      }

      .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .view-selector,
      .period-selector {
        display: flex;
        gap: 4px;
      }

      .control-btn {
        padding: 6px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        background: var(--card-background-color, white);
        color: var(--primary-text-color, #212121);
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
      }

      .control-btn:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }

      .control-btn.active {
        background: var(--primary-color, #03a9f4);
        color: white;
        border-color: var(--primary-color, #03a9f4);
      }

      .warnings {
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .warning {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 8px;
        animation: slideIn 0.3s ease-out;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .warning.medium {
        background: #fff3cd;
        border-left: 4px solid #ffc107;
      }

      .warning.high {
        background: #f8d7da;
        border-left: 4px solid #dc3545;
      }

      .warning-icon {
        font-size: 24px;
        line-height: 1;
      }

      .warning-message {
        flex: 1;
        font-size: 14px;
        color: var(--primary-text-color, #212121);
      }

      .error {
        color: var(--error-color, #db4437);
        padding: 16px;
      }

      .weather-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
      }

      .weather-grid.compact {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 8px;
      }

      .data-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        transition:
          transform 0.2s,
          box-shadow 0.2s;
      }

      .data-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .data-item.compact {
        padding: 8px;
        gap: 8px;
      }

      .data-item.wind-item {
        grid-column: span 2;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
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

      .compact .data-label {
        font-size: 11px;
      }

      .data-value {
        font-size: 20px;
        font-weight: 600;
        color: var(--primary-text-color, #212121);
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .compact .data-value {
        font-size: 16px;
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

      .wind-info {
        display: flex;
        flex-direction: column;
      }

      .historical-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 48px 24px;
        text-align: center;
      }

      .placeholder-icon {
        font-size: 64px;
        margin-bottom: 16px;
        opacity: 0.5;
      }

      .placeholder-text {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color, #212121);
        margin-bottom: 8px;
      }

      .placeholder-subtext {
        font-size: 14px;
        color: var(--secondary-text-color, #666);
      }

      @media (max-width: 600px) {
        .weather-grid {
          grid-template-columns: 1fr;
        }

        .data-item.wind-item {
          grid-column: span 1;
          flex-direction: column;
        }

        .controls {
          flex-direction: column;
          align-items: stretch;
        }

        .view-selector,
        .period-selector {
          justify-content: center;
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
