/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* muted green-gray */
        input: 'var(--color-input)', /* pure white */
        ring: 'var(--color-ring)', /* deep forest green */
        background: 'var(--color-background)', /* soft off-white */
        foreground: 'var(--color-foreground)', /* dark green-tinted gray */
        primary: {
          DEFAULT: 'var(--color-primary)', /* deep forest green */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* vibrant sage */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* earthy red */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* very light green-gray */
          foreground: 'var(--color-muted-foreground)', /* muted green-gray */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* warm amber */
          foreground: 'var(--color-accent-foreground)', /* white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* pure white */
          foreground: 'var(--color-popover-foreground)', /* dark green-tinted gray */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* pure white */
          foreground: 'var(--color-card-foreground)', /* dark green-tinted gray */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* fresh green */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* golden orange */
          foreground: 'var(--color-warning-foreground)', /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* earthy red */
          foreground: 'var(--color-error-foreground)', /* white */
        },
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(45, 90, 39, 0.08)',
        'soft-lg': '0 4px 16px rgba(45, 90, 39, 0.12)',
      },
      animation: {
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-gentle': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.8',
          },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}