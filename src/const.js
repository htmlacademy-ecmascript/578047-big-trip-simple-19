import { getTodayDate } from './utils/utils';

const pointsType = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const DateFormat = {
  DATE_SHORT: 'MMM DD',
  DATE_FULL: 'YYYY-MM-DD',
  DATE_VALUE: 'DD/MM/YY',
  TIME: 'HH:mm'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const sortTitles = [
  {
    title: 'day',
    type: SortType.DAY,
  },
  {
    title: 'event',
    isDisabled: true,
    type: SortType.EVENT,
  },
  {
    title: 'time',
    isDisabled: true,
    type: SortType.TIME,
  },
  {
    title: 'price',
    type: SortType.PRICE,
  },
  {
    title: 'offers',
    isDisabled: true,
    type: SortType.OFFERS,
  },
];

const EmptyListMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FormType = {
  EDITING: 'edit',
  ADDING: 'add'
};

const DEFAULT_POINT_TYPE = pointsType[0].toLocaleLowerCase();

const BLANK_POINT = {
  type: DEFAULT_POINT_TYPE,
  dateFrom: getTodayDate(),
  dateTo: getTodayDate(),
  destinationId: null,
  offersId: [],
  basePrice: '',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const ResetButtonText = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  DELETETING: 'Deleting',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export { pointsType, DateFormat, FilterType, EmptyListMessage, SortType, sortTitles, UserAction, UpdateType, FormType, BLANK_POINT, Method, ResetButtonText, TimeLimit, Mode};

