/* rnfe - Parent file for navigation */
import { View, Text } from "react-native";
import React, { useEffect } from "react";

// navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

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
        <RootStack.Screen name="Authentification" component={AppNavigator} options={{ headerShown: false }} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
