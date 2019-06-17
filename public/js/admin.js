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

function addRow(id, serviceId, userId, executorId, regTime, appTime, doc, caddr, daddr, sl, pm) {
  const table = document.getElementById('spreadsheet');
  const row = document.createElement('tr');
  const tdId = document.createElement('td');
  tdId.appendChild(document.createTextNode(id));
  const tdServiceId = document.createElement('td');
  tdServiceId.appendChild(document.createTextNode(serviceId));
  const tdUserId = document.createElement('td');
  tdUserId.appendChild(document.createTextNode(userId));
  const tdExecutorId = document.createElement('td');
  tdExecutorId.appendChild(document.createTextNode(executorId));
  const tdRegTime = document.createElement('td');
  tdRegTime.appendChild(document.createTextNode(regTime));
  const tdAppTime = document.createElement('td');
  tdAppTime.appendChild(document.createTextNode(appTime));
  const tddoc = document.createElement('td');
  tddoc.appendChild(document.createTextNode(doc));
  const tdcaddr = document.createElement('td');
  tdcaddr.appendChild(document.createTextNode(caddr));
  const tddaddr = document.createElement('td');
  tddaddr.appendChild(document.createTextNode(daddr));
  const tdsl = document.createElement('td');
  tdsl.appendChild(document.createTextNode(sl));
  const tdpm = document.createElement('td');
  tdpm.appendChild(document.createTextNode(pm));
  row.appendChild(tdId);
  row.appendChild(tdServiceId);
  row.appendChild(tdUserId);
  row.appendChild(tdExecutorId);
  row.appendChild(tdRegTime);
  row.appendChild(tdAppTime);
  row.appendChild(tddoc);
  row.appendChild(tdcaddr);
  row.appendChild(tddaddr);
  row.appendChild(tdsl);
  row.appendChild(tdpm);
  table.appendChild(row);
}

function getOrders() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'api/orders/');
  xhr.send();
  let orders;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      orders = JSON.parse(xhr.responseText);
      if (orders.status === 200) {
        console.log('Заказы получены');
      }
    } else {
      // console.log(xhr.responseText);
    }
  };
  return orders;
}

document.onreadystatechange = () => {
  const orders = getOrders();
  console.log(orders);

  orders.forEach((el) => {
    console.log(el);
    addRow(el.id, el['service id'], el['user id'], el['executor id'], el['registration time'], el['appointed time'], el['date of completion'], el['client address'], el['destination address'], el['shopping list'], el['payment method']);
  });
};
