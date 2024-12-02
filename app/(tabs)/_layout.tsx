import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

export default function TabLayout() {
  
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <View style={{ backgroundColor: '#86c4f7', height: 100 }} />
        ),
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
          title: 'Login ',
          tabBarIcon: ({ color }) => <MaterialIcons name="login" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'My Notes ',
          tabBarIcon: ({ color }) => <MaterialIcons name="edit-note" size={28} color="black" />
        }}
      />
      <Tabs.Screen
        name="Deleted"
        options={{
          title: "Trash ",
          tabBarIcon: ({ color }) => <MaterialIcons name="delete" size={24} color="black" />
      }}
    />
    </Tabs>
  );
}
