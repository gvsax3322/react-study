import axios from "axios";
import { SERVER_URL } from "../config";

export const getPosts = () => {
  axios
    .get(`${SERVER_URL}/posts`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getPostsId = id => {
  axios
    .get(`${SERVER_URL}/posts/${id}`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
};

export const postPosts = obj => {
  axios
    .post(`${SERVER_URL}/posts`, obj)
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
};
