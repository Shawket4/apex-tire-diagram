import * as THREE from "three";
/**
 * Single source of truth for the rig's dimensions, in metres, matched to the
 * Apex reference photos. Everything in Truck.tsx derives from these — parts
 * connect by construction rather than by hand-placed numbers that drift.
 *
 * Vertical stack-up (ground = 0):
 *   0.00  ground
 *   0.55  wheel centre        (= TIRE_R)
 *   0.84  chassis rail bottom
 *   1.12  chassis rail top    ─┬─ cab sits on the rails
 *   1.15  cab floor           ─┘
 *   1.13  subframe bottom
 *   1.37  subframe top        ─┬─ tank sits on the subframe
 *   1.37  tank bottom         ─┘
 *   3.47  tank top
 *   3.45  cab top
 *   3.86  roof cap top
 */
export declare const TIRE_R = 0.55;
export declare const TIRE_HW = 0.152;
/**
 * Dual spacing is DELIBERATELY exaggerated. A real dual pair sits ~0.32 m
 * centre-to-centre, leaving a ~0.05 m gap — at which point, from any outboard
 * view, the two tires merge into one dark mass and the inner is simply hidden
 * behind the outer. No amount of shading fixes that; it's geometry.
 *
 * At 0.48 m centres the gap is ~0.18 m, so each tire reads as its own object
 * and the inner shows a clear crescent past the outer. Outer edge lands at
 * 1.252 m → 2.50 m overall, still inside the legal track. Exaggerating a
 * separation for legibility is what a technical illustration is FOR.
 *
 * Everything inboard is measured off DUAL_INNER: the inner tire spans
 * 0.468…0.772, so rails and air bags must clear 0.468.
 */
export declare const TRACK_SINGLE = 1.02;
export declare const DUAL_OUTER = 1.1;
export declare const DUAL_INNER = 0.62;
export declare const DUAL_GAP: number;
export declare const NOSE_Z = -4.95;
export declare const CAB_REAR_Z = -2.35;
export declare const CAB_W = 2.44;
export declare const CAB_FLOOR = 1.15;
export declare const CAB_TOP = 3.7;
export declare const ROOF_TOP = 3.82;
export declare const RAIL_X = 0.38;
export declare const RAIL_Y = 0.98;
export declare const RAIL_H = 0.28;
export declare const RAIL_TOP: number;
export declare const RAIL_FRONT = -4.82;
export declare const FIFTH_TOP: number;
export declare const LIFT_RISE = 0.26;
/**
 * The fifth wheel rides just ahead of the drive group's centre so the kingpin
 * load lands ON the driven axles. It CANNOT be a constant: with one drive axle
 * a fixed z=0.55 put the kingpin 1.1 m behind the only axle carrying it.
 */
export declare function fifthWheelZ(driveZs: number[]): number;
/** Rails must reach past the last drive axle and the fifth wheel, no further. */
export declare function railBack(driveZs: number[]): number;
export declare const TANK_W = 2.44;
export declare const TANK_H = 2.1;
export declare const TANK_RAD = 0.72;
export declare const TANK_Y = 2.42;
export declare const TANK_Z = 5.9;
export declare const TANK_BODY_LEN = 9.4;
export declare const TANK_CAP = 0.34;
export declare const TANK_BEVEL = 0.26;
export declare const TANK_LEN: number;
export declare const TANK_FRONT: number;
export declare const TANK_REAR: number;
export declare const TANK_BOTTOM: number;
export declare const TANK_TOP: number;
export declare const TANK_HW: number;
/** The side is genuinely flat between the corner radii — where stripes live. */
export declare const TANK_FLAT_LO: number;
export declare const TANK_FLAT_HI: number;
export declare const SUB_X = 0.38;
export declare const SUB_Y = 1.25;
export declare const SUB_H = 0.24;
export declare const SUB_TOP: number;
export declare const NECK_FRONT = 0.05;
export declare const NECK_BACK = 2.5;
export declare const REAR_FRAME_Z: number;
export declare const STEER_Z = -3.6;
export declare const DRIVE_Z0 = -0.55;
export declare const DRIVE_SPACING = 1.35;
export declare const TRAILER_LAST_Z = 10.45;
export declare const TRAILER_SPACING = 1.31;
export declare const APEX_BLUE = "#1f5cb4";
export declare const APEX_ORANGE = "#ef7220";
export declare const TANK_WHITE = "#f2f4f7";
export declare const cabGeo: THREE.ExtrudeGeometry;
/** Rounded-rectangle profile, centred on the origin in XY. */
export declare function roundedRect(w: number, h: number, r: number): THREE.Shape;
/**
 * The barrel: rounded-rect section extruded along Z, bevelled into domed ends.
 *
 * CAREFUL: three's `bevelSize` grows the section OUTWARD from the profile you
 * pass — the profile is what you get at the very ENDS, and the midsection ends
 * up bevelSize larger on every side. Passing the finished dimensions therefore
 * yields a barrel 2*bevelSize too wide and too tall (measured: 2.96 × 2.62
 * instead of 2.44 × 2.10). Shrink the profile by the bevel so the midsection
 * lands on the real TANK_W × TANK_H that everything else is measured against.
 */
export declare const tankGeo: THREE.ExtrudeGeometry;
