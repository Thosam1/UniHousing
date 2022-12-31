import axios from "axios";
import { axiosClient, BASE_URL, JSON_TYPE } from "../RequestManager";

export const getPrivateProfile = () => {
  // return axios.create({
  //   baseURL: BASE_URL,
  //   headers: {
  //     "Content-Type": JSON_TYPE,
  //     Authorization: `Bearer ${localStorage.getItem("accessToken")}` // problem because of const, doesn't update after signIn !
  //   },
  // }).post("users/me").then((res) => res.data).catch(() => { return null; });
  return axiosClient.get("users/me", {
    withCredentials: true,
  }) // .then((res) => res.data).catch(() => { return null; }); // todo check if works or not
};

export const getPublicProfile = (user_id: string) => {
  const body = JSON.stringify({
    user_id,
  });
  return axiosClient.post("post/get-public-profile", body);
};


export const changeProfileAvatar = (user_id: string, jwt_token: string) => {
  const body = JSON.stringify({
    user_id,
  });
  return axiosClient.post("users/change-avatar", body);
};

export const editProfile = (
payload : {
  id: string,
  newFirstName: string,
  newLastName: string,
  newStatus: string,
  newBio: string
}
) => {
  return axiosClient.post("users/me/edit-profile", payload);
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
