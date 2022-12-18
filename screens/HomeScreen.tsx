/* Home Screen : the screen we show if the user is already signed in. */
import { View, Text, Button } from 'react-native'
import React from 'react'
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';
import { AuthStackParamList } from '../navigator/AuthNavigator';

type HomeScreenNavigationProp = BottomTabScreenProps<TabStackParamList, 'Home'>;

const HomeScreen = () => {

  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const signOut = () => {

  };

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Sign Out" onPress={signOut}></Button>
    </View>
  )
}

export default HomeScreen