import React, { useLayoutEffect } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { normalizeLanguage, selectorFor, visibleLessons, type Lesson, type LessonId } from './lessons';

type MountOptions = {
  host: HTMLElement;
  nav: HTMLElement;
  fallback: HTMLElement;
};
type Mounted = { root: Root; fallback: HTMLElement };
const roots = new WeakMap<HTMLElement, Mounted>();

function nativeButton(nav: HTMLElement, selector: string): HTMLButtonElement | null {
  const button = nav.querySelector<HTMLButtonElement>(selector);
  return button && button.tagName === 'BUTTON' && !button.disabled && !button.hidden ? button : null;
}
function Launcher({ items, nav, fallback }: { items: Lesson[]; nav: HTMLElement; fallback: HTMLElement }) {
  const doc = nav.ownerDocument;
  const language = normalizeLanguage(doc.documentElement.dataset.sikauDisplayLanguage);
  useLayoutEffect(() => {
    fallback.style.display = 'none';
    return () => { fallback.style.removeProperty('display'); };
  }, [fallback]);
  function open(id: LessonId) {
    const selector = selectorFor(id);
    if (selector) nativeButton(nav, selector)?.click();
  }
  return <div className="sikau-launch-grid">
    {items.map(lesson => <button key={lesson.id} type="button" className="sikau-launch-tile" onClick={() => open(lesson.id)}>
      <span className="sikau-launch-icon" aria-hidden="true">{lesson.icon}</span>
      <strong>{lesson.en}</strong>
      {(language === 'en-ne' || language === 'all') && <small lang="ne">{lesson.ne}</small>}
    </button>)}
  </div>;
}
function mount({host,nav,fallback}: MountOptions): boolean {
  if (host.ownerDocument !== nav.ownerDocument || fallback.ownerDocument !== nav.ownerDocument) return false;
  const items = visibleLessons(selector => nativeButton(nav, selector) !== null);
  if (!items.length) return false;
  let mounted = roots.get(host);
  if (!mounted) {
    mounted = {root: createRoot(host), fallback};
    roots.set(host, mounted);
  }
  mounted.root.render(<Launcher items={items} nav={nav} fallback={fallback}/>);
  return true;
}
function unmount(host: HTMLElement) {
  const mounted = roots.get(host);
  if (!mounted) return;
  mounted.root.unmount();
  mounted.fallback.style.removeProperty('display');
  roots.delete(host);
}
declare global {
  interface Window { sikauModernLauncher?: Readonly<{ mount: typeof mount; unmount: typeof unmount }>; }
}
window.sikauModernLauncher = Object.freeze({mount, unmount});
window.dispatchEvent(new Event('sikau-modern-ready'));
