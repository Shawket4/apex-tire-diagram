/**
 * The diagram's own words, in both languages. They live here (not in each
 * app's catalog) so the garage and the office say exactly the same thing.
 * Keys keep the garage's original "diagram.*" paths.
 */
import type { DiagramLang } from "./types.js";
export declare const messages: {
    readonly en: {
        readonly pos: {
            readonly side: {
                readonly left: "left";
                readonly right: "right";
            };
            readonly depth: {
                readonly outer: "outer";
                readonly inner: "inner";
            };
            readonly spare: "Spare {{n}}";
            readonly steer: "Front {{side}}";
            readonly plainDual: "Axle {{n}}, {{side}} {{depth}}";
            readonly plainSingle: "Axle {{n}}, {{side}}";
            readonly tractorDual: "Tractor axle {{n}}, {{side}} {{depth}}";
            readonly tractorSingle: "Tractor axle {{n}}, {{side}}";
            readonly trailerDual: "Trailer axle {{n}}, {{side}} {{depth}}";
            readonly trailerSingle: "Trailer axle {{n}}, {{side}}";
        };
        readonly map: {
            readonly front: "Front";
            readonly frontOfTruck: "▲ Front of truck";
            readonly axle: "Axle {{n}}";
            readonly lifted: "lifted";
            readonly spares: "Spares";
            readonly tractor: "Tractor";
            readonly trailer: "Trailer";
            readonly ariaEmpty: "{{pos}} — empty";
            readonly ariaMounted: "{{pos}} — tire fitted: {{tire}}";
            readonly ariaPending: "{{pos}} — tire fitted: {{tire}}, still sending";
        };
        readonly legend: {
            readonly mounted: "Tire fitted";
            readonly empty: "Empty";
            readonly spare: "Spare with a tire";
            readonly pending: "Still sending";
        };
        readonly view: {
            readonly label: "View";
            readonly "2d": "Simple drawing";
            readonly "3d": "3D view";
            readonly unsupported: "This device cannot show the 3D view, so you are back on the simple drawing — everything works from it.";
            readonly failed: "The 3D view stopped, so you are back on the simple drawing — everything works from it.";
            readonly hint3d: "Drag to turn the truck, press a wheel to choose it. Press empty space or Esc to see the whole truck again. If it is slow on this device, go back to the simple drawing.";
        };
    };
    readonly ar: {
        readonly pos: {
            readonly side: {
                readonly left: "شمال";
                readonly right: "يمين";
            };
            readonly depth: {
                readonly outer: "برّه";
                readonly inner: "جوّه";
            };
            readonly spare: "استبن {{n}}";
            readonly steer: "قدّام {{side}}";
            readonly plainDual: "محور {{n}} {{side}} {{depth}}";
            readonly plainSingle: "محور {{n}} {{side}}";
            readonly tractorDual: "الراس محور {{n}} {{side}} {{depth}}";
            readonly tractorSingle: "الراس محور {{n}} {{side}}";
            readonly trailerDual: "المقطورة محور {{n}} {{side}} {{depth}}";
            readonly trailerSingle: "المقطورة محور {{n}} {{side}}";
        };
        readonly map: {
            readonly front: "قدّام";
            readonly frontOfTruck: "▲ قدّام العربية";
            readonly axle: "محور {{n}}";
            readonly lifted: "مرفوع";
            readonly spares: "الاستبن";
            readonly tractor: "الراس";
            readonly trailer: "المقطورة";
            readonly ariaEmpty: "{{pos}} — فاضي";
            readonly ariaMounted: "{{pos}} — عليه كاوتش {{tire}}";
            readonly ariaPending: "{{pos}} — عليه كاوتش {{tire}}، لسه بيتبعت";
        };
        readonly legend: {
            readonly mounted: "عليه كاوتش";
            readonly empty: "فاضي";
            readonly spare: "استبن عليه كاوتش";
            readonly pending: "لسه بيتبعت";
        };
        readonly view: {
            readonly label: "طريقة العرض";
            readonly "2d": "رسمة بسيطة";
            readonly "3d": "عرض ٣D";
            readonly unsupported: "الجهاز ده مش بيشغّل العرض الـ٣D، فرجّعناك للرسمة البسيطة — كل حاجة شغّالة منها.";
            readonly failed: "العرض الـ٣D وقف، فرجّعناك للرسمة البسيطة — كل حاجة شغّالة منها.";
            readonly hint3d: "اسحب عشان تلف العربية، ودوس على الكاوتشة عشان تختارها. دوس على مكان فاضي أو Esc عشان ترجع للعربية كلها. لو تقيل على الجهاز ارجع للرسمة البسيطة.";
        };
    };
};
export type Translate = (key: string, options?: Record<string, unknown>) => string;
export type FormatNumber = (n: number) => string;
export declare const isArabic: (lang: DiagramLang | undefined) => boolean;
/** Writing direction of the WORDS (the drawing itself is always left-to-right). */
export declare const textDir: (lang: DiagramLang | undefined) => "rtl" | "ltr";
/** Arabic-Indic digits in Arabic, grouped by thousands — as the garage app shows numbers. */
export declare function formatNumber(n: number, lang: DiagramLang | undefined): string;
/** A translator for the diagram's keys ("diagram.pos.spare", …) with
 * i18next-style {{name}} interpolation. An unknown key comes back as itself. */
export declare function translator(lang: DiagramLang | undefined): Translate;
