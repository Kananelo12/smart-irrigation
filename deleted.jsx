<Picker
  selectedValue={selectedCropId}
  onValueChange={(value) => setSelectedCropId(value)}
  style={{ width: "100%", height: 50 }}
  dropdownIconColor="#000"
>
  <Picker.Item label="Select Crop" value="" />
  {cropOptions.map((option) => (
    <Picker.Item key={option.value} label={option.label} value={option.value} />
  ))}
</Picker>;

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

// When a crop is selected, update the input fields using the selected crop's id
// useEffect(() => {
//   if (!selectedCropId) {
//     setTemperature("");
//     setMoisture("");
//     setHumidity("");
//     return;
//   }
//   const selectedCrop = cropData.find(
//     (crop) => crop.id.toString() === selectedCropId
//   );
//   if (selectedCrop) {
//     setTemperature(selectedCrop.temperatureRequirement.toString());
//     setMoisture(selectedCrop.moistureRequirement.toString());
//     setHumidity(selectedCrop.humidityRequirement.toString());
//   } else {
//     setTemperature("");
//     setMoisture("");
//     setHumidity("");
//   }
// }, [selectedCropId, cropData]);

  // Fetch crop data when component mounts
  // useEffect(() => {
  //   const fetchCropData = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://192.168.70.120:8080/api/getAllCrops"
  //       );
  //       if (response.ok) {
  //         const data: Crop[] = await response.json();
  //         setCropData(data);

  //         // Map each crop to an Option: label = name, value = id as string
  //         const options: Option[] = data.map((crop) => ({
  //           label: crop.name,
  //           value: crop.id.toString(),
  //         }));
  //         setCropOptions(options);
  //       } else {
  //         console.error("Failed to fetch crop data:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching crop data:", error);
  //     }
  //   };

  //   fetchCropData();
  // }, []);

    // Function to call assignCropToUser endpoint
  // const assignCropToUser = async () => {
  //   if (!selectedCropId) {
  //     Alert.alert("Error", "Please select a crop first.");
  //     return;
  //   }

  //   try {
  //     // Build the URL with query parameter
  //     const url = `http://192.168.104.178:8080/api/assignCropToUser?cropId=${selectedCropId}`;
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const responseText = await response.text();
  //     if (response.ok) {
  //       Alert.alert("Success", responseText);
  //       const results = await fetch(
  //         "http://192.168.104.178:8080/api/storeSensorData",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       );

  //       if (results.ok) {
  //         Alert.alert("Success", "Sensor data stored successfully.");
  //       } else {
  //         Alert.alert("Error", "Failed to store sensor data.");
  //       }
  //     } else {
  //       Alert.alert("Error", responseText);
  //     }
  //   } catch (error) {
  //     Alert.alert("Error", "Unable to assign crop. Please try again.");
  //     console.error("Error assigning crop to user:", error);
  //   }
  // };