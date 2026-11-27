/**
 * The data the diagram draws. These are the shapes of the garage's chassis
 * rows (maint-rust `chassis_axles` / `chassis_positions` + the live tire on
 * each position), cut down to what the drawing reads. An app passes its own
 * rows — extra fields are fine, and `onSelect` hands back the app's own row.
 */
export interface DiagramAxle {
    id: string;
    /** "tractor" | "trailer". */
    section: string;
    /** 1-based inside its section (H1 is the steering axle, H2… drive, TR1… trailer). */
    section_index: number;
    /** "single" | "dual". */
    axle_type: string;
    is_steering: boolean;
    /** A lifted axle is drawn with its wheels off the road. */
    is_lifted: boolean;
}
export interface DiagramPosition {
    id: string;
    /** null for a spare (and for a position whose axle row is gone). */
    axle_id: string | null;
    /** "left" | "right". */
    side: string | null;
    /** "single" | "outer" | "inner". */
    depth: string | null;
    is_spare: boolean;
    spare_index: number | null;
    /** The garage's painted code: H1L, H2LO, TR1RI, SP1… */
    position_code: string;
    /** null: nothing is fitted here. */
    tire_id: string | null;
    brand: string | null;
    model: string | null;
    size: string | null;
    /** The mount/dismount for this position has not reached the office yet. */
    pending: boolean;
}
/** A layout choice in the chassis wizard (same fields as the garage's ChassisConfig). */
export interface ChassisConfig {
    /** Tractor axles behind the steering axle (dual wheels each). */
    drive_axles: number;
    trailer_axles: number;
    spares: number;
    /** Trailer axles with one wheel per side instead of a dual pair. */
    single_trailer_axles?: boolean | null;
}
/** "ar" or "en". Anything starting with "ar" is Arabic; everything else is English. */
export type DiagramLang = string;
