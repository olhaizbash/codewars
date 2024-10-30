const refs = {
  form: document.querySelector(".form-add-todo"),
  filter: document.querySelector(".filter-bar"),
  todoList: document.querySelector(".todo-list"),
  modal: document.querySelector(".backdrop"),
  closeModal: document.querySelector(".close-modal"),
  editForm: document.querySelector(".edit-form"),
};

let filtered = [];

let tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formDataObj = Object.fromEntries(formData);
  let id = Math.floor(Math.random() * Date.now());

  tasks.push({
    todoTask: formDataObj.todoTask,
    id: id,
    status: "uncompleted",
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderList();
  refs.form.reset();
});

const closeModal = () => {
  refs.modal.classList.add("is-hidden");
};

refs.modal.addEventListener("click", (e) => {
  if (e.currentTarget === e.target) {
    closeModal();
  }
});

refs.closeModal.addEventListener("click", (e) => {
  if (e.currentTarget === e.target) {
    closeModal();
  }
});

function createList(dataList) {
  return dataList
    .map(({ todoTask, id, status }) => {
      return `
        <li class="todo-item" data-id="${id}">
          <button data-id="${id}" class="checkbox-wrapper">
            <svg class="checkbox-icon icon-unchecked ${
              status === "completed" ? "is-hidden" : ""
            }" width="30" height="30">
              <use href="../../../assets/sprite.svg#icon-checkbox-unchecked"></use>
            </svg>
            <svg class="checkbox-icon icon-checked ${
              status === "completed" ? "" : "is-hidden"
            }" width="30" height="30">
              <use href="../../../assets/sprite.svg#icon-checkbox-checked"></use>
            </svg>
          </button>
          <p class="todo-text" style="text-decoration: ${
            status === "completed" ? "line-through" : "none"
          };">${todoTask}</p>
          <div class="button-wrapper">
            <button class="edit-btn" data-id="${id}">Edit</button>
            <button class="delete-btn" data-id="${id}">Delete</button>
          </div>
        </li>
      `;
    })
    .join("");
}

function renderList() {
  const todoItem = createList(tasks);
  refs.todoList.innerHTML = todoItem;
}

function onLoad() {
  if (tasks.length === 0) {
    refs.todoList.innerText = `You haven't had any TO-DO tasks yet`;
  } else {
    renderList();
  }
}

refs.todoList.addEventListener("click", (event) => {
  const checkboxWrapper = event.target.closest(".checkbox-wrapper");
  const deleteBtn = event.target.closest(".delete-btn");
  const editBtn = event.target.closest(".edit-btn");
  if (checkboxWrapper) {
    toggleCheckbox(checkboxWrapper);
  }
  if (deleteBtn) {
    onDelete(deleteBtn);
  }
  if (editBtn) {
    onEdit(editBtn);
  }
});

refs.filter.addEventListener("click", (event) => {
  const filterOption = event.target.closest("button");
  let elem = null;
  switch (filterOption.textContent) {
    case "All":
      filtered = [...tasks];
      elem = createList(filtered);
      refs.todoList.innerHTML = elem;
      break;
    case "Completed":
      filtered = tasks.filter((el) => el.status === "completed");
      elem = createList(filtered);
      refs.todoList.innerHTML = elem;
      break;
    case "Uncompleted":
      filtered = tasks.filter((el) => el.status === "uncompleted");
      elem = createList(filtered);
      refs.todoList.innerHTML = elem;
      break;
  }
});

function toggleCheckbox(item) {
  const idOfCheckbox = item.dataset.id;
  const uncheckedIcon = item.querySelector(".icon-unchecked");
  const checkedIcon = item.querySelector(".icon-checked");
  const todoText = item.closest("li").querySelector(".todo-text");

  tasks = tasks.map((task) => {
    if (task.id == idOfCheckbox) {
      task.status = task.status === "completed" ? "uncompleted" : "completed";
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  if (checkedIcon.classList.contains("is-hidden")) {
    uncheckedIcon.classList.add("is-hidden");
    checkedIcon.classList.remove("is-hidden");
    todoText.style.textDecoration = "line-through";
  } else {
    uncheckedIcon.classList.remove("is-hidden");
    checkedIcon.classList.add("is-hidden");
    todoText.style.textDecoration = "none";
  }
}

function onDelete(item) {
  let idOfTask = item.dataset.id;
  console.log(idOfTask);
  tasks = tasks.filter((task) => task.id !== Number(idOfTask));
  console.log(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  onLoad();
}

function onEdit(item) {
  refs.modal.classList.remove("is-hidden");
  refs.editForm.dataset.id = item.dataset.id;
}

function handleEditSubmit(e) {
  e.preventDefault();
  const idOfTask = Number(refs.editForm.dataset.id);
  const formData = new FormData(e.target);
  const formDataObj = Object.fromEntries(formData);

  tasks = tasks.map((task) => {
    if (task.id === idOfTask) {
      task.todoTask = formDataObj.editedTodoTask;
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  refs.editForm.reset();
  closeModal();
  onLoad();
}

refs.editForm.addEventListener("submit", handleEditSubmit);

onLoad();
