class BottomMenu {
  constructor(options = {}) {
    this.basePath = options.basePath || '/assets/icon.svg';
    this.avatarPath = options.avatarPath || '/assets/images/avatar.png';
    this.currentPage = options.currentPage || 'explore'; // 현재 페이지 표시
    
    // 아이콘 매핑
    this.iconMap = {
      home: { inactive: 'home-outline', active: 'home-filled' },
      explore: { inactive: 'compass-outline', active: 'compass-filled' },
      reels: { inactive: 'reels-outline', active: 'reels-filled' },
      create: { inactive: 'create', active: 'create' },
      message: { inactive: 'message-outline', active: 'message-filled' }
    };

    this.init();
  }

  // HTML 코드
  createHTML() {
    const menuHTML = `
      <div class="bottom-menu">
        <div class="bottom-menu-item ${this.currentPage === 'home' ? 'active' : ''}" data-tab="home">
          <svg><use href="${this.basePath}#${this.currentPage === 'home' ? this.iconMap.home.active : this.iconMap.home.inactive}"></use></svg>
        </div>
        
        <div class="bottom-menu-item ${this.currentPage === 'explore' ? 'active' : ''}" data-tab="explore">
          <svg><use href="${this.basePath}#${this.currentPage === 'explore' ? this.iconMap.explore.active : this.iconMap.explore.inactive}"></use></svg>
        </div>
        
        <div class="bottom-menu-item ${this.currentPage === 'reels' ? 'active' : ''}" data-tab="reels">
          <svg><use href="${this.basePath}#${this.currentPage === 'reels' ? this.iconMap.reels.active : this.iconMap.reels.inactive}"></use></svg>
        </div>
        
        <div class="bottom-menu-item ${this.currentPage === 'create' ? 'active' : ''}" data-tab="create">
          <svg><use href="${this.basePath}#${this.iconMap.create.inactive}"></use></svg>
        </div>
        
        <div class="bottom-menu-item ${this.currentPage === 'message' ? 'active' : ''}" data-tab="message">
          <svg><use href="${this.basePath}#${this.currentPage === 'message' ? this.iconMap.message.active : this.iconMap.message.inactive}"></use></svg>
        </div>

        <div class="bottom-menu-item avatar ${this.currentPage === 'avatar' ? 'active' : ''}" data-tab="avatar">
          <img src="${this.avatarPath}" alt="avatar">
        </div>
      </div>
    `;
    
    return menuHTML;
  }

  // DOM에 추가 - 특별히 지정한 위치가 없다면 기본적으로 body 맨 아래 삽입 (특별히 지정하지 X)
  render(targetElement) {
    if (typeof targetElement === 'string') {
      targetElement = document.querySelector(targetElement);
    }
    
    if (targetElement) {
      targetElement.innerHTML = this.createHTML();
    } else {
      // body 맨 아래 삽입
      document.body.insertAdjacentHTML('beforeend', this.createHTML());
    }
  }

  // 클릭했을 때 클릭한 아이콘 활성화 시키는 이벤트
  attachEvents() {
    const menuItems = document.querySelectorAll('.bottom-menu-item');

    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const tab = item.dataset.tab;
        const isAvatar = tab === 'avatar';

        // 모든 아이템에서 active 클래스 제거 및 비활성 아이콘으로 변경 (한가지 아이템만 활성화 되어야 하기때문)
        menuItems.forEach(menu => {
          menu.classList.remove('active');
          const menuTab = menu.dataset.tab;
          
          if (menuTab !== 'avatar' && this.iconMap[menuTab]) {
            const svg = menu.querySelector('svg use');
            if (svg) {
              svg.setAttribute('href', `${this.basePath}#${this.iconMap[menuTab].inactive}`);
            }
          }
        });

        // 클릭된 아이템에 active 클래스 추가 (나머지는 모두 비활성화 시켜놓고 여기서 클릭된 아이템만 활성화 시킴)
        item.classList.add('active');
        
        // avatar가 아닌 경우에만 활성 아이콘으로 변경 (이미지는 활성화일 때가 따로 없기 떄문)
        if (!isAvatar && this.iconMap[tab]) {
          const activeSvg = item.querySelector('svg use');
          if (activeSvg) {
            activeSvg.setAttribute('href', `${this.basePath}#${this.iconMap[tab].active}`);
          }
        }
      });
    });
  }

  // 초기화 (중복 로딩 방지)
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.render();
      this.attachEvents();
    });
  }
}

// 전역으로 사용 가능하도록 export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BottomMenu;
}