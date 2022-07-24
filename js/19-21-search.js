function getTodoList() {
  return document.getElementById('todoList').querySelectorAll('li');
}

function debounce(callback, wait) {
  let timeoutId;

  return function () {
    if (!timeoutId) clearTimeout(timeoutId);
    setTimeout(callback, wait);
  };
}

function isMatch(liElement, searchTerm) {
  if (!liElement) return false;
  if (searchTerm.length <= 0) return true;

  const liTitle = liElement.querySelector('.todo__title');

  if (!liTitle) return false;

  return liTitle.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function searchTodo(searchTerm) {
  const todoList = getTodoList();

  for (const liElement of todoList) {
    if (isMatch(liElement, searchTerm)) liElement.hidden = false;
    else liElement.hidden = true;
  }
}

function initSearchInput() {
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;

  const params = getParams();
  const searchTerm = params.get('search');

  if (searchTerm) {
    searchInput.value = searchTerm;
  }

  searchInput.addEventListener('input', () => {
    const dbouncer = debounce(() => {
      // searchTodo(searchInput.value);
      handleChangeFilter('search', searchInput.value);
    }, 2000);

    dbouncer();
  });
}

function filterStatus(filterSearch) {
  const todoList = getTodoList();

  for (const liElement of todoList) {
    const needToShow = filterSearch === 'all' || liElement.dataset.status === filterSearch;
    liElement.hidden = !needToShow;
  }
}

function initFilterStatus() {
  const filterStatusSelect = document.getElementById('statusFilter');
  if (!filterStatusSelect) return;

  const params = getParams();
  const filterStatusTerm = params.get('filter');

  if (filterStatusTerm) {
    filterStatusSelect.value = filterStatusTerm;
  }

  filterStatusSelect.addEventListener('change', () => {
    // filterStatus(filterStatusSelect.value);

    handleChangeFilter('filter', filterStatusSelect.value);
  });
}

function handleChangeFilter(type, value) {
  const parsedUrl = new URL(window.location);
  if (parsedUrl.searchParams.has(type)) parsedUrl.searchParams.set(type, value);
  else parsedUrl.searchParams.append(type, value);
  history.pushState({}, '', parsedUrl);
  filterAll();
}

function getParams() {
  const parsedUrl = new URL(window.location);
  return parsedUrl.searchParams;
}

function filterAll() {
  const params = getParams();
  const filterStatusTerm = params.get('filter');
  const searchTerm = params.get('search');

  if (filterStatusTerm === null && searchTerm === null) return;
  const todoList = getTodoList();

  for (const liElement of todoList) {
    const needToShowWithFilter =
      filterStatusTerm === 'all' ||
      liElement.dataset.status === filterStatusTerm ||
      filterStatusTerm === null;
    const needToShowWithSearch = isMatch(liElement, searchTerm) || searchTerm === null;

    liElement.hidden = !(needToShowWithFilter && needToShowWithSearch);
  }
}

(() => {
  initSearchInput();
  initFilterStatus();
  filterAll();
})();
