import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Button, Image } from "@rneui/themed";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigator/AuthNavigator";

type IntroductionScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>


const IntroductionScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<IntroductionScreenNavigationProp>();

  const switchToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const switchToSignUp = () => {
    navigation.navigate('SignUp');
  }

  return (
    <ScrollView>
      <View style={tw("flex items-center")}>
        <Image
          source={{ uri: "../images/authentification/girl_in_her_bed.png" }}
          // containerStyle={tw("w-full h-64")}
          style={{ width: 400, height: 400 }}
          PlaceholderContent={<ActivityIndicator />}
        />

        <Text style={tw("text-center")}>Find a room near your university, or sublet your room</Text>
        <Text style={tw("text-center")}>We believe that everyone should find a room to stay during their studies, we are here to help you get a room for your budget</Text>
        
        <Button title="Get Started" color="#307ff4" onPress={switchToSignIn}/>
      
        <Text style={tw("text-center")}>Don't have an account ? <Text onPress={switchToSignUp}>Sign Up</Text></Text>
      </View>
    </ScrollView>
  );
};

export default IntroductionScreen;
