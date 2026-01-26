(function () {
  /* 릴스 페이지이므로 페이지 렌더링 시 
    릴스 버튼의 classList에만 active를 주도록 오버라이딩*/
  function overrideSidebarForReels() {
    const sidebarBtns = document.querySelectorAll(".action-btn");
    const reelsBtn = document.querySelector(".reels-btn");

    sidebarBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    reelsBtn.classList.add("active");
  }

  function loadComponent(id, path) {
    fetch(path)
      .then((res) => res.text())
      .then((html) => {
        /* fetch로 가져온 HTML을 DOMParser를 사용해
         aside .sidebar만 추출하여 삽입 */
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const sidebarElement = doc.querySelector("aside.sidebar");

        document.getElementById("sidebar").appendChild(sidebarElement);

        overrideSidebarForReels();

        /* JS를 html에서 script 태그로 불러오면 
          fetch가 진행되는 중에 script를 불러와 null을 반환하는 오류 발생
          이에 따라 이곳에서 script 태그를 생성하여 처리 */
        const script = document.createElement("script");
        script.src = "../sidebar/sidebar.js";
        document.body.appendChild(script);
      });
  }

  loadComponent("sidebar", "../sidebar/sidebar.html");
})();
