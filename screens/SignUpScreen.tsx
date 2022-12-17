/* This is the screen we show if the user isn't signed in already (we couldn't find a token). */
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigator/AuthNavigator";
import { Button, Image } from "@rneui/themed";

type IntroductionSignUpScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

const SignUpScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<IntroductionSignUpScreenNavigationProp>();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, isLoading] = useState(false);

  // method when signing in
  const register = () => {
    Keyboard.dismiss();
  };

  const switchToSignIn = () => {
    Keyboard.dismiss();
    resetAllFields();
    navigation.navigate("SignIn");
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
      <SafeAreaView style={[tw("flex items-center")]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={[
              tw("flex items-center pt-4"),
              { padding: 24, justifyContent: "flex-end" },
            ]}
          >
            <Image
              source={require("../assets/images/register_image.png")}
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
                Register
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
              onPress={register}
            />
            <View>
              <Text style={[tw("text-center py-2"), { fontSize: 15 }]}>
                Already have an account ? {" "}
                <Text onPress={switchToSignIn} style={{ color: "#19e266" }}>
                  Sign In
                </Text>
              </Text>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
