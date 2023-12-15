# React

## 10. axios 와 json-server 설치하기

### 1. json-server

- [json-server](https://www.npmjs.com/package/json-server)
- [블로그 자료](https://poiemaweb.com/json-server)

#### 1.1. json-server 서버 구축하기

- /server 폴더 만들어준다. (리액트 아님, 서버연습용 폴더)
- /server 폴더로 이동하기 (터미널에 입력)
  : Change Directory 폴더명
  : `cd server`
- Node.js 프로젝트 생성
  : `npm init -y`
- jsonserver 설치하기
  : `npm install -g json-server`
- /server/db.json 파일생성하기

```json
{
  "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "typicode" }
}
```

- package.json 설정

```josn
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "json-server --host 192.168.0.66 --watch db.json --port 5000"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

- 서버 실행하기
  : `npm start`

### 2. 리액트 axios 작업

- [axios](https://axios-http.com/kr/docs/intro)
- 설치하기
  : `npm install axios`
- api 폴더 구조
  : GET, DELETE, PUT, FETCH, POST 에 연결할 주소
  : 백엔드와 연동할 js 는 별도로 관리하기를 추천합니다.
  : /src/api 폴더를 만들기를 추천합니다.
  : /src/api/config.js 파일을 만들기를 추천합니다.

### 3. CORS 권한 설정 (주소가 다른 경우 테스트시 셋팅)

- 2 가지 중에 테스트 후 1가지를 선택해서 적용

#### 3.1. Proxy 미들웨어 설치(주소를 변환)[https://velog.io/@iberis/React-Proxy]

- 상황에 따라서 다르므로 그린 컴퓨터 프로젝트는 반영이 안된다.
- `npm install http-proxy-middleware`
- /src/setupProxy.js 파일 생성

```js
/* eslint-disable no-undef */
// setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", //proxy가 필요한 path prameter를 입력합니다.
    createProxyMiddleware({
      target: "http://localhost:5000", //타겟이 되는 api url를 입력합니다.
      changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
    }),
  );
};
```

#### 3.2. package.json 에 추가한다.

- `"proxy": "http://192.168.0.166:8080"`
- 그린컴퓨터 프로젝트는 위를 적용한다.
- /src/setupProxy.js 는 제거한다.

#### 3.3. Proxy 를 사용하므로 주소도 필요없다.

- api 를 호출하면 자동으로
- http://192.168.0.166:8080/api 가 만들어진다.
- 그린컴퓨터 프로젝트는 위를 적용한다.

```json
{
  "name": "react_1",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@ant-design/icons": "^5.2.6",
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "antd": "^5.12.1",
    "axios": "^1.6.2",
    "dayjs": "^1.11.10",
    "http-proxy-middleware": "^2.0.6",
    "moment": "^2.29.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router": "^6.20.0",
    "react-router-dom": "^6.20.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "eslint": "^8.54.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-react": "^7.33.2",
    "sass": "^1.69.5"
  },
  "proxy": "http://192.168.0.166:8080"
}
```

### 4. 활용

/api/config.js

```js
// export const SERVER_URL = "http://192.168.0.66:5000";
export const SERVER_URL = "";
```

/api/meal/meal_api.js

```js
import axios from "axios";
import { SERVER_URL } from "../config";

// 내용 가져오기
export const getMeal = async (page, row_count, bookmark, fn) => {
  // axios 를 사용하는 경우에는 언제든 에러가 발생할 수있다.
  // 반드시 try { 위험한 코드 } catch(error){} 를 사용해야한다.
  try {
    const url = `${SERVER_URL}/api/meal?page=${page}&row_count=${row_count}&bookmark=${bookmark}`;
    // console.log(url);
    const res = await axios.get(url);
    fn(res.data);
  } catch (error) {
    // 개발 중에만 활용
    // 실제 서비스에서는 경고창으로 마무리 하자.
    alert(`${error} 가 발생했습니다. 데모데이터 쓸게요`);

    // 데모 데이터를 이용해서 작업은 진행
    const demo = await axios.get("getmeal.json");
    fn(demo.data);
  }
};

// 내용 추가하기
export const postMeal = async (obj, postResult) => {
  try {
    const res = await axios.post(`${SERVER_URL}/api/meal`, obj);
    postResult(res.data.result);
    // 1. response 결과값에 따라서 적절한 안내창 출력
    // 2. 정상적으로 등록 안내창 띄우고, 목록창으로 이동.
  } catch (error) {
    console.log(error);
    postResult(-100);
    // 3. 서버가 문제가 있다.
  }
};
// 내용 업데이트하기
export const putMeal = async () => {
  const res = await axios.put(`${SERVER_URL}/api/meal`);
  console.log(res.data);
};
// 내용 삭제하기
export const deleteMeal = async () => {
  const res = await axios.delete(`${SERVER_URL}/api/meal`);
  console.log(res.data);
};
```

/src/pages/meal/Meal.js

```js
import React, { useState } from "react";
import {
  deleteMeal,
  getMeal,
  postMeal,
  putMeal,
} from "../../api/meal/meal_api";

const Meal = () => {
  // jsx 에 변수 에 출력할 변수
  // 새로고침 없이 바뀐 값 출력
  const [data, setData] = useState([]);

  // 이벤트 처리 함수
  const handleClickGet = () => {
    getMeal(1, 10, 0, setData);
  };

  // 등록시 처리할 함수
  const postResult = num => {
    // console.log("받아온 결과값: ", num);
    // alert(`받아온 결과값: ${num}`);
    if (num === 1) {
      alert("정상적으로 등록되었습니다.");
    } else if (num === -100) {
      alert("서버에러");
    } else {
      alert("입력 내용 항목 체크 필요");
    }
  };

  const handleClickPost = () => {
    const obj = {
      title: "프론트에서 등록 테스트 진행중.",
      ingredient: "빵, 상추, 팻티, 치즈, 토마토",
      recipe: "3분토스팅",
      review: "맛있게 먹었다. 강추",
      pics: [
        "https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/02/111057059.1.jpg",
        "https://newsimg.hankookilbo.com/cms/articlerelease/2021/04/29/62a1cda6-ec70-44a8-811c-fbc6300a18ed.png",
      ],
      tags: ["string"],
    };
    postMeal(obj, postResult);
  };
  const handleClickPut = () => {
    putMeal();
  };
  const handleClickDelete = () => {
    deleteMeal();
  };

  return (
    <div>
      <div>
        Meal Get 결과 :{" "}
        {data.map(item => (
          <div key={item.imeal}>
            <p>item.imeal : {item.imeal} </p>
            <p>item.title : {item.title} </p>
            <p>item.review : {item.review} </p>
            <p>item.createdAt : {item.createdAt} </p>
            <p>
              item.pics : <img src={item.pics} />
            </p>
            <p>item.tags : {item.tags} </p>
            <hr />
          </div>
        ))}
        <br />
      </div>
      <hr />
      <div>
        Meal Post 결과 :
        <br />
      </div>
      <hr />
      <div>
        Meal Put 결과 :
        <br />
      </div>
      <hr />
      <div>
        Meal Delete 결과 :
        <br />
      </div>
      <hr />
      <div>
        <button
          onClick={() => {
            handleClickGet();
          }}
        >
          Get
        </button>
        <button
          onClick={() => {
            handleClickPost();
          }}
        >
          Post
        </button>
        <button
          onClick={() => {
            handleClickPut();
          }}
        >
          Put
        </button>
        <button
          onClick={() => {
            handleClickDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Meal;
```
