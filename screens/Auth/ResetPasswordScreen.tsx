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

import { Button, Image } from "@rneui/themed";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigator/AuthNavigator";

import { validateResetPassword } from "../../utils/client_side_validation/auth_validation";
import Toast from "react-native-toast-message";
import { resetForgotPassword } from "../../api/auth/auth";

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ResetPassword"
>;

const ResetPasswordScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const [userID, setUserID] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const resetPassword = () => {
    setLoading(true);
    Keyboard.dismiss();

    // Perform client-side verification
    const resetPasswordValidation: [boolean, string] = validateResetPassword(
      userID,
      verificationCode,
      password,
      confirmPassword
    );

    if (resetPasswordValidation[0] === false) {
      Toast.show({
        type: "error",
        text1: resetPasswordValidation[1],
      });
      setLoading(false);
      return;
    }

    // send request to the server
    let failed = false;
    resetForgotPassword(userID, verificationCode, password, confirmPassword)
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
    navigation.navigate("SignIn"); // todo change it so that it automatically dispatch to the home screen
    return;
  };

  const resetAllFields = () => {
    setConfirmPassword("");
    setPassword("");
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
              source={require("../../assets/images/login_image.png")}
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
                Reset Password
              </Text>
            </View>

            <View style={[{ paddingVertical: 12 }]}>
              <Text
                style={[
                  tw("text-center"),
                  { paddingVertical: 12, fontSize: 15 },
                ]}
              >
                Check your mailbox and fill below with the id and verification
                code received :
              </Text>
            </View>
            <TextInput
              placeholder="Id received"
              style={[tw("py-6")]}
              value={userID}
              onChangeText={setUserID}
            />
            <TextInput
              placeholder="Verification code received"
              style={[tw("py-6")]}
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
            <TextInput
              placeholder="New password"
              style={[tw("py-6")]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              placeholder="Confirm new password"
              style={[tw("py-6")]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <Button
              title="Reset Password"
              style={[tw("py-2 px-4"), { width: 400 }]}
              disabled={password.length === 0 || confirmPassword.length === 0}
              onPress={resetPassword}
              loading={loading}
            />

            <Toast />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;
