import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Button, Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigator/AuthNavigator";

type IntroductionScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

const IntroductionScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<IntroductionScreenNavigationProp>();

  const switchToSignIn = () => {
    navigation.navigate("SignIn");
  };

  const switchToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView style={tw("flex items-center")}>
      <View
        style={[
          tw("flex items-center"),
          { paddingHorizontal: 15, maxWidth: "90%" },
        ]}
      >
        <Text
          style={[
            tw("text-center font-bold"),
            { paddingTop: 30, fontSize: 25 },
          ]}
        >
          UniHousing
        </Text>

        <Image
          source={require("../assets/images/introduction_image.png")}
          // containerStyle={tw("w-full h-64")}
          style={[{ height: 300, width: 300 }]}
          PlaceholderContent={<ActivityIndicator />}
        />

        <Text style={[tw("text-center font-bold text-xl pt-4")]}>
          Find a room near your university, or sublet your room
        </Text>
        <Text style={tw("text-center py-4")}>
          We believe that everyone should find a room to stay during their
          studies, we are here to help you get a room for your budget
        </Text>

        <Button
          title="Get Started"
          style={[tw("py-2 px-4"), { width: 400 }]}
          onPress={switchToSignIn}
        />

        <Text style={[tw("text-center py-2"), { fontSize: 15 }]}>
          Don't have an account ?{" "}
          <Text onPress={switchToSignUp} style={{ color: "#19e266" }}>
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default IntroductionScreen;
