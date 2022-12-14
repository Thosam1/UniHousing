/* Home Screen : the screen we show if the user is already signed in. */
import { View, Text, Button } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  
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