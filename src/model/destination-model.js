import { destinationsAll } from '../mock/destination.js';


export default class DestinationsModel {
  destinations = destinationsAll;

  getDestinations() {
    return this.destinations;
  }
}
