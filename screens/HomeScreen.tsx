/* Home Screen : the screen we show if the user is already signed in. */
import { View, Text, Button } from "react-native";
import React from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";

import { useAppDispatch, useAppSelector } from "../features/hooks";
import { logoutRTK, selectUser, setUser } from "../features/auth/authSlice";
import { getPrivateProfile } from "../api/user/user";

type HomeScreenNavigationProp = BottomTabScreenProps<TabStackParamList, "Home">;

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const getPrivateProfileButton = () => {
    getPrivateProfile();
  }

  const logProfile = () => {
    const user = useAppSelector(selectUser);
    console.log(user)
  }

  const signOut = () => {
    localStorage.setItem("accessToken", "");
    dispatch(logoutRTK());
  };

  // will fetch the user profile, to see if access token works :



  return (
    <View>
      <Text>HomeScreen</Text>

      <Button title="Get Private Profile" onPress={getPrivateProfileButton}></Button>

      <Button title="logProfile" onPress={logProfile}></Button>


      <Button title="Sign Out" onPress={signOut}></Button>
    </View>
  );
};

export default HomeScreen;
