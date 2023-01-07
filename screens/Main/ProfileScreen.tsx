import React, { useEffect, useState } from "react";

import {
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button, Block, Input, Text } from "../../components";
import { theme } from "../../constants";
import { Image } from "@rneui/themed";

import { useTailwind } from "tailwind-rn/dist";

import { getPrivateProfile } from "../../api/user/user";
import { PrivateProfile } from "../../api/typesAPI";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { selectUser, setUser } from "../../features/auth/authSlice";
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { TabStackParamList } from "../../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { AppStackParamList } from "../../navigator/AppNavigator";

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Profile">,
  NativeStackNavigationProp<AppStackParamList>
>;

const ProfileScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<ProfileScreenNavigationProp>(); // maybe to modify profile
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  let user = useAppSelector(selectUser);

  useEffect(() => {
    getPrivateProfile()
      .then((res) => {
        if (res.status === 200) {
          console.log("WE GOT THE PRIVATE PROFILE DATA");
          console.log(res.data);

          // putting what we got in the global state in RTK
          const user: PrivateProfile = {
            profile_id: res.data._id,
            avatar: res.data.avatar,
            first_name: res.data.firstName as string,
            last_name: res.data.lastName as string,
            email: res.data.email as string,
            status: res.data.status as string,
            bio: res.data.bio as string,
          };
          dispatch(setUser({ user }));
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
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView>
        <Block style={{ flex: 1 }} padding={[0, theme.sizes.base * 2]}>
          <View style={{ paddingTop: 30 }}>
            <Text center h1 bold>
              Profile
            </Text>
          </View>

          <View style={[styles.container, tw("flex items-center")]}>
            <Image
              // source={ ( user.avatar === "" ? require("../../assets/images/anonymous-avatar.jpg") : require(`${user.avatar}`)) }
              source={require("../../assets/images/anonymous-avatar.jpg")}
              style={{ width: 200, height: 200 }}
            />
          </View>

          <Block middle>
            <View
              style={[tw("flex flex-col items-start"), { paddingVertical: 10 }]}
            >
              <Text>First Name</Text>
              <Text>{user.first_name}</Text>
            </View>

            <View
              style={[tw("flex flex-col items-start"), { paddingVertical: 10 }]}
            >
              <Text>Last Name</Text>
              <Text>{user.last_name}</Text>
            </View>

            <View
              style={[tw("flex flex-col items-start"), { paddingVertical: 10 }]}
            >
              <Text>Email</Text>
              <Text>{user.email}</Text>
            </View>

            <View
              style={[tw("flex flex-col items-start"), { paddingVertical: 10 }]}
            >
              <Text>Status</Text>
              <Text>{user.status}</Text>
            </View>
            <View
              style={[tw("flex flex-col items-start"), { paddingVertical: 10 }]}
            >
              <Text>Bio</Text>
              <Text>{user.bio}</Text>
            </View>

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
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default ProfileScreen;
