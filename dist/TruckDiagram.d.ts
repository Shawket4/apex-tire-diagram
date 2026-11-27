/**
 * The 3D tire diagram, driven ENTIRELY by chassis rows + live assignments —
 * nothing about the truck is hand-placed (see dims.ts for the geometry datum
 * and the vertical stack-up).
 *
 * Interaction model (settled in the truck-preview spike):
 *   - click a wheel of a dual pair → camera lifts overhead of THAT PAIR, the
 *     rest of the truck disappears, both tires get code chips. Inner duals are
 *     physically occluded from every side angle; overhead-with-body-hidden is
 *     the only view where both have equal, stable click targets.
 *   - singles/spares just select (nothing occludes them).
 *   - clicking empty space, or Esc, steps back out to the whole truck
 *     (pairView.ts). It does NOT deselect — that used to throw away a
 *     half-filled form — the wheel stays chosen; choosing a wheel goes back in.
 *     Closing the inspector (deselecting) also returns to the full-truck fit.
 *   - camera glides on WALL-CLOCK time (rAF-starved webviews stall per-frame
 *     damping mid-glide).
 *
 * This is the OPTIONAL view: the 2D WheelMap is the default and does every
 * job. So the scene is kept cheap — it draws a frame only when something
 * changed (`frameloop="demand"`), has no post-processing, bakes its contact
 * shadow once, and caps the pixel ratio. WheelDiagram loads it lazily; it is
 * also importable on its own from "apex-tire-diagram/3d".
 *
 * Status encoding (in-app, real data): occupied = emerald, occupied spare
 * slot = sky, EMPTY position = hollow slate ring — an empty position is a
 * real state a storeman acts on, not an error.
 */
import type { DiagramAxle as ChassisAxle, DiagramPosition as ChassisPosition } from "./types.js";
export interface TruckDiagramProps<P extends ChassisPosition = ChassisPosition> {
    axles: ChassisAxle[];
    positions: P[];
    selectedId: string | null;
    onSelect: (p: P) => void;
    /** The graphics context died (driver reset, remote desktop…): the caller
     * falls back to the 2D map. */
    onContextLost?: () => void;
}
export declare function TruckDiagram<P extends ChassisPosition>({ axles, positions, selectedId, onSelect, onContextLost, }: TruckDiagramProps<P>): import("react").JSX.Element;
