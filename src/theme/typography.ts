import { TextStyle } from 'react-native';

export const typography = {
  headerTitle: {
    fontSize: 20,
    fontWeight: '800' as TextStyle['fontWeight'],
    letterSpacing: -0.5,
  },
  heroHeadline: {
    fontSize: 22,
    fontWeight: '800' as TextStyle['fontWeight'],
    lineHeight: 28,
    letterSpacing: -0.4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as TextStyle['fontWeight'],
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
    lineHeight: 18,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 15,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as TextStyle['fontWeight'],
    lineHeight: 16,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },
  ticker: {
    fontSize: 13,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: 0.2,
  },
};
