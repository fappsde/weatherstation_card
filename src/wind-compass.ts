import { html, css, LitElement, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getWindDirection, degreesToRadians } from './utils';

@customElement('wind-compass')
export class WindCompass extends LitElement {
  @property({ type: Number }) windDirection = 0;
  @property({ type: Number }) windSpeed = 0;
  @property({ type: Number }) windDirectionAvg?: number;
  @property({ type: Boolean }) showArrows = true;
  @property({ type: Boolean }) compact = false;

  protected render(): TemplateResult {
    const size = this.compact ? 100 : 150;
    const center = size / 2;
    const radius = size / 2 - 10;

    return html`
      <div class="compass-container">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="compass-svg">
          <!-- Outer circle -->
          <circle cx="${center}" cy="${center}" r="${radius}" class="compass-circle" />

          <!-- Cardinal directions -->
          ${this.renderCardinalMarks(center, radius)}

          <!-- Wind direction arrow (current) -->
          ${this.renderWindArrow(center, radius, this.windDirection, 'current')}

          <!-- Average wind direction arrow (if available) -->
          ${this.showArrows && this.windDirectionAvg !== undefined
            ? this.renderWindArrow(center, radius * 0.85, this.windDirectionAvg, 'average')
            : ''}

          <!-- Center dot -->
          <circle cx="${center}" cy="${center}" r="3" class="center-dot" />
        </svg>

        <div class="compass-info">
          <div class="direction-text">${getWindDirection(this.windDirection)}</div>
          <div class="degrees-text">${Math.round(this.windDirection)}°</div>
        </div>
      </div>
    `;
  }

  private renderCardinalMarks(center: number, radius: number): TemplateResult {
    const directions = ['N', 'E', 'S', 'W'];
    const angles = [0, 90, 180, 270];

    return html`
      ${directions.map((dir, i) => {
        const angle = degreesToRadians(angles[i] - 90);
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);

        return html`
          <text
            x="${x}"
            y="${y}"
            class="cardinal-text"
            dominant-baseline="middle"
            text-anchor="middle"
          >
            ${dir}
          </text>
        `;
      })}
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

    // Arrow head points
    const arrowSize = type === 'current' ? 8 : 6;
    const arrowAngle = degreesToRadians(direction - 90 + 150);
    const arrowAngle2 = degreesToRadians(direction - 90 - 150);

    const arrowX1 = endX + arrowSize * Math.cos(arrowAngle);
    const arrowY1 = endY + arrowSize * Math.sin(arrowAngle);
    const arrowX2 = endX + arrowSize * Math.cos(arrowAngle2);
    const arrowY2 = endY + arrowSize * Math.sin(arrowAngle2);

    return html`
      <g class="wind-arrow ${type}">
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

      .compass-svg {
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }

      .compass-circle {
        fill: var(--card-background-color, white);
        stroke: var(--divider-color, #e0e0e0);
        stroke-width: 2;
      }

      .cardinal-text {
        fill: var(--primary-text-color, #212121);
        font-size: 14px;
        font-weight: 600;
      }

      .wind-arrow.current .arrow-line {
        stroke: var(--primary-color, #03a9f4);
        stroke-width: 3;
        stroke-linecap: round;
      }

      .wind-arrow.current .arrow-head {
        fill: var(--primary-color, #03a9f4);
      }

      .wind-arrow.average .arrow-line {
        stroke: var(--secondary-text-color, #666);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-dasharray: 4, 4;
      }

      .wind-arrow.average .arrow-head {
        fill: var(--secondary-text-color, #666);
      }

      .center-dot {
        fill: var(--primary-text-color, #212121);
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
        color: var(--primary-text-color, #212121);
      }

      .degrees-text {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wind-compass': WindCompass;
  }
}
