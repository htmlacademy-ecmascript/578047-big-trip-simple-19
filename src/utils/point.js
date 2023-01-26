import dayjs from 'dayjs';

function getWeightForNullValue(valueA, valueB) {
  if (valueA === null && valueB === null) {
    return 0;
  }

  if (valueA === null) {
    return 1;
  }

  if (valueB === null) {
    return -1;
  }

  return null;
}

function sortByDay(pointA, pointB) {
  const weight = getWeightForNullValue(pointA, pointB);
  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortByPrice(pointA, pointB) {
  const weight = getWeightForNullValue(pointA, pointB);
  return weight ?? pointB.basePrice - pointA.basePrice;
}

export {sortByDay, sortByPrice};
