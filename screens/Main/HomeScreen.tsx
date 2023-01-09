/* Home Screen : the screen we show if the user is already signed in. */
import {
  StyleSheet,
  View,
  Button,
  Animated,
  Dimensions,
  SafeAreaView,
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
import { Block, Input, Text } from "../../components";
import { Icon } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";

type HomeScreenNavigationProp = BottomTabNavigationProp<
  TabStackParamList,
  "Home"
>;

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // fetching out the posts

    // // tp get the details
    // getPostAdditionalDetails(props.owner_id, props.post_id)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setOwnerFirstName(res.data.owner_firstName);
    //       setOwnerLastName(res.data.owner_lastName);
    //       setOwnerAvatar(res.data.owner_avatar);
    //       setDescription(res.data.descrption);
    //       setShareLink(res.data.share_link);
    //       setSaved(res.data.saved);

    //       console.log(res.data);
    //     }
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => setLoading(false));
  }, [isFocused]);

  const dispatch = useAppDispatch();

  const getPrivateProfileButton = () => {
    getPrivateProfile()
      .then((res) => {
        if (res.status === 200) {
          console.log("WE GOT THE PRIVATE PROFILE DATA");
          console.log(res.data);
        } else {
          console.log("NOT an OK response, couldn't get the user data");
        }
      })
      .catch((err) => console.log(err));
  };

  const signOut = () => {
    localStorage.setItem("accessToken", "");
    dispatch(logoutRTK());
  };

  // will fetch the user profile, to see if access token works :

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
    <Block
      style={{
        paddingVertical: theme.sizes.base * 2,
        backgroundColor: theme.colors.white,
      }}
    >
      <Block flex={false} center space="between" style={styles.header}>
        <Text h1 bold style={{ paddingVertical: 25 }}>
          Explore
        </Text>
        {renderSearch()}
      </Block>
    </Block>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
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
