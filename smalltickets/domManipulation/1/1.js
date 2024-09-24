import { weekdays } from "./weekdays.js";

const refs = {
  titleMonth: document.querySelector(".month"),
  prevBtn: document.querySelector(".prev-btn"),
  nextBtn: document.querySelector(".next-btn"),
  weekDaysDisplay: document.querySelector(".calendar-weekdays"),
  daysList: document.querySelector(".calendar-days"),
  backDrop: document.querySelector(".backdrop"),
  choosenDayTitle: document.querySelector(".choosen-day-title"),
  eventList: document.querySelector(".event-list"),
  eventInput: document.querySelector(".event-input"),
  eventSaveBtn: document.querySelector(".event-save-btn"),
  addEventForm: document.querySelector(".add-event-form"),
};

let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

let nav = 0;
let clicked = null;

const closeBackdrop = () => {
  refs.backDrop.classList.add("is-hidden");
};

refs.backDrop.addEventListener("click", (e) => {
  if (e.currentTarget === e.target) {
    closeBackdrop();
  }
});

function createDays() {
  let refDay = new Date();

  refDay.setMonth(refDay.getMonth() + nav);

  const day = refDay.getDate();
  const month = refDay.getMonth();
  const year = refDay.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  refs.titleMonth.innerText = `${refDay.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;

  refs.daysList.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("li");
    daySquare.classList.add("day");

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find((e) => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.classList.add("current-day");
      }

      if (eventForDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener("click", () => openModal(dayString));
    } else {
      daySquare.classList.add("padding");
    }

    refs.daysList.appendChild(daySquare);
  }
}

function initButtons() {
  refs.nextBtn.addEventListener("click", () => {
    nav += 1;
    createDays();
  });

  refs.prevBtn.addEventListener("click", () => {
    nav -= 1;
    createDays();
  });
}

function openModal(date) {
  refs.choosenDayTitle.innerText = date;
  clicked = date;

  const eventForDay = events.filter((e) => e.date === clicked);

  if (eventForDay) {
    let eventItem = createList(eventForDay);
    refs.eventList.innerHTML = eventItem;
  }
  if (!eventForDay || eventForDay.length === 0) {
    refs.eventList.innerText = `You haven't had any events yet`;
  }

  refs.backDrop.classList.remove("is-hidden");
}

function createList(dataList) {
  return dataList
    .map(({ title, id }) => {
      return `
        <li>
        <p>${title}</p>
        <button class="delete-btn" data-id="${id}">Delete</button>
        </li>
      `;
    })
    .join("");
}

refs.addEventForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = Math.floor(Math.random() * Date.now());

  if (refs.eventInput.value) {
    events.push({
      date: clicked,
      title: refs.eventInput.value,
      id: id,
    });

    localStorage.setItem("events", JSON.stringify(events));
    const eventForDay = events.filter((e) => e.date === clicked);
    if (eventForDay) {
      let eventItem = createList(eventForDay);
      refs.eventList.innerHTML = eventItem;
    }
  }

  refs.addEventForm.reset();
});

refs.eventList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const itemId = parseInt(e.target.getAttribute("data-id"), 10);
    events = events.filter((item) => item.id !== itemId);
    localStorage.setItem("events", JSON.stringify(events));

    const eventForDay = events.filter((e) => e.date === clicked);
    let eventItem = createList(eventForDay);
    refs.eventList.innerHTML = eventItem;
  }
});
initButtons();
createDays();
