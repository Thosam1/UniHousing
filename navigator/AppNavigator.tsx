import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { PostPreview } from "../api/typesAPI";
import { theme } from "../constants";
import CreateScreen from "../screens/Main/CreateScreen";
import EditPostScreen from "../screens/Main/EditPostScreen";
import EditProfileScreen from "../screens/Main/EditProfileScreen";
import OwnedPostsSreen from "../screens/Main/OwnedPostsSreen";
import PostScreen from "../screens/Main/PostScreen";
import PublicProfileScreen from "../screens/Main/PublicProfileScreen";
import SavedPostsScreen from "../screens/Main/SavedPostsScreen";

import TabNavigator from "./TabNavigator";

// type definitions
export type AppStackParamList = {
  // will check if the names param are correct
  Main: undefined;
  Create: undefined;
  EditPost: { post_id: string };
  EditProfile: undefined;
  OwnedPosts: undefined;
  SavedPosts: undefined;
  Post: { props: PostPreview };
  PublicProfile: { user_id: string };
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
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="SavedPosts"
          component={SavedPostsScreen}
          options={{
            title: "Saved Posts",
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="Post"
          component={PostScreen}
          options={{
            title: "Post",
            headerShown: false,
          }}
        />
        <AppStack.Group
          screenOptions={{
            presentation: "modal",
          }}
        >
          <AppStack.Screen
            name="Create"
            component={CreateScreen}
            options={{
              title: "Create Post",
              headerShown: false,
            }}
          />

          {/* <AppStack.Screen
            name="EditPost"
            component={EditPostScreen}
            options={{
              title: "Edit Post",
              headerShown: false,
            }}
          /> */}

          <AppStack.Screen
            name="PublicProfile"
            component={PublicProfileScreen}
            options={{
              title: "Post",
              headerShown: false,
            }}
          />
        </AppStack.Group>
      </AppStack.Group>
    </AppStack.Navigator>
  );
};

export default AppNavigator;
