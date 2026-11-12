import { useState, type FormEvent } from 'react';
import { Check, Code2, Globe, Layers, Lock, Rocket } from 'lucide-react';
import { Button, Checkbox, CheckboxGroup, Chip, ChipButton, ChipRemoveButton, Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownLabel, DropdownSeparator, DropdownTrigger, DropdownValue, Label, RadioGroup, RadioGroupItem } from '@qevryn/ui';

const channels = ['Product updates', 'Release notes', 'Community news'];
export function EssentialControls() {
  const [plan, setPlan] = useState('team');
  const [delivery, setDelivery] = useState('global');
  const [subscriptions, setSubscriptions] = useState<string[]>(['Release notes']);
  const [filters, setFilters] = useState<string[]>(['React']);
  const [tags, setTags] = useState(['TypeScript', 'Prism Satin', 'React']);
  const [result, setResult] = useState('');
  const allChecked = subscriptions.length === channels.length;
  const mixed = subscriptions.length > 0 && !allChecked;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Saved: ${data.get('plan')} plan, ${data.get('region')} region, ${data.getAll('channels').length} subscriptions.`);
  }
  return <section id="essentials" className="showcase-section">
    <div className="section-heading"><h2>Choices with a little more energy.</h2><p>Radio groups, mixed checkboxes, custom dropdowns, and interactive chips.</p></div>
    <form onSubmit={submit} className="essential-grid">
      <div className="demo-surface" id="radio-demo">
        <div className="sample-label">RADIO GROUP / SINGLE CHOICE</div>
        <RadioGroup name="plan" value={plan} onValueChange={setPlan} aria-label="Workspace plan">
          {[{value:'personal',label:'Personal',description:'A space for your own ideas',icon:<Code2 size={18}/>},{value:'team',label:'Team',description:'Build together, in one workspace',icon:<Layers size={18}/>},{value:'enterprise',label:'Enterprise',description:'Coming soon',icon:<Lock size={18}/>,disabled:true}].map(item => <label key={item.value} className="choice-row" data-selected={plan === item.value} data-disabled={item.disabled || undefined}><span className="choice-icon" aria-hidden="true">{item.icon}</span><span className="choice-copy"><span>{item.label}</span><small>{item.description}</small></span><RadioGroupItem value={item.value} disabled={item.disabled} aria-label={item.label}/></label>)}
        </RadioGroup>
      </div>
      <div className="demo-surface" id="checkbox-demo">
        <div className="sample-label">CHECKBOX / MULTIPLE CHOICES</div>
        <CheckboxGroup label="Stay in the loop" description="Select the updates you want to receive." className="q:border-0 q:p-0 q:bg-transparent">
          <label className="selection-row select-all"><Checkbox checked={allChecked} indeterminate={mixed} onChange={event => setSubscriptions(event.target.checked ? channels : [])}/>Select all updates<span className="selection-count">{subscriptions.length}/{channels.length}</span></label>
          {channels.map(channel => <label key={channel} className="selection-row"><Checkbox name="channels" value={channel} checked={subscriptions.includes(channel)} onChange={event => setSubscriptions(current => event.target.checked ? [...current, channel] : current.filter(item => item !== channel))}/>{channel}</label>)}
          <label className="selection-row muted"><Checkbox disabled/>Priority access · unavailable</label>
        </CheckboxGroup>
      </div>
      <div className="demo-surface field-stack" id="dropdown-demo">
        <div className="sample-label">DROPDOWN / THEMED OPTIONS</div>
        <div><Label htmlFor="region-dropdown">Deployment region</Label><Dropdown name="region" value={delivery} onValueChange={setDelivery}><DropdownTrigger id="region-dropdown"><DropdownValue placeholder="Choose a region"/></DropdownTrigger><DropdownContent><DropdownGroup><DropdownLabel>Available regions</DropdownLabel><DropdownItem value="global" icon={<Globe size={16}/>}>Global edge</DropdownItem><DropdownItem value="india" icon={<Rocket size={16}/>}>India · Mumbai</DropdownItem><DropdownItem value="europe" icon={<Globe size={16}/>}>Europe · Frankfurt</DropdownItem></DropdownGroup><DropdownSeparator/><DropdownGroup><DropdownLabel>Coming soon</DropdownLabel><DropdownItem value="private" disabled icon={<Lock size={16}/>}>Private cloud</DropdownItem></DropdownGroup></DropdownContent></Dropdown><p className="small muted">A Satin popup with typeahead and keyboard navigation.</p></div>
        <div><Label htmlFor="empty-dropdown">Placeholder</Label><Dropdown><DropdownTrigger variant="outline" id="empty-dropdown"><DropdownValue placeholder="Choose an environment"/></DropdownTrigger><DropdownContent><DropdownItem value="dev">Development</DropdownItem><DropdownItem value="staging">Staging</DropdownItem><DropdownItem value="prod">Production</DropdownItem></DropdownContent></Dropdown></div>
        <div><Label htmlFor="disabled-dropdown">Disabled</Label><Dropdown disabled><DropdownTrigger id="disabled-dropdown"><DropdownValue placeholder="Unavailable option"/></DropdownTrigger><DropdownContent><DropdownItem value="later">Coming soon</DropdownItem></DropdownContent></Dropdown></div>
      </div>
      <div className="demo-surface" id="chip-demo">
        <div className="sample-label">CHIPS / TAGS & FILTERS</div>
        <div className="chip-label">Display</div><div className="samples"><Chip><Layers size={13} aria-hidden="true"/>Satin</Chip><Chip variant="outline">Outline</Chip><Chip variant="neutral" size="sm">Small</Chip></div>
        <div className="chip-label" id="filters-label">Toggle filters</div><div className="samples" role="group" aria-labelledby="filters-label">{['React','Design','TypeScript'].map(filter => <ChipButton key={filter} selected={filters.includes(filter)} onClick={() => setFilters(current => current.includes(filter) ? current.filter(item => item !== filter) : [...current,filter])}>{filters.includes(filter) && <Check size={13} aria-hidden="true"/>}{filter}</ChipButton>)}<ChipButton disabled>Disabled</ChipButton></div>
        <div className="chip-label" id="tags-label">Removable tags</div><div className="samples" role="group" aria-labelledby="tags-label">{tags.map(tag => <Chip key={tag} variant="neutral">{tag}<ChipRemoveButton aria-label={`Remove ${tag}`} onClick={() => setTags(current => current.filter(item => item !== tag))}/></Chip>)}{tags.length < 3 && <Button size="sm" variant="ghost" onClick={() => setTags(['TypeScript','Prism Satin','React'])}>Restore tags</Button>}</div>
      </div>
      <div className="essential-footer"><Button type="submit">Save preferences <Check size={15}/></Button><span role="status" className="small muted">{result}</span></div>
    </form>
  </section>;
}
