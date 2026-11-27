/**
 * apex-tire-diagram — the truck wheel diagram shared by the garage desktop app
 * (apex-maintenance-tauri) and the office dashboard (apex-react).
 *
 * Pure presentation: rows and callbacks come in as props, nothing is fetched.
 * This entry never imports three.js; the 3D scene is a lazy chunk of
 * WheelDiagram, or `apex-tire-diagram/3d` for direct use.
 */
export { WheelDiagram, type WheelDiagramProps } from "./WheelDiagram.js";
export { WheelLegend, WheelMap, type WheelMapProps } from "./WheelMap.js";
export {
  buildMapLayout,
  positionLabel,
  positionParts,
  syntheticChassis,
  tireName,
  wheelCount,
  wheelShortLabel,
  wheelState,
  type Depth,
  type MapAxle,
  type MapAxleRow,
  type MapLayout,
  type MapPosition,
  type PositionParts,
  type Side,
  type WheelState,
} from "./layout.js";
export { formatNumber, messages, textDir, translator, type Translate } from "./i18n.js";
export type { ChassisConfig, DiagramAxle, DiagramLang, DiagramPosition } from "./types.js";
