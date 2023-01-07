import {generateRoutePoint} from '../mock/point.js';
import { POINTS_AMOUNT } from '../mock/const.js';


export default class PointsModel {
  points = Array.from({length: POINTS_AMOUNT}, generateRoutePoint);

  getPoints() {
    return this.points;
  }
}
