export const messages = {
    "en": {
        "pos": {
            "side": {
                "left": "left",
                "right": "right"
            },
            "depth": {
                "outer": "outer",
                "inner": "inner"
            },
            "spare": "Spare {{n}}",
            "steer": "Front {{side}}",
            "plainDual": "Axle {{n}}, {{side}} {{depth}}",
            "plainSingle": "Axle {{n}}, {{side}}",
            "tractorDual": "Tractor axle {{n}}, {{side}} {{depth}}",
            "tractorSingle": "Tractor axle {{n}}, {{side}}",
            "trailerDual": "Trailer axle {{n}}, {{side}} {{depth}}",
            "trailerSingle": "Trailer axle {{n}}, {{side}}"
        },
        "map": {
            "front": "Front",
            "frontOfTruck": "▲ Front of truck",
            "axle": "Axle {{n}}",
            "lifted": "lifted",
            "spares": "Spares",
            "tractor": "Tractor",
            "trailer": "Trailer",
            "ariaEmpty": "{{pos}} — empty",
            "ariaMounted": "{{pos}} — tire fitted: {{tire}}",
            "ariaPending": "{{pos}} — tire fitted: {{tire}}, still sending"
        },
        "legend": {
            "mounted": "Tire fitted",
            "empty": "Empty",
            "spare": "Spare with a tire",
            "pending": "Still sending"
        },
        "view": {
            "label": "View",
            "2d": "Simple drawing",
            "3d": "3D view",
            "unsupported": "This device cannot show the 3D view, so you are back on the simple drawing — everything works from it.",
            "failed": "The 3D view stopped, so you are back on the simple drawing — everything works from it.",
            "hint3d": "Drag to turn the truck, press a wheel to choose it. If it is slow on this device, go back to the simple drawing."
        }
    },
    "ar": {
        "pos": {
            "side": {
                "left": "شمال",
                "right": "يمين"
            },
            "depth": {
                "outer": "برّه",
                "inner": "جوّه"
            },
            "spare": "استبن {{n}}",
            "steer": "قدّام {{side}}",
            "plainDual": "محور {{n}} {{side}} {{depth}}",
            "plainSingle": "محور {{n}} {{side}}",
            "tractorDual": "الراس محور {{n}} {{side}} {{depth}}",
            "tractorSingle": "الراس محور {{n}} {{side}}",
            "trailerDual": "المقطورة محور {{n}} {{side}} {{depth}}",
            "trailerSingle": "المقطورة محور {{n}} {{side}}"
        },
        "map": {
            "front": "قدّام",
            "frontOfTruck": "▲ قدّام العربية",
            "axle": "محور {{n}}",
            "lifted": "مرفوع",
            "spares": "الاستبن",
            "tractor": "الراس",
            "trailer": "المقطورة",
            "ariaEmpty": "{{pos}} — فاضي",
            "ariaMounted": "{{pos}} — عليه كاوتش {{tire}}",
            "ariaPending": "{{pos}} — عليه كاوتش {{tire}}، لسه بيتبعت"
        },
        "legend": {
            "mounted": "عليه كاوتش",
            "empty": "فاضي",
            "spare": "استبن عليه كاوتش",
            "pending": "لسه بيتبعت"
        },
        "view": {
            "label": "طريقة العرض",
            "2d": "رسمة بسيطة",
            "3d": "عرض ٣D",
            "unsupported": "الجهاز ده مش بيشغّل العرض الـ٣D، فرجّعناك للرسمة البسيطة — كل حاجة شغّالة منها.",
            "failed": "العرض الـ٣D وقف، فرجّعناك للرسمة البسيطة — كل حاجة شغّالة منها.",
            "hint3d": "اسحب عشان تلف العربية، ودوس على الكاوتشة عشان تختارها. لو تقيل على الجهاز ارجع للرسمة البسيطة."
        }
    }
};
export const isArabic = (lang) => (lang ?? "").toLowerCase().startsWith("ar");
/** Writing direction of the WORDS (the drawing itself is always left-to-right). */
export const textDir = (lang) => (isArabic(lang) ? "rtl" : "ltr");
const arFmt = new Intl.NumberFormat("ar-EG", { numberingSystem: "arab" });
const enFmt = new Intl.NumberFormat("en-US");
/** Arabic-Indic digits in Arabic, grouped by thousands — as the garage app shows numbers. */
export function formatNumber(n, lang) {
    if (Number.isNaN(n))
        return "—";
    return isArabic(lang) ? arFmt.format(n) : enFmt.format(n);
}
function lookup(tree, key) {
    let at = tree;
    for (const part of key.split(".")) {
        if (!at || typeof at === "string")
            return undefined;
        at = at[part];
    }
    return typeof at === "string" ? at : undefined;
}
/** A translator for the diagram's keys ("diagram.pos.spare", …) with
 * i18next-style {{name}} interpolation. An unknown key comes back as itself. */
export function translator(lang) {
    const tree = { diagram: messages[isArabic(lang) ? "ar" : "en"] };
    return (key, options) => {
        const text = lookup(tree, key);
        if (text === undefined)
            return key;
        return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name) => {
            const v = options?.[name];
            return v === undefined || v === null ? "" : String(v);
        });
    };
}
