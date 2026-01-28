/*
 * 기능: 메시지 페이지 전용 사이드바 설정
 * - 사이드바 HTML 로드
 * - 메시지 버튼 활성화 상태 설정
 */

// 사이드바 HTML 로드 및 설정
fetch("../sidebar/sidebar.html")
  .then(res => res.text())
  .then(html => {
    // 사이드바 영역에 HTML 삽입
    const sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = html;
    // 메시지 페이지에서는 메시지 버튼만 활성화
    const allBtns = sidebar.querySelectorAll(".btn-container .action-btn");
    const messageBtn = sidebar.querySelector(".message-btn");
    // 모든 버튼 비활성화
    allBtns.forEach(btn => btn.classList.remove("active"));
    messageBtn?.classList.add("active");
  });