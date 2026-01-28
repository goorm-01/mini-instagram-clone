// 채팅방 선택 및 입력 처리
window.addEventListener('DOMContentLoaded', () => {
  const getRooms = () => document.querySelectorAll('.room');
  const emptyState = document.getElementById('empty-state');
  const chatRoom = document.getElementById('chat-room');
  const chatHeaderAvatar = document.querySelector('.chat-header__avatar');
  const chatHeaderName = document.querySelector('.chat-header__name');
  const chatHeaderUserId = document.querySelector('.chat-header__userId');
  const chatInput = document.getElementById('chat-input-field');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatInputType = document.querySelector('.chat-inputType');
  const chatMessages = document.querySelector('.chat-messages');
  const storageKey = 'messageChatData';
  let activeRoomName = null;
  let seedChatData = {};

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

  // JSON 데이터 로드: 기본 메시지는 파일에서, 내 메시지는 localStorage에서 관리
  const loadSeedData = () => {
    return fetch('./messages.json')
      .then(res => (res.ok ? res.json() : {}))
      .catch(() => ({}));
  };

  // 시드 데이터에서 방 정보 추출(메시지/아이디)
  const getSeedRoom = roomName => {
    const roomData = seedChatData[roomName];
    if (Array.isArray(roomData)) {
      return { messages: roomData, userId: null };
    }
    if (roomData && typeof roomData === 'object') {
      return {
        messages: Array.isArray(roomData.messages) ? roomData.messages : [],
        userId: roomData.userId || null,
      };
    }
    return { messages: [], userId: null };
  };

  // 시드+로컬 메시지
  const getMergedMessages = roomName => {
    const seedMessages = getSeedRoom(roomName).messages;
    const localData = loadChatData();
    const localMessages = Array.isArray(localData[roomName]) ? localData[roomName] : [];
    return [...seedMessages, ...localMessages];
  };

  // 방 목록의 미리보기(마지막 메시지) 갱신
  const updateRoomPreviews = () => {
    getRooms().forEach(room => {
      const nameEl = room.querySelector('.room__name');
      const lastChatEl = room.querySelector('.room__lastChat');
      if (!nameEl || !lastChatEl) return;
      const roomName = nameEl.textContent;
      const messages = getMergedMessages(roomName);
      if (messages.length === 0) return;
      const lastMessage = messages[messages.length - 1];
      lastChatEl.textContent = lastMessage.text || '';
    });
  };

  // 방 이름에 따라 상대 프로필 이미지 결정
  const getRoomAvatarSrc = roomName => {
    const roomData = seedChatData && typeof seedChatData === 'object' ? seedChatData[roomName] : null;
    const avatar = roomData && typeof roomData === 'object' ? roomData.avatar : '';
    if (typeof avatar === 'string' && avatar.trim()) {
      return avatar;
    }
    return '../assets/images/avatar.png';
  };

  // 채팅 헤더(상단) 정보 갱신
  const updateChatHeader = roomName => {
    if (chatHeaderName) chatHeaderName.textContent = roomName;
    if (chatHeaderAvatar) chatHeaderAvatar.src = getRoomAvatarSrc(roomName);
    if (chatHeaderUserId) {
      const seedUserId = getSeedRoom(roomName).userId;
      chatHeaderUserId.textContent = seedUserId || '';
    }
  };

  // 현재 방 메시지 렌더링
  const renderMessages = (messages, roomName) => {
    if (!chatMessages) return;
    chatMessages.innerHTML = '';
    messages.forEach((message, index) => {
      const item = document.createElement('div');
      const isMine = message.from === 'me';
      const currentTime = typeof message.createdAt === 'number' ? message.createdAt : 0;
      const nextMessage = messages[index + 1];
      const nextTime = nextMessage && typeof nextMessage.createdAt === 'number' ? nextMessage.createdAt : 0;
      const nextIsSameSender = nextMessage && nextMessage.from === message.from;
      const isLastInMinuteGroup = !nextMessage || !nextIsSameSender || (nextTime - currentTime) > 60000;
      item.className = isMine ? 'message message--mine' : 'message';
      item.innerHTML = isMine
        ? `
          <div class="message__content">
            <span class="message__text"></span>
          </div>
        `
        : `
          <img class="message__avatar" src="${getRoomAvatarSrc(roomName)}" alt="" style="opacity: ${isLastInMinuteGroup ? '1' : '0'};" />
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
    renderMessages(getMergedMessages(activeRoomName), activeRoomName);
    updateRoomPreviews();
  };

  const bindRooms = () => {
    const rooms = getRooms();
    if (!rooms.length) return;
    rooms.forEach(room => {
      room.addEventListener('click', function () {
        // 모든 room에서 is-selected 제거
        rooms.forEach(r => r.classList.remove('is-selected'));
        // 현재 room에 is-selected 추가
        this.classList.add('is-selected');
        // 사용자 이름 가져오기
        const userName = this.querySelector('.room__name').textContent;
        updateChatHeader(userName);
        activeRoomName = userName;
        // 빈 화면 숨기고 채팅방 보이기
        if (emptyState) emptyState.style.display = 'none';
        if (chatRoom) chatRoom.style.display = 'flex';

        // 시드+로컬 메시지  표시
        renderMessages(getMergedMessages(userName), userName);
      });
    });
  };

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
    const sendCurrentMessage = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      appendMessage(text);
      chatInput.value = '';
      toggleSendBtn();
    };

    // 엔터로 전송
    chatInput.addEventListener('keydown', event => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      sendCurrentMessage();
    });

    // 버튼 클릭으로 전송
    chatSendBtn.addEventListener('click', sendCurrentMessage);

    // 초기 상태 반영
    toggleSendBtn();
  }

  // 시드 데이터 먼저 불러오기
  loadSeedData().then(data => {
    seedChatData = data && typeof data === 'object' ? data : {};
    if (activeRoomName) {
      renderMessages(getMergedMessages(activeRoomName), activeRoomName);
    }
    updateRoomPreviews();
    bindRooms();
  });

  window.addEventListener('rooms:rendered', () => {
    updateRoomPreviews();
    bindRooms();
  });
});
