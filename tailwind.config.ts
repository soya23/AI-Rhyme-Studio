import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './App.tsx', './constants.ts'],
    theme: {
        extend: {}
    },
    plugins: []
};

export default config;
