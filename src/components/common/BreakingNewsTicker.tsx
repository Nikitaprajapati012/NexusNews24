import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BreakingNewsItem } from '../../data/breakingNewsData';
import { fetchLiveBreakingNews } from '../../services/newsService';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { ChevronRightIcon } from '../icons/TabIcons';

export const BreakingNewsTicker: React.FC = () => {
  const navigation = useNavigation<any>();
  const [items, setItems] = useState<BreakingNewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let active = true;
    fetchLiveBreakingNews().then(liveItems => {
      if (active && liveItems.length > 0) {
        setItems(liveItems);
        setCurrentIndex(0);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [items.length]);

  const currentItem = items[currentIndex];

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('BreakingNews')}
    >
      <View style={styles.badge}>
        <View style={styles.pulseDot} />
        <Text style={styles.badgeText}>BREAKING</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.headlineText} numberOfLines={1} ellipsizeMode="tail">
          {currentItem?.tickerText || 'LIVE BREAKING BULLETIN: DEVELOPING STORY AHEAD'}
        </Text>
      </View>
      <View style={styles.arrowWrapper}>
        <ChevronRightIcon color="#FCA5A5" size={13} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7F1D1D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  badge: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: borderRadius.xs,
    marginRight: 8,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FEF08A',
    marginRight: 5,
  },
  badgeText: {
    color: '#FFFFFF',
    ...typography.badge,
    fontSize: 9.5,
  },
  textWrapper: {
    flex: 1,
    marginRight: 4,
  },
  headlineText: {
    color: '#FEF08A',
    ...typography.ticker,
  },
  arrowWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
