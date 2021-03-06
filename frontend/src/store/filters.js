import exceptions from '../../global.exceptions';

function searchArchival(item, searchQuery) {
	return item.title?.toLowerCase().includes(searchQuery)
	|| item.repository?.toLowerCase().includes(searchQuery)
	|| item.summary?.toLowerCase().includes(searchQuery)
	|| item.endDate?.toString().includes(searchQuery)
	|| item.startDate?.toString().includes(searchQuery)
	|| item.id?.toString().includes(searchQuery);
}

function search(item, searchQuery) {
	return (Array.isArray(item.title) && item.title.some((x) => x.toLowerCase().includes(searchQuery)))
	|| (Array.isArray(item.location) && item.location.some((x) => x.toLowerCase().includes(searchQuery)))
	|| (Array.isArray(item.artists) && item.artists.some((x) => x.name?.toLowerCase().includes(searchQuery)
			|| x.alternativeName?.toLowerCase().includes(searchQuery)
			|| x.remarks?.toLowerCase().includes(searchQuery)))
	|| item.endDate?.toString().includes(searchQuery)
	|| item.startDate?.toString().includes(searchQuery)
	|| item.id?.toString().includes(searchQuery);
}

const filters = {
	year: (item, { from, to }) => {
		const date = item.sortingDate ? Math.floor(item.sortingDate) : item.startDate;
		return date >= from && date <= to;
	},
	category: (item, { validCategories }) => validCategories.includes(item.type),
	search: (item, searchQuery) => {
		switch (item.type) {
		case 'archival': return searchArchival(item, searchQuery);
		case 'painting':
		case 'graphic': return search(item, searchQuery);
		default: throw new exceptions.CategoryNotFoundException(item.type);
		}
	},
	isBestOf: (item) => item?.isBestOf === true,
	location: (item, { selectedLocations }) => Array.isArray(item.location) && selectedLocations.includes(item.location[0]),
};

export default filters;
