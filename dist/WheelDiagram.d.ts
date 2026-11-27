import type { DiagramAxle, DiagramLang, DiagramPosition } from "./types.js";
export interface WheelDiagramProps<P extends DiagramPosition = DiagramPosition> {
    axles: DiagramAxle[];
    positions: P[];
    /** Language of the words ("ar" | "en"). */
    lang: DiagramLang;
    selectedId: string | null;
    onSelect: (p: P) => void;
}
/**
 * The wheel picker. The plain 2D map is the default
 * and does everything; the 3D scene is an optional view behind a toggle
 * (remembered on this device) and falls back to the map, with a short
 * notice, when it cannot run.
 */
export declare function WheelDiagram<P extends DiagramPosition>({ axles, positions, lang, selectedId, onSelect, }: WheelDiagramProps<P>): import("react").JSX.Element;
