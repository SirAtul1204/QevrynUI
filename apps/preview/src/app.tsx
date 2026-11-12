import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Copy, Layers, Moon, Package, Palette, SlidersHorizontal, Sparkles, Sun } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Input, Label, Link, Select, Separator, Switch, Textarea, ThemeProvider, type Theme } from '@qevryn/ui';
import '@qevryn/ui/styles.css';
import { EssentialControls } from './essential-controls';
import { LayoutControls } from './layout-controls';
import { ToastProvider, useToast, type ToastPosition } from '@qevryn/ui';
import { NotificationControls } from './notification-controls';
import { OverlayControls } from './overlay-controls';
import { TooltipProvider } from '@qevryn/ui';

const groups = [
  { id: 'buttons', name: 'Buttons & links' },
  { id: 'forms', name: 'Form controls' },
  { id: 'selection', name: 'Selection' },
  { id: 'surfaces', name: 'Cards & badges' },
  { id: 'accordion', name: 'Accordion' },
  { id: 'essentials', name: 'Radios, dropdowns & chips' },
  { id: 'layouts', name: 'Responsive layouts' },
  { id: 'notifications', name: 'Alerts & toasts' },
  { id: 'overlays', name: 'Dialog, drawer & tooltip' },
];
function Section({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return <section id={id} className="showcase-section"><div className="section-heading"><h2>{title}</h2><p>{description}</p></div>{children}</section>;
}

export function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [position, setPosition] = useState<ToastPosition>('bottom-right');
  return <ThemeProvider theme={theme} className="preview-shell"><TooltipProvider><ToastProvider position={position}><Showcase theme={theme} onThemeChange={setTheme} position={position} onPositionChange={setPosition} /></ToastProvider></TooltipProvider></ThemeProvider>;
}
function Showcase({ theme, onThemeChange, position, onPositionChange }: { theme: Theme; onThemeChange: (theme: Theme) => void; position: ToastPosition; onPositionChange: (position: ToastPosition) => void }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const setFeedback = (title: string) => toast({ title, variant: 'success' });
  const [copied, setCopied] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setFeedback(`Created “${data.get('name')}” in ${data.get('environment')}.`);
  }
  async function copyInstall() {
    try { await navigator.clipboard.writeText('pnpm pack:ui'); setCopied(true); }
    catch { setFeedback('Package command: pnpm pack:ui'); }
  }
  return (
    <>
      <header className="topbar"><a className="brand" href="#top"><span className="brand-icon"><Layers size={19} /></span>qevryn<span className="brand-ui">/ ui</span></a><div className="topbar-actions"><Badge variant="neutral">v0.1.0</Badge><Button variant="ghost" size="sm" onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}{theme === 'dark' ? 'Light mode' : 'Dark mode'}</Button></div></header>
      <div className="page-layout">
        <aside className="sidebar"><div className="nav-heading">FOUNDATIONS</div><nav aria-label="Component sections">{groups.map(group => <a href={`#${group.id}`} key={group.id}>{group.name}<ArrowUpRight size={13} /></a>)}</nav><Separator /><div className="sidebar-note"><span className="status-dot" />Prism Satin<span>Dark first. Built to compose.</span></div></aside>
        <main id="top">
          <section className="hero"><div className="eyebrow"><Sparkles size={14} />PRISM SATIN</div><h1>A little future.<br /><span>A lot of possibility.</span></h1><p>Matte plum surfaces. Purple-pink energy. Thoughtful React components for the things you’re building next.</p><div className="hero-actions"><Button onClick={() => document.getElementById('buttons')?.scrollIntoView({ behavior: 'auto' })}>Explore components <ArrowDown size={15} /></Button><button type="button" className="install-command" onClick={copyInstall} aria-label="Copy pnpm pack:ui command"><code>pnpm pack:ui</code>{copied ? <Check size={15} /> : <Copy size={15} />}</button></div><div className="hero-meta">TypeScript <span>·</span> React <span>·</span> Tailwind CSS <span>·</span> Dark & light</div></section>
          <Separator />
          <Section id="buttons" title="Actions, with intention." description="One visual language, from the primary action to the quietest link.">
            <div className="demo-surface"><div className="sample-label">APPEARANCES</div><div className="samples"><Button onClick={() => setFeedback('Satin action selected.')}>Satin <ArrowUpRight size={15} /></Button><Button variant="solid" onClick={() => setFeedback('Solid action selected.')}>Solid</Button><Button variant="outline" onClick={() => setFeedback('Outline action selected.')}>Outline</Button><Button variant="ghost" onClick={() => setFeedback('Ghost action selected.')}>Ghost</Button><Button variant="danger" onClick={() => setFeedback('Danger action selected.')}>Danger</Button></div><Separator /><div className="sample-label">SIZES & STATES</div><div className="samples"><Button size="sm">Small</Button><Button>Default</Button><Button size="lg">Large</Button><Button disabled>Disabled</Button><Button loading={loading} onClick={() => setLoading(true)}>Loading demo</Button>{loading && <Button size="sm" variant="ghost" onClick={() => setLoading(false)}>Reset</Button>}</div><div className="samples links"><Link href="#forms">Explore forms <ArrowRight size={14} /></Link><Link variant="underline" href="#surfaces">View surfaces</Link><Link variant="muted" href="#accordion">More details</Link></div></div>
          </Section>
          <Section id="forms" title="Make room for the details." description="Native form controls, clear labels, and visible focus states.">
            <div className="two-columns"><Card><form onSubmit={submit}><CardHeader><CardTitle>Create a workspace</CardTitle><CardDescription>A place to bring your next idea together.</CardDescription></CardHeader><CardContent className="field-stack"><div><Label htmlFor="project-name">Project name</Label><Input id="project-name" name="name" defaultValue="Stellar workspace" required /></div><div><Label htmlFor="environment">Environment</Label><Select id="environment" name="environment" defaultValue="Development"><option>Development</option><option>Production</option><option>Staging</option></Select></div><div><Label htmlFor="description">Description</Label><Textarea id="description" name="description" rows={3} placeholder="What are you building?" /></div></CardContent><CardFooter><Button type="submit">Create project <ArrowUpRight size={15} /></Button><Button type="reset" variant="ghost">Reset</Button></CardFooter></form></Card><div className="demo-surface field-stack"><div className="sample-label">FIELD STATES</div><div><Label htmlFor="default-field">Default</Label><Input id="default-field" placeholder="Enter your email" /></div><div><Label htmlFor="invalid-field">Validation</Label><Input id="invalid-field" defaultValue="stellar@" aria-invalid="true" aria-describedby="email-error" /><p className="field-error" id="email-error">Enter a complete email address.</p></div><div><Label htmlFor="disabled-field">Disabled</Label><Input id="disabled-field" value="Read-only environment" disabled /></div><div><Label htmlFor="readonly-field">Read only</Label><Input id="readonly-field" value="qevryn-ui" readOnly /></div></div></div>
          </Section>
          <Section id="selection" title="Small controls. Clear choices." description="Checkboxes for selection and switches for an immediate preference."><div className="two-columns"><div className="demo-surface"><div className="sample-label">CHECKBOX</div><label className="selection-row"><Checkbox defaultChecked name="updates" />Product updates</label><label className="selection-row"><Checkbox />Private workspace</label><label className="selection-row muted"><Checkbox disabled />Unavailable preference</label></div><div className="demo-surface"><div className="sample-label">SWITCH</div><div className="preference-row"><div><Label htmlFor="notifications">Notifications</Label><span className="muted small">Project activity and new releases</span></div><Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} /></div><Separator /><div className="preference-row"><Label htmlFor="disabled-switch" className="muted">Unavailable preference</Label><Switch id="disabled-switch" disabled /></div></div></div></Section>
          <Section id="surfaces" title="A foundation for bigger ideas." description="Compose cards from headers, content, and actions. Add just enough emphasis."><div className="samples badge-row"><Badge>Satin</Badge><Badge variant="neutral">Draft</Badge><Badge variant="success">Connected</Badge><Badge variant="danger">Needs attention</Badge><Badge variant="outline">Outline</Badge></div><div className="two-columns"><Card variant="elevated"><CardHeader><div className="workspace-icon"><Layers size={22} /></div><CardTitle>Stellar workspace</CardTitle><CardDescription>Your next idea starts here.</CardDescription></CardHeader><CardContent><div className="samples"><Badge variant="success">Connected</Badge><span className="small muted">Personal workspace</span></div></CardContent><CardFooter><Button onClick={() => setFeedback('Workspace opened.')}>Open workspace <ArrowRight size={15} /></Button></CardFooter></Card><Card variant="outline"><CardHeader><CardTitle>Keep it subtle</CardTitle><CardDescription>An outline surface for secondary content.</CardDescription></CardHeader><CardContent><p className="muted small">Use the same building blocks with a quieter appearance. Your layout stays consistent as emphasis changes.</p></CardContent><CardFooter><Link href="#accordion">See how components compose <ArrowRight size={14} /></Link></CardFooter></Card></div></Section>
          <Section id="accordion" title="Details, brought into focus." description="One connected Satin surface, with luminous accents on the expanded row.">
            <Accordion type="single" collapsible defaultValue="install">
              <AccordionItem value="install">
                <AccordionTrigger icon={<Package size={18} />}>How do I use Qevryn in another project?</AccordionTrigger>
                <AccordionContent>Install the local package, import <code>@qevryn/ui/styles.css</code>, and wrap your components in <code>ThemeProvider</code>. The README includes the full setup.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="theme">
                <AccordionTrigger icon={<Palette size={18} />}>Does it support light mode?</AccordionTrigger>
                <AccordionContent>Yes. Set the provider’s theme to dark, light, or system. Each boundary has its own scoped colors, so you can preview both themes in the same app.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="customize">
                <AccordionTrigger icon={<SlidersHorizontal size={18} />}>Can I customize the components?</AccordionTrigger>
                <AccordionContent>Choose typed variants and sizes, pass native React props and refs, and add classes. Theme colors can be changed with the public CSS variables.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>
          <EssentialControls />
          <LayoutControls />
          <NotificationControls position={position} onPositionChange={onPositionChange} />
          <OverlayControls />
          <footer className="page-footer"><span>qevryn / ui</span><span>Prism Satin · Foundations</span></footer>
        </main>
      </div>
    </>
  );
}
