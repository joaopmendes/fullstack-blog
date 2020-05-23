export const getRandomsFromArray = (array, num) => {
  const result = [];
  if (!Array.isArray(array)) {
    throw new Error('First parameter is not an array');
  }
  if (!num) {
    throw new Error('Invalid parameter {num}');
  }
  if (num > array.length) {
    throw new Error('Cannot get more items than the length of the array');
  }

  const usedIndexes = [];
  while (num--) {
    let index;
    while (1) {
      index = Math.floor(Math.random() * array.length);
      if (!usedIndexes.find(n => n === index)) {
        usedIndexes.push(index);
        break;
      }
    }

    result.push(array[index]);
  }

  return result;
};
