"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDesignMd = parseDesignMd;
exports.generateTailwindConfig = generateTailwindConfig;
exports.generateCSSVariables = generateCSSVariables;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const yaml = __importStar(require("js-yaml"));
function resolveRefs(obj, tokens) {
    if (typeof obj === 'string') {
        const match = obj.match(/\{(\w+)\.(\w+)\}/);
        if (match) {
            const [, category, key] = match;
            return tokens[category]?.[key] ?? obj;
        }
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => resolveRefs(item, tokens));
    }
    if (obj && typeof obj === 'object') {
        const resolved = {};
        for (const [key, value] of Object.entries(obj)) {
            resolved[key] = resolveRefs(value, tokens);
        }
        return resolved;
    }
    return obj;
}
function parseDesignMd(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontMatterMatch) {
        throw new Error('No front matter found in DESIGN.md');
    }
    const yamlContent = frontMatterMatch[1];
    const parsed = yaml.load(yamlContent);
    // Resolve references in components
    const resolvedComponents = {};
    for (const [key, component] of Object.entries(parsed.components)) {
        resolvedComponents[key] = resolveRefs(component, parsed);
    }
    return {
        ...parsed,
        components: resolvedComponents,
    };
}
function generateTailwindConfig(tokens) {
    const config = {
        content: [],
        theme: {
            extend: {
                colors: {
                    primary: tokens.colors.primary,
                    'on-primary': tokens.colors['on-primary'],
                    ink: tokens.colors.ink,
                    'ink-deep': tokens.colors['ink-deep'],
                    charcoal: tokens.colors.charcoal,
                    body: tokens.colors.body,
                    mute: tokens.colors.mute,
                    canvas: tokens.colors.canvas,
                    'canvas-soft': tokens.colors['canvas-soft'],
                    'surface-card': tokens.colors['surface-card'],
                    hairline: tokens.colors.hairline,
                    'hairline-strong': tokens.colors['hairline-strong'],
                    'on-dark': tokens.colors['on-dark'],
                    'on-dark-mute': tokens.colors['on-dark-mute'],
                    'surface-dark': tokens.colors['surface-dark'],
                    'focus-ring': tokens.colors['focus-ring'],
                    link: tokens.colors.link,
                    'link-mute': tokens.colors['link-mute'],
                    success: tokens.colors.success,
                    'success-soft': tokens.colors['success-soft'],
                    error: tokens.colors.error,
                    'error-soft': tokens.colors['error-soft'],
                    warning: tokens.colors.warning,
                    'warning-soft': tokens.colors['warning-soft'],
                },
                fontFamily: {
                    display: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
                    body: ['system-ui', '-apple-system', 'sans-serif'],
                    mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
                },
                fontSize: {
                    'display-xl': ['36px', { lineHeight: '1.11', letterSpacing: '-0.02em', fontWeight: '600' }],
                    'display-lg': ['30px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
                    'heading-lg': ['24px', { lineHeight: '1.33', letterSpacing: '-0.01em', fontWeight: '600' }],
                    'heading-md': ['20px', { lineHeight: '1.4', fontWeight: '500' }],
                    'heading-sm': ['18px', { lineHeight: '1.56', fontWeight: '500' }],
                    'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
                    'body-strong': ['16px', { lineHeight: '1.5', fontWeight: '500' }],
                    'body-sm': ['14px', { lineHeight: '1.43', fontWeight: '400' }],
                    'body-sm-strong': ['14px', { lineHeight: '1.43', fontWeight: '500' }],
                    'caption-sm': ['12px', { lineHeight: '1.33', fontWeight: '400' }],
                    'code-md': ['16px', { lineHeight: '1.5', fontWeight: '400', fontFamily: 'var(--font-mono)' }],
                    'code-sm': ['14px', { lineHeight: '1.43', fontWeight: '400', fontFamily: 'var(--font-mono)' }],
                    'button-md': ['14px', { lineHeight: '1', fontWeight: '500' }],
                },
                borderRadius: {
                    none: '0px',
                    sm: '6px',
                    md: '8px',
                    lg: '12px',
                    full: '9999px',
                    pill: '9999px',
                    card: '12px',
                },
                spacing: {
                    xxs: '2px',
                    xs: '4px',
                    sm: '8px',
                    md: '12px',
                    lg: '16px',
                    xl: '24px',
                    xxl: '32px',
                    section: '88px',
                },
                boxShadow: {
                    'focus-ring': '0 0 0 2px rgba(59,130,246,0.5)',
                },
                transitionDuration: {
                    'fast': '150ms',
                    'normal': '200ms',
                },
                transitionTimingFunction: {
                    'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
                },
            },
        },
        plugins: [],
    };
    return `/** @type {import('tailwindcss').Config} */\n${JSON.stringify(config, null, 2)}`;
}
function generateCSSVariables(tokens) {
    const lines = [':root {'];
    // Colors
    for (const [key, value] of Object.entries(tokens.colors)) {
        lines.push(`  --color-${key}: ${value};`);
    }
    // Spacing
    for (const [key, value] of Object.entries(tokens.spacing)) {
        lines.push(`  --spacing-${key}: ${value};`);
    }
    // Border radius
    for (const [key, value] of Object.entries(tokens.rounded)) {
        lines.push(`  --rounded-${key}: ${value};`);
    }
    lines.push('}');
    // Dark mode
    lines.push('');
    lines.push('.dark {');
    lines.push('  --color-canvas: #0a0a0a;');
    lines.push('  --color-canvas-soft: #171717;');
    lines.push('  --color-ink: #ffffff;');
    lines.push('  --color-body: #a3a3a3;');
    lines.push('  --color-hairline: #272727;');
    lines.push('  --color-surface-dark: #ffffff;');
    lines.push('  --color-on-dark: #000000;');
    lines.push('}');
    return lines.join('\n');
}
function isMainModule() {
    return require.main === module;
}
if (isMainModule()) {
    const designMdPath = path.resolve(process.cwd(), '../../DESIGN.md');
    const tokens = parseDesignMd(designMdPath);
    const tailwindConfig = generateTailwindConfig(tokens);
    const cssVariables = generateCSSVariables(tokens);
    fs.writeFileSync(path.resolve(process.cwd(), 'tailwind.config.generated.js'), tailwindConfig);
    fs.writeFileSync(path.resolve(process.cwd(), 'css-variables.generated.css'), cssVariables);
    console.log('Generated tailwind.config.generated.js and css-variables.generated.css');
}
