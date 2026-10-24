"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryImage = { src: string; alt: string; width: number; height: number; caption?: string; category?: string };

/** Responsive photo grid with optional category filter and a keyboard-accessible lightbox. */
export function ImageGallery({ images, showFilter = true }: { images: GalleryImage[]; showFilter?: boolean }) {
  const cats = Array.from(new Set(images.map((i) => i.category).filter(Boolean))) as string[];
  const [filter, setFilter] = useState<string>("All");
  const list = filter === "All" ? images : images.filter((i) => i.category === filter);
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const open = (i: number) => { setIndex(i); dialog.current?.showModal(); };
  const close = () => { dialog.current?.close(); };
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    el.addEventListener("keydown", onKey);
    el.addEventListener("close", onClose);
    return () => { el.removeEventListener("keydown", onKey); el.removeEventListener("close", onClose); };
  }, [step]);

  if (images.length === 0) return null;
  const current = index !== null ? list[index] : null;

  return (
    <div>
      {showFilter && cats.length > 1 && (
        <div role="group" aria-label="Filter photos" className="mb-6 flex flex-wrap gap-2">
          {["All", ...cats].map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${filter === c ? "border-primary bg-primary text-white" : "border-line text-body hover:border-primary hover:text-primary"}`}>
              {c}
            </button>
          ))}
        </div>
      )}
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {list.map((img, i) => (
          <li key={img.src} className="min-w-0">
            <button type="button" onClick={() => open(i)} className="group block w-full overflow-hidden rounded-brand bg-bg-alt text-left">
              <span className="relative block aspect-[4/3]">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
              </span>
              {img.caption && <span className="block px-1 pt-2 text-sm text-body">{img.caption}</span>}
              <span className="sr-only">Open larger photo</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} aria-label="Photo viewer"
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-bg-dark/90"
        onClick={(e) => { if (e.target === dialog.current) close(); }}>
        {current && (
          <div className="flex h-[100dvh] w-screen flex-col items-center justify-center gap-3 p-4">
            <div className="relative h-[78dvh] w-full max-w-5xl">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <p className="text-center text-sm text-on-dark">{current.caption ?? current.alt} · {index! + 1} / {list.length}</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => step(-1)} className="inline-flex size-11 items-center justify-center rounded-full bg-on-dark/15 text-on-dark hover:bg-on-dark/25">
                <ChevronLeft aria-hidden /><span className="sr-only">Previous photo</span>
              </button>
              <button type="button" onClick={close} className="inline-flex size-11 items-center justify-center rounded-full bg-on-dark/15 text-on-dark hover:bg-on-dark/25">
                <X aria-hidden /><span className="sr-only">Close</span>
              </button>
              <button type="button" onClick={() => step(1)} className="inline-flex size-11 items-center justify-center rounded-full bg-on-dark/15 text-on-dark hover:bg-on-dark/25">
                <ChevronRight aria-hidden /><span className="sr-only">Next photo</span>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
