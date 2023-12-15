import React, { useEffect, useState } from "react";
import { deleteMeal, getMeal, postMeal, putMeal } from "../api/meal/meal_api";

const Meal = () => {
  // jsx 에 변수 에 출력할 변수
  // js 용 변수 에 출력할 변수
  const [data, setData] = useState([]);

  // 이벤ㅌ트 처리 함수
  const handleClickGet = () => {
    getMeal(1, 10, 0, setData);
  };

  const postResult = num => {
    if (num === 1) {
      alert("정상");
    } else if (num === -100) {
      alert("서버에러");
    } else {
      alert("내용체크");
    }
  };
  const handleClickPost = () => {
    const obj = {
      title: "vkvmapa",
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
            <p>imeal: {item.imeal}</p>
            <p>title: {item.title}</p>
            <p>review: {item.review}</p>
            <p>reatedAt: {item.reatedAt}</p>
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
