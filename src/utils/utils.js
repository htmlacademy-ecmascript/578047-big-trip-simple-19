import dayjs from 'dayjs';

export const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const isFutureEvent = (dateFrom) => dateFrom && dayjs(dateFrom).isAfter(dayjs());

export const getFormatDate = (date, format) => dayjs(date).format(format);

export const getOfferAttribute = (offer) => offer.split(' ').map((el) => el.toLowerCase()).join('-');

export const getPossibleOffers = (offers, type) => offers.find((offer) => offer.typeOffer === type.toLowerCase()).offers;

export const getCurrentDestination = (destinations, id) => destinations.find((destination) => destination.id === id);

export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export const getTodayDate = () => dayjs().toISOString();
