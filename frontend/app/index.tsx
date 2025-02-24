import { Link, Redirect, router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import CustomButton from "@/components/CustomButton";

// TODO: THIS IS THE WELCOME PAGE | ONBOARDING
export default function Index() {
  const handlePress = () => {
    router.push("/sign-in");
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ height: "100%" }}>
      <View className="w-full justify-center items-center h-full relative">
        <View className="w-full">
          <View>
            <Image
              source={images.onboarding}
              className="w-full h-[500px]"
              resizeMode="cover"
            />
          </View>
        </View>
        <View className="w-full h-[50%] items-center justify-center">
          <View className="bg-white w-[500px] min-h-screen rounded-t-[160px] relative top-44 items-center justify-center">
            <View className="max-w-[26rem] h-full items-center py-20">
              <Text className="font-rubik-semibold text-2xl text-center mb-10">
                The Future of Smart Farming with{" "}
                <Text className="text-primary-300">AgriSync</Text>
              </Text>
              <Text className="font-rubik text-lg text-center max-w-96 mb-10">
                Optimize irrigation, maximize growth, and save water
                effortlessly.
              </Text>
              <View className="flex-row gap-1 py-4">
                <View className="bg-primary-300 w-9 h-1.5 rounded-sm"></View>
                <View className="bg-primary-200 w-9 h-1.5 rounded-sm"></View>
                <View className="bg-primary-200 w-9 h-1.5 rounded-sm"></View>
              </View>
              {/* custom button */}
              <CustomButton
                title="Get Started"
                handlePress={handlePress}
                containerStyles="w-[26rem] mt-7"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
