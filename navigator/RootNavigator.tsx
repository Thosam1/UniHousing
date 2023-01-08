/* rnfe - Parent file for navigation */
import React from "react";

// navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { useAppSelector } from "../features/hooks";
import { selectAuthStatus } from "../features/auth/authSlice";
import { theme } from "../constants";

// type definitions
export type RootStackParamList = {
  // will check if the names param are correct
  Authentification: undefined;
  Application: undefined;
};

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  // The `state` arg is correctly typed as `RootState` already
  const authStatus = true; // useAppSelector(selectAuthStatus);

  return (
    <RootStack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.white,
        },
      }}
    >
      {authStatus ? (
        // User is signed in
        <RootStack.Screen
          name="Application"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        // No token found, user isn't signed in
        <RootStack.Screen
          name="Authentification"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
