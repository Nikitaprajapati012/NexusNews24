import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { INITIAL_NOTIFICATIONS, AppNotification } from '../../data/notificationsData';
import { EmptyState } from '../../components/common/EmptyState';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleNotificationPress = (item: AppNotification) => {
    setNotifications(prev =>
      prev.map(n => (n.id === item.id ? { ...n, isRead: true } : n))
    );
    if (item.articleId) {
      navigation.navigate('NewsDetails', { articleId: item.articleId });
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Text style={[styles.backText, { color: colors.textPrimary }]}>‹ BACK</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>NOTIFICATIONS</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {notifications.length > 0 && (
          <View style={styles.actionRow}>
            <Text style={[styles.unreadLabel, { color: colors.textMuted }]}>
              {unreadCount > 0 ? `${unreadCount} UNREAD ALERTS` : 'ALL ALERTS READ'}
            </Text>
            <View style={styles.btnGroup}>
              {unreadCount > 0 && (
                <TouchableOpacity onPress={handleMarkAllRead} style={styles.actionLink} activeOpacity={0.7}>
                  <Text style={[styles.linkText, { color: colors.accent }]}>Mark all read</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleClearAll} style={styles.actionLink} activeOpacity={0.7}>
                <Text style={[styles.linkText, { color: colors.breakingRed }]}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.list}>
          {notifications.length === 0 ? (
            <EmptyState
              icon="🔔"
              title="No Notifications"
              description="You're completely up to date! Urgent alerts and headline updates will appear right here."
            />
          ) : (
            notifications.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  {
                    backgroundColor: item.isRead ? colors.card : colors.surfaceElevated,
                    borderColor: item.isRead ? colors.cardBorder : colors.accent,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => handleNotificationPress(item)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.categoryBadge}>
                    <Text style={[styles.categoryText, { color: colors.accent }]}>
                      {item.category.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={[styles.timeText, { color: colors.textMuted }]}>{item.time}</Text>
                </View>

                <View style={styles.cardBody}>
                  {!item.isRead && <View style={styles.unreadDot} />}
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>{item.title}</Text>
                    <Text style={[styles.message, { color: colors.textSecondary }]}>{item.message}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
  },
  backBtn: {
    paddingVertical: 4,
  },
  backText: {
    ...typography.badge,
    fontSize: 12,
  },
  headerTitle: {
    ...typography.headerTitle,
    fontSize: 15,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  unreadLabel: {
    ...typography.badge,
    fontSize: 10,
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  actionLink: {
    paddingVertical: 2,
  },
  linkText: {
    fontSize: 12,
    fontWeight: '700',
  },
  list: {
    padding: spacing.lg,
  },
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
  },
  categoryText: {
    ...typography.badge,
    fontSize: 9.5,
  },
  timeText: {
    ...typography.caption,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
    marginRight: 8,
    marginTop: 5,
  },
  title: {
    ...typography.cardTitle,
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 3,
  },
  message: {
    ...typography.caption,
    lineHeight: 16,
  },
});
