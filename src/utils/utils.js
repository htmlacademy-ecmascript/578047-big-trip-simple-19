import dayjs from 'dayjs';

export const getFormatDate = (date, format) => dayjs(date).format(format);

export const getOfferAtr = (offer) => offer.split(' ').map((el) => el.toLowerCase()).join('-');

export const getPossibleOffers = (offers, type) => offers.find((offer) => offer.typeOffer === type.toLowerCase());

export const getCurrentDestination = (destinations, id) => destinations.find((destination) => destination.id === id);
