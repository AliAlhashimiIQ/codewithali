"use client";

import { useId } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";

export type SectorId = "clinic" | "store" | "property" | "company";

type VisualProps = {
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

type IllustrationProps = VisualProps & { id: string };

const forest = "#14231D";
const mineral = "#E4E8E3";
const green = "var(--go)";

// A bounded entrance assembles the illustration, then settles. Reduced motion
// uses the complete drawing immediately; no scrolling or perpetual loop is needed.
function useIllustrationMotion({ progress, reducedMotion }: VisualProps) {
  const spread = useTransform(progress, [0, 0.2, 0.42, 0.7], [0, 20, 20, 0]);
  const drift = useTransform(progress, [0, 0.2, 0.42, 0.7], [0, -12, -12, 0]);
  const rotate = useTransform(progress, [0, 0.22, 0.42, 0.7], [-4, 5, 5, 0]);
  const draw = useTransform(progress, [0.42, 0.7], [0, 1]);
  const reveal = useTransform(progress, [0.5, 0.72], [0, 1]);
  const rise = useTransform(progress, [0.47, 0.72], [15, 0]);
  const orbit = useTransform(progress, [0, 0.72], [-28, 22]);
  const scan = useTransform(progress, [0.44, 0.72], [90, 290]);
  const scanOpacity = useTransform(progress, [0.43, 0.49, 0.66, 0.72], [0, 0.65, 0.65, 0]);

  return {
    spread: reducedMotion ? 0 : spread,
    drift: reducedMotion ? 0 : drift,
    rotate: reducedMotion ? 0 : rotate,
    draw: reducedMotion ? 1 : draw,
    reveal: reducedMotion ? 1 : reveal,
    rise: reducedMotion ? 0 : rise,
    orbit: reducedMotion ? 22 : orbit,
    scan: reducedMotion ? 290 : scan,
    scanOpacity: reducedMotion ? 0 : scanOpacity,
  };
}

function IllustrationDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-elev`} x="-15%" y="-15%" width="130%" height="135%">
        <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0A1410" floodOpacity="0.18" />
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0A1410" floodOpacity="0.1" />
      </filter>
      <linearGradient id={`${id}-enamel`} x1="125" y1="85" x2="288" y2="297" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset=".48" stopColor={mineral} />
        <stop offset="1" stopColor="#9BB2A4" />
      </linearGradient>
      <linearGradient id={`${id}-metal`} x1="100" y1="100" x2="290" y2="270" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E6ECE6" />
        <stop offset=".3" stopColor="#8FA395" />
        <stop offset=".65" stopColor="#F2F6F2" />
        <stop offset="1" stopColor="#5C7667" />
      </linearGradient>
      <linearGradient id={`${id}-dark`} x1="100" y1="120" x2="300" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3D594A" />
        <stop offset=".45" stopColor="#213A2D" />
        <stop offset="1" stopColor="#0E1814" />
      </linearGradient>
      <linearGradient id={`${id}-paper`} x1="130" y1="100" x2="295" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#DCE4DC" />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="190" y1="140" x2="305" y2="295" gradientUnits="userSpaceOnUse">
        <stop stopColor="#476B57" />
        <stop offset=".45" stopColor="#234A37" />
        <stop offset="1" stopColor="#103221" />
      </linearGradient>
      <linearGradient id={`${id}-scan`}>
        <stop stopColor={green} stopOpacity="0" />
        <stop offset=".5" stopColor={green} />
        <stop offset="1" stopColor={green} stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${id}-halo`}>
        <stop stopColor={green} stopOpacity=".14" />
        <stop offset="1" stopColor={green} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function Setting({ id, progress, reducedMotion }: IllustrationProps) {
  const animation = useIllustrationMotion({ progress, reducedMotion });
  return (
    <g>
      <circle cx="210" cy="190" r="165" fill={`url(#${id}-halo)`} />
      <circle cx="210" cy="190" r="146" stroke={green} strokeOpacity=".14" />
      <circle cx="210" cy="190" r="108" stroke="var(--ink)" strokeOpacity=".06" strokeDasharray="3 6" />
      <motion.g style={{ rotate: animation.orbit, originX: "210px", originY: "190px" }}>
        <path d="M70 162a143 143 0 0 1 260-45M350 218a143 143 0 0 1-260 45" stroke={green} strokeOpacity=".24" strokeDasharray="2 9" />
        <circle cx="71" cy="162" r="3.5" fill={green} fillOpacity=".75" />
        <circle cx="350" cy="218" r="3.5" fill={green} fillOpacity=".75" />
      </motion.g>
      <motion.path d="M67 190a143 143 0 0 1 286 0" stroke={green} strokeWidth="1.5" strokeOpacity=".45" strokeLinecap="round" style={{ pathLength: animation.draw }} />
      <path d="M46 190h9m310 0h9M210 23v9m0 316v9" stroke="var(--ink)" strokeOpacity=".18" />
      <ellipse cx="210" cy="326" rx="94" ry="11" fill="#000000" fillOpacity=".12" />
    </g>
  );
}

function ClinicIllustration({ id, progress, reducedMotion }: IllustrationProps) {
  const animation = useIllustrationMotion({ progress, reducedMotion });
  return (
    <g>
      <motion.g filter={`url(#${id}-elev)`} style={{ rotate: animation.rotate, y: animation.drift, originX: "210px", originY: "190px" }}>
        <path d="M208 100c-35-30-80-24-92 18-12 40 18 68 25 104 7 37 12 75 29 77 19 1 17-63 38-63s19 64 38 63c17-2 23-40 29-77 7-36 37-64 25-104-12-42-57-48-92-18Z" fill={`url(#${id}-enamel)`} stroke="#8CA392" strokeWidth="1.5" />
        <path d="M148 102c-21 3-27 24-22 44M144 220c7 21 10 47 17 56" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeOpacity=".82" />
        <path d="M171 88c14 1 26 7 37 13 11 6 20 6 29 2" stroke="#86A08D" strokeWidth="2" strokeLinecap="round" />
        <path d="M264 110c20 14 21 34 14 51" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity=".7" />
        <path d="M210 236c-9-12-15-18-16-33" stroke="#A5B9AA" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
      <motion.rect x="75" y="0" width="270" height="2" rx="1" fill={`url(#${id}-scan)`} style={{ y: animation.scan, opacity: animation.scanOpacity }} />
      <motion.g style={{ opacity: animation.reveal, y: animation.rise }}>
        <path d="m296 81 5 14 14 5-14 5-5 14-5-14-14-5 14-5Z" fill={green} />
        <path d="m102 242 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill={green} fillOpacity=".65" />
        <g transform="translate(277 254)" filter={`url(#${id}-elev)`}>
          <rect width="46" height="46" rx="14" fill={forest} stroke="#385A47" strokeWidth="1" />
          <rect x="2" y="2" width="42" height="42" rx="12" stroke={green} strokeOpacity=".55" />
          <motion.path d="m14 23 6 6 13-14" stroke={mineral} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: animation.draw }} />
        </g>
      </motion.g>
    </g>
  );
}

function StoreIllustration({ id, progress, reducedMotion }: IllustrationProps) {
  const animation = useIllustrationMotion({ progress, reducedMotion });
  const leftSpread = useTransform(progress, [0, 0.22, 0.42, 0.7], [0, -17, -17, 0]);
  const rightSpread = useTransform(progress, [0, 0.22, 0.42, 0.7], [0, 17, 17, 0]);
  return (
    <g>
      <motion.g filter={`url(#${id}-elev)`} style={{ rotate: animation.rotate, originX: "210px", originY: "190px" }}>
        <path d="M118 224v-42c0-66 38-108 92-108s92 42 92 108v42" stroke="#243C30" strokeWidth="26" strokeLinecap="round" />
        <path d="M118 203v-24c0-62 38-104 92-104s92 42 92 104v24" stroke={`url(#${id}-metal)`} strokeWidth="19" strokeLinecap="round" />
        <path d="M137 171c2-43 29-75 73-75s71 32 73 75" stroke="#2A4335" strokeWidth="14" strokeLinecap="round" />
        <path d="M144 124c15-23 36-35 66-35s52 12 67 36" stroke="#F2F5F0" strokeWidth="2.5" strokeLinecap="round" strokeOpacity=".85" />
        <motion.g style={{ x: reducedMotion ? 0 : leftSpread }}>
          <path d="M115 179v53" stroke="#627F6B" strokeWidth="10" strokeLinecap="round" />
          <rect x="104" y="192" width="52" height="107" rx="24" fill={forest} stroke="#385A47" strokeWidth="1" transform="rotate(-8 130 245)" />
          <rect x="95" y="190" width="44" height="106" rx="21" fill={`url(#${id}-dark)`} stroke="#6E8D78" transform="rotate(-8 117 243)" />
          <path d="M108 209c-7 15-4 51 4 68" stroke="#85A38E" strokeWidth="2" strokeLinecap="round" />
          <rect x="136" y="208" width="15" height="73" rx="7.5" fill="#0D1B13" transform="rotate(-8 143 244)" />
        </motion.g>
        <motion.g style={{ x: reducedMotion ? 0 : rightSpread }}>
          <path d="M305 179v53" stroke="#627F6B" strokeWidth="10" strokeLinecap="round" />
          <rect x="264" y="192" width="52" height="107" rx="24" fill={forest} stroke="#385A47" strokeWidth="1" transform="rotate(8 290 245)" />
          <rect x="281" y="190" width="44" height="106" rx="21" fill={`url(#${id}-dark)`} stroke="#6E8D78" transform="rotate(8 303 243)" />
          <path d="M311 209c7 15 4 51-4 68" stroke="#85A38E" strokeWidth="2" strokeLinecap="round" />
          <rect x="269" y="208" width="15" height="73" rx="7.5" fill="#0D1B13" transform="rotate(8 276 244)" />
          <circle cx="307" cy="255" r="2.5" fill={green} />
        </motion.g>
      </motion.g>
      <motion.g style={{ opacity: animation.reveal, y: animation.rise }}>
        <rect x="172" y="228" width="76" height="47" rx="23.5" fill={mineral} stroke="#9BB2A2" filter={`url(#${id}-elev)`} />
        {[12, 22, 30, 20, 12].map((height, index) => (
          <motion.path
            key={index}
            d={`M${190 + index * 10} ${251 - height / 2}v${height}`}
            stroke={green}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: animation.draw }}
          />
        ))}
        <path d="M340 211c9 14 9 35 0 49M349 200c14 21 14 50 0 71M80 211c-9 14-9 35 0 49" stroke={green} strokeWidth="1.5" strokeLinecap="round" strokeOpacity=".65" />
      </motion.g>
    </g>
  );
}

function PropertyIllustration({ id, progress, reducedMotion }: IllustrationProps) {
  const animation = useIllustrationMotion({ progress, reducedMotion });
  const roofY = useTransform(progress, [0, 0.22, 0.42, 0.7], [0, -24, -24, 0]);
  return (
    <g filter={`url(#${id}-elev)`}>
      <path d="m70 284 143-64 143 66-144 65Z" fill="#B9CCBC" fillOpacity=".65" />
      <path d="m70 284 142 65v7L70 291Z" fill="#93AA98" />
      <path d="m212 349 144-63v7l-144 63Z" fill="#7A9581" />
      <motion.g style={{ y: animation.spread }}>
        <path d="m107 167 100 43v116l-100-45Z" fill="#C4D0C2" />
        <path d="m207 210 102-46v115l-102 47Z" fill={`url(#${id}-enamel)`} />
        <path d="m111 169 96-44 98 41-98 44Z" fill="#F6F6EC" />
        <path d="m221 224 73-33v67l-73 34Z" fill={`url(#${id}-glass)`} />
        <path d="M246 213v67m23-78v67m-48-12 73-34" stroke="#A1B6A5" strokeWidth="2" />
        <path d="m221 224 20-9-20 40Zm48-22 25-11-25 45Z" fill="#CEE0CF" fillOpacity=".16" />
        <path d="m123 194 25 11v50l-25-11Z" fill="#45654D" />
        <path d="m159 210 25 11v50l-25-11Z" fill="#45654D" />
        <path d="m125 197 21 9m-21 8 21 9m-21 8 21 9m15-27 21 9m-21 8 21 9m-21 8 21 9" stroke="#94AA92" strokeWidth="1.5" />
      </motion.g>
      <motion.g style={{ y: reducedMotion ? 0 : roofY }}>
        <path d="m137 116 71 31v65l-71-31Z" fill="#DBE0D4" />
        <path d="m208 147 73-34v66l-73 33Z" fill="#B6C7B3" />
        <path d="m128 111 79-36 83 36-82 38Z" fill="#F2F3E9" />
        <path d="m128 111 80 38v10l-80-37Z" fill="#AFBFAB" />
        <path d="m208 149 82-38v10l-82 38Z" fill="#7D997F" />
        <path d="m225 154 39-18v32l-39 18Z" fill={`url(#${id}-glass)`} />
        <path d="M245 145v32" stroke="#ABBFA9" strokeWidth="2" />
        <path d="m151 138 39 17v31l-39-17Z" fill="#54745B" />
        <path d="m150 128 40 18" stroke="#F8FAF2" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
      <g>
        <path d="M89 277v-33m241 50v-34" stroke="#627F62" strokeWidth="3" />
        <ellipse cx="89" cy="236" rx="15" ry="22" fill="#6F9475" />
        <ellipse cx="84" cy="232" rx="10" ry="17" fill="#91AE8F" />
        <ellipse cx="330" cy="251" rx="14" ry="21" fill="#638C6B" />
        <ellipse cx="326" cy="247" rx="9" ry="16" fill="#88A886" />
      </g>
      <motion.g style={{ opacity: animation.reveal, y: animation.rise }}>
        <path d="m246 297 29-13 25 12-28 13Z" fill={mineral} />
        <path d="m249 305 23 10 27-12" stroke="#91A88F" strokeWidth="2" />
        <path d="M322 107c0 15-19 31-19 31s-19-16-19-31a19 19 0 1 1 38 0Z" fill={forest} stroke="#3E614E" strokeWidth="1.2" />
        <circle cx="303" cy="107" r="6" fill={green} />
        <motion.path d="m75 306 137 61 144-65" stroke={green} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 5" style={{ pathLength: animation.draw }} />
      </motion.g>
    </g>
  );
}

function CompanyIllustration({ id, progress, reducedMotion }: IllustrationProps) {
  const animation = useIllustrationMotion({ progress, reducedMotion });
  return (
    <g>
      <motion.path d="M94 143v-36h73m158 122v53h-64M87 246v40h77" stroke={green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 5" style={{ pathLength: animation.draw }} />
      <motion.g filter={`url(#${id}-elev)`} style={{ x: animation.drift, y: animation.drift, rotate: animation.rotate, originX: "210px", originY: "190px" }}>
        <rect x="116" y="79" width="168" height="214" rx="13" fill="#A6BAAA" stroke="#8CA592" transform="rotate(-9 200 186)" />
        <rect x="137" y="94" width="168" height="214" rx="13" fill="#C4D2C5" stroke="#A1B8A8" transform="rotate(5 221 201)" />
        <rect x="130" y="88" width="164" height="218" rx="13" fill={`url(#${id}-paper)`} stroke="#A7BCAA" />
        <path d="M131 104c0-8 6-15 14-15h134c8 0 14 7 14 15v34H131Z" fill={forest} />
        <rect x="149" y="105" width="25" height="17" rx="4" fill="#395E46" />
        <path d="m155 114 4 3 8-8" stroke="#D6E3D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M187 108h86m-86 10h52" stroke="#A4BDAA" strokeWidth="3" strokeLinecap="round" />
        <path d="M150 159h77m-77 12h121" stroke="#6D8B73" strokeWidth="4" strokeLinecap="round" />
        <path d="M150 181h100" stroke="#AFBFAE" strokeWidth="3" strokeLinecap="round" />
        <rect x="150" y="202" width="124" height="59" rx="7" fill="#D5E0D4" />
        <path d="M162 243v-12m16 12v-19m16 19v-15m16 15v-27m16 27v-21m16 21v-32m16 32v-38" stroke="#8AA58E" strokeWidth="7" strokeLinecap="round" />
        <motion.path d="m161 226 17-9 16 5 16-16 16 7 16-15 17-7" stroke={green} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: animation.draw }} />
        <path d="M151 282h54" stroke="#9FB39F" strokeWidth="3" strokeLinecap="round" />
        <rect x="230" y="274" width="44" height="15" rx="7.5" fill={green} />
      </motion.g>
      <motion.g style={{ opacity: animation.reveal, y: animation.rise }}>
        <g transform="translate(57 134)" filter={`url(#${id}-elev)`}>
          <rect width="66" height="69" rx="18" fill={forest} stroke="#5E7C65" strokeWidth="1.2" />
          <circle cx="33" cy="25" r="9" fill="#AFC7B2" />
          <path d="M18 52c0-10 6-16 15-16s15 6 15 16" fill="#AFC7B2" />
        </g>
        <g transform="translate(291 198)" filter={`url(#${id}-elev)`}>
          <rect width="64" height="64" rx="20" fill={green} />
          <rect x="6" y="6" width="52" height="52" rx="15" stroke="#E4E8E3" strokeOpacity=".35" />
          <motion.path d="m19 32 9 9 18-20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: animation.draw }} />
        </g>
        <circle cx="87" cy="246" r="6" fill={green} />
        <circle cx="167" cy="107" r="4" fill={green} />
      </motion.g>
    </g>
  );
}

export function SectorVisual({
  sector,
  progress,
  reducedMotion,
}: VisualProps & { sector: SectorId }) {
  const id = `sector-${useId().replace(/:/g, "")}`;
  const props = { id, progress, reducedMotion };

  return (
    <svg
      viewBox="0 0 420 380"
      width="100%"
      height="100%"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", overflow: "visible" }}
    >
      <IllustrationDefs id={id} />
      <Setting {...props} />
      {sector === "clinic" && <ClinicIllustration {...props} />}
      {sector === "store" && <StoreIllustration {...props} />}
      {sector === "property" && <PropertyIllustration {...props} />}
      {sector === "company" && <CompanyIllustration {...props} />}
    </svg>
  );
}
