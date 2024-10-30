const refs = {
  form: document.querySelector(".form-add-todo"),
  filter: document.querySelector(".search-input"),
  phoneList: document.querySelector(".phone-list"),
  modal: document.querySelector(".backdrop"),
  closeModal: document.querySelector(".close-modal"),
  editForm: document.querySelector(".edit-form"),
};

let contacts = localStorage.getItem("contacts")
  ? JSON.parse(localStorage.getItem("contacts"))
  : [];

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formDataObj = Object.fromEntries(formData);
  let id = Math.floor(Math.random() * Date.now());

  contacts.push({
    name: formDataObj.name,
    phoneNumber: formDataObj.phoneNumber,
    id: id,
  });

  localStorage.setItem("contacts", JSON.stringify(contacts));
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
    .map(({ name, id, phoneNumber }) => {
      return `
          <li class="todo-item" data-id="${id}">
          <div class="contact-wrapper">
                      <p>${name}</p>
                      <p>${phoneNumber}</p>
          </div>
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
  const contactItem = createList(contacts);
  refs.phoneList.innerHTML = contactItem;
}

function onLoad() {
  if (contacts.length === 0) {
    refs.phoneList.innerText = `You haven't had any contacts yet`;
  } else {
    renderList();
  }
}

refs.phoneList.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete-btn");
  const editBtn = event.target.closest(".edit-btn");
  if (deleteBtn) {
    onDelete(deleteBtn);
  }
  if (editBtn) {
    onEdit(editBtn);
  }
});

function onDelete(item) {
  let idOfTask = item.dataset.id;
  console.log(idOfTask);
  contacts = contacts.filter((contact) => contact.id !== Number(idOfTask));
  console.log(contacts);
  localStorage.setItem("contacts", JSON.stringify(contacts));
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
  console.log(formDataObj);

  contacts = contacts.map((contact) => {
    if (contact.id === idOfTask) {
      contact.name = formDataObj.editedName;
      contact.phoneNumber = formDataObj.editedPhoneNumber;
    }
    return contact;
  });

  console.log(contacts);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  refs.editForm.reset();
  closeModal();
  onLoad();
}

refs.filter.addEventListener("input", (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery) ||
      contact.phoneNumber.includes(searchQuery)
  );

  const contactItem = createList(filteredContacts);
  refs.phoneList.innerHTML = contactItem;
});

refs.editForm.addEventListener("submit", handleEditSubmit);
onLoad();
