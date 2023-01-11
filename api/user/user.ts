import axios from "axios";
import { ImagePickerAsset } from "expo-image-picker/build/ImagePicker.types";
import {
  axiosClient,
  axiosClientImages,
  BASE_URL,
  JSON_TYPE,
} from "../RequestManager";

export const getPrivateProfile = () => {
  return axiosClient.get("users/me", {
    withCredentials: true,
  });
};

export const getOwnedPosts = (id: string) => {
  // user id
  const body = JSON.stringify({ id });
  return axiosClient.post("users/me/owned-posts", body, {
    withCredentials: true,
  });
};

export const getSavedPosts = (id: string) => {
  // user id
  const body = JSON.stringify({ id });
  return axiosClient.post("users/me/saved-posts", body, {
    withCredentials: true,
  });
};

export const getPublicProfile = (user_id: string) => {
  const body = JSON.stringify({
    user_id,
  });
  return axiosClient.post("post/get-public-profile", body);
};

export const changeProfileAvatar = (user_id: string) => {
  const body = JSON.stringify({
    user_id,
  });
  return axiosClient.post("users/change-avatar", body);
};

export const editProfile = (
  id: string,
  newFirstName: string,
  newLastName: string,
  newStatus: string,
  newBio: string
) => {
  const body = JSON.stringify({
    id,
    newFirstName,
    newLastName,
    newStatus,
    newBio,
  });
  return axiosClient.post("users/me/edit-profile", body, {
    withCredentials: true,
  });
};

export const editAvatar = (
  id: string,
  avatar: ImagePickerAsset // null if no need to change avatar
) => {

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = avatar.uri;
    let filename = localUri.split("/").pop() as string;

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append(
      "avatar", // must be same as in database in the route -> uploads.single("avatar")
      JSON.parse(JSON.stringify({ uri: localUri, name: filename, type }))
    // {
    //   name: new Date() + '_profile',
    //   uri: localUri,
    //   type: type,
    // }
    
      );

    console.log(formData);

    // id can be infered from token in database
    return axiosClientImages.post("users/me/edit-profile/avatar", formData, {
      withCredentials: true,
    });
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
  return axiosClient.post("users/change-password", body, {
    withCredentials: true,
  });
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
  return axiosClient.post("users/close-account", body, {
    withCredentials: true,
  });
};
