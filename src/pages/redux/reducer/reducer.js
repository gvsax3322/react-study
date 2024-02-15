// 2. 리듀서 생성 :  state 보관 및 갱신
import { COUNT_DOWN, COUNT_INIT, COUNT_UP } from "../type/actionType";

export const reducer = (state, action) => {
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
