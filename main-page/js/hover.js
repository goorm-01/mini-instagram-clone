const userHoverImgs = document.querySelector(".post-user-img"); // 게시물 사용자 이미지 불러오기
const userHoverTag = document.querySelector(".user-hover"); // 메인 페이지에서 호버가 됐을 때 불러올 html 속 태그 불러오기
userHoverImgs.addEventListener("mouseover", (e) => { // 호버시 이벤트 리스너
  // 메인 HTML에 있는 태그에 HTML 삽입
  userHoverTag.innerHTML = `
    <div class="hover-box-container">
      <div class="user-container">
        <div class="post-user-img"><img style="width: 64px; height: 64px; border-radius: 999px; object-fit: cover;" src="${post[0].userImg}" /></div>
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

// 마우스가 나갈 때 이벤트 리스너
userHoverImgs.addEventListener("mouseleave", (e) => {
  userHoverTag.innerHTML = "";
});
