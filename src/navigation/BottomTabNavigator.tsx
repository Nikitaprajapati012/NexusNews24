import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { LiveTVScreen } from '../screens/LiveTVScreen/LiveTVScreen';
import { NewsClipsScreen } from '../screens/NewsClipsScreen/NewsClipsScreen';
import { ShortNewsScreen } from '../screens/ShortNewsScreen/ShortNewsScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen/CategoriesScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import {
  HomeIcon,
  LiveTvIcon,
  ClipsIcon,
  ShortsIcon,
  ExploreIcon,
  ProfileIcon,
} from '../components/icons/TabIcons';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#090D16' : '#FFFFFF',
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
          elevation: 12,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: isDark ? 0.35 : 0.08,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: isDark ? '#64748B' : '#94A3B8',
        tabBarLabelStyle: {
          ...typography.badge,
          fontSize: 9.5,
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && { backgroundColor: color + '15' }]}>
              <HomeIcon color={color} size={20} focused={focused} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="LiveTV"
        component={LiveTVScreen}
        options={{
          tabBarLabel: 'Live TV',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && { backgroundColor: color + '15' }]}>
              <View style={styles.livePulseDot} />
              <LiveTvIcon color={color} size={20} focused={focused} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Clips"
        component={NewsClipsScreen}
        options={{
          tabBarLabel: 'Clips',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && { backgroundColor: color + '15' }]}>
              <ClipsIcon color={color} size={20} focused={focused} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Shorts"
        component={ShortNewsScreen}
        options={{
          tabBarLabel: 'Shorts',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && { backgroundColor: color + '15' }]}>
              <View style={styles.flashBadge}>
                <Text style={styles.flashBadgeText}>⚡</Text>
              </View>
              <ShortsIcon color={color} size={20} focused={focused} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && { backgroundColor: color + '15' }]}>
              <ExploreIcon color={color} size={20} focused={focused} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && { backgroundColor: color + '15' }]}>
              <ProfileIcon color={color} size={20} focused={focused} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: 36,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  livePulseDot: {
    position: 'absolute',
    top: 2,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DC2626',
    zIndex: 2,
  },
  flashBadge: {
    position: 'absolute',
    top: -2,
    right: 3,
    zIndex: 2,
  },
  flashBadgeText: {
    fontSize: 8,
  },
});
