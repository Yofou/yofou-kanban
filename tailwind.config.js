const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./app/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			purple: {
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
				300: "#FF9898",
				600: "#EA5555",
			},
		},
		fontFamily: {
			"font-jaka": ["'Plus Jakarta Sans'", "sans-serif"],
		},
		boxShadow: {
			"task-shadow": "0px 4px 6px rgba(54, 78, 126, 0.101545)",
		},
	},
	plugins: [
		plugin(({ addComponents }) => {
			addComponents({
				".text-heading-xl": {
					fontWeight: "bold",
					fontSize: "1.5rem",
					lineHeight: "30px",
				},
				".text-heading-l": {
					fontWeight: "bold",
					fontSize: "1.125rem",
					lineHeight: "23px",
				},
				".text-heading-m": {
					fontWeight: "bold",
					fontSize: "0.9375rem",
					lineHeight: "19px",
				},
				".text-heading-s": {
					fontWeight: "bold",
					fontSize: "0.75rem",
					lineHeight: "15px",
				},
				".text-body-l": {
					fontWeight: "500",
					fontSize: "0.8125rem",
					lineHeight: "23px",
				},
				".text-body-m": {
					fontWeight: "bold",
					fontSize: "0.75rem",
					lineHeight: "15px",
				},
			});
		}),
	],
};
