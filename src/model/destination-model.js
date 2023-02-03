import Observable from '../framework/observable.js';
import { destinationsAll } from '../mock/destination.js';


export default class DestinationsModel extends Observable{
  #destinations = destinationsAll;

  get destinations() {
    return this.#destinations;
  }
}
