import { View, Text, ScrollView } from "react-native";
import React from "react";
import Block from "./Block";
import { theme } from "../constants";
import { PostPreview } from "../api/typesAPI";
import PostCard from "./PostCard";

type PostPreviewGalleryProps = {
    posts: PostPreview[],
}

const PostPreviewGallery = ( { posts } : PostPreviewGalleryProps) => {
  return (
    <ScrollView>
      <Block
        middle
        style={{ flex: 1, alignItems: "center" }}
        padding={[0, theme.sizes.base * 2]}
      >
        {posts.map((post) => (
          <PostCard
            key={post.post_id}
            post_id={post.post_id}
            owner_id={post.owner_id}
            title={post.title}
            city={post.city}
            country={post.country}
            startDate={post.startDate}
            endDate={post.endDate}
            price={post.price}
            images={post.images}
          />
        ))}
      </Block>
    </ScrollView>
  );
};

export default PostPreviewGallery;
