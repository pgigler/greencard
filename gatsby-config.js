require("ts-node").register({ files: true });

// const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";
// // eslint-disable-next-line no-console
// console.log(`Using environment config: '${activeEnv}'`);

// require("dotenv").config({
// 	path: `.env`,
// });

require("dotenv").config({
	path: `.env${process.env.ENV !== undefined ? `.${process.env.ENV}` : ""}`,
});

module.exports = {
	siteMetadata: {
		title: `Zöldkártya Bt. | Műszaki vizsga és autószerelés`,
		description: `Műszaki vizsga, autószerelés, gumijavítás`,
		author: `Zöldkártya Bt.`,
	},
	pathPrefix: `/greencard`,
	plugins: [
		`gatsby-transformer-json`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/assets/images`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `data`,
				path: `${__dirname}/data`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `cms`,
				path: `${__dirname}/cms`,
				ignore: ["**/assets/**"],
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `cmsimages`,
				path: `${__dirname}/cms/assets`,
			},
		},
		`gatsby-plugin-catch-links`,
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						// options: {
						// 	maxWidth: 800,
						// },
					},
					`remark-image-attributes`,
					`gatsby-remark-image-attributes`,
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `assets/images/greencard-icon.png`, // This path is relative to the root of the site.
                icons: [
                    {
                        src: `favicons/icon-48x48.png`,
                        sizes: `48x48`,
                        type: `image/png`,
                      },
                      {
                        src: `favicons/icon-72x72.png`,
                        sizes: `72x72`,
                        type: `image/png`,
                      },
                      {
                        src: `favicons/icon-96x96.png`,
                        sizes: `96x96`,
                        type: `image/png`,
                      },
                      {
                        src: `favicons/icon-144x144.png`,
                        sizes: `144x144`,
                        type: `image/png`,
                      },
                      {
                        src: `favicons/icon-192x192.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                      },
                      {
                        src: `favicons/icon-256x256.png`,
                        sizes: `256x256`,
                        type: `image/png`,
                      },
                      {
                        src: `favicons/icon-384x384.png`,
                        sizes: `384x384`,
                        type: `image/png`,
                      },
                      {
                        src: `favicons/icon-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                      },
                ],
			},
		},
		`gatsby-plugin-typescript`,
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				postCssPlugins: [require("tailwindcss")],
			},
		},
		{
			resolve: `gatsby-plugin-purgecss`,
			options: {
				printRejected: true,
				develop: false, // Enable while using `gatsby develop`
				tailwind: true, // Enable tailwindcss support
				whitelist: ["duration-1000"],
				whitelistPatterns: [/^notification/],
			},
		},
		// {
		// 	resolve: "gatsby-plugin-netlify-cms",
		// 	options: {
		// 		modulePath: `${__dirname}/src/cms.js`,
		// 	},
		// },
		{
			resolve: `gatsby-plugin-create-client-paths`,
			options: { prefixes: [`/ops/*`] },
        },
        // {
        //     resolve: `gatsby-plugin-google-analytics`,
        //     options: {
        //       The property ID; the tracking code won't be generated without it
        //       trackingId: process.env.GA_ID,
        //       Defines where to place the tracking script - `true` in the head and `false` in the body
        //       head: true,
        //       Setting this parameter is optional
        //       anonymize: true,
        //       Setting this parameter is also optional
        //       respectDNT: true,
        //       Avoids sending pageview hits from custom paths
        //       exclude: ["/preview/**", "/do-not-track/me/too/"],
        //       Delays sending pageview hits on route update (in milliseconds)
        //       pageTransitionDelay: 0,
        //       Enables Google Optimize using your container Id
        //       optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        //       Enables Google Optimize Experiment ID
        //       experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        //       Set Variation ID. 0 for original 1,2,3....
        //       variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        //       Defers execution of google analytics script after page load
        //       defer: false,
        //       Any additional optional fields
        //       sampleRate: 5,
        //       siteSpeedSampleRate: 10,
        //       cookieDomain: "example.com",
        //     },
        //   },
		{
			resolve: "gatsby-plugin-google-tagmanager",
			options: {
				id: process.env.GTM_ID,

				// Include GTM in development.
				//
				// Defaults to false meaning GTM will only be loaded in production.
				includeInDevelopment: process.env.GTM_DEV_MODE && process.env.GTM_DEV_MODE === "true",

				// datalayer to be set before GTM is loaded
				// should be an object or a function that is executed in the browser
				//
				// eslint-disable-next-line object-shorthand
				defaultDataLayer: function () {
					return {
						pageType: window.pageType,
					};
				},

				// Specify optional GTM environment details.
				// gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
				// gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
				// dataLayerName: "YOUR_DATA_LAYER_NAME",

				// Name of the event that is triggered
				// on every Gatsby route change.
				//
				// Defaults to gatsby-route-change
				// routeChangeEventName: "YOUR_ROUTE_CHANGE_EVENT_NAME",
			},
		},
		// {
		// 	resolve: `gatsby-plugin-anchor-links`,
		// 	options: {
		// 		offset: -100,
		// 	},
		// },
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
