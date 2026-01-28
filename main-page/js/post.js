const post = [
  {
    id: 1,
    user: "user_1",
    userImg: "./assets/images/avatar.png",
    postImg: "./assets/images/post1.png",
    time: "2 시간전",
    liked: 120,
    comment: 15,
    caption: "안녕하세요. 첫 번째 게시물입니다!",
  },
];

const postContainer = document.querySelector(".main-post-container"); // 게시물 컨테이너를 찾음

postContainer.innerHTML = post
  .map(
    (item) => `
    <div class="post-item">
        <div class="post-header">
            <div class="post-user-img"><img src="${item.userImg}"></div>
            <div class="post-user">${item.user}</div>
            <div class="post-time">${item.time}</div>
        </div>
        <div class="post-image"><img src="${item.postImg}"></div>
        <div class="post-bottom">
            <div class="post-likes">좋아요 ${item.liked}개</div>
            <div class="post-comments">댓글 ${item.comment}개</div>
            <div class="post-share"></div>
            <div class="post-save"></div>
        </div>
        <div class="post-caption"><strong>${item.user}</strong> ${item.caption}</div>
    </div>
`,
  )
  .join("");
