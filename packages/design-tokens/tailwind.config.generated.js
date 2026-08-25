/** @type {import('tailwindcss').Config} */
{
  "content": [],
  "theme": {
    "extend": {
      "colors": {
        "primary": "#000000",
        "on-primary": "#ffffff",
        "ink": "#000000",
        "ink-deep": "#090909",
        "charcoal": "#525252",
        "body": "#737373",
        "mute": "#a3a3a3",
        "canvas": "#ffffff",
        "canvas-soft": "#fafafa",
        "surface-card": "#ffffff",
        "hairline": "#e5e5e5",
        "hairline-strong": "#d4d4d4",
        "on-dark": "#ffffff",
        "on-dark-mute": "rgba(255,255,255,0.7)",
        "surface-dark": "#171717",
        "focus-ring": "rgba(59,130,246,0.5)",
        "link": "#000000",
        "link-mute": "#737373",
        "success": "#27c93f",
        "success-soft": "#dcfce7",
        "error": "#ef4444",
        "error-soft": "#fef2f2",
        "warning": "#f5a623",
        "warning-soft": "#fffbeb"
      },
      "fontFamily": {
        "display": [
          "Geist",
          "system-ui",
          "-apple-system",
          "sans-serif"
        ],
        "body": [
          "system-ui",
          "-apple-system",
          "sans-serif"
        ],
        "mono": [
          "Geist Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace"
        ]
      },
      "fontSize": {
        "display-xl": [
          "36px",
          {
            "lineHeight": "1.11",
            "letterSpacing": "-0.02em",
            "fontWeight": "600"
          }
        ],
        "display-lg": [
          "30px",
          {
            "lineHeight": "1.2",
            "letterSpacing": "-0.02em",
            "fontWeight": "600"
          }
        ],
        "heading-lg": [
          "24px",
          {
            "lineHeight": "1.33",
            "letterSpacing": "-0.01em",
            "fontWeight": "600"
          }
        ],
        "heading-md": [
          "20px",
          {
            "lineHeight": "1.4",
            "fontWeight": "500"
          }
        ],
        "heading-sm": [
          "18px",
          {
            "lineHeight": "1.56",
            "fontWeight": "500"
          }
        ],
        "body-md": [
          "16px",
          {
            "lineHeight": "1.5",
            "fontWeight": "400"
          }
        ],
        "body-strong": [
          "16px",
          {
            "lineHeight": "1.5",
            "fontWeight": "500"
          }
        ],
        "body-sm": [
          "14px",
          {
            "lineHeight": "1.43",
            "fontWeight": "400"
          }
        ],
        "body-sm-strong": [
          "14px",
          {
            "lineHeight": "1.43",
            "fontWeight": "500"
          }
        ],
        "caption-sm": [
          "12px",
          {
            "lineHeight": "1.33",
            "fontWeight": "400"
          }
        ],
        "code-md": [
          "16px",
          {
            "lineHeight": "1.5",
            "fontWeight": "400",
            "fontFamily": "var(--font-mono)"
          }
        ],
        "code-sm": [
          "14px",
          {
            "lineHeight": "1.43",
            "fontWeight": "400",
            "fontFamily": "var(--font-mono)"
          }
        ],
        "button-md": [
          "14px",
          {
            "lineHeight": "1",
            "fontWeight": "500"
          }
        ]
      },
      "borderRadius": {
        "none": "0px",
        "sm": "6px",
        "md": "8px",
        "lg": "12px",
        "full": "9999px",
        "pill": "9999px",
        "card": "12px"
      },
      "spacing": {
        "xxs": "2px",
        "xs": "4px",
        "sm": "8px",
        "md": "12px",
        "lg": "16px",
        "xl": "24px",
        "xxl": "32px",
        "section": "88px"
      },
      "boxShadow": {
        "focus-ring": "0 0 0 2px rgba(59,130,246,0.5)"
      },
      "transitionDuration": {
        "fast": "150ms",
        "normal": "200ms"
      },
      "transitionTimingFunction": {
        "default": "cubic-bezier(0.4, 0, 0.2, 1)"
      }
    }
  },
  "plugins": []
}