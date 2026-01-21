/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                primary: '#ecb613',
                'background-light': '#f8f8f6',
                'background-dark': '#221d10',
                charcoal: '#181611',
            },
            fontFamily: {
                sans: ['"Work Sans"', 'sans-serif'],
            }
        },
	},
	plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
