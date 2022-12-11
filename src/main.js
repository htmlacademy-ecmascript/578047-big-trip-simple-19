import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripEventsPresenter = new TripEventsPresenter({tripEventsContainer: tripEventsElement});

render(new FilterView(), filterElement);
render(new SortView(), tripEventsElement);

tripEventsPresenter.init();

