import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import InputField from "@/components/InputField";
import icons from "@/constants/icons";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import GoogleOAuth from "@/components/GoogleOAuth";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <View className="justify-center h-full p-5">
            <Image source={images.logo} className="z-0 w-[177px] h-[38px] mt-5" resizeMode="contain" />
          </View>
          {/* <Image source={images.carSignUp} className="z-0 w-full h-[250px]" /> */}
          <Text className="text-2xl text-black-300 font-rubik-semibold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
