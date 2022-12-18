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
import { AuthStackParamList } from "../navigator/AuthNavigator";

import { validateResetPassword } from "../utils/client_side_validation/auth_validation";
import Toast from "react-native-toast-message";

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ResetPassword"
>;

const ResetPasswordScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetPassword = () => {
    setLoading(true);
    Keyboard.dismiss();

    // Perform client-side verification
    const resetPasswordValidation: [boolean, string] = validateResetPassword(
      email,
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
    const serverResponse: [boolean, string] = [
      true,
      "server message : password for XXX has been reset successfully !",
    ];

    if (!serverResponse[0]) {
      Toast.show({
        type: "error",
        text1: serverResponse[1],
      });
      setFailed(true);
      setLoading(false);
      return;
    }

    // Everything went well
    Toast.show({
      type: "success",
      text1: serverResponse[1],
    });
    setFailed(false);
    setLoading(false);
    resetAllFields();
    navigation.navigate("SignIn"); // todo change it so that it automatically dispatch to the home screen
    return;
  };

  const resetAllFields = () => {
    setConfirmPassword("");
    setPassword("");
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
                Resetting password for : MAIL_ADDRESS_FROM_PROP
              </Text>
            </View>

            <TextInput
              placeholder="New password"
              style={[tw("py-6")]}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              placeholder="Confirm new password"
              style={[tw("py-6")]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <Button
              title="Reset Password"
              style={[tw("py-2 px-4"), { width: 400 }]}
              disabled={password.length === 0 || confirmPassword.length === 0}
              onPress={resetPassword}
              loading={loading}
            />

            {failed === true ? (
              <View>
                <Text
                  style={[
                    tw("text-center py-2"),
                    { fontSize: 15, color: "#e21966" },
                  ]}
                >
                  Something went wrong, please try again !
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

export default ResetPasswordScreen;
