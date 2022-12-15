/* This is the screen we show if the user isn't signed in already (we couldn't find a token). */
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigator/AuthNavigator";

type IntroductionSignUpScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

const SignUpScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<IntroductionSignUpScreenNavigationProp>();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, isLoading] = useState(false);

  // method when signing in
  // const signIn = async (credentials: signInCredentials) => {
  // };

  const switchToSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView>
      <View style={tw("flex items-center")}>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign in" onPress={() => console.log("hi")} />

        <Text style={tw("text-center")}>
          Already have an account ? <Text onPress={switchToSignIn}>Sign In</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
