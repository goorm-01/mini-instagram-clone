const sideActions = document.querySelectorAll(".side-actions");

/* 좋아요 버튼 */
sideActions.forEach((sideAction) => {
  const likeBtn = sideAction.querySelector(".like");

  likeBtn.addEventListener("click", () => {
    const like = likeBtn.querySelector(".likes");
    const likeCancel = likeBtn.querySelector(".likes-cancel");

    like.classList.toggle("hidden");
    likeCancel.classList.toggle("hidden");
  });
});

/* 북마크 버튼 */
sideActions.forEach((sideAction) => {
  const bookmarkBtn = sideAction.querySelector(".bookmark");

  bookmarkBtn.addEventListener("click", () => {
    const bookmark = bookmarkBtn.querySelector(".bookmarks");
    const bookmarkCancel = bookmarkBtn.querySelector(".bookmark-cancel");

    bookmark.classList.toggle("hidden");
    bookmarkCancel.classList.toggle("hidden");
  });
});

/* 댓글 창 열기/닫기 */
/* 댓글창 위치 고정하는 함수 */
function lockCommentToLeft() {
  if (!comment.classList.contains("position-left")) {
    comment.classList.remove("position-right");
    comment.classList.add("position-left");
  }
}

function closeComment() {
  comment.classList.remove("open");
  comment.classList.remove("position-left");
  comment.classList.add("position-right");
}

sideActions.forEach((sideAction) => {
  const commentBtn = sideAction.querySelector(".comment");
  const commentWindow = sideAction.querySelector(".comment-container");

  /* 댓글창 열기 */
  commentBtn.addEventListener("click", () => {
    commentWindow.classList.toggle("open");
  });

  /* 댓글창 닫기 */
  commentBtn.addEventListener("click", () => {});
});
