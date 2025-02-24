import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { notifications } from "@/constants/data";

const NotificationCard = ({ item }: { item: any }) => {
  return (
    <View className="px-3 py-1">
      <View className="w-full bg-white flex-row items-start justify-between gap-5 shadow-lg rounded-lg py-5 px-3 mt-5">
        <View className="items-center justify-center bg-primary-200 w-[50px] h-[50px] rounded-full">
          <Image
            source={icons.bellOutline}
            tintColor={"#00bF7C"}
            className="w-8 h-8"
          />
        </View>
        <View className="border border-white">
          <Text className="font-rubik-medium text-lg mb-1">{item.title}</Text>
          <Text className="font-rubik text-base">{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

const Notifications = () => {
  return (
    <SafeAreaView className="bg-white flex-1 px-3">
        <View className="flex-row items-center gap-5 mt-7 px-3">
          <Image source={icons.backArrow} className="w-8 h-8" />
          <Text className="font-rubik-semibold text-xl mt-1">
            Notifications
          </Text>
        </View>

        <View className="w-full mt-6">
          <View className="flex-row items-center justify-between px-3">
            <Text className="font-rubik text-black-200">Today</Text>
            <Text className="font-rubik text-black-200">Clear all</Text>
          </View>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <NotificationCard item={item} />}
          />
        </View>
    </SafeAreaView>
  );
};

export default Notifications;
