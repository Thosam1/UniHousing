/* Home screen */
export type Location = {
  city: string;
  country: string;
};

export type Date = {
  start: string;
  end: string;
};

// needed to show the preview of a most
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
  images: string[];
  // owner_firstName: string;
  // owner_lastName: string;
  // owner_avatar: string;
};

export type Post = {
  post_id: string;
  owner_id: string;

  owner_firstName: string; // additional
  owner_lastName: string; // additional
  owner_avatar: string; // additional
 
  title: string;
  description: string; // additional
  city: string;
  country: string;
  startDate: string;
  endDate:string;
  price: string;
  images: string[]

  share_link: string; // additional
  saved: boolean;  // additional

  // send contact details to owner
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




