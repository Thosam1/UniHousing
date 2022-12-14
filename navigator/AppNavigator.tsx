import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabNavigator from "./TabNavigator";

const AppStack = createNativeStackNavigator();

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
