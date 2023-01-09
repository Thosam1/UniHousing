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
import { dummy_post_preview_gallery } from "../../data/dummy_data";
import PostPreviewGallery from "../../components/PostPreviewGallery";

const OwnedPostsSreen = () => {
  const [ownedPosts, setOwnedPosts] = useState<PostPreview[]>(
    dummy_post_preview_gallery
  ); // todo remove
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
              images: elt.images,
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
      <PostPreviewGallery posts={ownedPosts} />
    </SafeAreaView>
  );
};

export default OwnedPostsSreen;
