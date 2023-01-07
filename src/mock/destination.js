import { getRandomArrayElement, getRandomInteger } from '../utils/random.js';
import { DESTINATION, DESCRIPTION, MaxCount, MinCount } from './const.js';


const generateImage = () => ({
  src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 50)}`,
  description: getRandomArrayElement(DESCRIPTION)
});

const generateImages = () => Array.from(
  {length: getRandomInteger(MinCount.IMG_COUNT, MaxCount.IMG_COUNT)},
  generateImage
);

const generateDescription = () => getRandomArrayElement(DESCRIPTION);

const generateDestination = (name, id) => ({
  id,
  destinationName: name,
  description: generateDescription(),
  pictures: generateImages(),
});

const generateDestinations = () => DESTINATION.map((el, index) => generateDestination(el, index + 1));

const destinationsAll = generateDestinations();

export {generateDestinations, generateDestination, destinationsAll};
