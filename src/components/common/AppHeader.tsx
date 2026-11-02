import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';
import { formatCurrentDate } from '../../utils/dateFormatter';

interface Props {
  showDate?: boolean;
}

export const AppHeader: React.FC<Props> = ({ showDate = true }) => {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
      {showDate && (
        <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
          <Text style={[styles.dateText, { color: colors.textMuted }]}>
            {formatCurrentDate().toUpperCase()} • ED. INDIA
          </Text>
          <TouchableOpacity
            style={styles.liveIndicator}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MainTabs', { screen: 'LiveTV' })}
          >
            <View style={styles.livePulseDot} />
            <Text style={styles.liveText}>LIVE TV</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.mainHeader}>
        {/* Brand Logo & Name */}
        <TouchableOpacity
          style={styles.brandContainer}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        >
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>24</Text>
          </View>
          <View>
            <View style={styles.brandRow}>
              <Text style={[styles.brandTitleNexus, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>NEXUS</Text>
              <Text style={styles.brandTitleNews}>NEWS</Text>
            </View>
            <Text style={[styles.brandTagline, { color: colors.textMuted }]}>TRUTH UNFILTERED</Text>
          </View>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.surfaceVariant }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.actionIcon}>🔍</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.surfaceVariant }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Text style={styles.actionIcon}>🔔</Text>
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.avatarBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })}
          >
            <Image
              source={require('../../assets/images/avatar.png')}
              style={styles.avatarImg}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 4,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dateText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    backgroundColor: '#DC2626',
    width: 34,
    height: 34,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitleNexus: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  brandTitleNews: {
    fontSize: 18,
    fontWeight: '900',
    color: '#DC2626',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    position: 'relative',
  },
  actionIcon: {
    fontSize: 16,
  },
  notificationDot: {
    position: 'absolute',
    top: 7,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#DC2626',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  avatarBtn: {
    marginLeft: 10,
  },
  avatarImg: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: '#DC2626',
  },
});
