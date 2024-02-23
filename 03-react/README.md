# S100-Registry system Page

- s-100의 registry 의 api를 받아와 페이지에 보여주는 프로젝트입니다.
- 개발환경 : `react 18.2.0`, `node 20.11.1`
## 디렉토리 구성

```json
📁 src
ㄴ App.js
ㄴ index.js
ㄴ 📁 S100_Registry
  ㄴ api.js
  ㄴ Register.js
  ㄴ Detail.js
```

- index.js는 프로젝트 시작점 파일이며, App.js를 렌더링합니다.
- App.js는 모든 컴포넌트들의 루트 컴포넌트이며, 이 곳에서 페이지들을 관리합니다.
- api.js 는 각 컴포넌트에서 사용하는 api들을 모아놓은 파일입니다.
- Register.js 는 아이템 리스트를 받아와 보여주는 컴포넌트 입니다.
- Detail.js는 아이템 각각의 상세정보를 보여주는 컴포넌트입니다.

## 실행방법

`\\front-end` 경로에서 다음의 명령어를 실행합니다.

```json
// 초기 세팅
npm install
// 프로젝트 시작
npm start
```

## 페이지 미리보기

- register page
![](../img/register-page.PNG)

- detail page
![](../img/detail-page.PNG)