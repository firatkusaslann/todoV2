const formCard = document.querySelector("#form-card");
const formInput = document.querySelector(".form__input");
const taskList = document.querySelector(".tasks__list");
const deleteTodo = document.querySelectorAll(".delete_todo");
const clearTodos = document.querySelector(".clear__tasks");
const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const formBody = document.querySelector(".form__card__body");
const tasksBody = document.querySelector(".tasks__card__body");

eventListeners();
//----------------------------- eventListeners----------------------------------------
function eventListeners() {
  formCard.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  tasksBody.addEventListener("click", delTodo);
  searchButton.addEventListener("click", filtertodos);
  clearTodos.addEventListener("click", clearAllTodos);
}
//----------------------------- clearAllTodos------------------------------------------
function clearAllTodos() {
  if (confirm("Tümünü silmek istediğinize emin misiniz?")) {
    while (taskList.firstElementChild != null) {
      taskList.removeChild(taskList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

//----------------------------- filterTodos--------------------------------------------
function filtertodos(e) {
  const inputValue = searchInput.value.toLowerCase().trim();
  const listItems = document.querySelectorAll(".task");
  console.log(listItems);
  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase().trim();
    if (text.indexOf(inputValue) === -1) {
      listItem.setAttribute("style", "display : none !important");
    } else {
      listItem.setAttribute("style", "display : block");
    }
  });
  searchInput.value = "";
}

//----------------------------- delTodo------------------------------------------------
function delTodo(e) {
  if (e.target.className === "del_todo") {
    e.target.parentElement.parentElement.remove();
    showAlert("sucsess", "Todo Silindi");
    delTodoFromStorage(e.target.parentElement.parentElement.textContent);
  }
}
//----------------------------- delTodoFromStorage------------------------------------
function delTodoFromStorage(delTextOfTask) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === delTextOfTask) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

//----------------------------- loadAllTodosToUI--------------------------------------
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

//----------------------------- addTodo-----------------------------------------------
function addTodo(e) {
  const newTodo = formInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Bir Değer Giriniz..");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("sucsess", "Todo Başarıyla Eklendi..");
  }

  e.preventDefault();
}

//----------------------------- getTodosFromStorage-------------------------------------
function getTodosFromStorage(newTodo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

//----------------------------- addTodoToStorage----------------------------------------
function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//----------------------------- showAlert-----------------------------------------------
function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert ${type} flex f-d-row a-i-center white alert_style`;
  alert.textContent = message;
  formCard.appendChild(alert);
  setTimeout(function () {
    alert.remove();
  }, 1000);
}

//----------------------------- addTodoToUI--------------------------------------------
function addTodoToUI(newTodo) {
  const listItem = document.createElement("li");
  listItem.className = "task bg-grey f-s-16 flex j-c-start a-i-center";

  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete_todo";
  link.innerHTML = "<img src='./img/del.svg'  class='del_todo'>";

  listItem.appendChild(link);
  listItem.appendChild(document.createTextNode(newTodo));
  taskList.appendChild(listItem);

  formInput.value = "";
}
