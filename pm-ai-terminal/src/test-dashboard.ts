import { createCliRenderer, Box, Text } from '@opentui/core';
import { DashboardView } from './views/DashboardView';

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
});

const content = DashboardView(renderer);

renderer.root.add(content);