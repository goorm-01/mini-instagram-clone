const story = [
  // 스토리 데이터
  {
    id: 1,
    user: "user_1",
    img: "./assets/images/avatar.png",
  },
  {
    id: 2,
    user: "user_2",
    img: "./assets/images/avatar.png",
  },
  {
    id: 3,
    user: "user_3",
    img: "./assets/images/avatar.png",
  },
  {
    id: 4,
    user: "user_4",
    img: "./assets/images/avatar.png",
  },
  {
    id: 5,
    user: "user_5",
    img: "./assets/images/avatar.png",
  },
  {
    id: 6,
    user: "user_6",
    img: "./assets/images/avatar.png",
  },
  {
    id: 7,
    user: "user_7",
    img: "./assets/images/avatar.png",
  },
  {
    id: 8,
    user: "user_8",
    img: "./assets/images/avatar.png",
  },
  {
    id: 9,
    user: "user_9",
    img: "./assets/images/avatar.png",
  },
];

const storyContainer = document.querySelector(".story-container"); // 스토리 컨테이너를 찾음

storyContainer.innerHTML = story // innerHTML을 통해 스토리 항목을 생성
  .map(
    (item) => `
    <div class="story-item">
        <div class="story-img"><img style="width: 74px; height: 74px; border-radius: 999px; background-color: white; padding: 3px;" src="${item.img}"></div>
        <div class="story-user">${item.user}</div>
    </div>

`,
  )
  .join("");
