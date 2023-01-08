import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { theme } from "../constants";
import EditProfileScreen from "../screens/Main/EditProfileScreen";
import OwnedPostsSreen from "../screens/Main/OwnedPostsSreen";
import SavedPostsScreen from "../screens/Main/SavedPostsScreen";
import TabNavigator from "./TabNavigator";

// type definitions
export type AppStackParamList = {
  // will check if the names param are correct
  Main: undefined;

  EditProfile: undefined;
  OwnedPosts: undefined;
  SavedPosts: undefined;
  SplashScreen: undefined;
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.white,
        },
      }}
    >
      <AppStack.Group>
        <AppStack.Screen name="Main" component={TabNavigator} />

        <AppStack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            title: "Edit Profile",
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="OwnedPosts"
          component={OwnedPostsSreen}
          options={{
            title: "Owned Posts",
            headerShown: true,
          }}
        />
        <AppStack.Screen
          name="SavedPosts"
          component={SavedPostsScreen}
          options={{
            title: "Saved Posts",
            headerShown: true,
          }}
        />
      </AppStack.Group>
    </AppStack.Navigator>
  );
};

export default AppNavigator;
