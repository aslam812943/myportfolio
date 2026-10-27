"use client";

import { useEffect, useRef, useState } from "react";
import { serviceGroups } from "@/data/site";

function ServiceMarqueeRow({ items, title, index }: { items: string[]; title: string; index: number }) {
  const listRef = useRef<HTMLUListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const track = trackRef.current;
    if (!list || !track) return;

    const matchReferenceSpeed = () => {
      const width = list.getBoundingClientRect().width;
      if (width) track.style.animationDuration = `${width / 55}s`;
    };
    const observer = new ResizeObserver(matchReferenceSpeed);
    observer.observe(list);
    document.fonts.ready.then(matchReferenceSpeed);
    matchReferenceSpeed();
    return () => observer.disconnect();
  }, []);

  return (
    <div className="services-marquee" role={index === 0 ? "region" : undefined} tabIndex={index === 0 ? 0 : undefined} aria-label={index === 0 ? `${title} services: ${items.join(", ")}` : undefined} aria-hidden={index > 0 ? true : undefined}>
      <div className="services-marquee-track" ref={trackRef} style={{ animationDirection: index % 2 ? "reverse" : "normal" }}>
        <ul ref={listRef}>{items.map((item) => <li key={item}>{item}</li>)}</ul>
        <ul aria-hidden="true">{items.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div>
  );
}

export function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = serviceGroups[activeIndex];
  const rows = Array.from({ length: 5 }, (_, index) => {
    const shift = (index * 2) % activeGroup.items.length;
    return [...activeGroup.items.slice(shift), ...activeGroup.items.slice(0, shift)];
  });

  return (
    <div className="services-row">
      <p>WHAT I CAN BUILD FOR YOU</p>
      <div className="services-content">
        <div className="services-tabs" role="group" aria-label="Service categories">
          {serviceGroups.map((group, index) => (
            <button
              key={group.title}
              type="button"
              className="services-tab"
              data-active={activeIndex === index}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            >{group.title}</button>
          ))}
        </div>
        <div className="services-active-panel" key={activeGroup.title} aria-live="polite">
          {rows.map((items, index) => <ServiceMarqueeRow items={items} title={activeGroup.title} index={index} key={index} />)}
        </div>
      </div>
    </div>
  );
}
