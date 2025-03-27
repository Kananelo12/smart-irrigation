import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import {Image} from "react-native";

const CropCard = ({ item }: { item: any }) => {
    return (
        <View className="px-3 py-1">
            <View className="w-full bg-white flex-row items-center justify-between shadow-lg rounded-lg py-5 px-3 mt-5">
                <View className="items-center justify-center bg-primary-200 w-[50px] h-[50px] rounded-full">
                    <Image source={item.icon} className="w-8 h-8" />
                </View>
                <View className="flex-1 ml-3">
                    <Text className="font-rubik-medium text-lg mb-1">{item.name}</Text>
                    <Text className="font-rubik text-base">
                        {item.landUsed} of land used ({item.period})
                    </Text>
                </View>
                <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-lg">
                    <Text className="text-white">View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
