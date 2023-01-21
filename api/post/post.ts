import { ImagePickerAsset } from "expo-image-picker";
import { axiosClient, BASE_URL } from "../RequestManager";
import { Date, Location } from "../typesAPI";
import * as FileSystem from 'expo-file-system';

// when creating a post
export const createPost = (
  user: string,
  title: string,
  city: string,
  country: string,
  startDate: string,
  endDate: string,
  description: string,
  price: string
) => {
  const body = JSON.stringify({
    user,
    title,
    city,
    country,
    startDate,
    endDate,
    description,
    price,
  });

  return axiosClient.post("post/create", body, { withCredentials: true });
};

export const editImages = (post_id: string, images: ImagePickerAsset[]) => {

  let lastResponse // : FileSystem.FileSystemUploadResult;
  if(images == null) return;

  try {
    images.map(async (image) => {
      lastResponse = await FileSystem.uploadAsync(`${BASE_URL}post/edit-images/${post_id}`, image.uri, {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'image'
      });
    })
  } catch(e) {
    console.log(e);
  }
  
  return lastResponse;
}

export const editPost = (input: {
  title: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
  price: string;
}, post_id: string) => {
  return axiosClient.post(`post/edit/${post_id}`, input, { withCredentials: true });
};

export const deletePost = (post_id: string) => {
  // from security perspective would be good to add a second factor authentification like a code to avoid attacks
  return axiosClient.delete(`post/delete/${post_id}`, { withCredentials: true });
};

export const getPost = (post_id: string) => {
  return axiosClient.get(`post/get/${post_id}`, { withCredentials: true });
};


// // when individually clicked on
// export const getPost = (post_id: string) => {
//   // we could add the user_id as props to keep track of nb of requests to avoid attacks
//   const body = JSON.stringify({
//     post_id,
//   });
//   return axiosClient.post("post/get-post", body);
// };

// // when individually clicked on
// export const getPosts = (searchInput: string) => {
//   const body = JSON.stringify({
//     searchInput,
//   });
//   return axiosClient.post("post/get-posts", body);
// };

// //
// export const getPhotos = (photos_ids: [string]) => {
//   const body = JSON.stringify({
//     photos_ids,
//   });
//   return axiosClient.post("post/get-photos", body);
// };

// add post to saved posts
export const saveUnsavePost = (
  post_id: string,
) => {
  return axiosClient.get(`post/save-unsave/${post_id}`, { withCredentials: true });
};

// add post to saved posts
export const getHomePosts = (
  user_id: string
) => {
  const body = JSON.stringify({
    user_id
  });
  return axiosClient.get("post/home", { withCredentials: true });
};



