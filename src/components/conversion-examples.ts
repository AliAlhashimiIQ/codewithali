export type ExampleId = "clinic" | "store" | "property" | "company";

type ConversionExample = {
  id: ExampleId;
  label: string;
  sectorForBooking: "عيادة" | "متجر إلكتروني" | "عقارات" | "خدمات";
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

// Fictional businesses for the interactive demo; no message is sent from this data.
export const EXAMPLES: Record<ExampleId, ConversionExample> = {
  clinic: {
    id: "clinic",
    label: "عيادة",
    sectorForBooking: "عيادة",
    eyebrow: "DENTAL / CARE",
    brand: "بسمة · عيادة توضيحية",
    title: ["خطوتك الأولى.", "موعد يناسبك."],
    description: "اختَر الخدمة واسأل العيادة عن التفاصيل والمواعيد.",
    optionLabel: "شنو الخدمة؟",
    options: ["فحص", "تنظيف", "تبييض"],
    action: "جهّز طلب الموعد",
    outcome: "طلب موعد",
    messageTitle: "استفسار الموعد صار واضح.",
    message: (selection) =>
      `السلام عليكم، مهتم بخدمة ${selection} الأسنان. ممكن أعرف تفاصيل الزيارة وتكلفتها والمواعيد المتوفرة؟`,
  },
  store: {
    id: "store",
    label: "متجر",
    sectorForBooking: "متجر إلكتروني",
    eyebrow: "AUDIO / WIRELESS",
    brand: "نغمة · متجر توضيحي",
    title: ["سماعتك الجديدة.", "بلون تختاره."],
    description: "سماعات لاسلكية بتصميم أنيق. اختَر اللون واسأل عن الطلب.",
    optionLabel: "أي لون يعجبك؟",
    options: ["أسود", "فضي", "رملي"],
    action: "جهّز طلب السماعة",
    outcome: "طلب منتج",
    messageTitle: "المنتج واللون صاروا واضحين.",
    message: (selection) =>
      `السلام عليكم، مهتم بالسماعة اللاسلكية باللون ${selection}. متوفرة؟ وشكد سعرها ويا التوصيل وشروط الضمان؟`,
  },
  property: {
    id: "property",
    label: "عقارات",
    sectorForBooking: "عقارات",
    eyebrow: "SPACES / LIVING",
    brand: "مدى · عقارات توضيحية",
    title: ["مساحة تناسبك.", "تفاصيل تهمّك."],
    description: "حدّد عدد الغرف واطلب تفاصيل الشقق المتوفرة.",
    optionLabel: "كم غرفة تحتاج؟",
    options: ["غرفتين", "٣ غرف", "٤ غرف"],
    action: "جهّز طلب التفاصيل",
    outcome: "طلب تفاصيل",
    messageTitle: "متطلبات السكن صارت واضحة.",
    message: (selection) =>
      `السلام عليكم، أدور على شقة بيها ${selection}. ممكن تفاصيل الوحدات المتوفرة، الموقع والمساحة والسعر، وشلون أرتّب زيارة؟`,
  },
  company: {
    id: "company",
    label: "شركة",
    sectorForBooking: "خدمات",
    eyebrow: "BUSINESS / SERVICES",
    brand: "وصلة · شركة توضيحية",
    title: ["خطوة تطوّر شغلك.", "تبدأ بمحادثة."],
    description: "اختَر احتياج مشروعك وجهّز استفسار للفريق.",
    optionLabel: "شنو يحتاج مشروعك؟",
    options: ["موقع", "أتمتة", "استشارة"],
    action: "جهّز طلب الاستشارة",
    outcome: "طلب استشارة",
    messageTitle: "احتياج المشروع صار واضح.",
    message: (selection) => {
      const request =
        selection === "موقع"
          ? "تصميم موقع لمشروعي"
          : selection === "أتمتة"
            ? "أتمتة بعض خطوات العمل بمشروعي"
            : "استشارة بخصوص تطوير مشروعي";
      return `السلام عليكم، أحتاج ${request}. ممكن نحچي عن المتطلبات وطريقة العمل والتكلفة المتوقعة؟`;
    },
  },
};
