import dayjs from 'dayjs';

// export function updateItem(items, update) {
//   return items.map((item) => item.id === update.id ? update : item);
// }
export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export const isFutureEvent = (dateFrom) => dateFrom && dayjs(dateFrom).isAfter(dayjs());

export const getFormatDate = (date, format) => dayjs(date).format(format);

export const getOfferAtr = (offer) => offer.split(' ').map((el) => el.toLowerCase()).join('-');

export const getPossibleOffers = (offers, type) => offers.find((offer) => offer.typeOffer === type.toLowerCase());

export const getCurrentDestination = (destinations, id) => destinations.find((destination) => destination.id === id);


