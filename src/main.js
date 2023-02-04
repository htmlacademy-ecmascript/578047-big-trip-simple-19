import PointsModel from './model/points-model.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './framework/render.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const filtersContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const filterModel = new FilterModel();

const AUTHORIZATION = 'Basic s9js92jd9d92jd';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
});

const routePointsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainerElement,
  filterModel,
  pointsModel,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  routePointsPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filterPresenter.init();
routePointsPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, tripMainElement);
  });
