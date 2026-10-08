import { flushSync } from "react-dom";
type TransitionHandle = { finished: Promise<void>; skipTransition: () => void };
type TransitionDocument = Document & { startViewTransition?: (update: () => void) => TransitionHandle };
let activeTransition: TransitionHandle | undefined;
export function changeView(update: () => void) {
  const doc = document as TransitionDocument;
  activeTransition?.skipTransition();
  if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const current = doc.startViewTransition(() => flushSync(update));
    activeTransition = current;
    current.finished.finally(() => { if (activeTransition === current) activeTransition = undefined; }).catch(() => undefined);
  } else update();
}
