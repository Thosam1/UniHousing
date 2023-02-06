import {
  CompositeNavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
} from "react-native";
import { Icon } from "@rneui/themed";

import { useAppSelector } from "../../features/hooks";
import { getSavedPosts } from "../../api/user/user";
import { selectUser, setUser } from "../../features/auth/authSlice";
import { PostPreview } from "../../api/typesAPI";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamList } from "../../navigator/TabNavigator";

import { AppStackParamList } from "../../navigator/AppNavigator";
import { Text } from "../../components";
import { theme } from "../../constants";
import PostPreviewGallery from "../../components/PostPreviewGallery";

type SavedPostsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<AppStackParamList>
>;

const SavedPostsScreen = () => {
  const navigation = useNavigation<SavedPostsNavigationProp>(); // maybe to modify profile

  const [savedPosts, setSavedPosts] = useState<PostPreview[]>(); 
  const isFocused = useIsFocused();

  let user = useAppSelector(selectUser);

  useEffect(() => {
    getSavedPosts(user.profile_id)
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

          setSavedPosts(array);
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginLeft: theme.sizes.padding,
          marginVertical: theme.sizes.padding / 2,
        }}
      >
        <Icon
          name="leftcircle"
          type="antdesign"
          onPress={() => navigation.goBack()}
        />
        <Text h3 semibold style={{ paddingLeft: 95 }}>
          Saved Posts
        </Text>
      </View>
      {savedPosts && <PostPreviewGallery posts={savedPosts} />}
    </SafeAreaView>
  );
};

export default SavedPostsScreen;
