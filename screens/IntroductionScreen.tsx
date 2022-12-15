import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Button, Image } from "@rneui/themed";

import girl_in_her_bed from '../images/authentification/'

const IntroductionScreen = () => {
  const tw = useTailwind();

  const switchToLogin = () => {

  }

  return (
    <View>
      <Image
        source={{ uri: "../images/authentification/girl_in_her_bed.png" }}
        containerStyle={tw("w-full h-64")}
        // PlaceholderContent={<ActivityIndicator />}
      />
      <Button title="Get Started" color="#307ff4" />
    </View>
  );
};

export default IntroductionScreen;
