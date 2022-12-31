import { View, Text } from 'react-native'
import React from 'react'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../../navigator/TabNavigator';

type SettingsScreenNavigationProp = BottomTabScreenProps<TabStackParamList, "Settings">;

const SettingsScreen = () => {
  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  )
}

export default SettingsScreen