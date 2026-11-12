import { ArrowUpRight, Layers, Orbit, Radio, Rocket } from 'lucide-react';
import { AspectRatio, Badge, Box, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Center, Chip, Container, Flex, Grid, GridItem, HStack, Spacer, Stack, VStack } from '@qevryn/ui';

export function LayoutControls() {
  return <section id="layouts" className="showcase-section">
    <div className="section-heading"><h2>Give every idea its space.</h2><p>Mobile-first stacks, wrapping rows, and grids. Resize the preview to see each layout adapt.</p></div>
    <VStack gap={6}>
      <Box className="demo-surface" id="layout-stack-demo">
        <div className="sample-label">STACK / COLUMN ON MOBILE, ROW FROM MD</div>
        <Stack id="responsive-stack" direction={{ base: 'column', md: 'row' }} gap={{ base: 3, md: 5 }} align={{ base: 'stretch', md: 'center' }}>
          <Box className="layout-copy"><Badge>Responsive stack</Badge><h3>Launch your next idea.</h3><p className="muted small">Content and actions share a row on larger screens, then stack naturally on your phone.</p></Box>
          <Spacer />
          <HStack gap={3}><Button>Launch <Rocket size={15} /></Button><Button variant="outline">Details <ArrowUpRight size={15} /></Button></HStack>
        </Stack>
        <HStack id="wrapping-row" gap={2} className="layout-chips"><Chip>TypeScript</Chip><Chip>React components</Chip><Chip>Mobile first</Chip><Chip>Dark & light</Chip><Chip>Prism Satin</Chip></HStack>
      </Box>
      <Box className="demo-surface" id="layout-grid-demo">
        <div className="sample-label">GRID / 1 → 2 → 3 COLUMNS</div>
        <Grid id="responsive-grid" columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: 3, md: 4 }}>
          {[{ icon: <Rocket size={20} />, name: 'Launch sequence', detail: 'Everything ready for liftoff.', value: '98%' }, { icon: <Radio size={20} />, name: 'Signal strength', detail: 'Your team stays connected.', value: 'Stable' }, { icon: <Layers size={20} />, name: 'Active modules', detail: 'Small pieces. Bigger possibilities.', value: '24' }].map(item => <Card key={item.name}><CardHeader><HStack justify="between"><span className="layout-icon">{item.icon}</span><Badge variant="neutral">Live</Badge></HStack><CardTitle>{item.name}</CardTitle><CardDescription>{item.detail}</CardDescription></CardHeader><CardContent><strong className="layout-metric">{item.value}</strong></CardContent></Card>)}
        </Grid>
      </Box>
      <Box className="demo-surface" id="layout-compose-demo">
        <div className="sample-label">GRID ITEM / RESPONSIVE SPANS</div>
        <Grid id="spanning-grid" columns={{ base: 1, md: 3 }} gap={4}>
          <GridItem id="featured-grid-item" colSpan={{ base: 1, md: 2 }}><Card className="q:h-full"><CardHeader><Badge>Featured module</Badge><CardTitle>A wider canvas.</CardTitle><CardDescription>This panel spans two columns from md. On mobile, it fits the single-column grid.</CardDescription></CardHeader><CardContent><AspectRatio id="layout-aspect-ratio" ratio={{ base: 2, md: 3 }} className="layout-orbit"><Center className="q:h-full"><Orbit size={46} /><span>Stellar workspace</span></Center></AspectRatio></CardContent></Card></GridItem>
          <GridItem><Card className="q:h-full"><CardHeader><CardTitle>Vertical stack</CardTitle><CardDescription>Consistent space, top to bottom.</CardDescription></CardHeader><CardContent><VStack gap={3}><Box className="layout-step" p={3}>01 / Configure</Box><Box className="layout-step" p={3}>02 / Connect</Box><Box className="layout-step" p={3}>03 / Launch</Box></VStack></CardContent></Card></GridItem>
          <GridItem colSpan="full"><Flex direction={{ base: 'column', sm: 'row' }} justify="between" align={{ base: 'stretch', sm: 'center' }} className="layout-footer" p={4}><span className="small muted">Full-width row, at every breakpoint.</span><Badge variant="success">All systems ready</Badge></Flex></GridItem>
        </Grid>
      </Box>
      <Box className="demo-surface" id="layout-auto-demo">
        <div className="sample-label">AUTO-FIT / MINIMUM CARD WIDTH 12REM</div>
        <Grid id="auto-grid" minChildWidth="12rem" gap={3}>{['Navigation', 'Telemetry', 'Power', 'Comms'].map((name, index) => <Box className="layout-step" p={4} key={name}><VStack gap={2}><span className="small muted">MODULE / 0{index + 1}</span><strong>{name}</strong></VStack></Box>)}</Grid>
      </Box>
      <Box className="demo-surface" id="layout-container-demo">
        <div className="sample-label">CONTAINER / CENTER / BOX</div>
        <Container id="layout-container" maxWidth="sm" gutter={{ base: 3, md: 6 }} className="layout-container-outline"><Center py={6}><VStack gap={2} align="center"><span className="layout-icon"><Layers size={22} /></span><strong>A centered page boundary</strong><span className="small muted">Fluid width · capped at 40rem · responsive gutters</span></VStack></Center></Container>
      </Box>
    </VStack>
  </section>;
}
