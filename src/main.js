import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import FilterView from './view/filter-view.js';
import { render } from './framework/render.js';
import { generateFilter } from './mock/filter.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const filtersContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const routePointsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsElement,
  pointsModel,
  offersModel,
  destinationsModel
});
const filters = generateFilter(pointsModel.points);

// console.log(filters)

render(new FilterView(filters), filtersContainerElement);

routePointsPresenter.init();

