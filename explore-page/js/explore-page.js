const postData = {
  1: {
    type: 'post',
    embedUrl: 'https://www.instagram.com/p/DTwao4YiSH9/?utm_source=ig_embed&utm_campaign=loading'
  },
  2: {
    type: 'post',
    embedUrl: 'https://www.instagram.com/p/DTr025FEymx/?utm_source=ig_embed&utm_campaign=loading'
  },
  3: {
    type: 'reel',
    embedUrl: 'https://www.instagram.com/reel/DRROSlXFH4v/?utm_source=ig_embed&utm_campaign=loading'
  },
  4: {
    type: 'post',
    embedUrl: 'https://www.instagram.com/p/DTofEz2kwO7/?utm_source=ig_embed&utm_campaign=loading'
  },
  5: {
    type: 'post',
    embedUrl: 'https://www.instagram.com/p/DTwYsDTkrE8/?utm_source=ig_embed&utm_campaign=loading'
  },
  6: {
    type: 'post',
    embedUrl: 'https://www.instagram.com/p/DT4y582EgDC/?utm_source=ig_embed&utm_campaign=loading'
  },
  7: {
    type: 'reel',
    embedUrl: 'https://www.instagram.com/reel/DRtx7l8D3o_/?utm_source=ig_embed&utm_campaign=loading'
  },
  8: {
    type: 'post',
    embedUrl: 'https://www.instagram.com/p/DTXpunhEmcg/?utm_source=ig_embed&utm_campaign=loading'
  }
};

document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item'); // 각 게시물 카드
    const modalOverlay = document.getElementById('modalOverlay'); // 모달 겉에 검은 opacity 배경
    const modalBody = document.getElementById('modalBody'); // 인스타 embed가 들어갈 곳
    const closeBtn = document.getElementById('closeBtn'); // x 버튼

    // 그리드 아이템 클릭 이벤트 - 클릭한 게시물의 정보를 모달에 띄움
    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            const postId = this.dataset.id;
            const postInfo = postData[postId];
            
            if (postInfo) {
                showModal(postInfo);
            }
        });
    });

    // 모달 닫기 이벤트 - 아무 곳이나 클릭할 시 모달이 닫힘
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // 모달 표시 함수 - 전달받은 postInfo(게시물 정보)를 모달로 표시
    function showModal(postInfo) {
      // 유튜브에서 iframe으로 영상을 임베드하는것과 비슷하게 인스타그램에서는 blockquote를 사용해 인스타그램 게시물을 임베드 해올수 있음
      modalBody.innerHTML = `
          <blockquote 
              class="instagram-media" 
              data-instgrm-permalink="${postInfo.embedUrl}" 
              data-instgrm-version="14"
              style="width:100%; margin:0 auto;">
          </blockquote>
      `;

      modalOverlay.classList.add('active');

      // 인스타 embed 스크립트 재실행
      if (window.instgrm) {
          window.instgrm.Embeds.process();
      }
  }

    // 모달 닫기 함수
    function closeModal() {
        modalOverlay.classList.remove('active');
        modalBody.innerHTML = '';
    }
});

// 하단 메뉴 활성 상태 관리
document.addEventListener('DOMContentLoaded', function() {
  // 메뉴 아이템 클릭 이벤트
  const menuItems = document.querySelectorAll('.bottom-menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // 현재 페이지가 아닌 경우에만 클릭할 수 있게
      if (!this.classList.contains('current-page')) {
        return true;
      }
      // 현재 페이지인 경우 클릭 방지
      e.preventDefault();
    });
  });
});