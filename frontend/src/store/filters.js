function searchArchival(item, searchQuery) {
	return item.title.toLowerCase().includes(searchQuery)
	|| item.repository.toLowerCase().includes(searchQuery)
	|| item.summary.toLowerCase().includes(searchQuery);
}

function search(item, searchQuery) {
	return item.title.some((x) => x.toLowerCase().includes(searchQuery))
	|| item.artists.some((x) => x.name.toLowerCase().includes(searchQuery) || x.alternativeName.toLowerCase().includes(searchQuery))
	|| item.location.some((x) => x.toLowerCase().includes(searchQuery));
}

function CategoryNotFoundException(categoryName) {
	this.message = `Category ${categoryName} is not implemented!`;
	this.name = categoryName;
}

const filters = {
	year: (item, { from, to }) => item.startDate >= from && item.endDate <= to,
	category: (item, { validCategories }) => validCategories.includes(item.type),
	search: (item, searchQuery) => {
		switch (item.type) {
		case 'archival': return searchArchival(item, searchQuery);
		case 'painting':
		case 'graphic': return search(item, searchQuery);
		default: throw new CategoryNotFoundException(item.type);
		}
	},
};

export default filters;
