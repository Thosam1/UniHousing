import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { Button, Image } from "@rneui/themed";

import { useTailwind } from "tailwind-rn/dist";

import { getPrivateProfile } from "../../api/user/user";
import { PrivateProfile } from "../../api/typesAPI";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { selectUser, setUser } from "../../features/auth/authSlice";
import { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { TabStackParamList } from "../../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SecondaryStackParamList } from "../../navigator/SecondaryNavigator";

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Profile">,
  NativeStackNavigationProp<SecondaryStackParamList>
>;

const ProfileScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<ProfileScreenNavigationProp>(); // maybe to modify profile
  const dispatch = useAppDispatch();

  let user = useAppSelector(selectUser);

  const [antiInfiniteLoop, setAntiInfiniteLoop] = useState("");

  useEffect(() => {
    getPrivateProfile()
      .then((res) => {
        if (res.status === 200) {
          console.log("WE GOT THE PRIVATE PROFILE DATA");
          console.log(res.data);

          // putting what we got in the global state in RTK
          const user: PrivateProfile = {
            profile_id: res.data._id,
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
  }, [antiInfiniteLoop]);

  const editProfileButton = () => {
    navigation.navigate("EditProfile");
  };

  const yourPostsButton = () => {
    navigation.navigate("OwnedPosts");
  };

  const savedPostsButton = () => {
    navigation.navigate("SavedPosts");
  };

  return (
    <SafeAreaView style={tw("flex items-center")}>
      <ScrollView>
        <View
          style={[
            tw("flex items-center pt-4"),
            { padding: 24, justifyContent: "flex-end" },
          ]}
        >
          <Text
            style={[
              tw("text-center font-bold"),
              { paddingVertical: 12, fontSize: 25 },
            ]}
          >
            Profile
          </Text>

          <Text>Avatar</Text>

          <View style={[tw("flex flex-row"), { paddingVertical: 20 }]}>
            <View style={[tw("flex flex-col"), { paddingRight: 15 }]}>
              <Text>First Name</Text>
              <Text>{user.first_name}</Text>
            </View>

            <View style={[tw("flex flex-col"), { paddingLeft: 15 }]}>
              <Text>Last Name</Text>
              <Text>{user.last_name}</Text>
            </View>
          </View>

          <View
            style={[tw("flex flex-col items-center"), { paddingVertical: 10 }]}
          >
            <Text>Email</Text>
            <Text>{user.email}</Text>
          </View>

          <View
            style={[
              tw("flex flex-col items-start px-6"),
              { paddingVertical: 10 },
            ]}
          >
            <Text>Status</Text>
            <Text>{user.status}</Text>
          </View>
          <View
            style={[
              tw("flex flex-col items-start px-6"),
              { paddingVertical: 10 },
            ]}
          >
            <Text>Bio</Text>
            <Text>{user.bio}</Text>
          </View>

          <View></View>
          <Button
            title="Edit Profile"
            style={[tw("py-1 px-4"), { width: 400 }]}
            onPress={editProfileButton}
          />

          <Button
            title="Your Posts"
            style={[tw("py-2 px-4"), { width: 400 }]}
            onPress={yourPostsButton}
          />

          <Button
            title="Saved Posts"
            style={[tw("py-2 px-4"), { width: 400 }]}
            onPress={savedPostsButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
