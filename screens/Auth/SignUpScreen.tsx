/* This is the screen we show if the user isn't signed in already (we couldn't find a token). */
import {
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button, Block, Input, Text } from "../../components";
import { theme } from "../../constants";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigator/AuthNavigator";
import { Image } from "@rneui/themed";

import { validateRegister } from "../../utils/client_side_validation/auth_validation";
import Toast from "react-native-toast-message";

import { register } from "../../api/auth/auth";

import { useAppDispatch } from "../../features/hooks";

type IntroductionSignUpScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "SignUp"
>;

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
  const registerButton = () => {
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
    let failed = false;
    register(firstName, lastName, email, password, confirmPassword)
      .then((res) => {
        if (res.status === 200) {
          Toast.show({
            type: "success",
            text1: res.data,
          });
        } else {
          Toast.show({
            type: "error",
            text1: res.data,
          });
          failed = true;
        }
      })
      .catch((err) => console.log(err));

    setLoading(false);
    if (failed) return;

    resetAllFields();
    navigation.navigate("EmailVerification");
    return;
  };

  const switchToSignIn = () => {
    Keyboard.dismiss();
    resetAllFields();
    navigation.navigate("SignIn");
  };

  const switchToValidate = () => {
    Keyboard.dismiss();
    resetAllFields();
    navigation.navigate("EmailVerification");
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
      style={styles.signup}
    >
      <SafeAreaView style={[styles.signup]}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Block padding={[0, theme.sizes.base * 2]}>
              <View style={{ paddingTop: 30 }}>
                <Text center h1 bold>
                  Sign Up
                </Text>
              </View>

              <Image
                source={require("../../assets/images/register_image.png")}
                style={[{ height: 300, width: 300 }]}
                PlaceholderContent={<ActivityIndicator />}
              />

              <Block middle>
                <Input
                  label="First Name"
                  style={[styles.input]}
                  onChangeText={(text: string) => setFirstName(text)}
                />
                <Input
                  label="Last Name"
                  style={[styles.input]}
                  onChangeText={(text: string) => setLastName(text)}
                />

                <Input
                  email
                  label="Email"
                  style={[styles.input]}
                  onChangeText={(text: string) => setEmail(text)}
                />
                <Input
                  secure
                  label="Password"
                  style={[styles.input]}
                  onChangeText={(text: string) => setPassword(text)}
                />
                <Input
                  secure
                  label="Confirm Password"
                  style={[styles.input]}
                  onChangeText={(text: string) => setConfirmPassword(text)}
                />
                <Button
                  gradient
                  onPress={registerButton}
                  disabled={
                    firstName.length === 0 ||
                    lastName.length === 0 ||
                    email.length === 0 ||
                    password.length === 0 ||
                    confirmPassword.length === 0
                  }
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text bold white center>
                      Sign Up
                    </Text>
                  )}
                </Button>

                <View style={{ paddingVertical: 8 }}>
                  <Text gray caption center>
                    Already have an account ?{" "}
                    <Text
                      caption
                      center
                      onPress={switchToSignIn}
                      style={{
                        color: "#19e266",
                        textDecorationLine: "underline",
                      }}
                    >
                      Sign In
                    </Text>
                  </Text>
                </View>

                <View style={{ paddingVertical: 8 }}>
                  <Text gray caption center>
                    Want to validate your account ?{" "}
                    <Text
                      caption
                      center
                      onPress={switchToValidate}
                      style={{
                        color: "#19e266",
                        textDecorationLine: "underline",
                      }}
                    >
                      Validate
                    </Text>
                  </Text>
                </View>
              </Block>
              <Toast />
            </Block>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
    // {/* <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.signup}
    // >
    //   <SafeAreaView style={[tw("flex items-center")]}>
    //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //       <View
    //         style={[
    //           tw("flex items-center pt-4"),
    //           { padding: 24, justifyContent: "flex-end" },
    //         ]}
    //       >
    //         <Image
    //           source={require("../../assets/images/register_image.png")}
    //           style={[{ height: 300, width: 300 }]}
    //           PlaceholderContent={<ActivityIndicator />}
    //         />

    //         <View>
    //           <Text
    //             style={[
    //               tw("text-center font-bold"),
    //               { paddingVertical: 12, fontSize: 25 },
    //             ]}
    //           >
    //             Register
    //           </Text>
    //         </View>

    //         <View style={tw("flex flex-row py-6 px-6")}>
    //           <TextInput
    //             placeholder="First Name"
    //             style={[tw("px-4 ")]}
    //             value={firstName}
    //             onChangeText={setFirstName}
    //           />
    //           <TextInput
    //             placeholder="Last Name"
    //             style={tw("px-4")}
    //             value={lastName}
    //             onChangeText={setLastName}
    //           />
    //         </View>

    //         <TextInput
    //           placeholder="Email"
    //           style={[tw("py-6")]}
    //           value={email}
    //           onChangeText={setEmail}
    //         />

    //         <TextInput
    //           placeholder="Password"
    //           style={[tw("py-6")]}
    //           value={password}
    //           onChangeText={setPassword}
    //           secureTextEntry
    //         />

    //         <TextInput
    //           placeholder="Confirm Password"
    //           style={[tw("py-6")]}
    //           value={confirmPassword}
    //           onChangeText={setConfirmPassword}
    //           secureTextEntry
    //         />

    //         <Button
    //           title="Sign Up"
    //           style={[tw("py-2 px-4"), { width: 400 }]}
    //           onPress={registerButton}
    //           loading={loading}
    //           disabled={
    //             firstName.length === 0 ||
    //             lastName.length === 0 ||
    //             email.length === 0 ||
    //             password.length === 0 ||
    //             confirmPassword.length === 0
    //           }
    //         />
    //         <View>
    //           <Text style={[tw("text-center py-2"), { fontSize: 15 }]}>
    //             Already have an account ?{" "}
    //             <Text onPress={switchToSignIn} style={{ color: "#19e266" }}>
    //               Sign In
    //             </Text>
    //           </Text>
    //         </View>

    //         <View>
    //           <Text style={[tw("text-center py-2"), { fontSize: 15 }]}>
    //             Want to validate your account ?{" "}
    //             <Text onPress={switchToValidate} style={{ color: "#19e266" }}>
    //               Validate
    //             </Text>
    //           </Text>
    //         </View>

    //         <Toast />
    //       </View>
    //     </TouchableWithoutFeedback>
    //   </SafeAreaView>
    // </KeyboardAvoidingView> */}
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  signup: {
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
