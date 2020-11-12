const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
	theme: {
		container: false,
		fontFamily: {
			body: ["Open Sans"],
		},
		colors: {
			gray: colors.gray,
			white: colors.white,
			black: colors.black,
			transparent: colors.transparent,
			red: colors.red,
			green: colors.green,
			yellow: colors.yellow,
			brand: {
				greendark: "#0a4722",
				green: "#24c762",
                green1: "#129c47",
                yellow: "#f5f533",
                yellow1: "#bfbf26",
                yellowdark: "#ffd036",
				gray1: "#34383d",
				gray2: "#40454b",
				gray3: "#acacac",
				gray4: "#f0f0f0",
				grayt: "#3f3f3f",
			},
		},
		extend: {
			boxShadow: {
				select: "rgba(0, 0, 0, 0.3) 0 1px 5px 0",
			},
			height: {
				"250px": "250px",
				"330px": "330px",
				"400px": "400px",
			},
		},
	},
	variants: {},
	plugins: [
        ({ addComponents, theme }) => {
            addComponents({
              ".container": {
                "marginInline": "auto",
                "paddingInline": theme("spacing.4"),
                "width": "100%",
                "margin": "auto",

                // Breakpoints
                "@screen sm": {
                    maxWidth: theme("screens.sm"),
                },
                "@screen md": {
                    maxWidth: theme("screens.md"),
                },
                "@screen lg": {
                    maxWidth: theme("screens.lg"),
                },
              },
            });
          },
    ],
	purge: false,
};
