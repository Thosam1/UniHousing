import axios from "axios";
import { ImagePickerAsset } from "expo-image-picker/build/ImagePicker.types";
import { axiosClient, axiosClientImages, BASE_URL, JSON_TYPE } from "../RequestManager";

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
  }); // .then((res) => res.data).catch(() => { return null; }); // todo check if works or not
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
  id: string,
  avatar: ImagePickerAsset | null, // null if no need to change avatar
  newFirstName: string,
  newLastName: string,
  newStatus: string,
  newBio: string
) => {
  // uploading user avatar if given
  if (avatar) {

    console.log("avatar is not null")

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
      "image",
      JSON.parse(JSON.stringify({ uri: localUri, name: filename, type }))
    );

    console.log(formData);

    axiosClientImages.post("users/me/edit-profile/avatar", formData, {
      withCredentials: true,
    });

    console.log("SENT REQUEST FOR AVATAR")

  }

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
