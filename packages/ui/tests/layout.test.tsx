import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { AspectRatio, Box, Grid, GridItem, HStack, Stack } from '../src';

describe('layout contracts', () => {
  it('preserves semantic elements, native props, and refs without leaking layout props', () => {
    const ref = createRef<HTMLElement>();
    render(<Stack as="nav" aria-label="Actions" ref={ref} direction={{ md: 'row' }} gap={3}><a href="#first">First</a><a href="#second">Second</a></Stack>);
    const nav = screen.getByRole('navigation');
    expect(ref.current).toBe(nav);
    expect(nav).not.toHaveAttribute('direction');
    expect(nav).not.toHaveAttribute('gap');
    expect(nav.style.getPropertyValue('--q-layout-direction-base')).toBe('column');
    expect(nav.style.getPropertyValue('--q-layout-direction-md')).toBe('row');
    expect(screen.getAllByRole('link').map(link => link.textContent)).toEqual(['First', 'Second']);
  });
  it('removes old responsive values when props change and preserves consumer styles', () => {
    const view = render(<Box data-testid="box" p={{ base: 2, lg: 6 }} style={{ color: 'red' }} />);
    const element = screen.getByTestId('box');
    expect(element.style.getPropertyValue('--q-layout-p-lg')).toBe('1.5rem');
    view.rerender(<Box data-testid="box" p={4} style={{ color: 'red' }} />);
    expect(element.style.getPropertyValue('--q-layout-p-lg')).toBe('');
    expect(element.style.getPropertyValue('--q-layout-p-base')).toBe('1rem');
    expect(element.style.color).toBe('red');
  });
  it('renders responsive layouts on the server without browser globals', () => {
    const markup = renderToString(<Grid minChildWidth="14rem"><GridItem colSpan="full"><HStack><span>First</span><span>Second</span></HStack></GridItem></Grid>);
    expect(markup).toContain('repeat(auto-fit, minmax(min(100%, 14rem), 1fr))');
    expect(markup).toContain('1 / -1');
    expect(markup).toContain('--q-layout-wrap-base:wrap');
  });
  it('rejects invalid aspect ratios before generating invalid CSS', () => {
    expect(() => renderToString(<AspectRatio ratio={0} />)).toThrow(RangeError);
    expect(() => renderToString(<AspectRatio ratio={Infinity} />)).toThrow(RangeError);
  });
});
