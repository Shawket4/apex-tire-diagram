import type { ChassisConfig, DiagramAxle, DiagramLang, DiagramPosition } from "./types.js";
export type MapAxle = Pick<DiagramAxle, "id" | "section" | "section_index" | "axle_type" | "is_steering" | "is_lifted">;
export type MapPosition = Pick<DiagramPosition, "id" | "axle_id" | "side" | "depth" | "is_spare" | "spare_index" | "position_code" | "tire_id" | "pending">;
export type Side = "left" | "right";
export type Depth = "single" | "outer" | "inner";
/** What a position IS, in terms a person uses (not its code). */
export type PositionParts = {
    kind: "spare";
    index: number;
} | {
    kind: "steer";
    side: Side;
} | {
    kind: "axle";
    section: "tractor" | "trailer";
    /** The axle's number inside its section, as painted in the code (H2 → 2, TR1 → 1). */
    axle: number;
    side: Side;
    depth: Depth;
    /** False for a tractor with no trailer: "tractor" then adds nothing. */
    hasTrailer: boolean;
} | {
    kind: "unknown";
};
export declare function positionParts(p: MapPosition, axles: MapAxle[]): PositionParts;
/** "محور ٢ شمال برّه" / "Axle 2, left outer". The code (H2LO) stays a
 * secondary detail for whoever knows it; this is what the screen says. */
export declare function positionLabel(p: MapPosition, axles: MapAxle[], lang: DiagramLang): string;
/** The one or two words printed ON a wheel: the row and column headings
 * already say which axle and which side. */
export declare function wheelShortLabel(p: MapPosition, axles: MapAxle[], lang: DiagramLang): string;
export declare function tireName(p: {
    brand: string | null;
    model: string | null;
    size: string | null;
}): string;
export type WheelState = "empty" | "mounted" | "spare" | "pending";
/** Empty → nothing on the wheel. A tire whose mount has not reached the
 * office yet is "pending"; a tire in a spare slot is "spare". */
export declare function wheelState(p: Pick<MapPosition, "tire_id" | "pending" | "is_spare">): WheelState;
export interface MapAxleRow<P> {
    axle: MapAxle;
    /** Screen order, left to right: outer → inner. */
    left: P[];
    /** Screen order, left to right: inner → outer. */
    right: P[];
}
export interface MapLayout<P> {
    tractor: MapAxleRow<P>[];
    trailer: MapAxleRow<P>[];
    /** Spares, then any position whose axle row is missing (never hidden). */
    spares: P[];
    /** Most wheels on one side of any axle (1 = all single, 2 = some dual). */
    maxPerSide: number;
}
/** Axles front to back (tractor, then trailer), each with its wheels in the
 * order they sit across the truck seen from above with the cab at the top. */
export declare function buildMapLayout<P extends MapPosition>(axles: MapAxle[], positions: P[]): MapLayout<P>;
/** How many wheels a layout choice makes. Mirrors the Rust planner
 * (apex-maintenance-tauri src-tauri services/chassis_plan.rs): steering axle 2, each drive axle 4,
 * each trailer axle 4 (dual) or 2 (single). */
export declare function wheelCount(cfg: ChassisConfig): {
    road: number;
    spares: number;
};
/** The layout a choice WOULD create, for the live preview — same axles and
 * codes as the Rust planner, with every wheel empty. Ids are made up. */
export declare function syntheticChassis(cfg: ChassisConfig): {
    axles: DiagramAxle[];
    positions: DiagramPosition[];
};
