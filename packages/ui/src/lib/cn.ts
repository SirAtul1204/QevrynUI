import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const merge = extendTailwindMerge({ prefix: 'q' });

/** Merge Qevryn's prefixed Tailwind utilities; consumer classes remain intact. */
export function cn(...inputs: ClassValue[]) {
  return merge(clsx(inputs));
}
