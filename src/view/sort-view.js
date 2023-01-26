import AbstractView from '../framework/view/abstract-view.js';
import { SortTitle } from '../const.js';

function createSortItemTemplate(sortItem, currentSortItem) {
  const { title, type, isDisabled } = sortItem;
  const dataAtr = `data-sort-type="${type}"`;

  return (
    `<div class="trip-sort__item  trip-sort__item--${title}">
    <input id="sort-${title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${title}" ${currentSortItem === type ? 'checked' : ''} ${!isDisabled ? dataAtr : 'disabled'}>
    <label class="trip-sort__btn" for="sort-${title}">${title}</label>
  </div>`
  );
}

function createSortTemplate(currentSortItem) {
  const sortItemsTemplate = SortTitle.map((item) => createSortItemTemplate(item, currentSortItem)).join('\n');
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>`
  );
}

export default class SortView extends AbstractView{
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({onSortTypeChange, currentSort}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSort;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.dataset.sortType) {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
