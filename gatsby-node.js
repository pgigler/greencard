/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
require("ts-node").register({ files: true });

exports.createPages = async ({ actions: { createPage }, graphql }) => {

};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
                test: /lit-html/,
                use: loaders.null(),
            },
            {
                test: /dc-components/,
                use: loaders.null(),
            },
          ],
        },
      });
    }
  };

// exports.onCreatePage = async ({ page, actions }) => {
// 	const { createPage } = actions;

// 	// page.matchPath is a special key that's used for matching pages
// 	// only on the client.
// 	if (page.path.match(/^\/ops/)) {
// 		page.matchPath = `/ops/*`;

// 		// Update the page.
// 		createPage(page);
// 	}
// };
