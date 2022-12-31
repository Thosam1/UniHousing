import React from "react";
import SignInScreen from "../screens/Auth/SignInScreen";
import EmailVerificationScreen from "../screens/Auth/EmailVerificationScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/Auth/ResetPasswordScreen";
import SplashScreen from "../screens/SplashScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroductionScreen from "../screens/IntroductionScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import EditProfileScreen from "../screens/Main/EditProfileScreen";
import OwnedPostsSreen from "../screens/Main/OwnedPostsSreen";
import SavedPostsScreen from "../screens/Main/SavedPostsScreen";

// type definitions
export type SecondaryStackParamList = {
  // will check if the names param are correct
  EditProfile: undefined;
  OwnedPosts: undefined;
  SavedPosts: undefined;
  SplashScreen: undefined;
};

const SecondaryStack = createNativeStackNavigator<SecondaryStackParamList>();

const SecondaryNavigator = () => {
  return (
    <SecondaryStack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <SecondaryStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
          headerShown: false,
        }}
      />
      <SecondaryStack.Screen
        name="OwnedPosts"
        component={OwnedPostsSreen}
        options={{
          title: "Owned Posts",
          headerShown: false,
        }}
      />
      <SecondaryStack.Screen
        name="SavedPosts"
        component={SavedPostsScreen}
        options={{
          title: "Saved Posts",
          headerShown: false,
        }}
      />
    </SecondaryStack.Navigator>
  );
};

export default SecondaryNavigator;
