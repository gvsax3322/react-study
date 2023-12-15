import axios from "axios";
import { SERVER_URL } from "../config";

export const getTodos = async fnc => {
  const res = await axios.get(`${SERVER_URL}/todos`);
  fnc([...res.data]);
};

export const getTodosId = async (id, fnc) => {
  const res = await axios.get(`${SERVER_URL}/todos${id}`);
  console.log(res.data);
  fnc(res.data.title);
  return res.data;
};

export const postTodos = async (obj, fnc) => {
  const res = await axios.post(`${SERVER_URL}/todos`, obj);
  console.log(res.data);
  fnc("성공적으로 추가되었습니다!");
};
