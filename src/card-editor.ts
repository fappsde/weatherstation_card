import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';
import { WeatherStationCardConfig } from './types';
import { ENTITY_KEYWORDS, ENTITY_LABELS } from './const';

@customElement('weatherstation-card-editor')
export class WeatherStationCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: WeatherStationCardConfig;

  public setConfig(config: WeatherStationCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const entityMode = this._config.entity_mode || 'auto';

    return html`
      <div class="card-config">
        <h3>Entity Configuration</h3>

        ${this.renderSelect('Entity Mode', 'entity_mode', [
          { value: 'auto', label: 'Auto (Use Device)' },
          { value: 'manual', label: 'Manual (Select Individual Entities)' },
        ])}
        ${entityMode === 'auto'
          ? html`
              <div class="entity-mode-info">
                Select your weather station device and the card will automatically discover and use
                all its sensors.
              </div>
              ${this.renderDevicePicker()}
            `
          : html`
              <div class="entity-mode-info">
                Select individual sensor entities for each measurement.
              </div>
              ${this.renderManualEntityPickers()}
            `}

        <h3>General Settings</h3>
        ${this.renderInput('Card Name', 'name', 'text', false)}

        <h3>Display Mode</h3>
        ${this.renderSelect('Display Mode', 'display_mode', [
          { value: 'normal', label: 'Normal' },
          { value: 'compact', label: 'Compact' },
        ])}

        <h3>Data View</h3>
        ${this.renderSelect('Data View', 'data_view', [
          { value: 'live', label: 'Live Data' },
          { value: 'history', label: 'Historical Data' },
        ])}
        ${this._config.data_view === 'history'
          ? this.renderSelect('History Period', 'history_period', [
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'year', label: 'Year' },
            ])
          : ''}

        <h3>Visible Sensors</h3>
        ${this.renderSwitch('Show Temperature', 'show_temperature')}
        ${this.renderSwitch('Show Humidity', 'show_humidity')}
        ${this.renderSwitch('Show Pressure', 'show_pressure')}
        ${this.renderSwitch('Show Wind', 'show_wind')}
        ${this._config.show_wind
          ? this.renderSwitch('Show Wind Direction Arrows', 'show_wind_arrows')
          : ''}
        ${this.renderSwitch('Show Rain', 'show_rain')}
        ${this.renderSwitch('Show UV Index', 'show_uv')}
        ${this.renderSwitch('Show Solar Radiation', 'show_solar')}

        <h3>Warnings</h3>
        ${this.renderSwitch('Enable Warnings', 'enable_warnings')}
        ${this._config.enable_warnings ? this.renderWarningSettings() : ''}
      </div>
    `;
  }

  private renderWarningSettings(): TemplateResult {
    return html`
      <div class="warning-settings">
        <h4>Wind Speed Warning</h4>
        ${this.renderSwitch('Enable', 'warnings.wind_speed.enabled')}
        ${this._config.warnings?.wind_speed?.enabled
          ? html`
              ${this.renderInput(
                'Threshold (km/h)',
                'warnings.wind_speed.threshold',
                'number',
                false
              )}
              ${this.renderInput('Message', 'warnings.wind_speed.message', 'text', false)}
            `
          : ''}

        <h4>Temperature Warning</h4>
        ${this.renderSwitch('Enable', 'warnings.temperature.enabled')}
        ${this._config.warnings?.temperature?.enabled
          ? html`
              ${this.renderInput(
                'High Threshold (°C)',
                'warnings.temperature.high_threshold',
                'number',
                false
              )}
              ${this.renderInput(
                'Low Threshold (°C)',
                'warnings.temperature.low_threshold',
                'number',
                false
              )}
              ${this.renderInput(
                'High Message',
                'warnings.temperature.message_high',
                'text',
                false
              )}
              ${this.renderInput('Low Message', 'warnings.temperature.message_low', 'text', false)}
            `
          : ''}

        <h4>UV Index Warning</h4>
        ${this.renderSwitch('Enable', 'warnings.uv.enabled')}
        ${this._config.warnings?.uv?.enabled
          ? html`
              ${this.renderInput('Threshold', 'warnings.uv.threshold', 'number', false)}
              ${this.renderInput('Message', 'warnings.uv.message', 'text', false)}
            `
          : ''}

        <h4>Rain Rate Warning</h4>
        ${this.renderSwitch('Enable', 'warnings.rain_rate.enabled')}
        ${this._config.warnings?.rain_rate?.enabled
          ? html`
              ${this.renderInput(
                'Threshold (mm/h)',
                'warnings.rain_rate.threshold',
                'number',
                false
              )}
              ${this.renderInput('Message', 'warnings.rain_rate.message', 'text', false)}
            `
          : ''}
      </div>
    `;
  }

  private renderInput(
    label: string,
    configKey: string,
    type: string,
    required: boolean
  ): TemplateResult {
    const value = this.getNestedValue(this._config, configKey);

    return html`
      <div class="input-group">
        <label>
          ${label}${required ? '*' : ''}
          <input
            type="${type}"
            .value=${value || ''}
            .configKey=${configKey}
            @input=${this._valueChanged}
            ?required=${required}
          />
        </label>
      </div>
    `;
  }

  private renderSwitch(label: string, configKey: string): TemplateResult {
    const value = this.getNestedValue(this._config, configKey);

    return html`
      <div class="switch-group">
        <label>
          <span>${label}</span>
          <input
            type="checkbox"
            .checked=${value !== false}
            .configKey=${configKey}
            @change=${this._valueChanged}
          />
        </label>
      </div>
    `;
  }

  private renderSelect(
    label: string,
    configKey: string,
    options: Array<{ value: string; label: string }>
  ): TemplateResult {
    const value = this.getNestedValue(this._config, configKey);

    return html`
      <div class="input-group">
        <label>
          ${label}
          <select .value=${value} .configKey=${configKey} @change=${this._valueChanged}>
            ${options.map(
              (option) => html`
                <option value="${option.value}" ?selected=${value === option.value}>
                  ${option.label}
                </option>
              `
            )}
          </select>
        </label>
      </div>
    `;
  }

  // --- HA Native Pickers ---

  private renderDevicePicker(): TemplateResult {
    return html`
      <ha-device-picker
        .hass=${this.hass}
        .value=${this._config.device_id || ''}
        .label=${'Weather Station Device'}
        .configValue=${'device_id'}
        @value-changed=${this._haValueChanged}
      ></ha-device-picker>
      ${this._config.device_id ? this.renderAutoAssignments() : ''}
    `;
  }

  private renderManualEntityPickers(): TemplateResult {
    return html`
      <div class="manual-entities">
        ${Object.entries(ENTITY_LABELS).map(([key, label]) => {
          const value = (this.getNestedValue(this._config, 'entities.' + key) as string) || '';
          return html`
            <ha-entity-picker
              .hass=${this.hass}
              .value=${value}
              .label=${label}
              .includeDomains=${['sensor']}
              .configValue=${'entities.' + key}
              @value-changed=${this._haValueChanged}
              allow-custom-entity
            ></ha-entity-picker>
          `;
        })}
      </div>
    `;
  }

  // --- Auto Mode Entity Assignment Display ---

  private resolveAutoEntities(deviceId: string): Record<string, string | undefined> {
    const deviceEntities: Record<string, string> = {};

    Object.values(this.hass.states).forEach((state: { entity_id: string }) => {
      const entityId = state.entity_id;
      const entityEntry = Object.values(this.hass.entities || {}).find(
        (entry: { entity_id?: string }) => entry.entity_id === entityId
      ) as { device_id?: string } | undefined;

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
              <ha-entity-picker
                .hass=${this.hass}
                .value=${effectiveEntity}
                .label=${'Entity for ' + label}
                .includeDomains=${['sensor']}
                .configValue=${'entities.' + key}
                @value-changed=${this._haValueChanged}
                allow-custom-entity
              ></ha-entity-picker>
              ${isOverridden
                ? html`<button class="reset-btn" @click=${() => this._clearOverride(key)}>
                    Reset to auto
                  </button>`
                : ''}
            </div>
          `;
        })}
      </div>
    `;
  }

  // --- Value Change Handlers ---

  private getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce((current, prop) => {
      if (current && typeof current === 'object') {
        return (current as Record<string, unknown>)[prop];
      }
      return undefined;
    }, obj as unknown);
  }

  private setNestedValue(
    obj: Record<string, unknown>,
    path: string,
    value: unknown
  ): Record<string, unknown> {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => {
      if (!current[key]) {
        current[key] = {};
      }
      return current[key] as Record<string, unknown>;
    }, obj);
    target[lastKey] = value;
    return obj;
  }

  /**
   * Handler for native form elements (input, select, checkbox).
   */
  private _valueChanged(ev: Event): void {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target as HTMLInputElement & { configKey?: string };
    const configKey = target.configKey;

    if (!configKey) {
      return;
    }

    let value: string | number | boolean;
    if (target.type === 'checkbox') {
      value = target.checked ?? false;
    } else if (target.type === 'number') {
      value = parseFloat(target.value ?? '0');
    } else {
      value = target.value ?? '';
    }

    const newConfig = JSON.parse(JSON.stringify(this._config));
    this.setNestedValue(newConfig, configKey, value);

    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  /**
   * Handler for HA custom elements (ha-entity-picker, ha-device-picker).
   * These fire 'value-changed' CustomEvents with ev.detail.value.
   * Uses ev.currentTarget to reliably get the element with configValue,
   * since ev.target may point to an internal child element.
   */
  private _haValueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) return;

    const target = (ev.currentTarget || ev.target) as HTMLElement & { configValue?: string };
    const configValue = target.configValue;
    if (!configValue) return;

    const value = ev.detail.value;
    const newConfig = JSON.parse(JSON.stringify(this._config));

    // In auto mode, clearing an entity picker removes the override
    if (!value && configValue.startsWith('entities.') && this._config.entity_mode !== 'manual') {
      const key = configValue.split('.').pop()!;
      if (newConfig.entities) {
        delete newConfig.entities[key];
        if (Object.keys(newConfig.entities).length === 0) {
          delete newConfig.entities;
        }
      }
    } else {
      this.setNestedValue(newConfig, configValue, value || '');
    }

    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: this._config });
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
