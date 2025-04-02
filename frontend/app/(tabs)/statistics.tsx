import React, { useState } from "react";
import {
    Image,
    FlatList,
    TouchableOpacity,
    Platform,
    StatusBar,
    Text,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import icons from "@/constants/icons";
import { crops } from "@/constants/data";
import SearchBox from "@/components/SearchBox";
import { router } from "expo-router";

// Adjust padding for iOS status bar
const topPadding = Platform.OS === "ios" ? 20 : StatusBar.currentHeight || 0;

// CropCard Component
const CropCard = ({ item, handleDelete }: { item: any; handleDelete: (id: string) => void }) => {
    const navigation = useNavigation();

    return (
        <View className="px-3 py-1">
            <View className="w-full bg-white flex-row items-start justify-between shadow-lg rounded-lg py-5 px-3 mt-5">
                {/* Crop Icon */}
                <View className="items-center justify-center bg-primary-200 w-[50px] h-[50px] rounded-full">
                    <Image source={item.icon} className="w-8 h-8" />
                </View>

                {/* Crop Details */}
                <View className="flex-1 ml-3">
                    <Text className="font-rubik-medium text-lg mb-1">{item.name}</Text>
                    <Text className="font-rubik text-base">
                        {item.landUsed} of land used ({item.period})
                    </Text>
                </View>

                {/* View Details Button */}
                <TouchableOpacity
                    className="bg-primary-300 px-4 py-2 rounded-lg mr-2"
                    onPress={() => router.push("/(tabs)/addItem")}
                >
                    <Text className="text-white">View Details</Text>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Image source={item.deleteIcon} className="w-6 h-6" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Statistics Component
const Statistics = () => {
    const [searchText, setSearchText] = useState("");
    const [cropList, setCropList] = useState(crops);

    // Delete handling
    const handleDelete = (id: string) => {
        const updatedCrops = cropList.filter((crop) => crop.id !== id);
        setCropList(updatedCrops);
    };

    // Filter crops based on search
    const filteredCrops = cropList.filter((crop) =>
        crop.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <SafeAreaView className="flex-1 bg-white px-3">
            {/* Header */}
            <View className="flex-row items-center gap-5 mt-7 px-3">
                <TouchableOpacity onPress={() => router.push("/home")}>
                    <Image source={icons.backArrow} className="w-8 h-8" />
                </TouchableOpacity>
                <Text className="font-rubik-semibold text-xl mt-1">
                    My Farm
                </Text>
            </View>

            {/* Search Bar */}
            <SearchBox placeholder="Search for crop stats" />

            {/* Toggle Buttons */}
            <View className="flex-row justify-between mt-5 px-4">
                <View className=" py-2 rounded-lg">
                    <Text className="font-rubik text-lg text-black-300">All Crops</Text>
                </View>
                <TouchableOpacity
                    className="border border-gray-300 px-4 py-2 rounded-md"
                    onPress={() => router.push("/addItem")}
                >
                    <Text className="text-gray-500">Add Crops</Text>
                </TouchableOpacity>
            </View>

            {/* Crop List */}
            <FlatList
                data={filteredCrops}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CropCard item={item} handleDelete={handleDelete} />
                )}
                className="mt-5"
                ListEmptyComponent={
                    <Text className="text-gray-500 text-center mt-5">
                        No crops found
                    </Text>
                }
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