import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, Checkbox, Input, Label, Link, Select, Separator, Switch, ThemeProvider, cn } from '../src';

describe('actions', () => {
  it('defaults to a non-submitting button, forwards refs, and prevents loading clicks', async () => {
    const user = userEvent.setup();
    const click = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    const view = render(<Button ref={ref} onClick={click}>Save</Button>);
    expect(ref.current).toBe(screen.getByRole('button'));
    expect(ref.current).toHaveAttribute('type', 'button');
    await user.click(screen.getByRole('button'));
    expect(click).toHaveBeenCalledTimes(1);
    view.rerender(<Button loading onClick={click}>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    await user.click(screen.getByRole('button'));
    expect(click).toHaveBeenCalledTimes(1);
  });
  it('keeps anchor semantics and protects new-tab links', () => {
    render(<Link href="https://example.com" target="_blank">Documentation</Link>);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
  });
  it('merges prefixed utilities with consumer overrides', () => {
    expect(cn('q:px-4 q:py-2', 'q:px-6')).toBe('q:py-2 q:px-6');
  });
});

describe('form controls', () => {
  it('submits native input, checkbox, select, and switch values', async () => {
    const user = userEvent.setup();
    const submit = vi.fn();
    render(<form aria-label="Project" onSubmit={event => { event.preventDefault(); submit(Object.fromEntries(new FormData(event.currentTarget))); }}>
      <Label htmlFor="name">Name</Label><Input id="name" name="name" defaultValue="Stellar" />
      <Label htmlFor="env">Environment</Label><Select id="env" name="environment"><option value="dev">Development</option><option value="prod">Production</option></Select>
      <label><Checkbox name="private" />Private</label>
      <Label htmlFor="notify">Notifications</Label><Switch id="notify" name="notifications" defaultChecked />
      <Button type="submit">Create</Button>
    </form>);
    await user.selectOptions(screen.getByRole('combobox'), 'prod');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Create' }));
    expect(submit).toHaveBeenCalledWith({ name: 'Stellar', environment: 'prod', private: 'on', notifications: 'on' });
  });
  it('supports controlled keyboard switching and disabled behavior', async () => {
    function Controlled() { const [checked, setChecked] = useState(false); return <Switch aria-label="Notifications" checked={checked} onCheckedChange={setChecked} />; }
    const user = userEvent.setup();
    const view = render(<Controlled />);
    await user.tab();
    await user.keyboard(' ');
    expect(screen.getByRole('switch')).toBeChecked();
    const change = vi.fn();
    view.rerender(<Switch aria-label="Notifications" disabled onCheckedChange={change} />);
    await user.click(screen.getByRole('switch'));
    expect(change).not.toHaveBeenCalled();
  });
});

describe('accordion', () => {
  function Sample({ multiple = false }: { multiple?: boolean }) {
    const items = <><AccordionItem value="one"><AccordionTrigger>First</AccordionTrigger><AccordionContent>First details</AccordionContent></AccordionItem><AccordionItem value="two"><AccordionTrigger>Second</AccordionTrigger><AccordionContent>Second details</AccordionContent></AccordionItem></>;
    return multiple ? <Accordion type="multiple">{items}</Accordion> : <Accordion type="single" collapsible>{items}</Accordion>;
  }
  it('navigates triggers with arrow keys and only opens one item in single mode', async () => {
    const user = userEvent.setup();
    render(<Sample />);
    await user.tab();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'false');
  });
  it('allows multiple items to stay open', async () => {
    const user = userEvent.setup();
    render(<Sample multiple />);
    await user.click(screen.getByRole('button', { name: 'First' }));
    await user.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getAllByRole('button').every(button => button.getAttribute('aria-expanded') === 'true')).toBe(true);
  });
  it('supports externally controlled values', async () => {
    const change = vi.fn();
    const user = userEvent.setup();
    const view = render(<Accordion type="single" value="one" onValueChange={change}><AccordionItem value="one"><AccordionTrigger>First</AccordionTrigger><AccordionContent>Details</AccordionContent></AccordionItem><AccordionItem value="two"><AccordionTrigger>Second</AccordionTrigger><AccordionContent>More</AccordionContent></AccordionItem></Accordion>);
    await user.click(screen.getByRole('button', { name: 'Second' }));
    expect(change).toHaveBeenCalledWith('two');
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
    view.unmount();
  });
});

describe('themes and accessibility', () => {
  it('defaults to dark and scopes nested theme boundaries', () => {
    render(<ThemeProvider data-testid="outer"><ThemeProvider theme="light" data-testid="inner"><Button>Save</Button></ThemeProvider></ThemeProvider>);
    expect(screen.getByTestId('outer')).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByTestId('inner')).toHaveAttribute('data-theme', 'light');
  });
  it('keeps decorative separators out of accessibility roles', () => {
    render(<><Separator /><Separator decorative={false} orientation="vertical" /></>);
    expect(screen.getAllByRole('separator')).toHaveLength(1);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });
  it('has no structural axe violations in a labeled composition', async () => {
    const { container } = render(<ThemeProvider><main><h1>Project settings</h1><Label htmlFor="project">Name</Label><Input id="project" /><label><Checkbox />Private</label><Switch aria-label="Notifications" /><Button>Save</Button><Accordion type="single" collapsible><AccordionItem value="help"><AccordionTrigger headingLevel={2}>Help</AccordionTrigger><AccordionContent>Details</AccordionContent></AccordionItem></Accordion></main></ThemeProvider>);
    const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(result.violations.map(violation => violation.id)).toEqual([]);
  });
});
