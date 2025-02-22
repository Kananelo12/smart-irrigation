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
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="sign-up" 
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default AuthLayout; // Export component for use in the project
