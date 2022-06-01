module.exports = {
	format_date: (date) => {
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric"
		};

		return date.toLocaleDateString("en-GB", options);
	},

	// make a custom check to see if user is the author of some content (eg blog post)
	if_content_author: function (a, b, options) {
		if (a === b) {
			return options.fn(this);
		}
		return options.inverse(this);
	}
};
