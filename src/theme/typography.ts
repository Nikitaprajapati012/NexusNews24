import { TextStyle } from 'react-native';

export const typography = {
  display: {
    fontSize: 28,
    fontWeight: '800' as TextStyle['fontWeight'],
    lineHeight: 36,
    letterSpacing: -0.6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800' as TextStyle['fontWeight'],
    lineHeight: 26,
    letterSpacing: -0.5,
  },
  heroHeadline: {
    fontSize: 22,
    fontWeight: '800' as TextStyle['fontWeight'],
    lineHeight: 29,
    letterSpacing: -0.4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 24,
    letterSpacing: -0.3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 19,
    letterSpacing: -0.1,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 22,
    letterSpacing: 0,
  },
  bodyBold: {
    fontSize: 14,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 22,
    letterSpacing: 0,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500' as TextStyle['fontWeight'],
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  metadata: {
    fontSize: 11,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 15,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },
  badge: {
    fontSize: 10,
    fontWeight: '800' as TextStyle['fontWeight'],
    lineHeight: 14,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },
  ticker: {
    fontSize: 12,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 16,
    letterSpacing: 0.2,
  },
};
