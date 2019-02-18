const findInArray = (array, key, value) => {
  if (array.length === 0) {
    return false;
  }
  const isFound = array.find(element => {
    return element[key] === value;
  });
  if (isFound) {
    return true;
  }
  return false;
};

export default findInArray;
