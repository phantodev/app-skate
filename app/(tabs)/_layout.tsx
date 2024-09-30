import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Platform, ViewStyle } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const getTabBarStyle = (): ViewStyle => ({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor:
      colorScheme === "dark" ? "rgb(30, 41, 59)" : "rgba(220,220,220, 0.5)",
    borderTopWidth: 0,
    height: 80,
    paddingBottom: Platform.OS === "ios" ? 20 : 15,
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: getTabBarStyle(),
        tabBarActiveTintColor: colorScheme === "dark" ? "#ffffff" : "#1e293b",
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? "#FF0000" : "#FFFFFF"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="search1"
              size={24}
              color={focused ? "#FF0000" : "#FFFFFF"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="user"
              size={24}
              color={focused ? "#FF0000" : "#FFFFFF"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
