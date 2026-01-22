/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#f2930d",
                "background-light": "#f8f7f5",
                "background-dark": "#221b10",
                "text-light": "#1c160d",
                "text-dark": "#fcfaf8",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            screens: {
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1440px',
            }
        },
    },
    plugins: [],
}
