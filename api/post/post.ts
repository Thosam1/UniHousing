import { axiosClient } from "../RequestManager";
import { Date, Location } from "../typesAPI";

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

export const editPost = (input: {
  user: string;
  title: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
  price: string;
}) => {
  return axiosClient.post("post/edit", input, { withCredentials: true });
};

export const deletePost = (user_id: string, post_id: string) => {
  // from security perspective would be good to add a second factor authentification like a code to avoid attacks
  const body = JSON.stringify({
    user_id,
    post_id,
  });
  return axiosClient.post("post/delete", body, { withCredentials: true });
};

export const getPostAdditionalDetails = (user_id: string, post_id: string) => {
  // from security perspective would be good to add a second factor authentification like a code to avoid attacks
  const body = JSON.stringify({
    user_id,
    post_id,
  });
  return axiosClient.post("post/asdfasdflékjaklsdjfélakdsj", body, { withCredentials: true });
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
  user_id: string,
) => {
  const body = JSON.stringify({
    user_id,
    post_id,
  });
  return axiosClient.post("post/save-unsave", body, { withCredentials: true });
};

// add post to saved posts
export const getHomePosts = (
  user_id: string
) => {
  const body = JSON.stringify({
    user_id
  });
  return axiosClient.post("post/home", body, { withCredentials: true });
};



