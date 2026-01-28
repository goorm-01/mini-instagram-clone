/* 각 릴스의 사이드 액션 메뉴 불러오기 */
const sideActions = document.querySelectorAll(".side-actions");

/* ==========좋아요 버튼========== */
sideActions.forEach((sideAction) => {
  const likeBtn = sideAction.querySelector(".like");

  likeBtn.addEventListener("click", () => {
    const like = likeBtn.querySelector(".likes");
    const likeCancel = likeBtn.querySelector(".likes-cancel");

    like.classList.toggle("hidden");
    likeCancel.classList.toggle("hidden");
  });
});

/* ==========북마크 버튼========== */
sideActions.forEach((sideAction) => {
  const bookmarkBtn = sideAction.querySelector(".bookmark");

  bookmarkBtn.addEventListener("click", () => {
    const bookmark = bookmarkBtn.querySelector(".bookmarks");
    const bookmarkCancel = bookmarkBtn.querySelector(".bookmark-cancel");

    bookmark.classList.toggle("hidden");
    bookmarkCancel.classList.toggle("hidden");
  });
});

/* ==========댓글 창 열기/닫기========== */

/* 댓글창 위치 고정하는 함수 */
function lockCommentToLeft(comment) {
  if (!comment.classList.contains("left-position")) {
    comment.classList.remove("right-position");
    comment.classList.add("left-position");
  }
}

function closeComment(comment) {
  comment.classList.remove("open");

  comment.addEventListener(
    "transitionend",
    () => {
      comment.classList.remove("left-position");
      comment.classList.add("right-position");
    },
    { once: true },
  );
}

/* 미디어 쿼리 범위
   실제 인스타는 뷰포트가 줄어들면
   댓글 창이 왼쪽으로 고정되는 기능을 구현 */
const mq = window.matchMedia("(max-width: 1190px)");

sideActions.forEach((sideAction) => {
  const commentBtn = sideAction.querySelector(".comment");
  const commentWindow = sideAction.querySelector(".comment-container");

  commentWindow.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  /* 댓글창 열기 */
  commentBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = commentWindow.classList.contains("open");

    if (isOpen) {
      closeComment(commentWindow);
      return;
    }

    // 열기
    commentWindow.classList.add("open");

    // 처음 열릴 때 기본 위치
    commentWindow.classList.add("right-position");

    // 작은 화면이면 -> 왼쪽 고정
    if (mq.matches) {
      lockCommentToLeft(commentWindow);
    }
  });

  /* 댓글창 닫기 */
  const commentClose = sideAction.querySelector(".comment-close");

  commentClose.addEventListener("click", () => {
    closeComment(commentWindow);
  });
});

/* 창 움직임 고정 */
mq.addEventListener("change", (e) => {
  if (e.matches) {
    document.querySelectorAll(".comment-container.open").forEach((comment) => {
      lockCommentToLeft(comment);
    });
  }
});

/* 전역 클릭 리스너 추가(댓글창 닫기) */
document.addEventListener("click", (e) => {
  document.querySelectorAll(".comment-container.open").forEach((comment) => {
    const sideAction = comment.closest(".side-actions");
    const commentBtn = sideAction.querySelector(".comment");

    const clickedInsideComment = e.target.closest(".comment-container");
    const clickedCommentBtn = e.target.closest(".comment");

    // 댓글창 밖 + 댓글 버튼 아님 -> 닫기
    if (!clickedInsideComment && !clickedCommentBtn) {
      closeComment(comment);
    }
  });
});
