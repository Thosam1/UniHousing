import {
  Dimensions,
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "@rneui/themed";
import { theme } from "../constants";
import React from "react";
import { Block, Button, Text } from ".";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../navigator/AppNavigator";
import { PostPreview } from "../api/typesAPI";
import { BASE } from "../api/RequestManager";

type PostCardProps = PostPreview;

type CardNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<AppStackParamList>
>;

const { width, height } = Dimensions.get("window");

const PostCard = (props: PostCardProps) => {
  const navigation = useNavigation<CardNavigationProp>(); // maybe to modify profile

  const cropTitle = (title: string) => {
    return title.length > 30 ? title.substring(0, 30) + "..." : title;
  };

  const cardPressed = () => {
    navigation.navigate("Post", { props: props });
  };

  const renderImagesGalleryInPreview = (width: number) => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={true}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={props.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={1} onPress={cardPressed}>
            <Image
              source={{ uri: BASE + item }}
              style={{
                width: width,
                height: 240,
                borderRadius: 10,
                resizeMode: "cover",
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View
      style={{
        height: 320,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        width: "100%",
        margin: 20,
      }}
    >
      {renderImagesGalleryInPreview(width - theme.sizes.base * 4)}

      <TouchableOpacity
        style={{
          flexDirection: "column",
          paddingTop: 10,
          paddingHorizontal: 10,
        }}
        onPress={cardPressed}
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
          {props.price} CHF/month
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostCard;
