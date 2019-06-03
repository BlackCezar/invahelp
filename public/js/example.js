/* eslint-disable  */
function addTask(e) {
  e.preventDefault();

  if (addInput.attributes.placeholder.value === 'Еще нет ни одной задачи, пора это справить!') {
    addInput.attributes.placeholder.value = 'Введите название задачи';
  }
  if (checkEmptyInput(addInput.value)) {
    if (todoList.lastChild) {
      lastID += 1;
    }
    const string = addInput.value.trim();
    const task = JSON.stringify({
      id: lastID,
      text: string
    });
    const xhr = new XMLHttpRequest();

    if (checkEmptyInput(string)) {
      xhr.open('POST', '/addTask');
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(task);
      addTodoItem(string);
      lastID = parseInt(todoList.lastChild.id, 10);
      addInput.value = '';
    } else {
      addInput.value = '';
    }
  } else {
    addInput.attributes.placeholder.value = 'Необходимо ввести название задачи';
  }
}

function getTasks(e) {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/getTasks');
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (xhr.responseText === '') {
        addInput.attributes.placeholder.value = 'Еще нет ни одной задачи, пора это справить!';
      } else {
        const response = JSON.parse(xhr.responseText);
        response.forEach((obj) => {
          const el = JSON.parse(obj);
          lastID = el.id;
          addTodoItem(el.text);
        });
      }
    }
  };
}
