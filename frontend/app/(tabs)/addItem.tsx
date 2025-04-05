import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import icons from "@/constants/icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { Crop } from "@/types/type"; // Ensure Crop type is defined appropriately

interface Option {
  label: string;
  value: string; // We'll store crop.id as a string
}

const AddItem = () => {
  // State for selected cropId (as string)
  const [selectedCropId, setSelectedCropId] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [moisture, setMoisture] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");

  // Store full crop data from API
  const [cropData, setCropData] = useState<Crop[]>([]);
  // Options for Picker: label = crop name, value = crop.id as string
  const [cropOptions, setCropOptions] = useState<Option[]>([]);

  // Function to call assignCropToUser endpoint
  const assignCropToUser = async () => {
    if (!selectedCropId) {
      Alert.alert("Error", "Please select a crop first.");
      return;
    }

    try {
      // Build the URL with query parameter
      const url = `http://192.168.104.178:8080/api/assignCropToUser?cropId=${selectedCropId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const responseText = await response.text();
      if (response.ok) {
        Alert.alert("Success", responseText);
        const results = await fetch(
          "http://192.168.104.178:8080/api/storeSensorData",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (results.ok) {
          Alert.alert("Success", "Sensor data stored successfully.");
        } else {
          Alert.alert("Error", "Failed to store sensor data.");
        }
      } else {
        Alert.alert("Error", responseText);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to assign crop. Please try again.");
      console.error("Error assigning crop to user:", error);
    }
  };

  // Fetch crop data when component mounts
  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await fetch(
          "http://192.168.104.178:8080/api/getAllCrops"
        );
        if (response.ok) {
          const data: Crop[] = await response.json();
          setCropData(data);

          // Map each crop to an Option: label = name, value = id as string
          const options: Option[] = data.map((crop) => ({
            label: crop.name,
            value: crop.id.toString(),
          }));
          setCropOptions(options);
        } else {
          console.error("Failed to fetch crop data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching crop data:", error);
      }
    };

    fetchCropData();
  }, []);

  // When a crop is selected, update the input fields using the selected crop's id
  useEffect(() => {
    if (!selectedCropId) {
      setTemperature("");
      setMoisture("");
      setHumidity("");
      return;
    }
    const selectedCrop = cropData.find(
      (crop) => crop.id.toString() === selectedCropId
    );
    if (selectedCrop) {
      setTemperature(selectedCrop.temperatureRequirement.toString());
      setMoisture(selectedCrop.moistureRequirement.toString());
      setHumidity(selectedCrop.humidityRequirement.toString());
    } else {
      setTemperature("");
      setMoisture("");
      setHumidity("");
    }
  }, [selectedCropId, cropData]);

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

        <View className="px-3">
          {/* Picker: Select Crop */}
          <View className="mb-6 mt-10">
            <Text className="font-rubik text-base mb-2">Select Crop</Text>
            <View className="border border-gray-300 rounded-md bg-gray-50">
              <Picker
                selectedValue={selectedCropId}
                onValueChange={(value) => setSelectedCropId(value)}
                style={{ width: "100%", height: 50 }}
                dropdownIconColor="#000"
              >
                <Picker.Item label="Select Crop" value="" />
                {cropOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

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
        <View className="mt-8 px-3">
          <CustomButton title="Add Crop" handlePress={assignCropToUser} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddItem;
