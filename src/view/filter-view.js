import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType) {
  const { type, count } = filter;
  const dataAtr = `data-filter-type="${type}"`;

  return (
    `<div class="trip-filters__filter">
    <input
     id="filter-${type}"
     class="trip-filters__filter-input  visually-hidden"
     type="radio"
     name="trip-filter"
     value=${type}
     ${dataAtr}
     ${count === 0 ? 'disabled' : ''}
     ${currentFilterType === type ? 'checked' : ''}
     >
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>
    `
  );
}

function createFilterTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('\n');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#fillerTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  #fillerTypeChangeHandler = (evt) => {
    if (!evt.target.dataset.filterType) {
      return;
    }
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.dataset.filterType);
  };
}
