import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { borderRadius, spacing } from '../../theme/spacing';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<Props> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search headlines, topics, keywords...',
  autoFocus = false,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={[styles.input, { color: colors.textPrimary }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoFocus={autoFocus}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <View style={[styles.clearBtn, { backgroundColor: colors.textMuted }]}>
            <Text style={styles.clearText}>✕</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    height: 46,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  clearBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
});
