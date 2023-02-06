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
  ScrollView,
  Dimensions,
} from "react-native";
import { Avatar, Icon} from "@rneui/themed";
import { Block, Button, Text } from "../../components";
import { theme } from "../../constants";

import {
  getPublicProfile,
} from "../../api/user/user";
import {
  PublicProfile,
} from "../../api/typesAPI";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamList } from "../../navigator/TabNavigator";

import { AppStackParamList } from "../../navigator/AppNavigator";
import { BASE } from "../../api/RequestManager";

type PublicProfileNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<AppStackParamList>
>;

type PublicProfileScreenRouteProp = RouteProp<
  AppStackParamList,
  "PublicProfile"
>;

const { width, height } = Dimensions.get("window");

const PublicProfileScreen = () => {
  const navigation = useNavigation<PublicProfileNavigationProp>(); // maybe to modify profile

  const {
    params: { user_id },
  } = useRoute<PublicProfileScreenRouteProp>();

  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);

  const [owner, setOwner] = useState<PublicProfile>();

  useEffect(() => {
    setLoading(true);

    // tp get the details
    getPublicProfile(user_id)
      .then((res) => {
        if (res.status === 200) {
          setOwner({
            profile_id: user_id,
            avatar: BASE + res.data.avatar,
            first_name: res.data.firstName,
            last_name: res.data.lastName,
            status: res.data.status,
            bio: res.data.bio,
            owned_posts: res.data.ownedPosts, // todo check
          });
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [isFocused]);

  const shareButton = () => {};

  return (
    <Block
      padding={[
        theme.sizes.padding,
        theme.sizes.padding,
        theme.sizes.padding / 2,
      ]}
      space="between"
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

      <ScrollView style={{ marginVertical: theme.sizes.padding }}>
        {owner && (
          <Block middle>
            <Avatar size={140} rounded source={{ uri: owner.avatar }} />
            <Text h1 bold style={{ marginTop: theme.sizes.base }}>
              {owner.first_name} {owner.last_name}
            </Text>

            <Text
              h2
              semibold
              style={{ marginTop: theme.sizes.base, marginBottom: 5 }}
            >
              Status
            </Text>

            <Text h2>{owner.status}</Text>

            <Text
              h2
              semibold
              style={{ marginTop: theme.sizes.base, marginBottom: 5 }}
            >
              Bio
            </Text>
            <Text h2>{owner.bio}</Text>
          </Block>
        )}
      </ScrollView>

      <Block middle padding={[theme.sizes.base / 2, 0]}>
        <Button
          gradient
          onPress={() => console.log("Send a message button clicked")}
        >
          <Text center white>
            Send a message
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default PublicProfileScreen;
