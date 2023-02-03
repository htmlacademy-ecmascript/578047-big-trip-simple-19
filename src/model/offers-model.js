import Observable from '../framework/observable.js';
import { offersByTypes } from '../mock/offers.js';


export default class OffersModel extends Observable{
  #offers = offersByTypes;

  get offers() {
    return this.#offers;
  }
}
