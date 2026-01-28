// 메시지 목록 렌더링
window.addEventListener('DOMContentLoaded', () => {
  const listEl = document.querySelector('.rooms__list');
  if (!listEl) return;

  fetch('./messages.json')
    .then(res => (res.ok ? res.json() : {}))
    .then(data => {
      if (!data || typeof data !== 'object') return;
      listEl.innerHTML = '';
      Object.entries(data).forEach(([roomName, roomData]) => {
        const messages = Array.isArray(roomData?.messages) ? roomData.messages : [];
        const lastMessage = messages[messages.length - 1];
        const lastText = lastMessage?.text || '';
        const avatar = typeof roomData?.avatar === 'string' && roomData.avatar.trim()
          ? roomData.avatar
          : '../assets/images/avatar.png';

        const item = document.createElement('li');
        item.className = 'room';
        item.innerHTML = `
          <img class="room__avatar" src="${avatar}" alt="" />
          <div class="room__meta">
            <div class="room__name-row">
              <span class="room__name"></span>
            </div>
            <div class="room__preview">
              <span class="room__lastChat"></span>
              <span class="room__dot">•</span>
              <span class="room__time">방금</span>
            </div>
          </div>
        `;
        item.querySelector('.room__name').textContent = roomName;
        item.querySelector('.room__lastChat').textContent = lastText;
        listEl.appendChild(item);
      });

      window.dispatchEvent(new Event('rooms:rendered'));
    })
    .catch(() => {});
});
