/* Home Screen : the screen we show if the user is already signed in. */
import {
  StyleSheet,
  View,
  Button,
  Animated,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../../navigator/TabNavigator";

import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  logoutRTK,
  selectUser,
  setUserState,
} from "../../features/auth/authSlice";
import { getPrivateProfile } from "../../api/user/user";
import { theme } from "../../constants";
import { Block, Input, PostCard, Text } from "../../components";
import { Icon } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";
import { getHomePosts } from "../../api/post/post";
import { PostPreview } from "../../api/typesAPI";
import PostPreviewGallery from "../../components/PostPreviewGallery";
import { dummy_post_preview_gallery } from "../../data/dummy_data";

type HomeScreenNavigationProp = BottomTabNavigationProp<
  TabStackParamList,
  "Home"
>;

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const isFocused = useIsFocused();
  let user = useAppSelector(selectUser);

  const [loading, setLoading] = useState(false);
  const [displayedPosts, setDisplayedPosts] = useState<PostPreview[]>(
    dummy_post_preview_gallery
  );

  useEffect(() => {
    setLoading(true);

    // fetching out the posts
    getHomePosts(user.profile_id)
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

            setDisplayedPosts(array);
            console.log(res.data);
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [isFocused]);

  const dispatch = useAppDispatch();

  const signOut = () => {
    localStorage.setItem("accessToken", "");
    dispatch(logoutRTK());
  };

  const [searchString, setSearchString] = useState("");
  const [searchFocus, setSearchFocus] = useState(new Animated.Value(0.6));

  const handleSearchFocus = (status: boolean) => {
    // will increase size
    Animated.timing(searchFocus, {
      toValue: status ? 0.8 : 0.6, // status === true, increase flex size
      duration: 150, // ms
      useNativeDriver: false,
    }).start();
  };

  const renderSearch = () => {
    const isEditing = searchFocus && searchString;

    return (
      <Block animated middle flex={searchFocus} style={styles.search}>
        <Input
          placeholder="Search"
          placeholderTextColor={theme.colors.gray2}
          style={styles.searchInput}
          onFocus={() => handleSearchFocus(true)}
          onBlur={() => handleSearchFocus(false)}
          onChangeText={(text: string) => setSearchString(text)}
          value={searchString}
          onRightPress={() => (isEditing ? setSearchString("") : null)}
          rightStyle={styles.searchRight}
          rightLabel={
            <Icon
              // name={isEditing ? "close" : "search"}
              name="search"
              type="font-awesome"
              size={theme.sizes.base / 1.3}
              color={theme.colors.gray2}
              style={styles.searchIcon}
            />
          }
        />
      </Block>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Block
        style={{
          paddingTop: theme.sizes.base * 2,
          backgroundColor: theme.colors.white,
        }}
      >
        <Block flex={false} center space="between" style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(
                setUserState({
                  authenticated: false,
                  accessToken: "",
                })
              );
            }}
          >
            <Text>Logout</Text>
          </TouchableWithoutFeedback>
          <Text h1 bold style={{ paddingVertical: 25 }}>
            Explore
          </Text>
          {renderSearch()}
        </Block>
        <PostPreviewGallery posts={displayedPosts} />
      </Block>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2.5,
  },
  search: {
    height: theme.sizes.base * 2,
    width: width - theme.sizes.base * 2,
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: "rgba(142, 142, 147, 0.06)",
    borderColor: "rgba(142, 142, 147, 0.06)",
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: "transparent",
  },
  searchIcon: {
    margin: 10,
  },
  explore: {
    marginHorizontal: theme.sizes.padding * 1.25,
  },
  image: {
    minHeight: 100,
    maxHeight: 130,
    maxWidth: width - theme.sizes.padding * 2.5,
    marginBottom: theme.sizes.base,
    borderRadius: 4,
  },
  mainImage: {
    minWidth: width - theme.sizes.padding * 2.5,
    minHeight: width - theme.sizes.padding * 2.5,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.1,
    width,
    paddingBottom: theme.sizes.base * 4,
  },
});
