import React, { useState } from "react";
import {View, Text, TextInput, ScrollView, Image, TouchableOpacity} from "react-native";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import icons from "@/constants/icons";
import { Picker } from "@react-native-picker/picker";
import {ThemedView} from "@/components/ThemedView";
import {router} from "expo-router";

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
// Sample crop names for the dropdown
  const cropOptions = [
    { label: "Select Crop", value: "" },
    { label: "Cabbage", value: "Cabbage" },
    { label: "Tomatoes", value: "Tomatoes" },
    { label: "Spinach", value: "Spinach" },
  ];

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-white px-3 py-8 shadow-md rounded-lg">
        <View className="flex-row items-center gap-5 px-3">
          <TouchableOpacity onPress={() => router.push("/statistics")}>
            <Image source={icons.backArrow} className="w-8 h-8" />
          </TouchableOpacity>
          <Text className="font-rubik-semibold text-xl mt-1">
           Add Crop Details
          </Text>
        </View>


        <View className=" px-3">
          {/* Input: Crop Name */}
          <ThemedView className="mb-6 mt-10">
            <Text className="font-rubik text-base mb-2">Select Crop</Text>
            <View className="border border-gray-300 rounded-md bg-gray-50">
              <Picker
                  selectedValue={cropName}
                  onValueChange={(value) => setCropName(value)}
                  style={{ width: "100%", height: 50 }}
              >
                {cropOptions.map((crop) => (
                    <Picker.Item
                        key={crop.value}
                        label={crop.label}
                        value={crop.value}
                    />
                ))}
              </Picker>
            </View>
          </ThemedView>

          {/* Input: Expected Temperature */}
          <View className="mb-6">
            <InputField
              label="Expected Temperature (°C)"
              className="border border-gray-300 rounded-md bg-gray-50 px-4 py-3 text-gray-800 shadow-sm"
              keyboardType="numeric"
              value={temperature}
              onChangeText={setTemperature}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>

          {/* Input: Expected Moisture */}
          <View className="mb-6">
            <InputField
              label="Expected Moisture (%)"
              className="border border-gray-300 rounded-md bg-gray-50 px-4 py-3 text-gray-800 shadow-sm"
              keyboardType="numeric"
              value={moisture}
              onChangeText={setMoisture}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>

          {/* Input: Expected Humidity */}
          <View className="mb-6">
            <InputField
              label="Expected Humidity (%)"
              className="border border-gray-300 rounded-md bg-gray-50 px-4 py-3 text-gray-800 shadow-sm"
              keyboardType="numeric"
              value={humidity}
              onChangeText={setHumidity}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </View>
        {/* Save Button */}
        <View className="mt-8 px-3 ">
          <CustomButton title="Add Crop" handlePress={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddItem;
