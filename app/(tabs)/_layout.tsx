import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <MaterialIcons name="login" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'My Notes',
          tabBarIcon: ({ color }) => <MaterialIcons name="edit-note" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="Deleted"
        options={{
          title: "Deleted Notes",
          tabBarIcon: ({ color }) => <MaterialIcons name="delete" size={24} color="black" />
      }}
    />
    </Tabs>
  );
}
