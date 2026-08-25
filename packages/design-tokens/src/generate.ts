import { parseDesignMd, generateTailwindConfig, generateCSSVariables } from './parse.js';
import * as path from 'path';
import * as fs from 'fs';

const designMdPath = path.resolve(process.cwd(), '../../DESIGN.md');
const tokens = parseDesignMd(designMdPath);

const tailwindConfig = generateTailwindConfig(tokens);
const cssVariables = generateCSSVariables(tokens);

fs.writeFileSync(path.resolve(process.cwd(), 'tailwind.config.generated.js'), tailwindConfig);
fs.writeFileSync(path.resolve(process.cwd(), 'css-variables.generated.css'), cssVariables);

console.log('Generated tailwind.config.generated.js and css-variables.generated.css');