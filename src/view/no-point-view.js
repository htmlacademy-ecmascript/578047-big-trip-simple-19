import AbstractView from '../framework/view/abstract-view.js';
import { EMPTY_LIST_MESSAGES } from '../const.js';

// const NO_POINT_MESSAGE = 'Click New Event to create your first point';

function createNoPointTemplate(filterType) {
  const listEmptyTextValue = EMPTY_LIST_MESSAGES[filterType];
  return (
    `<p class="trip-events__msg">${listEmptyTextValue}</p>`
  );
}
export default class NoPointView extends AbstractView{
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
