import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Divider, Image, Icon, Avatar } from "@rneui/themed";
import { theme } from "../constants";
import { Container } from "postcss";
import React, { useEffect, useState } from "react";
import { Block, Button, Text } from "../components";
import { useAppDispatch } from "../features/hooks";

import { getPostAdditionalDetails, saveUnsavePost } from "../api/post/post";
import { Toast } from "react-native-toast-message/lib/src/Toast";

type PostCardProps = {
  post_id: string;
  owner_id: string;
  images: string[];
  title: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  price: string;
};

const PostCard = (props: PostCardProps) => {
  let scrollX = new Animated.Value(0);
  const { width, height } = Dimensions.get("window");

  const [showPostDetails, setShowPostDetails] = useState(false);

  const [loading, setLoading] = useState(false);

  const [owner_firstName, setOwnerFirstName] = useState("Thösam");
  const [owner_lastName, setOwnerLastName] = useState("Norlha-Tsang");
  const [owner_avatar, setOwnerAvatar] = useState(
    "https://www.fgdc.gov/img/slider/slider-bg-network.jpg/image"
  );
  const [description, setDescription] = useState(
    "This is the dummies description ever, idk what the fuck i am doing with my life, got a lot of revision to do and the exams are coming to destroy me and my other personalities. please help me, i am undar da water, weeeeeeeeeeehlp"
  );
  const [share_link, setShareLink] = useState(
    "https://www.fgdc.gov/img/slider/slider-bg-network.jpg/image"
  );
  const [saved, setSaved] = useState(false);

  const cropTitle = (title: string) => {
    return title.length > 30 ? title.substring(0, 30) + "..." : title;
  };

  const cardPressed = () => {
    setLoading(true);

    // to make the details appear in a modal
    setShowPostDetails(true);

    // tp get the details
    getPostAdditionalDetails(props.owner_id, props.post_id)
      .then((res) => {
        if (res.status === 200) {
          setOwnerFirstName(res.data.owner_firstName);
          setOwnerLastName(res.data.owner_lastName);
          setOwnerAvatar(res.data.owner_avatar);
          setDescription(res.data.descrption);
          setShareLink(res.data.share_link);
          setSaved(res.data.saved);

          console.log(res.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const saveButton = () => {
    // sends request to server
    saveUnsavePost(props.post_id, props.owner_id)
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
          setSaved(!saved); // todo, to remove !!!
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

  const renderImagesGalleryInPreview = (width: number) => {
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
          <TouchableOpacity activeOpacity={1} onPress={cardPressed}>
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
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderPostInfo = () => {
    return (
      <Modal
        animationType="slide"
        visible={showPostDetails}
        onRequestClose={() => setShowPostDetails(false)}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text h2 light onPress={() => setShowPostDetails(false)}>
              Close
            </Text>
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

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
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

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingVertical: 25
                }}
              >
                <Avatar size={64} rounded source={{ uri: owner_avatar }} />
                <Text body bold style={{ marginTop: theme.sizes.base }}>
                  {owner_firstName} {owner_lastName}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button gradient onPress={() => setShowPostDetails(false)}>
              <Text center white>
                I am interested !
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  };

  return (
    <View
      style={{
        height: 320,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        width: "100%",
        margin: 20,
      }}
    >
      {renderImagesGalleryInPreview(width - theme.sizes.base * 4)}

      <TouchableOpacity
        style={{
          flexDirection: "column",
          paddingTop: 10,
          paddingHorizontal: 10,
        }}
        onPress={cardPressed}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {cropTitle(props.title)}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#b1e5d3",
            paddingTop: 3,
          }}
        >
          {props.city} {", "} {props.country}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#00a46c",
            paddingTop: 3,
          }}
        >
          {props.price} CHF/month
        </Text>
      </TouchableOpacity>
      {renderPostInfo()}
      <Toast />
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  image: {
    height: 240,
    borderRadius: 10,
    resizeMode: "cover",
    // overflow: "visible",
  },
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});
