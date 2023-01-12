import {createElement} from '../render.js';

const NO_POINT_MESSAGE = 'Click New Event to create your first point';

function createNoPointTemplate() {
  return (
    `<p class="trip-events__msg">${NO_POINT_MESSAGE}</p>`
  );
}
export default class NoPointView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoPointTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
