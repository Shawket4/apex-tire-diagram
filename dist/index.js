/**
 * apex-tire-diagram — the truck wheel diagram shared by the garage desktop app
 * (apex-maintenance-tauri) and the office dashboard (apex-react).
 *
 * Pure presentation: rows and callbacks come in as props, nothing is fetched.
 * This entry never imports three.js; the 3D scene is a lazy chunk of
 * WheelDiagram, or `apex-tire-diagram/3d` for direct use.
 */
export { WheelDiagram } from "./WheelDiagram.js";
export { WheelLegend, WheelMap } from "./WheelMap.js";
export { buildMapLayout, positionLabel, positionParts, syntheticChassis, tireName, wheelCount, wheelShortLabel, wheelState, } from "./layout.js";
export { formatNumber, messages, textDir, translator } from "./i18n.js";
