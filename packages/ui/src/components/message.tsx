import type { ReactNode } from 'react';

export type MessageVariant = 'success' | 'error' | 'warning' | 'info';
export type MessageAppearance = 'satin' | 'outline';
export const messageLabels: Record<MessageVariant, string> = { success: 'Success', error: 'Error', warning: 'Warning', info: 'Information' };

/** Small built-in status glyphs; consumers can supply their own icon nodes. */
export function MessageIcon({ variant }: { variant: MessageVariant }) {
  let mark: ReactNode;
  switch (variant) {
    case 'success': mark = <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>; break;
    case 'error': mark = <><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6m0-6-6 6" /></>; break;
    case 'warning': mark = <><path d="M10.3 4.7a2 2 0 0 1 3.4 0l7 12A2 2 0 0 1 19 20H5a2 2 0 0 1-1.7-3.3Z" /><path d="M12 9v4m0 3h.01" /></>; break;
    case 'info': mark = <><circle cx="12" cy="12" r="9" /><path d="M12 11v6m0-10h.01" /></>; break;
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{mark}</svg>;
}
export function MessageCloseIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m6 6 12 12m0-12L6 18" /></svg>;
}
