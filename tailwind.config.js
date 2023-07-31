/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                irancell: ["Irancell", "sans-serif"],
                irancellbold: ["Irancell-bold", "sans-serif"],
            },
        },
    },
    plugins: [],
};
