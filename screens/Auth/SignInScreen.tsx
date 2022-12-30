/* This is the screen we show if the user isn't signed in already (we couldn't find a token). */
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Checkbox from "expo-checkbox";

import { Button, Image } from "@rneui/themed";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigator/AuthNavigator";

import { validateLogin } from "../../utils/client_side_validation/auth_validation";
import Toast from "react-native-toast-message";

import { useAppDispatch } from "../../features/hooks";
import { setUserState } from "../../features/auth/authSlice";
import { login } from "../../api/auth/auth";
import { data } from "autoprefixer";

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "SignIn"
>;

const SignInScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [failed, setFailed] = useState(false); // todo set back to false

  const [loading, setLoading] = useState(false);

  // method when signing in
  const loginButton = () => {
    setLoading(true);
    Keyboard.dismiss();

    // Perform client-side verification
    const clientLoginValidation: [boolean, string] = validateLogin(
      email,
      password
    );

    if (clientLoginValidation[0] === false) {
      Toast.show({
        type: "error",
        text1: clientLoginValidation[1],
      });
      setLoading(false);
      return;
    }

    // send request to the server
    let failed = false;
    login(email, password, rememberMe).then((res) => {
      if(res.status === 200) {
        // Toast.show({
        //   type: "success",
        //   text1: "Login successful",
        // });
        setFailed(false);
        console.log(`new accessToken received : ${res.data.accessToken}`)
        localStorage.setItem("accessToken", res.data.accessToken);
        dispatch(setUserState({ authenticated: true, accessToken: res.data.accessToken }));
      } else {
        Toast.show({
          type: "error",
          text1: "Login error",
        });
        failed = true;
        setFailed(true);
      }
    }).catch((err) => console.log(err))

    setLoading(false);
    if(failed) return;
    resetAllFields();
    // todo change variable so we are redirected to home screen
    return;
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
  };

  const resetAllFields = () => {
    setEmail("");
    setPassword("");
    setRememberMe(false);
    setFailed(false);
    setLoading(false);
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

            <View style={tw("flex flex-row py-3")}>
              <Checkbox
                value={rememberMe}
                onValueChange={setRememberMe}
                disabled={loading}
              />
              <Text style={{ paddingLeft: 8, fontSize: 14 }}>Remember Me</Text>
            </View>

            <Button
              title="Sign In"
              style={[tw("py-2 px-4"), { width: 400 }]}
              disabled={email.length === 0 || password.length === 0}
              onPress={loginButton}
              loading={loading}
            />

            <View>
              <Text style={[tw("text-center py-2"), { fontSize: 15 }]}>
                Don't have an account ?{" "}
                <Text onPress={switchToSignUp} style={{ color: "#19e266" }}>
                  Sign Up
                </Text>
              </Text>
            </View>

            {failed === true ? (
              <View>
                <Text
                  onPress={switchToForgotPassword}
                  style={[
                    tw("text-center py-2"),
                    { fontSize: 15, color: "#e21966" },
                  ]}
                >
                  Forgot your password ?
                </Text>
              </View>
            ) : (
              <></>
            )}

            <Toast />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
