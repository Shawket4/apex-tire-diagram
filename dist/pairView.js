import { useCallback, useState } from "react";
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
export function usePairView(selectedId) {
    const [steppedOutOf, setSteppedOutOf] = useState(null);
    const zoomed = selectedId != null && steppedOutOf !== selectedId;
    const stepOut = useCallback(() => setSteppedOutOf(selectedId), [selectedId]);
    const stepIn = useCallback(() => setSteppedOutOf(null), []);
    return { zoomed, stepOut, stepIn };
}
/** Does this key press step out of the pair view? Esc does, unless something
 * else owns it: a key already handled, typing in a field, or an open list or
 * dialog (Radix closes those on Esc without stopping it reaching the window). */
export function escapeStepsOut(e) {
    if (e.key !== "Escape" || e.defaultPrevented)
        return false;
    const t = e.target;
    if (!t || typeof t.closest !== "function")
        return true;
    const el = t;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable) {
        return false;
    }
    return !el.closest('[role="listbox"],[role="dialog"],[role="alertdialog"],[role="combobox"],[role="menu"]');
}
