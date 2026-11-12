import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import axe from 'axe-core';
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, Drawer, DrawerContent, DrawerTitle, DrawerTrigger, Input, ThemeProvider, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../src';

describe('overlay contracts', () => {
  it('opens from a native trigger, labels its dialog, traps focus, and restores focus on Escape', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLDivElement>();
    render(<ThemeProvider><Dialog><DialogTrigger asChild><Button>Open editor</Button></DialogTrigger><DialogContent ref={ref}><DialogTitle>Editor</DialogTitle><DialogDescription>Edit details.</DialogDescription><Input aria-label="Name" /><DialogClose asChild><Button>Cancel</Button></DialogClose></DialogContent></Dialog></ThemeProvider>);
    await user.click(screen.getByRole('button', { name: 'Open editor' }));
    const dialog = screen.getByRole('dialog', { name: 'Editor' });
    expect(ref.current).toBe(dialog);
    expect(dialog).toHaveAccessibleDescription('Edit details.');
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveFocus();
    for (let i = 0; i < 5; i++) { await user.tab(); expect(dialog.contains(document.activeElement)).toBe(true); }
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(screen.getByRole('button', { name: 'Open editor' })).toHaveFocus();
  });
  it('allows controlled state, custom close controls, and prevents a close button from submitting', async () => {
    const submit = vi.fn();
    function Demo() { const [open, setOpen] = useState(false); return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><Button>Open</Button></DialogTrigger><DialogContent showClose={false} aria-describedby={undefined}><DialogTitle>Controlled</DialogTitle><form onSubmit={submit}><DialogClose>Close</DialogClose></form></DialogContent></Dialog>; }
    render(<ThemeProvider><Demo /></ThemeProvider>);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.click(screen.getByRole('button', { name: /^Close$/ }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(submit).not.toHaveBeenCalled();
  });
  it('inherits nested themes for drawers and supports all four edge props', async () => {
    const user = userEvent.setup();
    const view = render(<ThemeProvider theme="dark"><ThemeProvider theme="light"><Drawer><DrawerTrigger>Open drawer</DrawerTrigger><DrawerContent side="left" aria-describedby={undefined}><DrawerTitle>Preferences</DrawerTitle></DrawerContent></Drawer></ThemeProvider></ThemeProvider>);
    await user.click(screen.getByRole('button', { name: 'Open drawer' }));
    const panel = screen.getByRole('dialog');
    expect(panel.closest('.q-theme')).toHaveAttribute('data-theme', 'light');
    expect(panel).toHaveAttribute('data-edge', 'left');
    await user.click(within(panel).getByRole('button', { name: 'Close drawer' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    view.unmount();
    expect(document.querySelector('[inert]')).toBeNull();
  });
  it('finds the theme for initially open content even without a trigger', async () => {
    render(<ThemeProvider theme="light"><Dialog defaultOpen><DialogContent aria-describedby={undefined}><DialogTitle>Programmatic</DialogTitle></DialogContent></Dialog></ThemeProvider>);
    await waitFor(() => expect(screen.getByRole('dialog').closest('.q-theme')).toHaveAttribute('data-theme', 'light'));
  });
  it('shows tooltips on focus without moving focus and dismisses them with Escape', async () => {
    const user = userEvent.setup();
    render(<ThemeProvider theme="light"><TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger asChild><Button>Hint</Button></TooltipTrigger><TooltipContent>Helpful details</TooltipContent></Tooltip></TooltipProvider></ThemeProvider>);
    await user.tab();
    await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful details'));
    expect(screen.getByRole('button', { name: 'Hint' })).toHaveFocus();
    expect(document.querySelector('.q-tooltip-content')?.closest('.q-theme')).toHaveAttribute('data-theme', 'light');
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
  });
  it('has no structural accessibility violations with a modal open', async () => {
    render(<ThemeProvider><Dialog defaultOpen><DialogContent><DialogTitle>Editor</DialogTitle><DialogDescription>Edit details.</DialogDescription><Input aria-label="Name" /></DialogContent></Dialog></ThemeProvider>);
    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible());
    const result = await axe.run(document.body, { rules: { 'color-contrast': { enabled: false }, region: { enabled: false } } });
    expect(result.violations).toEqual([]);
  });
  it('renders closed overlay and tooltip triggers on the server', () => {
    expect(renderToString(<ThemeProvider><Dialog><DialogTrigger>Open</DialogTrigger></Dialog><TooltipProvider><Tooltip><TooltipTrigger>Hint</TooltipTrigger><TooltipContent>Details</TooltipContent></Tooltip></TooltipProvider></ThemeProvider>)).toContain('Hint');
  });
});
