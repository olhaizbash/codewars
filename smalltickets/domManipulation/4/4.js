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
              <div class="add-comment-wrapper"></div>
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
                <button class="delete-comment-btn" data-id="${
                  comment.id
                }">Delete</button>
                <div class="comment-wrapper">
                  <div class="comment-info">
                    <p>${comment.author}</p>
                    <p>${comment.date}</p>
                  </div>
                  <p>${comment.text}</p>
                </div>
                 <div class="button-wrapper">
                <button class="reply-on-comment-btn" data-id="${
                  comment.id
                }">Reply</button>
              </div>
              <div class="add-reply-wrapper" data-id="${comment.id}"></div>
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
                <button class="delete-reply-btn" data-id="${reply.id}">Delete</button>
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

function createAddCommentMarcup() {
  const marcup = `
        <form class="add-comment-form">
        <div class="inputs-wrapper">
        <label for="author"> Name:</label>
        <input type="text" name="author" value="Anonym"/>
        
        <label for="text"> Comment:</label>
        <textarea name="text" rows="4" cols="50"></textarea>
        </div>
        <button type="submit" class="send-comment-button">Send</button>
        </form>
                `;

  return marcup;
}

postsList.addEventListener("click", (e) => {
  const commentsBtn = e.target.closest(".comment-btn");
  const replyBtn = e.target.closest(".reply-btn");
  const replyOnComment = e.target.closest(".reply-on-comment-btn");
  const deleteComment = e.target.closest(".delete-comment-btn");
  const deleteReply = e.target.closest(".delete-reply-btn");
  if (commentsBtn) {
    showComments(commentsBtn);
  }
  if (replyBtn) {
    addComment(replyBtn);
  }
  if (replyOnComment) {
    addCommentReply(replyOnComment);
  }
  if (deleteComment) {
    deleteCommentFunc(deleteComment);
  }
  if (deleteReply) {
    deleteReplyFunc(deleteReply);
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

function addComment(button) {
  const postId = Number(button.dataset.id);
  const post = content.find((post) => post.id === postId);
  if (!post || post.comments.length === 0) return;

  const commentWrapper = document.querySelector(".add-comment-wrapper");
  commentWrapper.innerHTML = createAddCommentMarcup();
  const form = document.querySelector(".add-comment-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData);
    let id = Math.floor(Math.random() * Date.now());
    let date = new Date().toLocaleDateString();

    content.map((post) => {
      if (post.id === postId) {
        post.comments.push({
          author: formDataObj.author,
          text: formDataObj.text,
          id: id,
          date: date,
          replies: [],
        });
      }
    });

    localStorage.setItem("content", JSON.stringify(content));
    renderList();
    form.reset();
  });
}

function addCommentReply(button) {
  const commentId = Number(button.dataset.id);
  let comment;

  content.forEach((post) => {
    post.comments.forEach((com) => {
      if (com.id === commentId) {
        comment = com;
      }
    });
  });

  if (!comment) return;

  const replyWrapper = document.querySelector(
    `.add-reply-wrapper[data-id="${commentId}"]`
  );
  replyWrapper.innerHTML = createAddCommentMarcup();

  const form = replyWrapper.querySelector(".add-comment-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData);
    const id = Math.floor(Math.random() * Date.now());
    const date = new Date().toLocaleDateString();

    comment.replies.push({
      author: formDataObj.author,
      text: formDataObj.text,
      id: id,
      date: date,
    });

    localStorage.setItem("content", JSON.stringify(content));
    renderList();
    form.reset();
  });
}

function deleteCommentFunc(button) {
  const postId = Number(button.dataset.id);
  content.forEach((post) => {
    post.comments = post.comments.filter((comment) => comment.id !== postId);
  });
  localStorage.setItem("content", JSON.stringify(content));
  renderList();
}

function deleteReplyFunc(button) {
  const postId = Number(button.dataset.id);
  content.forEach((post) => {
    post.comments.forEach((com) => {
      com.replies = com.replies.filter((comment) => comment.id !== postId);
    });
  });
  localStorage.setItem("content", JSON.stringify(content));
  renderList();
}

onLoad();
