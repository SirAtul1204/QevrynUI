import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Button, Checkbox, CheckboxGroup, Chip, ChipButton, ChipRemoveButton, Dropdown, DropdownContent, DropdownItem, DropdownTrigger, DropdownValue, RadioGroup, RadioGroupItem, ThemeProvider } from '../src';

function RegionDropdown({ disabled = false }: { disabled?: boolean }) {
  return <Dropdown name="region" defaultValue="global" disabled={disabled}><DropdownTrigger aria-label="Region"><DropdownValue placeholder="Choose a region" /></DropdownTrigger><DropdownContent><DropdownItem value="global">Global</DropdownItem><DropdownItem value="india">India</DropdownItem><DropdownItem value="private" disabled>Private cloud</DropdownItem></DropdownContent></Dropdown>;
}
describe('essential form controls', () => {
  it('moves radio selection with arrow keys, skips disabled items, and submits the selected value', async () => {
    const user = userEvent.setup();
    const submitted = vi.fn();
    render(<form onSubmit={event => { event.preventDefault(); submitted(new FormData(event.currentTarget).get('plan')); }}><RadioGroup name="plan" defaultValue="personal" aria-label="Plan"><RadioGroupItem value="personal" aria-label="Personal"/><RadioGroupItem value="disabled" disabled aria-label="Unavailable"/><RadioGroupItem value="team" aria-label="Team"/></RadioGroup><Button type="submit">Save</Button></form>);
    await user.tab();
    // Radix schedules roving focus; hold the key until the new item receives focus.
    await user.keyboard('{ArrowDown>}');
    await waitFor(() => expect(screen.getByRole('radio', { name: 'Team' })).toBeChecked());
    await user.keyboard('{/ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Personal' })).not.toBeChecked();
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(submitted).toHaveBeenCalledWith('team');
  });
  it('keeps radio selection controlled by the caller', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(<RadioGroup value="one" onValueChange={change} aria-label="Plan"><RadioGroupItem value="one" aria-label="One"/><RadioGroupItem value="two" aria-label="Two"/></RadioGroup>);
    await user.click(screen.getByRole('radio', { name: 'Two' }));
    expect(change).toHaveBeenCalledWith('two');
    expect(screen.getByRole('radio', { name: 'One' })).toBeChecked();
  });
  it('forwards checkbox refs, exposes mixed state, and transitions into a checked selection', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    function Sample() { const [mixed, setMixed] = useState(true); return <Checkbox ref={ref} aria-label="Select all" indeterminate={mixed} onChange={() => setMixed(false)}/>; }
    render(<Sample/>);
    expect(ref.current).toBe(screen.getByRole('checkbox'));
    expect(ref.current?.indeterminate).toBe(true);
    expect(screen.getByRole('checkbox')).toBePartiallyChecked();
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(ref.current?.indeterminate).toBe(false);
  });
  it('gives checkbox groups a legend and respects disabled fieldsets and native reset', async () => {
    const user = userEvent.setup();
    render(<form><CheckboxGroup label="Updates"><label><Checkbox defaultChecked name="updates"/>Releases</label></CheckboxGroup><CheckboxGroup label="Unavailable" disabled><label><Checkbox/>Private</label></CheckboxGroup><Button type="reset">Reset</Button></form>);
    expect(screen.getByRole('group', { name: 'Updates' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Private' })).toBeDisabled();
    await user.click(screen.getByRole('checkbox', { name: 'Releases' }));
    expect(screen.getByRole('checkbox', { name: 'Releases' })).not.toBeChecked();
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByRole('checkbox', { name: 'Releases' })).toBeChecked();
  });
  it('opens the dropdown from the keyboard, selects a value, and returns focus', async () => {
    const user = userEvent.setup();
    render(<ThemeProvider><RegionDropdown/></ThemeProvider>);
    const trigger = screen.getByRole('combobox');
    await user.tab();
    await user.keyboard('{Enter}');
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{ArrowDown}{Enter}');
    await waitFor(() => expect(trigger).toHaveTextContent('India'));
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  it('keeps dropdown portals inside a nested theme and restores focus on Escape', async () => {
    const user = userEvent.setup();
    render(<ThemeProvider theme="dark"><ThemeProvider theme="light" data-testid="nested-theme"><RegionDropdown/></ThemeProvider></ThemeProvider>);
    await user.click(screen.getByRole('combobox'));
    const listbox = await screen.findByRole('listbox');
    expect(listbox.closest('.q-theme')).toBe(screen.getByTestId('nested-theme'));
    expect(screen.getByRole('option', { name: 'Private cloud' })).toHaveAttribute('aria-disabled', 'true');
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveFocus());
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  it('submits dropdown values and prevents disabled dropdowns from opening', async () => {
    const user = userEvent.setup();
    const submit = vi.fn();
    const view = render(<ThemeProvider><form onSubmit={event => { event.preventDefault(); submit(new FormData(event.currentTarget).get('region')); }}><RegionDropdown/><Button type="submit">Save</Button></form></ThemeProvider>);
    await user.click(screen.getByRole('combobox'));
    await user.click(await screen.findByRole('option', { name: 'India' }));
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(submit).toHaveBeenCalledWith('india');
    view.rerender(<ThemeProvider><RegionDropdown disabled/></ThemeProvider>);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  it('toggles chips with Space and removes tags without submitting their form', async () => {
    const user = userEvent.setup();
    const submit = vi.fn();
    function Sample() { const [selected, setSelected] = useState(false); const [tag, setTag] = useState(true); return <form onSubmit={submit}><ChipButton selected={selected} onClick={() => setSelected(!selected)}>React</ChipButton>{tag && <Chip>TypeScript<ChipRemoveButton aria-label="Remove TypeScript" onClick={() => setTag(false)}/></Chip>}</form>; }
    render(<Sample/>);
    await user.tab();
    await user.keyboard(' ');
    expect(screen.getByRole('button', { name: 'React' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'Remove TypeScript' }));
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
    expect(submit).not.toHaveBeenCalled();
  });
  it('has no structural accessibility violations with a dropdown open', async () => {
    const user = userEvent.setup();
    render(<ThemeProvider><main><h1>Preferences</h1><RadioGroup aria-label="Plan"><RadioGroupItem value="personal" aria-label="Personal"/></RadioGroup><CheckboxGroup label="Updates"><label><Checkbox/>Releases</label></CheckboxGroup><ChipButton selected>React</ChipButton><RegionDropdown/></main></ThemeProvider>);
    await user.click(screen.getByRole('combobox'));
    await screen.findByRole('listbox');
    const result = await axe.run(document.body, { rules: { 'color-contrast': { enabled: false }, region: { enabled: false } } });
    expect(result.violations.map(violation => violation.id)).toEqual([]);
  });
});
