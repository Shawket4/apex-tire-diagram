import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component, Suspense, lazy, useState } from "react";
import { Box, Info, LayoutGrid } from "lucide-react";
import { cn } from "./cn.js";
import { translator } from "./i18n.js";
import { WheelLegend, WheelMap } from "./WheelMap.js";
// three.js is only downloaded/parsed when someone asks for the 3D view.
const TruckDiagram3D = lazy(() => import("./TruckDiagram.js").then((m) => ({ default: m.TruckDiagram })));
const VIEW_KEY = "apex-wheel-view";
function storedView() {
    try {
        return window.localStorage.getItem(VIEW_KEY) === "3d" ? "3d" : "2d";
    }
    catch {
        return "2d";
    }
}
function storeView(v) {
    try {
        window.localStorage.setItem(VIEW_KEY, v);
    }
    catch {
        // storage unavailable — the choice just won't be remembered
    }
}
/** Can this machine draw 3D at all? (Old drivers, remote desktop and some
 * virtual machines cannot.) */
function webglAvailable() {
    try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    }
    catch {
        return false;
    }
}
/** Anything the 3D view throws (no graphics context, a failed chunk load)
 * lands here instead of taking the page down. */
class Scene3DBoundary extends Component {
    state = { failed: false };
    static getDerivedStateFromError() {
        return { failed: true };
    }
    componentDidCatch(error) {
        console.error("[apex] 3D wheel view failed", error);
        this.props.onError();
    }
    render() {
        return this.state.failed ? null : this.props.children;
    }
}
/**
 * The wheel picker. The plain 2D map is the default
 * and does everything; the 3D scene is an optional view behind a toggle
 * (remembered on this device) and falls back to the map, with a short
 * notice, when it cannot run.
 */
export function WheelDiagram({ axles, positions, lang, selectedId, onSelect, }) {
    const t = translator(lang);
    const [notice, setNotice] = useState(null);
    const [view, setView] = useState(() => (storedView() === "3d" && webglAvailable() ? "3d" : "2d"));
    const choose = (v) => {
        if (v === "3d" && !webglAvailable()) {
            setNotice("unsupported");
            setView("2d");
            storeView("2d");
            return;
        }
        setNotice(null);
        setView(v);
        storeView(v);
    };
    const fallBack = () => {
        setNotice("failed");
        setView("2d");
        storeView("2d");
    };
    const viewButton = (v, Icon) => (_jsxs("button", { type: "button", "aria-pressed": view === v, onClick: () => choose(v), className: cn("flex min-h-10 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition pointer-coarse:min-h-11", "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50", view === v ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"), children: [_jsx(Icon, { "aria-hidden": true, className: "h-4 w-4" }), t(`diagram.view.${v}`)] }));
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-2", children: [_jsx(WheelLegend, { lang: lang }), _jsxs("div", { role: "group", "aria-label": t("diagram.view.label"), className: "flex flex-none gap-1 rounded-lg bg-muted p-1", children: [viewButton("2d", LayoutGrid), viewButton("3d", Box)] })] }), notice && (_jsxs("p", { role: "status", className: "flex items-start gap-2 rounded-lg border border-status-due_soon/40 bg-status-due_soon-soft px-3 py-2 text-sm", children: [_jsx(Info, { "aria-hidden": true, className: "mt-0.5 h-4 w-4 flex-none text-status-due_soon" }), t(`diagram.view.${notice}`)] })), view === "3d" ? (_jsxs(Scene3DBoundary, { onError: fallBack, children: [_jsx("div", { className: "h-[min(56vh,520px)] min-h-72 overflow-hidden rounded-xl border bg-[#eef1f5]", children: _jsx(Suspense, { fallback: _jsx("div", { "data-slot": "skeleton", className: "h-full w-full animate-pulse rounded-none bg-accent" }), children: _jsx(TruckDiagram3D, { axles: axles, positions: positions, selectedId: selectedId, onSelect: onSelect, onContextLost: fallBack }) }) }), _jsx("p", { className: "text-xs text-muted-foreground", children: t("diagram.view.hint3d") })] })) : (_jsx("div", { className: "overflow-x-auto rounded-xl border bg-muted/30 p-1.5 sm:p-4", children: _jsx(WheelMap, { axles: axles, positions: positions, lang: lang, selectedId: selectedId, onSelect: onSelect }) }))] }));
}
