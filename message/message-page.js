// 메시지 페이지 전용 스크립트
fetch("../sidebar/sidebar.html")
  .then(res => res.text())
  .then(html => {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;
    sidebar.innerHTML = html;

    // 메시지 페이지에서는 메시지 버튼만 활성화
    const allBtns = sidebar.querySelectorAll(".btn-container .action-btn");
    const messageBtn = sidebar.querySelector(".message-btn");
    allBtns.forEach(btn => btn.classList.remove("active"));
    if (messageBtn) messageBtn.classList.add("active");
  });
