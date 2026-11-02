export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  breakingRed: string;
  breakingDark: string;
  liveRed: string;
  background: string;
  surface: string;
  surfaceVariant: string;
  card: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  border: string;
  divider: string;
  success: string;
  warning: string;
  overlay: string;
  statusBar: 'light-content' | 'dark-content';
}

export const lightColors: ThemeColors = {
  primary: '#0F172A',
  primaryDark: '#020617',
  secondary: '#1E293B',
  accent: '#2563EB',
  breakingRed: '#DC2626',
  breakingDark: '#991B1B',
  liveRed: '#EF4444',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceVariant: '#F1F5F9',
  card: '#FFFFFF',
  cardBorder: '#E2E8F0',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',
  border: '#E2E8F0',
  divider: '#CBD5E1',
  success: '#10B981',
  warning: '#F59E0B',
  overlay: 'rgba(15, 23, 42, 0.65)',
  statusBar: 'dark-content',
};

export const darkColors: ThemeColors = {
  primary: '#38BDF8',
  primaryDark: '#0284C7',
  secondary: '#94A3B8',
  accent: '#60A5FA',
  breakingRed: '#EF4444',
  breakingDark: '#B91C1C',
  liveRed: '#F87171',
  background: '#0B0F19',
  surface: '#111827',
  surfaceVariant: '#1F2937',
  card: '#151E32',
  cardBorder: '#1E293B',
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted: '#64748B',
  textInverse: '#0F172A',
  border: '#1E293B',
  divider: '#334155',
  success: '#34D399',
  warning: '#FBBF24',
  overlay: 'rgba(0, 0, 0, 0.85)',
  statusBar: 'light-content',
};
