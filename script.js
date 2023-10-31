loadTasksList();
function loadTasksList() {
  const tasksList = getTasksListFromLocalStorage();

  displayTasks(tasksList);

  randomFont();
}

function addTask() {
  const valid = validation();
  if (!valid) return;

  const task = getTask();

  const tasksList = getTasksListFromLocalStorage();

  tasksList.push(task);

  saveTasksListToLocalStorage(tasksList);

  displayTasks(tasksList);

  addFadeInClass();

  clearValues();
}

function validation() {
  const textBox = document.getElementById("textBox");
  const dateBox = document.getElementById("dateBox");
  const timeBox = document.getElementById("timeBox");
  const textBoxErr = document.getElementById("textBoxErr");

  textBoxErr.innerText = "";
  dateBox.style.border = "";
  timeBox.style.border = "";
  textBox.style.border = "";

  const text = textBox.value;
  const date = dateBox.value;
  const time = timeBox.value;

  if (!text) {
    textBoxErr.innerText = "Enter A Task Please!!";
    textBox.focus();
    textBox.style.border = "3px solid red";
    return false;
  }
  if (!date) {
    dateBox.focus();
    dateBox.style.border = "3px solid red";
    return false;
  }
  if (!time) {
    timeBox.focus();
    timeBox.style.border = "3px solid red";
    return false;
  }
  return true;
}

function getTask() {
  const textBox = document.getElementById("textBox");
  const dateBox = document.getElementById("dateBox");
  const timeBox = document.getElementById("timeBox");

  const text = textBox.value;
  const date = dateBox.value;
  const time = timeBox.value;

  const task = {
    text,
    date,
    time,
  };
  return task;
}

function getTasksListFromLocalStorage() {
  const tasksListStr = localStorage.getItem("tasksList");

  const tasksList = !tasksListStr ? [] : JSON.parse(tasksListStr);

  return tasksList;
}

function saveTasksListToLocalStorage(tasksList) {
  const tasksListStr = JSON.stringify(tasksList);

  localStorage.setItem("tasksList", tasksListStr);
}

function displayTasks(tasksList) {
  const notesBox = document.getElementById("notesBox");

  notesBox.innerHTML = "";

  let index = 0;

  for (const task of tasksList) {
    const note = `
            <div class="note" onmouseenter="showDeleteLogo(${index})" onmouseleave="removeDeleteLogo(${index})">
              <i id="logo${index}" onclick="deleteTask(${index})" class="removeLogo fa-regular fa-trash-can"></i>
              <p>${task.text}</p>
              <p>${task.date}</p>
              <p>${task.time}</p>
            </div>
        `;

    index++;
    notesBox.innerHTML += note;
  }
}

function clearValues() {
  document.getElementById("textBox").value = "";
  document.getElementById("dateBox").value = "";
  document.getElementById("timeBox").value = "";
  document.getElementById("textBoxErr").innerText = "";

  document.getElementById("textBox").style.border = "";
  document.getElementById("dateBox").style.border = "";
  document.getElementById("timeBox").style.border = "";
}

function deleteTask(index) {
  const tasksList = getTasksListFromLocalStorage();

  tasksList.splice(index, 1);

  saveTasksListToLocalStorage(tasksList);

  displayTasks(tasksList);
}

function showDeleteLogo(index) {
  const removeLogo = document.getElementById(`logo${index}`);
  removeLogo.style.visibility = "visible";
}
function removeDeleteLogo(index) {
  const removeLogo = document.getElementById(`logo${index}`);
  removeLogo.style.visibility = "hidden";
}

function addFadeInClass() {
  const newTaskElement = document.querySelector(".note:last-of-type");
  newTaskElement.classList.add("fade-in");
}

function randomFont(){
  const random = Math.floor(Math.random() * 3) + 1;
  const fontBox = document.getElementById("fontBox");

  fontBox.style.fontFamily = `font${random}`;
}

