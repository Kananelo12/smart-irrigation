import { ActivityIndicator, Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import images from "@/constants/images";
import InputField from "@/components/InputField";
import icons from "@/constants/icons";
import CustomButton from "@/components/CustomButton";
import { Link, Redirect, router } from "expo-router";
import GoogleOAuth from "@/components/GoogleOAuth";
import { login } from "@/libs/appwrite";
import { useGlobalContext } from "@/libs/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();
  // if (!loading && isLoggedIn) return <Redirect href="/(tabs)/home" />;

  // useEffect to watch for changes in loading and isLoggedIn
  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.push("/(tabs)/home");
    }
  }, [loading, isLoggedIn]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleGoogleAuth = async () => {
    const result = await login();

    if (result) {
      // Update global state asynchronously
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  const handleLogin = async () => {
    // check for null or empty fields
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in both fields");
      return;
    }
    // TODO: add validation for email syntax using expressions
    // TODO: add validation for password length and security
    try {
      console.log(`\nUsername: ${form.email}\nPassword: ${form.password}`);
      const response = await fetch(`http://192.168.162.178.1:8080/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.email, // backend expects key of username, not 'email'
          password: form.password,
        }),
      });

      if (response.ok) {
        const message = await response.text();
        Alert.alert("Success", message);
        // redirect to home screen
        router.push("/(tabs)/home");
      } else {
        const errorMessage = await response.text();
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server");
      console.error(error);
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
          <Text className="text-2xl text-black-300 font-rubik-semibold absolute bottom-5 left-5">
            Welcome back
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.email}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Log In"
            handlePress={handleLogin}
            containerStyles="mt-7"
          />

          {/* TODO: OAuth */}
          <GoogleOAuth handlePress={handleGoogleAuth} />

          <Link
            href="/sign-up"
            className="text-lg text-center text-black-100 mt-10"
          >
            <Text>Don't have an account yet? </Text>
            <Text className="text-primary-300">Sign up</Text>
          </Link>
        </View>

        {/* TODO: verification modal */}
      </View>
    </ScrollView>
  );
};

export default SignIn;
