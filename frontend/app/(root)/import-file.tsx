import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import NGROK_URL from "@/utils/ngrokConfig";

type DocumentPickerResult = {
  canceled: boolean;
  assets?: Array<{
    uri: string;
    name: string;
    size: number;
    mimeType?: string;
  }>;
};

type DocumentResultSuccess = {
  type: "success";
  uri: string;
  name: string;
  size: number;
};

type MyDocumentResult = DocumentResultSuccess | { type: "cancel" };

const ImportFile = () => {
  const [selectedFile, setSelectedFile] = useState<MyDocumentResult | null>(null);

  const pickFile = async () => {
    try {
      const result = (await DocumentPicker.getDocumentAsync({
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })) as DocumentPickerResult;

      console.log("DocumentPicker result:", result);

      if (result.canceled) {
        console.log("User canceled document picker");
        setSelectedFile({ type: "cancel" });
        return;
      }

      // Extract the first asset from the assets array
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        console.log("Selected file:", asset.uri);
        setSelectedFile({
          type: "success",
          uri: asset.uri,
          name: asset.name || "file.xlsx",
          size: asset.size,
        });
      } else {
        console.error("No assets returned from document picker");
      }
    } catch (err) {
      console.error("Error picking file:", err);
    }
  };

  const importCropData = async () => {
    if (!selectedFile || selectedFile.type === "cancel") {
      Alert.alert("No File Selected", "Please select an Excel file to import.");
      return;
    }

    const formData = new FormData();
    formData.append("File", {
      uri: selectedFile.uri,
      name: selectedFile.name,
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    } as any);

    try {
      const response = await fetch(`http://${NGROK_URL}/api/importExcel`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseText = await response.text();
      if (response.ok) {
        Alert.alert("Success", responseText);
      } else {
        Alert.alert("Error", responseText);
      }
    } catch (error) {
      console.error("Error importing file:", error);
      Alert.alert("Error", "Failed to import the file. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 20 }}>
        <TouchableOpacity
          onPress={pickFile}
          style={{ backgroundColor: "blue", padding: 10, marginBottom: 10 }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Select Excel File</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={importCropData}
          style={{ backgroundColor: "green", padding: 10 }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Upload & Import</Text>
        </TouchableOpacity>

        {selectedFile && selectedFile.type === "success" && (
          <Text style={{ marginTop: 10, textAlign: "center" }}>
            Selected File: {selectedFile.name}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ImportFile;
