export type ExampleId = "clinic" | "store" | "property" | "company";

type ConversionExample = {
  id: ExampleId;
  label: string;
  sectorForBooking: "عيادة" | "متجر" | "عقارات" | "خدمات";
  eyebrow: string;
  brand: string;
  title: readonly [string, string];
  description: string;
  optionLabel: string;
  options: readonly [string, string, string];
  action: string;
  outcome: string;
  messageTitle: string;
  message: (selection: string) => string;
};

// Fixed illustrative workflows for fictional businesses, not live AI or deployed systems.
// No message is sent, no appointment is booked and no external system is contacted.
export const EXAMPLES: Record<ExampleId, ConversionExample> = {
  clinic: {
    id: "clinic",
    label: "عيادة",
    sectorForBooking: "عيادة",
    eyebrow: "APPOINTMENTS / HANDOFF",
    brand: "بسمة · عيادة توضيحية",
    title: ["طلبات مواعيد أوضح.", "متابعة أسهل."],
    description: "تصوّر مساعد يجمع طلب الموعد، حتى يكمل موظف الاستقبال التفاصيل ويؤكد الحجز.",
    optionLabel: "شنو الخدمة؟",
    options: ["فحص", "تنظيف", "تبييض"],
    action: "شوف ملخّص الطلب",
    outcome: "تنظيم المواعيد",
    messageTitle: "ملخّص لموظف الاستقبال.",
    message: (selection) =>
      `طلب موعد لخدمة ${selection} الأسنان. الخطوة التالية: يجمع موظف الاستقبال الوقت المناسب ويؤكد الموعد حسب جدول العيادة. هذا مثال لتنظيم الطلب؛ لم يتم حجز موعد.`,
  },
  store: {
    id: "store",
    label: "متجر",
    sectorForBooking: "متجر",
    eyebrow: "ENQUIRIES / FOLLOW-UP",
    brand: "نغمة · متجر توضيحي",
    title: ["استفسارات مرتّبة.", "بدل رسائل متفرقة."],
    description: "تصوّر مساعد يجمع تفاصيل المنتج المطلوب، ويجهّز الاستفسار حتى يتابعه موظف المبيعات.",
    optionLabel: "شنو اللون المطلوب؟",
    options: ["أسود", "فضي", "رملي"],
    action: "شوف ملخّص الطلب",
    outcome: "متابعة الطلبات",
    messageTitle: "ملخّص لموظف المبيعات.",
    message: (selection) =>
      `استفسار عن سماعة لاسلكية باللون ${selection}. الخطوة التالية: يتحقق موظف المبيعات من التوفر والسعر والتوصيل قبل الرد. هذا مثال لتحويل الاستفسار إلى متابعة؛ لم يتم إنشاء طلب شراء.`,
  },
  property: {
    id: "property",
    label: "عقارات",
    sectorForBooking: "عقارات",
    eyebrow: "LEADS / QUALIFICATION",
    brand: "مدى · عقارات توضيحية",
    title: ["احتياج الزبون واضح.", "قبل أول اتصال."],
    description: "تصوّر مساعد يجمع احتياج الباحث عن عقار، حتى يبدأ موظف المبيعات بمعلومات أوضح.",
    optionLabel: "كم غرفة تحتاج؟",
    options: ["غرفتين", "٣ غرف", "٤ غرف"],
    action: "شوف ملخّص الطلب",
    outcome: "تأهيل الاستفسارات",
    messageTitle: "ملخّص لمتابعة العقار.",
    message: (selection) =>
      `طلب شقة بيها ${selection}. الخطوة التالية: يستكمل الموظف الميزانية والمنطقة المطلوبة، ويقترح العقارات المناسبة قبل ترتيب زيارة. هذا مثال أولي لتأهيل الاستفسار؛ لم يتم تأكيد زيارة.`,
  },
  company: {
    id: "company",
    label: "شركة",
    sectorForBooking: "خدمات",
    eyebrow: "REQUESTS / ROUTING",
    brand: "وصلة · شركة توضيحية",
    title: ["كل طلب بمتابعته.", "وخطوته واضحة."],
    description: "تصوّر نظام يصنّف طلبات الزبائن ويجهّزها للموظف المسؤول، بدل ما تضيع بين المحادثات.",
    optionLabel: "شنو نوع الطلب؟",
    options: ["حجز", "متابعة", "استفسار"],
    action: "شوف ملخّص الطلب",
    outcome: "توزيع الطلبات",
    messageTitle: "طلب مصنّف للفريق.",
    message: (selection) => {
      const nextStep =
        selection === "حجز"
          ? "يراجع موظف الحجوزات الخدمة والوقت المناسب قبل التأكيد"
          : selection === "متابعة"
            ? "يراجع الموظف المسؤول آخر تحديث للطلب ويرد على الزبون"
            : "يراجع فريق خدمة الزبائن السؤال والمعلومات المطلوبة للرد";
      return `نوع الطلب: ${selection}. الخطوة التالية: ${nextStep}. هذا مثال لتوزيع الطلبات؛ لم يُرسل الطلب إلى أي فريق.`;
    },
  },
};
