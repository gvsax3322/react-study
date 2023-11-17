# React 공부하기

## 3. 컴포넌트 html의 이해

- 컴포넌트의 용도 1 은 html 을 출력한다.
- 컴포넌트의 용도 2 은 여러번 재사용.
- 컴포넌트의 용도 3 은 유지보수 편리.
- 컴포넌트는 관례상 파일로 생성.
- 컴포넌트는 반드시 파스칼케이스(대문자)로 파일 및 코드 생성.

### 추가 : React 개발시 편의 도구

- React 크롬 [DevTools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)

- VSCode React Plugin (ES7+ React/Redux/React-Native snippets
  ) 설치

### 2. 리액트 작업 (CSS 작업)

#### 2.1. 파일 : link css 방식

- 최초에는 태그를 초기화하는 과정이 필수
- [normalize.css](https://necolas.github.io/normalize.css/) 또는 [reset.css](https://meyerweb.com/eric/tools/css/reset/) 를 활용

  - 만약 html 폴더에 파일이 있는 경우 link 를 활용

  ```html
  <!DOCTYPE html>
  <html lang="ko">
    <head>
     ...
      <title>리액트 공부</title>
      <link rel="stylesheet" href="normalize.css" />

    </head>
    <body>
     ...
  </html>
  ```

  - 만약에 src/styles 폴더에 파일이 있는 경우 import 를 활용

  ```js
  // src/index.js
  import React from "react";
  import ReactDOM from "react-dom/client";
  import App from "./App";
  // normalize.css 파일 배치
  import "./styles/normalize.css";

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  ```

  - src/styles/index.css 에서 프로젝트의 css 초기화

  ```js
  // src/index.js
  import React from "react";
  import ReactDOM from "react-dom/client";
  import App from "./App";
  // normalize.css 파일 배치
  import "./styles/normalize.css";
  // index.css 파일 배치
  import "./styles/index.css";
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  ```

  /src/styles/index.css

  ```css
  /* css 에서 전역 변수  */
  :root {
    --brand-color: #08739a;
    --border-color: #078064;
    --base-background-color: #eee;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline-style: none;
  }
  ul,
  li {
    list-style: none;
  }
  a {
    color: #000;
    text-decoration: none;
  }
  img {
    vertical-align: middle;
    border: 0;
  }
  html {
    font-size: 10px;
  }
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 1rem;
    color: #000;
    line-height: 1.25;
    letter-spacing: -0.25px;
    word-break: break-all;
    /* 변수 활용 */
    background-color: var(--base-background-color);
  }
  ```

  ```js
  // src/pages/Main.js
  import Footer from "../components/Footer";
  import Header from "../components/Header";
  import "../styles/main.css";

  const Main = () => {
    return (
      <div className="wrap">
        {/* 상단 내용 고정 */}
        <Header>
          <a href="#">로고</a>
          <nav>
            <ul>
              <li>
                <a href="#">Menu-1</a>
                <ul>
                  <li>
                    <a href="#">SubMenu-1</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-2</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-3</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-4</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Menu-2</a>
                <ul>
                  <li>
                    <a href="#">SubMenu-1</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-2</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-3</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-4</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Menu-3</a>
                <ul>
                  <li>
                    <a href="#">SubMenu-1</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-2</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-3</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-4</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Menu-4</a>
                <ul>
                  <li>
                    <a href="#">SubMenu-1</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-2</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-3</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-4</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </Header>
        {/* 내용은 자주 변함 */}
        <main>
          <section>
            <div>이미지슬라이드</div>
          </section>
          <section>
            <div>
              <div>
                <div>공지사항</div>
                <div>갤러리</div>
              </div>
              <div>배너</div>
              <div>바로가기</div>
            </div>
          </section>
        </main>
        {/* 하단 고정 */}
        <Footer>
          <div>
            <a href="#">로고</a>
          </div>
          <div>카피라이터</div>
          <div>
            <ul>
              <li>
                <a href="#">인스타그램</a>
              </li>
              <li>
                <a href="#">페이스북</a>
              </li>
              <li>
                <a href="#">카카오오픈채팅</a>
              </li>
              <li>
                <a href="#">네이버블러그</a>
              </li>
              <li>
                <a href="#">트위터(X)</a>
              </li>
            </ul>
          </div>
        </Footer>
      </div>
    );
  };

  export default Main;
  ```

  src/styles/main.css

  ```css
  .wrap {
    position: relative;
    display: block;
    width: 100%;
    max-width: 1240px;
    background: skyblue;
    margin: 0 auto;
  }
  /* 반응형 기초 */
  @media screen and (max-width: 1280px) {
    .wrap {
      width: 90%;
    }
  }

  .main {
    position: relative;
    display: block;
    background: hotpink;
  }
  .slide {
    position: relative;
    display: block;
    height: 200px;
    background: orange;
  }
  .community {
    position: relative;
    display: block;
    background: rgb(18, 157, 176);
  }

  .community .inner {
    display: flex;
  }

  @media screen and (max-width: 640px) {
    .community {
      height: auto;
    }
    .community .inner {
      display: block;
    }
  }

  .community-notice {
    width: 33%;
    min-height: 300px;
    background: rgba(0, 0, 0, 0.5);
  }
  .community-banner {
    width: 33%;
    min-height: 300px;
    background: rgba(0, 0, 0, 0.1);
  }
  .community-link {
    width: 34%;
    min-height: 300px;
    background: rgba(0, 0, 0, 0.7);
  }

  @media screen and (max-width: 640px) {
    .community-notice {
      width: 100%;
    }
    .community-banner {
      width: 100%;
    }
    .community-link {
      width: 100%;
    }
  }
  ```

#### 2.2. 파일 : link .scss 방식

#### 2.3. 파일(리액트 전용) : link moudle.css 방식

#### 2.4. js 형식 : inline {} 방식

#### 2.5. js 형식 : 변수 {} 방식

#### 2.6. CSS-in-JS 형식 : emotion.js 방식
