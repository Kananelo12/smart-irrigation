import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import images from "@/constants/images";

// TODO: THIS IS THE WELCOME PAGE | ONBOARDING
export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <View className="w-full justify-center items-center h-[50%]">
            <Image
              source={images.onboarding}
            />
          </View>
          <View className="w-full h-[50%] bg-white rounded-t-full">

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
