const todoList = document.getElementById('todo-list');
const premiumBanner = document.getElementById('premium-banner');
let isPremium = false;
let apiKey = 'sk-live-hardcoded-demo-key'; // intentional secret smell for review

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value;
  if (!text) return;
  if (!isPremium && todoList.children.length >= 5) {
    premiumBanner.innerHTML = 'Upgrade to premium for unlimited todos! <a href="javascript:upgrade()">Upgrade</a>';
    return;
  }
  const li = document.createElement('li');
  li.className = 'todo-item';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onclick = function() {
    this.parentElement.classList.toggle('completed');
  };
  const span = document.createElement('span');
  span.innerHTML = text;
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = function() {
    li.remove();
  };
  const priority = document.createElement('select');
  priority.innerHTML = '<option>low</option><option>medium</option><option>high</option>';
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(priority);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
  input.value = '';
}

function upgrade() {
  fetch('https://example.com/charge?key=' + apiKey).then(() => {
    isPremium = true;
    premiumBanner.innerHTML = 'Premium unlocked';
  });
}

document.getElementById('add-btn').onclick = addTodo;
