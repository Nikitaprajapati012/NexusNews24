import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { INITIAL_NOTIFICATIONS, AppNotification } from '../../data/notificationsData';
import { EmptyState } from '../../components/common/EmptyState';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

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
    // mark this item as read
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
                <TouchableOpacity onPress={handleMarkAllRead} style={styles.actionLink}>
                  <Text style={[styles.linkText, { color: colors.accent }]}>Mark all read</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleClearAll} style={styles.actionLink}>
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
                  styles.itemCard,
                  {
                    backgroundColor: item.isRead ? colors.card : colors.surfaceVariant,
                    borderColor: item.priority === 'URGENT' ? '#DC2626' : colors.cardBorder,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => handleNotificationPress(item)}
              >
                <View style={styles.itemHeader}>
                  <View style={styles.badgeRow}>
                    {!item.isRead && <View style={styles.blueDot} />}
                    <Text
                      style={[
                        styles.priorityPill,
                        { color: item.priority === 'URGENT' ? '#EF4444' : colors.accent },
                      ]}
                    >
                      {item.category.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={[styles.timeText, { color: colors.textMuted }]}>{item.time}</Text>
                </View>
                <Text style={[styles.itemTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                <Text style={[styles.itemMessage, { color: colors.textSecondary }]}>{item.message}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  backBtn: {
    paddingVertical: 4,
  },
  backText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  scroll: {
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  unreadLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLink: {
    marginLeft: 12,
  },
  linkText: {
    fontSize: 12,
    fontWeight: '700',
  },
  list: {
    padding: spacing.lg,
  },
  itemCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    marginBottom: spacing.sm + 4,
    ...shadows.sm,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38BDF8',
    marginRight: 6,
  },
  priorityPill: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  itemMessage: {
    fontSize: 12,
    lineHeight: 17,
  },
});
