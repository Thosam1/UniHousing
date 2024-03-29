import React, { useEffect } from "react";

import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button, Block, Input, Text } from "../../components";
import { theme } from "../../constants";
import { Avatar, Image } from "@rneui/themed";

import { useTailwind } from "tailwind-rn/dist";

import { getPrivateProfile } from "../../api/user/user";
import { PrivateProfile } from "../../api/typesAPI";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { selectUser, setUser } from "../../features/auth/authSlice";
import {
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { TabStackParamList } from "../../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { AppStackParamList } from "../../navigator/AppNavigator";
import { BASE } from "../../api/RequestManager";

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Profile">,
  NativeStackNavigationProp<AppStackParamList>
>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>(); // maybe to modify profile
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  let user = useAppSelector(selectUser);

  useEffect(() => {
    getPrivateProfile()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);

          // putting what we got in the global state in RTK
          const user: PrivateProfile = {
            profile_id: res.data._id,
            avatar: BASE + res.data.avatar,
            first_name: res.data.firstName as string,
            last_name: res.data.lastName as string,
            email: res.data.email as string,
            status: res.data.status as string,
            bio: res.data.bio as string,
          };
          dispatch(setUser({ user }));

          console.log(user.avatar)
        } else {
          console.log("NOT an OK response, couldn't get the user data");
        }
      })
      .catch((err) => console.log(err));
  }, [isFocused]);

  const editProfileButton = () => {
    // navigation.navigate("EditProfile");
    navigation.navigate("EditProfile");
  };

  const yourPostsButton = () => {
    navigation.navigate("OwnedPosts");
  };

  const savedPostsButton = () => {
    navigation.navigate("SavedPosts");
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: theme.colors.white }}>
      <ScrollView>
        <Block style={{ flex: 1 }} padding={[0, theme.sizes.base * 2]}>
          <View style={{ paddingTop: 30 }}>
            <Text center h1 bold>
              Profile
            </Text>
          </View>

          <Block middle padding={[theme.sizes.padding, 0]}>
            
          <Avatar size={200} rounded source={(user.avatar === "" ? require("../../assets/images/anonymous-avatar.jpg") : { uri: user.avatar })} />

          <Text h1 bold style={{ marginTop: theme.sizes.base }}>
            {user.first_name} {user.last_name}
          </Text>

          <Text
            h2
            semibold
            style={{ marginTop: theme.sizes.base, marginBottom: 5 }}
          >
            Status
          </Text>

          <Text h2>{user.status}</Text>

          <Text
            h2
            semibold
            style={{ marginTop: theme.sizes.base, marginBottom: 5 }}
          >
            Bio
          </Text>
          <Text h2>{user.bio}</Text>

            <Button gradient onPress={editProfileButton}>
              <Text bold white center>
                Edit Profile
              </Text>
            </Button>

            <Button gradient onPress={yourPostsButton}>
              <Text bold white center>
                Your Posts
              </Text>
            </Button>

            <Button gradient onPress={savedPostsButton}>
              <Text bold white center>
                Saved Posts
              </Text>
            </Button>
          </Block>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#cecece",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
    justifyContent: "center",
  },
});

export default ProfileScreen;
