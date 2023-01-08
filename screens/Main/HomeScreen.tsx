/* Home Screen : the screen we show if the user is already signed in. */
import { View, Text, Button } from "react-native";
import React from "react";
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

type HomeScreenNavigationProp = BottomTabNavigationProp<
  TabStackParamList,
  "Home"
>;

const HomeScreen = () => {
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.colors.white,
      }}
    >
      <Text>HomeScreen</Text>

      <Button
        title="Get Private Profile"
        onPress={getPrivateProfileButton}
      ></Button>

      <Button title="Sign Out" onPress={signOut}></Button>
    </View>
  );
};

export default HomeScreen;
