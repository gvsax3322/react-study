import React from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const ReadPage = () => {
  // 패스로 이동하기
  const navigate = useNavigate();
  // params 알아내기
  const { tno } = useParams();

  // 쿼리 알아내기
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  // 현재 목록의 페이지 번호
  const page = urlSearchParams.get("page")
    ? parseInt(urlSearchParams.get("page"))
    : 1;

  // 페이지당 보여줄 개수
  const size = urlSearchParams.get("size")
    ? parseInt(urlSearchParams.get("size"))
    : 10;

  // 쿼리스트링 만들기
  const queryStr = createSearchParams({ page, size }).toString();

  const handleClickModify = () => {
    console.log("수정하기 이동");
    navigate({ pathname: `/todo/modify/${tno}`, search: queryStr });
  };
  const handleClickList = () => {
    console.log("목록으로 이동");
    navigate({ pathname: `/todo/list`, search: queryStr });
  };

  return (
    <div>
      읽기 화면 {tno}
      <div>
        <button onClick={() => handleClickModify()}>수정하기</button>
        <button onClick={() => handleClickList()}>목록보기</button>
      </div>
    </div>
  );
};

export default ReadPage;
