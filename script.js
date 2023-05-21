document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('my-table');

  const promises = [
    new Promise((resolve) => setTimeout(() => resolve('Promise 1'), Math.floor(Math.random() * 2000) + 1000)),
    new Promise((resolve) => setTimeout(() => resolve('Promise 2'), Math.floor(Math.random() * 2000) + 1000)),
    new Promise((resolve) => setTimeout(() => resolve('Promise 3'), Math.floor(Math.random() * 2000) + 1000))
  ];

  const totalRow = document.createElement('tr');
  const totalTitleCell = document.createElement('td');
  const totalTimeCell = document.createElement('td');
  totalTitleCell.textContent = 'Total';
  totalTimeCell.textContent = '0.000';
  totalRow.appendChild(totalTitleCell);
  totalRow.appendChild(totalTimeCell);

  table.appendChild(totalRow);
  table.insertAdjacentHTML('beforeend', '<tr id="loading"><td colspan="2">Loading...</td></tr>');

  const startTime = Date.now();
  Promise.all(promises.map(p => p.then(result => ({ result, time: (Date.now() - startTime) / 1000 })))).then((results) => {
    const loadingRow = document.getElementById('loading');
    if (loadingRow) {
      loadingRow.parentNode.removeChild(loadingRow);
    }

    results.forEach((result) => {
      const row = document.createElement('tr');
      const titleCell = document.createElement('td');
      const timeCell = document.createElement('td');
      titleCell.textContent = result.result;
      timeCell.textContent = result.time.toFixed(3);
      row.appendChild(titleCell);
      row.appendChild(timeCell);
      table.querySelector('tbody').appendChild(row);
    });

    totalTimeCell.textContent = (Date.now() - startTime) / 1000;
  }).catch((error) => {
    console.error(error);
  });
});
