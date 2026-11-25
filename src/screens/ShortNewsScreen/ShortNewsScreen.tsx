import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VerticalShortCard } from '../../components/video/VerticalShortCard';
import { ShortNewsItem, SHORT_NEWS_FEED } from '../../data/shortsData';
import { fetchLiveShorts } from '../../services/videoService';
import { AppHeader } from '../../components/common/AppHeader';
import { useTheme } from '../../theme/ThemeContext';

interface Props {
  route?: {
    params?: {
      index?: number;
    };
  };
}

export const ShortNewsScreen: React.FC<Props> = ({ route }) => {
  const { colors, isDark } = useTheme();
  const [shorts, setShorts] = useState<ShortNewsItem[]>(SHORT_NEWS_FEED);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<ShortNewsItem>>(null);
  const targetIndex = route?.params?.index;

  useEffect(() => {
    let active = true;
    fetchLiveShorts().then(live => {
      if (active && live.length > 0) {
        setShorts(live);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (typeof targetIndex === 'number' && shorts.length > targetIndex) {
      setActiveIndex(targetIndex);
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: targetIndex, animated: false });
      }, 80);
    }
  }, [targetIndex, shorts.length]);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70,
  }).current;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000000' : colors.surface }]}>
      <AppHeader showDate={false} />
      {shorts.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#DC2626" />
          <Text style={styles.loadingText}>Loading live video news shorts...</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={shorts}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <VerticalShortCard item={item} isActive={index === activeIndex} />
          )}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          removeClippedSubviews={true}
          maxToRenderPerBatch={2}
          windowSize={3}
          onScrollToIndexFailed={info => {
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({ index: info.index, animated: false });
            }, 100);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#94A3B8',
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
  },
});
