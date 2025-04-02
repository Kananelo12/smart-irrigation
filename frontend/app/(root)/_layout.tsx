import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="import-file" options={{ headerShown: false}} />
    </Stack>
  )
}

export default RootLayout