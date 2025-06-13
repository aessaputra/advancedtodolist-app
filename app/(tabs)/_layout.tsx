import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

// Komponen ini akan menjadi layout untuk navigasi tab kita.
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1D9BF0', // Warna ikon tab yang aktif
        headerStyle: {
          backgroundColor: '#F8F8F8',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* Mendefinisikan Tab Pertama */}
      <Tabs.Screen
        name="index" // Ini akan merender file `app/(tabs)/index.tsx`
        options={{
          title: 'Daftar Tugas', // Judul di header dan tab
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list-ul" size={24} color={color} />
          ),
        }}
      />

      {/* Mendefinisikan Tab Kedua */}
      <Tabs.Screen
        name="completed" // Ini akan merender file `app/(tabs)/completed.tsx`
        options={{
          title: 'Selesai', // Judul di header dan tab
          tabBarIcon: ({ color }) => (
            <FontAwesome name="check-square" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
