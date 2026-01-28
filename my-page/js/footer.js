const footerBtns = document.querySelectorAll('.profile-footer-mobile .action-btn');

// 클릭한 버튼 active 추가 (새로 만들기 버튼 제외)
footerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('make-btn')) {
            return;
        }
        footerBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});