import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import icons from "@/constants/icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { Crop } from "@/types/type";

const AddItem = () => {

  interface Option {
    label: string;
    value: string;
  }

  const [cropName, setCropName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [moisture, setMoisture] = useState("");
  const [humidity, setHumidity] = useState("");

  const [cropData, setCropData] = useState<Crop[]>([]);
  const [cropOptions, setCropOptions] = useState<Option[]>([]);

  const handleSave = () => {
    console.log({
      cropName,
      temperature,
      moisture,
      humidity,
    });
    // Add your save logic here
  };

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await fetch(
          "http://192.168.211.178:8080/api/getAllCrops"
        );
        if (response.ok) {
          const data: Crop[] = await response.json();
          // Store full crop data
          setCropData(data);

          // Map the API data to the format needed by the Picker:
          // For example, we set label and value to the crop's name.
          const options: Option[] = data.map((crop: Crop): Option => ({
            label: crop.name,
            value: crop.name,
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

  // Update input fields when a crop is selected
  useEffect(() => {
    if (!cropName) return; // Prevents running when no crop is selected
    const selectedCrop = cropData.find((crop) => crop.name === cropName);
    if (selectedCrop) {
      setTemperature(selectedCrop.temperatureRequirement.toString());
      setMoisture(selectedCrop.moistureRequirement.toString());
      setHumidity(selectedCrop.humidityRequirement.toString());
    } else {
      setTemperature("");
      setMoisture("");
      setHumidity("");
    }
  }, [cropName, cropData]);

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
          {/* Input: Crop Name using Picker */}
          <View className="mb-6 mt-10">
            <Text className="font-rubik text-base mb-2">Select Crop</Text>
            <View className="border border-gray-300 rounded-md bg-gray-50">
              <Picker
                selectedValue={cropName}
                onValueChange={(value) => setCropName(value)}
                style={{ width: "100%", height: 50 }}
                dropdownIconColor="#000"
              >
                <Picker.Item label="Select Crop" value="" />
                {cropOptions.map((crop) => (
                  <Picker.Item
                    key={crop.value}
                    label={crop.label}
                    value={crop.value}
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
              // editable={false}
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
