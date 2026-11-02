import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Dimensions, SafeAreaView } from 'react-native';
import { VerticalShortCard } from '../../components/video/VerticalShortCard';
import { SHORT_NEWS_FEED } from '../../data/shortsData';
import { AppHeader } from '../../components/common/AppHeader';
import { useTheme } from '../../theme/ThemeContext';

export const ShortNewsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70,
  }).current;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#000000' }]}>
      <AppHeader showDate={false} />
      <FlatList
        data={SHORT_NEWS_FEED}
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
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
