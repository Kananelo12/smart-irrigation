import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import images from "@/constants/images";
import icons from "@/constants/icons";
import SearchBox from "@/components/SearchBox";
import tw from "tailwind-react-native-classnames";
import { useWeather } from "@/libs/WeatherProvider";
import { WeatherData, isDaytime } from "@/utils/weatherUtils";
import { SensorData } from "@/types/type";
import NGROK_URL from "@/utils/ngrokConfig";

const Home = () => {
  const { weather, loading } = useWeather();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [loadingSensorData, setLoadingSensorData] = useState(true);

  const fetchSensorData = async () => {
    try {
      // fetch simulation data
      const response = await fetch(
        `${NGROK_URL}/api/irrigateData`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSensorData(data);
        console.log("\n\nSensor data:", data); // TODO: REMOVE THIS LOG
      } else {
        const errorMessage = await response.text();
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      Alert.alert("Error", `Something went wrong ${error}`);
      console.error("Error fetching simulation data:", error);
      
    } finally {
      setLoadingSensorData(false);
    }
  };

  const dataThreshold = {
    humidity: 50,
    moisture: 50,
    temperature: 50,
  };

  const findBorderColor = (value: number, threshold: number): string => {
    // if value is very low as compared to the threshold, return blue
    if (value < threshold * 0.5) {
      return "#00bfff";
    }
    // if it is very high, return red
    else if (value > threshold * 1.5) {
      return "#FF2222";
    }
    // if it is in the middle, return green
    else {
      return "#00BF7C";
    }
  };

  const defaultBorder = "#800080";
  const humidityBorderColor = sensorData
    ? findBorderColor(sensorData.humidity || 0, dataThreshold.humidity)
    : defaultBorder;
  const mositureBorderColor = sensorData
    ? findBorderColor(sensorData.moisture || 0, dataThreshold.moisture)
    : defaultBorder;
  const tempBorderColor = sensorData
    ? findBorderColor(sensorData.temperature || 0, dataThreshold.temperature)
    : defaultBorder;
  console.log("\n\nhumidityBorderColor", humidityBorderColor);
  console.log("mositureBorderColor", mositureBorderColor);
  console.log("tempBorderColor", tempBorderColor);

  useEffect(() => {
    fetchSensorData();

    // poll for sensor data every 5 seconds
    const intervalId = setInterval(fetchSensorData, 1800000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView className="bg-[#F6F8FA] h-full">
      <View className="px-6">
        <View className="flex flex-row items-center justify-between mt-7">
          <View className="flex flex-row items-center">
            <Image
              source={images.farmerPic}
              className="size-14 rounded-full"
              resizeMode="contain"
            />
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-sm font-rubik text-black-100">
                Good Morning
              </Text>
              <Text className="text-lg font-rubik-medium text-black-300">
                Profile Username
              </Text>
            </View>
          </View>
          <View className="bg-white w-12 h-12 items-center justify-center rounded-full">
            <Image
              source={icons.darkMode}
              className="size-6"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* search box component */}
        <SearchBox placeholder="Search for crop stats" />

        {/* Weather information */}
        <View className="w-full flex flex-col mt-7 relative mb-36">
          {/* Gradient Background View */}
          <LinearGradient
            colors={["#54C1F6", "#2A9EF0"]} // from your previous stops
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 1.3 }}
            style={[tw`rounded-3xl`, { overflow: "hidden" }]} // using tailwind classes with an extra style
            className="flex-row w-full h-[165px] items-center justify-between shadow-2xl rounded-3xl z-10"
          >
            <View>
              {/* Render the day icon if weather data exists */}
              {/* is valid (i.e., not an error string), */}
              {/* and the current time falls between sunrise and sunset (indicating daytime); otherwise, render the night icon */}
              {weather &&
              typeof weather !== "string" &&
              isDaytime(
                weather.currentTime,
                weather.sunrise,
                weather.sunset
              ) ? (
                <Image source={images.weather} className="size-56" />
              ) : (
                <Image source={images.weatherDark} className="size-56" />
              )}
            </View>
            <View className="flex-col mr-12">
              <Text className="font-rubik-medium text-xl text-white">
                Today
              </Text>
              <Text className="font-rubik-bold text-3xl text-white">
                {loading
                  ? "Loading weather data"
                  : `${weather?.temperature ?? "--"}°C`}
              </Text>

              <Text className="font-rubik text-base text-white capitalize">
                {loading ? "" : weather?.weatherDescription || "--"}
              </Text>
            </View>
          </LinearGradient>

          <View className="bg-white flex-row items-end justify-between w-full h-[165px] shadow-md rounded-3xl px-8 absolute top-28">
            <View className="items-center justify-center mb-8">
              <Image
                source={icons.humidity}
                className="size-5"
                resizeMode="contain"
              />
              <Text className="text-sm font-rubik">Humidity</Text>
              <Text className="text-sm font-rubik">
                {loading ? "" : weather?.humidity ?? "--"}%
              </Text>
            </View>
            <View className="items-center justify-center mb-8">
              <Image
                source={icons.wind}
                className="size-5"
                resizeMode="contain"
              />
              <Text className="text-sm font-rubik">Wind</Text>
              <Text className="text-sm font-rubik">
                {loading ? "" : weather?.windSpeed ?? "--"}
                km/h
              </Text>
            </View>
            <View className="items-center justify-center mb-8">
              <Image
                source={icons.precipitation}
                className="size-5"
                resizeMode="contain"
              />
              <Text className="text-sm font-rubik">Precipitation</Text>
              <Text className="text-sm font-rubik">
                {loading ? "" : weather?.precipitation ?? "--"}
                mm
              </Text>
            </View>
          </View>
        </View>

        {/* parameter readings */}
        <View className="">
          <View className="flex-row justify-between">
            <Text className="font-rubik-medium text-base text-black-300">
              My Farm
            </Text>
            <Text className="font-rubik text-sm text-black-400">Tomatoes</Text>
          </View>

          <View className="flex-row items-center justify-between mt-6 mb-5">
            {loadingSensorData ? (
              <Text className="font-rubik text-base text-black-300">
                Loading sensor data
              </Text>
            ) : sensorData ? (
              <>
                <View className="items-center justify-center">
                  <View
                    className={`w-16 h-16 border-2 items-center justify-center rounded-full mb-3`}
                    style={{ borderColor: humidityBorderColor}}
                  >
                    <Text className="font-rubik-medium text-base text-black-400">
                      {Math.round(sensorData.humidity)}
                    </Text>
                    <Text className="font-rubik text-xs text-[#B5BFC8]">%</Text>
                  </View>
                  <Text className="font-rubik text-sm text-black-400">
                    Humidity
                  </Text>
                </View>
                <View className="items-center justify-center">
                  <View
                    className={`w-16 h-16 border-2 items-center justify-center rounded-full mb-3`}
                    style={{ borderColor: mositureBorderColor}}
                  >
                    <Text className="font-rubik-medium text-base text-black-400">
                      {Math.round(sensorData.moisture)}
                    </Text>
                    <Text className="font-rubik text-xs text-[#B5BFC8]">%</Text>
                  </View>
                  <Text className="font-rubik text-sm text-black-400">
                    Soil Moisture
                  </Text>
                </View>
                <View className="items-center justify-center">
                  <View
                    className={`w-16 h-16 border-2 items-center justify-center rounded-full mb-3`}
                    style={{ borderColor: tempBorderColor }}
                  >
                    <Text className="font-rubik-medium text-base text-black-400">
                      {Math.round(sensorData.temperature)}
                    </Text>
                    <Text className="font-rubik text-xs text-[#B5BFC8]">
                      °C
                    </Text>
                  </View>
                  <Text className="font-rubik text-sm text-black-400">
                    Temperature
                  </Text>
                </View>
              </>
            ) : (
              // render an illustration if no sensor data is available
              <Text className="font-rubik text-base text-black-300">
                No sensor data available
              </Text>
            )}
          </View>

          {/* irigate button */}
          <TouchableOpacity
            className="bg-primary-300 w-36 py-3 rounded-3xl items-center justify-center mt-5"
            activeOpacity={0.6}
          >
            <Text className="font-rubik-medium text-base text-white">
              Irrigate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
