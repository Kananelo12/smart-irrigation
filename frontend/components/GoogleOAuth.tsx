import { View, Text, Image, Alert } from "react-native";
import React from "react";
import GoogleButton from "./GoogleButton";
import icons from "@/constants/icons";
import { login } from "@/libs/appwrite";

const GoogleOAuth = ({ handlePress }: { handlePress: any }) => {

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <GoogleButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handlePress}
      />
    </View>
  );
};

export default GoogleOAuth;
