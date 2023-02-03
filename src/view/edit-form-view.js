import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { pointsType, DATE_FORMAT, FormType } from '../const.js';
import { getFormatDate, getOfferAtr, getPossibleOffers, getCurrentDestination, getTodayDate } from '../utils/utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const DEFAULT_POINT_TYPE = pointsType[0].toLocaleLowerCase();

const BLANK_POINT = {
  type: DEFAULT_POINT_TYPE,
  dateFrom: getTodayDate(),
  dateTo: getTodayDate(),
  destination: '',
  offersId: [],
  basePrice: 0,
};

const ResetButtonText = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
};

const createRollupButtonTemplate = () =>
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;

const createPointsTypeMenuTemplate = (currentType, id ) =>
  pointsType.map((typePoint) => {
    const typeLowerCase = typePoint.toLowerCase();
    const isChecked = currentType.toLowerCase() === typeLowerCase ? 'checked' : '';
    return `<div class="event__type-item">
    <input id="event-type-${typeLowerCase}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeLowerCase}" ${isChecked}>
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
    <input class="event__offer-checkbox  visually-hidden" data-offer-id="${id}" id="event-offer-${getOfferAtr(title)}-${ id }" type="checkbox" name="event-offer-${getOfferAtr(title)}" ${ checked }>
    <label class="event__offer-label" for="event-offer-${getOfferAtr(title)}-${ id }">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${priceOffer}</span>
    </label>
    </div>`
  );
}).join('\n');

const isOffers = (offers, offersId) => offers.length !== 0 ? `<section  class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${createOffersAvailableTemplate(offers, offersId)}
        </div>
      </section>`
  : '';


const createFormEditionTemplate = ({point, offers, destinations, formType}) => {
  const { id, type, dateFrom, dateTo, offersId, destinationId, basePrice } = point;

  let isEditPoint = true;

  if (formType === FormType.ADDING) {
    isEditPoint = false;
  }

  const rollupButtonTemplate = isEditPoint ? createRollupButtonTemplate() : '';
  const isNew = id === '';
  const resetButtonText = isNew ? ResetButtonText.CANCEL : ResetButtonText.DELETE;
  const icon = type.toLowerCase();
  const possibleOffers = offers.length !== 0 ? getPossibleOffers(offers, type).offers : [];
  const checkedOffers = isOffers(possibleOffers, offersId);
  const pointsTypeMenu = createPointsTypeMenuTemplate(type, id);
  const destination = getCurrentDestination(destinations, destinationId);
  const destinationTemplate = destination ? createDestinationTemplate(destination) : '';
  const destinationsList = destinations.map((dest) => dest.destinationName);
  const destinationCurrentName = getDestinationCurrentName(destinationId, destinations);
  const destinationsListTemplate = createDestinationsListTemplate(destinationsList);

  const { time, dateValue } = DATE_FORMAT;

  const formatDateValueTo = dateTo !== null ? `${getFormatDate(dateTo, dateValue)} ${getFormatDate(dateTo, time)}` : '';
  const formatDateValueFrom = dateFrom !== null ? `${getFormatDate(dateFrom, dateValue)} ${getFormatDate(dateFrom, time)}` : '';

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="" method="post">
      <header class="event__header">
       <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-${icon}-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}.png" alt="Event ${icon} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-${icon}-toggle-${id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${pointsTypeMenu}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${destinationId}">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${destinationId}" type="text" name="event-destination" value="${he.encode(destinationCurrentName)}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${destinationsListTemplate}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1}" type="text" name="event-start-time" value="${formatDateValueFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${formatDateValueTo}">
        </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${ resetButtonText }</button>
      ${ rollupButtonTemplate }
    </header>
    <section class="event__details">
    ${checkedOffers}
    ${destinationTemplate}
    </section>
  </form>
  </li>`
  );
};

export default class EditFormView extends AbstractStatefulView{

  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleRolldownButtonClick = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #formType = null;

  constructor({ point = BLANK_POINT, offers = [], destinations = [], onFormSubmit, onRolldownButtonClick, onDeleteClick, formType = FormType.ADDING}) {
    super();
    this._setState(EditFormView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRolldownButtonClick = onRolldownButtonClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#formType = formType;
    this._restoreHandlers();
  }

  _restoreHandlers() {
    const rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    if (rollupButtonElement) {
      rollupButtonElement.addEventListener('click', this.#rolldownButtonClickHandler);
    }
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#pointPriceInputHandler);
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationInputHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);

    if ((getPossibleOffers(this.#offers, this._state.type)).offers.length) {
      this.element.querySelector('.event__available-offers')
        .addEventListener('change', this.#pointOfferChangeHandler);
    }

    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  get template() {
    return createFormEditionTemplate({
      point: this._state,
      destinations: this.#destinations,
      offers: this.#offers,
      formType: this.#formType,
    });
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }

  reset(point) {
    this.updateElement(EditFormView.parsePointToState(point));
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #setDateFromPicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('input[name=event-start-time'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#pointDateFromChangeHandler,
        time24hr: true
      },
    );
  }

  #setDateToPicker() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('input[name=event-end-time'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#pointDateToChangeHandler,
        time24hr: true
      },
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  #rolldownButtonClickHandler = () => {
    this.#handleRolldownButtonClick();
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedType = evt.target.value;
    this.updateElement({
      type: selectedType,
    });
  };

  #destinationInputHandler = (evt) => {
    if(!this.#destinations.map((destination) => destination.destinationName).includes(evt.target.value)) {
      evt.target.setCustomValidity('Choose one of the available cities.');
    } else {
      evt.target.setCustomValidity('');
    }

    evt.preventDefault();
    const selectedDestination = this.#destinations.find((destination) => evt.target.value === destination.destinationName);
    this.updateElement({
      destinationId: selectedDestination.id,
    });
  };

  #pointPriceInputHandler = (evt) => {
    if (!new RegExp(/^[1-9]\d{0,5}$/).test(evt.target.value) || evt.target.value < 1) {
      evt.target.setCustomValidity('Enter a positive integer.');
    } else {
      evt.target.setCustomValidity('');
    }

    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #pointOfferChangeHandler = (evt) => {
    evt.preventDefault();
    const currentOfferId = +evt.target.dataset.offerId;
    const currentOfferIdIndex = this._state.offersId.indexOf(currentOfferId);
    if (currentOfferIdIndex === -1) {
      this._state.offersId.push(currentOfferId);
    } else {
      this._state.offersId.splice(currentOfferIdIndex, 1);
    }
  };

  #pointDateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #pointDateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.parseStateToPoint(this._state));
  };
}
