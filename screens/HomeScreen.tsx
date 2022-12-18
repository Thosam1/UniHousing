/* Home Screen : the screen we show if the user is already signed in. */
import { View, Text, Button } from "react-native";
import React from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";

import { useAppDispatch } from "../features/hooks";
import { logoutRDK } from "../features/auth/authSlice";

type HomeScreenNavigationProp = BottomTabScreenProps<TabStackParamList, "Home">;

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(logoutRDK());
  };

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Sign Out" onPress={signOut}></Button>
    </View>
  );
};

export default HomeScreen;
