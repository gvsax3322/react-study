import React from "react";
import { Badge, Calendar } from "antd";
// 외부 데이터 가져오기
// - 일별데이터
const getListData = value => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
        {
          type: "error",
          content: "This is error event.",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
        },
        {
          type: "success",
          content: "This is very long usual event......",
        },
        {
          type: "error",
          content: "This is error event 1.",
        },
        {
          type: "error",
          content: "This is error event 2.",
        },
        {
          type: "error",
          content: "This is error event 3.",
        },
        {
          type: "error",
          content: "This is error event 4.",
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const CalendarApp = () => {
  // 자바스크립트 자리
  // 일별 자료 출력하기
  const dateCellRender = value => {
    console.log("dateCellRender 일별자료 : jsx 만듦", value);
    const listData = getListData(value);
    console.log("listData  출력할 자료", listData);
    // 아래에서 Cell 에 출력할 자료를 만든다.
    return (
      <ul className="events">
        {/* 배열 반복 JSX 만들기 : map */}
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  // 각각의 셀의 날짜를 보고, 정보를 출력하는 역할
  const cellRender = (current, info) => {
    console.log("cellRender 칸 채우기 : ", current, info);
    if (info.type === "date") {
      return dateCellRender(current);
    }
    return info.originNode;
  };

  return (
    <div>
      <h1>캘린더 연습</h1>
      <div style={{ width: "80%", margin: "0 auto" }}>
        {/* 캘린더 컴포넌트가 그려질때 */}
        <Calendar cellRender={() => cellRender()} />
      </div>
    </div>
  );
};
export default CalendarApp;
