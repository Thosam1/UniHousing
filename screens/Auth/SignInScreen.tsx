/* This is the screen we show if the user isn't signed in already (we couldn't find a token). */
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";

import { Button, Block, Input, Text } from "../../components";
import { theme } from "../../constants";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigator/AuthNavigator";

import { validateLogin } from "../../utils/client_side_validation/auth_validation";
import Toast from "react-native-toast-message";

import { useAppDispatch } from "../../features/hooks";
import { setUser, setUserState } from "../../features/auth/authSlice";
import { login } from "../../api/auth/auth";
import { getPrivateProfile } from "../../api/user/user";
import { PrivateProfile } from "../../api/typesAPI";

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
    login(email, password, rememberMe)
      .then((res) => {
        if (res.status === 200) {
          // Toast.show({
          //   type: "success",
          //   text1: "Login successful",
          // });
          setFailed(false);
          console.log(`new accessToken received : ${res.data.accessToken}`);
          localStorage.setItem("accessToken", res.data.accessToken);

          getPrivateProfile()
            .then((res) => {
              if (res.status === 200) {
                console.log("WE GOT THE PRIVATE PROFILE DATA");
                console.log(res.data);

                // putting what we got in the global state in RTK
                const user: PrivateProfile = {
                  profile_id: res.data._id,
                  avatar: res.data.avatar,
                  first_name: res.data.firstName as string,
                  last_name: res.data.lastName as string,
                  email: res.data.email as string,
                  status: res.data.status as string,
                  bio: res.data.bio as string,
                };
                dispatch(setUser({ user }));
              } else {
                console.log("NOT an OK response, couldn't get the user data");
              }
            })
            .catch((err) => console.log(err));

          dispatch(
            setUserState({
              authenticated: true,
              accessToken: res.data.accessToken,
            })
          );
        } else {
          Toast.show({
            type: "error",
            text1: "Login error",
          });
          failed = true;
          setFailed(true);
        }
      })
      .catch((err) => console.log(err));

    setLoading(false);
    if (failed) return;
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
      style={styles.login}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={[styles.login]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Block padding={[0, theme.sizes.base * 2]}>
            <View style={{ paddingTop: 30 }}>
              <Text center h1 bold>
                Login
              </Text>
            </View>

            {/* <Image
                source={require("../../assets/images/login_image.png")}
                style={[{ height: 300, width: 300 }]}
                PlaceholderContent={<ActivityIndicator />}
              /> */}

            <Block middle>
              <Input
                label="Email"
                // error={hasErrors("email")}
                style={[styles.input]} // style={[styles.input, hasErrors("email")]}
                // defaultValue={this.state.email}
                onChangeText={(text: string) => setEmail(text)}
              />
              <Input
                secure
                label="Password"
                // error={hasErrors("password")}
                style={[styles.input]}
                // defaultValue={this.state.password}
                onChangeText={(text: string) => setPassword(text)}
              />

              {/* <View style={tw("flex flex-row py-3")}>
                <Checkbox
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  disabled={loading}
                />
                <Text style={{ paddingLeft: 10, fontSize: 14 }}>
                  Remember Me
                </Text>
              </View> */}
              <Button
                disabled={email.length === 0 || password.length === 0}
                gradient
                onPress={() => loginButton()}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Login
                  </Text>
                )}
              </Button>

              <View style={{ paddingVertical: 8 }}>
                <Text
                  gray
                  caption
                  center
                  onPress={switchToForgotPassword}
                  style={{ textDecorationLine: "underline" }}
                >
                  Forgot your password?
                </Text>
              </View>

              <View style={{ paddingVertical: 8 }}>
                <Text gray caption center>
                  Don't have an account ?{" "}
                  <Text
                    caption
                    center
                    onPress={switchToSignUp}
                    style={{
                      color: "#19e266",
                      textDecorationLine: "underline",
                    }}
                  >
                    Sign Up
                  </Text>
                </Text>
              </View>
            </Block>
            <Toast />
          </Block>
          {/* </View> */}
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});
