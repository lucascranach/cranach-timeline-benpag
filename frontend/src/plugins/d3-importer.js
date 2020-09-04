import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
import { symbol, symbolSquare } from 'd3-shape';
import { zoom, zoomIdentity } from 'd3-zoom';

const d3 = {
	extent,
	axisBottom,
	axisLeft,
	scaleTime,
	scaleLinear,
	select,
	selectAll,
	symbol,
	symbolSquare,
	zoom,
	zoomIdentity,
};

export default d3;
