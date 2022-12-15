/* rnfe - Parent file for navigation */
import React from "react";

// navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

// type definitions
export type RootStackParamList = {
  // will check if the names param are correct
  Authentification: undefined;
  Application: undefined;
};

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const authData = true;

  return (
    <RootStack.Navigator>
      {authData ? (
        // No token found, user isn't signed in
        <RootStack.Screen name="Authentification" component={AuthNavigator} options={{ headerShown: false }} />
      ) : (
        // User is signed in
        <RootStack.Screen name="Application" component={AppNavigator} options={{ headerShown: false }} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
