import axios from "axios";
import { SERVER_URL } from "../config";

export const getCooks = async fnc => {
  const res = await axios.get(`${SERVER_URL}/cooks`);
  fnc([...res.data]);
};

export const getCooksId = async (id, fnc) => {
  const res = await axios.get(`${SERVER_URL}/cooks/${id}`);
  console.log(res.data);
  fnc(res.data.name);
  return res.data;
};

export const postCooks = async (obj, fnc) => {
  const res = await axios.post(`${SERVER_URL}/cooks`, obj);
  console.log(res.data);
  fnc("성공적으로 추가되었습니다!");
};
