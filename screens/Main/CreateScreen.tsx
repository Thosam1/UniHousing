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
import { createPost } from "../../api/post/post";

// type CreateScreenNavigationProp = BottomTabScreenProps<TabStackParamList, "Profile">;

const CreateScreen = () => {
  const tw = useTailwind();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(false);

  let user = useAppSelector(selectUser);

  const createButton = () => {
    setLoading(true);

    const createPostValidation: [boolean, string] = [true, "works"]; //validateCreatePost();

    if (createPostValidation[0] === false) {
      Toast.show({
        type: "error",
        text1: createPostValidation[1],
      });
      setLoading(false);
      return;
    }

    createPost(
      user.profile_id,
      title,
      city,
      country,
      startDate,
      endDate,
      description,
      price,
    )
      .then((res) => {
        if (res.status === 200) {
          Toast.show({
            type: "success",
            text1: res.data,
          });
          
          // to clear fields
          cancelButton();
          setLoading(false);
          return;
        } else {
          Toast.show({
            type: "error",
            text1: res.data,
          });
          setLoading(false);
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  const cancelButton = () => {
    setTitle("");
    setDescription("");
    setCity("");
    setCountry("");
    setStartDate("");
    setEndDate("");
    setPrice("");
    setLoading(false);
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
            Create a Post
          </Text>

          <View
            style={[
              tw("flex flex-col items-start px-6"),
              { paddingVertical: 10 },
            ]}
          >
            <Text>Title</Text>
            <TextInput
              style={[tw("py-2")]}
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View
            style={[
              tw("flex flex-col items-start px-6"),
              { paddingVertical: 10 },
            ]}
          >
            <Text>Description</Text>
            <TextInput
              style={[tw("py-2")]}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={[tw("flex flex-row"), { paddingVertical: 20 }]}>
            <View style={[tw("flex flex-col"), { paddingRight: 15 }]}>
              <Text>City</Text>
              <TextInput
                style={[tw("py-2")]}
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={[tw("flex flex-col"), { paddingLeft: 15 }]}>
              <Text>Country</Text>
              <TextInput
                style={[tw("py-2")]}
                value={country}
                onChangeText={setCountry}
              />
            </View>
          </View>

          <View style={[tw("flex flex-row"), { paddingVertical: 20 }]}>
            <View style={[tw("flex flex-col"), { paddingRight: 15 }]}>
              <Text>Start Date</Text>
              <TextInput
                style={[tw("py-2")]}
                value={startDate}
                onChangeText={setStartDate}
              />
            </View>

            <View style={[tw("flex flex-col"), { paddingLeft: 15 }]}>
              <Text>End Date</Text>
              <TextInput
                style={[tw("py-2")]}
                value={endDate}
                onChangeText={setEndDate}
              />
            </View>
          </View>

          <View
            style={[
              tw("flex flex-col items-start px-6"),
              { paddingVertical: 10 },
            ]}
          >
            <Text>Price per month</Text>
            <TextInput
              style={[tw("py-2")]}
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <Button
            title="Cancel"
            style={[tw("py-1 px-4"), { width: 400 }]}
            onPress={cancelButton}
          />

          <Button
            title="Done"
            style={[tw("py-2 px-4"), { width: 400 }]}
            loading={loading}
            onPress={createButton}
            disabled={false}
          />
        </View>

        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateScreen;
