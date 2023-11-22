import { useState } from "react";

// 목록 콤포넌트
const List = () => {
  const [data, setData] = useState([]);

  return (
    <div>
      <ul>
        {data.map(function (item, index) {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default List;
