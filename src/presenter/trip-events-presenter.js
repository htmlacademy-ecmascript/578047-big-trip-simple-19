import TripEventsListView from '../view/trip-events-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';

import {render} from '../render.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #filtersContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #routePoints = [];
  #offers = [];
  #destinations = [];

  #tripEventsListComponent = new TripEventsListView();

  #renderEmptyList() {
    render(new NoPointView, this.#tripEventsListComponent.element);
  }

  constructor({tripEventsContainer, filtersContainer, pointsModel, offersModel, destinationsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#routePoints = [...this.#pointsModel.points];
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];

    render(new FilterView(), this.#filtersContainer);
    this.#renderEvents();
  }

  #renderEvents(){
    if (!this.#routePoints.length){
      this.#renderEmptyList();
      return;
    }
    render(new SortView(), this.#tripEventsContainer);
    render(this.#tripEventsListComponent, this.#tripEventsContainer);

    this.#routePoints.forEach((point) => this.#renderPoint(point, this.#offers, this.#destinations));
  }

  #renderPoint(point, offers, destinations){
    const pointComponent = new PointView({point, offers, destinations});
    const pointEditComponent = new EditFormView({point, offers, destinations});

    const replacePointToForm = () => {
      this.#tripEventsListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#tripEventsListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#tripEventsListComponent.element);
  }
}
