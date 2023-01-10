import { offersByTypes } from '../mock/offers.js';


export default class OffersModel {
  #offers = offersByTypes;

  get offers() {
    return this.#offers;
  }
}
