import { View, Text } from 'react-native'
import React from 'react'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../../navigator/TabNavigator';

type SearchScreenNavigationProp = BottomTabScreenProps<TabStackParamList, "Search">;

const SearchScreen = () => {
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  )
}

export default SearchScreen