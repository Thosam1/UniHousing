import {
  CompositeNavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, Image } from "@rneui/themed";
import Toast from "react-native-toast-message";

import { useTailwind } from "tailwind-rn/dist";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { editProfile, getOwnedPosts } from "../../api/user/user";
import { selectUser, setUser } from "../../features/auth/authSlice";
import { validateRegister } from "../../utils/client_side_validation/auth_validation";
import { Post, PostPreview, PrivateProfile } from "../../api/typesAPI";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamList } from "../../navigator/TabNavigator";

import { AppStackParamList } from "../../navigator/AppNavigator";
import { ImagePickerAsset } from "expo-image-picker/build/ImagePicker.types";
import { createPost } from "../../api/post/post";
import { Block, PostCard } from "../../components";
import { theme } from "../../constants";

const OwnedPostsSreen = () => {
  const [ownedPosts, setOwnedPosts] = useState<PostPreview[]>([
    {
      post_id: "asdasdofkl1242341",
      owner_id: "sdasdasr3rethtre",
      title: "Studio vers Renens",
      city: "Renens",
      country: "Switzerland",
      startDate: "12.02.2023",
      endDate: "12.08.2023",
      price: "840",
      image:
        "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
      // owner_firstName: "Thösam",
      // owner_lastName: "Norlha-Tsang",
      // owner_avatar:
      //   "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      post_id: "asdf5523df56rzht9sd",
      owner_id: "sdasdasr3rethtre",
      title: "Studio vers Crissier",
      city: "Crissier",
      country: "Switzerland",
      startDate: "12.02.2023",
      endDate: "31.12.2023",
      price: "960",
      image:
        "https://thumbs.dreamstime.com/b/classic-house-flower-garden-751996.jpg",

      // owner_firstName: "Thösam",
      // owner_lastName: "Norlha-Tsang",
      // owner_avatar:
      //   "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
  ]);
  const isFocused = useIsFocused();

  let user = useAppSelector(selectUser);

  useEffect(() => {
    getOwnedPosts(user.profile_id)
      .then((res) => {
        if (res.status === 200) {
          let array: PostPreview[] = [];
          res.data.map((elt: any) => {
            const singlePost: PostPreview = {
              post_id: elt._id,
              owner_id: elt.user,
              title: elt.title,
              city: elt.city,
              country: elt.country,
              startDate: elt.startDate,
              endDate: elt.endDate,
              price: elt.price,
              image: elt.image,
            };
            array.push(singlePost);
          });

          setOwnedPosts(array);
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView>
        <Block
          middle
          style={{ flex: 1, alignItems: "center",  }}
          padding={[0, theme.sizes.base * 2]}
        >
          {ownedPosts.map((post) => (
            <PostCard
              key={post.post_id}
              id={post.post_id}
              title={post.title}
              city={post.city}
              country={post.country}
              startDate={post.startDate}
              endDate={post.endDate}
              price={post.price}
              mainImageURL={post.image}
            />
          ))}
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OwnedPostsSreen;
