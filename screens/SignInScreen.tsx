/* This is the screen we show if the user isn't signed in already (we couldn't find a token). */
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Image } from "@rneui/themed";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigator/AuthNavigator";

type IntroductionSignInScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

const SignInScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<IntroductionSignInScreenNavigationProp>();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, isLoading] = useState(false);

  // method when signing in
  const login = () => {
    Keyboard.dismiss();
  }

  const switchToSignUp = () => {
    Keyboard.dismiss();
    resetAllFields();
    navigation.navigate("SignUp");
  };

  const resetAllFields = () => {
    setEmail("")
    setPassword("")
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={tw("flex items-center")}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={[
              tw("flex items-center pt-4"),
              { padding: 24, justifyContent: "flex-end" },
            ]}
          >
            <Image
              source={require("../assets/images/login_image.png")}
              style={[{ height: 300, width: 300 }]}
              PlaceholderContent={<ActivityIndicator />}
            />

            <View>
              <Text
                style={[
                  tw("text-center font-bold"),
                  { paddingVertical: 12, fontSize: 25 },
                ]}
              >
                Login
              </Text>
            </View>

            <TextInput
              placeholder="Email"
              style={[tw("py-6")]}
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="Password"
              style={[tw("py-6")]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              title="Sign in"
              style={[tw("py-2 px-4"), { width: 400 }]}
              onPress={login}
            />

            <View>
              <Text style={[tw("text-center py-2"), { fontSize: 15 }]}>
                Don't have an account ?{" "}
                <Text onPress={switchToSignUp} style={{ color: "#19e266" }}>
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
