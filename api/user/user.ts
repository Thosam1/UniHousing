import axios from "axios";
import { axiosClient, axiosPrivate, BASE_URL, JSON_TYPE } from "../RequestManager";

export const getPrivateProfile = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": JSON_TYPE,
      Authorization: `Bearer ${localStorage.getItem("accessToken")}` // problem because of const, doesn't update after signIn !
    },
  }).post("users/me").then((res) => res.data).catch(() => { return null; });
};

export const getPublicProfile = (user_id: string) => {
  const body = JSON.stringify({
    user_id,
  });
  return axiosClient.post("post/get-public-profile", body);
};

export const changeProfileFirstName = (user_id: string, jwt_token: string) => {
  const body = JSON.stringify({
    user_id,
    jwt_token,
  });
  return axiosClient.post("user/change-first-name", body);
};

export const changeProfileLastName = (user_id: string, jwt_token: string) => {
  const body = JSON.stringify({
    user_id,
    jwt_token,
  });
  return axiosClient.post("user/change-last-name", body);
};

export const changeProfileAvatar = (user_id: string, jwt_token: string) => {
  const body = JSON.stringify({
    user_id,
  });
  return axiosClient.post("user/change-avatar", body);
};

export const changeStatus = (
  user_id: string,
  jwt_token: string,
  status: string
) => {
  const body = JSON.stringify({
    user_id,
    status,
  });
  return axiosClient.post("user/change-status", body);
};

export const changeBio = (user_id: string, jwt_token: string, bio: string) => {
  const body = JSON.stringify({
    user_id,
    bio,
  });
  return axiosClient.post("user/change-bio", body);
};

export const changePassword = (
  user_id: string,
  jwt_token: string,
  currentPassword: string,
  newPassword: string
) => {
  const body = JSON.stringify({
    user_id,
    jwt_token,
    currentPassword,
    newPassword,
  });
  // todo security reason, would be better to encrypt the password before sending it
  return axiosClient.post("users/change-password", body);
};

export const closeAccount = (
  user_id: string,
  jwt_token: string,
  message: string
) => {
  const body = JSON.stringify({
    user_id,
    jwt_token,
    message,
  });
  return axiosClient.post("users/close-account", body);
};
