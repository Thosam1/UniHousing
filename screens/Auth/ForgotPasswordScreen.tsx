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

import { validateForgotPassword } from "../../utils/client_side_validation/auth_validation";
import Toast from "react-native-toast-message";
import { forgotPassword } from "../../api/auth/auth";

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ForgotPassword"
>;

type forgotPasswordObject = {
  serverError: "Something went wrong, please try again !";
  alreadySent: "Oups, we already sent you a recovery link, check your inbox !";
};

const ForgotPasswordScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRecoveryEmail = () => {
    setLoading(true);
    Keyboard.dismiss();

    // Perform client-side verification
    const forgotPasswordValidation: [boolean, string] =
      validateForgotPassword(email);

    if (forgotPasswordValidation[0] === false) {
      Toast.show({
        type: "error",
        text1: forgotPasswordValidation[1],
      });
      setLoading(false);
      return;
    }

    // send request to the server
    // send request to the server
    let failed = false;
    forgotPassword(email)
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
    navigation.navigate("ResetPassword");
    return;
  };

  const resetAllFields = () => {
    setEmail("");
    setLoading(false);
  };

  const switchToResetPassword = () => {
    Keyboard.dismiss();
    resetAllFields();
    navigation.navigate("ResetPassword");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={[styles.container]}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Block padding={[0, theme.sizes.base * 2]}>
              <View style={{ paddingTop: 30 }}>
                <Text center h1 bold>
                  Forgot Password
                </Text>
              </View>
              <Image
                source={require("../../assets/images/login_image.png")}
                style={[{ height: 300, width: 300 }]}
                PlaceholderContent={<ActivityIndicator />}
              />

              <Block middle>
                <Text gray caption center>
                  "Treat your password like your toothbrush. Don't let anybody
                  else use it, and get a new one every six months."
                  <Text gray caption center style={{ fontStyle: "italic" }}>
                    {"   "}Clifford Stoll
                  </Text>
                </Text>

                <Input
                  label="Email"
                  style={[styles.input]}
                  onChangeText={(text: string) => setEmail(text)}
                />

                <Button
                  gradient
                  onPress={sendRecoveryEmail}
                  disabled={email.length === 0}
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
                    Already received verification code ?{" "}
                    <Text
                      caption
                      center
                      onPress={switchToResetPassword}
                      style={{
                        color: "#19e266",
                        textDecorationLine: "underline",
                      }}
                    >
                      Reset Password
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

export default ForgotPasswordScreen;

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
