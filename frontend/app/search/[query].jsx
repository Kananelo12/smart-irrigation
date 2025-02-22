import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from "expo-router";

const Query = () => {
    const { query } = useLocalSearchParams();
  return (
    <View>
      <Text>Query {query}</Text>
    </View>
  )
}

export default Query