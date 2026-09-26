const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

addButton.addEventListener('click', () => {
  if (!todoInput.value) {
    return;
  }
  const todoItem = document.createElement('li');
  todoItem.className = 'todo-item';
  todoItem.innerHTML = `<span>${todoInput.value}</span><button class="delete-btn">Delete</button>`;
  const deleteBtn = todoItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    todoItem.remove();
  });
  todoList.appendChild(todoItem);
  todoInput.value = '';
});
