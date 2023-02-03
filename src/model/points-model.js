import Observable from '../framework/observable.js';
import {generateRoutePoint} from '../mock/point.js';
import { POINTS_AMOUNT } from '../mock/const.js';


export default class PointsModel extends Observable{
  #points = Array.from({length: POINTS_AMOUNT}, generateRoutePoint);

  get points() {
    return this.#points;
  }

  updatePoint(UpdateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(UpdateType, update);
  }

  addPoint(UpdateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(UpdateType, update);
  }

  deletePoint(UpdateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(UpdateType);
  }
}
