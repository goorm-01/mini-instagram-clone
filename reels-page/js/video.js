(() => {
  const videos = document.querySelectorAll(".reels-video");
  const cards = document.querySelectorAll(".reels-card");

  /* video ↔ play 버튼 상태 동기화 */
  document.querySelectorAll(".video-wrapper").forEach((wrapper) => {
    const video = wrapper.querySelector(".reels-video");
    const playBtn = wrapper.querySelector(".play-btn");

    if (!video || !playBtn) return;

    video.addEventListener("play", () => {
      playBtn.classList.add("hidden");
    });

    video.addEventListener("pause", () => {
      playBtn.classList.remove("hidden");
    });

    // 카드 클릭 → 재생/정지 토글
    wrapper.addEventListener("click", () => {
      video.paused ? video.play() : video.pause();
    });

    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  /* IntersectionObserver (한 영상만 재생) */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector(".reels-video");
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    },
    {
      root: document.querySelector("#reels"),
      threshold: 0.6,
    },
  );

  cards.forEach((card) => observer.observe(card));

  /* 첫 영상 자동 재생 */
  window.addEventListener("load", () => {
    if (videos[0]) {
      videos[0].play().catch(() => {});
    }
  });

  /* 음소거 버튼 */
  document.querySelectorAll(".reels-card").forEach((card) => {
    const video = card.querySelector(".reels-video");
    const muteBtn = card.querySelector(".mute-btn");
    if (!video || !muteBtn) return;

    const soundOn = muteBtn.querySelector(".sound-on");
    const soundOff = muteBtn.querySelector(".sound-off");

    muteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      soundOn.classList.toggle("hidden", video.muted);
      soundOff.classList.toggle("hidden", !video.muted);
    });
  });

  /* 5️⃣ 팔로우 버튼 */
  document.querySelectorAll(".follow-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isFollowing = btn.classList.toggle("following");
      btn.textContent = isFollowing ? "팔로잉" : "팔로우";
    });
  });

  /* 설명 더보기 */
  const LIMIT = 20;

  document.querySelectorAll(".description").forEach((desc) => {
    const moreBtn = desc.querySelector(".more");
    if (!moreBtn) return;

    if (!desc.dataset.fullText) {
      desc.dataset.fullText = desc.childNodes[0].textContent.trim();
    }

    const fullText = desc.dataset.fullText;

    if (fullText.length <= LIMIT) {
      moreBtn.classList.add("hidden");
      return;
    }

    collapse(desc);

    moreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      expand(desc);
    });

    desc.addEventListener("click", () => {
      if (!desc.classList.contains("expanded")) return;
      collapse(desc);
    });
  });

  function collapse(desc) {
    const fullText = desc.dataset.fullText;
    const moreBtn = desc.querySelector(".more");

    desc.childNodes[0].textContent = fullText.slice(0, LIMIT) + "…";
    moreBtn.classList.remove("hidden");
    desc.classList.remove("expanded");
  }

  function expand(desc) {
    const fullText = desc.dataset.fullText;
    const moreBtn = desc.querySelector(".more");

    desc.childNodes[0].textContent = fullText;
    moreBtn.classList.add("hidden");
    desc.classList.add("expanded");
  }
})();
