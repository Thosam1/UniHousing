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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigator/AuthNavigator";

import { validateEmailVerification } from "../../utils/client_side_validation/auth_validation";
import Toast from "react-native-toast-message";
import { verifyEmail } from "../../api/auth/auth";

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "EmailVerification"
>;

const EmailVerificationScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const [verificationCode, setVerificationCode] = useState("");
  const [userID, setUserID] = useState("");
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateVerificationCode = () => {
    setLoading(true);
    Keyboard.dismiss();

    // Perform client-side verification
    const emailVerificationValidation: [boolean, string] =
      validateEmailVerification(userID, verificationCode);

    if (emailVerificationValidation[0] === false) {
      Toast.show({
        type: "error",
        text1: emailVerificationValidation[1],
      });
      setLoading(false);
      return;
    }

    // send request to the server
    let failed = false;
    verifyEmail(userID, verificationCode)
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
    setVerificationCode("");
    setFailed(false);
    setLoading(false);
  };

  const switchToSignUp = () => {
    Keyboard.dismiss();
    resetAllFields();
    navigation.navigate("SignUp");
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
                  Register : Verification
                </Text>
              </View>
              <Image
                source={require("../../assets/images/login_image.png")}
                style={[{ height: 300, width: 300 }]}
                PlaceholderContent={<ActivityIndicator />}
              />

              <Block middle>
                <Text gray caption center>
                  We sent you a verification code at your address mail
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
                <Button
                  gradient
                  onPress={validateVerificationCode}
                  disabled={verificationCode.length < 1 || userID.length < 1}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text bold white center>
                      Validate Email
                    </Text>
                  )}
                </Button>

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
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EmailVerificationScreen;

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
