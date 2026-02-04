import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-kanit)", "sans-serif"],
            },
            colors: {
                // Brand Colors (Sporty EV Palette: White/Red/Dark-Blue)
                brand: {
                    primary: '#1E3A8A', // Dark Blue / Blue 900
                    secondary: '#0F172A', // Slate 900
                    accent: '#1E3A8A', // Dark Blue (No Red)
                    'accent-hover': '#172554', // Darker Blue
                },
                // Semantic Text System
                text: {
                    main: '#334155', // Slate 700
                    heading: '#0F172A', // Slate 900
                    muted: '#64748B', // Slate 500
                    light: '#94A3B8', // Slate 400
                    invert: '#FFFFFF',
                    'invert-muted': '#CBD5E1',
                    link: '#0F172A',
                    'link-hover': '#1E3A8A', // Hover to Dark Blue
                },
                // Semantic Backgrounds
                surface: {
                    page: '#F8FAFC', // Slate 50 - Main Background
                    card: '#FFFFFF', // White - Components
                    subtle: '#F1F5F9', // Slate 100 - Secondary Sections
                    dark: '#0F172A', // Slate 900 - Footer / Hero
                },
                slate: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
                gold: {
                    50: '#fbf8eb',
                    100: '#f7eea9',
                    200: '#ead9a8',
                    300: '#dec07a',
                    400: '#d2a651',
                    500: '#cc913b',
                    600: '#ca8a04',
                    700: '#a16207',
                    800: '#744626',
                    900: '#603b24',
                },
            },
        },
    },
    darkMode: "class",
    plugins: [heroui(), require("@tailwindcss/forms")],

};

export default config;
