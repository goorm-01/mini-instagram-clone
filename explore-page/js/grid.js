const posts = [
  {
    id: 1,
    type: 'post',
    img: 'https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/619839342_18553846510035490_4753507863252732448_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=1&ig_cache_key=MzgxNDY2NjAzNDUyMzc5OTI3Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMS5zZHIuQzMifQ%3D%3D&_nc_ohc=jQlEmsE3SQUQ7kNvwHPqXv8&_nc_oc=AdlOK-1B3Q5OrYj3xrjpUZc_3WJdTAOmW9JID5d2E7g4E-Sr-mZ7YbG6i5c-Q9BkRCo&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=7q_LUwlNfBuh-gYXkIUEwA&oh=00_Afoxy26ERX54A55Ptnbeb0YGvREaGMMrmt5oT1ZqcXxqdQ&oe=697F6504',
    likes: 1234,
    comments: 56,
    icon: 'slide'
  },
  {
    id: 2,
    type: 'post',
    img: 'https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/619129735_18558327526027702_2005465568091652973_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=1&ig_cache_key=MzgxMzMyNTEzNTY5MzQzNTkxNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExNTJ4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=GzBh_toER7sQ7kNvwHOlOiX&_nc_oc=Adk3K5fJVa7H9rJIchi3fDKME82S2l3isg1sZegKaoNi3AvVR7wGUKq0v9anoIlBHtA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=7q_LUwlNfBuh-gYXkIUEwA&oh=00_AfpLcMiBf-VjS1teE2Qy4RUYIR3j3lpywfkUILKEa2g6fw&oe=697F6F31',
    likes: 2847,
    comments: 89,
    icon: 'slide'
  },
  {
    id: 3,
    type: 'reel',
    img: 'https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/583350563_18544636864025984_7190407070762806467_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=103&ig_cache_key=Mzc2OTg1NzIxMjgwMzIxODk5MTE4NTQ0NjM2ODU4MDI1OTg0.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=9OnfrMoPZqAQ7kNvwFLMpKX&_nc_oc=AdnkGsipz6cZ2uCvBmHjKquhBNkKp3w6bTeDy5u31YeNj-PYZUOfPn-UmuEW0GKIyyA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=lcMzAZxyaitjfqVX1SyPmQ&oh=00_Afrs-MunKhFG_cz5Hjl9RYpTDxz71h0WOs0m5MczlR2iyg&oe=697F449C',
    likes: 3245,
    comments: 128,
    icon: 'reel',
    large: true
  },
  {
    id: 4,
    type: 'post',
    img: 'https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/619247395_18382162366153934_3122916978065463641_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzgxMjQzMzczNzA3NTEzMDI4OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwMjR4MTM1OC5zZHIuQzMifQ%3D%3D&_nc_ohc=yJJa-HZC4SIQ7kNvwFeu8xF&_nc_oc=Adnwn1NcVUmAHLV2ZFNy5ML4RgGPIDQT_kaZeSQ4Hv46byqkf4-jhGKqHLJ48DOW_Zg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=5f0LbkNIb8FOPC6LXrF93g&oh=00_AfoJdum6j-KdKGOBtGq5gERfEI8rfsfelJC7Q7uGrRvBDg&oe=697F4F40',
    likes: 567,
    comments: 23,
    icon: 'slide'
  },
  {
    id: 5,
    type: 'post',
    img: 'https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/619511290_18054390575674556_9195287026782154459_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzgxNDA0MTg4MjA5MjI0ODA5NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5MC5zZHIuQzMifQ%3D%3D&_nc_ohc=Qy5Dj-d0X-MQ7kNvwGqtE_k&_nc_oc=AdlYd2OzJaOQR4URJbK7LLHgataauiNByQ-Nn1CBdrl9TV9a9E9448TI1eOX1iBeEGY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=8d2a5m8tGd80DSNN-9O5-A&oh=00_Afqkp5xPuKXJxgKh_dWR6kyO2oGmZ6odLUskC8VeCWWs2Q&oe=697F67AF',
    likes: 1456,
    comments: 67,
    icon: 'slide'
  },
  {
    id: 6,
    type: 'post',
    img: 'https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/621492644_18032281100783986_7430456006455193533_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MzgxNzAyNDM1NjM1NTI4ODI5OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM0Ni5zZHIuQzMifQ%3D%3D&_nc_ohc=YhWGGvH3eZ4Q7kNvwFbsIUR&_nc_oc=AdkZ9knru1dgSrDLHaLIMg4PU9a7vmW94foOND5JMJRSf-DVsjJYga9F2rPb0Thk9jc&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=tvLG2BlUgZW-vqutSfvUUg&oh=00_AfrxwHUzSpnOHY8dZ0H4L5CGeYOJS386ZiOCol3T0q_jZA&oe=697F59DF',
    likes: 1234,
    comments: 56,
    icon: 'slide'
  },
  {
    id: 7,
    type: 'reel',
    img: 'https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/588625040_17929379502155916_4428050651377667010_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ig_cache_key=Mzc3Nzg5NTI2MTg5Nzk4MDQ3OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjU0MHg5NjAuc2RyLkMzIn0%3D&_nc_ohc=-zVQr1MsZ3wQ7kNvwGC27rE&_nc_oc=AdmOqE7B_-TZWl-DJvCkec-kNwWZAYTsBG6mwoCsBU7_hq2yqeZsi2Fu1HzITzN1K-A&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=HesAC3zoyePEEoU72Gbfag&oh=00_AfqKB2L5cDhNZoxYao_tEL_BEwF_zyDx_9ln0UGwS2EFyg&oe=697F600B',
    likes: 2847,
    comments: 89,
    icon: 'reel'
  },
  {
    id: 8,
    type: 'post',
    img: 'https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/611349168_18037830029737284_4726065286854707425_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzgwNzY5NTUyMzkwMjgxMzY1NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgxMi5zZHIuQzMifQ%3D%3D&_nc_ohc=Mfs073a9ZngQ7kNvwGN53ux&_nc_oc=AdmYXS18RMvvxWSIm7251SRD5EwW2LpRPNKic953jXjmyrqU1J7v18nRUyp12WADoIo&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=HesAC3zoyePEEoU72Gbfag&oh=00_AfqnG1RNv0ceZ-BdW3El0TOvssEjQ2IQ9BZjDsF-F9QGWg&oe=697F696E',
    likes: 3245,
    comments: 128,
    icon: 'slide'
  }
]

// HTML에 exploreGrid 이 부분을 해당 JS로 조작 (exploreGrid안에 게시물 카드를 넣겠다)
const exploreGrid = document.getElementById('exploreGrid')

// 게시물 HTML
exploreGrid.innerHTML = posts
  .map(post => {
    return `
      <div class="grid-item ${post.large ? 'large' : ''}" data-type="${post.type}" data-id="${post.id}">
        <!-- post 데이터 더미에 있는 img (썸네일 같은 것) -->
        <img src="${post.img}" alt="게시물">

        <!-- 게시물의 오른쪽 상단에 post, reel에 따라 해당 icon을 renderIcon에서 가져와 보여줌 -->
        ${renderIcon(post.icon)}

        <!-- 게시글에 호버 시 보여지는 하트와 댓글 -->
        <div class="overlay">
          <div class="stats">
            <span class="icon">
              ${likeIcon()}
              ${post.likes.toLocaleString()} <!-- 좋아요 수는 숫자가 100단위를 넘어가길래 toLocaleString 사용함 -->
            </span>
            <span class="icon">
              ${commentIcon()}
              ${post.comments} <!-- 댓글 수는 그리 크지 않기 때문에 사용하지 않음 -->
            </span>
          </div>
        </div>
      </div>
    `
  })
  .join('')

/* 아이콘 */
function renderIcon(type) {
  if (type === 'reel') {
    return `
      <div class="top-right-icon">
        <svg viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z"/>
        </svg>
      </div>
    `
  }

  return `
    <div class="top-right-icon">
      <svg viewBox="0 0 50 50">
        <path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"/>
      </svg>
    </div>
  `
}

function likeIcon() {
  return `
    <svg aria-label="좋아요" fill="currentColor" height="25" viewBox="0 0 24 24" width="25" stroke="currentColor" stroke-width="2" stroke-linejoin="round">
      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938Z"/>
    </svg>
  `
}

function commentIcon() {
  return `
    <svg aria-label="댓글 달기" fill="currentColor" height="25" viewBox="0 0 24 24" width="25">
      <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"/>
    </svg>
  `
}
