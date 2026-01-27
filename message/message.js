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

// 채팅방 선택 및 입력 처리
window.addEventListener('DOMContentLoaded', () => {
  // 화면 요소 참조
  const rooms = document.querySelectorAll('.room');
  const emptyState = document.getElementById('empty-state');
  const chatRoom = document.getElementById('chat-room');
  const chatHeaderName = document.querySelector('.chat-header__name');
  const chatInput = document.getElementById('chat-input-field');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatInputType = document.querySelector('.chat-inputType');
  const chatMessages = document.querySelector('.chat-messages');
  const storageKey = 'messageChatData';
  let activeRoomName = null;

  // 저장된 채팅 데이터 불러오기
  const loadChatData = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      return {};
    }
  };

  // 채팅 데이터 저장
  const saveChatData = data => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      // 저장 실패 시 무시
    }
  };

  // 현재 방 메시지 렌더링
  const renderMessages = messages => {
    if (!chatMessages) return;
    chatMessages.innerHTML = '';
    messages.forEach(message => {
      const item = document.createElement('div');
      const isMine = message.from === 'me';
      item.className = isMine ? 'message message--mine' : 'message';
      item.innerHTML = isMine
        ? `
          <div class="message__content">
            <span class="message__text"></span>
          </div>
        `
        : `
          <img class="message__avatar" src="../assets/images/avatar.png" alt="" />
          <div class="message__content">
            <span class="message__text"></span>
          </div>
        `;
      item.querySelector('.message__text').textContent = message.text;
      chatMessages.appendChild(item);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // 메시지 추가 후 저장/렌더링
  const appendMessage = text => {
    if (!activeRoomName || !chatMessages) return;
    const data = loadChatData();
    const roomMessages = Array.isArray(data[activeRoomName]) ? data[activeRoomName] : [];
    const nextMessage = { text, createdAt: Date.now(), from: 'me' };
    roomMessages.push(nextMessage);
    data[activeRoomName] = roomMessages;
    saveChatData(data);
    renderMessages(roomMessages);
  };

  // 방 선택 시 헤더/내용 갱신
  rooms.forEach(room => {
    room.addEventListener('click', function () {
      // 모든 room에서 is-selected 제거
      rooms.forEach(r => r.classList.remove('is-selected'));
      // 현재 room에 is-selected 추가
      this.classList.add('is-selected');
      // 사용자 이름 가져오기
      const userName = this.querySelector('.room__name').textContent;
      if (chatHeaderName) chatHeaderName.textContent = userName;
      activeRoomName = userName;
      // 빈 화면 숨기고 채팅방 보이기
      if (emptyState) emptyState.style.display = 'none';
      if (chatRoom) chatRoom.style.display = 'flex';

      // 저장된 메시지 불러오기
      const data = loadChatData();
      const roomMessages = Array.isArray(data[userName]) ? data[userName] : [];
      renderMessages(roomMessages);
    });
  });

  if (chatInput && chatSendBtn) {
    // 입력값에 따라 전송 버튼/아이콘 토글
    const toggleSendBtn = () => {
      const hasText = chatInput.value.trim().length > 0;
      chatSendBtn.classList.toggle('is-visible', hasText);
      chatSendBtn.setAttribute('aria-hidden', String(!hasText));
      if (chatInputType) {
        chatInputType.classList.toggle('is-hidden', hasText);
      }
    };

    // 입력 중 실시간 반영
    chatInput.addEventListener('input', toggleSendBtn);
    // 엔터로 전송
    chatInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;
        appendMessage(text);
        chatInput.value = '';
        toggleSendBtn();
      }
    });

    // 버튼 클릭으로 전송
    chatSendBtn.addEventListener('click', () => {
      const text = chatInput.value.trim();
      if (!text) return;
      appendMessage(text);
      chatInput.value = '';
      toggleSendBtn();
    });

    // 초기 상태 반영
    toggleSendBtn();
  }
});
