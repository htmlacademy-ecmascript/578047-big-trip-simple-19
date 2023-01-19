import dayjs from 'dayjs';

import { pointsType } from '../const.js';
import { getRandomArrayElement, getRandomInteger, getRandomArrayElements } from '../utils/random.js';
import { MaxCount, MinCount } from './const.js';
import { generateDestinations } from './destination.js';
import { offersByTypes } from './offers.js';
import { getPossibleOffers } from '../utils/utils.js';


const getDateFrom = () => (getRandomInteger(0, 10) > 5) ? dayjs().add(getRandomInteger(0, 10000), 'm').toDate() : dayjs().subtract(getRandomInteger(0, 10000), 'm').toDate();


export const generateRoutePoint = () => {
  const type = getRandomArrayElement(pointsType);
  const dateFrom = getDateFrom();
  const a = getRandomInteger(30, 200);
  const dateTo = dayjs(dateFrom).add(a, 'm').toDate();
  const basePrice = getRandomInteger(MinCount.PRICE, MaxCount.PRICE) * 10;
  const possibleOffers = getPossibleOffers(offersByTypes, type).offers;
  const getOffersId = possibleOffers.map((offer) => offer.id);
  const offersId = getRandomArrayElements(getOffersId, 0, getOffersId.length);
  const destination = getRandomArrayElement(generateDestinations());
  return {
    id: Date.now() * Math.random(),
    type,
    dateFrom,
    dateTo,
    destinationId: destination.id,
    offersId,
    basePrice
  };
};


