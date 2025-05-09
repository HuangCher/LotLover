import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => 
            <Ionicons name="map" size={28} color={color} />,
        }}
      />
              <Tabs.Screen
        name="transactions"
        options={{
          title: 'Contribute',
          tabBarIcon: ({ color }) => 
            <Ionicons name="wallet-outline" size={28} color={color} />,
        }}
        />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => 
            <Ionicons name="person-circle-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
