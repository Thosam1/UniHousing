import { axiosClient } from "../RequestManager";
import { Date, Location } from "../typesAPI";

// when creating a post
export const createPost = (
  user_id: string,
  jwt_token: string,
  title: string,
  description: string,
  location: Location,
  date: Date,
  price: string
) => {
  const body = JSON.stringify({
    user_id,
    jwt_token,
    title,
    description,
    location,
    date,
    price,
  });
  return axiosClient.post("post/create-post", body);
};

export const deletePost = (
  user_id: string,
  jwt_token: string,
  post_id: string
) => {
  // from security perspective would be good to add a second factor authentification like a code to avoid attacks
  const body = JSON.stringify({
    user_id,
    post_id,
    jwt_token,
  });
  return axiosClient.post("post/delete-post", body);
};

// when individually clicked on
export const getPost = (post_id: string) => {
  // we could add the user_id as props to keep track of nb of requests to avoid attacks
  const body = JSON.stringify({
    post_id,
  });
  return axiosClient.post("post/get-post", body);
};

// when individually clicked on
export const getPosts = (searchInput: string) => {
  const body = JSON.stringify({
    searchInput,
  });
  return axiosClient.post("post/get-posts", body);
};

//
export const getPhotos = (photos_ids: [string]) => {
  const body = JSON.stringify({
    photos_ids,
  });
  return axiosClient.post("post/get-photos", body);
};

// add post to saved posts
export const savePost = (
  post_id: string,
  user_id: string,
  jwt_token: string
) => {
  const body = JSON.stringify({
    user_id,
    post_id,
    jwt_token,
  });
  return axiosClient.post("post/save-post", body);
};

// delete post from saved posts
export const unSavePost = (
  post_id: string,
  user_id: string,
  jwt_token: string
) => {
  const body = JSON.stringify({
    user_id,
    post_id,
    jwt_token,
  });
  return axiosClient.post("post/unsave-post", body);
};

export const getUserOwnedPosts = (user_id: string) => {
  const body = JSON.stringify({
    user_id,
  });
  return axiosClient.post("post/user-owned-posts", body);
};

export const getUserSavedPosts = (user_id: string, jwt_token: string) => {
  const body = JSON.stringify({
    user_id,
    jwt_token,
  });
  return axiosClient.post("post/user-saved-posts", body);
};
