import {
  View,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button, Block, Input, Text } from "../../components";
import { theme } from "../../constants";

import { Image } from "@rneui/themed";
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

  const resetPasswordButton = () => {
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
      style={styles.container}
    >
      <SafeAreaView style={[styles.container]}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Block padding={[0, theme.sizes.base * 2]}>
              <View style={{ paddingTop: 30 }}>
                <Text center h1 bold>
                  Reset Password
                </Text>
              </View>

              <Block center>
                <Image
                  source={require("../../assets/images/login_image.png")}
                  style={[{ height: 300, width: 300 }]}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </Block>

              <Block middle>
                <Text gray caption center>
                  Check your mailbox and fill below with the id and verification
                  code received
                </Text>
                <Input
                  label="User Id"
                  style={[styles.input]}
                  onChangeText={(text: string) => setUserID(text)}
                />
                <Input
                  label="Verification Code"
                  style={[styles.input]}
                  onChangeText={(text: string) => setVerificationCode(text)}
                />
                <Input
                  label="Password"
                  style={[styles.input]}
                  onChangeText={(text: string) => setPassword(text)}
                />
                <Input
                  label="Confirm Password"
                  style={[styles.input]}
                  onChangeText={(text: string) => setConfirmPassword(text)}
                />

                <Button
                  gradient
                  onPress={resetPasswordButton}
                  disabled={
                    password.length === 0 || confirmPassword.length === 0
                  }
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text bold white center>
                      Validate Email
                    </Text>
                  )}
                </Button>
              </Block>
              <Toast />
            </Block>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
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
