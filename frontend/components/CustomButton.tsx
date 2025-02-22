import { TouchableOpacity, Text } from "react-native"; // Import necessary components from React Native
import React from "react";
import { router } from "expo-router"; // Import router for navigation

// Define a reusable custom button component
const CustomButton = ({
  title, // Button text
  handlePress, // Function to handle button press event
  containerStyles, // Additional styles for the button container (optional)
  textStyles, // Additional styles for the button text (optional)
  isLoading, // Boolean to disable button and show loading state (optional)
}: {
  title: string;
  handlePress: any;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress} // Executes the function when the button is pressed
      activeOpacity={0.7} // Reduces opacity on press for a smooth touch effect
      className={`
        bg-primary-300 rounded-full min-h-[62px] shadow-lg justify-center items-center 
        ${containerStyles ?? ""} // Apply additional styles if provided
        ${isLoading ? "opacity-50" : ""} // Reduce opacity if the button is in loading state
      `}
      disabled={isLoading} // Disable button if it's loading
    >
      <Text className={`text-white font-rubik-semibold text-lg ${textStyles ?? ""}`}>
        {title} {/* Display the button text */}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton; // Export component for reuse
