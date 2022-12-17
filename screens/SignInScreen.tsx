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
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigator/AuthNavigator";
import { AppStackParamList } from "../navigator/AppNavigator";
import { RootStackParamList } from "../navigator/RootNavigator";
import { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";

import { validateLogin } from '../utils/client_side_validation/auth_validation';
import Toast from 'react-native-toast-message';


type IntroductionSignInScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, "SignIn">, NativeStackNavigationProp<RootStackParamList>>;

const SignInScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<IntroductionSignInScreenNavigationProp>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [failed, setFailed] = useState(false); // todo Change back to false !!!

  const [loading, setLoading] = useState(false);

  // method when signing in
  const login = () => {
    setLoading(true);
    Keyboard.dismiss();

    Toast.show({
      type: 'success',
      text1: 'Success Information',
      text2: "Subtext detail info"
    })

    setEmail("WHAT THE FUCK IS THIS NOT WORKING")

    // Perform client-side verification
    const clientLoginValidation: [boolean, string] = validateLogin(email, password);

    if(clientLoginValidation[0] === false) {

      return;
    }

    // send request to the server
    const response = true; // method to the api
    // api.account.loginRequest(email, password, rememberMe, () => {setLoading(false)}, () => {
    //   setFailed(true);
    // })

    // if(response) {
    //   navigation.navigate("Home");
    // } else {
    //   setFailed(true);
    // }
  };


  const switchToSignUp = () => {
    Keyboard.dismiss();
    resetAllFields();
    navigation.navigate("SignUp");
  };

  const switchToForgotPassword = () => {
    Keyboard.dismiss();
    resetAllFields();
    navigation.navigate("ForgotPassword"); 
  }

  const resetAllFields = () => {
    setEmail("");
    setPassword("");
  };

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
                Don't have an account ? {" "}
                <Text onPress={switchToSignUp} style={{ color: "#19e266" }}>
                  Sign Up
                </Text>
              </Text>
            </View>

            {failed === true ? (
              <View>
                <Text onPress={switchToForgotPassword} style={[tw("text-center py-2"), { fontSize: 15, color: "#e21966" }]}>
                  Forgot your password ?
                </Text>
              </View>
            ) : (
              <></>
            )}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
