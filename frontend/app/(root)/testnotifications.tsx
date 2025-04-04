import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNotification } from "@/libs/NotificationContext";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestNotifications() {
  const { expoPushToken, notification, error } = useNotification();

  if (error) {
    return (
      <SafeAreaView className="bg-white flex-1 justify-center items-center">
        <ActivityIndicator color="#00BF7C" size="large" />
        <Text className="text-base text-black-300 mt-3">{error.message}</Text>
      </SafeAreaView>
    );
  }

  console.log(JSON.stringify(notification, null, 2));
  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedText type="subtitle">Your push token:</ThemedText>
        <ThemedText>{expoPushToken}</ThemedText>
        <ThemedText type="subtitle">Latest notification:</ThemedText>
        <ThemedText>{notification?.request.content.title}:</ThemedText>
        <ThemedText>
          {JSON.stringify(notification?.request.content.data, null, 2)}:
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}
