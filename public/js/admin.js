// const table = document.querySelector('table');

// const rows = table.querySelectorAll('tr');
// const columns = rows.querySelectorAll('td');

// rows.forEach((row) => {
//   row.addEventListener('mouseover', () => {
//     const columns = row.querySelectorAll('td');
//     columns.forEach((column) => {
//       column.style.background = '#6b7e00';
//     });
//   });
//   row.addEventListener('mouseout', () => {
//     const columns = row.querySelectorAll('td');
//     columns.forEach((column) => {
//       column.style.background = '#555555';
//     });
//   });
// });

document.onload = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/orders/');
};
