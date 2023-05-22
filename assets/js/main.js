const input = document.querySelector(".input");
const button = document.querySelector(".button");
const tasks = document.querySelector(".tasks");

function createLi() {
  const li = document.createElement("li");
  return li;
}

function deleteTask(li) {
  const button = document.createElement("button");
  li.innerText += " ";
  button.innerText = "Apagar";
  li.appendChild(button);
  button.setAttribute("class", "delete");
}

function saveTask() {
  const allTaks = tasks.querySelectorAll("li");
  const taskList = [];

  for (let tasks of allTaks) {
    let taskText = tasks.innerText;
    taskText = taskText.replace("Apagar", "").trim();
    taskList.push(taskText);
  }

  const taskJson = JSON.stringify(taskList);
  localStorage.setItem("tarefas", taskJson);
}

function reload() {
  const task = localStorage.getItem("tarefas");
  const taskList = JSON.parse(task);

  for (let tasks of taskList) {
    createTask(tasks);
  }
}

function createTask(task) {
  const li = createLi();
  li.innerText = task;
  tasks.appendChild(li);
  clearInput();
  deleteTask(li);
  saveTask();
}

function clearInput() {
  input.value = "";
  input.focus();
}

button.addEventListener("click", function (e) {
  if (!input.value) return;
  createTask(input.value);
});

input.addEventListener("keypress", function (e) {
  if (!input.value) return;
  if (e.keyCode === 13) createTask(input.value);
});

document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("delete")) {
    el.parentElement.remove();
    saveTask();
  }
});

reload();
