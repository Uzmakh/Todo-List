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
    alert("Add a todo in the list!");
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

// Function edit todo
function editTodo(index) {
  const todoItem = todoList.children[index];

  // Ensure todo text is wrapped in a span
  const textContainer = todoItem.querySelector('span');
  if (!textContainer) {
    const span = document.createElement('span');
    span.textContent = todoItem.textContent.trim();
    todoItem.textContent = '';
    todoItem.appendChild(span);
  }

  // Access the actual span element
  const textElement = textContainer.firstChild; // Assuming only text content within the span

  // Replace text content with input
  const input = document.createElement('input');
  input.type = 'text';
  input.value = todoItem.textContent.trim();
  todoItem.replaceChild(input, textElement);

  input.focus();

  input.addEventListener('blur', () => {
    const newText = input.value.trim();
    if (newText !== '') {
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

    li.textContent = todo.text;
    if (todo.completed) {
      li.classList.add("completed");
    }
// creating button-container
     const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container"); // Optional: Add a class for styling
    
    // creating buttons 
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
      editTodo(index)
    }
      );

    buttonContainer.appendChild(removeButton);
    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(editButton);
  
 li.appendChild(buttonContainer);

    todoList.appendChild(li);
  });
}

// Event listener for the add todo button
addTodoButton.addEventListener("click", addTodo);
