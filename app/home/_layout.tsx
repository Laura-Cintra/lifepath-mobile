import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useUser } from "../../src/context/UserContext";
import colors from "../../src/theme/colors";

export default function HomeLayout() {
  const router = useRouter();
  const { logout } = useUser();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const HeaderLeft = () => (
    <TouchableOpacity
      onPress={() => router.replace("/home")}
      style={{ marginLeft: 10 }}
    >
      <Image
        source={require("../../assets/lifepath-logo-white.png")}
        style={{ width: 60, height: 60 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleLogout} style={{ marginRight: 14 }}>
      <Feather name="log-out" size={22} color={colors.white} />
    </TouchableOpacity>
  );

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.secondary },
        headerTintColor: colors.white,
        headerTitle: "",
        headerLeft: HeaderLeft,
        headerRight: HeaderRight,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: colors.white,
          borderTopWidth: 0,
          elevation: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size ?? 22} color={color} />
          ),
          headerShown: true,
        }}
      />

      <Tabs.Screen
        name="Dashboard"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="insights" size={size ?? 22} color={color} />
          ),
          headerShown: true,
        }}
      />

      <Tabs.Screen
        name="Objetivos"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="target" size={size ?? 20} color={color} />
          ),
          headerShown: true,
        }}
      />

      <Tabs.Screen
        name="Roteiro"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={size ?? 22} color={color} />
          ),
          headerShown: true,
        }}
      />

      <Tabs.Screen
        name="CursosRecomendados"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="book" size={size ?? 22} color={color} />
          ),
          headerShown: true,
        }}
      />
    </Tabs>
  );
}