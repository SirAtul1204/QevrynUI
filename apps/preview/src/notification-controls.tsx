import { useState } from 'react';
import { CheckCircle2, CircleAlert, Info, TriangleAlert } from 'lucide-react';
import { Alert, AlertClose, AlertDescription, AlertTitle, Badge, Button, Grid, HStack, Label, Select, VStack, useToast, type MessageVariant, type ToastId, type ToastPosition } from '@qevryn/ui';

const messages = [
  { variant: 'success' as const, title: 'Workspace deployed', description: 'Your latest changes are live. All systems are connected.', icon: <CheckCircle2 size={16} /> },
  { variant: 'error' as const, title: 'Connection interrupted', description: 'We couldn’t reach the server. Your changes are saved locally.', icon: <CircleAlert size={16} /> },
  { variant: 'warning' as const, title: 'Storage almost full', description: 'You’re using 90% of your storage. Make room before your next upload.', icon: <TriangleAlert size={16} /> },
  { variant: 'info' as const, title: 'A new module is available', description: 'Explore the latest components in your workspace.', icon: <Info size={16} /> },
];
export function NotificationControls({ position, onPositionChange }: { position: ToastPosition; onPositionChange: (position: ToastPosition) => void }) {
  const { toast, dismiss } = useToast();
  const [notice, setNotice] = useState(true);
  const [duration, setDuration] = useState('6000');
  const [lastId, setLastId] = useState<ToastId>();
  const [result, setResult] = useState('');
  function notify(variant: MessageVariant) {
    const message = messages.find(item => item.variant === variant)!;
    setLastId(toast({ variant, title: message.title, description: message.description, duration: duration === 'persistent' ? Infinity : Number(duration) }));
  }
  return <section id="notifications" className="showcase-section">
    <div className="section-heading"><h2>A clear signal, at the right moment.</h2><p>Inline alerts for context. Toasts for timely feedback. Four distinct states, one Satin language.</p></div>
    <VStack gap={6}>
      <div className="demo-surface" id="alert-demo"><div className="sample-label">ALERT / SUCCESS · ERROR · WARNING · INFO</div><VStack gap={3}>{messages.map(message => <Alert key={message.variant} variant={message.variant}><AlertTitle>{message.title}</AlertTitle><AlertDescription>{message.description}</AlertDescription></Alert>)}</VStack></div>
      <div className="demo-surface" id="alert-dismiss-demo"><div className="sample-label">OUTLINE / DISMISSIBLE / CUSTOM ACTION</div>{notice ? <Alert variant="warning" appearance="outline"><AlertTitle>Maintenance window approaching</AlertTitle><AlertDescription>Your workspace will be read-only briefly during the upgrade.</AlertDescription><HStack gap={2} className="notification-actions"><Button size="sm" variant="outline" onClick={() => setResult('Maintenance is scheduled for 02:00 UTC. Your files will remain available.')}>View schedule</Button></HStack><AlertClose aria-label="Dismiss maintenance alert" onClick={() => setNotice(false)} /></Alert> : <Button variant="ghost" onClick={() => setNotice(true)}>Restore maintenance alert</Button>}{result && <p role="status" className="small muted">{result}</p>}</div>
      <div className="demo-surface" id="toast-demo">
        <HStack justify="between"><div className="sample-label">TOAST / LIVE DEMO</div><Badge variant="neutral">F8 to focus</Badge></HStack>
        <p className="small muted notification-help">Try a notification. Hover or focus it to pause the timer. Press Escape or swipe to dismiss. Extra messages queue after three visible toasts.</p>
        <Grid columns={{ base: 1, sm: 2 }} gap={4} className="notification-settings"><div><Label htmlFor="toast-position">Position</Label><Select id="toast-position" value={position} onChange={event => onPositionChange(event.target.value as ToastPosition)}>{['bottom-right', 'bottom-left', 'bottom-center', 'top-right', 'top-left', 'top-center'].map(value => <option key={value} value={value}>{value.split('-').join(' ')}</option>)}</Select></div><div><Label htmlFor="toast-duration">Dismiss after</Label><Select id="toast-duration" value={duration} onChange={event => setDuration(event.target.value)}><option value="6000">6 seconds</option><option value="1500">1.5 seconds (timer demo)</option><option value="persistent">Keep until dismissed</option></Select></div></Grid>
        <HStack gap={3}>{messages.map(message => <Button key={message.variant} variant="outline" onClick={() => notify(message.variant)}>{message.icon}Show {message.variant}</Button>)}</HStack>
        <HStack gap={3} className="notification-actions"><Button size="sm" variant="ghost" onClick={() => setLastId(toast({ variant: 'success', title: 'Module archived', description: 'You can restore this module with Undo.', duration: duration === 'persistent' ? Infinity : Number(duration), action: { label: 'Undo', altText: 'Restore the archived module', onClick: () => { toast({ variant: 'info', title: 'Module restored', description: 'The module is back in your workspace.' }); } } }))}>Try an Undo action</Button><Button size="sm" variant="ghost" disabled={!lastId} onClick={() => dismiss(lastId)}>Dismiss latest</Button><Button size="sm" variant="ghost" onClick={() => dismiss()}>Clear notifications</Button></HStack>
      </div>
    </VStack>
  </section>;
}
