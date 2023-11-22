# React 공부하기

## 6. 총복습

### 6.1 컴포넌트 HTML 구성

### 6.2 컴포넌트 CSS 구성

```js
import React from "react";
import styled from "@emotion/styled";
// 타이틀 콤포넌트
const Title = props => {
  return <h1>{props.children}</h1>;
};
// 입력창 콤포넌트
const Input = () => {
  return <div>입력창</div>;
};
// 목록 콤포넌트
const List = () => {
  return <div>목록</div>;
};

const App = () => {
  const TodoApp = styled.div`
    position: relative;
    display: block;
    max-width: 760px;
    min-width: 480px;
    margin: 50px auto;
    background: skyblue;
    text-align: center;
  `;
  return (
    <TodoApp>
      <Title>오늘 할일 샘플</Title>
      <Input />
      <List />
    </TodoApp>
  );
};

export default App;
```

### 6.3 컴포넌트 state 구성

### 6.4 컴포넌트 props 구성

```js
<Title today="수요일" myname="정화섭" month={11} day={22}>
  오늘 할일 샘플
</Title>
```

```js
// 타이틀 콤포넌트
const Title = function (props) {
  console.log(props);
  return (
    <h1>
      {props.month}월{props.day}일 {props.myname} {props.today} {props.children}
    </h1>
  );
};
export default Title;
```

```js
import React from "react";
import styled from "@emotion/styled";
import Title from "./components/Title";
import Input from "./components/Input";
import List from "./components/List";

const App = () => {
  const TodoApp = styled.div`
    position: relative;
    display: block;
    max-width: 760px;
    min-width: 480px;
    margin: 50px auto;
    background: skyblue;
    text-align: center;
  `;

  const showMessage = () => {
    alert("안녕하세요. 퐛팅");
  };
  const sayHi = message => {
    alert(`당신의 인사는 ${message}이군요`);
  };
  return (
    <TodoApp>
      <Title
        today="수요일"
        myname="정화섭"
        month={11}
        day={22}
        say={showMessage}
        gogo={sayHi}
      >
        오늘 할일 샘플
      </Title>
      <Input />
      <List />
    </TodoApp>
  );
};

export default App;
```

```js
// 타이틀 콤포넌트
const Title = function (props) {
  console.log(props);
  return (
    <h1 onClick={() => props.gogo("반갑지롱!!!")}>
      {props.month}월{props.day}일 {props.myname} {props.today} {props.children}
    </h1>
  );
};
export default Title;
```

```js
// 타이틀 콤포넌트
const Title = function ({ month, day, myname, gogo, say, today, children }) {
  //   console.log(props);
  return (
    <h1 onClick={() => gogo("반갑지롱!!!")}>
      {month}월{day}일 {myname} {today} {children}
    </h1>
  );
};
export default Title;
```

### 6.5 컴포넌트 event 구성

### 6.6 컴포넌트 출력 갱신 구성
