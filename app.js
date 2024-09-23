const newTodoInput = document.getElementById("new-todo");
const addTodoButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const newTodoText = newTodoInput.value.trim();
  if (newTodoText) {
    todos.push({ text: newTodoText, completed: false });
    newTodoInput.value = "";
    saveTodos();
    renderTodos();
  }
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");

    const todoText = document.createElement("span");
    todoText.classList.add("todo-text");
    todoText.textContent = todo.text;
    todoItem.appendChild(todoText);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("todo-actions");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    editButton.addEventListener("click", () => editTodoText(index));
    actionsDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteTodo(index));
    actionsDiv.appendChild(deleteButton);

    todoItem.appendChild(actionsDiv);
    todoList.appendChild(todoItem);
  });
}

function editTodoText(index) {
  const newTodoText = prompt("Edit the to-do:", todos[index].text);
  if (newTodoText) {
    todos[index].text = newTodoText.trim();
    saveTodos();
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

renderTodos();
addTodoButton.addEventListener("click", addTodo);
