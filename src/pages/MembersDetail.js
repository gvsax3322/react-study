import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MembersDetail = ({ member }) => {
  // 주소뒤에 기재된 내용을 알아내야 한다.
  // members/정화섭
  // 정화섭 만을 알아내야한다.
  //   const param = useParams();
  // console.log(param);
  const { id } = useParams();

  // 배열에서 요소를 찾으면 for 문 중지
  const findData = member.find(function (item) {
    return item.name === id;
  });
  //   const findData2 = member.find(item => {
  //     return item.name === id;
  //   });
  //   const findData3 = member.find(item => item.name === id);

  console.log(findData);

  return (
    <div>
      <h1>
        {id}님의 상세정보 {findData?.hi}
      </h1>
      <div>
        {findData.name} / {findData.level} / {findData.img} / {findData.part}
      </div>
    </div>
  );
};

export default MembersDetail;
