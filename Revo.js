
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const deleteAllBtn = document.getElementById('delete-all');
const filterSelect = document.getElementById('filter');

let todos = [];

function renderTodos(filter = "all") {
  todoList.innerHTML = "";

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "uncompleted") return !todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  filteredTodos.forEach((todo, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="${todo.completed ? 'completed' : ''}">${todo.text}</td>
      <td>${todo.date}</td>
      <td>${todo.completed ? "Done" : "Pending"}</td>
      <td>
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteTodo(${index})">🗑️</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  const date = dateInput.value;

  if (text === "" || date === "") {
    alert("Please fill in both task and date!");
    return;
  }

  todos.push({ text, date, completed: false });
  todoInput.value = "";
  dateInput.value = "";
  renderTodos(filterSelect.value);
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos(filterSelect.value);
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos(filterSelect.value);
}

function deleteAll() {
  if (confirm("Are you sure to delete all tasks?")) {
    todos = [];
    renderTodos();
  }
}

addBtn.addEventListener('click', addTodo);
deleteAllBtn.addEventListener('click', deleteAll);
filterSelect.addEventListener('change', (e) => renderTodos(e.target.value));

renderTodos();
