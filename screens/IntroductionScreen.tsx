import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";

const IntroductionScreen = () => {
  const tw = useTailwind();

  return (
    <View>
      <Text>IntroductionScreen</Text>
    </View>
  );
};

export default IntroductionScreen;
