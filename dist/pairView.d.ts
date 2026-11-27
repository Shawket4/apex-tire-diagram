/**
 * The 3D pair view: choosing a wheel of a dual pair lifts the camera over
 * that pair and hides the rest of the truck. Clicking empty space, or Esc,
 * steps back out to the whole truck.
 *
 * Stepping out does NOT deselect: the wheel stays chosen (and the app's
 * inspector, with whatever is half typed in it, stays open). The view just
 * remembers which selection it stepped back from, so choosing any wheel —
 * another one, or the same one again — goes back into its pair.
 */
export declare function usePairView(selectedId: string | null): {
    zoomed: boolean;
    stepOut: () => void;
    stepIn: () => void;
};
/** Does this key press step out of the pair view? Esc does, unless something
 * else owns it: a key already handled, typing in a field, or an open list or
 * dialog (Radix closes those on Esc without stopping it reaching the window). */
export declare function escapeStepsOut(e: Pick<KeyboardEvent, "key" | "defaultPrevented" | "target">): boolean;
