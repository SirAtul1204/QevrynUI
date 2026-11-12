import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// jsdom has no layout engine; Radix observes its hidden form control's size.
vi.stubGlobal('ResizeObserver', class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
});
// Pointer capture and scrolling are browser APIs used by Radix Select.
vi.stubGlobal('PointerEvent', class PointerEvent extends MouseEvent {
  pointerId = 1;
  pointerType = 'mouse';
});
HTMLElement.prototype.hasPointerCapture = () => false;
HTMLElement.prototype.setPointerCapture = () => {};
HTMLElement.prototype.releasePointerCapture = () => {};
HTMLElement.prototype.scrollIntoView = () => {};

afterEach(cleanup);
