import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { escapeStepsOut, usePairView } from "./pairView.js";

describe("usePairView (stepping out of a focused pair)", () => {
  it("zooms into the chosen wheel's pair, and not with nothing chosen", () => {
    const { result, rerender } = renderHook(({ id }) => usePairView(id), {
      initialProps: { id: null as string | null },
    });
    expect(result.current.zoomed).toBe(false);
    rerender({ id: "w1" });
    expect(result.current.zoomed).toBe(true);
  });

  it("steps out to the whole truck and keeps the wheel chosen", () => {
    const { result, rerender } = renderHook(({ id }) => usePairView(id), { initialProps: { id: "w1" } });
    act(() => result.current.stepOut());
    expect(result.current.zoomed).toBe(false);
    // The selection is the caller's: stepping out never asks to change it,
    // and a re-render with the same wheel stays out.
    rerender({ id: "w1" });
    expect(result.current.zoomed).toBe(false);
  });

  it("goes back in when a wheel is chosen: another one, or the same one again", () => {
    const { result, rerender } = renderHook(({ id }) => usePairView(id), { initialProps: { id: "w1" } });
    act(() => result.current.stepOut());
    rerender({ id: "w2" });
    expect(result.current.zoomed).toBe(true);

    act(() => result.current.stepOut());
    expect(result.current.zoomed).toBe(false);
    // Pressing the same wheel again: the diagram calls stepIn before onSelect.
    act(() => result.current.stepIn());
    expect(result.current.zoomed).toBe(true);
  });
});

describe("escapeStepsOut (Esc for keyboard users)", () => {
  const key = (k: string, target: EventTarget | null, defaultPrevented = false) => ({ key: k, target, defaultPrevented });

  it("steps out on Esc from the page", () => {
    expect(escapeStepsOut(key("Escape", document.body))).toBe(true);
    const button = document.createElement("button");
    document.body.append(button);
    expect(escapeStepsOut(key("Escape", button))).toBe(true);
  });

  it("ignores other keys and an Esc already handled", () => {
    expect(escapeStepsOut(key("Enter", document.body))).toBe(false);
    expect(escapeStepsOut(key("Escape", document.body, true))).toBe(false);
  });

  it("leaves Esc to a field being typed in, an open list or a dialog", () => {
    for (const tag of ["input", "textarea", "select"]) {
      expect(escapeStepsOut(key("Escape", document.createElement(tag)))).toBe(false);
    }
    for (const role of ["dialog", "listbox", "combobox"]) {
      const box = document.createElement("div");
      box.setAttribute("role", role);
      const inside = document.createElement("button");
      box.append(inside);
      document.body.append(box);
      expect(escapeStepsOut(key("Escape", inside))).toBe(false);
    }
  });
});
