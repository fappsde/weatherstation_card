import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import {
  WeatherStationCardConfig,
  WeatherData,
  Warning,
  HomeAssistantExtended,
  TrendData,
  SparklinePoint,
  TimeOfDay,
} from './types';
import {
  CARD_VERSION,
  DEFAULT_CONFIG,
  ENTITY_KEYWORDS,
  CONDITION_ICONS,
} from './const';
import {
  METRIC_ICONS_SVG,
  iconDefault,
  iconAlert,
  iconBolt,
  iconChart,
  iconHumidity,
  iconWindSpeed,
} from './icons';
import {
  formatTemperature,
  formatSpeed,
  formatRain,
  getUVLevel,
  formatMetricValue,
  getTimeOfDay,
  deriveWeatherCondition,
  selectHeroMetric,
  getWeatherDescription,
  calculateTrend,
  getProgressPercentage,
  isMajorTrend,
} from './utils';
import { checkWarnings } from './warnings';
import './wind-compass';
import './card-editor';
import './sparkline';
import './trend-indicator';

console.info(
  `%c WEATHERSTATION-CARD %c ${CARD_VERSION} `,
  'color: white; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-weight: 700; padding: 4px 8px; border-radius: 4px;',
  'color: #764ba2; background: white; font-weight: 700; padding: 4px 8px; border-radius: 4px;'
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
  description: 'A modern, sleek card for displaying weather station data with trends and history',
});

@customElement('weatherstation-card')
export class WeatherStationCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: WeatherStationCardConfig;
  @state() private currentDataView: 'live' | 'history' = 'live';
  @state() private currentHistoryPeriod: 'day' | 'week' | 'month' | 'year' = 'day';
  @state() private expandedMetric: string | null = null;
  @state() private historyData: Map<string, SparklinePoint[]> = new Map();
  @state() private trends: Map<string, TrendData> = new Map();
  @state() private lastHistoryFetch: number = 0;

  // ── Performance caches ──
  private _cachedEntityIds: Record<string, string | undefined> | null = null;
  private _cachedDeviceEntities: Record<string, string> | null = null;
  private _historyFetchTimer: ReturnType<typeof setTimeout> | null = null;
  private _pendingHistoryFetch = false;

  /**
   * Critical performance gate: only re-render when states we actually
   * display have changed, not on every hass object swap.
   */
  protected shouldUpdate(changedProps: Map<string, unknown>): boolean {
    if (!changedProps.has('hass')) return true;

    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (!oldHass) return true;

    // Check only the entities we care about
    const entityIds = this._getRelevantEntityIds();
    let stateChanged = false;
    for (const id of entityIds) {
      const oldState = oldHass.states[id];
      const newState = this.hass.states[id];
      if (oldState !== newState) {
        stateChanged = true;
        break;
      }
    }

    // Even if states haven't changed, schedule history fetch periodically
    if (!stateChanged) {
      this._scheduleHistoryFetch();
    }

    return stateChanged;
  }

  /** Returns the flat list of entity IDs this card is watching */
  private _getRelevantEntityIds(): string[] {
    const ids = this.getEntityIds();
    return Object.values(ids).filter((id): id is string => !!id);
  }

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement('weatherstation-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<WeatherStationCardConfig> {
    return {
      type: 'custom:weatherstation-card',
      entity: '',
      name: 'Weather Station',
      ...DEFAULT_CONFIG,
    };
  }

  public setConfig(config: WeatherStationCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    const prevConfig = this.config;
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    this.currentDataView = this.config.data_view || 'live';
    this.currentHistoryPeriod = this.config.history_period || 'day';

    // Only invalidate entity caches when the entity source actually changed
    const oldDeviceId = prevConfig?.device_id;
    const oldEntityMode = prevConfig?.entity_mode;
    const oldEntities = prevConfig?.entities;
    if (
      !prevConfig ||
      oldDeviceId !== this.config.device_id ||
      oldEntityMode !== this.config.entity_mode ||
      JSON.stringify(oldEntities) !== JSON.stringify(this.config.entities)
    ) {
      this._cachedEntityIds = null;
      this._cachedDeviceEntities = null;
    }
  }

  public getCardSize(): number {
    switch (this.config.display_mode) {
      case 'compact':
      case 'minimal':
        return 2;
      case 'hero':
        return 4;
      default:
        return 5;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._scheduleHistoryFetch();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._historyFetchTimer) {
      clearTimeout(this._historyFetchTimer);
      this._historyFetchTimer = null;
    }
  }

  /** Debounced scheduler – avoids duplicate fetches */
  private _scheduleHistoryFetch(): void {
    if (this._pendingHistoryFetch) return;

    const now = Date.now();
    const elapsed = now - this.lastHistoryFetch;
    // Throttle: at most once per 5 minutes (history doesn't change fast)
    if (elapsed < 300_000) return;

    this._pendingHistoryFetch = true;
    // Small delay so multiple rapid hass updates don't each trigger a fetch
    this._historyFetchTimer = setTimeout(() => {
      this._pendingHistoryFetch = false;
      this.fetchHistoryData();
    }, 2000);
  }

  private async fetchHistoryData(): Promise<void> {
    if (!this.hass || !this.config) return;

    this.lastHistoryFetch = Date.now();

    const entities = this.getEntityIds();
    const endTime = new Date();
    const hours = this.getHistoryHours();
    const startTime = new Date(endTime.getTime() - hours * 60 * 60 * 1000);

    // Build a single comma-separated list to fetch all entities in one API call
    const entityEntries = Object.entries(entities).filter(
      (e): e is [string, string] => !!e[1]
    );
    if (entityEntries.length === 0) return;

    const entityIdList = entityEntries.map(([, id]) => id).join(',');

    try {
      const history = await this.hass.callApi<
        Array<Array<{ entity_id: string; state: string; last_changed: string }>>
      >(
        'GET',
        `history/period/${startTime.toISOString()}?filter_entity_id=${entityIdList}&end_time=${endTime.toISOString()}&minimal_response&significant_changes_only`
      );

      if (!history) return;

      // Build lookup: entity_id -> history array
      const historyByEntity = new Map<string, Array<{ state: string; last_changed: string }>>();
      for (const entityHistory of history) {
        if (entityHistory.length > 0) {
          const eid = (entityHistory[0] as { entity_id?: string }).entity_id;
          if (eid) historyByEntity.set(eid, entityHistory);
        }
      }

      const newHistoryData = new Map<string, SparklinePoint[]>();
      const newTrends = new Map<string, TrendData>();

      for (const [metric, entityId] of entityEntries) {
        const entityHistory = historyByEntity.get(entityId);
        if (!entityHistory) continue;

        const points: SparklinePoint[] = [];
        for (const h of entityHistory) {
          const val = parseFloat(h.state);
          if (!isNaN(val)) {
            points.push({
              timestamp: new Date(h.last_changed).getTime(),
              value: val,
            });
          }
        }

        if (points.length === 0) continue;

        // Sample down to max 30 points for sparklines (less DOM, still looks smooth)
        newHistoryData.set(metric, this.samplePoints(points, 30));

        // Calculate trend using only first & last few points (no need for all)
        const currentValue = points[points.length - 1].value;
        const trendPeriodHours = this.getTrendPeriodHours();
        const trendStartTime = endTime.getTime() - trendPeriodHours * 60 * 60 * 1000;

        // Find the oldest point within the trend window
        let oldestInWindow: SparklinePoint | null = null;
        for (const p of points) {
          if (p.timestamp >= trendStartTime) {
            oldestInWindow = p;
            break;
          }
        }

        if (oldestInWindow) {
          const trend = calculateTrend(
            currentValue,
            [oldestInWindow],
            metric as keyof typeof import('./const').TREND_THRESHOLDS,
            this.config.trend_period || '1h'
          );
          newTrends.set(metric, trend);
        }
      }

      this.historyData = newHistoryData;
      this.trends = newTrends;
    } catch (e) {
      console.warn('Failed to fetch history:', e);
    }
  }

  private getHistoryHours(): number {
    switch (this.currentHistoryPeriod) {
      case 'week':
        return 168;
      case 'month':
        return 720;
      case 'year':
        return 8760;
      default:
        return 24;
    }
  }

  private getTrendPeriodHours(): number {
    switch (this.config.trend_period) {
      case '3h':
        return 3;
      case '6h':
        return 6;
      case '12h':
        return 12;
      case '24h':
        return 24;
      default:
        return 1;
    }
  }

  private samplePoints(points: SparklinePoint[], maxPoints: number): SparklinePoint[] {
    if (points.length <= maxPoints) return points;

    const result: SparklinePoint[] = [points[0]]; // always keep first
    const step = (points.length - 1) / (maxPoints - 1);
    for (let i = 1; i < maxPoints - 1; i++) {
      result.push(points[Math.round(i * step)]);
    }
    result.push(points[points.length - 1]); // always keep last
    return result;
  }

  private getEntityIds(): Record<string, string | undefined> {
    // Return cached result if available
    if (this._cachedEntityIds) return this._cachedEntityIds;

    if (this.config.entity_mode === 'manual' && this.config.entities) {
      this._cachedEntityIds = this.config.entities as Record<string, string | undefined>;
      return this._cachedEntityIds;
    }

    const entities: Record<string, string | undefined> = {};

    if (this.config.device_id) {
      const deviceEntities = this._getDeviceEntityMap();

      for (const [entityName, entityId] of Object.entries(deviceEntities)) {
        for (const [metric, keywords] of Object.entries(ENTITY_KEYWORDS)) {
          if (entities[metric]) continue;
          for (const keyword of keywords) {
            if (entityName.includes(keyword)) {
              entities[metric] = entityId;
              break;
            }
          }
        }
      }
    }

    this._cachedEntityIds = entities;
    return entities;
  }

  /** Builds and caches the device_id -> {name: entity_id} map. Only rebuilt when config changes. */
  private _getDeviceEntityMap(): Record<string, string> {
    if (this._cachedDeviceEntities) {
      return this._cachedDeviceEntities;
    }

    const hass = this.hass as HomeAssistantExtended;
    const entityRegistry = hass.entities || {};
    const map: Record<string, string> = {};

    for (const entry of Object.values(entityRegistry)) {
      if (entry.device_id === this.config.device_id) {
        const name = entry.entity_id.split('.')[1].toLowerCase();
        map[name] = entry.entity_id;
      }
    }

    this._cachedDeviceEntities = map;
    return map;
  }

  private getWeatherData(): WeatherData | null {
    if (!this.hass) return null;

    const entityMode = this.config.entity_mode || 'auto';

    if (entityMode === 'manual' && this.config.entities) {
      return this.getDataFromIndividualEntities();
    }

    if (this.config.device_id) {
      return this.getDataFromDevice();
    }

    return this.getDataFromWeatherEntity();
  }

  private getDataFromDevice(): WeatherData | null {
    if (!this.config.device_id) return null;

    const deviceEntities = this._getDeviceEntityMap();
    const overrides = this.config.entities || {};

    const getEntityValue = (keywords: string[], overrideEntityId?: string): number | undefined => {
      if (overrideEntityId) {
        const entity = this.hass.states[overrideEntityId];
        if (entity) {
          const value = parseFloat(entity.state);
          if (!isNaN(value)) return value;
        }
      }

      for (const keyword of keywords) {
        for (const [name, entityId] of Object.entries(deviceEntities)) {
          if (name.includes(keyword)) {
            const entity = this.hass.states[entityId];
            if (entity) {
              const value = parseFloat(entity.state);
              if (!isNaN(value)) return value;
            }
          }
        }
      }
      return undefined;
    };

    return {
      temperature: getEntityValue(ENTITY_KEYWORDS.temperature, overrides.temperature),
      humidity: getEntityValue(ENTITY_KEYWORDS.humidity, overrides.humidity),
      pressure: getEntityValue(ENTITY_KEYWORDS.pressure, overrides.pressure),
      wind_speed: getEntityValue(ENTITY_KEYWORDS.wind_speed, overrides.wind_speed),
      wind_direction: getEntityValue(ENTITY_KEYWORDS.wind_direction, overrides.wind_direction),
      wind_gust: getEntityValue(ENTITY_KEYWORDS.wind_gust, overrides.wind_gust),
      rain: getEntityValue(ENTITY_KEYWORDS.rain, overrides.rain),
      rain_rate: getEntityValue(ENTITY_KEYWORDS.rain_rate, overrides.rain_rate),
      uv_index: getEntityValue(ENTITY_KEYWORDS.uv_index, overrides.uv_index),
      solar_radiation: getEntityValue(ENTITY_KEYWORDS.solar_radiation, overrides.solar_radiation),
    };
  }

  private getDataFromWeatherEntity(): WeatherData | null {
    if (!this.config.entity) return null;

    const entity = this.hass.states[this.config.entity];
    if (!entity) return null;

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

  private getDataFromIndividualEntities(): WeatherData | null {
    if (!this.config.entities) return null;

    const getEntityValue = (entityId?: string): number | undefined => {
      if (!entityId) return undefined;
      const entity = this.hass.states[entityId];
      if (!entity) return undefined;
      const value = parseFloat(entity.state);
      return isNaN(value) ? undefined : value;
    };

    return {
      temperature: getEntityValue(this.config.entities.temperature),
      humidity: getEntityValue(this.config.entities.humidity),
      pressure: getEntityValue(this.config.entities.pressure),
      wind_speed: getEntityValue(this.config.entities.wind_speed),
      wind_direction: getEntityValue(this.config.entities.wind_direction),
      wind_gust: getEntityValue(this.config.entities.wind_gust),
      rain: getEntityValue(this.config.entities.rain),
      rain_rate: getEntityValue(this.config.entities.rain_rate),
      uv_index: getEntityValue(this.config.entities.uv_index),
      solar_radiation: getEntityValue(this.config.entities.solar_radiation),
    };
  }

  private _getWarnings(weatherData: WeatherData): Warning[] {
    if (!this.config.enable_warnings) return [];
    return checkWarnings(weatherData, this.config.warnings);
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) return html``;

    const weatherData = this.getWeatherData();
    if (!weatherData) return this.renderError();

    // Pass weatherData directly to avoid recomputing in getWarnings
    const warnings = this._getWarnings(weatherData);
    const timeOfDay = getTimeOfDay();
    const condition = deriveWeatherCondition(weatherData);
    const cardStyle = this.config.card_style || 'glass';

    return html`
      <ha-card class="weather-card ${this.config.display_mode} ${cardStyle} ${timeOfDay}">
        ${this.renderBackground(timeOfDay, condition)}
        <div class="card-inner">
          ${this.renderHeader(weatherData, condition)}
          ${warnings.length > 0 ? this.renderWarnings(warnings) : ''}
          ${this.renderContent(weatherData)}
        </div>
      </ha-card>
    `;
  }

  private renderError(): TemplateResult {
    let errorMsg: string;
    let hintMsg: string;

    if (this.config.device_id) {
      errorMsg = 'No data available from device';
      hintMsg = 'Please check your configuration and ensure the device exists.';
    } else if (this.config.entity) {
      errorMsg = `Entity not available: ${this.config.entity}`;
      hintMsg = 'Please check your configuration and ensure the entity exists.';
    } else {
      errorMsg = 'No device or entity configured';
      hintMsg = 'Open the card editor and select a device or entity.';
    }

    return html`
      <ha-card class="weather-card error-card">
        <div class="error-content">
          <div class="error-icon">${iconAlert}</div>
          <div class="error-message">${errorMsg}</div>
          <div class="error-hint">${hintMsg}</div>
        </div>
      </ha-card>
    `;
  }

  private renderBackground(timeOfDay: TimeOfDay, condition: string): TemplateResult {
    if (this.config.card_style === 'minimal' || this.config.card_style === 'solid') {
      return html``;
    }

    return html`
      <div class="background-layer ${timeOfDay} ${condition}">
        <div class="gradient-overlay"></div>
      </div>
    `;
  }

  private renderHeader(weatherData: WeatherData, condition: string): TemplateResult {
    const conditionIcon = CONDITION_ICONS[condition] || '🌤️';
    const description = getWeatherDescription(weatherData);

    return html`
      <div class="card-header">
        <div class="header-left">
          ${this.config.name ? html`<h2 class="card-title">${this.config.name}</h2>` : ''}
          ${this.config.show_weather_condition !== false
            ? html`
                <div class="weather-condition">
                  <span class="condition-icon">${conditionIcon}</span>
                  <span class="condition-text">${description}</span>
                </div>
              `
            : ''}
        </div>
        <div class="header-right">${this.renderViewToggle()}</div>
      </div>
    `;
  }

  private renderViewToggle(): TemplateResult {
    return html`
      <div class="view-toggle">
        <button
          class="toggle-btn ${this.currentDataView === 'live' ? 'active' : ''}"
          @click=${() => this.setDataView('live')}
          title="Live Data"
        >
          <span class="btn-icon">${iconBolt}</span>
        </button>
        <button
          class="toggle-btn ${this.currentDataView === 'history' ? 'active' : ''}"
          @click=${() => this.setDataView('history')}
          title="History"
        >
          <span class="btn-icon">${iconChart}</span>
        </button>
      </div>
    `;
  }

  private renderWarnings(warnings: Warning[]): TemplateResult {
    return html`
      <div class="warnings-container">
        ${warnings.map(
          (warning) => html`
            <div class="warning-pill ${warning.severity}">
              <span class="warning-icon">${warning.icon}</span>
              <span class="warning-text">${warning.message}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  private renderContent(weatherData: WeatherData): TemplateResult {
    if (this.currentDataView === 'history') {
      return this.renderHistoryView();
    }

    switch (this.config.display_mode) {
      case 'hero':
        return this.renderHeroMode(weatherData);
      case 'compact':
        return this.renderCompactMode(weatherData);
      case 'minimal':
        return this.renderMinimalMode(weatherData);
      default:
        return this.renderNormalMode(weatherData);
    }
  }

  private renderHeroMode(weatherData: WeatherData): TemplateResult {
    const trendsObj: Record<string, TrendData> = {};
    this.trends.forEach((v, k) => (trendsObj[k] = v));

    const heroMetric =
      this.config.hero_metric === 'auto' ? selectHeroMetric(weatherData, trendsObj) : 'temperature';

    const heroValue = (weatherData as Record<string, number | undefined>)[heroMetric];
    const heroTrend = this.trends.get(heroMetric);
    const heroHistory = this.historyData.get(heroMetric);

    return html`
      <div class="hero-layout">
        <div class="hero-main">
          <div class="hero-icon">${METRIC_ICONS_SVG[heroMetric] || iconDefault}</div>
          <div class="hero-value">
            ${heroValue !== undefined ? formatMetricValue(heroValue, heroMetric) : '--'}
          </div>
          ${heroTrend && this.config.show_trends !== false
            ? html`
                <trend-indicator
                  .trend=${heroTrend}
                  .metric=${heroMetric}
                  .pulse=${isMajorTrend(
                    heroMetric as keyof typeof import('./const').TREND_THRESHOLDS,
                    heroTrend.absoluteChange
                  )}
                ></trend-indicator>
              `
            : ''}
          ${heroHistory && this.config.show_sparklines !== false
            ? html`
                <weather-sparkline
                  .data=${heroHistory}
                  .metric=${heroMetric}
                  .width=${200}
                  .height=${60}
                  .showMinMax=${true}
                ></weather-sparkline>
              `
            : ''}
        </div>
        <div class="hero-secondary">${this.renderSecondaryMetrics(weatherData, heroMetric)}</div>
      </div>
    `;
  }

  private renderSecondaryMetrics(weatherData: WeatherData, excludeMetric: string): TemplateResult {
    const metrics = [
      { key: 'temperature', show: this.config.show_temperature },
      { key: 'humidity', show: this.config.show_humidity },
      { key: 'pressure', show: this.config.show_pressure },
      { key: 'wind_speed', show: this.config.show_wind },
      { key: 'rain', show: this.config.show_rain },
      { key: 'uv_index', show: this.config.show_uv },
    ].filter((m) => m.show !== false && m.key !== excludeMetric);

    return html`
      <div class="secondary-grid">
        ${metrics.map(({ key }) => this.renderCompactMetric(key, weatherData))}
      </div>
    `;
  }

  private renderNormalMode(weatherData: WeatherData): TemplateResult {
    return html`
      <div class="metrics-grid normal">
        ${this.config.show_temperature && weatherData.temperature !== undefined
          ? this.renderMetricCard('temperature', weatherData.temperature, weatherData.feels_like)
          : ''}
        ${this.config.show_humidity && weatherData.humidity !== undefined
          ? this.renderMetricCard('humidity', weatherData.humidity)
          : ''}
        ${this.config.show_pressure && weatherData.pressure !== undefined
          ? this.renderMetricCard('pressure', weatherData.pressure)
          : ''}
        ${this.config.show_wind && weatherData.wind_speed !== undefined
          ? this.renderWindCard(weatherData)
          : ''}
        ${this.config.show_rain && weatherData.rain !== undefined
          ? this.renderMetricCard('rain', weatherData.rain, undefined, weatherData.rain_rate)
          : ''}
        ${this.config.show_uv && weatherData.uv_index !== undefined
          ? this.renderUVCard(weatherData.uv_index)
          : ''}
        ${this.config.show_solar && weatherData.solar_radiation !== undefined
          ? this.renderMetricCard('solar_radiation', weatherData.solar_radiation)
          : ''}
      </div>
    `;
  }

  private renderCompactMode(weatherData: WeatherData): TemplateResult {
    return html`
      <div class="metrics-grid compact">
        ${this.config.show_temperature && weatherData.temperature !== undefined
          ? this.renderCompactMetric('temperature', weatherData)
          : ''}
        ${this.config.show_humidity && weatherData.humidity !== undefined
          ? this.renderCompactMetric('humidity', weatherData)
          : ''}
        ${this.config.show_pressure && weatherData.pressure !== undefined
          ? this.renderCompactMetric('pressure', weatherData)
          : ''}
        ${this.config.show_wind && weatherData.wind_speed !== undefined
          ? this.renderCompactMetric('wind_speed', weatherData)
          : ''}
        ${this.config.show_rain && weatherData.rain !== undefined
          ? this.renderCompactMetric('rain', weatherData)
          : ''}
        ${this.config.show_uv && weatherData.uv_index !== undefined
          ? this.renderCompactMetric('uv_index', weatherData)
          : ''}
      </div>
    `;
  }

  private renderMinimalMode(weatherData: WeatherData): TemplateResult {
    return html`
      <div class="minimal-layout">
        <div class="minimal-primary">
          <span class="minimal-icon">${METRIC_ICONS_SVG.temperature}</span>
          <span class="minimal-value">${formatTemperature(weatherData.temperature || 0)}</span>
          ${this.trends.get('temperature')
            ? html`<trend-indicator
                .trend=${this.trends.get('temperature')}
                metric="temperature"
                compact
              ></trend-indicator>`
            : ''}
        </div>
        <div class="minimal-secondary">
          ${weatherData.humidity !== undefined
            ? html`<span class="minimal-stat">${iconHumidity} ${weatherData.humidity}%</span>`
            : ''}
          ${weatherData.wind_speed !== undefined
            ? html`<span class="minimal-stat">${iconWindSpeed} ${formatSpeed(weatherData.wind_speed)}</span>`
            : ''}
        </div>
      </div>
    `;
  }

  private renderMetricCard(
    metric: string,
    value: number,
    secondaryValue?: number,
    rateValue?: number
  ): TemplateResult {
    const trend = this.trends.get(metric);
    const history = this.historyData.get(metric);
    const isExpanded = this.expandedMetric === metric;
    const icon = METRIC_ICONS_SVG[metric] || iconDefault;

    return html`
      <div
        class="metric-card ${isExpanded ? 'expanded' : ''}"
        @click=${() => this.toggleExpanded(metric)}
      >
        <div class="metric-header">
          <span class="metric-icon">${icon}</span>
          <span class="metric-label">${this.getMetricLabel(metric)}</span>
        </div>

        <div class="metric-body">
          <div class="metric-value-row">
            <span class="metric-value">${formatMetricValue(value, metric)}</span>
            ${trend && this.config.show_trends !== false
              ? html`<trend-indicator .trend=${trend} .metric=${metric} compact></trend-indicator>`
              : ''}
          </div>

          ${secondaryValue !== undefined
            ? html`<div class="metric-secondary">
                Feels like ${formatMetricValue(secondaryValue, metric)}
              </div>`
            : ''}
          ${rateValue !== undefined && rateValue > 0
            ? html`<div class="metric-secondary">Rate: ${formatRain(rateValue)}/h</div>`
            : ''}
        </div>

        ${this.config.show_min_max !== false && isExpanded
          ? this.renderMinMax(metric, history)
          : ''}
        ${history && this.config.show_sparklines !== false
          ? html`
              <div class="metric-sparkline">
                <weather-sparkline
                  .data=${history}
                  .metric=${metric}
                  .width=${120}
                  .height=${36}
                  .showGradient=${true}
                  .showDot=${true}
                ></weather-sparkline>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private renderMinMax(metric: string, history?: SparklinePoint[]): TemplateResult {
    if (!history || history.length === 0) return html``;

    const values = history.map((p) => p.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    return html`
      <div class="min-max-row">
        <span class="min-value">↓ ${formatMetricValue(min, metric)}</span>
        <span class="max-value">↑ ${formatMetricValue(max, metric)}</span>
      </div>
    `;
  }

  private renderCompactMetric(metric: string, weatherData: WeatherData): TemplateResult {
    const value = (weatherData as Record<string, number | undefined>)[metric];
    if (value === undefined) return html``;

    const trend = this.trends.get(metric);
    const icon = METRIC_ICONS_SVG[metric] || iconDefault;

    return html`
      <div class="compact-metric">
        <span class="compact-icon">${icon}</span>
        <div class="compact-info">
          <span class="compact-value">${formatMetricValue(value, metric)}</span>
          ${trend && this.config.show_trends !== false
            ? html`<trend-indicator
                .trend=${trend}
                .metric=${metric}
                compact
                .showValue=${false}
              ></trend-indicator>`
            : ''}
        </div>
      </div>
    `;
  }

  private renderWindCard(weatherData: WeatherData): TemplateResult {
    const trend = this.trends.get('wind_speed');

    return html`
      <div class="metric-card wind-card">
        <div class="metric-header">
          <span class="metric-icon">${METRIC_ICONS_SVG.wind_speed}</span>
          <span class="metric-label">Wind</span>
        </div>

        <div class="wind-content">
          ${this.config.show_wind_arrows !== false
            ? html`
                <wind-compass
                  .windDirection=${weatherData.wind_direction || 0}
                  .windSpeed=${weatherData.wind_speed || 0}
                  .windDirectionAvg=${weatherData.wind_direction_avg}
                  .showArrows=${true}
                  .compact=${this.config.display_mode === 'compact'}
                ></wind-compass>
              `
            : ''}

          <div class="wind-stats">
            <div class="wind-speed-row">
              <span class="wind-speed-value">${formatSpeed(weatherData.wind_speed || 0)}</span>
              ${trend && this.config.show_trends !== false
                ? html`<trend-indicator
                    .trend=${trend}
                    metric="wind_speed"
                    compact
                  ></trend-indicator>`
                : ''}
            </div>
            ${weatherData.wind_gust
              ? html`<div class="wind-gust">Gust: ${formatSpeed(weatherData.wind_gust)}</div>`
              : ''}
          </div>
        </div>
      </div>
    `;
  }

  private renderUVCard(uvIndex: number): TemplateResult {
    const uvLevel = getUVLevel(uvIndex);
    const progress = getProgressPercentage(uvIndex, 'uv_index');
    const trend = this.trends.get('uv_index');

    return html`
      <div class="metric-card uv-card">
        <div class="metric-header">
          <span class="metric-icon">${METRIC_ICONS_SVG.uv_index}</span>
          <span class="metric-label">UV Index</span>
        </div>

        <div class="metric-body">
          <div class="metric-value-row">
            <span class="metric-value">${uvIndex}</span>
            <span class="uv-badge" style="background-color: ${uvLevel.color}"
              >${uvLevel.label}</span
            >
            ${trend && this.config.show_trends !== false
              ? html`<trend-indicator .trend=${trend} metric="uv_index" compact></trend-indicator>`
              : ''}
          </div>

          <div class="progress-bar">
            <div
              class="progress-fill"
              style="width: ${progress}%; background-color: ${uvLevel.color}"
            ></div>
          </div>
        </div>
      </div>
    `;
  }

  private renderHistoryView(): TemplateResult {
    const periods: Array<'day' | 'week' | 'month' | 'year'> = ['day', 'week', 'month', 'year'];

    return html`
      <div class="history-view">
        <div class="period-tabs">
          ${periods.map(
            (period) => html`
              <button
                class="period-tab ${this.currentHistoryPeriod === period ? 'active' : ''}"
                @click=${() => this.setHistoryPeriod(period)}
              >
                ${period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            `
          )}
        </div>

        <div class="history-content">
          ${Array.from(this.historyData.entries()).map(
            ([metric, data]) => html`
              <div class="history-metric">
                <div class="history-metric-header">
                  <span class="metric-icon">${METRIC_ICONS_SVG[metric] || iconDefault}</span>
                  <span class="metric-label">${this.getMetricLabel(metric)}</span>
                  ${this.renderMinMax(metric, data)}
                </div>
                <weather-sparkline
                  .data=${data}
                  .metric=${metric}
                  .width=${280}
                  .height=${50}
                  .showMinMax=${false}
                ></weather-sparkline>
              </div>
            `
          )}
          ${this.historyData.size === 0
            ? html`
                <div class="history-empty">
                  <span class="empty-icon">${iconChart}</span>
                  <span class="empty-text">Loading history data...</span>
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }

  private getMetricLabel(metric: string): string {
    const labels: Record<string, string> = {
      temperature: 'Temperature',
      humidity: 'Humidity',
      pressure: 'Pressure',
      wind_speed: 'Wind Speed',
      wind_direction: 'Wind Direction',
      wind_gust: 'Wind Gust',
      rain: 'Rain',
      rain_rate: 'Rain Rate',
      uv_index: 'UV Index',
      solar_radiation: 'Solar',
    };
    return labels[metric] || metric;
  }

  private toggleExpanded(metric: string): void {
    this.expandedMetric = this.expandedMetric === metric ? null : metric;
  }

  private setDataView(view: 'live' | 'history'): void {
    this.currentDataView = view;
    if (view === 'history') {
      this.lastHistoryFetch = 0; // Force refresh
      this._pendingHistoryFetch = false;
      this.fetchHistoryData();
    }
  }

  private setHistoryPeriod(period: 'day' | 'week' | 'month' | 'year'): void {
    this.currentHistoryPeriod = period;
    this.lastHistoryFetch = 0; // Force refresh
    this._pendingHistoryFetch = false;
    this.fetchHistoryData();
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        --card-radius: 16px;
        --glass-bg: rgba(255, 255, 255, 0.15);
        --glass-border: rgba(255, 255, 255, 0.25);
        --transition-speed: 0.3s;
      }

      /* Card Base */
      .weather-card {
        position: relative;
        border-radius: var(--card-radius);
        overflow: hidden;
        color: var(--primary-text-color);
      }

      .weather-card.glass {
        background: var(--glass-bg);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid var(--glass-border);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      }

      .weather-card.solid {
        background: var(--card-background-color, #fff);
        box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.1));
      }

      .weather-card.minimal {
        background: transparent;
        box-shadow: none;
        border: none;
      }

      .card-inner {
        position: relative;
        z-index: 1;
        padding: 20px;
      }

      /* Background */
      .background-layer {
        position: absolute;
        inset: 0;
        z-index: 0;
        transition: background var(--transition-speed);
      }

      .background-layer.day {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }
      .background-layer.night {
        background: linear-gradient(135deg, #0c1445 0%, #1a237e 100%);
      }
      .background-layer.dawn {
        background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
      }
      .background-layer.dusk {
        background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      }

      .gradient-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
      }

      /* Header */
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
        gap: 16px;
      }

      .card-title {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
      }

      .weather-condition {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
        opacity: 0.9;
      }

      .condition-icon {
        font-size: 1.4rem;
      }
      .condition-text {
        font-size: 0.85rem;
      }

      /* View Toggle */
      .view-toggle {
        display: flex;
        gap: 4px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        padding: 4px;
        flex-shrink: 0;
      }

      .toggle-btn {
        background: transparent;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        color: inherit;
        opacity: 0.7;
      }

      .toggle-btn:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.15);
      }
      .toggle-btn.active {
        opacity: 1;
        background: rgba(255, 255, 255, 0.25);
      }
      .btn-icon {
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      /* Warnings */
      .warnings-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
      }

      .warning-pill {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.25);
      }

      .warning-pill.medium {
        border-left: 4px solid #ffc107;
      }
      .warning-pill.high {
        border-left: 4px solid #dc3545;
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

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }

      .warning-icon {
        font-size: 1.2rem;
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
      }
      .warning-text {
        font-size: 0.85rem;
        flex: 1;
      }

      /* Metrics Grid */
      .metrics-grid {
        display: grid;
        gap: 12px;
      }

      .metrics-grid.normal {
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      }

      .metrics-grid.compact {
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 8px;
      }

      /* Metric Card */
      .metric-card {
        position: relative;
        display: flex;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 12px;
        padding: 14px;
        padding-bottom: 0;
        cursor: pointer;
        transition: background var(--transition-speed), transform var(--transition-speed);
        border: 1px solid rgba(255, 255, 255, 0.1);
        contain: layout style;
        overflow: hidden;
      }

      .metric-card:hover {
        transform: translateY(-2px);
        background: rgba(0, 0, 0, 0.2);
      }

      .metric-card.expanded {
        grid-column: span 2;
      }
      .metric-card.wind-card {
        grid-column: span 2;
      }

      .metric-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .metric-icon {
        font-size: 1.2rem;
        display: inline-flex;
        align-items: center;
        opacity: 0.85;
      }

      .metric-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        opacity: 0.8;
      }

      .metric-body {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .metric-value-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .metric-value {
        font-size: 1.6rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }

      .metric-secondary {
        font-size: 0.75rem;
        opacity: 0.7;
      }

      .metric-sparkline {
        margin-top: 8px;
        margin-left: -14px;
        margin-right: -14px;
        margin-bottom: 0;
        height: 36px;
        pointer-events: none;
        opacity: 0.55;
        flex-shrink: 0;
      }

      /* Min/Max */
      .min-max-row {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        padding-top: 10px;
        padding-bottom: 14px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.75rem;
        opacity: 0.8;
      }

      .min-value {
        color: #64b5f6;
      }
      .max-value {
        color: #ef5350;
      }

      /* Wind Card */
      .wind-content {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .wind-stats {
        flex: 1;
      }

      .wind-speed-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .wind-speed-value {
        font-size: 1.4rem;
        font-weight: 600;
      }

      .wind-gust {
        font-size: 0.8rem;
        opacity: 0.7;
        margin-top: 4px;
      }

      /* UV Card */
      .uv-badge {
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 0.65rem;
        font-weight: 600;
        color: white;
        text-transform: uppercase;
      }

      .progress-bar {
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        margin-top: 12px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.5s ease-out;
      }

      /* Compact Metric */
      .compact-metric {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        transition: background 0.2s;
        contain: content;
      }

      .compact-metric:hover {
        background: rgba(0, 0, 0, 0.2);
      }

      .compact-icon {
        font-size: 1.1rem;
        display: inline-flex;
        align-items: center;
        opacity: 0.85;
      }

      .compact-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .compact-value {
        font-size: 1rem;
        font-weight: 600;
      }

      /* Hero Layout */
      .hero-layout {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .hero-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 8px;
      }

      .hero-icon {
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.85;
      }

      .hero-value {
        font-size: 3.5rem;
        font-weight: 700;
        line-height: 1;
      }

      .secondary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
        gap: 10px;
      }

      /* Minimal Layout */
      .minimal-layout {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
      }

      .minimal-primary {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .minimal-icon {
        font-size: 1.4rem;
        display: inline-flex;
        align-items: center;
        opacity: 0.85;
      }

      .minimal-value {
        font-size: 1.8rem;
        font-weight: 600;
      }

      .minimal-secondary {
        display: flex;
        gap: 16px;
        font-size: 0.85rem;
        opacity: 0.8;
      }

      .minimal-stat {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      /* History View */
      .history-view {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .period-tabs {
        display: flex;
        gap: 4px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        padding: 4px;
      }

      .period-tab {
        flex: 1;
        background: transparent;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        color: inherit;
        font-size: 0.8rem;
        transition: all 0.2s;
        opacity: 0.7;
      }

      .period-tab:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.1);
      }
      .period-tab.active {
        opacity: 1;
        background: rgba(255, 255, 255, 0.2);
        font-weight: 600;
      }

      .history-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .history-metric {
        background: rgba(0, 0, 0, 0.15);
        border-radius: 12px;
        padding: 14px;
      }

      .history-metric-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        flex-wrap: wrap;
      }

      .history-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        gap: 12px;
        opacity: 0.6;
      }

      .empty-icon {
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.6;
      }
      .empty-text {
        font-size: 0.9rem;
      }

      /* Error State */
      .error-card {
        background: var(--card-background-color, #fff);
      }

      .error-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        text-align: center;
        gap: 12px;
      }

      .error-icon {
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
      }
      .error-message {
        font-size: 1rem;
        font-weight: 600;
        color: var(--error-color, #db4437);
      }
      .error-hint {
        font-size: 0.85rem;
        color: var(--secondary-text-color, #666);
      }

      /* Responsive */
      @media (max-width: 600px) {
        .card-inner {
          padding: 16px;
        }
        .metrics-grid.normal {
          grid-template-columns: 1fr 1fr;
        }
        .metric-card.wind-card,
        .metric-card.expanded {
          grid-column: span 2;
        }
        .wind-content {
          flex-direction: column;
          text-align: center;
        }
        .hero-value {
          font-size: 2.8rem;
        }
        .card-header {
          flex-direction: column;
          gap: 12px;
        }
        .view-toggle {
          align-self: flex-start;
        }
      }

      @media (max-width: 400px) {
        .metrics-grid.normal {
          grid-template-columns: 1fr;
        }
        .metric-card.wind-card,
        .metric-card.expanded {
          grid-column: span 1;
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
