import {remove, render, RenderPosition} from '../framework/render.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';
import EditFormView from '../view/edit-form-view.js';
import { isEscKey } from '../utils/utils.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;
  #point = null;
  #destinations = [];
  #offers = [];

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(point, offers, destinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditFormView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }
    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#onEscKeydown);
  }

  #onEscKeydown = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
