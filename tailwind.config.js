/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            height: {
                full: "100vh",
            },
        },
        // -----------color-----------------
        colors: {
            darkBlue: "#11175D",
            customBlack:"#000",
            btnColor:"#5F35F5",
            white:"#fff",
        },
        fontFamily: {
            open: ["Open Sans", "sans-serif"],
            nunito: ["Nunito", "sans-serif"],
        },
    },
    plugins: [],
};
