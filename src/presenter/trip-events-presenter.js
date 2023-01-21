import TripEventsListView from '../view/trip-events-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';

import { render, RenderPosition } from '../framework/render.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #routePoints = [];
  #offers = [];
  #destinations = [];

  #tripEventsListComponent = new TripEventsListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();



  constructor({ tripEventsContainer, pointsModel, offersModel, destinationsModel }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#routePoints = [...this.#pointsModel.points];
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];

    this.#renderEvents();
  }

  #renderEvents() {
    if (!this.#routePoints.length) {
      this.#renderEmptyList();
      return;
    }
    // render(new SortView(), this.#tripEventsContainer);
    this.#renderSort();
    render(this.#tripEventsListComponent, this.#tripEventsContainer);

    this.#routePoints.forEach((point) => this.#renderPoint(point, this.#offers, this.#destinations));
  }

  #renderEmptyList() {
    render(new NoPointView(), this.#tripEventsListComponent.element);
    console.log(new NoPointView())
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderPoint(point, offers, destinations) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      offers,
      destinations,
      onRollupButtonClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditFormView({
      point,
      offers,
      destinations,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      this.#tripEventsListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    }

    function replaceFormToPoint() {
      this.#tripEventsListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    }

    render(pointComponent, this.#tripEventsListComponent.element);
  }
}
