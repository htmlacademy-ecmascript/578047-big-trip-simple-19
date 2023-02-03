import { filtersByType } from '../utils/filter.js';

function generateFilter(points) {
  return Object.entries(filtersByType).map(
    ([filterName, filterPoints]) => ({
      name: filterName,
      count: filterPoints(points).length,
    }),
  );
}

export {generateFilter};
