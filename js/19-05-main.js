console.log('ABC');

(() => {
  const channelName = 'Newt';
  console.log(channelName);

  const ulElement = document.getElementById('todoList');

  const liElementList = ulElement.querySelectorAll('li');
  console.log(liElementList);

  if (liElementList) {
    for (const li of liElementList) {
      console.log(li);
    }
  }
})();
