import {
  CompositeNavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Avatar, Divider, Icon, Image } from "@rneui/themed";
import Toast from "react-native-toast-message";
import { Block, Button, Text } from "../../components";
import { theme } from "../../constants";

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamList } from "../../navigator/TabNavigator";

import { AppStackParamList } from "../../navigator/AppNavigator";
import { getPost, saveUnsavePost } from "../../api/post/post";
import { BASE } from "../../api/RequestManager";

type PostNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<AppStackParamList>
>;

type PostScreenRouteProp = RouteProp<AppStackParamList, "Post">;

const { width, height } = Dimensions.get("window");

const PostScreen = () => {
  const navigation = useNavigation<PostNavigationProp>(); // maybe to modify profile

  const {
    params: { props },
  } = useRoute<PostScreenRouteProp>();

  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);

  const [owner_firstName, setOwnerFirstName] = useState("");
  const [owner_lastName, setOwnerLastName] = useState("");
  const [owner_avatar, setOwnerAvatar] = useState("");
  const [description, setDescription] = useState("");
  const [share_link, setShareLink] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log("in the use effect")
    console.log(props.post_id)

    // tp get the details
    getPost(props.post_id)
      .then((res) => {
        if (res.status === 200) {
          setOwnerFirstName(res.data.owner_firstName);
          setOwnerLastName(res.data.owner_lastName);
          setOwnerAvatar(BASE + res.data.owner_avatar);
          setDescription(res.data.description);

          setShareLink(res.data.shareLink);
          setSaved(res.data.saved);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [isFocused]);

  const saveButton = () => {
    console.log("saved button pressed")
    // sends request to server
    saveUnsavePost(props.post_id)
      .then((res) => {
        if (res.status === 200) {
          setSaved(res.data.saved);
          Toast.show({
            type: "success",
            text1: res.data.message,
          });
        } else {
          Toast.show({
            type: "error",
            text1: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const shareButton = () => {};

  const renderImagesGalleryInModal = (width: number) => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={true}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={props.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          // <TouchableOpacity onPress={() => console.log("hey")}>
          <Image
            source={{ uri: item }}
            style={{
              width: width,
              height: 240,
              borderRadius: 10,
              resizeMode: "cover",
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
          // </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <Block
      padding={[
        theme.sizes.padding * 1.3,
        theme.sizes.padding,
        theme.sizes.padding * 2,
      ]}
      space="between"
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: -10,
        }}
      >
        <Icon
          name="leftcircle"
          type="antdesign"
          onPress={() => navigation.goBack()}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text h2 light style={{ paddingRight: 25 }} onPress={shareButton}>
            Share
          </Text>

          {saved === true ? (
            <Icon size={30} name="bookmark" onPress={saveButton} />
          ) : (
            <Icon size={30} name="bookmark-outline" onPress={saveButton} />
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginVertical: theme.sizes.padding }}
      >
        {renderImagesGalleryInModal(width - theme.sizes.padding * 2)}

        <Text height={24} h2 bold style={{ marginTop: theme.sizes.base }}>
          {props.title}
        </Text>
        <Text h2>
          {props.city} {", "} {props.country}
        </Text>
        <Text h3>
          {"From "} {props.startDate} {" to "} {props.endDate}
        </Text>
        <Text h3>
          {"CHF"} {props.price} {"/"} {"month"}
        </Text>

        <Divider style={{ paddingVertical: 8 }} />

        <Text h3 bold style={{ marginTop: theme.sizes.base }}>
          Description
        </Text>

        <Text body style={{ marginTop: theme.sizes.base }}>
          {description}
        </Text>

        <Divider style={{ paddingVertical: 8 }} />

        <Text h3 bold style={{ marginTop: theme.sizes.base }}>
          Author
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PublicProfile", { user_id: props.owner_id });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 25,
            }}
          >
            <Avatar size={64} rounded source={(owner_avatar === "" ? require("../../assets/images/anonymous-avatar.jpg") : { uri: owner_avatar })} />
            <Text body bold style={{ marginTop: theme.sizes.base }}>
              {owner_firstName} {owner_lastName}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Block middle padding={[theme.sizes.base / 2, 0]}>
        <Button gradient onPress={() => console.log("YO, I AM INTERESTED")}>
          <Text center white>
            I am interested !
          </Text>
        </Button>
      </Block>
      <Toast />
    </Block>
  );
};

export default PostScreen;
