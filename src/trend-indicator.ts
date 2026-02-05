import { html, css, LitElement, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TrendData } from './types';
import { formatTrendChange, getTrendColor } from './utils';

/**
 * Trend indicator component showing direction and magnitude of change
 * Displays an arrow, optional value change, and can pulse for significant changes
 */
@customElement('trend-indicator')
export class TrendIndicator extends LitElement {
  @property({ type: Object }) trend?: TrendData;
  @property({ type: String }) metric = 'temperature';
  @property({ type: Boolean }) showValue = true;
  @property({ type: Boolean }) compact = false;
  @property({ type: Boolean }) pulse = false;

  protected render(): TemplateResult {
    if (!this.trend || this.trend.direction === 'stable') {
      return html`
        <div class="trend stable ${this.compact ? 'compact' : ''}">
          <span class="arrow">→</span>
          ${this.showValue && !this.compact ? html`<span class="value">stable</span>` : ''}
        </div>
      `;
    }

    const color = getTrendColor(this.trend.direction, this.metric);
    const changeText = formatTrendChange(this.trend, this.metric);
    const isUp = this.trend.direction === 'up';

    return html`
      <div 
        class="trend ${this.trend.direction} ${this.compact ? 'compact' : ''} ${this.pulse ? 'pulse' : ''}"
        style="--trend-color: ${color}"
      >
        <span class="arrow">${isUp ? '↑' : '↓'}</span>
        ${this.showValue
          ? html`
              <span class="value">${changeText}</span>
              ${!this.compact && this.trend.timeframe
                ? html`<span class="timeframe">/ ${this.trend.timeframe}</span>`
                : ''}
            `
          : ''}
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: inline-flex;
      }

      .trend {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        font-weight: 500;
        color: var(--trend-color, var(--secondary-text-color));
        padding: 2px 8px;
        border-radius: 12px;
        background: color-mix(in srgb, var(--trend-color) 15%, transparent);
        transition: all 0.3s ease;
      }

      .trend.compact {
        padding: 2px 4px;
        font-size: 11px;
        gap: 2px;
      }

      .trend.stable {
        --trend-color: var(--secondary-text-color, #999);
        opacity: 0.7;
      }

      .arrow {
        font-weight: 700;
        font-size: 1.1em;
      }

      .trend.up .arrow {
        animation: bounceUp 0.5s ease-in-out;
      }

      .trend.down .arrow {
        animation: bounceDown 0.5s ease-in-out;
      }

      .trend.pulse {
        animation: pulse 2s infinite;
      }

      .value {
        font-variant-numeric: tabular-nums;
      }

      .timeframe {
        font-size: 0.85em;
        opacity: 0.7;
        font-weight: 400;
      }

      @keyframes bounceUp {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-3px);
        }
      }

      @keyframes bounceDown {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(3px);
        }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.02);
        }
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'trend-indicator': TrendIndicator;
  }
}
