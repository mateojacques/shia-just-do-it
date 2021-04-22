const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const tasks = document.querySelector("#tasks");
const alert = document.querySelector(".alert");

const setBackToDefault = () => {
  input.value = "";
};

const displayAlert = (text) => {
  alert.innerHTML = text;
  alert.classList.remove("d-none");
  setTimeout(() => {
    alert.classList.add("d-none");
  }, 2000);
};

const deleteFromLocalStorage = (id) => {
  const items = getLocalStorage();
  const updItems = items.filter((item) => item.id != id);
  localStorage.setItem("list", JSON.stringify(updItems));
};

const deleteTask = (e) => {
  const task = e.currentTarget.parentElement.parentElement;
  const id = task.id;
  const alert = document.querySelector("#empty-list");
  tasks.removeChild(task);

  displayAlert("*disappointed face*");
  deleteFromLocalStorage(id);
  setBackToDefault();
  if (tasks.children.length === 0) {
    alert.classList.add("show");
  }
};

const editLocalStorage = (id, value) => {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id == id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
};

const editTask = (e) => {
  const task = e.currentTarget.parentElement.parentElement;
  const id = task.id;
  const oldTitle = task.childNodes[1];
  const newTitle = window.prompt("Enter a new title: ");
  oldTitle.innerHTML = newTitle;

  displayAlert("JUST DO IT!");
  editLocalStorage(id, newTitle);
};

const getLocalStorage = () => {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
};

const createTask = (id, value) => {
  let task = document.createElement("div");
  let taskTitle;
  let taskBtns;
  task.id = id;
  task.value = value;
  task.classList.add(
    "task",
    "container-fluid",
    "py-4",
    "px-5",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "mb-4"
  );
  for (let i = 0; i < tasks.children.length + 1; i++) {
    if (i % 2 === 0) {
      task.classList.add("bg-light");
      task.classList.remove("bg-info");
      taskTitle = `<h3 class="task-title word-break m-0 text-uppercase text-dark">${value}</h3>`;
      taskBtns = `
      <button class="task-edit btn"><i class="fas fa-edit"></i></button>
      <button class="task-delete btn"><i class="fas fa-trash"></i></button>`;
    } else {
      task.classList.add("bg-secondary");
      task.classList.remove("bg-light");
      taskTitle = `<h3 class="task-title word-break m-0 text-uppercase text-light">${value}</h3>`;
      taskBtns = `
      <button class="task-edit btn text-light"><i class="fas fa-edit"></i></button>
      <button class="task-delete btn text-light"><i class="fas fa-trash"></i></button>`;
    }
  }

  task.innerHTML = `
                   
                   ${taskTitle}
                    <div class="task-options d-flex justify-content-end align-items-center">
                    ${taskBtns}
                    </div>
                    `;

  tasks.appendChild(task);

  const editBtn = task.querySelector(".task-edit");
  const deleteBtn = task.querySelector(".task-delete");

  editBtn.addEventListener("click", editTask);
  deleteBtn.addEventListener("click", deleteTask);
};

const addTaskToLocalStorage = (id, value) => {
  const task = { id, value };
  const items = getLocalStorage();
  items.push(task);
  localStorage.setItem("list", JSON.stringify(items));
};

const addTask = (e) => {
  e.preventDefault();
  const id = Math.floor(Math.random() * 1000);
  const value = input.value;
  const alert = document.querySelector("#empty-list");
  createTask(id, value);

  displayAlert("JUST DO IT!");
  addTaskToLocalStorage(id, value);
  setBackToDefault();
  if (tasks.children.length !== 0) {
    alert.classList.remove("show");
  }
};

form.addEventListener("submit", addTask);

window.addEventListener("DOMContentLoaded", () => {
  const items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      if (item.completed === true) {
        createTask(item.id, item.value, true);
      } else {
        createTask(item.id, item.value);
      }
    });
  } else {
    const alert = document.querySelector("#empty-list");

    alert.classList.add("show");
  }

  const options = document.querySelectorAll(".task-options");

  if(window.matchMedia("(max-width: 450px").matches){
    
    options.forEach((div) => {
      div.classList.add("container");
    })
  }

  window.addEventListener('resize', () => {
    if(window.matchMedia("(max-width: 450px").matches){  
      options.forEach((div) => {
        div.classList.add("container");
      })
    } else{
      options.forEach((div) => {
        div.classList.remove("container");
      })
    }
  })
});
