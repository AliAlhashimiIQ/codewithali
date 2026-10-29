"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, animate, motion, useInView, useMotionValue } from "framer-motion";
import {
  ArrowLeft, Building2, Check, Headphones, MessageCircle,
  RotateCcw, Stethoscope, Workflow,
} from "lucide-react";
import { EXAMPLES, type ExampleId } from "./conversion-examples";
import { SectorVisual } from "./conversion-visuals";
import "./conversion-story.css";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
const getServerReduced = () => true;
const SECTORS: ExampleId[] = ["clinic", "store", "property", "company"];
const ICONS = { clinic: Stethoscope, store: Headphones, property: Building2, company: Workflow };

export default function ConversionStory({ onChooseService }: { onChooseService: (sector: string) => void }) {
  const studio = useRef<HTMLDivElement>(null);
  const orderButton = useRef<HTMLButtonElement>(null);
  const editButton = useRef<HTMLButtonElement>(null);
  const reduced = useSyncExternalStore(subscribeMotion, getReduced, getServerReduced);
  const visible = useInView(studio, { amount: 0.2 });
  const played = useRef(false);
  const progress = useMotionValue(1);
  const [sector, setSector] = useState<ExampleId>("store");
  const [selections, setSelections] = useState<Record<ExampleId, number>>({ clinic: 0, store: 0, property: 0, company: 0 });
  const [message, setMessage] = useState(false);
  const [chosen, setChosen] = useState(false);
  const example = EXAMPLES[sector];
  const selection = example.options[selections[sector]];

  // A single assembly on arrival. The example is usable immediately, with no
  // scroll clock, sticky scene, or animation frame work after it has settled.
  useEffect(() => {
    if (!visible || reduced || played.current) return;
    played.current = true;
    progress.set(0.44);
    const animation = animate(progress, 1, { duration: 1.2, ease: [0.2, 0, 0, 1] });
    const settle = () => { animation.stop(); progress.set(1); };
    const onVisibility = () => { if (document.hidden) settle(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      settle();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [visible, reduced, progress]);

  function chooseSector(next: ExampleId) {
    if (next === sector) return;
    setSector(next);
    setMessage(false);
    setChosen(false);
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
    <section id="work" className="cstory-section section" data-conversion-story data-story-visible={visible} aria-labelledby="cstory-title">
      <div className="wrap">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">٠١ / جرّب الفكرة بنفسك</p>
            <h2 id="cstory-title">شوفها بعين <span>زبونك.</span></h2>
          </div>
          <p>اختَر مجال، جرّب الخيارات، وشوف الرسالة تتجهّز.<br />هيچ يصير الانتقال من الاهتمام إلى التواصل أوضح.</p>
        </div>
        <div className="cstory-sectorPicker" role="group" aria-label="اختَر مجال المثال">
          {SECTORS.map((id) => {
            const Icon = ICONS[id];
            return <button key={id} type="button" aria-pressed={id === sector} onClick={() => chooseSector(id)}>
              <Icon size={21} aria-hidden="true" />
              <span><b>{EXAMPLES[id].label}</b><small>{EXAMPLES[id].outcome}</small></span>
              {id === sector && <Check className="cstory-sectorCheck" size={15} aria-hidden="true" />}
            </button>;
          })}
        </div>
        <div ref={studio} className="cstory-studio">
          <div className="cstory-toolbar">
            <span><span className="cstory-browserDots" aria-hidden="true">•••</span> {example.brand}</span>
            <span>مثال تفاعلي</span>
          </div>
          <div className="cstory-frame">
            <div className="cstory-composition" inert={message}>
              <div className="cstory-copy">
                <span className="cstory-exampleLabel">{example.label} · صفحة توضّح العرض</span>
                <h3>{example.title[0]}<br />{example.title[1]}</h3>
                <p>{example.description}</p>
              </div>
              <div className="cstory-art" aria-hidden="true">
                <AnimatePresence initial={false}>
                  <motion.div className="cstory-artObject" key={sector}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.15 }}>
                    <SectorVisual sector={sector} progress={progress} reducedMotion={reduced} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="cstory-controls">
                <div className="cstory-choices">
                  <span id="cstory-option-label">{example.optionLabel}</span>
                  <div className="cstory-options" role="group" aria-labelledby="cstory-option-label">
                    {example.options.map((option, index) =>
                      <button key={`${sector}-${option}`} type="button" aria-pressed={selections[sector] === index}
                        onClick={() => {
                          setSelections((previous) => ({ ...previous, [sector]: index }));
                          setChosen(true);
                        }}>
                        {selections[sector] === index && <Check size={13} aria-hidden="true" />}{option}
                      </button>
                    )}
                  </div>
                </div>
                <button className="cstory-order" ref={orderButton} type="button" onClick={prepareMessage}>
                  <MessageCircle size={18} aria-hidden="true" /><span>{example.action}</span><ArrowLeft size={17} aria-hidden="true" />
                </button>
                <p className="cstory-demoNote">جرّب الزر · ما تنرسل أي رسالة</p>
              </div>
            </div>
            {message && <motion.div className="cstory-message"
              initial={{ opacity: 0, y: reduced ? 0 : 12, filter: reduced ? "none" : "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: reduced ? "none" : "blur(0px)" }}
              transition={{ duration: reduced ? 0 : 0.3, ease: "easeOut" }}>
              <div className="cstory-messageHead">
                <span><MessageCircle size={24} aria-hidden="true" /></span>
                <div><b>{example.messageTitle}</b><small>الاختيار صار ضمن الرسالة</small></div>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <motion.path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: reduced ? 1 : 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.1 }} />
                </svg>
              </div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.1 }}>{example.message(selection)}</motion.p>
              <div className="cstory-messageBottom">
                <span>معاينة فقط · لم يتم إرسال أي رسالة</span>
                <button ref={editButton} type="button" onClick={editMessage}><RotateCcw size={15} aria-hidden="true" />عدّل الاختيار</button>
              </div>
            </motion.div>}
          </div>
          <ol className="cstory-steps" aria-label="خطوات التجربة">
            <li data-complete="true"><span>١</span>اختَر مجالك</li>
            <li data-complete={chosen || message}><span>٢</span>حدّد طلبك</li>
            <li data-complete={message}><span>{message ? <Check size={14} aria-hidden="true" /> : "٣"}</span>شوف رسالتك</li>
          </ol>
        </div>
        <div className="cstory-footer">
          <p>نفس الفكرة، بتصميم ومحتوى يناسب شغلك.</p>
          <a className="text-link" href="#book" onClick={() => onChooseService(example.sectorForBooking)}>أريد هيچ صفحة لمشروعي<ArrowLeft size={17} /></a>
        </div>
        <div className="sr-only" role="status">{message ? `${example.message(selection)} هذه معاينة فقط، لم يتم الإرسال.` : ""}</div>
      </div>
    </section>
  );
}
