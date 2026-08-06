import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 6px)',
        sm: 'calc(var(--radius) - 10px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 10px)',
        '3xl': 'calc(var(--radius) + 16px)',
        '4xl': 'calc(var(--radius) + 24px)',
      },
      colors: {
        // OBI.TEC brand palette
        obi: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B',
        },
        // Warm chart tones (bar charts, sparklines) — from reference
        sand: {
          100: '#F3EEE3',
          200: '#EAE1CC',
          300: '#DECBA0',
          400: '#C9AD73',
        },
        // Status accent dots (transaction-style badges)
        status: {
          success: '#16A34A',
          pending: '#DB2777',
          info: '#3B82F6',
        },
        // shadcn CSS variable mapping
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        canvas: 'var(--app-bg)',
        surface: {
          dark: 'var(--surface-dark)',
          'dark-foreground': 'var(--surface-dark-foreground)',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,15,20,0.04), 0 10px 30px -12px rgba(15,15,20,0.10)',
        'card-lg': '0 2px 4px rgba(15,15,20,0.05), 0 24px 48px -16px rgba(15,15,20,0.16)',
        frame: '0 30px 80px -20px rgba(0,0,0,0.35)',
        glow: '0 0 1px rgba(255,255,255,0.4)',
      },
      dropShadow: {
        logo: [
          '0 0 24px rgba(45,212,191,0.55)',
          '0 0 60px rgba(59,130,246,0.35)',
        ],
      },
    },
  },
  plugins: [],
}

export default config
