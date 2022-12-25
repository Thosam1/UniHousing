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

};

export const deletePost = (user_id: string, post_id: string) => {
  // from security perspective would be good to add a second factor authentification like a code to avoid attacks
};

// when individually clicked on
export const getPost = (post_id: string) => { // we could add the user_id as props to keep track of nb of requests to avoid attacks

};

// when individually clicked on
export const getPosts = (searchInput: string) => {

};

//
export const getPhotos = (photos_ids: [string]) => {

};

// add post to saved posts
export const savePost = (
  post_id: string,
  user_id: string,
  jwt_token: string
) => {};

// delete post from saved posts
export const unSavePost = (
  post_id: string,
  user_id: string,
  jwt_token: string
) => {};

export const getUserOwnedPosts = (user_id: string) => {};

export const getUserSavedPosts = (user_id: string, jwt_token: string) => {};
