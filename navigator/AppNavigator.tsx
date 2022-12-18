import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabNavigator from "./TabNavigator";

// type definitions
export type AppStackParamList = {
  // will check if the names param are correct
  Main: undefined;
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Group>
        <AppStack.Screen name="Main" component={TabNavigator} />
      </AppStack.Group>
    </AppStack.Navigator>
  );
};

export default AppNavigator;
