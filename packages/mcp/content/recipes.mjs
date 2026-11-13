export const recipes = [
  {
    name: 'dashboard', title: 'Responsive dashboard', description: 'A page header, metric cards, and a responsive module grid.',
    imports: ['Container', 'Stack', 'HStack', 'Grid', 'Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'Badge', 'Button'],
    body: `<Container as="main" py={8}><Stack gap={6}><HStack justify="between"><h1>Mission control</h1><Button>Create project</Button></HStack><Grid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>{[{ title: 'Active modules', value: '24' }, { title: 'Deployment health', value: 'Stable' }, { title: 'Storage', value: '72%' }].map(item => <Card key={item.title}><CardHeader><Badge variant="success">Connected</Badge><CardTitle>{item.title}</CardTitle><CardDescription>Current workspace</CardDescription></CardHeader><CardContent><strong>{item.value}</strong></CardContent></Card>)}</Grid></Stack></Container>`,
  },
  {
    name: 'settings-form', title: 'Validated settings form', description: 'Native form fields, feedback, and a toast after valid submission.',
    imports: ['Container', 'Card', 'CardHeader', 'CardTitle', 'CardContent', 'CardFooter', 'VStack', 'Label', 'Input', 'Select', 'Button', 'ToastProvider', 'useToast'],
    body: `<ToastProvider><SettingsForm /></ToastProvider>`,
    setup: `function SettingsForm() { const { toast } = useToast(); return <Container maxWidth="sm" py={8}><Card><form onSubmit={event => { event.preventDefault(); toast({ title: 'Settings saved', variant: 'success' }); }}><CardHeader><CardTitle>Workspace settings</CardTitle></CardHeader><CardContent><VStack gap={4}><div><Label htmlFor="project">Project name</Label><Input id="project" name="project" required /></div><div><Label htmlFor="region">Region</Label><Select id="region" name="region"><option value="global">Global</option><option value="india">India</option></Select></div></VStack></CardContent><CardFooter><Button type="submit">Save settings</Button></CardFooter></form></Card></Container>; }`,
  },
  {
    name: 'pricing', title: 'Pricing comparison', description: 'A mobile-first card grid with prominent and secondary actions.',
    imports: ['Container', 'VStack', 'Grid', 'Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter', 'Badge', 'Button'],
    body: `<Container as="main" py={8}><VStack gap={6}><h1>Choose your workspace</h1><Grid columns={{ base: 1, md: 3 }} gap={4}>{['Personal', 'Team', 'Enterprise'].map(plan => <Card key={plan} variant={plan === 'Team' ? 'elevated' : 'outline'}><CardHeader><Badge>{plan === 'Team' ? 'Popular' : 'Plan'}</Badge><CardTitle>{plan}</CardTitle><CardDescription>Build your next idea.</CardDescription></CardHeader><CardContent><ul><li>Reusable components</li><li>Dark and light themes</li></ul></CardContent><CardFooter><Button variant={plan === 'Team' ? 'satin' : 'outline'}>Choose {plan}</Button></CardFooter></Card>)}</Grid></VStack></Container>`,
  },
  {
    name: 'edit-dialog', title: 'Controlled edit dialog', description: 'A labeled modal form that closes only after native validation and submit.',
    imports: ['Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription', 'DialogBody', 'DialogFooter', 'DialogClose', 'Label', 'Input', 'Button'],
    reactImports: ['useState'],
    body: `<EditWorkspace />`,
    setup: `function EditWorkspace() { const [open, setOpen] = useState(false); return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><Button>Edit workspace</Button></DialogTrigger><DialogContent><form className="q:contents" onSubmit={event => { event.preventDefault(); setOpen(false); }}><DialogHeader><DialogTitle>Edit workspace</DialogTitle><DialogDescription>Save your workspace details.</DialogDescription></DialogHeader><DialogBody><Label htmlFor="workspace">Workspace name</Label><Input id="workspace" name="workspace" defaultValue="Stellar" required /></DialogBody><DialogFooter><DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose><Button type="submit">Save</Button></DialogFooter></form></DialogContent></Dialog>; }`,
  },
];
