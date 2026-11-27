import type { DiagramAxle, DiagramLang, DiagramPosition } from "./types.js";
/** What the colours and marks mean. Shown with both the 2D map and the 3D view. */
export declare function WheelLegend({ lang, className }: {
    lang: DiagramLang;
    className?: string;
}): import("react").JSX.Element;
export interface WheelMapProps<P extends DiagramPosition = DiagramPosition> {
    axles: DiagramAxle[];
    positions: P[];
    /** Language of the words ("ar" | "en"). */
    lang: DiagramLang;
    selectedId?: string | null;
    /** Omit for a picture only (the layout preview): wheels are then not buttons. */
    onSelect?: (p: P) => void;
    /** Smaller wheels with the code only — for the layout preview. */
    compact?: boolean;
}
/**
 * The truck from above, cab at the top, drawn with plain HTML: no WebGL, so
 * it works on any machine. Every wheel is a real button — reachable with the
 * keyboard and a screen reader, and big enough for a thumb.
 *
 * The drawing is laid out left-to-right in both languages (the truck's left
 * side is on the left of the screen); only the words follow the language.
 */
export declare function WheelMap<P extends DiagramPosition>({ axles, positions, lang, selectedId, onSelect, compact, }: WheelMapProps<P>): import("react").JSX.Element;
