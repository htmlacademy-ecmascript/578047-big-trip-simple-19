import TripEventsListView from '../view/trip-events-list-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/utils.js';
import { render, remove } from '../framework/render.js';
import { SortType } from '../const.js';
import { sortByDay, sortByPrice } from '../utils/point.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #sortComponent = null;
  #currentSortType = SortType.DAY;

  #routePoints = [];
  #offers = [];
  #destinations = [];
  #sourcedRoutePoints = [];

  #tripEventsListComponent = new TripEventsListView();
  #noPointComponent = new NoPointView();

  #pointPresenters = new Map();

  constructor({ tripEventsContainer, pointsModel, offersModel, destinationsModel }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#routePoints = [...this.#pointsModel.points].sort(sortByDay);
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#sourcedRoutePoints = [...this.#pointsModel.points];

    this.#renderEvents();
  }

  #renderEvents() {
    if (!this.#routePoints.length) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#tripEventsContainer);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSort: this.#currentSortType,
    });
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripEventsListComponent.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handlePointChange,
    });
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#routePoints.forEach((point) => this.#renderPoint(point, this.#offers, this.#destinations));
  }

  #renderPointsList() {
    render(this.#tripEventsListComponent, this.#tripEventsContainer);
    this.#renderPoints();
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#routePoints.sort(sortByDay);
        break;
      case SortType.PRICE:
        this.#routePoints.sort(sortByPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetViev());
  };

  #handlePointChange = (updatedPoint) => {
    this.#routePoints = updateItem(this.#routePoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
    this.#sourcedRoutePoints = updateItem(this.#sourcedRoutePoints, updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#clearPointList();
    remove(this.#sortComponent);
    this.#sortPoints(sortType);
    this.#renderSort();
    this.#renderPointsList();
  };
}
