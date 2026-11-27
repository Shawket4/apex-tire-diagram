import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from "react";
import { Check, Clock, Plus } from "lucide-react";
import { cn } from "./cn.js";
import { formatNumber, textDir, translator } from "./i18n.js";
import { buildMapLayout, positionLabel, tireName, wheelShortLabel, wheelState, } from "./layout.js";
/** State → look. Every state differs by icon and border style as well as by
 * colour, and the colours are theme tokens, so dark mode follows. */
const STATE_CLASS = {
    mounted: "border-status-ok bg-status-ok-soft text-status-ok",
    spare: "border-info bg-info-soft text-info",
    pending: "border-status-due_soon bg-status-due_soon-soft text-status-due_soon",
    empty: "border-dashed border-border-strong bg-background text-muted-foreground",
};
const STATE_ICON = { mounted: Check, spare: Check, pending: Clock, empty: Plus };
const STATES = ["mounted", "empty", "spare", "pending"];
/** What the colours and marks mean. Shown with both the 2D map and the 3D view. */
export function WheelLegend({ lang, className }) {
    const t = translator(lang);
    return (_jsx("ul", { className: cn("flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground", className), children: STATES.map((s) => {
            const Icon = STATE_ICON[s];
            return (_jsxs("li", { className: "flex items-center gap-1.5", children: [_jsx("span", { "aria-hidden": true, className: cn("flex h-5 w-5 items-center justify-center rounded-md border-2", STATE_CLASS[s]), children: _jsx(Icon, { className: "h-3 w-3" }) }), t(`diagram.legend.${s}`)] }, s));
        }) }));
}
/**
 * The truck from above, cab at the top, drawn with plain HTML: no WebGL, so
 * it works on any machine. Every wheel is a real button — reachable with the
 * keyboard and a screen reader, and big enough for a thumb.
 *
 * The drawing is laid out left-to-right in both languages (the truck's left
 * side is on the left of the screen); only the words follow the language.
 */
export function WheelMap({ axles, positions, lang, selectedId = null, onSelect, compact = false, }) {
    const t = translator(lang);
    const layout = useMemo(() => buildMapLayout(axles, positions), [axles, positions]);
    const fmt = (n) => formatNumber(n, lang);
    const dir = textDir(lang);
    // Sized so a dual axle (4 wheels + the axle name) fits a 360px phone
    // without sideways scrolling, and every wheel is still a 44px+ target.
    const wheelBox = compact ? "h-9 w-7 rounded-md" : "h-16 w-11 rounded-xl sm:w-14";
    const gap = compact ? "gap-1" : "gap-1 sm:gap-1.5";
    const wheel = (p, wide = false) => {
        const state = wheelState(p);
        const Icon = STATE_ICON[state];
        const label = positionLabel(p, axles, lang);
        const said = state === "empty"
            ? t("diagram.map.ariaEmpty", { pos: label })
            : state === "pending"
                ? t("diagram.map.ariaPending", { pos: label, tire: tireName(p) })
                : t("diagram.map.ariaMounted", { pos: label, tire: tireName(p) });
        const selected = selectedId === p.id;
        const cls = cn("flex flex-none flex-col items-center justify-center border-2 leading-none transition", wide ? "h-16 min-w-16 rounded-xl px-2" : wheelBox, STATE_CLASS[state], selected && "ring-2 ring-primary ring-offset-2 ring-offset-card");
        const body = compact ? (_jsx("bdi", { dir: "ltr", className: "text-[9px] font-semibold", children: p.position_code })) : (_jsxs(_Fragment, { children: [_jsx(Icon, { "aria-hidden": true, className: "h-4 w-4" }), _jsx("span", { dir: dir, className: "mt-1 max-w-full truncate px-0.5 text-xs font-bold", children: wheelShortLabel(p, axles, lang) }), _jsx("bdi", { dir: "ltr", className: "mt-1 text-[10px] opacity-70", children: p.position_code })] }));
        if (!onSelect) {
            return (_jsx("div", { className: cls, title: label, children: body }, p.id));
        }
        return (_jsx("button", { type: "button", "aria-label": said, "aria-pressed": selected, title: said, onClick: () => onSelect(p), className: cn(cls, "cursor-pointer hover:brightness-95 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring dark:hover:brightness-125"), children: body }, p.id));
    };
    /** One side of an axle, padded so single wheels line up with the OUTER
     * wheel of the dual axles (as they do on the truck). */
    const sideCells = (wheels, side) => {
        const pad = Array.from({ length: layout.maxPerSide - wheels.length }, (_, i) => (_jsx("div", { "aria-hidden": true, className: cn("flex-none", compact ? "w-7" : "w-11 sm:w-14") }, `pad-${i}`)));
        return (_jsx("div", { className: cn("flex items-center", gap), children: side === "left" ? [...wheels.map((p) => wheel(p)), ...pad] : [...pad, ...wheels.map((p) => wheel(p))] }));
    };
    const axleRow = (row) => (_jsxs("li", { className: cn("flex items-center justify-center", gap), children: [sideCells(row.left, "left"), _jsxs("div", { dir: dir, className: cn("flex flex-none flex-col items-center justify-center rounded-md bg-muted text-center font-semibold text-foreground/80", compact ? "h-5 w-12 text-[10px]" : "min-h-9 w-12 px-0.5 py-1 text-xs sm:w-16"), children: [row.axle.is_steering ? t("diagram.map.front") : t("diagram.map.axle", { n: fmt(row.axle.section_index) }), row.axle.is_lifted && !compact && (_jsx("span", { className: "mt-0.5 text-[10px] font-normal text-muted-foreground", children: t("diagram.map.lifted") }))] }), sideCells(row.right, "right")] }, row.axle.id));
    const section = (rows, title, cab) => rows.length > 0 && (_jsxs("section", { className: cn("rounded-2xl border bg-card", compact ? "p-2" : "p-2 sm:p-3"), children: [_jsx("h3", { dir: dir, className: cn("text-center font-semibold text-muted-foreground", compact ? "mb-1.5 text-[11px]" : "mb-2.5 text-sm"), children: title }), cab && (_jsx("div", { "aria-hidden": true, className: cn("mx-auto mb-2 rounded-t-[1.25rem] rounded-b-md border bg-muted/70", compact ? "h-4 w-16" : "h-7 w-28") })), _jsx("ul", { className: cn("flex flex-col", compact ? "gap-1.5" : "gap-3"), children: rows.map(axleRow) })] }));
    return (_jsxs("div", { dir: "ltr", className: "mx-auto flex w-fit max-w-full select-none flex-col gap-2.5", children: [!compact && (_jsxs("div", { dir: "ltr", className: "flex items-center justify-between px-2 text-xs font-semibold text-muted-foreground", children: [_jsx("span", { dir: dir, children: t("diagram.pos.side.left") }), _jsx("span", { dir: dir, children: t("diagram.map.frontOfTruck") }), _jsx("span", { dir: dir, children: t("diagram.pos.side.right") })] })), section(layout.tractor, t("diagram.map.tractor"), true), section(layout.trailer, t("diagram.map.trailer"), false), layout.spares.length > 0 && (_jsxs("section", { className: cn("rounded-2xl border bg-card", compact ? "p-2" : "p-2 sm:p-3"), children: [_jsx("h3", { dir: dir, className: cn("text-center font-semibold text-muted-foreground", compact ? "mb-1.5 text-[11px]" : "mb-2.5 text-sm"), children: t("diagram.map.spares") }), _jsx("div", { className: cn("flex flex-wrap items-center justify-center", gap), children: layout.spares.map((p) => wheel(p, !compact)) })] }))] }));
}
