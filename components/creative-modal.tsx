"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";

export function CreativeModal() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <button className="media-placeholder" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <span className="media-mark"><Play fill="currentColor" /></span>
        <span><small>CREATIVE VIDEO ARCHIVE</small><strong>VIDEO PENDING</strong></span>
        <em>OPEN NOTE</em>
      </button>
      {open && <div className="dialog-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
        <div className="media-dialog" role="dialog" aria-modal="true" aria-labelledby="media-title" onMouseDown={(event) => event.stopPropagation()}>
          <button ref={closeRef} className="dialog-close" onClick={() => setOpen(false)} aria-label="Close creative media dialog"><X /></button>
          <p className="eyebrow">AUTHENTICITY NOTE</p>
          <h3 id="media-title">No substitute footage.</h3>
          <p>Creative video files were not supplied with this build. This slot is intentionally labeled instead of using stock footage or inventing client work.</p>
          <a className="text-link" href="mailto:aslam812943@gmail.com?subject=Portfolio%20creative%20media">SUPPLY MEDIA ↗</a>
        </div>
      </div>}
    </>
  );
}

