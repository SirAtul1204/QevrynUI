import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import axe from 'axe-core';
import { Alert, AlertClose, AlertDescription, AlertTitle, Button, ThemeProvider, Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, useToast, type ToastId } from '../src';

const notifications = () => [...document.querySelectorAll<HTMLElement>('.q-toast')];
function ManagedDemo() {
  const { toast, dismiss } = useToast();
  const [first, setFirst] = useState<ToastId>();
  const [third, setThird] = useState<ToastId>();
  return <><Button onClick={() => { setFirst(toast({ title: 'First', variant: 'success', duration: Infinity })); toast({ title: 'Second', variant: 'warning', duration: Infinity }); setThird(toast({ title: 'Third', variant: 'error', duration: Infinity })); }}>Enqueue</Button><Button onClick={() => dismiss(first)}>Dismiss first</Button><Button onClick={() => dismiss(third)}>Dismiss third</Button><Button onClick={() => dismiss()}>Clear</Button></>;
}

describe('alerts and notifications', () => {
  it('uses assertive error alerts and polite statuses, with severity conveyed in text', () => {
    render(<><Alert variant="error"><AlertTitle>Failed</AlertTitle></Alert><Alert variant="success"><AlertTitle>Saved</AlertTitle></Alert><Alert variant="warning"><AlertTitle>Almost full</AlertTitle></Alert><Alert><AlertDescription>New module</AlertDescription></Alert></>);
    expect(screen.getByRole('alert')).toHaveTextContent('Error: Failed');
    expect(screen.getAllByRole('status')).toHaveLength(3);
    expect(screen.getAllByRole('status')[1]).toHaveTextContent('Warning: Almost full');
  });
  it('forwards refs and dismisses an alert without submitting its containing form', async () => {
    const ref = createRef<HTMLDivElement>();
    const submit = vi.fn();
    function Demo() { const [open, setOpen] = useState(true); return <form onSubmit={submit}>{open && <Alert ref={ref} icon={false}><AlertTitle>Maintenance</AlertTitle><AlertClose onClick={() => setOpen(false)} /></Alert>}</form>; }
    render(<Demo />);
    expect(ref.current).toBe(screen.getByRole('status'));
    expect(document.querySelector('.q-message-icon')).toBeNull();
    await userEvent.setup().click(screen.getByRole('button', { name: 'Dismiss alert' }));
    expect(screen.queryByRole('status')).toBeNull();
    expect(submit).not.toHaveBeenCalled();
  });
  it('queues additional managed messages and promotes them after dismissal', async () => {
    render(<ThemeProvider><ToastProvider maxVisible={2}><ManagedDemo /></ToastProvider></ThemeProvider>);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Enqueue' }));
    await waitFor(() => expect(notifications()).toHaveLength(2));
    expect(notifications().map(item => item.querySelector('.q-message-title')?.textContent)).toEqual(['First', 'Second']);
    await user.click(screen.getByRole('button', { name: 'Dismiss first' }));
    await waitFor(() => expect(notifications().map(item => item.querySelector('.q-message-title')?.textContent)).toEqual(['Second', 'Third']));
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(notifications()).toHaveLength(0);
  });
  it('can dismiss a queued message before it becomes visible', async () => {
    render(<ToastProvider maxVisible={1}><ManagedDemo /></ToastProvider>);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Enqueue' }));
    await user.click(screen.getByRole('button', { name: 'Dismiss third' }));
    await user.click(screen.getByRole('button', { name: 'Dismiss first' }));
    await waitFor(() => expect(notifications()).toHaveLength(1));
    expect(notifications()[0]).toHaveTextContent('Second');
    await user.click(within(notifications()[0]!).getByRole('button', { name: 'Dismiss notification' }));
    expect(notifications()).toHaveLength(0);
  });
  it('supports controlled roots, labeled actions, and polite announcements without stealing focus', async () => {
    const action = vi.fn();
    const change = vi.fn();
    const ref = createRef<HTMLLIElement>();
    render(<ThemeProvider theme="light"><ToastProvider><Button>Trigger</Button><Toast ref={ref} open onOpenChange={change} variant="success" duration={Infinity}><ToastTitle>Archived</ToastTitle><ToastDescription>Module archived</ToastDescription><ToastAction altText="Restore the module" onClick={action}>Undo</ToastAction><ToastClose /></Toast></ToastProvider></ThemeProvider>);
    await waitFor(() => expect(ref.current).not.toBeNull());
    expect(ref.current?.closest('.q-theme')).toHaveAttribute('data-theme', 'light');
    screen.getByRole('button', { name: 'Trigger' }).focus();
    await waitFor(() => expect(document.querySelector('[aria-live="polite"]')).toHaveTextContent('Archived'));
    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveFocus();
    await userEvent.setup().click(within(ref.current!).getByRole('button', { name: 'Undo' }));
    expect(action).toHaveBeenCalledOnce();
    expect(change).toHaveBeenCalledWith(false);
  });
  it('expires a toast and lets the next queued notification start its own timer', async () => {
    function TimerDemo() { const { toast } = useToast(); return <Button onClick={() => { toast({ title: 'Temporary', duration: 100 }); toast({ title: 'Next', duration: Infinity }); }}>Notify</Button>; }
    render(<ToastProvider maxVisible={1}><TimerDemo /></ToastProvider>);
    await userEvent.setup().click(screen.getByRole('button', { name: 'Notify' }));
    await waitFor(() => expect(notifications()[0]).toHaveTextContent('Temporary'));
    await waitFor(() => expect(notifications()[0]).toHaveTextContent('Next'));
    expect(notifications()).toHaveLength(1);
  });
  it('supports custom viewports and Escape dismissal', async () => {
    const change = vi.fn();
    render(<ToastProvider viewport={false}><Toast open duration={Infinity} onOpenChange={change}><ToastTitle>Custom placement</ToastTitle><ToastClose /></Toast><ToastViewport position="top-left" label="Notifications ({hotkey})" /></ToastProvider>);
    await waitFor(() => expect(notifications()).toHaveLength(1));
    expect(document.querySelectorAll('.q-toast-viewport')).toHaveLength(1);
    within(notifications()[0]!).getByRole('button').focus();
    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
    expect(change).toHaveBeenCalledWith(false);
  });
  it('has no structural accessibility violations with alerts and an actionable toast', async () => {
    render(<ThemeProvider><Alert variant="warning"><AlertTitle>Storage warning</AlertTitle><AlertDescription>Space is limited.</AlertDescription><AlertClose /></Alert><ToastProvider><Toast duration={Infinity}><ToastTitle>Archived</ToastTitle><ToastAction altText="Restore the module">Undo</ToastAction><ToastClose /></Toast></ToastProvider></ThemeProvider>);
    await waitFor(() => expect(notifications()).toHaveLength(1));
    const result = await axe.run(document.body, { rules: { 'color-contrast': { enabled: false }, region: { enabled: false } } });
    expect(result.violations).toEqual([]);
  });
  it('renders server markup and rejects invalid provider configuration', () => {
    expect(renderToString(<ThemeProvider><ToastProvider><Alert><AlertTitle>Server message</AlertTitle></Alert></ToastProvider></ThemeProvider>)).toContain('Server message');
    expect(() => renderToString(<ToastProvider maxVisible={0} />)).toThrow(RangeError);
  });
});
