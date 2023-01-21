import axios from "axios";
import { ImagePickerAsset } from "expo-image-picker/build/ImagePicker.types";
import {
  axiosClient,
  axiosClientImages,
  BASE_URL,
  JSON_TYPE,
} from "../RequestManager";
import * as FileSystem from 'expo-file-system';

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

export const getPublicProfile = (id: string) => {
  return axiosClient.get(`users/get-profile/${id}`);
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

  return FileSystem.uploadAsync(`${BASE_URL}users/me/edit-profile/avatar`, avatar.uri, {
    httpMethod: 'POST',
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: 'avatar'
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

function dataURItoBlob(dataURI: string) {
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg' });
}

