// Wrap the code in DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  // Get reference to the table
  const table = document.getElementById('my-table');

  // create an array of three Promises
  const promises = [
    new Promise((resolve) => setTimeout(() => resolve('Promise 1'), Math.floor(Math.random() * 2000) + 1000)),
    new Promise((resolve) => setTimeout(() => resolve('Promise 2'), Math.floor(Math.random() * 2000) + 1000)),
    new Promise((resolve) => setTimeout(() => resolve('Promise 3'), Math.floor(Math.random() * 2000) + 1000))
  ];

  // create a row to display the total time taken
  const totalRow = document.createElement('tr');
  const totalTitleCell = document.createElement('td');
  const totalTimeCell = document.createElement('td');
  totalTitleCell.textContent = 'Total';
  totalTimeCell.textContent = '0.000';
  totalRow.appendChild(totalTitleCell);
  totalRow.appendChild(totalTimeCell);

  // add a row to the table to indicate that the data is loading
  table.appendChild(totalRow);
  table.insertAdjacentHTML('beforeend', '<tr id="loading"><td colspan="2">Loading...</td></tr>');

  // wait for all Promises to resolve using Promise.all
  const startTime = Date.now();
  Promise.all(promises.map(p => p.then(result => ({ result, time: (Date.now() - startTime) / 1000 })))).then((results) => {
    // remove the loading row
    const loadingRow = document.getElementById('loading');
    if (loadingRow) {
      loadingRow.parentNode.removeChild(loadingRow);
    }

    // populate the table with the results
    results.forEach((result, index) => {
      const row = document.createElement('tr');
      const titleCell = document.createElement('td');
      const timeCell = document.createElement('td');
      titleCell.textContent = result.result;
      timeCell.textContent = result.time.toFixed(3);
      row.appendChild(titleCell);
      row.appendChild(timeCell);
      table.appendChild(row);
    });

    // populate the total time row
    totalTimeCell.textContent = (Date.now() - startTime) / 1000;
  }).catch((error) => {
    console.error(error); // handle errors
  });
});
