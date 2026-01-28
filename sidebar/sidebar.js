// 탭 활성화
const buttons = document.querySelectorAll('.btn-container .action-btn');
const mainBtn = document.querySelector('.main-btn');
const homeBtn = document.querySelector('.home-btn');

const excludeBtns = ['search-btn', 'notification-btn', 'make-btn'];

// 버튼 컨테이너 버튼 클릭 시
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (excludeBtns.some(cls => btn.classList.contains(cls))) {
            return;
        }
        // 모든 버튼에 active 제거
        buttons.forEach(b => b.classList.remove('active'));
        // 활성 버튼에만 active 추가
        btn.classList.add('active');
    });
});

// 메인 버튼 클릭 시
mainBtn.addEventListener('click', () => {
    // 모든 버튼에 active 제거
    buttons.forEach(b => b.classList.remove('active'));
    // 홈 버튼에만 active 추가
    homeBtn.classList.add('active');
});

// 드롭다운 메뉴
const sidebar = document.querySelector(".sidebar");
const settingsBtn = document.querySelector('.settings-btn');
const othersBtn = document.querySelector('.others-btn');
const settingsDropdown = document.querySelector('.settings-dropdown');
const othersDropdown = document.querySelector('.others-dropdown');

// 사이드바 상태 업데이트 함수
function updateSidebarState() {
    const isDropdownOpen = settingsDropdown.classList.contains('active') || othersDropdown.classList.contains('active');

    // 드롭다운이 열린 경우 사이드바에 클래스 추가
    if (isDropdownOpen) {
        sidebar.classList.add('dropdown-open');
    } else {
        sidebar.classList.remove('dropdown-open');
    }
}

// 더보기 버튼 클릭 이벤트
settingsBtn.addEventListener('click', (e) => {
    // 이벤트 버블링 막기 위한 stopPropagation 매서드
    e.stopPropagation();

    // rect - 설정 버튼의 크기 및 위치 할당
    const rect = settingsBtn.getBoundingClientRect();
    settingsDropdown.style.bottom = (window.innerHeight - rect.top + 8) + 'px';

    // 더보기 버튼 활성화 및 Meta의 다른 앱 버튼 비활성화
    settingsBtn.classList.toggle('active');
    othersBtn.classList.remove('active');

    // 더보기 드롭다운 활성화 및 Meta의 다른 앱 드롭다운 비활성화
    settingsDropdown.classList.toggle('active');
    othersDropdown.classList.remove('active');

    // 사이드바 상태 업데이터
    updateSidebarState();
});

// Meta 앱 버튼 클릭
othersBtn.addEventListener('click', (e) => {
    // 이벤트 버블링 막기 위한 stopPropagation 매서드
    e.stopPropagation();

    // rect - 설정 버튼의 크기 및 위치 할당
    const rect = othersBtn.getBoundingClientRect();
    othersDropdown.style.bottom = (window.innerHeight - rect.top + 8) + 'px';

    // 더보기 버튼 활성화 및 Meta의 다른 앱 버튼 비활성화
    othersBtn.classList.toggle('active');
    settingsBtn.classList.remove('active');

    // 더보기 드롭다운 활성화 및 Meta의 다른 앱 드롭다운 비활성화
    othersDropdown.classList.toggle('active');
    settingsDropdown.classList.remove('active');

    // 사이드바 상태 업데이터
    updateSidebarState();
});

// 외부 클릭 시 드롭다운 닫기
document.addEventListener('click', () => {
    // 더보기 버튼 및 Meta의 다른 앱 버튼 비활성화
    settingsDropdown.classList.remove('active');
    othersDropdown.classList.remove('active');

    // 더보기 드롭다운 및 Meta의 다른 앱 드롭다운 비활성화
    settingsBtn.classList.remove('active');
    othersBtn.classList.remove('active');

    // 사이드바 상태 업데이터
    updateSidebarState();
});

// 드롭다운 내부 클릭 시 이벤트 전파 방지
document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.addEventListener('click', (e) => {
        // 이벤트 버블링을 막아 드롭다운 닫힘 방지
        e.stopPropagation();
    });
});