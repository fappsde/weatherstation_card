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

// Define schemas as constants (not recreated on each render)
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

const DEVICE_PICKER_SCHEMA: HaFormSchema[] = [
  {
    name: 'device_id',
    selector: { device: {} },
  },
];

const GENERAL_SETTINGS_SCHEMA: HaFormSchema[] = [
  {
    name: 'name',
    selector: { text: {} },
  },
];

const DISPLAY_MODE_SCHEMA: HaFormSchema[] = [
  {
    name: 'display_mode',
    selector: {
      select: {
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'compact', label: 'Compact' },
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

  public setConfig(config: WeatherStationCardConfig): void {
    this._config = config;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    void this._loadHaForm();
  }

  /**
   * Load ha-form component using the recommended approach.
   */
  private async _loadHaForm(): Promise<void> {
    if (customElements.get('ha-form')) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const helpers = await (window as any).loadCardHelpers?.();
    if (!helpers) return;

    // Creating a card element triggers loading of ha-form
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
      data_view: 'Data View',
      history_period: 'History Period',
      show_temperature: 'Show Temperature',
      show_humidity: 'Show Humidity',
      show_pressure: 'Show Pressure',
      show_wind: 'Show Wind',
      show_wind_arrows: 'Show Wind Direction Arrows',
      show_rain: 'Show Rain',
      show_uv: 'Show UV Index',
      show_solar: 'Show Solar Radiation',
      enable_warnings: 'Enable Warnings',
      // Entity labels with underscore format
      ...Object.fromEntries(
        Object.entries(ENTITY_LABELS).map(([key, label]) => [`entities_${key}`, label])
      ),
    };
    return labels[schema.name] || schema.name;
  };

  /**
   * Convert config to flat data object for ha-form
   */
  private _getFormData(): Record<string, unknown> {
    const data: Record<string, unknown> = {
      entity_mode: this._config.entity_mode || 'auto',
      device_id: this._config.device_id || '',
      name: this._config.name || '',
      display_mode: this._config.display_mode || 'normal',
      data_view: this._config.data_view || 'live',
      history_period: this._config.history_period || 'day',
      show_temperature: this._config.show_temperature !== false,
      show_humidity: this._config.show_humidity !== false,
      show_pressure: this._config.show_pressure !== false,
      show_wind: this._config.show_wind !== false,
      show_wind_arrows: this._config.show_wind_arrows !== false,
      show_rain: this._config.show_rain !== false,
      show_uv: this._config.show_uv !== false,
      show_solar: this._config.show_solar !== false,
      enable_warnings: this._config.enable_warnings || false,
    };

    // Flatten entities with underscore separator
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

    const data = this._getFormData();
    const entityMode = this._config.entity_mode || 'auto';

    return html`
      <div class="card-config">
        <h3>Entity Configuration</h3>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${ENTITY_MODE_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        ${entityMode === 'auto'
          ? html`
              <div class="entity-mode-info">
                Select your weather station device and the card will automatically discover and use
                all its sensors.
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
              <div class="entity-mode-info">
                Select individual sensor entities for each measurement.
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${data}
                .schema=${ENTITY_PICKER_SCHEMA}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `}

        <h3>General Settings</h3>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${GENERAL_SETTINGS_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        <h3>Display Mode</h3>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${DISPLAY_MODE_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        <h3>Data View</h3>
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

        <h3>Visible Sensors</h3>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${VISIBLE_SENSORS_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        <h3>Warnings</h3>
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
        { name: 'warnings_wind_speed_threshold', selector: { number: { min: 0, unit_of_measurement: 'km/h' } } },
        { name: 'warnings_wind_speed_message', selector: { text: {} } },
      ],
      temperature: [
        { name: 'warnings_temperature_enabled', selector: { boolean: {} } },
        { name: 'warnings_temperature_high_threshold', selector: { number: { unit_of_measurement: '°C' } } },
        { name: 'warnings_temperature_low_threshold', selector: { number: { unit_of_measurement: '°C' } } },
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
        { name: 'warnings_rain_rate_threshold', selector: { number: { min: 0, unit_of_measurement: 'mm/h' } } },
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

    const computeWarningLabel = (schema: HaFormSchema): string => warningLabels[schema.name] || schema.name;

    return html`
      <div class="warning-settings">
        <h4>Wind Speed Warning</h4>
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

        <h4>Temperature Warning</h4>
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

        <h4>UV Index Warning</h4>
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

        <h4>Rain Rate Warning</h4>
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
    `;
  }

  /**
   * Unified handler for main form value changes
   */
  private _formValueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) return;

    const newData = ev.detail.value;
    const newConfig = JSON.parse(JSON.stringify(this._config));

    Object.entries(newData).forEach(([key, value]) => {
      if (key.startsWith('entities_')) {
        // Handle entity values (underscore separator)
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
        // Handle top-level values
        newConfig[key] = value;
      }
    });

    // Clean up empty entities object
    if (newConfig.entities && Object.keys(newConfig.entities).length === 0) {
      delete newConfig.entities;
    }

    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  /**
   * Handler for warning settings form value changes
   */
  private _warningFormValueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) return;

    const newData = ev.detail.value;
    const newConfig = JSON.parse(JSON.stringify(this._config));

    if (!newConfig.warnings) {
      newConfig.warnings = {};
    }

    Object.entries(newData).forEach(([key, value]) => {
      // Parse key like "warnings_wind_speed_enabled" into nested structure
      const parts = key.replace('warnings_', '').split('_');
      const warningType = parts.slice(0, -1).join('_'); // e.g., "wind_speed", "rain_rate"
      const property = parts[parts.length - 1]; // e.g., "enabled", "threshold"

      if (!newConfig.warnings[warningType]) {
        newConfig.warnings[warningType] = {};
      }
      newConfig.warnings[warningType][property] = value;
    });

    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  // --- Auto Mode Entity Assignment Display ---

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
        <div class="auto-assignments-header">Entity Assignments</div>
        <div class="auto-assignments-desc">
          Automatically detected entities for each measurement. Override any assignment by selecting
          a different entity.
        </div>
        ${Object.entries(ENTITY_LABELS).map(([key, label]) => {
          const autoEntity = autoResolved[key];
          const override = (overrides as Record<string, string | undefined>)[key];
          const effectiveEntity = override || autoEntity || '';
          const isOverridden = !!override;
          const isNotFound = !effectiveEntity;

          return html`
            <div class="assignment-row">
              <div class="assignment-header">
                <span class="assignment-label">${label}</span>
                ${isOverridden
                  ? html`<span class="assignment-badge override">Override</span>`
                  : isNotFound
                    ? html`<span class="assignment-badge not-found">Not found</span>`
                    : html`<span class="assignment-badge auto">Auto</span>`}
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${{ [`entities_${key}`]: effectiveEntity }}
                .schema=${[{ name: `entities_${key}`, selector: { entity: { domain: 'sensor' } } }]}
                .computeLabel=${() => 'Entity for ' + label}
                @value-changed=${this._formValueChanged}
              ></ha-form>
              ${isOverridden
                ? html`<button class="reset-btn" @click=${() => this._clearOverride(key)}>
                    Reset to auto
                  </button>`
                : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }

  /**
   * Clear an entity override in auto mode, resetting to auto-detection.
   */
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
        padding: 16px;
      }

      h3 {
        margin: 24px 0 12px 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      h3:first-child {
        margin-top: 0;
      }

      h4 {
        margin: 16px 0 8px 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--secondary-text-color);
      }

      .input-group,
      .switch-group {
        margin-bottom: 16px;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 14px;
        color: var(--primary-text-color);
      }

      .switch-group label {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      input[type='text'],
      input[type='number'],
      select {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        box-sizing: border-box;
      }

      input[type='checkbox'] {
        width: 40px;
        height: 20px;
      }

      input:focus,
      select:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .warning-settings {
        margin-left: 16px;
        padding-left: 16px;
        border-left: 2px solid var(--divider-color);
      }

      .entity-mode-info {
        padding: 12px;
        margin-bottom: 16px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 4px;
        font-size: 14px;
        color: var(--secondary-text-color, #666);
        border-left: 3px solid var(--primary-color, #03a9f4);
      }

      .loading {
        padding: 16px;
        font-size: 14px;
        color: var(--secondary-text-color, #666);
        font-style: italic;
      }

      .helper-text {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        margin-top: 4px;
        font-style: italic;
      }

      .manual-entities {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 8px;
      }

      /* HA picker spacing */
      ha-device-picker,
      ha-entity-picker {
        display: block;
      }

      /* Auto-assignment section */
      .auto-assignments {
        margin-top: 16px;
      }

      .auto-assignments-header {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 4px;
      }

      .auto-assignments-desc {
        font-size: 13px;
        color: var(--secondary-text-color, #666);
        margin-bottom: 16px;
      }

      .assignment-row {
        margin-bottom: 12px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .assignment-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .assignment-label {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .assignment-badge {
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 10px;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }

      .assignment-badge.auto {
        background: var(--success-color, #4caf50);
        color: white;
      }

      .assignment-badge.override {
        background: var(--warning-color, #ff9800);
        color: white;
      }

      .assignment-badge.not-found {
        background: var(--error-color, #f44336);
        color: white;
      }

      .reset-btn {
        display: inline-block;
        margin-top: 6px;
        padding: 4px 12px;
        font-size: 12px;
        color: var(--primary-color, #03a9f4);
        background: none;
        border: 1px solid var(--primary-color, #03a9f4);
        border-radius: 4px;
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
