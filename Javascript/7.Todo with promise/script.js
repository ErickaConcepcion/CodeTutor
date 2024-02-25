const todoList = document.getElementById("todos");
const previewTodo = document.querySelector(".todo--preview");
const addTodoForm = document.getElementById("add-todo");
const todos = [
  {
    id: 1,
    content: "delectus aut autem",
    completed: false
  },
  {
    id: 2,
    content: "quis ut nam facilis et officia qui",
    completed: false
  },
  {
    id: 3,
    content: "fugiat veniam minus",
    completed: false
  },
  {
    id: 4,
    content: "et porro tempora",
    completed: true
  }
];

// 1. Create a displayTodo function that takes a todo object as input and renders it as a todo item in the todo list. Make sure that completed items have class "todo--completed" and has a button that have onClick listener that will invoke the deleteTodo function. Aside from displaying the content please also display the id in a span with a class of "todo-id".

function displayTodo() {
  todoList.classList.add("hidden");
  todos.forEach((todo) => {
    //creating li element
    const listElement = document.createElement("li");
    listElement.classList.add("todo", "todo--completed");
    document.querySelector("#todos").appendChild(listElement);

    //creating span
    const spanElement = document.createElement("span");
    spanElement.classList.add("todo__content", "todo-id");
    spanElement.innerText = `${todo.content}`;
    listElement.appendChild(spanElement);

    //creating button element
    const buttonClose = document.createElement("button");
    buttonClose.innerText = "Close";
    buttonClose.classList.add("todo__close");

    //DELETE EVENT BUTTON
    buttonClose.addEventListener("click", function (ev) {
        removeTodo(ev.target.parentElement).then().catch();
    });

    listElement.appendChild(buttonClose);
  });

  //creating onClick Event
}
displayTodo();

// PUT YOUR displayTodo FUNCTION HERE

// 2. Create a getTodo function that has a setTimeout method that will fetch each todos on the todos variable. Set the timeout to 1 second. The todos should be displayed in the initial run. Add a "Loading Todos..." text before the setTimeout function and toggle the hidden class after the todos has been loaded.
/* HINT:
  const loading = document.createElement("h3")
  loading.textContent = "Loading Todos..."
  todoList.appendChild(loading);
*/
function getTodo() {
  const loadingElement = document.createElement("h3");
  loadingElement.textContent = "Loading Todos...";
  const todoAll = document.getElementById("todos");
  document.body.insertBefore(loadingElement, todoAll);

  //setTimeOut
  setTimeout(function () {
    loadingElement.remove();
    todoAll.classList.remove("hidden");
  }, 1000);
}
getTodo();
// PUT YOUR getTodo FUNCTION HERE

// 3. Modify the createTodo function to have a callback of displaying the todo list after inserting the new todo item into the todos array variable.
function createTodo({ id, content, completed = false }) {
  const newTodo = {
    id: id,
    content: content,
    completed: false
  };
  todos.push(newTodo);
  console.log(todos);
  //creating new element
  //creating li element
  const listElement = document.createElement("li");
  listElement.classList.add("todo");
  //eventlistener for listElement

  document.querySelector("#todos").appendChild(listElement);

  //creating span
  const spanElement = document.createElement("span");
  spanElement.classList.add("todo__content", "todo-id");
  spanElement.innerText = `${content}`;
  listElement.appendChild(spanElement);

  //creating button element
  const buttonClose = document.createElement("button");
  buttonClose.innerText = "Close";
  buttonClose.classList.add("todo__close");
  listElement.appendChild(buttonClose);
  listElement.addEventListener("click", toggleTodo);

  //creating delete Element
  buttonClose.addEventListener("click", function (ev) {
    removeTodo(ev.target.parentElement);
    console.log(todos)
});

}

// Retain this code to have the functionality to have a striketrough on the todo list items.
function toggleTodo(event) {
  const todo = event.target.closest(".todo");
  todo.classList.toggle("todo--completed");
}

// 4. Modify the removeTodo function to return a promise that has a setTimeout method that resolves after 500ms. This removeTodo function will remove the item in the todos array variable based from its id. The Promise should have a proper resolve and reject invocations.

//5. Create another deleteTodo function that invokes the removeTodo and having a then function that calls the getTodo function and catches the error and log it in the console. To test the error invoke the displayTodo function after the getTodo function and add this object:
/*{
  id: 0,
  content: "this item should return an error when you try to delete it.",
  completed: false
}*/
function removeTodo(cardBody) {
    let index = Array.from(cardBody.parentElement.children).indexOf(cardBody);

    // Remove the todo item from the todos array
    todos.splice(index, 1);

    // Remove the cardBody from the DOM
    cardBody.parentElement.removeChild(cardBody);
    console.log(todos);
}

function deleteTodo(event) {
  // PUT YOUR CODE HERE
}

function submitNewTodo(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const content = formData.get("content");
  const id = Math.max.apply(null, todos.map(function (o) { return o.id; })) + 1;

  createTodo({ id, content, completed: false });
  form.reset();
}

addTodoForm.addEventListener("submit", submitNewTodo);
