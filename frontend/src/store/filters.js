const filters = {
	year: (item, { from, to }) => item.startDate >= from && item.endDate <= to,
};

export default filters;
