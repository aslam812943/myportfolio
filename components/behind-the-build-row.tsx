"use client";

import { motion } from "motion/react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import type { BuildItem } from "./behind-the-build-items";

type Props = {
  item: BuildItem;
  index: number;
  active: boolean;
  open: boolean;
  reduced: boolean;
  onPreview: (index: number) => void;
  onToggle: (index: number) => void;
  onNavigate: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void;
};

export function BehindTheBuildRow({ item, index, active, open, reduced, onPreview, onToggle, onNavigate }: Props) {
  const selectOnMouse = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse") onPreview(index);
  };
  return (
    <div className="behind-row-wrap" data-active={active} style={{ "--row": index } as CSSProperties}>
      <button
        className="behind-row"
        type="button"
        aria-expanded={open}
        aria-controls={`behind-row-detail-${index}`}
        data-active={active}
        onPointerEnter={selectOnMouse}
        onFocus={() => onPreview(index)}
        onClick={() => onToggle(index)}
        onKeyDown={(event) => onNavigate(event, index)}
      >
        <span className="behind-row-number">{item.n}</span><span className="behind-row-title">{item.title}</span><span className="behind-row-plus" aria-hidden="true">+</span>
      </button>
      {/* Every skill stays visible and readable (and indexable), not only inside the scrolling preview. */}
      <div className="behind-row-detail behind-row-skills">
        <ul aria-label={`${item.title} skills`}>
          {item.tags.map((tag, tagIndex) => <li key={tag} style={{ "--i": tagIndex } as CSSProperties}>{tag}</li>)}
        </ul>
      </div>
      <motion.div id={`behind-row-detail-${index}`} className="behind-row-detail" aria-hidden={!open} initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: reduced ? .15 : .3 }}><p>{item.desc}</p></motion.div>
    </div>
  );
}
