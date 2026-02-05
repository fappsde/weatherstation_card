import { html, css, LitElement, TemplateResult, CSSResultGroup, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SparklinePoint } from './types';
import { generateSparklinePath, formatMetricValue } from './utils';
import { SPARKLINE_CONFIG } from './const';

/**
 * Sparkline component for displaying mini trend charts
 * Shows a smooth line chart with optional gradient fill and end dot
 */
@customElement('weather-sparkline')
export class WeatherSparkline extends LitElement {
  @property({ type: Array }) data: SparklinePoint[] = [];
  @property({ type: String }) metric = 'temperature';
  @property({ type: Number }) width = 80;
  @property({ type: Number }) height = SPARKLINE_CONFIG.height;
  @property({ type: String }) color = 'var(--primary-color, #03a9f4)';
  @property({ type: Boolean }) showGradient = true;
  @property({ type: Boolean }) showDot = true;
  @property({ type: Boolean }) showMinMax = false;
  @property({ type: Boolean }) enableAnimation = true;

  protected render(): TemplateResult {
    if (this.data.length < 2) {
      return html`<div class="no-data">—</div>`;
    }

    const { path, min, max, points } = generateSparklinePath(this.data, this.width, this.height, 4);

    const lastPoint = points[points.length - 1];
    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

    // Create area path for gradient fill
    const areaPath =
      points.length > 0
        ? `${path} L ${points[points.length - 1].x} ${this.height} L ${points[0].x} ${this.height} Z`
        : '';

    return html`
      <div class="sparkline-container">
        <svg
          width="${this.width}"
          height="${this.height}"
          viewBox="0 0 ${this.width} ${this.height}"
          class="sparkline-svg ${this.enableAnimation ? 'animate' : ''}"
        >
          <!-- Gradient definition -->
          ${this.showGradient
            ? svg`
                <defs>
                  <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:${this.color};stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:${this.color};stop-opacity:0.05" />
                  </linearGradient>
                </defs>
                <path
                  d="${areaPath}"
                  fill="url(#${gradientId})"
                  class="area-fill"
                />
              `
            : ''}

          <!-- Main line -->
          <path
            d="${path}"
            fill="none"
            stroke="${this.color}"
            stroke-width="${SPARKLINE_CONFIG.strokeWidth}"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="sparkline-path"
          />

          <!-- End dot -->
          ${this.showDot && lastPoint
            ? svg`
                <circle
                  cx="${lastPoint.x}"
                  cy="${lastPoint.y}"
                  r="${SPARKLINE_CONFIG.dotRadius}"
                  fill="${this.color}"
                  class="end-dot"
                />
              `
            : ''}
        </svg>

        ${this.showMinMax
          ? html`
              <div class="min-max">
                <span class="min">${formatMetricValue(min, this.metric)}</span>
                <span class="max">${formatMetricValue(max, this.metric)}</span>
              </div>
            `
          : ''}
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: inline-flex;
        align-items: center;
      }

      .sparkline-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
      }

      .sparkline-svg {
        display: block;
      }

      .sparkline-svg.animate .sparkline-path {
        stroke-dasharray: 200;
        stroke-dashoffset: 200;
        animation: drawLine 1s ease-out forwards;
      }

      .sparkline-svg.animate .area-fill {
        opacity: 0;
        animation: fadeIn 0.5s ease-out 0.5s forwards;
      }

      .sparkline-svg.animate .end-dot {
        opacity: 0;
        animation: fadeIn 0.3s ease-out 0.8s forwards;
      }

      @keyframes drawLine {
        to {
          stroke-dashoffset: 0;
        }
      }

      @keyframes fadeIn {
        to {
          opacity: 1;
        }
      }

      .end-dot {
        filter: drop-shadow(0 0 3px currentColor);
      }

      .min-max {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 9px;
        color: var(--secondary-text-color, #999);
        padding: 0 2px;
      }

      .no-data {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--secondary-text-color, #999);
        font-size: 12px;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'weather-sparkline': WeatherSparkline;
  }
}
