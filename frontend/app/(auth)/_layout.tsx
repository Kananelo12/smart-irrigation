import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

// Define the authentication layout component
const AuthLayout = () => {
  return (
    // Stack Navigator to manage authentication screens
    <Stack>
      {/* Define the "sign-in" screen inside the stack */}
      <Stack.Screen 
        name="sign-in" 
        options={{ headerShown: false }} // Hide the header for a clean UI
      />
    </Stack>
  );
};

export default AuthLayout; // Export component for use in the project
