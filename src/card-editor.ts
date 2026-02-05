import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';
import { WeatherStationCardConfig } from './types';

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

  private renderEntityPicker(
    label: string,
    configKey: string,
    domain?: string,
    required: boolean = false,
    helperText?: string
  ): TemplateResult {
    const value = this.getNestedValue(this._config, configKey) as string;

    // Get all entities and filter by domain if specified
    const entities = Object.keys(this.hass.states)
      .filter((entityId) => {
        if (!domain) return true;
        return entityId.startsWith(domain + '.');
      })
      .sort();

    return html`
      <div class="input-group">
        <label>
          ${label}${required ? '*' : ''}
          ${helperText ? html`<div class="helper-text">${helperText}</div>` : ''}
          <select
            .value=${value || ''}
            .configKey=${configKey}
            @change=${this._valueChanged}
            ?required=${required}
          >
            <option value="">-- Select Entity --</option>
            ${entities.map(
              (entityId) => html`
                <option value="${entityId}" ?selected=${value === entityId}>${entityId}</option>
              `
            )}
          </select>
        </label>
      </div>
    `;
  }

  private renderManualEntityPickers(): TemplateResult {
    return html`
      <div class="manual-entities">
        ${this.renderEntityPicker(
          'Temperature',
          'entities.temperature',
          'sensor',
          false,
          'Temperature sensor (e.g., sensor.ecowitt_temperature)'
        )}
        ${this.renderEntityPicker(
          'Humidity',
          'entities.humidity',
          'sensor',
          false,
          'Humidity sensor (e.g., sensor.ecowitt_humidity)'
        )}
        ${this.renderEntityPicker(
          'Pressure',
          'entities.pressure',
          'sensor',
          false,
          'Pressure sensor (e.g., sensor.ecowitt_pressure)'
        )}
        ${this.renderEntityPicker(
          'Wind Speed',
          'entities.wind_speed',
          'sensor',
          false,
          'Wind speed sensor'
        )}
        ${this.renderEntityPicker(
          'Wind Direction',
          'entities.wind_direction',
          'sensor',
          false,
          'Wind direction sensor (bearing in degrees)'
        )}
        ${this.renderEntityPicker(
          'Wind Gust',
          'entities.wind_gust',
          'sensor',
          false,
          'Wind gust speed sensor (optional)'
        )}
        ${this.renderEntityPicker(
          'Rain',
          'entities.rain',
          'sensor',
          false,
          'Total rainfall sensor'
        )}
        ${this.renderEntityPicker(
          'Rain Rate',
          'entities.rain_rate',
          'sensor',
          false,
          'Rainfall rate sensor (optional)'
        )}
        ${this.renderEntityPicker(
          'UV Index',
          'entities.uv_index',
          'sensor',
          false,
          'UV index sensor'
        )}
        ${this.renderEntityPicker(
          'Solar Radiation',
          'entities.solar_radiation',
          'sensor',
          false,
          'Solar radiation sensor (optional)'
        )}
      </div>
    `;
  }

  private renderDevicePicker(): TemplateResult {
    const deviceId = this._config.device_id;

    // Get device registry from hass
    const devices: Array<{ id: string; name: string }> = [];

    // In Home Assistant, devices are accessed through hass.devices
    // We need to iterate through entities and find their devices
    const deviceMap = new Map<string, { name: string; entityCount: number }>();

    Object.values(this.hass.states).forEach((state) => {
      const entityId = state.entity_id;
      // Get device_id from entity registry (if available)
      const deviceRegistryEntry = Object.values(this.hass.entities || {}).find(
        (entry: { entity_id?: string }) => entry.entity_id === entityId
      ) as { device_id?: string } | undefined;

      if (deviceRegistryEntry?.device_id) {
        const devId = deviceRegistryEntry.device_id;
        if (!deviceMap.has(devId)) {
          // Get device info
          const device = (this.hass.devices || {})[devId] as
            | { name?: string; name_by_user?: string; model?: string }
            | undefined;
          if (device) {
            const deviceName =
              device.name_by_user || device.name || device.model || `Device ${devId.slice(0, 8)}`;
            deviceMap.set(devId, { name: deviceName, entityCount: 1 });
          }
        } else {
          const existing = deviceMap.get(devId)!;
          deviceMap.set(devId, { ...existing, entityCount: existing.entityCount + 1 });
        }
      }
    });

    // Convert to array and sort by name
    deviceMap.forEach((info, id) => {
      devices.push({ id, name: `${info.name} (${info.entityCount} entities)` });
    });
    devices.sort((a, b) => a.name.localeCompare(b.name));

    return html`
      <div class="input-group">
        <label>
          Weather Station Device*
          <div class="helper-text">Select your Ecowitt weather station or other weather device</div>
          <select .value=${deviceId || ''} .configKey=${'device_id'} @change=${this._valueChanged}>
            <option value="">-- Select Device --</option>
            ${devices.map(
              (device) => html`
                <option value="${device.id}" ?selected=${deviceId === device.id}>
                  ${device.name}
                </option>
              `
            )}
          </select>
        </label>
      </div>
      ${deviceId ? this.renderDeviceInfo(deviceId) : ''}
    `;
  }

  private renderDeviceInfo(deviceId: string): TemplateResult {
    // Find entities belonging to this device
    const deviceEntities: string[] = [];

    Object.values(this.hass.states).forEach((state) => {
      const entityId = state.entity_id;
      const entityRegistryEntry = Object.values(this.hass.entities || {}).find(
        (entry: { entity_id?: string }) => entry.entity_id === entityId
      ) as { device_id?: string } | undefined;

      if (entityRegistryEntry?.device_id === deviceId) {
        deviceEntities.push(entityId);
      }
    });

    if (deviceEntities.length === 0) {
      return html``;
    }

    return html`
      <div class="device-info">
        <div class="device-info-header">Device Entities (${deviceEntities.length}):</div>
        <div class="device-entities">
          ${deviceEntities
            .slice(0, 10)
            .map((entityId) => html` <div class="device-entity">${entityId}</div> `)}
          ${deviceEntities.length > 10
            ? html`<div class="device-entity-more">...and ${deviceEntities.length - 10} more</div>`
            : ''}
        </div>
      </div>
    `;
  }

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

  private _valueChanged(ev: Event): void {
    if (!this._config || !this.hass) {
      return;
    }

    interface ConfigurableElement {
      configKey?: string;
      type?: string;
      value?: string;
      checked?: boolean;
    }

    const target = ev.target as ConfigurableElement;
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

    const newConfig = { ...this._config };
    this.setNestedValue(newConfig, configKey, value);

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

      .device-info {
        margin-top: 16px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 4px;
        border-left: 3px solid var(--success-color, #4caf50);
      }

      .device-info-header {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 8px;
      }

      .device-entities {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .device-entity {
        font-size: 12px;
        font-family: monospace;
        color: var(--secondary-text-color);
        padding: 2px 4px;
        background: var(--card-background-color);
        border-radius: 2px;
      }

      .device-entity-more {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
        margin-top: 4px;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'weatherstation-card-editor': WeatherStationCardEditor;
  }
}
