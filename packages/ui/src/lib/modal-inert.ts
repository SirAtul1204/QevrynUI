import { useEffect } from 'react';
/** Mirror Radix's aria-hidden background isolation with native inert. */
export function useModalInert(content: HTMLElement | null, enabled = true) {
  useEffect(() => {
    if (!enabled || !content?.isConnected) return;
    const body = content.ownerDocument.body;
    const changed = new Map<HTMLElement, boolean>();
    const sync = () => {
      for (const [element, previous] of changed) {
        if (element.getAttribute('aria-hidden') !== 'true') { element.inert = previous; changed.delete(element); }
      }
      body.querySelectorAll<HTMLElement>('[aria-hidden="true"]').forEach(element => {
        if (!element.contains(content) && !element.hasAttribute('data-radix-focus-guard') && element.querySelector('a[href],button,input,select,textarea,[tabindex]') && !changed.has(element)) {
          changed.set(element, element.inert);
          element.inert = true;
        }
      });
    };
    const observer = new MutationObserver(sync);
    observer.observe(body, { subtree: true, attributes: true, attributeFilter: ['aria-hidden'] });
    sync();
    return () => { observer.disconnect(); changed.forEach((previous, element) => { element.inert = previous; }); };
  }, [content, enabled]);
}
