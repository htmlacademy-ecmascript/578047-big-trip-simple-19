import { destinationsAll } from '../mock/destination.js';


export default class DestinationsModel {
  #destinations = destinationsAll;

  get destinations() {
    return this.#destinations;
  }
}
