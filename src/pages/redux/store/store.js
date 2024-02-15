import { createStore } from "redux";
import { reducer } from "../reducer/reducer";
// 1. 초기값 생성
const initState = { value: 0 };
// 3단계 Store 생성
export const store = createStore(reducer, initState);
