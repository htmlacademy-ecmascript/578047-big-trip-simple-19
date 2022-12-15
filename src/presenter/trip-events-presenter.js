import TripEventsListView from '../view/trip-events-list-view.js';
import EditFormView from '../view/edit-form-view.js';
// import CreationFormView from '../view/creation-form-view.js';
import PointView from '../view/point-view.js';

import {render} from '../render.js';

const POINTS_AMOUNT = 3;

export default class TripEventsPresenter {
  tripEventsListComponent = new TripEventsListView();

  constructor({tripEventsContainer}) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(this.tripEventsListComponent, this.tripEventsContainer);
    // render(new CreationFormView, this.tripEventsListComponent.getElement());
    render(new EditFormView, this.tripEventsListComponent.getElement());

    for (let i = 0; i < POINTS_AMOUNT; i++) {
      render(new PointView(), this.tripEventsListComponent.getElement());
    }

  }
}
