module.exports = {
	CategoryNotFoundException(categoryName) {
		this.message = `Category ${categoryName} is not implemented!`;
		this.name = categoryName;
	},
	FilterNotFoundException(filterName) {
		this.message = `Filter ${filterName} is not implemented!`;
		this.name = filterName;
	},
};
