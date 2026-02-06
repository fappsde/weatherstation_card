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

  // Stable ID for SVG gradient – avoids DOM thrashing on every re-render
  private _gradientId = `sp-${this.metric}-${Math.random().toString(36).substr(2, 6)}`;
  private _hasAnimated = false;

  protected render(): TemplateResult {
    if (this.data.length < 2) {
      return html`<div class="no-data">—</div>`;
    }

    // Use asymmetric padding: 0 left, 0 bottom so graph bleeds to edges;
    // small top padding for the line, right padding so the end-dot isn't clipped
    const padTop = 3;
    const padRight = this.showDot ? SPARKLINE_CONFIG.dotRadius + 2 : 2;
    const padBottom = 0;
    const padLeft = 0;

    const { path, min, max, points } = generateSparklinePath(
      this.data, this.width, this.height,
      { top: padTop, right: padRight, bottom: padBottom, left: padLeft }
    );

    const lastPoint = points[points.length - 1];
    const gradientId = this._gradientId;

    // Only animate on very first render
    const shouldAnimate = this.enableAnimation && !this._hasAnimated;
    if (shouldAnimate) {
      this._hasAnimated = true;
    }

    // Create area path for gradient fill – close to bottom-right then bottom-left
    const areaPath =
      points.length > 0
        ? `${path} L ${points[points.length - 1].x} ${this.height} L ${points[0].x} ${this.height} Z`
        : '';

    return html`
      <div class="sparkline-container">
        <svg
          viewBox="0 0 ${this.width} ${this.height}"
          preserveAspectRatio="none"
          class="sparkline-svg ${shouldAnimate ? 'animate' : ''}"
        >
          <!-- Gradient definition -->
          ${this.showGradient
            ? svg`
                <defs>
                  <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:${this.color};stop-opacity:0.35" />
                    <stop offset="100%" style="stop-color:${this.color};stop-opacity:0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="${areaPath}"
                  fill="url(#${gradientId})"
                  class="area-fill"
                />
              `
            : ''}

          <!-- Main line (vector-effect keeps stroke width constant when SVG stretches) -->
          <path
            d="${path}"
            fill="none"
            stroke="${this.color}"
            stroke-width="${SPARKLINE_CONFIG.strokeWidth}"
            stroke-linecap="round"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
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
        display: block;
        width: 100%;
        height: 100%;
      }

      .sparkline-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        gap: 0;
      }

      .sparkline-svg {
        display: block;
        width: 100%;
        flex: 1;
        min-height: 0;
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
