import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

interface Props {
  style?: ViewStyle;
  direction?: 'bottom-to-top' | 'top-to-bottom';
  startOpacity?: number;
  endOpacity?: number;
  color?: string;
}

export const GradientOverlay: React.FC<Props> = ({
  style,
  direction = 'bottom-to-top',
  startOpacity = 0.95,
  endOpacity = 0.0,
  color = '#090D16',
}) => {
  const isBottomUp = direction === 'bottom-to-top';

  return (
    <View style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <LinearGradient
            id="gradOverlay"
            x1="0"
            y1={isBottomUp ? '1' : '0'}
            x2="0"
            y2={isBottomUp ? '0' : '1'}
          >
            <Stop offset="0%" stopColor={color} stopOpacity={startOpacity} />
            <Stop offset="50%" stopColor={color} stopOpacity={startOpacity * 0.6} />
            <Stop offset="85%" stopColor={color} stopOpacity={startOpacity * 0.2} />
            <Stop offset="100%" stopColor={color} stopOpacity={endOpacity} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradOverlay)" />
      </Svg>
    </View>
  );
};
