import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';

interface Props {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<Props> = ({
  icon = '📰',
  title,
  description,
  actionText,
  onAction,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
      {actionText && onAction && (
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.accent }]}
          onPress={onAction}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
    marginVertical: spacing.xl,
  },
  icon: {
    fontSize: 56,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  btn: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
