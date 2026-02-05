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

    return html`
      <div class="card-config">
        <h3>General Settings</h3>

        ${this.renderInput('Entity', 'entity', 'text', true)}
        ${this.renderInput('Name', 'name', 'text', false)}

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
              ${this.renderInput(
                'Message',
                'warnings.wind_speed.message',
                'text',
                false
              )}
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
              ${this.renderInput(
                'Low Message',
                'warnings.temperature.message_low',
                'text',
                false
              )}
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

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  private setNestedValue(obj: any, path: string, value: any): any {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => {
      if (!current[key]) {
        current[key] = {};
      }
      return current[key];
    }, obj);
    target[lastKey] = value;
    return obj;
  }

  private _valueChanged(ev: Event): void {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target as any;
    const configKey = target.configKey;

    if (!configKey) {
      return;
    }

    let value: any;
    if (target.type === 'checkbox') {
      value = target.checked;
    } else if (target.type === 'number') {
      value = parseFloat(target.value);
    } else {
      value = target.value;
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
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'weatherstation-card-editor': WeatherStationCardEditor;
  }
}
