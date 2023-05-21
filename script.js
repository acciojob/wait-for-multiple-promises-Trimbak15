// Select the table element
const table = document.getElementById('myTable');

// Create a row with loading text
const loadingRow = document.createElement('tr');
const loadingCell = document.createElement('td');
loadingCell.setAttribute('colspan', '2');
loadingCell.textContent = 'Loading...';
loadingRow.appendChild(loadingCell);
table.appendChild(loadingRow);

// Helper function to generate a random time between min and max seconds
function getRandomTime(min, max) {
  return Math.random() * (max - min) + min;
}

// Create an array of Promises
const promises = [
  new Promise((resolve) => {
    const time = getRandomTime(1, 3);
    setTimeout(() => resolve(time), time * 1000);
  }),
  new Promise((resolve) => {
    const time = getRandomTime(1, 3);
    setTimeout(() => resolve(time), time * 1000);
  }),
  new Promise((resolve) => {
    const time = getRandomTime(1, 3);
    setTimeout(() => resolve(time), time * 1000);
  }),
];

// Wait for all promises to resolve using Promise.all
Promise.all(promises)
  .then((results) => {
    // Remove the loading row
    table.removeChild(loadingRow);

    // Create rows for each promise result
    results.forEach((time, index) => {
      const row = document.createElement('tr');
      const firstColumn = document.createElement('td');
      const secondColumn = document.createElement('td');

      firstColumn.textContent = `Promise ${index + 1}`;
      secondColumn.textContent = time.toFixed(3);

      row.appendChild(firstColumn);
      row.appendChild(secondColumn);
      table.appendChild(row);
    });

    // Calculate and add the total row
    const totalRow = document.createElement('tr');
    const totalFirstColumn = document.createElement('td');
    const totalSecondColumn = document.createElement('td');

    totalFirstColumn.textContent = 'Total';
    totalSecondColumn.textContent = results.reduce((total, time) => total + time, 0).toFixed(3);

    totalRow.appendChild(totalFirstColumn);
    totalRow.appendChild(totalSecondColumn);
    table.appendChild(totalRow);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
