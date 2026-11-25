import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { borderRadius } from '../../theme/spacing';

interface Props {
  category: string;
  size?: 'small' | 'medium';
}

const CATEGORY_COLORS: Record<string, string> = {
  national: '#3B82F6',
  international: '#10B981',
  gujarat: '#F59E0B',
  ahmedabad: '#6366F1',
  politics: '#E11D48',
  business: '#16A34A',
  sports: '#2563EB',
  entertainment: '#A855F7',
  technology: '#06B6D4',
  education: '#818CF8',
  health: '#34D399',
  lifestyle: '#D946EF',
};

export const CategoryBadge: React.FC<Props> = ({ category, size = 'small' }) => {
  const { colors } = useTheme();
  const color = CATEGORY_COLORS[category.toLowerCase()] || colors.accent;

  const isSmall = size === 'small';

  return (
    <View style={[styles.badge, { backgroundColor: color + '18', borderColor: color + '40' }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color: color, fontSize: isSmall ? 9.5 : 11 }]}>
        {category.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 4.5,
  },
  text: {
    fontWeight: '800',
    letterSpacing: 0.6,
  },
});
