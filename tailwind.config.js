/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Defined in SISTEMA_DISENO.md
                primary: "#10B981", // Emerald-500
                destructive: "#F43F5E", // Rose-500
                accent: "#FBBF24", // Amber-400
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
