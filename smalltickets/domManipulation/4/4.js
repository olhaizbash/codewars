import { data } from "./data.js";

const postsList = document.querySelector(".posts-list");

let content = localStorage.getItem("content")
  ? JSON.parse(localStorage.getItem("content"))
  : [...data];

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
            <div class="post-info">
                        <p>${post.author}</p>
                        <p>${post.date}</p>
                        </div>
                        <p>${post.text}</p>
            </div>
              <div class="button-wrapper">
                <button class="comment-btn" data-id="${post.id}"><span class="comments-amount">(${post.comments.length})</span> Comments</button>
                <button class="reply-btn" data-id="${post.id}">Reply</button>
              </div>
              <ul class="comments-list" data-id="${post.id}" id="comments-list"></ul>
            </li>
          `;
    })
    .join("");
}

function createComments(comments) {
  return comments
    .map((comment) => {
      return `
                <li class="comment-item" data-id="${comment.id}">
                <div class="comment-wrapper">
                  <div class="comment-info">
                    <p>${comment.author}</p>
                    <p>${comment.date}</p>
                  </div>
                  <p>${comment.text}</p>
                </div>
                <ul class="replies-list" data-id="${comment.id}">
                  ${createReplies(comment.replies)}
                </ul>
                </li>
              `;
    })
    .join("");
}

function createReplies(replies) {
  return replies
    .map((reply) => {
      return `
                <li class="reply-item" data-id="${reply.id}">
                  <div class="reply-wrapper">
                    <div class="reply-info">
                      <p>${reply.author}</p>
                      <p>${reply.date}</p>
                    </div>
                    <p>${reply.text}</p>
                  </div>
                </li>
              `;
    })
    .join("");
}

postsList.addEventListener("click", (e) => {
  const commentsBtn = e.target.closest(".comment-btn");
  const replyBtn = e.target.closest(".reply-btn");
  if (commentsBtn) {
    showComments(commentsBtn);
  }
  if (replyBtn) {
    addComment(replyBtn);
  }
});

function showComments(button) {
  const postId = Number(button.dataset.id);
  const post = content.find((post) => post.id === postId);

  if (!post || post.comments.length === 0) return;

  const commentsList = document.querySelector(
    `.comments-list[data-id="${postId}"]`
  );
  commentsList.innerHTML = createComments(post.comments);
}

onLoad();
