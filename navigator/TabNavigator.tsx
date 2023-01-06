/* rnfe - TabNavigator has 2 tabs: Customers and Orders -> can be changed in the bottom of the screen */
import React, { useLayoutEffect } from "react";

// navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

// screens
import HomeScreen from "../screens/Main/HomeScreen";
import ProfileScreen from "../screens/Main/ProfileScreen";

// icons
import { Icon } from "@rneui/themed";
import EditProfileScreen from "../screens/Main/EditProfileScreen";

// type definitions
export type TabStackParamList = {
  // will check if the names param are correct
  Home: undefined;
  Search: undefined;
  Create: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  // removing the "Main" header from the RootNavigator
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
        tabBarActiveTintColor: "#59C1CC",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Icon
                name="users"
                type="entypo"
                color={focused ? "#59C1CC" : "gray"}
              />
            );
          } else if (route.name === "Search") {
            return (
              <Icon
                name="box"
                type="entypo"
                color={focused ? "#EB6A7C" : "gray"}
              />
            );
          } else if (route.name === "Create") {
            return (
              <Icon
                name="box"
                type="entypo"
                color={focused ? "#EB6A7C" : "gray"}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <Icon
                name="box"
                type="entypo"
                color={focused ? "#EB6A7C" : "gray"}
              />
            );
          } else if (route.name === "Settings") {
            return (
              <Icon
                name="box"
                type="entypo"
                color={focused ? "#EB6A7C" : "gray"}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      
    </Tab.Navigator>
  );
};

export default TabNavigator;
