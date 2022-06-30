const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			blue: {
				300: "#A8A4FF",
				600: "#635FC7",
			},
			grey: {
				100: "#F4F7FD",
				200: "#E4EBFA",
				300: "#828FA3",
				400: "#3E3F4E",
				500: "#2B2C37",
				600: "#20212C",
				700: "#000112",
			},
			white: "#FFFFFF",
			red: {
				300: "#EA5555",
				600: "#FF9898",
			},
		},
		fontFamily: {
			"font-jaka": ["'Plus Jakarta Sans'", "sans-serif"]
		}
	},
	plugins: [
		plugin(
			({ addComponents }) => {
				addComponents({
					".text-heading-xl": {
						"fontWeight": "bold",
						"fontSize": "1.5rem",
						"lineHeight": "30px",
					},
					".text-heading-l": {
						"fontWeight": "bold",
						"fontSize": "1.125rem",
						"lineHeight": "23px",
					},
					".text-heading-m": {
						"fontWeight": "bold",
						"fontSize": "0.9375rem",
						"lineHeight": "19px",
					},
					".text-heading-s": {
						"fontWeight": "bold",
						"fontSize": "0.75rem",
						"lineHeight": "15px",
					},
					".text-body-l": {
						"fontWeight": "medium",
						"fontSize": "0.8125rem",
						"lineHeight": "23px",
					},
					".text-body-m": {
						"fontWeight": "bold",
						"fontSize": "0.75rem",
						"lineHeight": "15px",
					}
				})
			}
		)
	],
}
