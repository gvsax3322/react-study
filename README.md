# Redux 이해

- http://localhost:3000/rd

## 1. props 의 이해

- 데이터만 전달
- 함수전달

## 2. props를 Redux 교체

`npm install redux`
`npm install react-redux`

- 데이터만 전달 : useSelector()
- 함수전달 : useDispatcher()

```js
import React, { useState } from "react";
import "./style.css";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

// 컴포넌트 들을 반드시 외부 파일로 만드는 건 아닙니다.
// 컴포넌트 복잡하니까 외부파일로 생성
const 큰아버지 = () => {
  const money = useSelector(state => state.money);

  const dispatch = useDispatch();
  const handleClick = () => {
    if (money > 0) {
      dispatch({ type: "수입", payload: 5 });
    } else {
      dispatch({ type: "꺼져", payload: "나쁜놈" });
    }
  };

  return (
    <div>
      <h3>큰아버지</h3>
      <button onClick={handleClick}>수입을 만들었어요.</button>
      <p>
        <strong>돈</strong>
      </p>

      <큰아버지아들1 />
      <큰아버지아들2 />
    </div>
  );
};
const 큰아버지아들1 = () => {
  return (
    <div>
      <h4>큰아버지아들1</h4>
      <p>
        <strong>돈</strong>
      </p>
    </div>
  );
};
const 큰아버지아들2 = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: "지출", payload: -50 });
  };

  const name = useSelector(state => state.name);

  return (
    <div>
      <h4>{name} 의 자손인 큰아버지아들2</h4>
      <button onClick={handleClick}>Store 의 내용을 수정합니다.</button>
      <p>
        <strong>돈</strong>
      </p>
    </div>
  );
};
const 작은아버지 = () => {
  const 돈 = useSelector(state => state.money);
  return (
    <div>
      <h3>작은아버지</h3>
      <p>
        <strong>{돈}</strong>
      </p>
      <작은아버지딸 />
    </div>
  );
};
const 작은아버지딸 = () => {
  return (
    <div>
      <h4>작은아버지딸</h4>
      <p>
        <strong>돈</strong>
      </p>
    </div>
  );
};
const 아버지 = () => {
  return (
    <div>
      <h3>아버지</h3>
      <p>
        <strong>돈</strong>
      </p>
      <아버지아들 />
    </div>
  );
};
const 아버지아들 = () => {
  return (
    <div>
      <h4>아버지아들</h4>
      <p>
        <strong>돈</strong>
      </p>
    </div>
  );
};

const Main = () => {
  const [money, setMoney] = useState(100);

  // 2. reducer 만들기
  // 보통 store 보관된 값을 읽거나 변경할때 실행되는 함수 정의
  // 값을 읽을 때는 useSelector () 이용
  // 값을 변경할 때는 dispatch() 를 이용합니다.
  const reducer = (state, action) => {
    if (state === undefined) {
      // 초기값이 없으면
      return { money: 100, name: "홍길동" };
    }
    // 값 즉 store 에 보관된 값을 변화시킬 수 있다.
    switch (action.type) {
      case "지출":
        return { ...state, money: state.money + action.payload };
      case "수입":
        return { ...state, money: state.money + action.payload };
      case "꺼져":
        return { ...state, name: action.payload };
      default:
        return state;
    }
  };

  // 1. 리액트 앱 전체에서 공유할 저장소 생성
  //   reducer : 기능을 넣어준다.
  const store = createStore(reducer);

  const ggg = useSelector(state => state.money);
  return (
    <div>
      <div>
        <h1>
          할아버지 <strong>{ggg}돈</strong> 억
        </h1>

        <Provider store={store}>
          <div className="family">
            <h2>가족</h2>

            <큰아버지 />

            <작은아버지 />

            <아버지 />
          </div>
        </Provider>
      </div>
    </div>
  );
};

export default Main;
```

## 3. Redux 작성 순서 적용

```txt
  1. Redux 초기화 state
    const initialState = {}

  2. Reducer 함수
    const reducer = (state, action) {}

  3. Store 생성
    const store = createStore(리듀서, 초기값, 개발자도구)​

  4. Provider 지정
    <Provider store={store}>
      .........  컴포넌트들
    </Provider>​

  5. 각 컴포넌트에서 값을 읽을 때
    const {} = useSlector( (state) => state);

  6. 각 컴포넌트에서 값을 업데이트 할때
    const dispatch = useDispatch();
```

```js
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";

// action.type 은 별도의 파일로 관리
// 절대로 중복되면 안됩니다.
const COUNT_UP = "count/up";
const COUNT_DOWN = "count/down";
const COUNT_INIT = "count/init";

const Main = () => {
  // 1. 초기값 생성
  const initState = { value: 0 };

  // 2. 리듀서 생성 :  state 보관 및 갱신

  const reducer = (state, action) => {
    switch (action.type) {
      case COUNT_UP:
        return { ...state, value: state.value + 1 };
      case COUNT_DOWN:
        return { ...state, value: state.value - 1 };
      case COUNT_INIT:
        return { ...state, value: 0 };
      default:
        return state;
    }
  };

  // 3단계 Store 생성
  const store = createStore(reducer, initState);

  return (
    <div>
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  );
};

const Counter = () => {
  // 5. store 의 state 를 읽어온다.
  // 매개변수로 전달되는 state 는 초기값 객체가 들어가 있다.
  // state 는 현재 { value:0 } 을 리턴한다.
  const { value } = useSelector(state => state);

  // 6. store 의 state 를 업데이트 한다.
  // 업데이트 시 액션을 만들어서 전달한다.(액션 크리에이터)
  const dispatch = useDispatch();
  const up = () => {
    // dispatch 는 reducer 함수로 액션을 전달한다.
    dispatch({ type: COUNT_UP });
  };
  const down = () => {
    // dispatch 는 reducer 함수로 액션을 전달한다.
    dispatch({ type: COUNT_DOWN });
  };
  const init = () => {
    dispatch({ type: COUNT_INIT, payload: 0 });
  };
  return (
    <>
      카운터
      <p>
        숫자가 나와요. <strong>{value}</strong>
      </p>
      <button onClick={up}>증가</button>
      <button onClick={down}>감소</button>
      <button onClick={init}>초기화</button>
    </>
  );
};

export default Main;
```

## 4. Redux 내용별 파일 생성

- Counter 컴포넌트 분리
- src/pages/redux/components/Counter.js
