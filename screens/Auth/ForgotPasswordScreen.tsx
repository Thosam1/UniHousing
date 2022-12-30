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
    forgotPassword(email).then((res) => {
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
  }

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
                Forgot Password
              </Text>
            </View>

            <View style={[{ paddingVertical: 12 }]}>
              <Text
                style={[
                  tw("text-center"),
                  { paddingVertical: 12, fontSize: 15 },
                ]}
              >
                "Treat your password like your toothbrush. Don't let anybody
                else use it, and get a new one every six months."
                <Text style={{ fontStyle: "italic" }}>
                  {"   "}Clifford Stoll
                </Text>
              </Text>
            </View>

            <TextInput
              placeholder="Email"
              style={[tw("py-6")]}
              value={email}
              onChangeText={setEmail}
            />

            <Button
              title="Send Recovery Email"
              style={[tw("py-2 px-4"), { width: 400 }]}
              disabled={email.length === 0}
              onPress={sendRecoveryEmail}
              loading={loading}
            />

<View>
              <Text style={[tw("text-center py-2"), { fontSize: 15 }]}>
                Already received verification code ?{" "}
                <Text onPress={switchToResetPassword} style={{ color: "#19e266" }}>
                  Validate
                </Text>
              </Text>
            </View>

            <Toast />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
