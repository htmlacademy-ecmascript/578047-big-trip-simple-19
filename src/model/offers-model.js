import { offersByTypes } from '../mock/offers.js';


export default class OffersModel {
  offers = offersByTypes;

  getOffers() {
    return this.offers;
  }
}
