import { flushSync } from "react-dom";
type TransitionHandle = { finished: Promise<void>; skipTransition: () => void };
type TransitionDocument = Document & { startViewTransition?: (update: () => void) => TransitionHandle };
let activeTransition: TransitionHandle | undefined;
export function changeView(update: () => void) {
  const doc = document as TransitionDocument;
  activeTransition?.skipTransition();
  if (window.matchMedia("(min-width: 761px) and (pointer: fine)").matches && doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const current = doc.startViewTransition(() => flushSync(update));
    activeTransition = current;
    current.finished.finally(() => { if (activeTransition === current) activeTransition = undefined; }).catch(() => undefined);
  } else update();
}
