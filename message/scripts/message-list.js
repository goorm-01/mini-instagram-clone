/*
 * 기능: 채팅방 목록 렌더링
 * - messages.json 데이터 로드
 * - 고정방 우선 정렬 → 최신 메시지 순 정렬
 * - 상대시간 표시 (방금/분/시간/일)
 * - 읽지않음 배지 표시
 */

window.addEventListener('DOMContentLoaded', () => {
  // DOM 요소
  const listEl = document.querySelector('.rooms__list');

  /**
   * 시간 변환 함수
   * @param {number} timestamp - 메시지 생성 시간 (ms)
   * @returns {string} 상대시간 문자열
   */
  const toRelativeTime = timestamp => {
    const diffMs = Date.now() - timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    
    if (diffSec < 60) return '방금';
    
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}분`;
    
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}시간`;
    
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}일`;
  };

  /**
   * 채팅방 목록 렌더링
   * @param {Object} data - messages.json 데이터
   */
  const renderRooms = data => {
    // 기존 목록 초기화
    listEl.innerHTML = '';
    
    // 정렬 로직: 고정방 우선 → 최신 메시지 순
    const rooms = Object.entries(data).sort(([, a], [, b]) => {
      const aPinned = Boolean(a?.pinned);
      const bPinned = Boolean(b?.pinned);
      
      // 고정방 우선 정렬
      if (aPinned !== bPinned) return aPinned ? -1 : 1;
      
      // 최신 메시지 시간으로 정렬
      const aMessages = a?.messages || [];
      const bMessages = b?.messages || [];
      const aLast = aMessages[aMessages.length - 1]?.createdAt || 0;
      const bLast = bMessages[bMessages.length - 1]?.createdAt || 0;
      return bLast - aLast;
    });

    // 각 채팅방 DOM 생성
    rooms.forEach(([roomName, roomData]) => {
      // 데이터 추출
      const messages = roomData?.messages || [];
      const lastMessage = messages[messages.length - 1];
      const lastText = lastMessage?.text || '';
      const lastTime = toRelativeTime(lastMessage?.createdAt);
      const avatar = roomData?.avatar?.trim() || '../assets/images/avatar.png';
      const isPinned = Boolean(roomData?.pinned);
      const unreadCount = roomData?.unread || 0;

      // DOM 요소 생성
      const item = document.createElement('li');
      item.className = 'room';
      item.innerHTML = `
        <img class="room__avatar" src="${avatar}" alt="" />
        <div class="room__meta">
          <div class="room__name-row">
            <span class="room__name"></span>
            ${isPinned ? `
              <span class="room__pinned" aria-label="상단 고정">
                <svg aria-hidden="true" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12">
                  <path d="m22.707 7.583-6.29-6.29a1 1 0 0 0-1.414 0 5.183 5.183 0 0 0-1.543 3.593L8.172 8.79a5.161 5.161 0 0 0-4.768 1.42 1 1 0 0 0 0 1.414l3.779 3.778-5.89 5.89a1 1 0 1 0 1.414 1.414l5.89-5.89 3.778 3.779a1 1 0 0 0 1.414 0 5.174 5.174 0 0 0 1.42-4.769l3.905-5.287a5.183 5.183 0 0 0 3.593-1.543 1 1 0 0 0 0-1.414Z" />
                </svg>
              </span>
            ` : ''}
          </div>
          <div class="room__preview">
            <span class="room__lastChat"></span>
            <span class="room__dot">•</span>
            <span class="room__time"></span>
          </div>
        </div>
        ${unreadCount > 0 ? '<span class="room__unread" aria-label="읽지 않음"></span>' : ''}
      `;
      
      // 텍스트 내용 설정
      item.querySelector('.room__name').textContent = roomName;
      item.querySelector('.room__lastChat').textContent = lastText;
      item.querySelector('.room__time').textContent = lastTime;
      
      // DOM에 추가
      listEl.appendChild(item);
    });

    // 렌더링 완료 이벤트 발생 (message-chat.js의 클릭 이벤트 )
    window.dispatchEvent(new Event('rooms:rendered'));
  };

  // 초기화: JSON 데이터 로드 및 렌더링
  fetch('./messages.json')
    .then(res => res.json())
    .then(renderRooms)
    .catch(() => {}); // 에러 시 빈 목록 유지
});