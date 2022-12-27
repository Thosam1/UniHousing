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

import { validateEmailVerification } from "../utils/client_side_validation/auth_validation";
import Toast from "react-native-toast-message";
import { verifyEmail } from "../api/auth/auth";

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "EmailVerification"
>;

const EmailVerificationScreen = () => {
  const tw = useTailwind();
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
    verifyEmail(userID, verificationCode).then((res) => {
      if(res.status === 200) {
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
    }).catch((err) => console.log(err))

    setLoading(false);
    if(failed) return;

    resetAllFields();
    navigation.navigate("SignIn"); // todo change it so that it automatically dispatch to the home screen
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
                Register : Verification
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
              placeholder="User id"
              style={[tw("py-6")]}
              value={userID}
              onChangeText={setUserID}
            />

            <TextInput
              placeholder="Verification code"
              style={[tw("py-6")]}
              value={verificationCode}
              onChangeText={setVerificationCode}
            />

            <Button
              title="Validate email"
              style={[tw("py-2 px-4"), { width: 400 }]}
              disabled={verificationCode.length < 1 || userID.length < 1}
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

export default EmailVerificationScreen;
