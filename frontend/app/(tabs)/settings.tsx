import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { router } from "expo-router";

const Settings = () => {
  // TODO: modify to handle actual logic
  const handleLogout = () => {
    router.push("/");
  };

  return (
    <SafeAreaView className="bg-white flex-1 px-6">
      <ScrollView className="bg-white flex-1">
        <View className="w-full mt-7">
          <Text className="font-rubik-semibold text-xl mt-1">Settings</Text>
        </View>

        <View className="flex-col gap-4 mt-7">
          <View className="flex-row items-center gap-3">
            <Image source={icons.person} className="w-7 h-7" />
            <Text className="font-rubik text-lg mt-1">Account</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Image source={icons.bell} className="w-7 h-7" />
            <Text className="font-rubik text-lg mt-1">Notifications</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Image source={icons.language} className="w-7 h-7" />
            <Text className="font-rubik text-lg mt-1">Language</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Image source={icons.moonLine} className="w-7 h-7" />
            <Text className="font-rubik text-lg mt-1">Dark mode</Text>
            {/* TODO: Implement toggle button */}
          </View>
          <View className="w-full my-6 h-[1px] bg-[#E2E2E2]"></View>
          <View className="flex-row items-center gap-3">
            <Image source={icons.helpOutline} className="w-7 h-7" />
            <Text className="font-rubik text-lg mt-1">Help</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Image source={icons.feedbackOutline} className="w-7 h-7" />
            <Text className="font-rubik text-lg mt-1">Report a problem</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Image source={icons.dataUsage} className="w-7 h-7" />
            <Text className="font-rubik text-lg mt-1">Term of use</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Image source={icons.policyOutline} className="w-7 h-7" />
            <Text className="font-rubik text-lg mt-1">Privacy Policy</Text>
          </View>
          <View className="w-full my-6 h-[1px] bg-[#E2E2E2]"></View>
          <View className="flex-row items-center gap-3">
            <Image source={icons.logout} tintColor="#F56565" className="w-7 h-7" />
            <Text className="font-rubik text-lg mt-1 text-danger-500" onPress={handleLogout}>Log out</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Image source={icons.stackLine} className="w-7 h-7" />
            <Text className="font-rubik text-lg mt-1">Version 1.0.0 Build 123</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
