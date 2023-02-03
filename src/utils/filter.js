import { FilterType } from '../const.js';
import { isFutureEvent } from './utils.js';

const filtersByType = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point !== null),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureEvent(point.dateFrom))
};

export {filtersByType};
