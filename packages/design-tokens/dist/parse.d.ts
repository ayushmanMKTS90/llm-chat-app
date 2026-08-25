export interface DesignTokens {
    colors: Record<string, string>;
    typography: Record<string, TypographyToken>;
    rounded: Record<string, string>;
    spacing: Record<string, string>;
    components: Record<string, ComponentToken>;
}
export interface TypographyToken {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string | number;
    letterSpacing?: string;
}
export interface ComponentToken {
    backgroundColor?: string;
    textColor?: string;
    typography?: string;
    rounded?: string;
    padding?: string;
    height?: string;
    borderColor?: string;
    borderWidth?: string;
    [key: string]: string | undefined;
}
export declare function parseDesignMd(filePath: string): DesignTokens;
export declare function generateTailwindConfig(tokens: DesignTokens): string;
export declare function generateCSSVariables(tokens: DesignTokens): string;
//# sourceMappingURL=parse.d.ts.map