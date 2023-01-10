import { createElement } from '../render.js';
import { pointsType, DATE_FORMAT } from '../const.js';
import { getFormatDate, getOfferAtr, getPossibleOffers, getCurrentDestination } from '../utils/utils.js';

const createPointsTypeMenuTemplate = (currentType, id) =>
  pointsType.map((typePoint) => {
    const typeLowerCase = typePoint.toLowerCase();
    return `<div class="event__type-item">
      <input id="event-type-${typeLowerCase}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeLowerCase}" ${currentType === typePoint ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${typeLowerCase}" for="event-type-${typeLowerCase}-${id}">${typePoint}</label>
  </div>`;
  }).join('\n');

const createDestinationsListTemplate = (destinations) => destinations
  .map((destination) => `
      <option value="${destination}"></option>`).join('\n');


const getDestinationCurrentName = (id, destinations) => destinations.map((destination) => id === destination.id ? destination.destinationName : '').join('');


const createPhotoListTemplate = (pictures) => pictures
  .map((picture) => (`<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
  )).join('\n');

const createDestinationTemplate = (destination) => {
  const { description, pictures } = destination;
  return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPhotoListTemplate(pictures)}
          </div>
        </div>
      </section>`;
};

const createOffersAvailableTemplate = (offers, offersId) => offers.map((offer) => {
  const {title, priceOffer, id} = offer;
  const checked = offersId.includes(id)
    ? 'checked'
    : '';
  return (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getOfferAtr(title)}-${ id }" type="checkbox" name="event-offer-${getOfferAtr(title)}" ${ checked }>
    <label class="event__offer-label" for="event-offer-${getOfferAtr(title)}-${ id }">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${priceOffer}</span>
    </label>
    </div>`
  );
}).join('\n');

const isOffers = (offers, offersId) => offers.length ? `<section  class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${createOffersAvailableTemplate(offers, offersId)}
        </div>
      </section>`
  : '';

const createFormCreationTemplate = ({point, offers, destinations}) => {
  const {id, type, dateFrom, dateTo, offersId, destinationId, basePrice} = point;
  const { time, dateValue } = DATE_FORMAT;
  const icon = type.toLowerCase();

  const possibleOffers = getPossibleOffers(offers, type).offers;
  const checkedOffers = isOffers(possibleOffers, offersId);
  const pointsTypeMenu = createPointsTypeMenuTemplate(type, id);
  const destination = getCurrentDestination(destinations, destinationId);
  const destinationTemplate = createDestinationTemplate(destination);
  const destinationsList = destinations.map((dest) => dest.destinationName);
  const destinationCurrentName = getDestinationCurrentName(destinationId, destinations);
  const destinationsListTemplate = createDestinationsListTemplate(destinationsList);

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-${icon}-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}.png" alt="Event ${icon} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-${icon}-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${pointsTypeMenu}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${destinationId}">
          ${icon}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${destinationId}" type="text" name="event-destination" value="${destinationCurrentName}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationsListTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormatDate(dateFrom, dateValue)} ${getFormatDate(dateFrom, time)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormatDate(dateTo, dateValue)} ${getFormatDate(dateTo, time)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
      ${checkedOffers}
      ${destinationTemplate}
      </section>
    </form>
  </li>`
  );
};


export default class FormAddNewPointView {
  #point = null;
  #offers = null;
  #destinations = null;

  constructor({ point, offers, destinations}) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  #element = null;

  get template() {
    return createFormCreationTemplate({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers
    });
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
