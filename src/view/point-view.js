import AbstractView from '../framework/view/abstract-view.js';
import { getFormatDate, getPossibleOffers, getCurrentDestination } from '../utils/utils.js';
import { DateFormat } from '../const.js';

const NO_ADDITIONAL_OFFERS_TEXT = 'No additional offers';

const createOffersTemplate = (offers) => (offers.length) ?
  offers.map(({title, price }) =>
    `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </li>`
  ).join ('\n') : NO_ADDITIONAL_OFFERS_TEXT;


const createRoutePointTemplate = ({point, offers, destinations}) => {

  const {type, dateFrom, dateTo, basePrice, offersId, destinationId } = point;
  const typeLowerCase = type.toLowerCase();
  const {DATE_SHORT, DATE_FULL, TIME} = DateFormat;
  const possibleOffers = getPossibleOffers(offers, type);
  const offersIdChecked = possibleOffers.filter(({id}) => offersId.includes(id));
  const destination = getCurrentDestination(destinations, destinationId);

  return (
    ` <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${getFormatDate(dateFrom, DATE_FULL)}">${getFormatDate(dateFrom, DATE_SHORT)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${typeLowerCase}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination ? destination.destinationName : ''}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getFormatDate(dateFrom, DATE_FULL)}T${getFormatDate(dateFrom, TIME)}">${getFormatDate(dateFrom, TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getFormatDate(dateTo, DATE_FULL)}T${getFormatDate(dateTo, TIME)}">${getFormatDate(dateTo, TIME)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplate(offersIdChecked)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class PointView extends AbstractView{
  #point = null;
  #offers = null;
  #destinations = null;
  #handleRollupButtonClick = null;

  constructor({point, offers, destinations, onRollupButtonClick }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupButtonClickHandler);
  }

  get template() {
    return createRoutePointTemplate({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers
    });
  }

  #rollupButtonClickHandler = () => {
    this.#handleRollupButtonClick();
  };
}
