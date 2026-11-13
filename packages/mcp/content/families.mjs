// Curated usage intent and examples. Public symbols and props are generated from UI declarations.
export const families = [
  {
    "id": "button",
    "category": "Actions",
    "title": "Buttons",
    "description": "Primary, secondary, destructive, loading, and icon actions.",
    "exports": [
      "Button",
      "buttonVariants"
    ],
    "imports": [
      "ThemeProvider",
      "Button",
      "buttonVariants",
      "HStack"
    ],
    "body": "<HStack gap={3}><Button variant=\"satin\">Create project</Button><Button variant=\"outline\" size=\"sm\">Cancel</Button><Button loading>Saving</Button><button type=\"button\" className={buttonVariants({ variant: \"ghost\", size: \"sm\" })}>Native action</button></HStack>",
    "guidance": "Use children for icons; put an accessible label on icon-only buttons. Default type is button. Variants: satin, solid, outline, ghost, danger. Sizes: sm, md, lg.",
    "setup": ""
  },
  {
    "id": "link",
    "category": "Actions",
    "title": "Links",
    "description": "Native anchor navigation with themed variants.",
    "exports": [
      "Link"
    ],
    "imports": [
      "ThemeProvider",
      "Link"
    ],
    "body": "<Link href=\"#overview\" variant=\"underline\">Read overview</Link>",
    "guidance": "Use Link for navigation and Button for actions.",
    "setup": ""
  },
  {
    "id": "form",
    "category": "Forms",
    "title": "Native forms",
    "description": "Text inputs, textareas, native selects, labels, and checkboxes.",
    "exports": [
      "Input",
      "Textarea",
      "Select",
      "Label",
      "Checkbox",
      "CheckboxGroup"
    ],
    "imports": [
      "ThemeProvider",
      "Input",
      "Textarea",
      "Select",
      "Label",
      "Checkbox",
      "CheckboxGroup",
      "VStack"
    ],
    "body": "<VStack gap={4}><div><Label htmlFor=\"name\">Project name</Label><Input id=\"name\" name=\"name\" required /></div><div><Label htmlFor=\"notes\">Notes</Label><Textarea id=\"notes\" /></div><div><Label htmlFor=\"environment\">Environment</Label><Select id=\"environment\" defaultValue=\"dev\"><option value=\"dev\">Development</option><option value=\"prod\">Production</option></Select></div><CheckboxGroup label=\"Updates\"><label><Checkbox name=\"updates\" defaultChecked /> Release notes</label><label><Checkbox indeterminate /> All categories</label></CheckboxGroup></VStack>",
    "guidance": "Label every field; wire helper/errors with aria-describedby and invalid fields with aria-invalid. Checkbox uses native checked/onChange, not onCheckedChange. Indeterminate is a separate prop.",
    "setup": ""
  },
  {
    "id": "radio-group",
    "category": "Forms",
    "title": "Radio groups",
    "description": "Single-choice options, controlled or uncontrolled, with native form values.",
    "exports": [
      "RadioGroup",
      "RadioGroupItem"
    ],
    "imports": [
      "ThemeProvider",
      "RadioGroup",
      "RadioGroupItem"
    ],
    "body": "<RadioGroup name=\"plan\" defaultValue=\"team\" aria-label=\"Plan\"><label><RadioGroupItem value=\"personal\" /> Personal</label><label><RadioGroupItem value=\"team\" /> Team</label></RadioGroup>",
    "guidance": "Give the group a name and accessible label. Label each item. Controlled values use onValueChange.",
    "setup": ""
  },
  {
    "id": "switch",
    "category": "Forms",
    "title": "Switches",
    "description": "Immediate on/off preferences.",
    "exports": [
      "Switch"
    ],
    "imports": [
      "ThemeProvider",
      "Switch",
      "Label",
      "HStack"
    ],
    "body": "<HStack><Label htmlFor=\"notifications\">Notifications</Label><Switch id=\"notifications\" defaultChecked /></HStack>",
    "guidance": "Use checked/onCheckedChange for controlled state, not native onChange.",
    "setup": ""
  },
  {
    "id": "dropdown",
    "category": "Forms",
    "title": "Dropdown selects",
    "description": "Themed single-value select with grouping, disabled items, and typeahead.",
    "exports": [
      "Dropdown",
      "DropdownTrigger",
      "DropdownValue",
      "DropdownContent",
      "DropdownItem",
      "DropdownGroup",
      "DropdownLabel",
      "DropdownSeparator"
    ],
    "imports": [
      "ThemeProvider",
      "Dropdown",
      "DropdownTrigger",
      "DropdownValue",
      "DropdownContent",
      "DropdownItem",
      "DropdownGroup",
      "DropdownLabel",
      "DropdownSeparator"
    ],
    "body": "<Dropdown name=\"region\" defaultValue=\"global\"><DropdownTrigger aria-label=\"Deployment region\"><DropdownValue placeholder=\"Choose a region\" /></DropdownTrigger><DropdownContent><DropdownGroup><DropdownLabel>Regions</DropdownLabel><DropdownItem value=\"global\">Global</DropdownItem><DropdownItem value=\"india\">India</DropdownItem></DropdownGroup><DropdownSeparator /><DropdownItem value=\"private\" disabled>Private cloud</DropdownItem></DropdownContent></Dropdown>",
    "guidance": "This selects a value; it is not an action menu or a searchable combobox. Use native Select when platform controls are preferred.",
    "setup": ""
  },
  {
    "id": "chip",
    "category": "Display",
    "title": "Chips",
    "description": "Display tags, controlled toggle filters, and removable tags.",
    "exports": [
      "Chip",
      "ChipButton",
      "ChipRemoveButton"
    ],
    "imports": [
      "ThemeProvider",
      "Chip",
      "ChipButton",
      "ChipRemoveButton",
      "HStack"
    ],
    "body": "<HStack><Chip>TypeScript<ChipRemoveButton aria-label=\"Remove TypeScript\" onClick={() => {}} /></Chip><ChipButton selected={true} onClick={() => {}}>React</ChipButton><Chip variant=\"outline\" size=\"sm\">Draft</Chip></HStack>",
    "guidance": "ChipButton is a controlled toggle with selected; provide application state in real apps. Put ChipRemoveButton inside Chip, never inside ChipButton. A remove button needs an accessible label and application removal logic.",
    "setup": ""
  },
  {
    "id": "badge",
    "category": "Display",
    "title": "Badges",
    "description": "Compact status labels.",
    "exports": [
      "Badge"
    ],
    "imports": [
      "ThemeProvider",
      "Badge",
      "HStack"
    ],
    "body": "<HStack><Badge>New</Badge><Badge variant=\"success\">Connected</Badge><Badge variant=\"danger\">Needs attention</Badge></HStack>",
    "guidance": "Variants: satin, neutral, success, danger, outline. Badge is not interactive.",
    "setup": ""
  },
  {
    "id": "card",
    "category": "Surfaces",
    "title": "Cards",
    "description": "Composable content surfaces.",
    "exports": [
      "Card",
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardFooter"
    ],
    "imports": [
      "ThemeProvider",
      "Card",
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardFooter",
      "Button"
    ],
    "body": "<Card variant=\"elevated\"><CardHeader><CardTitle>Stellar workspace</CardTitle><CardDescription>Your next idea starts here.</CardDescription></CardHeader><CardContent>24 active modules</CardContent><CardFooter><Button>Open workspace</Button></CardFooter></Card>",
    "guidance": "Variants: satin, elevated, outline. Compose semantic headings as needed; do not make the entire card interactive when it contains independent controls.",
    "setup": ""
  },
  {
    "id": "separator",
    "category": "Layout",
    "title": "Separators",
    "description": "Dividers between related content.",
    "exports": [
      "Separator"
    ],
    "imports": [
      "ThemeProvider",
      "Separator"
    ],
    "body": "<div>Overview<Separator />Details</div>",
    "guidance": "Use orientation for horizontal/vertical dividers. Check the declaration for supported native props.",
    "setup": ""
  },
  {
    "id": "accordion",
    "category": "Disclosure",
    "title": "Accordions",
    "description": "Connected expandable rows with themed accents.",
    "exports": [
      "Accordion",
      "AccordionItem",
      "AccordionTrigger",
      "AccordionContent"
    ],
    "imports": [
      "ThemeProvider",
      "Accordion",
      "AccordionItem",
      "AccordionTrigger",
      "AccordionContent"
    ],
    "body": "<Accordion type=\"single\" collapsible defaultValue=\"install\"><AccordionItem value=\"install\"><AccordionTrigger>How do I install Qevryn?</AccordionTrigger><AccordionContent>Install @qevryn/ui, import the CSS, and use ThemeProvider.</AccordionContent></AccordionItem><AccordionItem value=\"theme\"><AccordionTrigger>Can I use light mode?</AccordionTrigger><AccordionContent>Set the provider theme to light or system.</AccordionContent></AccordionItem></Accordion>",
    "guidance": "Single mode uses string value; multiple mode uses string arrays. Each item needs a unique value. Triggers support icon and headingLevel.",
    "setup": ""
  },
  {
    "id": "layout",
    "category": "Layout",
    "title": "Responsive layouts",
    "description": "Horizontal rows, vertical stacks, grids, spans, centering, and page constraints.",
    "exports": [
      "Box",
      "Flex",
      "Stack",
      "HStack",
      "VStack",
      "Grid",
      "GridItem",
      "Container",
      "Center",
      "Spacer",
      "AspectRatio"
    ],
    "imports": [
      "ThemeProvider",
      "Box",
      "Flex",
      "Stack",
      "HStack",
      "VStack",
      "Grid",
      "GridItem",
      "Container",
      "Center",
      "Spacer",
      "AspectRatio",
      "Card"
    ],
    "body": "<Container maxWidth=\"xl\" gutter={{ base: 4, md: 8 }}><Stack direction={{ base: \"column\", md: \"row\" }}><Box p={3}>Summary</Box><Spacer /><HStack><span>Actions</span></HStack></Stack><Grid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}><GridItem colSpan={{ base: 1, lg: 2 }}><Card>Featured module</Card></GridItem><VStack><Card>Details</Card></VStack><GridItem colSpan=\"full\"><Flex justify=\"between\"><span>Status</span><span>Ready</span></Flex></GridItem></Grid><AspectRatio ratio={16 / 9}><Center style={{ height: \"100%\" }}>Media placeholder</Center></AspectRatio></Container>",
    "guidance": "Mobile-first responsive props use base/sm/md/lg/xl/2xl at 640/768/1024/1280/1536px. Spacing 1 = .25rem; tokens 0–12,16,20,24. HStack wraps by default. Grid accepts columns OR minChildWidth, never both. Responsive spans must fit the parent columns.",
    "setup": ""
  },
  {
    "id": "theme-provider",
    "category": "Theming",
    "title": "Themes",
    "description": "Scoped dark, light, and system themes with customizable CSS tokens.",
    "exports": [
      "ThemeProvider"
    ],
    "imports": [
      "ThemeProvider"
    ],
    "body": "<div style={{ background: \"var(--qv-canvas)\", padding: \"1rem\" }}>Prism Satin defaults to dark.</div>",
    "guidance": "Import @qevryn/ui/styles.css once. ThemeProvider wraps components and owns scoped tokens; use dark/light/system. The canvas background is opt-in.",
    "setup": ""
  },
  {
    "id": "alert",
    "category": "Feedback",
    "title": "Alerts",
    "description": "Inline success, error, warning, and info messages.",
    "exports": [
      "Alert",
      "AlertTitle",
      "AlertDescription",
      "AlertClose"
    ],
    "imports": [
      "ThemeProvider",
      "Alert",
      "AlertTitle",
      "AlertDescription",
      "AlertClose"
    ],
    "body": "<Alert variant=\"warning\"><AlertTitle>Storage almost full</AlertTitle><AlertDescription>Make room before your next upload.</AlertDescription><AlertClose aria-label=\"Dismiss storage warning\" onClick={() => {}} /></Alert>",
    "guidance": "Application state removes dismissed alerts; AlertClose does not hide its parent automatically. Errors default to assertive alert; other severities use polite status. Appearance: satin or outline.",
    "setup": ""
  },
  {
    "id": "toast",
    "category": "Feedback",
    "title": "Toast notifications",
    "description": "Queued transient messages with optional actions and controlled composition.",
    "exports": [
      "ToastProvider",
      "Toast",
      "ToastTitle",
      "ToastDescription",
      "ToastAction",
      "ToastClose",
      "ToastViewport",
      "useToast"
    ],
    "imports": [
      "ThemeProvider",
      "ToastProvider",
      "useToast",
      "Button"
    ],
    "body": "<ToastProvider><NotifyButton /></ToastProvider>",
    "guidance": "Place ToastProvider inside ThemeProvider. It includes its viewport; do not add another unless viewport=false. useToast returns toast(options) and dismiss(id?). Root type is announcement priority (background/foreground); severity is variant. MaxVisible queues managed messages. Infinity keeps a toast open.",
    "setup": "function NotifyButton() { const { toast } = useToast(); return <Button onClick={() => toast({ variant: \"success\", title: \"Workspace saved\", description: \"Your latest changes are ready.\" })}>Save workspace</Button>; }"
  },
  {
    "id": "dialog",
    "category": "Overlays",
    "title": "Dialogs",
    "description": "Focused modal tasks with automatic themed portal, backdrop, and close button.",
    "exports": [
      "Dialog",
      "DialogTrigger",
      "DialogContent",
      "DialogOverlay",
      "DialogClose",
      "DialogHeader",
      "DialogBody",
      "DialogFooter",
      "DialogTitle",
      "DialogDescription"
    ],
    "imports": [
      "ThemeProvider",
      "Dialog",
      "DialogTrigger",
      "DialogContent",
      "DialogClose",
      "DialogHeader",
      "DialogBody",
      "DialogFooter",
      "DialogTitle",
      "DialogDescription",
      "Button",
      "Input",
      "Label"
    ],
    "body": "<Dialog><DialogTrigger asChild><Button>Edit workspace</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Edit workspace</DialogTitle><DialogDescription>Update your workspace details.</DialogDescription></DialogHeader><DialogBody><Label htmlFor=\"workspace-name\">Name</Label><Input id=\"workspace-name\" defaultValue=\"Stellar workspace\" /></DialogBody><DialogFooter><DialogClose asChild><Button>Done</Button></DialogClose></DialogFooter></DialogContent></Dialog>",
    "guidance": "Content already creates portal, backdrop and close icon; use overlayProps rather than adding another overlay. Include Title and Description, or set aria-describedby=undefined when omitting Description. Use asChild on Trigger/Close, not Content. Close after successful form save with controlled open state.",
    "setup": ""
  },
  {
    "id": "drawer",
    "category": "Overlays",
    "title": "Drawers",
    "description": "Modal edge panels for preferences and details.",
    "exports": [
      "Drawer",
      "DrawerTrigger",
      "DrawerContent",
      "DrawerClose",
      "DrawerHeader",
      "DrawerBody",
      "DrawerFooter",
      "DrawerTitle",
      "DrawerDescription"
    ],
    "imports": [
      "ThemeProvider",
      "Drawer",
      "DrawerTrigger",
      "DrawerContent",
      "DrawerClose",
      "DrawerHeader",
      "DrawerBody",
      "DrawerFooter",
      "DrawerTitle",
      "DrawerDescription",
      "Button"
    ],
    "body": "<Drawer><DrawerTrigger asChild><Button>Open preferences</Button></DrawerTrigger><DrawerContent side=\"right\" size=\"sm\"><DrawerHeader><DrawerTitle>Preferences</DrawerTitle><DrawerDescription>Tune your workspace.</DrawerDescription></DrawerHeader><DrawerBody>Workspace settings</DrawerBody><DrawerFooter><DrawerClose asChild><Button>Done</Button></DrawerClose></DrawerFooter></DrawerContent></Drawer>",
    "guidance": "Sides: left/right/top/bottom. Default right. Include DrawerTitle. Content handles portal/backdrop. Left/right use full height; top/bottom are content-height capped at 85dvh. No drag gesture API.",
    "setup": ""
  },
  {
    "id": "tooltip",
    "category": "Overlays",
    "title": "Tooltips",
    "description": "Supplementary hints on hover and keyboard focus.",
    "exports": [
      "TooltipProvider",
      "Tooltip",
      "TooltipTrigger",
      "TooltipContent"
    ],
    "imports": [
      "ThemeProvider",
      "TooltipProvider",
      "Tooltip",
      "TooltipTrigger",
      "TooltipContent",
      "Button"
    ],
    "body": "<TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant=\"outline\" aria-label=\"Help\">?</Button></TooltipTrigger><TooltipContent side=\"top\">Keep this hint short and non-interactive.</TooltipContent></Tooltip></TooltipProvider>",
    "guidance": "Provider configures delay (400ms default). Content handles its portal, arrow, and collisions. Provide icon-only trigger names. Essential instructions must remain visible for touch users; no interactive tooltip content.",
    "setup": ""
  },
  {
    "id": "cn",
    "category": "Utilities",
    "title": "Class merging",
    "description": "Merge prefixed Tailwind utilities with overrides.",
    "exports": [
      "cn"
    ],
    "imports": [
      "ThemeProvider",
      "cn"
    ],
    "body": "<div className={cn(\"q:flex\", \"q:gap-3\")}>Compose existing generated utilities.</div>",
    "guidance": "Compiled CSS only contains utilities used by the library. Arbitrary q: utilities need a matching consumer Tailwind configuration; prefer native style/CSS for custom app styling.",
    "setup": ""
  }
];
