const post = [
  // 게시물 데이터
  {
    id: 1,
    user: "tiny_namu09",
    userImg: "./assets/images/user_1.jpg",
    postImg: "./assets/images/post_1.jpg",
    time: "2 시간전",
    liked: 120,
    comment: 15,
    caption: "딱.답장해.",
  },
  {
    id: 2,
    user: "pororo_official.ig",
    userImg: "./assets/images/user_2.jpg",
    postImg: "./assets/images/post_2.jpg",
    time: "3일",
    liked: "2.1만",
    comment: 260,
    caption: "다음에는 돈을 보내주세요. 감사합니다.",
  },
];

const postContainer = document.querySelector(".main-post-container"); // 게시물 컨테이너를 찾음

postContainer.innerHTML = post // 게시물 데이터를 HTML로 삽입
  .map(
    (item) => `
    <div class="post-item">
        <div class="post-header">
            <div class="post-user-img"><img src="${item.userImg}"></div>
            <div class="post-user">${item.user}</div>
            <div>﹒</div>
            <div class="post-time">${item.time}</div>
            <div class="post-follow">팔로우</div>
            <svg aria-label="옵션 더 보기"
                 fill="currentColor" 
                 height="24" 
                 role="img" 
                 viewBox="0 0 24 24" 
                 width="24">
              <title>옵션 더 보기</title>
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="6" cy="12" r="1.5"></circle>
              <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
        </div>
        <div class="post-image"><img src="${item.postImg}"></div>
        <div class="post-bottom">
            <div class="post-likes">
              <svg aria-label="좋아요"
                   fill="currentColor" 
                   height="24" role="img" 
                   viewBox="0 0 24 24" 
                   width="24">
                <title>좋아요</title>
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
              </svg>
            ${item.liked}
            </div>
            <div class="post-comments">
              <svg aria-label="댓글 달기" 
                  fill="currentColor" 
                  height="24" 
                  role="img" 
                  viewBox="0 0 24 24" 
                  width="24">
                  <title>댓글 달기</title>
                  <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
              ${item.comment}
            </div>
            <div class="post-share">
              <svg aria-label="공유하기" 
                   fill="currentColor" 
                   height="24" 
                   role="img" 
                   viewBox="0 0 24 24" 
                   width="24">
                   <title>공유하기</title>
                   <path d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line>
              </svg>
            </div>
            <div class="post-save">
              <svg aria-label="저장" 
                   fill="currentColor" 
                   height="24" 
                   role="img" 
                   viewBox="0 0 24 24"
                    width="24">
                    <title>저장</title>
                    <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
              </svg>
            </div>
        </div>
        <div class="post-caption"><strong>${item.user}</strong> ${item.caption}</div>
    </div>
`,
  )
  .join("");

const userHoverImgs = document.querySelector(".post-user-img");
const userHoverTag = document.querySelector(".user-hover");
userHoverImgs.addEventListener("mouseover", (e) => {
  userHoverTag.innerHTML = `
    <div class="hover-box-container">
      <div class="user-container">
        <div class="post-user-img"><img src="${post[0].userImg}" /></div>
        <div class="hover-user-info">
          <div class="hover-user-id">${post[0].user}</div>
          <div class="hover-follow-btn">팔로우</div>
        </div>
      </div>

      <div class="user-follow">
        <div class="post-count">
          <p class="user-count">3500</p>
          <p>게시물</p>
        </div>
        <div class="follower-count">
          <p class="user-count">1.2만</p>
          <p>팔로워</p>
        </div>
        <div class="following-count">
          <p class="user-count">500</p>
          <p>팔로잉</p>
        </div>
      </div>
      
      <div class="img-wrapper">
        <div class="hover-post">
          <div class="hover-post-img-container">
            <img class="hover-post-img" src="${post[0].postImg}" />
          </div>
        </div>
        <div class="hover-post">
          <div class="hover-post-img-container">
            <img class="hover-post-img" src="${post[0].postImg}" />
          </div>
        </div>
        <div class="hover-post">
          <div class="hover-post-img-container">
            <img class="hover-post-img" src="${post[0].postImg}" />
          </div>
        </div>
      </div>

      <div class="hover-bottom">
        <button class="hover-dm">
          <svg aria-label="공유하기" 
                   fill="currentColor" 
                   height="20" 
                   role="img" 
                   viewBox="0 0 24 24" 
                   width="20">
                   <title>공유하기</title>
                   <path d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line>
          </svg>
          메세지 보내기
        </button>
        <button class="hover-following">
        팔로잉
        </button>
      </div>

    
      
    </div>
    
    
  `;
});

userHoverImgs.addEventListener("mouseleave", (e) => {
  userHoverTag.innerHTML = "";
});
