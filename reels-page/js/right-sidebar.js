// 우측 사이드바
const reelsContainer = document.getElementById("reels");
const reelsCards = document.querySelectorAll(".reels-card");

const goUpBtn = document.querySelector("#right-sidebar .go-up");
const goDownBtn = document.querySelector("#right-sidebar .go-down");

let currentIndex = 0;

function scrollToReel(index) {
  if (index < 0 || index >= reelsCards.length) return;

  currentIndex = index;

  reelsCards[index].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

goUpBtn.addEventListener("click", () => {
  scrollToReel(currentIndex - 1);
});

goDownBtn.addEventListener("click", () => {
  scrollToReel(currentIndex + 1);
});

reelsContainer.addEventListener("scroll", () => {
  reelsCards.forEach((card, idx) => {
    const rect = card.getBoundingClientRect();

    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
      currentIndex = idx;
    }
  });
});
