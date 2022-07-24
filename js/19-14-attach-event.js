function createLiElement(todo) {
  if (!todo) return null;

  //find template
  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return null;

  //clone template
  //todoTemplate.content is document fragment of template
  //because template has one child => get first chils
  const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);
  todoElement.dataset.id = todo.id;
  todoElement.dataset.status = todo.status;

  const todoDivElement = todoElement.querySelector('.todo');
  if (!todoDivElement) return;

  const todoTitle = todoElement.querySelector('.todo__title');
  if (todoTitle) todoTitle.textContent = todo.title;

  const elementStatus = todoElement.dataset.status;
  const elementStatusColor = elementStatus === 'completed' ? 'alert-success' : 'alert-secondary';
  todoDivElement.classList.remove('alert-secondary');
  todoDivElement.classList.add(elementStatusColor);

  const markAsDoneButton = todoElement.querySelector('button.mark-as-done');

  if (markAsDoneButton) {
    markAsDoneButton.textContent = todoElement.dataset.status === 'pending' ? 'Finish' : 'Reset';
    markAsDoneButton.classList.remove('btn-success');
    markAsDoneButton.classList.add(
      todoElement.dataset.status === 'pending' ? 'btn-success' : 'btn-dark'
    );

    markAsDoneButton.addEventListener('click', () => {
      const currentStatus = todoElement.dataset.status;
      const todoNewStatus = currentStatus === 'pending' ? 'completed' : 'pending';
      const todoButtonColor = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';

      // update localStogare
      const todoList = getTodoList();
      const todoIndex = todoList.findIndex((x) => x.id === todo.id);
      todoList[todoIndex].status = todoNewStatus;
      localStorage.setItem('todo_list', JSON.stringify(todoList));

      todoElement.dataset.status = todoNewStatus;
      todoDivElement.classList.remove('alert-success', 'alert-secondary');
      todoDivElement.classList.add(todoButtonColor);

      markAsDoneButton.textContent = currentStatus === 'pending' ? 'Reset' : 'Finish';
      markAsDoneButton.classList.remove('btn-dark', 'btn-success');
      markAsDoneButton.classList.add(currentStatus === 'pending' ? 'btn-dark' : 'btn-success');
    });
  }

  const removeButton = todoElement.querySelector('button.remove');

  if (removeButton) {
    removeButton.addEventListener('click', () => {
      const todoList = getTodoList();
      const newTodoList = todoList.filter((x) => x.id !== todo.id);
      localStorage.setItem('todo_list', JSON.stringify(newTodoList));

      todoElement.remove();
    });
  }

  return todoElement;
}

function renderTodoList(todoList, ulElementId) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  const ulElement = document.getElementById(ulElementId);

  if (!ulElement) return;

  for (const todo of todoList) {
    const liElement = createLiElement(todo);
    ulElement.appendChild(liElement);
  }
}

function getTodoList(inputTodoList = []) {
  try {
    const todoList = localStorage.getItem('todo_list');

    if (!todoList) {
      localStorage.setItem('todo_list', JSON.stringify(inputTodoList));
      return inputTodoList;
    }
    return JSON.parse(todoList);
  } catch {
    return [];
  }
}

(() => {
  const todoList = [
    { id: 1, title: 'NextJs', status: 'pending' },
    { id: 2, title: 'JavaScript', status: 'completed' },
    { id: 3, title: 'ReactJs', status: 'pending' },
  ];

  renderTodoList(getTodoList(todoList), 'todoList');
})();
