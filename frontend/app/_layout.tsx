import { SplashScreen, Stack } from "expo-router";
import "./globals.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text } from "react-native";
import { WeatherProvider } from "@/libs/WeatherProvider";

export default function RootLayout() {
  // Load custom fonts before rendering the app
  let [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  // Hide the splash screen once the fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen asynchronously after fonts are ready
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]); // Dependency array ensures effect runs when fontsLoaded changes

  // for testing purposes only: force fontsLoaded to false
  // fontsLoaded = false; // TODO: REMOVE THIS LINE

  // show loading state if the fonts are not yet loaded
  if (!fontsLoaded) return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      <ActivityIndicator color="#00BF7C" size="large" />
      <Text className="text-base text-black-300 mt-3">Loading fonts...</Text>
    </SafeAreaView>
  );

  // Render the navigation stack once fonts are loaded
  return (
    <WeatherProvider>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      {/* <AppNavigator /> */}
    </WeatherProvider>
  );
}
