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
      if (!usedIndexes.find((n) => n === index)) {
        usedIndexes.push(index);
        break;
      }
    }

    result.push(array[index]);
  }

  return result;
};
export const getDaysSince = (date) => {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(new Date() - new Date(date));

  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);
};
