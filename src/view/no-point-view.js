import AbstractView from '../framework/view/abstract-view.js';

const NO_POINT_MESSAGE = 'Click New Event to create your first point';

function createNoPointTemplate() {
  return (
    `<p class="trip-events__msg">${NO_POINT_MESSAGE}</p>`
  );
}
export default class NoPointView extends AbstractView{

  get template() {
    return createNoPointTemplate();
  }
}
