import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        page: 'var(--surface-page)',
        raised: 'var(--surface-raised)',
        sunken: 'var(--surface-sunken)',
        ink: 'var(--text-primary)',
        muted: 'var(--text-muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'on-accent': 'var(--on-accent)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        text: ['var(--font-text)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        plate: 'var(--radius-plate)',
      },
      minHeight: {
        11: '2.75rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
}

export default config
