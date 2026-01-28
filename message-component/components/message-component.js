/*
  메시지 컴포넌트 파일
  - 모든 페이지 오른쪽 하단에 고정으로 표시
  - 클릭 시 메시지 목록 창이 확장
  - SVG 스프라이트 방식으로 아이콘 관리
 */
class MessageComponent {
  constructor() {
    this.isOpen = false;  // 메시지 창 열림/닫힘 상태 관리
    this.isSearchMode = false;  // 검색 모드 상태 관리
    this.init();
  }

  /*
    컴포넌트 초기화
    - DOM 로드 완료 후 SVG 로드, 렌더링, 이벤트 등록 순서로 실행
   */
  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.loadSVGSprite();
        this.render();
        this.attachEvents();
      });
    } else {
      this.loadSVGSprite();
      this.render();
      this.attachEvents();
    }
  }

  /*
    SVG 스프라이트 파일 로드
    - assets/icons.svg 파일을 가져와서 body 맨 앞에 숨김 처리로 삽입
   */
  loadSVGSprite() {
    fetch('/message-component/assets/icons.svg')
      .then(response => response.text())
      .then(data => {
        const div = document.createElement('div');
        div.innerHTML = data;
        div.style.display = 'none';
        document.body.insertBefore(div, document.body.firstChild);
      })
      .catch(error => console.error('SVG 로드 실패:', error));
  }

  /*
    SVG 아이콘 생성 헬퍼 함수
    사용 예시: this.createIcon('icon-message', 'my-icon', 28, 28)
   */
  createIcon(iconId, className = '', width = 24, height = 24) {
    return `
      <svg class="${className}" width="${width}" height="${height}" aria-hidden="true">
        <use href="#${iconId}"></use>
      </svg>
    `;
  }

  /*
    컴포넌트 HTML 구조 생성
    
    구조:
    1. message-component: 오른쪽 하단 작은 버튼 (평상시)
    2. message-expanded: 클릭 시 나타나는 확장된 창
      - message-list-view: 메시지 목록 화면
      - message-search-view: 메시지 검색 화면 (네가 구현할 부분)
   */
  getHTML() {
    return `
      <!-- 오른쪽 하단 작은 메시지 버튼 (기본 상태) -->
      <div class="message-component">
        <div class="title-container">
          <div>${this.createIcon('icon-message', 'icon-message', 28, 28)}</div>
          <div class="message-title">메시지</div>
        </div>
        <img class="profile-img" src="/message-component/assets/images/profile-img.png" alt="profile-img" />
      </div>

      <!-- 확장된 메시지 창 -->
      <div class="message-expanded">
        
      <!-- ========== 메시지 목록 화면 (기본) ========== -->
      <div class="message-list-view">
      <!-- 헤더 -->
      <div class="expanded-title-container">
        <div class="expanded-title">메시지</div>
        <div class="expanded-title-right-icon">
          <button class="expanded-btn">${this.createIcon('icon-expand', 'expand-icon', 25, 25)}</button>
          <button class="expanded-btn">
            ${this.createIcon('icon-close', 'icon-close', 25, 25)}
          </button>
        </div>
      </div>

      <!-- 메시지 목록 -->
      <div class="message-body">
        <div class="message-items">
          <img class="expanded-profile-img" src="/message-component/assets/images/profile-img.png" alt="profile-img" />
          <div class="expanded-profile-text">
            <div class="expanded-profile-text-top">goorm.co</div>
            <div class="expanded-profile-text-bottom">
              <div>goorm.co님이 첨부 파일을 보냈습니다.</div>
              <div> · 4일</div>
            </div>
          </div>
        </div>
        <div class="message-items">
          <img class="expanded-profile-img" src="/message-component/assets/images/profile-img.png" alt="profile-img" />
          <div class="expanded-profile-text">
            <div class="expanded-profile-text-top">goorm.co</div>
            <div class="expanded-profile-text-bottom">
              <div>goorm.co님이 첨부 파일을 보냈습니다.</div>
              <div> · 4일</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 새 메시지 버튼 (목록 화면용) -->
      <div class="message-footer">
        <button class="expanded-new-message">
          ${this.createIcon('icon-new-message', 'new-message-icon', 25, 25)}
        </button>
      </div>
    </div>

    <!-- ========== 메시지 검색 화면 ========== -->
    <div class="message-search-view">
      <!-- 검색 헤더 -->
      <div class="search-header">
        <div class="search-header-title">
          <button class="search-back-btn">
            ${this.createIcon('icon-back', 'back-icon', 20, 20)}
          </button>
          <div class="search-header-text">New message</div>
        </div>
        <button class="expanded-btn">
          ${this.createIcon('icon-close', 'icon-close', 25, 25)}
        </button>
      </div>
      
      <!-- 검색창 -->
      <div class="search-content">
        <div class="search-content-title">받는 사람:</div>
        
        <div class="search-input-wrapper">
          <!-- 선택된 사용자 태그 영역 -->
          <div class="selected-users-container"></div>
          
          <!-- 검색 input -->
          <input class="search-input" type="text" placeholder="검색..." />
        </div>
      </div>
      
      <!-- 추천 -->
      <div class="search-recommend">
        <div class="search-recommend-text">추천</div>
      </div>

      <!-- 추천 프로필 목록 -->
      <div class="recommend-profile-list">
        <!-- 추천 프로필 1 -->
        <div class="recommend-profile" data-user-id="1">
          <div class="recommend-profile-left">
            <img class="expanded-profile-img" src="/message-component/assets/images/profile-img.png" alt="profile-img" />
            <div class="recommend-profile-left-text">
              <div class="search-recommend-text">goorm.co</div>
              <div class="search-recommend-text-bottom">goorm.co</div>
            </div>
          </div>
          <div class="recommend-checkbox">
            ${this.createIcon('icon-check', 'check-icon', 20, 20)}
          </div>
        </div>

        <!-- 추천 프로필 2 -->
        <div class="recommend-profile" data-user-id="2">
          <div class="recommend-profile-left">
            <img class="expanded-profile-img" src="/message-component/assets/images/profile-img.png" alt="profile-img" />
            <div class="recommend-profile-left-text">
              <div class="search-recommend-text">user_two</div>
              <div class="search-recommend-text-bottom">사용자2</div>
            </div>
          </div>
          <div class="recommend-checkbox">
            ${this.createIcon('icon-check', 'check-icon', 20, 20)}
          </div>
        </div>

        <!-- 추천 프로필 3 -->
        <div class="recommend-profile" data-user-id="3">
          <div class="recommend-profile-left">
            <img class="expanded-profile-img" src="/message-component/assets/images/profile-img.png" alt="profile-img" />
            <div class="recommend-profile-left-text">
              <div class="search-recommend-text">coding_master</div>
              <div class="search-recommend-text-bottom">코딩마스터</div>
            </div>
          </div>
          <div class="recommend-checkbox">
            ${this.createIcon('icon-check', 'check-icon', 20, 20)}
          </div>
        </div>
      </div>

      <!-- chat 버튼 -->
      <div class="chat">
        <div class="chat-btn">Chat</div>
      </div>
    `;
  }

  /*
    이벤트 리스너 등록
  */
  attachEvents() {
  // 메시지 컴포넌트(작은 버튼) 클릭 -> 창 열기/닫기
  const component = document.querySelector('.message-component');
  component?.addEventListener('click', () => {
    this.toggleMessage();
  });

  // X(닫기) 버튼 클릭 -> 창 닫기
  const closeBtns = document.querySelectorAll('.expanded-btn');
  closeBtns.forEach(btn => {
    if (btn.querySelector('.icon-close')) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeMessage();
      });
    }
  });

  // message-footer 클릭 -> 검색 화면으로 전환
  const messageListFooter = document.querySelector('.expanded-new-message');
  messageListFooter?.addEventListener('click', (e) => {
    e.stopPropagation();
    this.showSearchView();
  });

  // 뒤로 버튼 클릭 -> 목록 화면으로 전환
  const backBtn = document.querySelector('.search-back-btn');
  backBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    this.showListView();
  });

  // 추천 프로필 클릭 -> 체크박스 토글 + 태그 추가/제거
  const recommendProfiles = document.querySelectorAll('.recommend-profile');
  recommendProfiles.forEach(profile => {
    profile.addEventListener('click', (e) => {
      e.stopPropagation();
      const isSelected = profile.classList.toggle('selected');
      
      // 사용자 정보 가져오기
      const userId = profile.dataset.userId;
      const username = profile.querySelector('.search-recommend-text').textContent;
      
      if (isSelected) {
        this.addSelectedUser(userId, username);
      } else {
        this.removeSelectedUser(userId);
      }
    });
  });
  }

  /*
    선택된 사용자 태그 추가
  */
  addSelectedUser(userId, username) {
    const container = document.querySelector('.selected-users-container');
    const searchContent = document.querySelector('.search-content');
    if (!container) return;

    const tagHTML = `
      <div class="selected-user-tag" data-user-id="${userId}">
        <span>${username}</span>
        <button class="remove-user-btn" data-user-id="${userId}">
          ${this.createIcon('icon-close', 'remove-icon', 12, 12)}
        </button>
      </div>
    `;
    
    container.insertAdjacentHTML('beforeend', tagHTML);
    
    // 태그가 추가되면 has-tags 클래스 추가
    searchContent?.classList.add('has-tags');
    
    // Chat 버튼 활성화
    this.updateChatButton();

    // X 버튼 클릭 이벤트
    const removeBtn = container.querySelector(`[data-user-id="${userId}"] .remove-user-btn`);
    removeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.removeSelectedUser(userId);
      
      const profile = document.querySelector(`.recommend-profile[data-user-id="${userId}"]`);
      profile?.classList.remove('selected');
    });
  }

  /*
    선택된 사용자 태그 제거
  */
  removeSelectedUser(userId) {
    const tag = document.querySelector(`.selected-user-tag[data-user-id="${userId}"]`);
    const container = document.querySelector('.selected-users-container');
    const searchContent = document.querySelector('.search-content');
    
    tag?.remove();
    
    // 태그가 모두 제거되면 has-tags 클래스 제거
    if (container?.children.length === 0) {
      searchContent?.classList.remove('has-tags');
    }
    
    // Chat 버튼 상태 업데이트
    this.updateChatButton();
  }

  /*
    Chat 버튼 활성화/비활성화
  */
  updateChatButton() {
    const container = document.querySelector('.selected-users-container');
    const chatBtn = document.querySelector('.chat-btn');
    
    if (container?.children.length > 0) {
      // 선택된 사용자가 있으면 활성화
      chatBtn?.classList.add('active');
    } else {
      // 선택된 사용자가 없으면 비활성화
      chatBtn?.classList.remove('active');
    }
  }

  /*
    메시지 창 토글 (열기/닫기)
   */
  toggleMessage() {
    if (this.isOpen) {
      this.closeMessage();
    } else {
      this.openMessage();
    }
  }

  /*
    메시지 창 열기
   */
  openMessage() {
    const component = document.querySelector('.message-component');
    const expanded = document.querySelector('.message-expanded');
    
    if (!component || !expanded) return;

    const rect = component.getBoundingClientRect();
    
    expanded.style.bottom = `${window.innerHeight - rect.bottom}px`;
    expanded.style.right = `${window.innerWidth - rect.right}px`;
    
    component.classList.add('active');
    expanded.classList.add('active');
    
    this.isOpen = true;
  }

  /*
    메시지 창 닫기
   */
  closeMessage() {
    const component = document.querySelector('.message-component');
    const expanded = document.querySelector('.message-expanded');
    
    component?.classList.remove('active');
    expanded?.classList.remove('active');
    
    this.isOpen = false;
    
    // 목록 화면으로 초기화
    if (this.isSearchMode) {
      this.showListView();
    }
  }

  /*
    검색 화면으로 전환
   */
  showSearchView() {
    const listView = document.querySelector('.message-list-view');
    const searchView = document.querySelector('.message-search-view');
    
    listView?.classList.remove('active');
    listView?.classList.add('hidden');
    
    searchView?.classList.remove('hidden');
    searchView?.classList.add('active');
    
    this.isSearchMode = true;
    console.log('검색 화면으로 전환');
  }

  /*
    목록 화면으로 전환
   */
  showListView() {
    const listView = document.querySelector('.message-list-view');
    const searchView = document.querySelector('.message-search-view');
    
    searchView?.classList.remove('active');
    searchView?.classList.add('hidden');
    
    listView?.classList.remove('hidden');
    listView?.classList.add('active');
    
    this.isSearchMode = false;
    console.log('목록 화면으로 전환');
  }

  /*
    DOM에 컴포넌트 렌더링
   */
  render() {
    document.body.insertAdjacentHTML('beforeend', this.getHTML());
  }
}

/*
  컴포넌트 자동 실행
  
  사용법: 해당 사용법은 message-example에서 참고하고 사용하시면 됩니다!
  <script src="./components/message-component.js"></script>
 */
new MessageComponent();