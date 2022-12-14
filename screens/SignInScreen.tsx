/* This is the screen we show if the user isn't signed in already (we couldn't find a token). */
import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";

const SignInScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, isLoading] = useState(false);


  // method when signing in
  // const signIn = async (credentials: signInCredentials) => {
  // };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => console.log("hi")} />
    </View>
  );
};

export default SignInScreen;
