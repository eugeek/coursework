function bubbleSort(array: number[]): { array: number[]; history: number[][] } {
  let history: number[][] = [];
  for (let i: number = 0; i < array.length - 1; i++) {
    for (let j: number = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        let temp: number = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        history.push(array.slice(0));
      }
    }
  }
  return {
    array: array,
    history: history
  };
}

function quickSort(array: number[]): { array: number[]; history: number[][] } {
  let history: number[][] = [];

  function _quickSort(array: number[]): number[] {
    if (array.length < 2) return array;
    let pivot: number = array[0];
    let less = array.slice(1, array.length).filter((i) => i <= pivot);
    let greater = array.slice(1, array.length).filter((i) => i > pivot);
    history.push(_quickSort(less).concat(pivot, _quickSort(greater)));

    return _quickSort(less).concat(pivot, _quickSort(greater));
  }

  return {
    array: _quickSort(array.slice(0)),
    history: history
  };
}

function insertionSort(
  array: number[]
): { array: number[]; history: number[][] } {
  let history: number[][] = [];

  for (let i = 1; i < array.length; i++) {
    for (let j = i; j > 0; j--) {
      if (array[j - 1] > array[j]) {
        let temp = array[j - 1];
        array[j - 1] = array[j];
        array[j] = temp;
        history.push(array.slice(0));
      }
    }
  }

  return {
    array: array,
    history: history
  };
}

export { bubbleSort, quickSort, insertionSort };
