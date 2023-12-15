import axios from "axios";
import { SERVER_URL } from "../config";

// 내용 가져오기
export const getMeal = async (page, row_count, bookmark, fn) => {
  try {
    const res = await axios.get(
      `${SERVER_URL}/api/meal?page=${page}&row_count=${row_count}&bookmark=${bookmark}`,
    );
    fn(res.data);
  } catch (error) {
    alert(`${error} 가 발생했습니다. 데모데이터 쓸게요`);
    const demo = await axios.get("getmeal.json");
    fn(demo.data);
  }
};
// 내용 추가하기
export const postMeal = async (obj, postResult) => {
  try {
    const res = await axios.post(`${SERVER_URL}/api/meal`, obj);
    postResult(res.data.result);
  } catch (error) {
    postResult(-100);
  }
};
// 내용 업데이트하기
export const putMeal = async () => {
  const res = await axios.put(`${SERVER_URL}/api/meal`);
  console.log(res.data);
};
// 내용 삭제하기
export const deleteMeal = async () => {
  const res = await axios.delete(`${SERVER_URL}/api/meal`);
  console.log(res.data);
};
