// const BASE_URL = 'https://cors-anywhere.herokuapp.com/http://localhost:5000';
const BASE_URL = "http://192.168.0.107:8080";

const endpoints = {
  BASE_URL,
  // Auth
  LOGIN: BASE_URL + "/auth/login",
  REGISTER: BASE_URL + "/auth/register",
  // User
  GET_ALL: BASE_URL + "/user",
  GET_PROFILE: BASE_URL + "/user/profile",
  // Messenger
  GET_CHATS: BASE_URL + "/messenger/chats",
  GET_CHAT: BASE_URL + "/messenger/chat",
  CREATE_CHAT: BASE_URL + "/messenger/chats",
  CREATE_MESSAGE: BASE_URL + "/messenger/chat",
};

export default endpoints;
