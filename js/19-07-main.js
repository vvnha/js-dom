function createLiElement(todo) {
  if (!todo) return null;

  const liElement = document.createElement('li');
  liElement.textContent = todo.title;
  liElement.dataset.id = todo.id;

  return liElement;
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

(() => {
  const todoList = [
    { id: 1, title: 'A' },
    { id: 2, title: 'B' },
    { id: 3, title: 'C' },
  ];

  renderTodoList(todoList, 'todoList');
})();
