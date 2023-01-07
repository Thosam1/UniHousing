import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { theme } from "../constants";
import { useTailwind } from "tailwind-rn/dist";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigator/AuthNavigator";
import { Block, Button, Text } from "../components";

type IntroductionScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

const { width, height } = Dimensions.get("window");

const IntroductionScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<IntroductionScreenNavigationProp>();

  const [showTerms, setShowTerms] = useState(false);
  let scrollX = new Animated.Value(0);

  const illustrations = [
    { id: 1, source: require("../assets/images/introduction_image.png") },
    // { id: 2, source: require("../assets/images/email_verification_image.png") }, // todo erase that one later
    // { id: 1, source: require("../assets/images/illustration_1.png") },
    { id: 2, source: require("../assets/images/illustration_2.png") },
    { id: 3, source: require("../assets/images/illustration_3.png") }
  ];

  const switchToSignIn = () => {
    navigation.navigate("SignIn");
  };

  const switchToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const renderTermsService = () => {
    return (
      <Modal
        animationType="slide"
        visible={showTerms}
        onRequestClose={() => setShowTerms(false)}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            Terms of Service
          </Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              1. Your use of the Service is at your sole risk. The service is
              provided on an "as is" and "as available" basis.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              2. Support for Expo services is only available in English, via
              e-mail.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              3. You understand that Expo uses third-party vendors and hosting
              partners to provide the necessary hardware, software, networking,
              storage, and related technology required to run the Service.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              4. You must not modify, adapt or hack the Service or modify
              another website so as to falsely imply that it is associated with
              the Service, Expo, or any other Expo service.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              5. You may use the Expo Pages static hosting service solely as
              permitted and intended to host your organization pages, personal
              pages, or project pages, and for no other purpose. You may not use
              Expo Pages in violation of Expo's trademark or other rights or in
              violation of applicable law. Expo reserves the right at all times
              to reclaim any Expo subdomain without liability to you.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              6. You agree not to reproduce, duplicate, copy, sell, resell or
              exploit any portion of the Service, use of the Service, or access
              to the Service without the express written permission by Expo.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              7. We may, but have no obligation to, remove Content and Accounts
              containing Content that we determine in our sole discretion are
              unlawful, offensive, threatening, libelous, defamatory,
              pornographic, obscene or otherwise objectionable or violates any
              party's intellectual property or these Terms of Service.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              8. Verbal, physical, written or other abuse (including threats of
              abuse or retribution) of any Expo customer, employee, member, or
              officer will result in immediate account termination.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              9. You understand that the technical processing and transmission
              of the Service, including your Content, may be transferred
              unencrypted and involve (a) transmissions over various networks;
              and (b) changes to conform and adapt to technical requirements of
              connecting networks or devices.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              10. You must not upload, post, host, or transmit unsolicited
              e-mail, SMSs, or "spam" messages.
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              gradient
              onPress={() => setShowTerms(false)}
            >
              <Text center white>
                I understand
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

  const renderIllustrations = () => {

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        // extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width: width, height: height / 2, overflow: "visible" }}
          />
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: scrollX } }
          }
        ], {useNativeDriver: false})}
      />
    );
  };

  const renderSteps = () => {
    const stepPosition = Animated.divide(scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp"
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          );
        })}
      </Block>
    );
  }

  return (
    <Block>
      <Block center bottom flex={0.4}>
        <Text h1 center bold>
          Your Home.
          <Text h1 primary>
            {" "}
            UniHousing.
          </Text>
        </Text>
        <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
          Enjoy the experience.
        </Text>
      </Block>
      <Block center middle>
        {renderIllustrations()}
        {renderSteps()}
      </Block>
      <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
        <Button gradient onPress={switchToSignIn}>
          <Text center semibold white>
            Login
          </Text>
        </Button>
        <Button shadow onPress={switchToSignUp}>
          <Text center semibold>
            Signup
          </Text>
        </Button>
        <Button onPress={() => setShowTerms(true)}>
          <Text center caption gray>
            Terms of service
          </Text>
        </Button>
      </Block>
      {renderTermsService()}
    </Block>
    // <SafeAreaView style={tw("flex items-center")}>
    //   <View
    //     style={[
    //       tw("flex items-center"),
    //       { paddingHorizontal: 15, maxWidth: "90%" },
    //     ]}
    //   >
    //     <Text
    //       style={[
    //         tw("text-center font-bold"),
    //         { paddingTop: 30, fontSize: 25 },
    //       ]}
    //     >
    //       UniHousing
    //     </Text>

    //     <Image
    //       source={require("../assets/images/introduction_image.png")}
    //       // containerStyle={tw("w-full h-64")}
    //       style={[{ height: 300, width: 300 }]}
    //       PlaceholderContent={<ActivityIndicator />}
    //     />

    //     <Text style={[tw("text-center font-bold text-xl pt-4")]}>
    //       Find a room near your university, or sublet your room
    //     </Text>
    //     <Text style={tw("text-center py-4")}>
    //       We believe that everyone should find a room to stay during their
    //       studies, we are here to help you get a room for your budget
    //     </Text>

    //     <Button
    //       title="Get Started"
    //       style={[tw("py-2 px-4"), { width: 400 }]}
    //       onPress={switchToSignIn}
    //     />

    //     <Text style={[tw("text-center py-2"), { fontSize: 15 }]}>
    //       Don't have an account ?{" "}
    //       <Text onPress={switchToSignUp} style={{ color: "#19e266" }}>
    //         Sign Up
    //       </Text>
    //     </Text>
    //   </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  }
});

export default IntroductionScreen;
