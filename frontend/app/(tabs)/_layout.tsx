import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import icons from "@/constants/icons";
import { transform } from "@babel/core";

const TabIcon = ({
  icon,
  name,
  focused = false,
  customStyle = {},
}: {
  icon: any;
  name: string;
  focused?: boolean;
  customStyle?: any;
}) => {
  return (
    <View
      className="flex-1 mt-3 flex flex-col items-center"
      style={customStyle}
    >
      <Image
        source={icon}
        tintColor={focused ? "#00BF7C" : "#191D31"}
        resizeMode="contain"
        className="size-8"
      />
      <Text
        className={`${
          focused
            ? "text-primary-300 font-rubik-medium"
            : "text-black-300 font-rubik"
        } text-xs w-full text-center mt-1`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "white",
            position: "absolute",
            borderTopColor: "#00BF7C1A",
            borderTopWidth: 1,
            minHeight: 80,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={focused ? icons.home : icons.homeOutline}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            title: "Statistics",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.stats} name="statistics" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="addItem"
          options={{
            title: "",
            headerShown: false,
            tabBarIcon: ({focused }) => (
              <TabIcon
                icon={icons.plus}
                name=""
                customStyle={{
                    position: 'absolute',
                    backgroundColor: '#00BF7C',
                    borderWidth: 1,
                    borderColor: "#3B3B3B5A",
                    transform: [{ translateY: -18 }],
                    borderRadius: 50,
                    width: 50,
                    height: 50,
                    paddingTop: 10
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={icons.bell}
                name="Notifications"
                focused={focused}
              /> // TODO: conditionally display the badge icon if there are notifications
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.gear} name="Settings" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
