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

import { validateForgotPasswordVerify } from "../utils/client_side_validation/auth_validation";
import Toast from "react-native-toast-message";

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ForgotPasswordVerify"
>;

const ForgotPasswordVerifyScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const [verificationCode, setVerificationCode] = useState("");
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateVerificationCode = () => {
    setLoading(true);
    Keyboard.dismiss();

    // Perform client-side verification
    const forgotPasswordVerifyValidation: [boolean, string] =
      validateForgotPasswordVerify(verificationCode);

    if (forgotPasswordVerifyValidation[0] === false) {
      Toast.show({
        type: "error",
        text1: forgotPasswordVerifyValidation[1],
      });
      setLoading(false);
      return;
    }

    // send request to the server
    const serverResponse: [boolean, string] = [true, "server message"];

    if (!serverResponse[0]) {
      Toast.show({
        type: "error",
        text1: serverResponse[1],
      });
      setFailed(true); // already sent an email to this address
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
    navigation.navigate("ResetPassword");
    return;
  };

  const resetAllFields = () => {
    setVerificationCode("");
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
                Forgot Password : Verification
              </Text>
            </View>

            <View style={[{ paddingVertical: 12 }]}>
              <Text
                style={[
                  tw("text-center"),
                  { paddingVertical: 12, fontSize: 15 },
                ]}
              >
                We sent you a verification code at your address mail :
              </Text>
            </View>

            <TextInput
              placeholder="Verification code"
              style={[tw("py-6")]}
              value={verificationCode}
              onChangeText={setVerificationCode}
            />

            <Button
              title="Send Recovery Email"
              style={[tw("py-2 px-4"), { width: 400 }]}
              disabled={verificationCode.length !== 9}
              onPress={validateVerificationCode}
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

export default ForgotPasswordVerifyScreen;
