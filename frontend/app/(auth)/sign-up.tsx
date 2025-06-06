import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import InputField from "@/components/InputField";
import icons from "@/constants/icons";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import GoogleOAuth from "@/components/GoogleOAuth";
import NGROK_URL from "@/utils/ngrokConfig";


const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const testMode = () => {
    Alert.alert("Test Mode", "Redirecting to home screen");
    router.push("/(tabs)/home");
  };

  const handleSignUp = async () => {
    if (!form.name || !form.email || !form.phoneNumber || !form.password) {
      Alert.alert("Error", "Please fill in all the fields!");
      return;
    }
    try {
      
      console.log(
        `\nFull names: ${form.name}\Email: ${form.email}\nPhone Number: ${form.phoneNumber}\nPassword: ${form.password}`
      );
      const response = await fetch(`${NGROK_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phoneNumber: form.phoneNumber,
          password: form.password,
        }),
      });

      if (response.ok) {
        const message = await response.text();
        Alert.alert("Success", message);
        // redirect to login page
        router.push("/sign-in");
      } else {
        const errorMessage = await response.text();
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server", [
        { text: "Cancel", style: "cancel" },
        { text: "Test Mode", onPress: testMode },
      ]);
      console.log(error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <View className="justify-center h-full p-5">
            <Image
              source={images.logo}
              className="z-0 w-[177px] h-[38px] mt-5"
              resizeMode="contain"
            />
          </View>
          {/* <Image source={images.carSignUp} className="z-0 w-full h-[250px]" /> */}
          <Text className="text-2xl text-black-300 font-rubik-semibold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Bokang Joel"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="joel@gmail.com"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Phone Number"
            placeholder="+266 56565406"
            // keyboardType="phone-pad"
            icon={icons.email}
            value={form.phoneNumber}
            onChangeText={(value) => setForm({ ...form, phoneNumber: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign Up"
            handlePress={handleSignUp}
            containerStyles="mt-7"
          />

          {/* TODO: OAuth */}
          <GoogleOAuth />

          <Link
            href="/sign-in"
            className="text-lg text-center text-black-100 mt-10"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-300">Sign in</Text>
          </Link>
        </View>

        {/* TODO: verification modal */}
      </View>
    </ScrollView>
  );
};

export default SignUp;
