"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence, motion, useAnimationFrame, useInView,
  useMotionValue, useMotionValueEvent, useScroll, useTransform,
} from "framer-motion";
import {
  ArrowDown, ArrowLeft, ArrowUpLeft, Building2, Check, CirclePlay,
  Headphones, MessageCircle, Pause, RotateCcw, Stethoscope, Workflow,
} from "lucide-react";
import { EXAMPLES, type ExampleId } from "./conversion-examples";
import { SectorVisual } from "./conversion-visuals";
import "./conversion-story.css";

const SIMPLE_QUERY = "(prefers-reduced-motion: reduce), (max-height: 480px)";
function subscribeSimple(callback: () => void) {
  const query = window.matchMedia(SIMPLE_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getSimple = () => window.matchMedia(SIMPLE_QUERY).matches;
const getServerSimple = () => false;
const SECTORS: ExampleId[] = ["clinic", "store", "property", "company"];
const ICONS = { clinic: Stethoscope, store: Headphones, property: Building2, company: Workflow };
const EASE = [0.2, 0.8, 0.2, 1] as const;
const CAPTIONS = [
  ["إعلانك جاب اهتمامه.", "هسه الصفحة تكمل الحچي."],
  ["مهتم… بس شنو الخطوة الجاية؟", "روابط متفرّقة. تفاصيل ضايعة. قرار يتأجل."],
  ["نرتّب العرض. ونوضّح الطريق.", "كل تفصيل بمكانه، وكل خطوة إلها معنى."],
  ["هسه جرّبها بنفسك.", "اختَر اللي يناسبك وشوف الرسالة تتجهّز."],
];
type Playback = "scroll" | "play" | "pause" | "demo";

export default function ConversionStory({ onChooseService }: { onChooseService: (sector: string) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const orderButton = useRef<HTMLButtonElement>(null);
  const editButton = useRef<HTMLButtonElement>(null);
  const simple = useSyncExternalStore(subscribeSimple, getSimple, getServerSimple);
  const visible = useInView(track, { amount: 0.04 });
  const [sector, setSector] = useState<ExampleId>("store");
  const [selections, setSelections] = useState<Record<ExampleId, number>>({ clinic: 0, store: 0, property: 0, company: 0 });
  const [mode, setMode] = useState<Playback>("scroll");
  const [scene, setScene] = useState(0);
  const [message, setMessage] = useState(false);
  const example = EXAMPLES[sector];
  const selection = example.options[selections[sector]];
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const progress = useMotionValue(0);

  // A bounded catch-up gives each transition time to read, without trapping scroll.
  useAnimationFrame((_, delta) => {
    if (!visible || simple || mode === "demo" || mode === "pause" || document.hidden) return;
    const target = mode === "play" ? 1 : scrollYProgress.get();
    const current = progress.get();
    const step = (Math.min(delta, 50) / 1000) * (mode === "play" ? 0.115 : 0.26);
    progress.set(current + Math.sign(target - current) * Math.min(Math.abs(target - current), step));
  });
  useEffect(() => {
    if (simple || mode === "demo") progress.set(1);
  }, [simple, mode, progress]);
  useMotionValueEvent(progress, "change", (value) => {
    const next = value < 0.22 ? 0 : value < 0.44 ? 1 : value < 0.76 ? 2 : 3;
    if (next !== scene) setScene(next);
    if (mode === "play" && value >= 0.999) setMode("demo");
  });
  const currentScene = simple || mode === "demo" ? 3 : scene;
  const ready = currentScene === 3;
  const showMessage = ready && message;

  const frameWidth = useTransform(progress, [0, 0.22, 0.44, 0.72], ["78%", "95%", "95%", "100%"]);
  const frameRotate = useTransform(progress, [0, 0.22, 0.44, 0.72], [-1.8, 1, 1, 0]);
  const artX = useTransform(progress, [0, 0.23, 0.44, 0.72], [0, -22, -22, 0]);
  const artY = useTransform(progress, [0, 0.23, 0.44, 0.72], [0, 20, 20, 0]);
  const artScale = useTransform(progress, [0, 0.23, 0.44, 0.72], [0.95, 0.8, 0.8, 1]);
  const copyX = useTransform(progress, [0, 0.23, 0.44, 0.7], [0, 22, 22, 0]);
  const copyRotate = useTransform(progress, [0, 0.23, 0.44, 0.7], [0, -4, -4, 0]);
  const controlsOpacity = useTransform(progress, [0.5, 0.7], [0, 1]);
  const controlsY = useTransform(progress, [0.5, 0.72], [28, 0]);
  const clutterOpacity = useTransform(progress, [0, 0.18, 0.26, 0.44, 0.59], [0, 0, 1, 1, 0]);
  const clutterX = useTransform(progress, [0.44, 0.61], [0, 70]);
  const clutterRotate = useTransform(progress, [0.44, 0.61], [0, 8]);
  const traceLength = useTransform(progress, [0.24, 0.44], [0, 1]);
  const cleanLength = useTransform(progress, [0.55, 0.73], [0, 1]);
  const cleanOpacity = useTransform(progress, [0.51, 0.6, 0.79, 0.88], [0, 0.6, 0.6, 0]);
  const cursorLeft = useTransform(progress, [0, 0.15, 0.22, 0.32, 0.4, 0.52, 0.72], ["40%", "75%", "75%", "20%", "62%", "40%", "75%"]);
  const cursorTop = useTransform(progress, [0, 0.15, 0.22, 0.32, 0.4, 0.52, 0.72], ["30%", "71%", "71%", "20%", "44%", "75%", "80%"]);
  const cursorOpacity = useTransform(progress, [0, 0.07, 0.7, 0.77], [0, 1, 1, 0]);
  const clickScale = useTransform(progress, [0.14, 0.18, 0.21], [0.3, 1.5, 2]);
  const clickOpacity = useTransform(progress, [0.14, 0.16, 0.21], [0, 0.65, 0]);
  const badgeOpacity = useTransform(progress, [0.63, 0.75], [0, 1]);
  const badgeY = useTransform(progress, [0.63, 0.75], [18, 0]);
  const duration = simple ? 0 : 0.45;

  function chooseSector(next: ExampleId) {
    if (next === sector) return;
    setSector(next);
    setMessage(false);
  }
  function replay(play = false) {
    setMessage(false);
    progress.set(0);
    setScene(0);
    setMode(play ? "play" : "scroll");
    track.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }
  function playOrPause() {
    if (mode === "play") setMode("pause");
    else if (mode === "pause") setMode("play");
    else replay(true);
  }
  function prepareMessage() {
    setMessage(true);
    requestAnimationFrame(() => editButton.current?.focus({ preventScroll: true }));
  }
  function editMessage() {
    setMessage(false);
    requestAnimationFrame(() => orderButton.current?.focus({ preventScroll: true }));
  }

  return (
    <section id="work" className="cstory-section" data-conversion-story data-story-visible={visible} aria-labelledby="cstory-title">
      <div className="cstory-heading">
        <div className="cstory-eyebrow"><span>تجربة من شغلك</span><span dir="ltr">01 — 04</span></div>
        <h2 id="cstory-title">من النقرة… <br className="cstory-mobileBreak" /><span>إلى محادثة تخصّ شغلك.</span></h2>
        <p>صفحات ومواقع للعيادات، المتاجر، العقارات والشركات.<br />اختَر مجال وشوف شلون نوضّح العرض ونسهّل الخطوة الجاية.</p>
      </div>

      <div ref={track} className={`cstory-track${simple ? " cstory-simple" : ""}`}>
        <div className="cstory-sticky">
          <div className="cstory-sectorPicker" role="group" aria-label="اختَر مجال المثال">
            {SECTORS.map((id) => {
              const Icon = ICONS[id];
              return <button key={id} type="button" aria-pressed={id === sector} onClick={() => chooseSector(id)}>
                <Icon size={22} aria-hidden="true" />
                <span><b>{EXAMPLES[id].label}</b><small>{EXAMPLES[id].outcome}</small></span>
                <span className="cstory-sectorDot" aria-hidden="true" />
              </button>;
            })}
          </div>

          <div className="cstory-studio">
            <div className="cstory-toolbar">
              <div className="cstory-wordmark"><b dir="ltr">CodeWithAli</b><span>/ من النقرة إلى المحادثة</span></div>
              <div className="cstory-playback">
                {!simple && <button type="button" onClick={playOrPause}>
                  {mode === "play" ? <Pause size={13} /> : <CirclePlay size={13} />}
                  {mode === "play" ? "إيقاف مؤقت" : mode === "pause" ? "أكمل العرض" : "شاهد الحركة"}
                </button>}
                {!simple && (ready ?
                  <button type="button" onClick={() => replay()}><RotateCcw size={12} />إعادة التجربة</button> :
                  <button type="button" onClick={() => setMode("demo")}>جرّب مباشرة<ArrowUpLeft size={12} /></button>)}
                {simple && <span>اختَر وجرّب بنفسك</span>}
              </div>
            </div>

            <div className="cstory-caption">
              <span className="cstory-sceneNumber" aria-hidden="true">0{currentScene + 1}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={showMessage ? "message" : currentScene}
                  initial={{ opacity: 0, y: simple ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: simple ? 0 : -8 }}
                  transition={{ duration: simple ? 0 : 0.16 }}>
                  <h3>{showMessage ? "اهتمامه صار بداية محادثة." : CAPTIONS[currentScene][0]}</h3>
                  <p>{showMessage ? "تفاصيل واضحة من أول رسالة." : CAPTIONS[currentScene][1]}</p>
                </motion.div>
              </AnimatePresence>
              {!simple && mode === "scroll" && !ready && <span className="cstory-scrollHint"><ArrowDown size={12} />اسحب لتكمل</span>}
            </div>

            <div className="cstory-stage" data-scene={currentScene}>
              <div className="cstory-grid" aria-hidden="true" />
              <span className="cstory-marginLabel" aria-hidden="true">ONE CLICK. CLEAR INTENT.</span>
              <motion.div className="cstory-frame" style={{ width: frameWidth, rotate: frameRotate }}>
                <div className="cstory-frameBar">
                  <b>{showMessage ? "معاينة رسالة واتساب" : example.brand}</b>
                  <span>مثال توضيحي · {example.label}</span><i aria-hidden="true">•••</i>
                </div>
                <div className="cstory-composition" data-message={showMessage}>
                  <motion.div className="cstory-art" style={{ x: artX, y: artY, scale: artScale }}>
                    <span className="cstory-artIndex">{example.eyebrow}</span>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div className="cstory-artObject" key={sector}
                        initial={{ opacity: 0, y: simple ? 0 : 35, scale: simple ? 1 : 0.88 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: simple ? 0 : -25, scale: simple ? 1 : 1.06 }}
                        transition={{ duration, ease: EASE }}>
                        <SectorVisual sector={sector} progress={progress} reducedMotion={simple} />
                      </motion.div>
                    </AnimatePresence>
                    <motion.span className="cstory-artBadge" style={{ opacity: badgeOpacity, y: badgeY }}>
                      <Check size={11} />عرض واضح. خطوة أسهل.
                    </motion.span>
                  </motion.div>

                  <motion.div className="cstory-copy" style={{ x: copyX, rotate: copyRotate }}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div key={sector}
                        initial={{ opacity: 0, x: simple ? 0 : 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: simple ? 0 : -15 }}
                        transition={{ duration: duration * 0.7, ease: EASE }}>
                        <span className="cstory-exampleLabel">{example.label} · مثال على صفحة إعلان</span>
                        <h4>{example.title[0]}<br />{example.title[1]}</h4>
                        <p>{example.description}</p>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>

                  <div className="cstory-controls" inert={!ready || showMessage}>
                    <motion.div className="cstory-choices" style={{ opacity: controlsOpacity, y: controlsY }}>
                      <span id="cstory-option-label">{example.optionLabel}</span>
                      <div className="cstory-options" role="group" aria-labelledby="cstory-option-label">
                        {example.options.map((option, index) =>
                          <button key={`${sector}-${option}`} type="button" aria-pressed={selections[sector] === index}
                            onClick={() => setSelections((previous) => ({ ...previous, [sector]: index }))}>{option}</button>
                        )}
                      </div>
                    </motion.div>
                    <motion.button className="cstory-order" ref={orderButton} type="button" disabled={!ready}
                      onClick={prepareMessage} whileTap={simple ? undefined : { scale: 0.97 }}>
                      <MessageCircle size={17} /><span>{ready ? example.action : "اعرف التفاصيل"}</span><ArrowUpLeft size={16} />
                    </motion.button>
                    <p className="cstory-demoNote">{ready ? "تجربة فقط · ما تنرسل أي رسالة" : "عرضك واضح من أول نظرة"}</p>
                  </div>

                  <motion.div className="cstory-clutter" style={{ opacity: clutterOpacity, x: clutterX, rotate: clutterRotate }} aria-hidden="true">
                    <span>من نحن؟</span><span>وين التفاصيل؟</span><span>العروض / الخدمات / الروابط</span><span>شلون أتواصل؟</span>
                  </motion.div>
                  <svg className="cstory-trace" viewBox="0 0 800 400" preserveAspectRatio="none" fill="none" aria-hidden="true">
                    <motion.path d="M600 290Q630 150 160 80T600 175Q735 315 330 300" stroke="var(--bad)" strokeWidth="1.5" strokeDasharray="4 5"
                      style={{ pathLength: traceLength, opacity: clutterOpacity }} />
                    <motion.path d="M230 230Q310 325 425 325H610" stroke="var(--go)" strokeWidth="2" strokeLinecap="round"
                      style={{ pathLength: cleanLength, opacity: cleanOpacity }} />
                  </svg>
                  <motion.div className="cstory-cursor" style={{ left: cursorLeft, top: cursorTop, opacity: cursorOpacity }} aria-hidden="true">
                    <motion.i style={{ scale: clickScale, opacity: clickOpacity }} />
                    <svg width="22" height="28" viewBox="0 0 22 28"><path d="M2 2v22l6-6 5 9 4-2-5-9h8L2 2Z" fill="var(--ink)" stroke="var(--bg)" strokeWidth="1.5" /></svg>
                  </motion.div>

                  <AnimatePresence>
                    {showMessage && <motion.div className="cstory-message"
                      initial={{ opacity: 0, y: simple ? 0 : 28, scale: simple ? 1 : 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: simple ? 0 : 18, scale: simple ? 1 : 0.97 }}
                      transition={{ duration, ease: EASE }}>
                      <div className="cstory-messageHead"><span><MessageCircle size={22} /></span><div><b>{example.messageTitle}</b><small>معاينة قبل بدء المحادثة</small></div><Check size={18} /></div>
                      <motion.p initial={{ opacity: 0, y: simple ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: simple ? 0 : 0.15, duration }}>{example.message(selection)}</motion.p>
                      <div className="cstory-messageBottom"><span>مثال توضيحي فقط. لم يتم إرسال أي رسالة.</span><button ref={editButton} type="button" onClick={editMessage}><RotateCcw size={12} />عدّل الاختيار</button></div>
                    </motion.div>}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
            <div className="cstory-timeline" aria-label={`المرحلة ${currentScene + 1} من ٤`}>
              <motion.div className="cstory-progress" style={{ scaleX: progress }} />
              {["اهتمام", "تشتّت", "وضوح", "محادثة"].map((label, index) =>
                <span key={label} data-active={index <= currentScene}><i>0{index + 1}</i>{label}</span>
              )}
            </div>
          </div>

          <div className="cstory-footer">
            <div><b>نفس الفكرة. مصمّمة على شغلك.</b><p>عرض مفهوم، تجربة خفيفة، وطريق واضح للتواصل.</p></div>
            <a className="btn" href="#book" onClick={() => onChooseService(example.sectorForBooking)}>أريد هيچ صفحة لمشروعي<ArrowLeft size={17} /></a>
          </div>
        </div>
      </div>
      <div className="cstory-srOnly" role="status">{showMessage ? `${example.message(selection)} هذه معاينة فقط، لم يتم الإرسال.` : ""}</div>
    </section>
  );
}
