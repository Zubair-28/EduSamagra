// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Teal/Cyan Primary Palette (Keep this)
                'primary': {
                    '50': '#ecfeff',
                    '100': '#cffafe',
                    '200': '#a5f3fc',
                    '300': '#67e8f9',
                    '400': '#22d3ee',
                    '500': '#06b6d4', // Main primary teal/cyan
                    '600': '#0891b2', // Slightly darker
                    '700': '#0e7490',
                    '800': '#155e75',
                    '900': '#164e63',
                    '950': '#083344',
                },
                // Light Theme Backgrounds & Text ONLY
                'light-bg': '#f8fafc',   // Very light gray background
                'light-card': '#ffffff', // White card background
                'text-main': '#1f2937',  // Dark gray text
                'text-secondary': '#64748b', // Medium gray text
                // Accent Colors (Optional)
                'accent-green': '#10b981',
                'accent-yellow': '#f59e0b',
                'accent-red': '#ef4444',
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: 0, transform: 'translateY(15px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            }
        },
    },
    plugins: [],
}