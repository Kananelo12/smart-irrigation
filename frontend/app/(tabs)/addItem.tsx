import React, { useState } from "react";
import {View, Text, TextInput, ScrollView, Image} from "react-native";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import icons from "@/constants/icons";

const AddItem = () => {
    const [cropName, setCropName] = useState("");
    const [temperature, setTemperature] = useState("");
    const [moisture, setMoisture] = useState("");
    const [humidity, setHumidity] = useState("");

    const handleSave = () => {
        console.log({
            cropName,
            temperature,
            moisture,
            humidity,
        });
        // Add your save logic here
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView className="flex-1 bg-white px-3 py-8 shadow-md rounded-lg">

                    <View className="flex-row items-center gap-5 mt-1 px-3">
                        <Image source={icons.backArrow} className="w-8 h-8" />
                        <Text className="font-rubik-semibold text-xl mt-1">
                           Add Crop Details
                        </Text>
                    </View>

                    <ThemedView className=" px-3">
                    {/* Input: Crop Name */}
                    <ThemedView className="mb-6 mt-10 px-3">
                        <InputField
                            label="Crop Name"
                            className="border border-gray-300 rounded-md bg-gray-50 px-4 py-3 text-gray-800 shadow-sm"
                            value={cropName}
                            onChangeText={setCropName}
                        />
                    </ThemedView>

                    {/* Input: Expected Temperature */}
                    <ThemedView className="mb-6">
                        <InputField
                            label="Expected Temperature (°C)"
                            className="border border-gray-300 rounded-md bg-gray-50 px-4 py-3 text-gray-800 shadow-sm"
                            keyboardType="numeric"
                            value={temperature}
                            onChangeText={setTemperature}
                        />
                    </ThemedView>

                    {/* Input: Expected Moisture */}
                    <ThemedView className="mb-6">
                        <InputField
                            label="Expected Moisture (%)"
                            className="border border-gray-300 rounded-md bg-gray-50 px-4 py-3 text-gray-800 shadow-sm"
                            keyboardType="numeric"
                            value={moisture}
                            onChangeText={setMoisture}
                        />
                    </ThemedView>

                    {/* Input: Expected Humidity */}
                    <ThemedView className="mb-6">
                        <InputField
                            label="Expected Humidity (%)"
                            className="border border-gray-300 rounded-md bg-gray-50 px-4 py-3 text-gray-800 shadow-sm"
                            keyboardType="numeric"
                            value={humidity}
                            onChangeText={setHumidity}
                        />
                    </ThemedView>
                        </ThemedView>
                    {/* Save Button */}
                    <ThemedView className="mt-8 px-3 ">
                        <CustomButton
                            title="Add Crop"
                            handlePress={handleSave}
                        />
                    </ThemedView>


            </ScrollView>
        </SafeAreaView>
    );
};

export default AddItem;
