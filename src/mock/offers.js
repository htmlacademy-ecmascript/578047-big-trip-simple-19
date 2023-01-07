import { MaxCount, MinCount , OFFERS } from './const.js';
import { getRandomInteger, getRandomArrayElements } from '../utils/random.js';
import { pointsType } from '../const.js';

const generateOffers = () => new Array(OFFERS.length).fill('').map((el, i) => ({
  title: OFFERS[i],
  priceOffer: getRandomInteger(MinCount.OFFER_PRICE, MaxCount.OFFER_PRICE) * 10,
  id: i + 1,
}));

const generateOffersByType = () => {
  const offers = generateOffers();
  return pointsType.map((el) => ({
    typeOffer: el.toLowerCase(),
    offers: getRandomArrayElements(offers, MinCount.OFFER_COUNT, MaxCount.OFFER_COUNT)
  }));
};

const offersByTypes = generateOffersByType();

export { generateOffers, generateOffersByType, offersByTypes };
