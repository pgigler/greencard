require("dotenv").config();

const ghpages = require("gh-pages");

ghpages.publish(
	"public",
	{
		branch: "gh-pages",
		repo: `https://${process.env.GH_TOKEN}@github.com/pgigler/tersus.git`,
	},
	(err) => {
		if (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		} else {
			// eslint-disable-next-line no-console
			console.log("deployed successfully");
		}
	}
);

