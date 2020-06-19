import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
import {
  line, curveLinear, symbol, symbolCircle, symbolStar, symbolDiamond, symbolSquare,
} from 'd3-shape';
import { zoom } from 'd3-zoom';

const d3 = {
  extent,
  axisBottom,
  axisLeft,
  scaleTime,
  scaleLinear,
  select,
  selectAll,
  line,
  curveLinear,
  symbol,
  symbolCircle,
  symbolStar,
  symbolDiamond,
  symbolSquare,
  zoom,
};

export default d3;
