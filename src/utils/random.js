function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(array) {
  const copyArr = array.slice();
  for (let i = copyArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
  }
  return copyArr;
}

function getRandomArrayElements(items, min, max) {
  return shuffle(items).slice(0, getRandomInteger(min, max));
}

export {getRandomArrayElement, getRandomInteger, getRandomArrayElements };
