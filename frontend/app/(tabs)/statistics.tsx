import React, { useState } from "react";
import {
    Image, FlatList, TouchableOpacity,
    Platform, StatusBar, Text, View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { crops } from "@/constants/data";
import SearchBox from "@/components/SearchBox";
import {router} from "expo-router";

// Adjust padding for iOS status bar
const topPadding = Platform.OS === "ios" ? 20 : StatusBar.currentHeight || 0;

const CropCard = ({ item }: { item: any }) => {
    return (
        <View className="px-3 py-1">
            <View className="w-full bg-white flex-row items-start justify-between shadow-lg rounded-lg py-5 px-3 mt-5">
                <View className="items-center justify-center bg-primary-200 w-[50px] h-[50px] rounded-full">
                    <Image source={item.icon} className="w-8 h-8" />
                </View>
                <View className="flex-1 ml-3">
                    <Text className="font-rubik-medium text-lg mb-1">{item.name}</Text>
                    <Text className="font-rubik text-base">
                        {item.landUsed} of land used ({item.period})
                    </Text>
                </View>
                <TouchableOpacity className="bg-primary-300 px-4 py-2 rounded-lg">
                    <Text className="text-white">View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Statistics = () => {
    const [searchText, setSearchText] = useState("");

    // Filter crops based on search
    const filteredCrops = crops.filter((crop) =>
        crop.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <SafeAreaView className="flex-1 bg-white px-3">
            {/* Header */}
            <View className="flex-row items-center gap-5 mt-7 px-3">
                <Image source={icons.backArrow} className="w-8 h-8" />
                <Text className="font-rubik-semibold text-xl mt-1">
                    My Farm
                </Text>
            </View>


            {/* Search Bar */}
            <SearchBox placeholder="Search crop statistics.."/>

            {/* Toggle Buttons */}
            <View className="flex-row justify-between mt-5 px-4">
                <TouchableOpacity className="border border-primary-300 px-4 py-2 rounded-lg">
                    <Text>All Crops</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="border border-gray-300 px-4 py-2 rounded-lg"
                    onPress={() => router.push("/(tabs)/addItem")}
                >
                    <Text className="text-gray-500">Add Crops</Text>
                </TouchableOpacity>
            </View>

            {/* Crop List */}
            <FlatList
                data={filteredCrops.length > 0 ? filteredCrops : []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CropCard item={item} />}
                className="mt-5"
            />

            {/* Bottom Section with Refresh Button */}
            <View className="flex-row justify-between px-4 mt-10">
                <Text className="text-gray-500">All crops</Text>
                <TouchableOpacity onPress={() => setSearchText("")} className="p-2">
                    <Text className="text-[#3b82f6]">Refresh</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Statistics;
