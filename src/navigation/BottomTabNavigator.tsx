import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { LiveTVScreen } from '../screens/LiveTVScreen/LiveTVScreen';
import { NewsClipsScreen } from '../screens/NewsClipsScreen/NewsClipsScreen';
import { ShortNewsScreen } from '../screens/ShortNewsScreen/ShortNewsScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen/CategoriesScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Text style={[styles.tabIcon, { color }]}>{focused ? '🏠' : '🛖'}</Text>
          ),
        }}
      />

      <Tab.Screen
        name="LiveTV"
        component={LiveTVScreen}
        options={{
          tabBarLabel: 'Live TV',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.liveTabBox}>
              <View style={styles.redDot} />
              <Text style={[styles.tabIcon, { color }]}>📺</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Clips"
        component={NewsClipsScreen}
        options={{
          tabBarLabel: 'Clips',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcon, { color }]}>🎬</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Shorts"
        component={ShortNewsScreen}
        options={{
          tabBarLabel: 'Shorts ⚡',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcon, { color }]}>📱</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcon, { color }]}>📑</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcon, { color }]}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 18,
  },
  liveTabBox: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redDot: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
});
