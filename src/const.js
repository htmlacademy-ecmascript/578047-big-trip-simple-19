const POINTS_TYPE = {
  trip: ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight'],
  stopping: ['Check-in', 'Sightseeing', 'Restaurant'],
};

const pointsType = POINTS_TYPE.trip.concat(POINTS_TYPE.stopping);

const DATE_FORMAT = {
  dateShort: 'MMM DD',
  dateFull: 'YYYY-MM-DD',
  dateValue: 'DD/MM/YY',
  time: 'HH:mm'
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

const SortTitle = [
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

export { POINTS_TYPE, pointsType, DATE_FORMAT, FilterType, SortType, SortTitle};

