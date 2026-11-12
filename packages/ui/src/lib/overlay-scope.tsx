import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
const Context = createContext<{ container: HTMLElement | null; modal: boolean }>({ container: null, modal: true });
/** Capture the theme even for a controlled overlay without a trigger. */
export function OverlayScope({ children, modal = true }: { children: ReactNode; modal?: boolean }) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const attach = useCallback((node: HTMLDivElement | null) => setContainer(node?.closest<HTMLElement>('.q-theme') ?? null), []);
  return <Context.Provider value={{ container, modal }}><div ref={attach} className="q:contents">{children}</div></Context.Provider>;
}
export const useOverlayScope = () => useContext(Context);
