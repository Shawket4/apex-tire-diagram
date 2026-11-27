import { describe, expect, it } from "vitest";

import { formatNumber, messages, textDir, translator } from "./i18n.js";

function keysOf(obj: object, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) => {
    const path = prefix ? `${prefix}.${k}` : k;
    return typeof v === "object" && v !== null ? keysOf(v as object, path) : [path];
  });
}

describe("messages", () => {
  it("ar and en have identical key sets and no empty values", () => {
    expect(keysOf(messages.ar).sort()).toEqual(keysOf(messages.en).sort());
    for (const lang of ["ar", "en"] as const) {
      const t = translator(lang);
      for (const k of keysOf(messages[lang])) expect(t(`diagram.${k}`)).not.toBe("");
    }
  });
});

describe("translator", () => {
  it("interpolates {{name}} and returns an unknown key unchanged", () => {
    expect(translator("en")("diagram.map.axle", { n: "3" })).toBe("Axle 3");
    expect(translator("ar-EG")("diagram.map.axle", { n: "٣" })).toBe("محور ٣");
    expect(translator("en")("diagram.nope")).toBe("diagram.nope");
  });
});

describe("formatNumber / textDir", () => {
  it("uses Arabic-Indic digits and rtl words for Arabic only", () => {
    expect(formatNumber(1234, "ar")).toBe("١٬٢٣٤");
    expect(formatNumber(1234, "en")).toBe("1,234");
    expect(textDir("ar")).toBe("rtl");
    expect(textDir("en-US")).toBe("ltr");
  });
});
