import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen/SplashScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { NewsDetailsScreen } from '../screens/NewsDetailsScreen/NewsDetailsScreen';
import { BreakingNewsScreen } from '../screens/BreakingNewsScreen/BreakingNewsScreen';
import { SearchScreen } from '../screens/SearchScreen/SearchScreen';
import { SavedNewsScreen } from '../screens/SavedNewsScreen/SavedNewsScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen/NotificationsScreen';
import { SettingsScreen } from '../screens/SettingsScreen/SettingsScreen';
import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: colors.accent,
          background: colors.background,
          card: colors.surface,
          text: colors.textPrimary,
          border: colors.border,
          notification: colors.breakingRed,
        },
        fonts: {
          regular: { fontFamily: 'System', fontWeight: '400' },
          medium: { fontFamily: 'System', fontWeight: '500' },
          bold: { fontFamily: 'System', fontWeight: '700' },
          heavy: { fontFamily: 'System', fontWeight: '900' },
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetailsScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="BreakingNews"
          component={BreakingNewsScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="SavedNews"
          component={SavedNewsScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
