# mini-instagram-clone

## 개요
HTML, CSS, JavaScript를 활용하여 인스타그램 웹 서비스의 UI 구조를 분석하고 클론하는 미니 프로젝트입니다. 실제 인스타그램 웹 화면을 참고하여 레이아웃을 분석하고 공통 컴포넌트와 페이지별 UI 요소를 구분하여 화면을 설계합니다.

## 프로젝트 목표

1. 인스타그램 UI 구조 분석과 화면 구성 요소 분해
2. HTML을 활용한 시멘틱 구조 설계
3. CSS를 활용한 레이아웃 구성 및 스타일링
4. 반응형 웹 구현
5. 브라우저 렌더링 이해
6. 공통 컴포넌트 설계와 재사용
7. 동적 UI 구현

## 페이지별 역할 분담

각 팀원은 인스타그램의 페이지를 구분지어 개발을 진행합니다.

|페이지|담당영역|
|---|---|
|메인 페이지|피드 레이아웃, 스토리 UI, 상단 헤더, 게시물 카드|
|프로필 페이지|사용자 정보, 게시물 그리드, 스토리 하이라이트|
|탐색 페이지|게시물과 릴스 그리드 UI|
|릴스 페이지|릴스 영상 UI, 좋아요/댓글/공유 레이아웃|
|메세지 페이지|DM 목록 UI, 채팅 레이아웃|

|공통 컴포넌트|담당영역|
|--|--|
|사이드바 & 하단바|홈, 릴스, 메세지, 검색, 탐색, 좋아요 등 네비게이션 바|
|메세지 버튼|DM 목록 UI, 채팅 레이아웃|

## 개발 방식

- 각 페이지는 개별 브랜치에서 개발합니다.
- 반응형 웹 구조를 이해하기 위해 데스크톱 뷰포트와 모바일 뷰포트로 나눠 개발합니다.
- 공통 컴포넌트는 별도로 관리합니다.
- 개발 완료 후 release 브랜치에서 QA를 진행합니다.

### WEB VIEW

<img width="1512" height="847" alt="릴스2" src="https://github.com/user-attachments/assets/5c265aab-3324-4209-b1f3-b941d9b380d8" />

<img width="1512" height="864" alt="마이페이지1" src="https://github.com/user-attachments/assets/7e56571a-f1ad-4142-bba6-adccd002bb69" />

<img width="1512" height="861" alt="메인1" src="https://github.com/user-attachments/assets/1af175a7-c875-4a8a-9c79-4901859836c0" />

<img width="1512" height="863" alt="탐색2" src="https://github.com/user-attachments/assets/6f79301b-245a-4ece-a52a-f6a837412474" />

<img width="3024" height="1578" alt="127 0 0 1_5500_message_message html" src="https://github.com/user-attachments/assets/1ae479e6-35ed-44df-923b-da6fd48f0e96" />


### MOBILE VIEW

<img width="751" height="863" alt="릴스1" src="https://github.com/user-attachments/assets/49a0bbea-5d0c-4a0e-a229-7fb204ae1a07" />

<img width="743" height="853" alt="마이1" src="https://github.com/user-attachments/assets/073cb874-c0c9-447b-a83a-fea00025ace7" />

<img width="739" height="864" alt="메인2" src="https://github.com/user-attachments/assets/43cb861e-d6c5-451d-aea5-409d41c28e3a" />

<img width="724" height="866" alt="탐색1" src="https://github.com/user-attachments/assets/46ec685d-c336-4b4a-84fc-c29e15cedddc" />

<img width="753" height="864" alt="채팅1" src="https://github.com/user-attachments/assets/6d20fe35-258f-4992-9130-888a19c5e866" />




