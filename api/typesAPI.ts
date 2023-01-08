/* Home screen */
export type Location = {
  city: string;
  country: string;
};

export type Date = {
  start: string;
  end: string;
};

export type PostCardProps = {
  post_id: string;
  owner_id: string;
  location: Location;
  date: Date;
  price: string;
  photos_ids: string[];
};

export type PostPreview = {
  post_id: string;
  owner_id: string;
  title: string;
  // description: string;
  city: string;
  country: string;
  startDate: string;
  endDate:string;
  price: string;
  image: string;
  // owner_firstName: string;
  // owner_lastName: string;
  // owner_avatar: string;
};

export type Post = {
  post_id: string;
  owner_id: string;
  owner_firstName: string;
  owner_lastName: string;
  owner_avatar: string;
  title: string;
  description: string;
  city: string;
  country: string;
  startDate: string;
  endDate:string;
  price: string;
  photos: string[]
};

// idea, we can pass the PostCardProps as a prop to the new screen, and then fetch the title and description with the post_id

export type PublicProfile = {
    profile_id: string,
    avatar_id: string,
    first_name: string,
    last_name: string,
    status: string,
    bio: string
}

export type PrivateProfile = {
    profile_id: string,
    avatar: string, // url
    first_name: string,
    last_name: string,
    email: string,
    status: string,
    bio: string,

    // owned_posts: [string],
    // saved_posts: [string]
}




