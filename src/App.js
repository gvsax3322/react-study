import React, { useEffect, useState } from "react";
import { getCooks, getCooksId, postCooks } from "./api/cooks/cooks_api";
import { getTodos, getTodosId, postTodos } from "./api/todos/todos_api";
import { getPosts, getPostsId, postPosts } from "./api/posts/posts_api";

const App = () => {
  const [cooks, setCooks] = useState([]);
  const [todos, setTodos] = useState([]);
  const getWaitCooks = () => {
    getCooks(setCooks);
  };

  const getWaitTodos = () => {
    getTodos(setTodos);
  };

  useEffect(() => {
    getWaitCooks();
    getWaitTodos;
    getPosts();
  }, []);

  const [todayCook, setTodayCook] = useState("");
  const [addCook, setAddCook] = useState("요리를 추가해주세요");

  const [todayTodok, setTodayTodo] = useState("");
  const [addTodo, setAddTodo] = useState("할일를 추가해주세요");

  return (
    <div>
      <p>요리 3번 출력 : {todayCook} </p>
      <button onClick={() => getCooksId(3, setTodayCook)}>요리 3번 줘</button>
      <p>할일 1번 출력: {todayTodok}</p>
      <button onClick={() => getTodosId(1, setTodayTodo)}>할일 1번 줘</button>
      <p>포스트 2번 출력:</p>
      <button onClick={() => getPostsId(2)}>포스트 2번 줘</button>
      <hr />
      <button
        onClick={() => {
          postCooks({ hit: false, category: "면", name: "국수" }, setAddCook);
        }}
      >
        요리추가
      </button>
      <hr />
      <p>요리추가 결과:{addCook} </p>
      <button
        onClick={() => {
          postTodos(
            {
              title: "타이틀",
              content: "내용",
              mood: 1,
              date: "2023-12-08",
              complete: false,
            },
            setAddTodo,
          );
        }}
      >
        할일추가
      </button>
      <p>할일추가 결과: {addTodo}</p>
      <button
        onClick={() => {
          postPosts({
            title: "json-server",
            author: "typicode",
          });
        }}
      >
        포스트추가
      </button>
      <p>포스트추가 결과: </p>
      <hr />
      <div>
        <h2>요리 전체 자료 출력(axios의 get 활용)</h2>

        <ul>
          {cooks.map((item, idx) => {
            return <li key={idx}>{item.id}ddd</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
