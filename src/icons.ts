import { svg, TemplateResult } from 'lit';

/**
 * Minimalistic, futuristic SVG icons for the weather station card.
 * All icons are 24×24 viewBox, thin-stroke (1.5–2), rounded caps,
 * monochrome (currentColor), no fill — clean geometric style.
 */

// ── Helper ──────────────────────────────────────────────────────────────────
const icon = (paths: TemplateResult): TemplateResult => svg`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.8"
       stroke-linecap="round" stroke-linejoin="round"
       style="width:1em;height:1em;vertical-align:-0.125em;">
    ${paths}
  </svg>
`;

// ── Metric Icons ────────────────────────────────────────────────────────────

/** Thermometer – vertical line with bulb */
export const iconTemperature = icon(svg`
  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0Z"/>
  <circle cx="11.5" cy="17.5" r="1.5" fill="currentColor" stroke="none"/>
`);

/** Droplet – single geometric drop */
export const iconHumidity = icon(svg`
  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"/>
`);

/** Gauge – arc with needle */
export const iconPressure = icon(svg`
  <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"/>
  <path d="M12 12l-3.5-3.5"/>
  <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
  <path d="M5.63 16.5h12.74" opacity="0.4"/>
`);

/** Three parallel flow lines – wind */
export const iconWindSpeed = icon(svg`
  <path d="M2 12h13a3 3 0 1 0-3-3"/>
  <path d="M2 6h8a3 3 0 0 1 3 3"/>
  <path d="M2 18h10a3 3 0 1 0-3-3"/>
`);

/** Compass needle – minimal */
export const iconWindDirection = icon(svg`
  <circle cx="12" cy="12" r="9"/>
  <polygon points="12,5 14,13 12,11 10,13" fill="currentColor" stroke="none"/>
  <polygon points="12,19 10,13 12,15 14,13" opacity="0.35" fill="currentColor" stroke="none"/>
`);

/** Turbulent lines – gust */
export const iconWindGust = icon(svg`
  <path d="M2 12h13a3 3 0 1 0-3-3"/>
  <path d="M2 6h8a3 3 0 0 1 3 3"/>
  <path d="M2 18h10a3 3 0 1 0-3-3"/>
  <path d="M17 8l2-2m0 4l2-2" opacity="0.5"/>
`);

/** Angled rain lines */
export const iconRain = icon(svg`
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2 8.535"/>
  <path d="M8 19v1"/>
  <path d="M8 14v1"/>
  <path d="M16 19v1"/>
  <path d="M16 14v1"/>
  <path d="M12 21v1"/>
  <path d="M12 16v1"/>
`);

/** Rain + intensity dots */
export const iconRainRate = icon(svg`
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2 8.535"/>
  <path d="M9.2 22l3-7"/>
  <path d="M12.8 22l3-7"/>
`);

/** Circle with short rays – sun / UV */
export const iconUV = icon(svg`
  <circle cx="12" cy="12" r="4"/>
  <path d="M12 2v2"/>
  <path d="M12 20v2"/>
  <path d="M4.93 4.93l1.41 1.41"/>
  <path d="M17.66 17.66l1.41 1.41"/>
  <path d="M2 12h2"/>
  <path d="M20 12h2"/>
  <path d="M4.93 19.07l1.41-1.41"/>
  <path d="M17.66 6.34l1.41-1.41"/>
`);

/** Radiating arcs – solar */
export const iconSolar = icon(svg`
  <circle cx="12" cy="12" r="4"/>
  <path d="M12 3v1"/>
  <path d="M12 20v1"/>
  <path d="M3 12h1"/>
  <path d="M20 12h1"/>
  <path d="M5.6 5.6l.7.7"/>
  <path d="M17.7 17.7l.7.7"/>
  <path d="M5.6 18.4l.7-.7"/>
  <path d="M17.7 6.3l.7-.7"/>
  <path d="M15 9l2-2" opacity="0.4"/>
  <path d="M16 12h3" opacity="0.4"/>
`);

/** Person silhouette – feels like */
export const iconFeelsLike = icon(svg`
  <circle cx="12" cy="5" r="2.5"/>
  <path d="M12 7.5v5"/>
  <path d="M8 20l4-7.5 4 7.5"/>
  <path d="M14 14.76V3.5" opacity="0" />
`);

/** Two small drops – dew point */
export const iconDewPoint = icon(svg`
  <path d="M9.5 5l3.18 3.18a4.5 4.5 0 1 1-6.36 0L9.5 5Z"/>
  <path d="M16 12l1.77 1.77a2.5 2.5 0 1 1-3.54 0L16 12Z"/>
`);

/** Moisture / wetness sensor */
export const iconMoisture = icon(svg`
  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"/>
  <path d="M8 14h8" opacity="0.4"/>
  <path d="M9 17h6" opacity="0.4"/>
`);

// ── UI / Editor Icons ───────────────────────────────────────────────────────

/** Bar chart – data / history */
export const iconChart = icon(svg`
  <path d="M3 3v18h18"/>
  <path d="M7 16l4-6 4 4 5-8"/>
`);

/** Sliders – appearance */
export const iconAppearance = icon(svg`
  <circle cx="15.5" cy="6" r="2"/>
  <path d="M3 6h10.5M17.5 6H21"/>
  <circle cx="8.5" cy="12" r="2"/>
  <path d="M3 12h3.5M10.5 12H21"/>
  <circle cx="15.5" cy="18" r="2"/>
  <path d="M3 18h10.5M17.5 18H21"/>
`);

/** Bolt – features */
export const iconBolt = icon(svg`
  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
`);

/** Triangle alert – warnings */
export const iconAlert = icon(svg`
  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/>
  <line x1="12" y1="9" x2="12" y2="13"/>
  <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none"/>
`);

/** Plug – data source */
export const iconPlug = icon(svg`
  <path d="M12 22v-5"/>
  <path d="M9 7V2"/>
  <path d="M15 7V2"/>
  <path d="M6 13V8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4Z"/>
`);

/** Pencil – edit / general */
export const iconEdit = icon(svg`
  <path d="M12 20h9"/>
  <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838.838-2.872a2 2 0 0 1 .506-.855Z"/>
`);

/** Eye – visibility */
export const iconEye = icon(svg`
  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
  <circle cx="12" cy="12" r="3"/>
`);

/** Frame – display mode */
export const iconFrame = icon(svg`
  <rect x="3" y="3" width="18" height="18" rx="2"/>
  <path d="M3 9h18"/>
  <path d="M9 21V9"/>
`);

/** Lightbulb – tip / info */
export const iconLightbulb = icon(svg`
  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
  <path d="M9 18h6"/>
  <path d="M10 22h4"/>
`);

/** Gear – settings */
export const iconGear = icon(svg`
  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
  <circle cx="12" cy="12" r="3"/>
`);

/** Bell – notification */
export const iconBell = icon(svg`
  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
`);

/** Sparkle – animations */
export const iconSparkle = icon(svg`
  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
  <path d="M20 3v4"/>
  <path d="M22 5h-4"/>
`);

/** Trend line – chart / history */
export const iconTrend = icon(svg`
  <path d="M3 3v18h18"/>
  <path d="m19 9-5 5-4-4-3 3"/>
`);

/** Calendar – date / schedule */
export const iconCalendar = icon(svg`
  <rect x="3" y="4" width="18" height="18" rx="2"/>
  <path d="M16 2v4"/>
  <path d="M8 2v4"/>
  <path d="M3 10h18"/>
`);

/** Snowflake – cold */
export const iconSnowflake = icon(svg`
  <path d="M2 12h20"/>
  <path d="M12 2v20"/>
  <path d="m4.93 4.93 14.14 14.14"/>
  <path d="m19.07 4.93-14.14 14.14"/>
  <path d="m7 3.5 5 5"/>
  <path d="m12 8.5 5-5"/>
  <path d="m7 20.5 5-5"/>
  <path d="m12 15.5 5 5"/>
`);

// ── Icon Maps ───────────────────────────────────────────────────────────────

/** Metric key → SVG TemplateResult  (replaces old emoji METRIC_ICONS) */
export const METRIC_ICONS_SVG: Record<string, TemplateResult> = {
  temperature: iconTemperature,
  humidity: iconHumidity,
  pressure: iconPressure,
  wind_speed: iconWindSpeed,
  wind_direction: iconWindDirection,
  wind_gust: iconWindGust,
  rain: iconRain,
  rain_rate: iconRainRate,
  uv_index: iconUV,
  solar_radiation: iconSolar,
  feels_like: iconFeelsLike,
  dew_point: iconDewPoint,
  moisture: iconMoisture,
};

/** Warning type → SVG TemplateResult */
export const WARNING_ICONS_SVG: Record<string, TemplateResult> = {
  wind: iconWindSpeed,
  temperature_high: iconTemperature,
  temperature_low: iconSnowflake,
  uv: iconUV,
  rain: iconRain,
};

/** Fallback icon for unknown metrics */
export const iconDefault = iconChart;
