const filters = {
	year: (item, { from, to }) => item.startDate >= from && item.endDate <= to,
	category: (item, { validCategories }) => validCategories.includes(item.type),
};

export default filters;
