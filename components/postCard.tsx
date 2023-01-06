import { View, Text } from 'react-native'
import React from 'react'

type PostCardProps = {
  id: string,
  // mainImageURL: string,
  title: string,
  description: string,
  city: string,
  country: string,
  startDate: string,
  endDate: string,
  price: string,
}

const PostCard = (props: PostCardProps) => {
  return (
    <View>
      <Text>{props.title}</Text>
      <Text>{props.city}, {props.country}</Text>
      <Text>{props.price}</Text>
    </View>
  )
}

export default PostCard