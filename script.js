// script.js

// Select DOM elements
const arrayContainer = document.getElementById('array-container');
const newArrayButton = document.getElementById('new-array');
const sortButton = document.getElementById('sort-button');
const algorithmSelect = document.getElementById('algorithm-select');
const speedInput = document.getElementById('speed-input');
const sizeInput = document.getElementById('size-input');
const timeTakenDisplay = document.getElementById('time-taken');

// Initialize variables
let unsortedArray = [];
let bars = [];
let animationSpeed = 50; // Default speed
let ARRAY_SIZE = 50;     // Default array size

// Set the initial CSS variable for array size
document.documentElement.style.setProperty('--array-size', ARRAY_SIZE);

// Event listeners
newArrayButton.addEventListener('click', generateNewArray);
sortButton.addEventListener('click', startSort);
speedInput.addEventListener('input', updateSpeed);
sizeInput.addEventListener('input', updateSize);
algorithmSelect.addEventListener('change', updateAlgorithmInfo);

// Initialize the visualizer
updateAlgorithmInfo();
generateNewArray(); // Generate the initial array

// Update animation speed based on input
function updateSpeed() {
  animationSpeed = 101 - speedInput.value; // Higher value means faster speed
}

// Update array size based on input
function updateSize() {
  ARRAY_SIZE = sizeInput.value;
  document.documentElement.style.setProperty('--array-size', ARRAY_SIZE);
  generateNewArray();
}

// Generate a new random array
function generateNewArray() {
  // Ensure CSS variable is set
  document.documentElement.style.setProperty('--array-size', ARRAY_SIZE);

  unsortedArray = [];
  arrayContainer.innerHTML = '';
  bars = [];
  for (let i = 0; i < ARRAY_SIZE; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    unsortedArray.push(value);

    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value * 3}px`; // Scale the bar height
    arrayContainer.appendChild(bar);
    bars.push(bar);
  }
  timeTakenDisplay.innerText = '0';
}

// Disable controls during sorting
function disableControls() {
  newArrayButton.disabled = true;
  sortButton.disabled = true;
  algorithmSelect.disabled = true;
  speedInput.disabled = true;
  sizeInput.disabled = true;
}

// Enable controls after sorting
function enableControls() {
  newArrayButton.disabled = false;
  sortButton.disabled = false;
  algorithmSelect.disabled = false;
  speedInput.disabled = false;
  sizeInput.disabled = false;
}

// Sleep function for animation delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Start the selected sorting algorithm
async function startSort() {
  const selectedAlgorithm = algorithmSelect.value;
  disableControls();
  timeTakenDisplay.innerText = '0';

  const startTime = performance.now();

  switch (selectedAlgorithm) {
    case 'bubbleSort':
      await bubbleSort();
      break;
    case 'selectionSort':
      await selectionSort();
      break;
    case 'insertionSort':
      await insertionSort();
      break;
    case 'mergeSort':
      await mergeSortWrapper();
      break;
    case 'quickSort':
      await quickSortWrapper();
      break;
    case 'heapSort':
      await heapSort();
      break;
    case 'countingSort':
      await countingSort();
      break;
    case 'radixSort':
      await radixSort();
      break;
    case 'bucketSort':
      await bucketSort();
      break;
    case 'shellSort':
      await shellSort();
      break;
    default:
      break;
  }

  const endTime = performance.now();
  const timeTaken = (endTime - startTime).toFixed(2);
  timeTakenDisplay.innerText = timeTaken;

  enableControls();
}

// Update algorithm information
function updateAlgorithmInfo() {
  const algorithmDescriptions = {
    bubbleSort:
      'Bubble Sort: Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    selectionSort:
      'Selection Sort: Selects the minimum element from the unsorted portion and moves it to the sorted portion.',
    insertionSort:
      'Insertion Sort: Builds the final sorted array one item at a time.',
    mergeSort:
      'Merge Sort: Divides the array into halves, sorts them and merges them back together.',
    quickSort:
      'Quick Sort: Picks a pivot and partitions the array around the pivot.',
    heapSort:
      'Heap Sort: Converts the array into a heap data structure and sorts it.',
    countingSort:
      'Counting Sort: Counts the number of objects that have distinct key values.',
    radixSort:
      'Radix Sort: Sorts numbers digit by digit starting from least significant digit to most significant digit.',
    bucketSort:
      'Bucket Sort: Divides elements into buckets and sorts each bucket individually.',
    shellSort:
      'Shell Sort: Generalization of insertion sort that allows the exchange of items that are far apart.',
  };

  const selectedAlgorithm = algorithmSelect.value;
  const description = algorithmDescriptions[selectedAlgorithm];
  document.getElementById('algorithm-description').innerText = description;
}

// Sorting Algorithms

// 1. Bubble Sort
async function bubbleSort() {
  let n = unsortedArray.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight bars being compared
      bars[j].style.backgroundColor = 'red';
      bars[j + 1].style.backgroundColor = 'red';

      await sleep(animationSpeed);

      if (unsortedArray[j] > unsortedArray[j + 1]) {
        // Swap values
        [unsortedArray[j], unsortedArray[j + 1]] = [unsortedArray[j + 1], unsortedArray[j]];

        // Swap bar heights
        bars[j].style.height = `${unsortedArray[j] * 3}px`;
        bars[j + 1].style.height = `${unsortedArray[j + 1] * 3}px`;
      }

      // Reset bar colors
      bars[j].style.backgroundColor = 'skyblue';
      bars[j + 1].style.backgroundColor = 'skyblue';
    }
    // Mark the last sorted bar
    bars[n - i - 1].style.backgroundColor = 'green';
  }
  // Mark the first bar
  bars[0].style.backgroundColor = 'green';
}

// 2. Selection Sort
async function selectionSort() {
  let n = unsortedArray.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = 'red';

    for (let j = i + 1; j < n; j++) {
      bars[j].style.backgroundColor = 'yellow';

      await sleep(animationSpeed);

      if (unsortedArray[j] < unsortedArray[minIndex]) {
        bars[minIndex].style.backgroundColor = 'skyblue';
        minIndex = j;
        bars[minIndex].style.backgroundColor = 'red';
      } else {
        bars[j].style.backgroundColor = 'skyblue';
      }
    }

    if (minIndex !== i) {
      [unsortedArray[i], unsortedArray[minIndex]] = [unsortedArray[minIndex], unsortedArray[i]];

      bars[i].style.height = `${unsortedArray[i] * 3}px`;
      bars[minIndex].style.height = `${unsortedArray[minIndex] * 3}px`;
    }

    bars[minIndex].style.backgroundColor = 'skyblue';
    bars[i].style.backgroundColor = 'green';
  }
}

// 3. Insertion Sort
async function insertionSort() {
  let n = unsortedArray.length;
  for (let i = 1; i < n; i++) {
    let key = unsortedArray[i];
    let j = i - 1;

    bars[i].style.backgroundColor = 'red';

    await sleep(animationSpeed);

    while (j >= 0 && unsortedArray[j] > key) {
      unsortedArray[j + 1] = unsortedArray[j];
      bars[j + 1].style.height = `${unsortedArray[j + 1] * 3}px`;

      bars[j].style.backgroundColor = 'yellow';

      await sleep(animationSpeed);

      bars[j].style.backgroundColor = 'skyblue';

      j--;
    }
    unsortedArray[j + 1] = key;
    bars[j + 1].style.height = `${key * 3}px`;

    bars[i].style.backgroundColor = 'skyblue';
  }

  // Mark all bars as sorted
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = 'green';
  }
}

// 4. Merge Sort
async function mergeSortWrapper() {
  await mergeSort(unsortedArray, 0, unsortedArray.length - 1);
  // Mark all bars as sorted
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = 'green';
  }
}

async function mergeSort(arr, left, right) {
  if (left >= right) {
    return;
  }
  const middle = Math.floor((left + right) / 2);
  await mergeSort(arr, left, middle);
  await mergeSort(arr, middle + 1, right);
  await merge(arr, left, middle, right);
}

async function merge(arr, left, middle, right) {
  const n1 = middle - left + 1;
  const n2 = right - middle;

  const leftArray = [];
  const rightArray = [];

  for (let i = 0; i < n1; i++) {
    leftArray.push(arr[left + i]);
  }
  for (let j = 0; j < n2; j++) {
    rightArray.push(arr[middle + 1 + j]);
  }

  let i = 0,
    j = 0,
    k = left;

  while (i < n1 && j < n2) {
    bars[k].style.backgroundColor = 'red';
    await sleep(animationSpeed);

    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      i++;
    } else {
      arr[k] = rightArray[j];
      j++;
    }
    bars[k].style.height = `${arr[k] * 3}px`;
    bars[k].style.backgroundColor = 'skyblue';
    k++;
  }

  while (i < n1) {
    bars[k].style.backgroundColor = 'red';
    await sleep(animationSpeed);
    arr[k] = leftArray[i];
    bars[k].style.height = `${arr[k] * 3}px`;
    bars[k].style.backgroundColor = 'skyblue';
    i++;
    k++;
  }

  while (j < n2) {
    bars[k].style.backgroundColor = 'red';
    await sleep(animationSpeed);
    arr[k] = rightArray[j];
    bars[k].style.height = `${arr[k] * 3}px`;
    bars[k].style.backgroundColor = 'skyblue';
    j++;
    k++;
  }
}

// 5. Quick Sort
async function quickSortWrapper() {
  await quickSort(unsortedArray, 0, unsortedArray.length - 1);
  // Mark all bars as sorted
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = 'green';
  }
}

async function quickSort(arr, low, high) {
  if (low < high) {
    const pi = await partition(arr, low, high);

    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}

async function partition(arr, low, high) {
  let pivot = arr[high];
  bars[high].style.backgroundColor = 'red';

  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].style.backgroundColor = 'yellow';
    await sleep(animationSpeed);

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      bars[i].style.height = `${arr[i] * 3}px`;
      bars[j].style.height = `${arr[j] * 3}px`;
    }

    bars[j].style.backgroundColor = 'skyblue';
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  bars[i + 1].style.height = `${arr[i + 1] * 3}px`;
  bars[high].style.height = `${arr[high] * 3}px`;

  bars[high].style.backgroundColor = 'skyblue';
  return i + 1;
}

// 6. Heap Sort
async function heapSort() {
  let n = unsortedArray.length;

  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(unsortedArray, n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    // Swap
    [unsortedArray[0], unsortedArray[i]] = [unsortedArray[i], unsortedArray[0]];
    bars[0].style.height = `${unsortedArray[0] * 3}px`;
    bars[i].style.height = `${unsortedArray[i] * 3}px`;

    bars[i].style.backgroundColor = 'green';

    await heapify(unsortedArray, i, 0);
  }
  bars[0].style.backgroundColor = 'green';
}

async function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) {
    largest = l;
  }

  if (r < n && arr[r] > arr[largest]) {
    largest = r;
  }

  if (largest !== i) {
    // Swap
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    bars[i].style.height = `${arr[i] * 3}px`;
    bars[largest].style.height = `${arr[largest] * 3}px`;

    bars[i].style.backgroundColor = 'red';
    bars[largest].style.backgroundColor = 'red';

    await sleep(animationSpeed);

    bars[i].style.backgroundColor = 'skyblue';
    bars[largest].style.backgroundColor = 'skyblue';

    await heapify(arr, n, largest);
  }
}

// 7. Counting Sort
async function countingSort() {
  let max = Math.max(...unsortedArray);
  let count = new Array(max + 1).fill(0);

  for (let i = 0; i < unsortedArray.length; i++) {
    count[unsortedArray[i]]++;
  }

  let index = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      unsortedArray[index] = i;
      bars[index].style.height = `${i * 3}px`;

      bars[index].style.backgroundColor = 'red';
      await sleep(animationSpeed);
      bars[index].style.backgroundColor = 'green';

      index++;
      count[i]--;
    }
  }
}

// 8. Radix Sort
async function radixSort() {
  let max = Math.max(...unsortedArray);
  let exp = 1;

  while (Math.floor(max / exp) > 0) {
    await countingSortForRadix(exp);
    exp *= 10;
  }

  // Mark all bars as sorted
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = 'green';
  }
}

async function countingSortForRadix(exp) {
  let output = new Array(unsortedArray.length).fill(0);
  let count = new Array(10).fill(0);

  for (let i = 0; i < unsortedArray.length; i++) {
    let index = Math.floor(unsortedArray[i] / exp) % 10;
    count[index]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = unsortedArray.length - 1; i >= 0; i--) {
    let index = Math.floor(unsortedArray[i] / exp) % 10;
    output[count[index] - 1] = unsortedArray[i];
    count[index]--;
  }

  for (let i = 0; i < unsortedArray.length; i++) {
    unsortedArray[i] = output[i];
    bars[i].style.height = `${unsortedArray[i] * 3}px`;

    bars[i].style.backgroundColor = 'red';
    await sleep(animationSpeed);
    bars[i].style.backgroundColor = 'skyblue';
  }
}

// 9. Bucket Sort
async function bucketSort() {
  let max = Math.max(...unsortedArray);
  let min = Math.min(...unsortedArray);
  let bucketCount = Math.floor(Math.sqrt(unsortedArray.length));
  let buckets = Array.from({ length: bucketCount }, () => []);

  // Distribute array elements into buckets
  for (let i = 0; i < unsortedArray.length; i++) {
    let idx = Math.floor(((unsortedArray[i] - min) / (max - min + 1)) * bucketCount);
    buckets[idx].push(unsortedArray[i]);
  }

  // Sort individual buckets and merge
  let index = 0;
  for (let i = 0; i < buckets.length; i++) {
    buckets[i].sort((a, b) => a - b);
    for (let j = 0; j < buckets[i].length; j++) {
      unsortedArray[index] = buckets[i][j];
      bars[index].style.height = `${unsortedArray[index] * 3}px`;

      bars[index].style.backgroundColor = 'red';
      await sleep(animationSpeed);
      bars[index].style.backgroundColor = 'green';

      index++;
    }
  }
}

// 10. Shell Sort
async function shellSort() {
  let n = unsortedArray.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = unsortedArray[i];
      let j;

      bars[i].style.backgroundColor = 'red';

      for (j = i; j >= gap && unsortedArray[j - gap] > temp; j -= gap) {
        unsortedArray[j] = unsortedArray[j - gap];
        bars[j].style.height = `${unsortedArray[j] * 3}px`;

        bars[j].style.backgroundColor = 'yellow';
        await sleep(animationSpeed);
        bars[j].style.backgroundColor = 'skyblue';
      }
      unsortedArray[j] = temp;
      bars[j].style.height = `${temp * 3}px`;

      bars[i].style.backgroundColor = 'skyblue';
    }
  }

  // Mark all bars as sorted
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = 'green';
  }
}
