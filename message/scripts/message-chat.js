/*
 * 기능: 채팅방 선택/렌더링/입력/읽음 상태 관리
 * - 시드 메시지(JSON) + 로컬 메시지(localStorage) 합쳐서 표시
 * - 아바타 그룹화 (1분 이내 같은 발신자)
 * - 읽음/안읽음 상태 관리
 */

window.addEventListener('DOMContentLoaded', () => {

  // ========== DOM 요소 ==========
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
  
  // ========== 전역 변수 ==========
  const storageKey = 'messageChatData';
  let activeRoomName = null; // 현재 선택된 채팅방
  let seedChatData = {}; // messages.json 시드 데이터

  // ========== 데이터 관리 모듈 ==========
  const dataManager = {
    /**
     * localStorage에서 채팅 데이터 로드
     * @returns {Object} 채팅 데이터 객체
     */
    load: () => {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    },

    /**
     * localStorage에 채팅 데이터 저장
     * @param {Object} data - 저장할 채팅 데이터
     */
    save: data => {
      localStorage.setItem(storageKey, JSON.stringify(data));
    },

    /**
     * messages.json 파일에서 시드 데이터 로드
     * @returns {Promise<Object>} 시드 데이터 Promise
     */
    loadSeed: () => {
      return fetch('./messages.json')
        .then(res => res.json())
        .catch(() => ({}));
    }
  };

  // ========== 채팅방 데이터 처리 모듈 ==========
  const roomManager = {
    /**
     * 시드 데이터에서 특정 방 정보 추출
     * @param {string} roomName - 채팅방 이름
     * @returns {Object} {messages: Array, userId: string}
     */
    getSeedRoom: roomName => {
      const roomData = seedChatData[roomName];
      if (Array.isArray(roomData)) {
        return { messages: roomData, userId: null };
      }
      if (roomData && typeof roomData === 'object') {
        return {
          messages: roomData.messages || [],
          userId: roomData.userId || null,
        };
      }
      return { messages: [], userId: null };
    },

    /**
     * 시드 메시지 + 로컬 메시지 합치기
     * @param {string} roomName - 채팅방 이름
     * @returns {Array} 합쳐진 메시지 배열
     */
    getMergedMessages: roomName => {
      const seedMessages = roomManager.getSeedRoom(roomName).messages;
      const localData = dataManager.load();
      const localMessages = localData[roomName] || [];
      return [...seedMessages, ...localMessages];
    },

    /**
     * 채팅방에 따른 아바타 이미지 URL 반환
     * @param {string} roomName - 채팅방 이름
     * @returns {string} 아바타 이미지 URL
     */
    getAvatarSrc: roomName => {
      const roomData = seedChatData[roomName];
      const avatar = roomData?.avatar;
      return avatar?.trim() || '../assets/images/avatar.png';
    }
  };

  // ========== UI 업데이트 모듈 ==========
  const uiManager = {
    /**
     * 채팅방 목록의 마지막 메시지 미리보기 업데이트
     */
    updateRoomPreviews: () => {
      getRooms().forEach(room => {
        const nameEl = room.querySelector('.room__name');
        const lastChatEl = room.querySelector('.room__lastChat');
        const roomName = nameEl.textContent;
        const messages = roomManager.getMergedMessages(roomName);
        
        if (messages.length > 0) {
          const lastMessage = messages[messages.length - 1];
          lastChatEl.textContent = lastMessage.text || '';
        }
      });
    },

    /**
     * 채팅 헤더 정보 업데이트 (이름, 아바타, 사용자ID)
     * @param {string} roomName - 채팅방 이름
     */
    updateChatHeader: roomName => {
      chatHeaderName.textContent = roomName;
      chatHeaderAvatar.src = roomManager.getAvatarSrc(roomName);
      const seedUserId = roomManager.getSeedRoom(roomName).userId;
      chatHeaderUserId.textContent = seedUserId || '';
    },

    /**
     * 입력값에 따른 전송 버튼 표시/숨김 토글
     */
    toggleSendBtn: () => {
      const hasText = chatInput.value.trim().length > 0;
      chatSendBtn.classList.toggle('is-visible', hasText);
      chatSendBtn.setAttribute('aria-hidden', String(!hasText));
      chatInputType?.classList.toggle('is-hidden', hasText);
    }
  };

  // ========== 메시지 처리 모듈 ==========
  const messageManager = {
    /**
     * 채팅 메시지 렌더링
     * @param {Array} messages - 렌더링할 메시지 배열
     * @param {string} roomName - 채팅방 이름
     */
    render: (messages, roomName) => {
      chatMessages.innerHTML = '';
      
      messages.forEach((message, index) => {
        const item = document.createElement('div');
        const isMine = message.from === 'me';
        const nextMessage = messages[index + 1];
        
        // 1분이내에 메세지 연달아 수신시 마지막꺼만 프로필사진 표시
        const isLastInMinuteGroup = !nextMessage || 
          nextMessage.from !== message.from || 
          (nextMessage.createdAt - message.createdAt) > 60000;

        // 내 메시지 vs 상대 메시지 구분
        item.className = isMine ? 'message message--mine' : 'message';
        item.innerHTML = isMine
          ? `<div class="message__content">
               <span class="message__text"></span>
               <span class="message__status"></span>
             </div>`
          : `<img class="message__avatar" src="${roomManager.getAvatarSrc(roomName)}" alt="" style="opacity: ${isLastInMinuteGroup ? '1' : '0'};" />
             <div class="message__content">
               <span class="message__text"></span>
             </div>`;

        // 메시지 내용 설정
        item.querySelector('.message__text').textContent = message.text;
        
        // 내 메시지인 경우 읽음 상태 표시
        if (isMine) {
          const statusEl = item.querySelector('.message__status');
          statusEl.textContent = message.read ? '읽음' : '안읽음';
        }
        chatMessages.appendChild(item);
      });
      
      // 스크롤을 최신 메시지로 이동
      chatMessages.scrollTop = chatMessages.scrollHeight;
    },

    /**
     * 내 메시지 읽음 상태로 변경 (데모용임)
     * @param {string} roomName - 채팅방 이름
     * @param {number} createdAt - 메시지 생성 시간
     */
    markRead: (roomName, createdAt) => {
      const data = dataManager.load();
      const roomMessages = data[roomName] || [];
      const target = roomMessages.find(msg => msg.from === 'me' && msg.createdAt === createdAt);
      
      if (target && !target.read) {
        target.read = true;
        data[roomName] = roomMessages;
        dataManager.save(data);
        messageManager.render(roomManager.getMergedMessages(roomName), roomName);
      }
    },

    /**
     * 새 메시지 추가 및 저장
     * @param {string} text - 메시지 내용
     */
    append: text => {
      const data = dataManager.load();
      const roomMessages = data[activeRoomName] || [];
      
      // 새 메시지 객체 생성 (기본: 안읽음 상태)
      const nextMessage = { text, createdAt: Date.now(), from: 'me', read: false };
      roomMessages.push(nextMessage);
      data[activeRoomName] = roomMessages;
      
      // 저장 및 UI 업데이트
      dataManager.save(data);
      messageManager.render(roomManager.getMergedMessages(activeRoomName), activeRoomName);
      uiManager.updateRoomPreviews();
      
      // 데모용: 2초 후 자동으로 읽음 처리
      setTimeout(() => {
        messageManager.markRead(activeRoomName, nextMessage.createdAt);
      }, 2000);
    }
  };

  // ========== 이벤트 처리 ==========
  /**
   * 채팅방 목록 클릭 이벤트 바인딩
   */
  const bindRooms = () => {
    const rooms = getRooms();
    rooms.forEach(room => {
      room.addEventListener('click', function () {
        // 선택 상태 초기화 및 현재 방 선택
        rooms.forEach(r => r.classList.remove('is-selected'));
        this.classList.add('is-selected');
        
        // 선택된 방 정보 추출
        const userName = this.querySelector('.room__name').textContent;
        uiManager.updateChatHeader(userName);
        activeRoomName = userName;
        
        // 화면 전환: 빈 상태 → 채팅방
        emptyState.style.display = 'none';
        chatRoom.style.display = 'flex';
        
        // 메시지 렌더링
        messageManager.render(roomManager.getMergedMessages(userName), userName);
      });
    });
  };

  /**
   * 메시지 전송 처리
   */
  const sendCurrentMessage = () => {
    const text = chatInput.value.trim();
    if (text) {
      messageManager.append(text);
      chatInput.value = '';
      uiManager.toggleSendBtn();
    }
  };

  // ========== 이벤트 리스너 등록(엔터키, 버튼키 둘다 작동) ==========
  chatInput?.addEventListener('input', uiManager.toggleSendBtn);
  chatInput?.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendCurrentMessage();
    }
  });
  chatSendBtn?.addEventListener('click', sendCurrentMessage);

  // ========== 초기화 ==========
  
  // 1. 시드 로드
  dataManager.loadSeed().then(data => {
    seedChatData = data;
    // 2. 방 목록 미리보기 업데이트 및 클릭 이벤트 바인딩
    uiManager.updateRoomPreviews();
    bindRooms();
  });
  // 3. 방 목록 재렌더링 시 이벤트 리스너
  window.addEventListener('rooms:rendered', () => {
    uiManager.updateRoomPreviews();
    bindRooms();
  });
  // 4. 초기 UI 상태 설정
  uiManager.toggleSendBtn();
});