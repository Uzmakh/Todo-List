const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

// Create an empty array to store todos
let todos = [];

// Function to add a todo to the list
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const todo = {
      text: todoText,
      completed: false,
    };
    todos.push(todo);
    renderTodos();
    todoInput.value = "";
  } else {
    alert("Add a todo to the list!");
  }
}

// Function to remove a todo from the list
function removeTodo(index) {
  if (confirm("Are you sure you want to remove this todo?")) {
    todos.splice(index, 1);
    renderTodos();
  }
}

// Function to toggle todo completion
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

// Function to edit todo
function editTodo(index) {
  const todoItem = todoList.children[index];
  
  // Ensure todo text is wrapped in a span
  let textContainer = todoItem.querySelector('span');
  if (!textContainer) {
    textContainer = document.createElement('span');
    textContainer.textContent = todoItem.textContent.trim();
    todoItem.textContent = '';
    todoItem.insertBefore(textContainer, todoItem.firstChild);
  }

  // Replace text content with input
  const input = document.createElement('input');
  input.type = 'text';
  input.value = textContainer.textContent.trim();
  todoItem.replaceChild(input, textContainer);

  input.focus();

  input.addEventListener('blur', () => {
    const newText = input.value.trim();
    if (newText !== '') {
      todos[index].text = newText;  // Update the todo text in the array
      textContainer.textContent = newText;
      todoItem.replaceChild(textContainer, input);
    } else {
      // Handle empty input
      console.error('Todo text cannot be empty');
    }
  });
}

// Function to render the todos to the UI
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    const textContainer = document.createElement("span");
    textContainer.textContent = todo.text;
    li.appendChild(textContainer);

    if (todo.completed) {
      li.classList.add("completed");
    }

    // Creating button-container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container"); // Optional: Add a class for styling
    
    // Creating buttons 
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeTodo(index));

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.addEventListener("click", () => toggleComplete(index));

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      console.log('Edit button clicked');
      editTodo(index);
    });

    buttonContainer.appendChild(removeButton);
    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(editButton);
  
    li.appendChild(buttonContainer);
    todoList.appendChild(li);
  });
}

// Event listener for the add todo button
addTodoButton.addEventListener("click", addTodo);
