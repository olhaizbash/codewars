import { data } from "./data.js";

const postsList = document.querySelector(".posts-list");

let content = localStorage.getItem("content")
  ? JSON.parse(localStorage.getItem("content"))
  : [];

function onLoad() {
  if (content.length === 0) {
    postsList.innerText = `You haven't had any posts yet`;
  } else {
    renderList();
  }
}

function renderList() {
  const contentItem = createList(content);
  postsList.innerHTML = contentItem;
}

function createList(dataList) {
  return dataList
    .map((post) => {
      return `
            <li class="post-item" data-id="${post.id}">
            <div class="post-wrapper">
                        <p>${post.author}</p>
                        <p>${post.date}</p>
                        <p>${post.text}</p>
            </div>
              <div class="button-wrapper">
                <button class="comment-btn" data-id="${post.id}"><span class="comments-amount">${post.comments.length}</span>Comments</button>
              </div>
            </li>
          `;
    })
    .join("");
}
localStorage.setItem("content", JSON.stringify(data));
onLoad();
