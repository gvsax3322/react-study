import { useDispatch, useSelector } from "react-redux";
import { COUNT_DOWN, COUNT_INIT, COUNT_UP } from "../type/actionType";
export const Counter = () => {
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
