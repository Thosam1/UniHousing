import { axiosClient } from "../RequestManager";
import { Date, Location } from "../typesAPI";

export const getPrivateProfile = (email: string, jwt_token: string) => {
  const body = JSON.stringify({
    email,
    jwt_token,
  });
  return axiosClient.post("account/get-private-profile", body);
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
  return axiosClient.post("account/change-profile-first-name", body);
};

export const changeProfileLastName = (user_id: string, jwt_token: string) => {
  const body = JSON.stringify({
    user_id,
    jwt_token,
  });
  return axiosClient.post("account/change-profile-last-name", body);
};

export const changeProfileAvatar = (user_id: string, jwt_token: string) => {
  const body = JSON.stringify({
    user_id,
    jwt_token,
  });
  return axiosClient.post("account/change-avatar", body);
};

export const deleteProfileAvatar = (user_id: string, jwt_token: string) => {
  const body = JSON.stringify({
    user_id,
    jwt_token,
  });
  return axiosClient.post("account/delete-avatar", body);
};

export const changeStatus = (
  user_id: string,
  jwt_token: string,
  status: string
) => {
  const body = JSON.stringify({
    user_id,
    jwt_token,
    status,
  });
  return axiosClient.post("account/change-status", body);
};

export const changeBio = (user_id: string, jwt_token: string, bio: string) => {
  const body = JSON.stringify({
    user_id,
    jwt_token,
    bio,
  });
  return axiosClient.post("account/change-bio", body);
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
  return axiosClient.post("account/change-password", body);
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
  return axiosClient.post("account/close-account", body);
};
