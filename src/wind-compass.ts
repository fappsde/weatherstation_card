import { html, css, LitElement, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getWindDirection, degreesToRadians } from './utils';

/**
 * Modern wind compass component with smooth animations
 * Shows current wind direction with optional average direction overlay
 */
@customElement('wind-compass')
export class WindCompass extends LitElement {
  @property({ type: Number }) windDirection = 0;
  @property({ type: Number }) windSpeed = 0;
  @property({ type: Number }) windDirectionAvg?: number;
  @property({ type: Boolean }) showArrows = true;
  @property({ type: Boolean }) compact = false;
  @property({ type: Boolean }) animate = true;

  protected render(): TemplateResult {
    const size = this.compact ? 80 : 120;
    const center = size / 2;
    const radius = size / 2 - 8;

    return html`
      <div class="compass-container ${this.compact ? 'compact' : ''}">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="compass-svg">
          <!-- Background glow -->
          <defs>
            <radialGradient id="compass-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="rgba(255,255,255,0.1)" />
              <stop offset="100%" stop-color="rgba(255,255,255,0)" />
            </radialGradient>
            <!-- arrow-glow filter removed for performance -->
          </defs>

          <!-- Outer circle with gradient -->
          <circle
            cx="${center}"
            cy="${center}"
            r="${radius}"
            fill="url(#compass-glow)"
            class="compass-bg"
          />

          <!-- Outer ring -->
          <circle cx="${center}" cy="${center}" r="${radius}" class="compass-ring" />

          <!-- Tick marks -->
          ${this.renderTickMarks(center, radius)}

          <!-- Cardinal directions -->
          ${this.renderCardinalMarks(center, radius)}

          <!-- Average wind direction arrow (if available) -->
          ${this.showArrows && this.windDirectionAvg !== undefined
            ? this.renderWindArrow(center, radius * 0.7, this.windDirectionAvg, 'average')
            : ''}

          <!-- Current wind direction arrow -->
          ${this.renderWindArrow(center, radius * 0.85, this.windDirection, 'current')}

          <!-- Center circle -->
          <circle cx="${center}" cy="${center}" r="6" class="center-circle" />
          <circle cx="${center}" cy="${center}" r="3" class="center-dot" />
        </svg>

        <div class="compass-info">
          <div class="direction-text">${getWindDirection(this.windDirection)}</div>
          <div class="degrees-text">${Math.round(this.windDirection)}°</div>
        </div>
      </div>
    `;
  }

  private renderTickMarks(center: number, radius: number): TemplateResult {
    const ticks = [];
    for (let i = 0; i < 16; i++) {
      const angle = degreesToRadians(i * 22.5 - 90);
      const isCardinal = i % 4 === 0;
      const tickLength = isCardinal ? 8 : 4;
      const outerR = radius - 2;
      const innerR = outerR - tickLength;

      const x1 = center + outerR * Math.cos(angle);
      const y1 = center + outerR * Math.sin(angle);
      const x2 = center + innerR * Math.cos(angle);
      const y2 = center + innerR * Math.sin(angle);

      ticks.push({ x1, y1, x2, y2, isCardinal });
    }

    return html`
      <g class="tick-marks">
        ${ticks.map(
          (tick) => html`
            <line
              x1="${tick.x1}"
              y1="${tick.y1}"
              x2="${tick.x2}"
              y2="${tick.y2}"
              class="tick ${tick.isCardinal ? 'cardinal' : ''}"
            />
          `
        )}
      </g>
    `;
  }

  private renderCardinalMarks(center: number, radius: number): TemplateResult {
    const directions = ['N', 'E', 'S', 'W'];
    const angles = [0, 90, 180, 270];
    const labelRadius = radius - 18;

    return html`
      <g class="cardinal-labels">
        ${directions.map((dir, i) => {
          const angle = degreesToRadians(angles[i] - 90);
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);

          return html`
            <text
              x="${x}"
              y="${y}"
              class="cardinal-text ${dir === 'N' ? 'north' : ''}"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              ${dir}
            </text>
          `;
        })}
      </g>
    `;
  }

  private renderWindArrow(
    center: number,
    length: number,
    direction: number,
    type: 'current' | 'average'
  ): TemplateResult {
    const angle = degreesToRadians(direction - 90);
    const endX = center + length * Math.cos(angle);
    const endY = center + length * Math.sin(angle);

    const arrowSize = type === 'current' ? 10 : 7;
    const arrowAngle1 = degreesToRadians(direction - 90 + 145);
    const arrowAngle2 = degreesToRadians(direction - 90 - 145);

    const arrowX1 = endX + arrowSize * Math.cos(arrowAngle1);
    const arrowY1 = endY + arrowSize * Math.sin(arrowAngle1);
    const arrowX2 = endX + arrowSize * Math.cos(arrowAngle2);
    const arrowY2 = endY + arrowSize * Math.sin(arrowAngle2);

    if (type === 'current') {
      return html`
        <g class="wind-arrow current" filter="url(#arrow-glow)">
          <line x1="${center}" y1="${center}" x2="${endX}" y2="${endY}" class="arrow-line" />
          <polygon
            points="${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}"
            class="arrow-head"
          />
        </g>
      `;
    }

    return html`
      <g class="wind-arrow average">
        <line x1="${center}" y1="${center}" x2="${endX}" y2="${endY}" class="arrow-line" />
        <polygon
          points="${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}"
          class="arrow-head"
        />
      </g>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      .compass-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .compass-container.compact {
        gap: 4px;
      }

      .compass-svg {
        /* Removed drop-shadow filter to reduce GPU composition cost */
      }

      .compass-bg {
        transition: fill 0.3s;
      }

      .compass-ring {
        fill: none;
        stroke: rgba(255, 255, 255, 0.3);
        stroke-width: 2;
      }

      .tick {
        stroke: rgba(255, 255, 255, 0.4);
        stroke-width: 1;
        stroke-linecap: round;
      }

      .tick.cardinal {
        stroke: rgba(255, 255, 255, 0.6);
        stroke-width: 2;
      }

      .cardinal-text {
        fill: rgba(255, 255, 255, 0.8);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      .cardinal-text.north {
        fill: #ff6b6b;
        font-weight: 700;
      }

      .wind-arrow.current .arrow-line {
        stroke: #fff;
        stroke-width: 3;
        stroke-linecap: round;
        transition: all 0.5s ease-out;
      }

      .wind-arrow.current .arrow-head {
        fill: #fff;
        transition: all 0.5s ease-out;
      }

      .wind-arrow.average .arrow-line {
        stroke: rgba(255, 255, 255, 0.4);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-dasharray: 4, 3;
      }

      .wind-arrow.average .arrow-head {
        fill: rgba(255, 255, 255, 0.4);
      }

      .center-circle {
        fill: rgba(0, 0, 0, 0.2);
      }

      .center-dot {
        fill: #fff;
      }

      .compass-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
      }

      .direction-text {
        font-size: 18px;
        font-weight: 700;
        color: inherit;
        letter-spacing: 1px;
      }

      .compact .direction-text {
        font-size: 14px;
      }

      .degrees-text {
        font-size: 12px;
        opacity: 0.7;
      }

      .compact .degrees-text {
        font-size: 10px;
      }

      .wind-arrow.current {
        /* Static glow instead of costly infinite animation */
        filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wind-compass': WindCompass;
  }
}
