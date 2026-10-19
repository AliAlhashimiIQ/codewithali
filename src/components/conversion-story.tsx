"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, useInView, useMotionValue, useAnimationFrame, AnimatePresence, type MotionValue } from "framer-motion";
import "./conversion-story.css";

const SIMPLE_QUERY = "(prefers-reduced-motion: reduce), (max-height: 450px)";
function subscribeSimple(callback: () => void) {
  const query = window.matchMedia(SIMPLE_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getSimple = () => window.matchMedia(SIMPLE_QUERY).matches;
const getServerSimple = () => false;
const captions = ["إعلانك جاب اهتمامه.", "بس شلون يطلب موعد؟", "عرض واضح. اختيار سهل.", "جرّب بنفسك. وشوف الفرق."];
const notes = ["اسحب وشوف وين تروح النقرة", "خيارات هواية… والخطوة الجاية مو واضحة", "نرتّب التفاصيل حول خطوة واحدة مفهومة", "اختَر الخدمة، وجهّز استفسارك عن الموعد"];

function DentalVisual({ progress }: { progress: MotionValue<number> }) {
  const orbit = useTransform(progress, [0, 1], [-55, 55]);
  const scan = useTransform(progress, [.44, .7], [70, 290]);
  const scanOpacity = useTransform(progress, [.42, .48, .65, .72], [0, .8, .8, 0]);
  const sparkle = useTransform(progress, [.5, .67], [0, 1]);
  const ring = useTransform(progress, [.44, .7], [0, 1]);
  return <svg viewBox="0 0 360 380" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="story-enamel" x1="100" y1="90" x2="270" y2="310" gradientUnits="userSpaceOnUse"><stop stopColor="#FFFFFF"/><stop offset=".55" stopColor="#E4E8E3"/><stop offset="1" stopColor="#8AAE9A"/></linearGradient>
      <linearGradient id="story-scan"><stop stopColor="#0B9A5B" stopOpacity="0"/><stop offset=".5" stopColor="#0B9A5B"/><stop offset="1" stopColor="#0B9A5B" stopOpacity="0"/></linearGradient>
    </defs>
    <circle cx="180" cy="183" r="140" stroke="var(--go)" strokeOpacity=".12"/>
    <motion.g style={{ rotate: orbit, transformOrigin: "180px 183px" }}>
      <circle cx="180" cy="183" r="124" stroke="var(--go)" strokeOpacity=".3" strokeDasharray="3 12"/>
      <circle cx="72" cy="122" r="7" fill="var(--go)"/>
      <path d="M277 262h20m-10-10v20" stroke="var(--go)" strokeWidth="2"/>
    </motion.g>
    <ellipse cx="180" cy="327" rx="77" ry="12" fill="#14231D" opacity=".12"/>
    <path d="M181 105C148 76 102 80 90 120c-14 46 21 70 27 114 5 36 11 71 28 72 19 1 15-64 36-64 22 0 17 65 36 64 17-1 23-36 28-72 6-44 41-68 27-114-12-40-58-44-91-15Z" fill="url(#story-enamel)" stroke="#90AA99" strokeWidth="2"/>
    <path d="M118 115q-19 28 0 57m49-60q18 11 34 0" stroke="white" strokeWidth="8" strokeLinecap="round" opacity=".8"/>
    <path d="M144 98q20 0 37 12" stroke="#90AA99" strokeWidth="3" strokeLinecap="round"/>
    <motion.path d="M65 183a115 115 0 0 1 230 0" stroke="var(--go)" strokeWidth="3" strokeLinecap="round" style={{ pathLength: ring }} />
    <motion.rect x="55" y="0" width="250" height="3" rx="2" fill="url(#story-scan)" style={{ y: scan, opacity: scanOpacity }}/>
    <motion.g style={{ opacity: sparkle, scale: sparkle, transformOrigin: "258px 102px" }}><path d="m258 80 6 16 16 6-16 6-6 16-6-16-16-6 16-6Z" fill="var(--go)"/><path d="m95 246 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" fill="var(--go)"/></motion.g>
  </svg>;
}

export default function ConversionStory({ onChooseService }: { onChooseService: () => void }) {
  const track = useRef<HTMLDivElement>(null);
  const demo = useRef<HTMLDivElement>(null);
  const editButton = useRef<HTMLButtonElement>(null);
  const orderButton = useRef<HTMLButtonElement>(null);
  const visible = useInView(track, { amount: 0.05 });
  const simple = useSyncExternalStore(subscribeSimple, getSimple, getServerSimple);
  const [scene, setScene] = useState(0);
  const [service, setService] = useState("فحص");
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState(false);
  const [manual, setManual] = useState(false);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  // Cap visual playback speed, even when a wheel/touch gesture jumps the scroll target.
  // Native scrolling is never intercepted; an optional replay lets visitors watch at leisure.
  const pacedProgress = useMotionValue(0);
  useAnimationFrame((_time, delta) => {
    if (!visible || simple || manual || document.hidden) return;
    const target = playing ? 1 : scrollYProgress.get();
    const current = pacedProgress.get();
    const distance = target - current;
    const maxStep = Math.min(delta, 50) / 1000 * (playing ? .14 : .28);
    if (Math.abs(distance) > .0001) {
      pacedProgress.set(current + Math.sign(distance) * Math.min(Math.abs(distance), maxStep));
    }
  });
  const progress = useTransform(() => simple || manual ? 1 : pacedProgress.get());
  useMotionValueEvent(progress, "change", value => {
    if (playing && value >= .999) { setPlaying(false); setManual(true); }
    const next = value < .2 ? 0 : value < .43 ? 1 : value < .73 ? 2 : 3;
    setScene(previous => previous === next ? previous : next);
  });
  const ready = simple || manual || scene === 3;
  const current = ready ? 3 : scene;
  const frameWidth = useTransform(progress, [0, .18, .43, .68], [64, 96, 96, 100]);
  const width = useTransform(frameWidth, v => `${v}%`);
  const productX = useTransform(progress, [0, .19, .42, .69], [0, -22, -22, 0]);
  const productY = useTransform(progress, [0, .2, .43, .68], [10, 38, 38, 0]);
  const productRotate = useTransform(progress, [0, .2, .43, .68], [-8, 8, 8, 0]);
  const productScale = useTransform(progress, [0, .2, .43, .68], [.9, .7, .7, 1]);
  const clutterOpacity = useTransform(progress, [0, .18, .25, .43, .57], [0, 0, 1, 1, 0]);
  const clutterX = useTransform(progress, [.43, .6], [0, 90]);
  const detailsX = useTransform(progress, [0, .23, .43, .7], [0, 28, 28, 0]);
  const detailsRotate = useTransform(progress, [0, .23, .43, .7], [0, -3, -3, 0]);
  const choicesOpacity = useTransform(progress, [.52, .68], [0, 1]);
  const choicesY = useTransform(progress, [.52, .7], [22, 0]);
  const cursorX = useTransform(progress, [0, .14, .2, .29, .36, .43, .64], [35, 71, 71, 23, 80, 45, 71]);
  const cursorY = useTransform(progress, [0, .14, .2, .29, .36, .43, .64], [25, 77, 77, 22, 40, 70, 77]);
  const cursorLeft = useTransform(cursorX, v => `${v}%`);
  const cursorTop = useTransform(cursorY, v => `${v}%`);
  const cursorOpacity = useTransform(progress, [0, .06, .64, .73], [0, 1, 1, 0]);
  const pathLength = useTransform(progress, [.21, .43], [0, 1]);
  const clickScale = useTransform(progress, [.13, .16, .19], [.3, 1.6, 2]);
  const clickOpacity = useTransform(progress, [.13, .15, .19], [0, .7, 0]);

  const actionOpacity = useTransform(progress, [0, .42, .52, .7], [1, 1, .35, 1]);
  const actionY = useTransform(progress, [.43, .7], [16, 0]);
  const badgeOpacity = useTransform(progress, [.58, .73], [0, 1]);
  const badgeY = useTransform(progress, [.58, .73], [24, 0]);

  function skipToDemo() {
    setManual(true);
    setPlaying(false);
    demo.current?.scrollIntoView({ behavior: simple ? "instant" : "smooth", block: "center" });
  }
  function replay() {
    setMessage(false);
    setService("فحص");
    setPlaying(false);
    pacedProgress.set(0);
    setManual(false);
    track.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }

  return <section id="work" className="cstory-section" data-conversion-story data-story-visible={visible} aria-labelledby="story-heading">

        <div className="cstory-heading">
          <span className="cstory-eyebrow"><i/> من النقرة إلى المحادثة <span>· تجربة توضيحية</span></span>
          <h2 id="story-heading">الزبون مهتم.<br className="cstory-mobileBreak"/> <span>خلّي الخطوة الجاية واضحة.</span></h2>
        </div>
    <div ref={track} className={`cstory-track ${simple ? "cstory-simple" : ""}`}>
      <div className="cstory-sticky">
        <div className="cstory-studio" ref={demo}>
          <div className="cstory-toolbar">
            <span className="cstory-wordmark">CodeWithAli <span>/ رحلة الموعد</span></span>
            <div className="cstory-playback">
              {!simple && <button type="button" aria-pressed={playing} onClick={() => { if (playing) { setPlaying(false); } else { replay(); setPlaying(true); } }}>{playing ? "تابع بالسكرول" : "▷ شاهد الحركة"}</button>}
              <button type="button" onClick={ready ? replay : skipToDemo}>{ready ? "↺ إعادة التجربة" : "جرّب مباشرة ←"}</button>
            </div>
          </div>
          <div className="cstory-caption">
            <span className="cstory-sceneNumber" aria-hidden="true">0{current + 1}</span>
            <AnimatePresence mode="wait" initial={false}><motion.div key={message && ready ? "message" : current} initial={{ opacity: 0, y: simple ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: simple ? 0 : -8 }} transition={{ duration: simple ? 0 : .18 }}><h3>{message && ready ? "يوصلك وهو محدّد الخدمة." : captions[current]}</h3><p>{message && ready ? "رسالة مرتّبة، وبداية أوضح للمحادثة." : notes[current]}</p></motion.div></AnimatePresence>
          </div>
          <div className="cstory-stage" data-scene={current}>
            <div className="cstory-grid" aria-hidden="true"/>
            <span className="cstory-marginLabel" aria-hidden="true">INTEREST → INTENT</span>
            <motion.div className="cstory-frame" style={{ width }}>
              <div className="cstory-frameBar"><span>{message && ready ? "معاينة رسالة واتساب" : "عيادة بسمة"}</span><span>{current === 0 ? "إعلان توضيحي" : "طب وتجميل الأسنان"}</span><i aria-hidden="true">•••</i></div>
              <div className="cstory-composition">
                <motion.div className="cstory-product" style={{ x: productX, y: productY, rotate: productRotate, scale: productScale }} animate={{ opacity: message && ready ? .16 : 1 }} transition={{ duration: simple ? 0 : .45 }}>
                  <span className="cstory-productIndex">BASMA / DENTAL CARE</span><DentalVisual progress={progress}/><span className="cstory-productLabel">خطوتك الأولى لابتسامة أجمل.</span>
                </motion.div>
                <motion.div className="cstory-details" style={{ x: detailsX, rotate: detailsRotate }} animate={{ opacity: message && ready ? 0 : 1 }} inert={message && ready}>
                  <span className="cstory-collection">بسمة · عيادة توضيحية</span>
                  <h4>ابتسامتك تبدأ<br/>بخطوة بسيطة.</h4>
                  <p className="cstory-clinicNote">اختَر الخدمة واسأل عن موعد يناسبك.</p>
                  <motion.div className="cstory-choices" style={{ opacity: choicesOpacity, y: choicesY }} inert={!ready}>
                    <span id="story-service-label">شنو الخدمة؟</span>
                    <div className="cstory-services" role="group" aria-labelledby="story-service-label" dir="rtl">
                      {["فحص", "تنظيف", "تبييض"].map(option => <button type="button" key={option} aria-pressed={service === option} onClick={() => setService(option)}>{service === option && <motion.span layoutId="story-service" className="cstory-selection" transition={{ duration: simple ? 0 : .2 }}/>}<span>{option}</span></button>)}
                    </div>
                  </motion.div>
                  <motion.button style={{ opacity: actionOpacity, y: actionY }} type="button" ref={orderButton} className="cstory-order" disabled={!ready} onClick={() => { setMessage(true); requestAnimationFrame(() => editButton.current?.focus({ preventScroll: true })); }}>{ready ? "جهّز طلب الموعد" : "اسأل عن موعد"}<span aria-hidden="true">↗</span></motion.button>
                  <span className="cstory-demoNote">{ready ? "تجربة فقط · ما ينرسل أي طلب" : "تواصل مباشر مع العيادة"}</span>
                </motion.div>
                <motion.div className="cstory-appointmentBadge" style={{ opacity: badgeOpacity, y: badgeY }} aria-hidden="true"><span>✓</span> خدمة واضحة · تواصل أسهل</motion.div>
                <motion.div className="cstory-clutter" style={{ opacity: clutterOpacity, x: clutterX }} aria-hidden="true"><span>الرئيسية / من نحن / المدونة</span><span>اكتشف المزيد ↗</span><span>اشترك بالنشرة البريدية</span><span>وين أطلب موعد؟</span></motion.div>
                <motion.svg className="cstory-trace" viewBox="0 0 800 400" preserveAspectRatio="none" style={{ opacity: clutterOpacity }} aria-hidden="true"><motion.path d="M565 310 Q600 180 185 88 T640 160 Q700 280 360 280" fill="none" stroke="var(--bad)" strokeWidth="2" strokeDasharray="5 5" style={{ pathLength }}/></motion.svg>
                <motion.div className="cstory-cursor" style={{ left: cursorLeft, top: cursorTop, opacity: cursorOpacity }} aria-hidden="true"><motion.i style={{ scale: clickScale, opacity: clickOpacity }}/><svg viewBox="0 0 30 36" width="26" height="32"><path d="m3 2 23 20-12 1-5 10Z" fill="var(--ink)" stroke="var(--card)" strokeWidth="2"/></svg></motion.div>
                <motion.div className="cstory-message" initial={false} animate={{ opacity: message && ready ? 1 : 0, y: message && ready ? 0 : 35, scale: message && ready ? 1 : .92 }} transition={{ duration: simple ? 0 : .45, ease: [.2,.8,.2,1] }} inert={!(message && ready)} aria-hidden={!(message && ready)}>
                  <div className="cstory-messageHead"><span>↗</span><div><b>طلب الموعد صار واضح.</b><small>معاينة قبل بدء المحادثة</small></div></div>
                  <p>السلام عليكم، أريد أستفسر عن موعد لخدمة <b>{service} الأسنان</b>. شنو الأوقات المتوفرة وشكد تكلفة الزيارة؟</p>
                  <div className="cstory-messageBottom"><span>رسالة تجريبية · لم تُرسل</span><button ref={editButton} type="button" onClick={() => { setMessage(false); requestAnimationFrame(() => orderButton.current?.focus({ preventScroll: true })); }}>عدّل الاختيار ←</button></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <div className="cstory-timeline" aria-hidden="true"><motion.i style={{ scaleX: progress }}/>{["اهتمام", "تشتّت", "وضوح", "طلب موعد"].map((label, index) => <span key={label} data-active={current >= index}><b>0{index+1}</b>{label}</span>)}</div>
        </div>
        <div className="cstory-footer"><div><b>هيچ تصير الخطوة الجاية أسهل.</b><p>صفحة توضّح عرضك وتجهّز استفسار الزبون على واتساب.</p></div><a className="btn" href="#book" onClick={onChooseService}>أريد هيچ صفحة لإعلاني <span aria-hidden="true">←</span></a></div>
        <span className="cstory-announcement" role="status">{message ? `تم تجهيز استفسار عن موعد لخدمة ${service} الأسنان. لم يتم إرسال رسالة.` : ""}</span>
      </div>
    </div>
  </section>;
}

