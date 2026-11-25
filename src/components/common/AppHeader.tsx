import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { formatCurrentDate } from '../../utils/dateFormatter';
import { SearchIcon, BellIcon } from '../icons/TabIcons';

interface Props {
  showDate?: boolean;
}

export const AppHeader: React.FC<Props> = ({ showDate = true }) => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
      {showDate && (
        <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
          <Text style={[styles.dateText, { color: colors.textMuted }]}>
            {formatCurrentDate().toUpperCase()} • ED. INDIA
          </Text>
          <TouchableOpacity
            style={styles.liveIndicator}
            activeOpacity={0.7}
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
          activeOpacity={0.7}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        >
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>24</Text>
          </View>
          <View>
            <View style={styles.brandRow}>
              <Text style={[styles.brandTitleNexus, { color: colors.textPrimary }]}>NEXUS</Text>
              <Text style={styles.brandTitleNews}>NEWS</Text>
            </View>
            <Text style={[styles.brandTagline, { color: colors.textMuted }]}>TRUTH UNFILTERED</Text>
          </View>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.surfaceVariant, borderColor: colors.cardBorder }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Search')}
          >
            <SearchIcon color={colors.textPrimary} size={17} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.surfaceVariant, borderColor: colors.cardBorder }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Notifications')}
          >
            <BellIcon color={colors.textPrimary} size={17} />
            <View style={[styles.notificationDot, { borderColor: colors.surfaceVariant }]} />
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
    paddingTop: Platform.OS === 'ios' ? 0 : 2,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dateText: {
    ...typography.metadata,
    letterSpacing: 0.8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 5,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    backgroundColor: '#DC2626',
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  logoBadgeText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: -0.5,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  brandTitleNexus: {
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  brandTitleNews: {
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.2,
    color: '#DC2626',
    marginLeft: 3,
  },
  brandTagline: {
    ...typography.metadata,
    fontSize: 8.5,
    marginTop: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
  },
  avatarBtn: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#DC2626',
    marginLeft: 2,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
});
