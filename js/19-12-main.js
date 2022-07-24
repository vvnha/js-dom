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
  const todoTitle = todoElement.querySelector('.todo__title');

  if (todoTitle) todoTitle.textContent = todo.title;

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

(() => {
  const todoList = [
    { id: 1, title: 'NextJs' },
    { id: 2, title: 'JavaScript' },
    { id: 3, title: 'ReactJs' },
  ];

  renderTodoList(todoList, 'todoList');
})();
