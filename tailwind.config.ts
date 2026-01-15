import type { Config } from 'tailwindcss'

// Adnova Studio Color Palette
// Single source of truth for all colors - update here to change throughout the app
const adnovaColors = {
    // Primary brand colors (Adnova)
    primary: {
        DEFAULT: '#b152e0', // Main brand color - update when official Adnova colors are confirmed
        dark: '#8f3fb8',
        light: '#c87ef0',
        glow: '#b152e0aa', // Primary with alpha for shadows/glows
    },
    // Background colors
    background: '#0a0a0a',
    // Foreground/text colors
    foreground: '#ededed',
    // Card and container colors
    card: '#1a1a1a',
    // Border colors
    border: '#2a2a2a',
    // Muted/secondary text colors
    muted: '#6b7280',
}

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
                background: adnovaColors.background,
                foreground: adnovaColors.foreground,
                primary: adnovaColors.primary,
                card: adnovaColors.card,
                border: adnovaColors.border,
                muted: adnovaColors.muted,
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
                georgia: ['Georgia', 'serif'],
            },
        },
    },
    plugins: [],
}

export default config
