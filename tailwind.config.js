const withMT = require('@material-tailwind/react/utils/withMT');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: colors.cyan[300],
                scondary: colors.rose[300],
                error: colors.red[500],
                success: colors.green[500],
            },
        },
    },
    plugins: [],
});
