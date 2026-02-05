import { LitElement, html, css, CSSResultGroup, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';
import { WeatherStationCardConfig, HomeAssistantExtended } from './types';
import { ENTITY_KEYWORDS, ENTITY_LABELS } from './const';

// Schema type for ha-form
interface HaFormSchema {
  name: string;
  selector?: Record<string, unknown>;
  type?: string;
  schema?: HaFormSchema[];
  default?: unknown;
}

// ============================================
// Schema Definitions
// ============================================

const ENTITY_MODE_SCHEMA: HaFormSchema[] = [
  {
    name: 'entity_mode',
    selector: {
      select: {
        options: [
          { value: 'auto', label: 'Auto (Use Device)' },
          { value: 'manual', label: 'Manual (Select Individual Entities)' },
        ],
        mode: 'dropdown',
      },
    },
  },
];

const DEVICE_PICKER_SCHEMA: HaFormSchema[] = [{ name: 'device_id', selector: { device: {} } }];

const GENERAL_SETTINGS_SCHEMA: HaFormSchema[] = [{ name: 'name', selector: { text: {} } }];

const DISPLAY_MODE_SCHEMA: HaFormSchema[] = [
  {
    name: 'display_mode',
    selector: {
      select: {
        options: [
          { value: 'normal', label: 'Normal - Full layout with all details' },
          { value: 'compact', label: 'Compact - Space-efficient grid' },
          { value: 'hero', label: 'Hero - Featured metric with large display' },
          { value: 'minimal', label: 'Minimal - Single line summary' },
        ],
        mode: 'dropdown',
      },
    },
  },
];

const CARD_STYLE_SCHEMA: HaFormSchema[] = [
  {
    name: 'card_style',
    selector: {
      select: {
        options: [
          { value: 'glass', label: 'Glass - Modern glassmorphism with gradients' },
          { value: 'solid', label: 'Solid - Traditional card background' },
          { value: 'minimal', label: 'Minimal - Transparent, no background' },
        ],
        mode: 'dropdown',
      },
    },
  },
];

const DATA_VIEW_SCHEMA: HaFormSchema[] = [
  {
    name: 'data_view',
    selector: {
      select: {
        options: [
          { value: 'live', label: 'Live Data' },
          { value: 'history', label: 'Historical Data' },
        ],
        mode: 'dropdown',
      },
    },
  },
];

const HISTORY_PERIOD_SCHEMA: HaFormSchema[] = [
  {
    name: 'history_period',
    selector: {
      select: {
        options: [
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
          { value: 'year', label: 'Year' },
        ],
        mode: 'dropdown',
      },
    },
  },
];

const TREND_PERIOD_SCHEMA: HaFormSchema[] = [
  {
    name: 'trend_period',
    selector: {
      select: {
        options: [
          { value: '1h', label: '1 Hour' },
          { value: '3h', label: '3 Hours' },
          { value: '6h', label: '6 Hours' },
          { value: '12h', label: '12 Hours' },
          { value: '24h', label: '24 Hours' },
        ],
        mode: 'dropdown',
      },
    },
  },
];

const HERO_METRIC_SCHEMA: HaFormSchema[] = [
  {
    name: 'hero_metric',
    selector: {
      select: {
        options: [
          { value: 'auto', label: 'Auto - Select most significant' },
          { value: 'temperature', label: 'Temperature' },
        ],
        mode: 'dropdown',
      },
    },
  },
];

const VISIBLE_SENSORS_SCHEMA: HaFormSchema[] = [
  { name: 'show_temperature', selector: { boolean: {} } },
  { name: 'show_humidity', selector: { boolean: {} } },
  { name: 'show_pressure', selector: { boolean: {} } },
  { name: 'show_wind', selector: { boolean: {} } },
  { name: 'show_wind_arrows', selector: { boolean: {} } },
  { name: 'show_rain', selector: { boolean: {} } },
  { name: 'show_uv', selector: { boolean: {} } },
  { name: 'show_solar', selector: { boolean: {} } },
];

const TREND_FEATURES_SCHEMA: HaFormSchema[] = [
  { name: 'show_trends', selector: { boolean: {} } },
  { name: 'show_sparklines', selector: { boolean: {} } },
  { name: 'show_min_max', selector: { boolean: {} } },
  { name: 'show_weather_condition', selector: { boolean: {} } },
];

const ANIMATION_SCHEMA: HaFormSchema[] = [{ name: 'enable_animations', selector: { boolean: {} } }];

const WARNINGS_TOGGLE_SCHEMA: HaFormSchema[] = [
  { name: 'enable_warnings', selector: { boolean: {} } },
];

// Generate entity picker schema from ENTITY_LABELS
const ENTITY_PICKER_SCHEMA: HaFormSchema[] = Object.keys(ENTITY_LABELS).map((key) => ({
  name: `entities_${key}`,
  selector: { entity: { domain: 'sensor' } },
}));

@customElement('weatherstation-card-editor')
export class WeatherStationCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: WeatherStationCardConfig;
  @state() private _activeTab: 'data' | 'appearance' | 'features' | 'warnings' = 'data';

  public setConfig(config: WeatherStationCardConfig): void {
    this._config = config;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    void this._loadHaForm();
  }

  private async _loadHaForm(): Promise<void> {
    if (customElements.get('ha-form')) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const helpers = await (window as any).loadCardHelpers?.();
    if (!helpers) return;

    const card = await helpers.createCardElement({ type: 'entity', entity: 'sun.sun' });
    if (card) {
      await card.getConfigElement?.();
    }
  }

  private _computeLabel = (schema: HaFormSchema): string => {
    const labels: Record<string, string> = {
      device_id: 'Weather Station Device',
      name: 'Card Name',
      entity_mode: 'Entity Mode',
      display_mode: 'Display Mode',
      card_style: 'Card Style',
      data_view: 'Default View',
      history_period: 'History Period',
      trend_period: 'Trend Comparison Period',
      hero_metric: 'Hero Metric (for Hero mode)',
      show_temperature: 'Show Temperature',
      show_humidity: 'Show Humidity',
      show_pressure: 'Show Pressure',
      show_wind: 'Show Wind',
      show_wind_arrows: 'Show Wind Compass',
      show_rain: 'Show Rain',
      show_uv: 'Show UV Index',
      show_solar: 'Show Solar Radiation',
      show_trends: 'Show Trend Indicators',
      show_sparklines: 'Show Mini Charts (Sparklines)',
      show_min_max: 'Show Min/Max Values',
      show_weather_condition: 'Show Weather Condition',
      enable_animations: 'Enable Animations',
      enable_warnings: 'Enable Weather Warnings',
      ...Object.fromEntries(
        Object.entries(ENTITY_LABELS).map(([key, label]) => [`entities_${key}`, label])
      ),
    };
    return labels[schema.name] || schema.name;
  };

  private _getFormData(): Record<string, unknown> {
    const data: Record<string, unknown> = {
      entity_mode: this._config.entity_mode || 'auto',
      device_id: this._config.device_id || '',
      name: this._config.name || '',
      display_mode: this._config.display_mode || 'normal',
      card_style: this._config.card_style || 'glass',
      data_view: this._config.data_view || 'live',
      history_period: this._config.history_period || 'day',
      trend_period: this._config.trend_period || '1h',
      hero_metric: this._config.hero_metric || 'auto',
      show_temperature: this._config.show_temperature !== false,
      show_humidity: this._config.show_humidity !== false,
      show_pressure: this._config.show_pressure !== false,
      show_wind: this._config.show_wind !== false,
      show_wind_arrows: this._config.show_wind_arrows !== false,
      show_rain: this._config.show_rain !== false,
      show_uv: this._config.show_uv !== false,
      show_solar: this._config.show_solar !== false,
      show_trends: this._config.show_trends !== false,
      show_sparklines: this._config.show_sparklines !== false,
      show_min_max: this._config.show_min_max !== false,
      show_weather_condition: this._config.show_weather_condition !== false,
      enable_animations: this._config.enable_animations !== false,
      enable_warnings: this._config.enable_warnings || false,
    };

    if (this._config.entities) {
      Object.entries(this._config.entities).forEach(([key, value]) => {
        data[`entities_${key}`] = value || '';
      });
    }

    return data;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        ${this.renderTabs()}
        <div class="tab-content">
          ${this._activeTab === 'data' ? this.renderDataTab() : ''}
          ${this._activeTab === 'appearance' ? this.renderAppearanceTab() : ''}
          ${this._activeTab === 'features' ? this.renderFeaturesTab() : ''}
          ${this._activeTab === 'warnings' ? this.renderWarningsTab() : ''}
        </div>
      </div>
    `;
  }

  private renderTabs(): TemplateResult {
    const tabs = [
      { id: 'data', label: '📊 Data', icon: '📊' },
      { id: 'appearance', label: '🎨 Appearance', icon: '🎨' },
      { id: 'features', label: '⚡ Features', icon: '⚡' },
      { id: 'warnings', label: '⚠️ Warnings', icon: '⚠️' },
    ] as const;

    return html`
      <div class="tabs">
        ${tabs.map(
          (tab) => html`
            <button
              class="tab ${this._activeTab === tab.id ? 'active' : ''}"
              @click=${() => (this._activeTab = tab.id)}
            >
              ${tab.label}
            </button>
          `
        )}
      </div>
    `;
  }

  private renderDataTab(): TemplateResult {
    const data = this._getFormData();
    const entityMode = this._config.entity_mode || 'auto';

    return html`
      <div class="section">
        <h3>🔌 Data Source</h3>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${ENTITY_MODE_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        ${entityMode === 'auto'
          ? html`
              <div class="info-box">
                <span class="info-icon">💡</span>
                <span>Select your weather station device and sensors will be auto-discovered.</span>
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${data}
                .schema=${DEVICE_PICKER_SCHEMA}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
              ${this._config.device_id ? this.renderAutoAssignments() : nothing}
            `
          : html`
              <div class="info-box">
                <span class="info-icon">⚙️</span>
                <span>Manually select individual sensor entities for each measurement.</span>
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${data}
                .schema=${ENTITY_PICKER_SCHEMA}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `}
      </div>

      <div class="section">
        <h3>📝 General</h3>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${GENERAL_SETTINGS_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>👁️ Visible Sensors</h3>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${VISIBLE_SENSORS_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
      </div>
    `;
  }

  private renderAppearanceTab(): TemplateResult {
    const data = this._getFormData();

    return html`
      <div class="section">
        <h3>🖼️ Display Mode</h3>
        <div class="mode-preview">${this.renderModePreview()}</div>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${DISPLAY_MODE_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        ${this._config.display_mode === 'hero'
          ? html`
              <ha-form
                .hass=${this.hass}
                .data=${data}
                .schema=${HERO_METRIC_SCHEMA}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `
          : nothing}
      </div>

      <div class="section">
        <h3>🎨 Card Style</h3>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${CARD_STYLE_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>✨ Animations</h3>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${ANIMATION_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
      </div>
    `;
  }

  private renderModePreview(): TemplateResult {
    const mode = this._config.display_mode || 'normal';

    const previews: Record<string, TemplateResult> = {
      normal: html`
        <div class="preview-card">
          <div class="preview-header">Weather Station</div>
          <div class="preview-grid">
            <div class="preview-metric">🌡️ 22°C</div>
            <div class="preview-metric">💧 65%</div>
            <div class="preview-metric">💨 15 km/h</div>
            <div class="preview-metric">🌧️ 0 mm</div>
          </div>
        </div>
      `,
      compact: html`
        <div class="preview-card compact">
          <div class="preview-row">
            <span>🌡️ 22°C</span>
            <span>💧 65%</span>
            <span>💨 15</span>
          </div>
        </div>
      `,
      hero: html`
        <div class="preview-card hero">
          <div class="preview-hero-value">22°C</div>
          <div class="preview-hero-sub">↑ +2° / 1h</div>
        </div>
      `,
      minimal: html`
        <div class="preview-card minimal">
          <span>🌡️ 22°C</span>
          <span>💧 65%</span>
        </div>
      `,
    };

    return previews[mode] || previews.normal;
  }

  private renderFeaturesTab(): TemplateResult {
    const data = this._getFormData();

    return html`
      <div class="section">
        <h3>📈 Trends & History</h3>
        <div class="info-box">
          <span class="info-icon">📊</span>
          <span
            >Trends show how values have changed. Sparklines display mini charts of recent
            history.</span
          >
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${TREND_FEATURES_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        ${this._config.show_trends !== false
          ? html`
              <h4>Trend Comparison Period</h4>
              <ha-form
                .hass=${this.hass}
                .data=${data}
                .schema=${TREND_PERIOD_SCHEMA}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `
          : nothing}
      </div>

      <div class="section">
        <h3>📅 Default View</h3>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${DATA_VIEW_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
        ${this._config.data_view === 'history'
          ? html`
              <ha-form
                .hass=${this.hass}
                .data=${data}
                .schema=${HISTORY_PERIOD_SCHEMA}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `
          : nothing}
      </div>
    `;
  }

  private renderWarningsTab(): TemplateResult {
    const data = this._getFormData();

    return html`
      <div class="section">
        <h3>⚠️ Weather Warnings</h3>
        <div class="info-box warning">
          <span class="info-icon">🔔</span>
          <span>Get alerted when weather conditions exceed thresholds you set.</span>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${WARNINGS_TOGGLE_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
        ${this._config.enable_warnings ? this.renderWarningSettings() : nothing}
      </div>
    `;
  }

  private renderWarningSettings(): TemplateResult {
    const warningSchemas = {
      wind_speed: [
        { name: 'warnings_wind_speed_enabled', selector: { boolean: {} } },
        {
          name: 'warnings_wind_speed_threshold',
          selector: { number: { min: 0, unit_of_measurement: 'km/h' } },
        },
        { name: 'warnings_wind_speed_message', selector: { text: {} } },
      ],
      temperature: [
        { name: 'warnings_temperature_enabled', selector: { boolean: {} } },
        {
          name: 'warnings_temperature_high_threshold',
          selector: { number: { unit_of_measurement: '°C' } },
        },
        {
          name: 'warnings_temperature_low_threshold',
          selector: { number: { unit_of_measurement: '°C' } },
        },
        { name: 'warnings_temperature_message_high', selector: { text: {} } },
        { name: 'warnings_temperature_message_low', selector: { text: {} } },
      ],
      uv: [
        { name: 'warnings_uv_enabled', selector: { boolean: {} } },
        { name: 'warnings_uv_threshold', selector: { number: { min: 0, max: 15 } } },
        { name: 'warnings_uv_message', selector: { text: {} } },
      ],
      rain_rate: [
        { name: 'warnings_rain_rate_enabled', selector: { boolean: {} } },
        {
          name: 'warnings_rain_rate_threshold',
          selector: { number: { min: 0, unit_of_measurement: 'mm/h' } },
        },
        { name: 'warnings_rain_rate_message', selector: { text: {} } },
      ],
    };

    const warningLabels: Record<string, string> = {
      warnings_wind_speed_enabled: 'Enable Wind Speed Warning',
      warnings_wind_speed_threshold: 'Threshold (km/h)',
      warnings_wind_speed_message: 'Warning Message',
      warnings_temperature_enabled: 'Enable Temperature Warning',
      warnings_temperature_high_threshold: 'High Threshold (°C)',
      warnings_temperature_low_threshold: 'Low Threshold (°C)',
      warnings_temperature_message_high: 'High Temperature Message',
      warnings_temperature_message_low: 'Low Temperature Message',
      warnings_uv_enabled: 'Enable UV Warning',
      warnings_uv_threshold: 'Threshold',
      warnings_uv_message: 'Warning Message',
      warnings_rain_rate_enabled: 'Enable Rain Rate Warning',
      warnings_rain_rate_threshold: 'Threshold (mm/h)',
      warnings_rain_rate_message: 'Warning Message',
    };

    const warningsData: Record<string, unknown> = {
      warnings_wind_speed_enabled: this._config.warnings?.wind_speed?.enabled || false,
      warnings_wind_speed_threshold: this._config.warnings?.wind_speed?.threshold || 50,
      warnings_wind_speed_message: this._config.warnings?.wind_speed?.message || '',
      warnings_temperature_enabled: this._config.warnings?.temperature?.enabled || false,
      warnings_temperature_high_threshold: this._config.warnings?.temperature?.high_threshold || 35,
      warnings_temperature_low_threshold: this._config.warnings?.temperature?.low_threshold || 0,
      warnings_temperature_message_high: this._config.warnings?.temperature?.message_high || '',
      warnings_temperature_message_low: this._config.warnings?.temperature?.message_low || '',
      warnings_uv_enabled: this._config.warnings?.uv?.enabled || false,
      warnings_uv_threshold: this._config.warnings?.uv?.threshold || 8,
      warnings_uv_message: this._config.warnings?.uv?.message || '',
      warnings_rain_rate_enabled: this._config.warnings?.rain_rate?.enabled || false,
      warnings_rain_rate_threshold: this._config.warnings?.rain_rate?.threshold || 10,
      warnings_rain_rate_message: this._config.warnings?.rain_rate?.message || '',
    };

    const computeWarningLabel = (schema: HaFormSchema): string =>
      warningLabels[schema.name] || schema.name;

    return html`
      <div class="warning-settings">
        <div class="warning-category">
          <h4>💨 Wind Speed</h4>
          <ha-form
            .hass=${this.hass}
            .data=${warningsData}
            .schema=${[warningSchemas.wind_speed[0]]}
            .computeLabel=${computeWarningLabel}
            @value-changed=${this._warningFormValueChanged}
          ></ha-form>
          ${this._config.warnings?.wind_speed?.enabled
            ? html`
                <ha-form
                  .hass=${this.hass}
                  .data=${warningsData}
                  .schema=${warningSchemas.wind_speed.slice(1)}
                  .computeLabel=${computeWarningLabel}
                  @value-changed=${this._warningFormValueChanged}
                ></ha-form>
              `
            : nothing}
        </div>

        <div class="warning-category">
          <h4>🌡️ Temperature</h4>
          <ha-form
            .hass=${this.hass}
            .data=${warningsData}
            .schema=${[warningSchemas.temperature[0]]}
            .computeLabel=${computeWarningLabel}
            @value-changed=${this._warningFormValueChanged}
          ></ha-form>
          ${this._config.warnings?.temperature?.enabled
            ? html`
                <ha-form
                  .hass=${this.hass}
                  .data=${warningsData}
                  .schema=${warningSchemas.temperature.slice(1)}
                  .computeLabel=${computeWarningLabel}
                  @value-changed=${this._warningFormValueChanged}
                ></ha-form>
              `
            : nothing}
        </div>

        <div class="warning-category">
          <h4>☀️ UV Index</h4>
          <ha-form
            .hass=${this.hass}
            .data=${warningsData}
            .schema=${[warningSchemas.uv[0]]}
            .computeLabel=${computeWarningLabel}
            @value-changed=${this._warningFormValueChanged}
          ></ha-form>
          ${this._config.warnings?.uv?.enabled
            ? html`
                <ha-form
                  .hass=${this.hass}
                  .data=${warningsData}
                  .schema=${warningSchemas.uv.slice(1)}
                  .computeLabel=${computeWarningLabel}
                  @value-changed=${this._warningFormValueChanged}
                ></ha-form>
              `
            : nothing}
        </div>

        <div class="warning-category">
          <h4>🌧️ Rain Rate</h4>
          <ha-form
            .hass=${this.hass}
            .data=${warningsData}
            .schema=${[warningSchemas.rain_rate[0]]}
            .computeLabel=${computeWarningLabel}
            @value-changed=${this._warningFormValueChanged}
          ></ha-form>
          ${this._config.warnings?.rain_rate?.enabled
            ? html`
                <ha-form
                  .hass=${this.hass}
                  .data=${warningsData}
                  .schema=${warningSchemas.rain_rate.slice(1)}
                  .computeLabel=${computeWarningLabel}
                  @value-changed=${this._warningFormValueChanged}
                ></ha-form>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  private _formValueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) return;

    const newData = ev.detail.value;
    const newConfig = JSON.parse(JSON.stringify(this._config));

    Object.entries(newData).forEach(([key, value]) => {
      if (key.startsWith('entities_')) {
        const entityKey = key.replace('entities_', '');
        if (!newConfig.entities) {
          newConfig.entities = {};
        }
        if (value) {
          newConfig.entities[entityKey] = value;
        } else {
          delete newConfig.entities[entityKey];
        }
      } else {
        newConfig[key] = value;
      }
    });

    if (newConfig.entities && Object.keys(newConfig.entities).length === 0) {
      delete newConfig.entities;
    }

    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private _warningFormValueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) return;

    const newData = ev.detail.value;
    const newConfig = JSON.parse(JSON.stringify(this._config));

    if (!newConfig.warnings) {
      newConfig.warnings = {};
    }

    Object.entries(newData).forEach(([key, value]) => {
      const parts = key.replace('warnings_', '').split('_');

      // Handle multi-word warning types like "rain_rate" or "wind_speed"
      let warningType: string;
      let property: string;

      if (parts[0] === 'rain' && parts[1] === 'rate') {
        warningType = 'rain_rate';
        property = parts.slice(2).join('_');
      } else if (parts[0] === 'wind' && parts[1] === 'speed') {
        warningType = 'wind_speed';
        property = parts.slice(2).join('_');
      } else {
        warningType = parts[0];
        property = parts.slice(1).join('_');
      }

      if (!newConfig.warnings[warningType]) {
        newConfig.warnings[warningType] = {};
      }
      newConfig.warnings[warningType][property] = value;
    });

    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private resolveAutoEntities(deviceId: string): Record<string, string | undefined> {
    const deviceEntities: Record<string, string> = {};
    const hass = this.hass as HomeAssistantExtended;
    const entityRegistry = hass.entities || {};

    Object.values(this.hass.states).forEach((state: { entity_id: string }) => {
      const entityId = state.entity_id;
      const entityEntry = Object.values(entityRegistry).find(
        (entry) => entry.entity_id === entityId
      );

      if (entityEntry?.device_id === deviceId) {
        const entityName = entityId.split('.')[1].toLowerCase();
        deviceEntities[entityName] = entityId;
      }
    });

    const result: Record<string, string | undefined> = {};

    for (const [measurement, keywords] of Object.entries(ENTITY_KEYWORDS)) {
      result[measurement] = undefined;
      for (const keyword of keywords) {
        let found = false;
        for (const [name, entityId] of Object.entries(deviceEntities)) {
          if (name.includes(keyword)) {
            result[measurement] = entityId;
            found = true;
            break;
          }
        }
        if (found) break;
      }
    }

    return result;
  }

  private renderAutoAssignments(): TemplateResult {
    if (!this._config.device_id) return html``;

    const autoResolved = this.resolveAutoEntities(this._config.device_id);
    const overrides = this._config.entities || {};

    return html`
      <div class="auto-assignments">
        <div class="auto-assignments-header">
          <span>🔗 Entity Assignments</span>
          <span class="assignment-count">
            ${Object.values(autoResolved).filter((v) => v).length} found
          </span>
        </div>

        ${Object.entries(ENTITY_LABELS).map(([key, label]) => {
          const autoEntity = autoResolved[key];
          const override = (overrides as Record<string, string | undefined>)[key];
          const effectiveEntity = override || autoEntity || '';
          const isOverridden = !!override;
          const isNotFound = !effectiveEntity;

          return html`
            <div
              class="assignment-row ${isNotFound ? 'not-found' : ''} ${isOverridden
                ? 'overridden'
                : ''}"
            >
              <div class="assignment-header">
                <span class="assignment-label">${label}</span>
                ${isOverridden
                  ? html`<span class="badge override">Override</span>`
                  : isNotFound
                    ? html`<span class="badge not-found">Not found</span>`
                    : html`<span class="badge auto">Auto</span>`}
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${{ [`entities_${key}`]: effectiveEntity }}
                .schema=${[{ name: `entities_${key}`, selector: { entity: { domain: 'sensor' } } }]}
                .computeLabel=${() => ''}
                @value-changed=${this._formValueChanged}
              ></ha-form>
              ${isOverridden
                ? html`
                    <button class="reset-btn" @click=${() => this._clearOverride(key)}>
                      Reset to auto
                    </button>
                  `
                : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _clearOverride(key: string): void {
    const newConfig = JSON.parse(JSON.stringify(this._config));
    if (newConfig.entities) {
      delete newConfig.entities[key];
      if (Object.keys(newConfig.entities).length === 0) {
        delete newConfig.entities;
      }
    }
    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles(): CSSResultGroup {
    return css`
      .card-config {
        padding: 0;
      }

      /* Tabs */
      .tabs {
        display: flex;
        gap: 4px;
        padding: 8px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 12px;
        margin-bottom: 16px;
      }

      .tab {
        flex: 1;
        padding: 10px 12px;
        border: none;
        background: transparent;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary-text-color, #666);
        transition: all 0.2s;
      }

      .tab:hover {
        background: rgba(0, 0, 0, 0.05);
        color: var(--primary-text-color);
      }

      .tab.active {
        background: var(--primary-color, #03a9f4);
        color: white;
      }

      /* Sections */
      .section {
        margin-bottom: 24px;
      }

      h3 {
        margin: 0 0 16px 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      h4 {
        margin: 16px 0 8px 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--secondary-text-color);
      }

      /* Info Box */
      .info-box {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 12px;
        margin-bottom: 16px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        font-size: 13px;
        color: var(--secondary-text-color, #666);
        border-left: 3px solid var(--primary-color, #03a9f4);
      }

      .info-box.warning {
        border-left-color: var(--warning-color, #ff9800);
      }

      .info-icon {
        font-size: 16px;
        flex-shrink: 0;
      }

      /* Mode Preview */
      .mode-preview {
        margin-bottom: 16px;
      }

      .preview-card {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        border-radius: 12px;
        padding: 16px;
        color: white;
      }

      .preview-header {
        font-weight: 600;
        margin-bottom: 12px;
        font-size: 14px;
      }

      .preview-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .preview-metric {
        background: rgba(0, 0, 0, 0.15);
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
      }

      .preview-card.compact {
        padding: 12px;
      }

      .preview-row {
        display: flex;
        justify-content: space-around;
        font-size: 13px;
      }

      .preview-card.hero {
        text-align: center;
        padding: 24px;
      }

      .preview-hero-value {
        font-size: 32px;
        font-weight: 700;
      }

      .preview-hero-sub {
        font-size: 12px;
        opacity: 0.8;
        margin-top: 4px;
      }

      .preview-card.minimal {
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;
      }

      /* Warning Settings */
      .warning-settings {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 16px;
      }

      .warning-category {
        padding: 16px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 12px;
      }

      .warning-category h4 {
        margin: 0 0 12px 0;
      }

      /* Auto Assignments */
      .auto-assignments {
        margin-top: 16px;
      }

      .auto-assignments-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 12px;
      }

      .assignment-count {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color);
        padding: 4px 10px;
        border-radius: 12px;
      }

      .assignment-row {
        margin-bottom: 8px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 10px;
        transition: all 0.2s;
      }

      .assignment-row:hover {
        background: var(--secondary-background-color, #eee);
      }

      .assignment-row.not-found {
        border-left: 3px solid var(--error-color, #f44336);
      }

      .assignment-row.overridden {
        border-left: 3px solid var(--warning-color, #ff9800);
      }

      .assignment-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .assignment-label {
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .badge {
        font-size: 10px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 10px;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }

      .badge.auto {
        background: var(--success-color, #4caf50);
        color: white;
      }

      .badge.override {
        background: var(--warning-color, #ff9800);
        color: white;
      }

      .badge.not-found {
        background: var(--error-color, #f44336);
        color: white;
      }

      .reset-btn {
        display: inline-block;
        margin-top: 8px;
        padding: 6px 12px;
        font-size: 12px;
        color: var(--primary-color, #03a9f4);
        background: transparent;
        border: 1px solid var(--primary-color, #03a9f4);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .reset-btn:hover {
        background: var(--primary-color, #03a9f4);
        color: white;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'weatherstation-card-editor': WeatherStationCardEditor;
  }
}
