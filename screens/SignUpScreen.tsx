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

import { validateRegister } from "../utils/client_side_validation/auth_validation";
import Toast from "react-native-toast-message";

type IntroductionSignUpScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

const SignUpScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<IntroductionSignUpScreenNavigationProp>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // method when signing in
  const register = () => {
    setLoading(true);
    Keyboard.dismiss();

    // Perform client-side verification
    const clientRegisterValidation: [boolean, string] = validateRegister(
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );

    if (clientRegisterValidation[0] === false) {
      Toast.show({
        type: "error",
        text1: clientRegisterValidation[1],
      });
      setLoading(false);
      return;
    }

    // send request to the server
    const response = true; // method to the api
    // api.account.loginRequest(email, password, rememberMe, () => {setLoading(false)}, () => {
    //   setFailed(true);
    // })

    const serverResponse: [boolean, string] = [true, "server message"]

    if(!response) {
      Toast.show({
        type: "error",
        text1: serverResponse[1],
      });
      setLoading(false);
      return;
    }

    // Everything went well
    Toast.show({
      type: "success",
      text1: serverResponse[1],
    });
    setLoading(false);
    return;
  };

  const switchToSignIn = () => {
    Keyboard.dismiss();
    resetAllFields();
    navigation.navigate("SignIn");
  };

  const resetAllFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLoading(false);
  };

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

            <View style={tw("flex flex-row py-6 px-6")}>
              <TextInput
                placeholder="First Name"
                style={[tw("px-4 ")]}
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                placeholder="Last Name"
                style={tw("px-4")}
                value={lastName}
                onChangeText={setLastName}
              />
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

            <TextInput
              placeholder="Confirm Password"
              style={[tw("py-6")]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <Button
              title="Sign Up"
              style={[tw("py-2 px-4"), { width: 400 }]}
              onPress={register}
              disabled={
                firstName.length === 0 ||
                lastName.length === 0 ||
                email.length === 0 ||
                password.length === 0 ||
                confirmPassword.length === 0
              }
            />
            <View>
              <Text style={[tw("text-center py-2"), { fontSize: 15 }]}>
                Already have an account ?{" "}
                <Text onPress={switchToSignIn} style={{ color: "#19e266" }}>
                  Sign In
                </Text>
              </Text>
            </View>

            <Toast />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
