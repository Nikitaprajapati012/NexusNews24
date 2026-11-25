export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  accentSubtle: string;
  breakingRed: string;
  breakingDark: string;
  liveRed: string;
  background: string;
  surface: string;
  surfaceVariant: string;
  surfaceElevated: string;
  card: string;
  cardBorder: string;
  cardHover: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  border: string;
  divider: string;
  success: string;
  warning: string;
  overlay: string;
  overlayDark: string;
  statusBar: 'light-content' | 'dark-content';
}

export const lightColors: ThemeColors = {
  primary: '#0F172A',
  primaryDark: '#020617',
  secondary: '#334155',
  accent: '#0284C7',
  accentSubtle: 'rgba(2, 132, 199, 0.12)',
  breakingRed: '#DC2626',
  breakingDark: '#991B1B',
  liveRed: '#EF4444',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceVariant: '#F1F5F9',
  surfaceElevated: '#FFFFFF',
  card: '#FFFFFF',
  cardBorder: '#E2E8F0',
  cardHover: '#F8FAFC',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',
  textInverse: '#FFFFFF',
  border: '#E2E8F0',
  divider: '#E2E8F0',
  success: '#10B981',
  warning: '#F59E0B',
  overlay: 'rgba(15, 23, 42, 0.65)',
  overlayDark: 'rgba(15, 23, 42, 0.85)',
  statusBar: 'dark-content',
};

export const darkColors: ThemeColors = {
  primary: '#38BDF8',
  primaryDark: '#0284C7',
  secondary: '#94A3B8',
  accent: '#38BDF8',
  accentSubtle: 'rgba(56, 189, 248, 0.12)',
  breakingRed: '#EF4444',
  breakingDark: '#B91C1C',
  liveRed: '#F87171',
  background: '#090D16',
  surface: '#0E1524',
  surfaceVariant: '#141D30',
  surfaceElevated: '#1A253E',
  card: '#111827',
  cardBorder: 'rgba(255, 255, 255, 0.08)',
  cardHover: '#162035',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textInverse: '#090D16',
  border: 'rgba(255, 255, 255, 0.08)',
  divider: 'rgba(255, 255, 255, 0.08)',
  success: '#34D399',
  warning: '#FBBF24',
  overlay: 'rgba(0, 0, 0, 0.75)',
  overlayDark: 'rgba(9, 13, 22, 0.92)',
  statusBar: 'light-content',
};
