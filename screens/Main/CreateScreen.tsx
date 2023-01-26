import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
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
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button, Block, Input, Text } from "../../components";
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
import { createPost, editImages } from "../../api/post/post";
import { theme } from "../../constants";
import { Icon } from "@rneui/base";
import { Image } from "@rneui/themed";

type CreateScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<AppStackParamList>
>;

const { width, height } = Dimensions.get("window");

const CreateScreen = () => {
  const navigation = useNavigation<CreateScreenNavigationProp>(); // maybe to modify profile

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<ImagePickerAsset[] | null>(null);

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

    // if(images == null) return;

    createPost(
      user.profile_id,
      title,
      city,
      country,
      startDate,
      endDate,
      description,
      price
    )
      .then((res) => {
        if (res.status === 200) {
          if(images != null){
            editImages(res.data.post_id, images);
          } 
          Toast.show({
            type: "success",
            text1: res.data.message,
          });

          // to clear fields
          cancelButton();
          setLoading(false);
          navigation.goBack();
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

  const imagePressed = () => {};

  const pickImages = async () => {
    if (!checkForCameraRollPermission()) return;

    let picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [4, 3],
      quality: 0.6, // [0-1] % quality
    });

    // an image has been picked
    if (!picked.canceled) {
      setImages(picked.assets);
      // upload it to the server, after the post is created !!!
    }
  };

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
      return false;
    } else {
      console.log("Media Permissions are granted");
      return true;
    }
  };

  const addImageGalery = (width: number) => {
    return <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={true}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={1} onPress={imagePressed}>
            <Image
              source={{ uri: item.uri }}
              style={{
                width: width,
                height: 240,
                borderRadius: 10,
                resizeMode: "cover",
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </TouchableOpacity>
        )}
      />
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={[styles.container]}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Block
              padding={[
                theme.sizes.padding,
                theme.sizes.padding,
                theme.sizes.padding / 2,
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Icon
                  name="closecircle"
                  type="antdesign"
                  onPress={() => navigation.goBack()}
                />
              </View>

              <View style={{ paddingTop: 30 }}>
                <Text center h1 bold>
                  Create a Post
                </Text>
              </View>

              <Block middle>
                <Input
                  label="Title"
                  style={[styles.input]}
                  onChangeText={(text: string) => setTitle(text)}
                />
                <Input
                  label="Description"
                  multipline
                  numberOfLines={6}
                  style={[styles.input]}
                  onChangeText={(text: string) => setDescription(text)}
                />

                <Input
                  label="City"
                  style={[styles.input]}
                  onChangeText={(text: string) => setCity(text)}
                />
                <Input
                  label="Country"
                  style={[styles.input]}
                  onChangeText={(text: string) => setCountry(text)}
                  defaultValue="Switzerland"
                />
                <Input
                  label="Start Date"
                  style={[styles.input]}
                  onChangeText={(text: string) => setStartDate(text)}
                  defaultValue="dd.mm.yy"
                />
                <Input
                  label="End Date"
                  style={[styles.input]}
                  onChangeText={(text: string) => setEndDate(text)}
                  defaultValue="dd.mm.yy"
                />
                <Input
                  label="Price per month"
                  style={[styles.input]}
                  onChangeText={(text: string) => setPrice(text)}
                />

                {images && addImageGalery(width - theme.sizes.padding * 2)}

                {images ? 
                <Button shadow onPress={pickImages}>
                  <Text semibold center>
                    Reselect Images
                  </Text>
                </Button>
                :
                <Button shadow onPress={pickImages}>
                  <Text semibold center>
                    Add Images
                  </Text>
                </Button>}

                {/* <Button shadow onPress={cancelButton}>
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text center semibold>
                      Cancel
                    </Text>
                  )}
                </Button> */}

                <Button
                  gradient
                  onPress={createButton}
                  disabled={
                    title.length === 0 ||
                    description.length === 0 ||
                    city.length === 0 ||
                    country.length === 0 ||
                    startDate.length === 0 ||
                    endDate.length === 0 ||
                    price.length === 0
                  }
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text bold white center>
                      Create Post
                    </Text>
                  )}
                </Button>
              </Block>
              <Toast />
            </Block>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.white,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
