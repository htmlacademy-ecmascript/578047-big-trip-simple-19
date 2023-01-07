import {createElement} from '../render.js';
import { getFormatDate, getPossibleOffers, getCurrentDestination } from '../utils/utils.js';
import { DATE_FORMAT } from '../const.js';
const NO_ADDITIONAL_OFFERS_TEXT = 'No additional offers';

const createOffersMarkup = (offers) => (offers.length) ?
  offers.map(({title, priceOffer }) =>
    `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${priceOffer}</span>
        </li>`
  ).join ('\n') : NO_ADDITIONAL_OFFERS_TEXT;


const createRoutePointTemplate = ({point, offers, destinations}) => {
  const {type, dateFrom, dateTo, basePrice, offersId, destinationId } = point;

  const typeLowerCase = type.toLowerCase();

  const {dateShort, dateFull, time} = DATE_FORMAT;

  const possibleOffers = getPossibleOffers(offers, type).offers;

  const offersIdChecked = possibleOffers.filter(({id}) =>
    offersId.includes(id));

  const destination = getCurrentDestination(destinations, destinationId);

  return (
    ` <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${getFormatDate(dateFrom, dateFull)}">${getFormatDate(dateFrom, dateShort)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${typeLowerCase}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.destinationName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getFormatDate(dateFrom, dateFull)}T${getFormatDate(dateFrom, time)}">${getFormatDate(dateFrom, time)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getFormatDate(dateTo, dateFull)}T${getFormatDate(dateTo, time)}">${getFormatDate(dateTo, time)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersMarkup(offersIdChecked)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};


export default class RoutePointView {
  constructor({point, offers, destinations }) {
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createRoutePointTemplate({
      point: this.point,
      destinations: this.destinations,
      offers: this.offers
    });
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
