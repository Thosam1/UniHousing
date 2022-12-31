import { View, Text } from 'react-native'
import React from 'react'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../../navigator/TabNavigator';

type CreateScreenNavigationProp = BottomTabScreenProps<TabStackParamList, "Profile">;

const CreateScreen = () => {
  return (
    <View>
      <Text>CreateScreen</Text>
    </View>
  )
}

export default CreateScreen