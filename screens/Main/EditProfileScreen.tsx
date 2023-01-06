import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
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
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, Image } from "@rneui/themed";
import Toast from "react-native-toast-message";

import { useTailwind } from "tailwind-rn/dist";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { editProfile } from "../../api/user/user";
import { selectUser, setUser } from "../../features/auth/authSlice";
import { validateRegister } from "../../utils/client_side_validation/auth_validation";
import { PrivateProfile } from "../../api/typesAPI";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamList } from "../../navigator/TabNavigator";

import { AppStackParamList } from "../../navigator/AppNavigator";
import { ImagePickerAsset } from "expo-image-picker/build/ImagePicker.types";

type EditProfileScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AppStackParamList, "EditProfile">,
  BottomTabNavigationProp<TabStackParamList>
>;

const EditProfileScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<EditProfileScreenNavigationProp>(); // maybe to modify profile
  const dispatch = useAppDispatch();

  const [avatar, setAvatar] = useState<ImagePickerAsset | null>(null);
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(false);

  const [antiInfiniteLoop, setAntiInfiniteLoop] = useState("");

  let user = useAppSelector(selectUser);
  useEffect(() => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setStatus(user.status);
    setBio(user.bio);

    checkForCameraRollPermission();
  }, [antiInfiniteLoop]);

  const cancelButton = () => {
    navigation.navigate("Profile");
  };

  const doneButton = () => {
    setLoading(true);

    const editProfileValidation: [boolean, string] = validateRegister(
      firstName,
      lastName,
      "test@epfl.ch",
      "2..päas45fwZf",
      "2..päas45fwZf"
    );

    if (editProfileValidation[0] === false) {
      Toast.show({
        type: "error",
        text1: editProfileValidation[1],
      });
      setLoading(false);
      return;
    }

    editProfile(user.profile_id, avatar, firstName, lastName, status, bio)
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
          navigation.navigate("Profile");
        } else {
          Toast.show({
            type: "error",
            text1: res.data,
          });
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const pickAvatar = async () => {
    let picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 0.8, // [0-1] % quality
    });

    // an image has been picked
    if (!picked.canceled) {
      setAvatar(picked.assets[0]);
      setAvatarChanged(true);
      console.log("avatar has been picked !");
    }
  };

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    } else {
      console.log("Media Permissions are granted");
    }
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

          <View style={imageUploaderStyles.container}>
            {avatar && (
              <Image
                source={{ uri: avatar.uri }}
                style={{ width: 200, height: 200 }}
              />
            )}
            {!avatar && (
              <Image
                source={require("../../assets/images/anonymous-avatar.jpg")}
                style={{ width: 200, height: 200 }}
              />
            )}
            <View style={imageUploaderStyles.uploadBtnContainer}>
              <TouchableOpacity
                onPress={pickAvatar}
                style={imageUploaderStyles.uploadBtn}
              >
                <Text>{avatar ? "Edit" : "Upload"} Image</Text>
                {/* <AntDesign name="camera" size={20} color="black" /> */}
              </TouchableOpacity>
            </View>
          </View>

          <View style={[tw("flex flex-row"), { paddingVertical: 20 }]}>
            <View style={[tw("flex flex-col"), { paddingRight: 15 }]}>
              <Text>First Name</Text>
              <TextInput
                style={[tw("py-2")]}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={[tw("flex flex-col"), { paddingLeft: 15 }]}>
              <Text>Last Name</Text>
              <TextInput
                style={[tw("py-2")]}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <View
            style={[
              tw("flex flex-col items-start px-6"),
              { paddingVertical: 10 },
            ]}
          >
            <Text>Status</Text>
            <TextInput
              style={[tw("py-2")]}
              value={status}
              onChangeText={setStatus}
            />
          </View>
          <View
            style={[
              tw("flex flex-col items-start px-6"),
              { paddingVertical: 10 },
            ]}
          >
            <Text>Bio</Text>
            <TextInput style={[tw("py-2")]} value={bio} onChangeText={setBio} />
          </View>

          <View></View>
          <Button
            title="Cancel"
            style={[tw("py-1 px-4"), { width: 400 }]}
            onPress={cancelButton}
          />

          <Button
            title="Done"
            style={[tw("py-2 px-4"), { width: 400 }]}
            loading={loading}
            onPress={doneButton}
            disabled={
              firstName === user.first_name &&
              lastName === user.last_name &&
              status === user.status &&
              bio === user.bio &&
              !avatarChanged
            }
          />
        </View>

        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
};

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditProfileScreen;
