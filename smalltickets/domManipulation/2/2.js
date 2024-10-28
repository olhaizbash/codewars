const refs = {
  form: document.querySelector(".form-add-todo"),
  filterAllTasks: document.querySelector(".all-tasks"),
  filterCompletedTasks: document.querySelector(".completed-tasks"),
  filterUncompletedTasks: document.querySelector(".uncompleted-tasks"),
  todoList: document.querySelector(".todo-list"),
  checkbox: document.querySelectorAll(".checkbox-wrapper"),
};

let tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formDataObj = Object.fromEntries(formData);
  console.log(formDataObj);
  let id = Math.floor(Math.random() * Date.now());

  tasks.push({
    todoTask: formDataObj.todoTask,
    id: id,
    status: "uncompleted",
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  if (tasks.length > 0) {
    let todoItem = createList(tasks);
    refs.todoList.innerHTML = todoItem;
  }

  refs.form.reset();
});

function createList(dataList) {
  return dataList
    .map(({ todoTask, id }) => {
      return `
          <li class="todo-item" >
          <button data-${id} class="checkbox-wrapper">
          <svg class="checkbox-icon icon-unchecked" width="30" height="30" >
            <use
              href="../../../assets/sprite.svg#icon-checkbox-unchecked"></use>
          </svg>
          <svg class="checkbox-icon is-hidden icon-checked" width="30" height="30" data-${id}>
            <use
              href="../../../assets/sprite.svg#icon-checkbox-checked"></use>
          </svg>
          </button>
          <p class="todo-text">${todoTask}</p>
          <div class="button-wrapper">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        </li>
        `;
    })
    .join("");
}

function onLoad() {
  if (!tasks || tasks.length === 0) {
    refs.todoList.innerText = `You haven't had any TO-DO tasks yet`;
  } else {
    let todoItem = createList(tasks);
    refs.todoList.innerHTML = todoItem;
  }
}

refs.checkbox.forEach((item) =>
  item.addEventListener("click", (event) => toggleCheckbox(item, event))
);
console.log(refs.checkbox);

function toggleCheckbox(item, event) {
  const idOfCheckbox = item.dataset;
  const uncheckedIcon = button.querySelector(".icon-unchecked");
  const checkedIcon = button.querySelector(".icon-checked");
  const idOfTodo = event.target.closest("li").dataset;
  const todoSelect = idOfTodo.map((el) => el.id);
  let isChecked = todoSelect.includes(idOfTodo.id);

  if (!isChecked) {
    uncheckedIcon.classList.remove("is-hidden");
    checkedIcon.classList.add("is-hidden");

    // itemsInCart.push(idOfItem);
    // refs.cartCounter.textContent = itemsInCart.length;
    // save("cart", itemsInCart);
  } else {
    uncheckedIcon.classList.add("is-hidden");
    checkedIcon.classList.remove("is-hidden");
    const todoText = event.target.closest("p");
    todoText.style.textDecoration = "line-through";
    // const itemsInCartNew = [];
    // for (const i of itemsInCart) {
    //   if (i.id != idOfItem.id) {
    //     itemsInCartNew.push(i);
    //   }
    // }
  }
}
onLoad();
