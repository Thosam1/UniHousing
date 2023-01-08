import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { Image } from "@rneui/themed";
import { theme } from "../constants";
import { Container } from "postcss";

type PostCardProps = {
  id: string;
  mainImageURL: string;
  title: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  price: string;
};

const PostCard = (props: PostCardProps) => {
  const cropTitle = (title: string) => {
    return title.length > 30 ? title.substring(0, 30) + "..." : title;
  };

  return (
    <TouchableOpacity
      style={{
        height: 280,
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        width: 280,
        margin: 20
      }}
    >
      <Image
        source={{
          uri: props.mainImageURL,
        }}
        PlaceholderContent={<ActivityIndicator />}
        style={styles.image}
      />
      <View
        style={{
          flexDirection: "column",
          paddingTop: 10,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {cropTitle(props.title)}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#b1e5d3",
            paddingTop: 3,
          }}
        >
          {props.city} {", "} {props.country}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#00a46c",
            paddingTop: 3,
          }}
        >
          $400
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 190, 
    resizeMode: "cover"
  },
});
