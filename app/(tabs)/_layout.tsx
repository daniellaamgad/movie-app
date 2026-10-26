import { Tabs } from 'expo-router';
import { TabsBottomAccessory } from 'react-native-screens/lib/typescript/components/tabs/bottom-accessory';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          height: 62,
          paddingTop: 6,
          paddingBottom: 6,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
          tabBarLabel: 'Movies',
        }}
      />

      <Tabs.Screen
        name="watchlist"
        options={{
          title: 'Watchlist',
          tabBarLabel: 'Watchlist',
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: 'Add Movie',
          tabBarLabel: 'Add',
        }}
      />
    </Tabs>
  );
}
