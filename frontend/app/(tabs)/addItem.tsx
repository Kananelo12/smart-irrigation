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
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";
import { Crop } from "@/types/type"; // Ensure Crop type is defined appropriately
import NGROK_URL from "@/utils/ngrokConfig";

interface Option {
  label: string;
  value: string; // We'll store crop.id as a string
}

const AddItem = () => {
  // dropdown state
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Option[]>([]);
  const [value, setValue] = useState<string>(""); // selected cropId

  // State for selected cropId (as string)
  const [temperature, setTemperature] = useState<string>("");
  const [moisture, setMoisture] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");

  // Store full crop data from API
  const [cropData, setCropData] = useState<Crop[]>([]);


  // assignCrop endpoint + then storeSensorData
  const assignCropToUser = async () => {
    if (!value) {
      Alert.alert("Error", "Please select a crop first.");
      return;
    }
    try {
      const response = await fetch(
        `${NGROK_URL}/api/assignCropToUser?cropId=${value}`,
        { method: "POST" }
      );

      const msg = await response.text();
      // if (!response.ok) throw new Error(msg);
      if (response.ok) {
         Alert.alert("Success", msg);
        const storeRes = await fetch(
          `${NGROK_URL}/api/storeSensorData`,
          { method: "POST"}
        );

        if (storeRes.ok) {
          Alert.alert("Success", "Sensor data stored successfully.");
        } else {
          Alert.alert("Error", "Failed to store sensor data.");
        }
      } else {
        Alert.alert("Error", msg);
      }

    } catch (error: any) {
      Alert.alert("Error", `Error assigning crop to user: ${error}`);
      console.error("Error", error.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${NGROK_URL}/api/getAllCrops`);
        if (!resp.ok) throw new Error(resp.statusText);
        const data: Crop[] = await resp.json();
        setCropData(data);
        setItems(
          data.map((c) => ({
            label: c.name,
            value: c.id.toString(),
          }))
        );
      } catch (error) {
        console.error("Failed to load crops:", error);
      }
    })();
  }, []);

  // when dropdown value changes, auto-fill
  useEffect(() => {
    if (!value) {
      setTemperature("");
      setMoisture("");
      setHumidity("");
      return;
    }
    const sel = cropData.find((c) => c.id.toString() === value);
    if (sel) {
      setTemperature(sel.temperatureRequirement.toString());
      setMoisture(sel.moistureRequirement.toString());
      setHumidity(sel.humidityRequirement.toString());
    }
  }, [value, cropData]);

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
          {/* DropDownPicker: Select Crop */}
          <View className="mb-6 mt-10">
            <Text className="font-rubik text-base mb-2">Select Crop</Text>
            <View className="border border-gray-300 rounded-md bg-gray-50">
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                // onPress={() => (
                //   Alert.alert("Crop ID:", value)
                // )}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select Crop"
                listMode="SCROLLVIEW"
                scrollViewProps={{ nestedScrollEnabled: true }}
              />
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
