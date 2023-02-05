import AbstractView from '../framework/view/abstract-view.js';
import { EmptyListMessage } from '../const.js';

function createNoPointTemplate(filterType) {
  const listEmptyTextValue = EmptyListMessage[filterType];
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
