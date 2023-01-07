import TripEventsListView from '../view/trip-events-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';

import {render} from '../render.js';

export default class TripEventsPresenter {
  tripEventsListComponent = new TripEventsListView();

  constructor({tripEventsContainer, pointsModel, offersModel, destinationsModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.routePoints = [...this.pointsModel.getPoints()];
    this.offers = [...this.offersModel.getOffers()];
    this.destinations = [...this.destinationsModel.getDestinations()];

    const EditFormViewAdd = new EditFormView({
      // point: this.routePoints[0],
      // destinations: this.destinations,
      // offers: this.offers,
    });

    const EditFormViewEdit = new EditFormView({
      point: this.routePoints[0],
      destinations: this.destinations,
      offers: this.offers,
    });

    render(this.tripEventsListComponent, this.tripEventsContainer);
    render(EditFormViewAdd, this.tripEventsListComponent.getElement());
    render(EditFormViewEdit, this.tripEventsListComponent.getElement());

    for (let i = 0; i < this.routePoints.length; i++) {
      const routePointView = new PointView({
        point: this.routePoints[i],
        offers: this.offers,
        destinations: this.destinations,
      });
      render(routePointView, this.tripEventsListComponent.getElement());
    }

  }
}
