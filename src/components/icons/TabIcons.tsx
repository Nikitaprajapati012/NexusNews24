import React from 'react';
import Svg, { Path, Rect, Circle, G } from 'react-native-svg';

interface IconProps {
  color: string;
  size?: number;
  focused?: boolean;
}

export const HomeIcon: React.FC<IconProps> = ({ color, size = 22, focused = false }) => {
  if (focused) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V14H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
          fill={color}
        />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V14H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const LiveTvIcon: React.FC<IconProps> = ({ color, size = 22, focused = false }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="2"
        y="7"
        width="20"
        height="14"
        rx="3"
        stroke={color}
        strokeWidth="2"
        fill={focused ? color + '22' : 'none'}
      />
      <Path
        d="M8.5 3L12 6.5L15.5 3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {focused ? (
        <Path
          d="M10 11L15 14L10 17V11Z"
          fill={color}
        />
      ) : (
        <Path
          d="M10 11.5L14.5 14L10 16.5V11.5Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
};

export const ClipsIcon: React.FC<IconProps> = ({ color, size = 22, focused = false }) => {
  if (focused) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
          fill={color}
        />
        <Path d="M10 9L15.5 12L10 15V9Z" fill="#0B1120" />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="3"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M6 4V8M10 4V8M14 4V8M18 4V8M6 16V20M10 16V20M14 16V20M18 16V20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M10.5 10L14.5 12L10.5 14V10Z"
        fill={color}
      />
    </Svg>
  );
};

export const ShortsIcon: React.FC<IconProps> = ({ color, size = 22, focused = false }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="5"
        y="2"
        width="14"
        height="20"
        rx="3"
        stroke={color}
        strokeWidth="2"
        fill={focused ? color + '20' : 'none'}
      />
      {/* Lightning bolt inside screen */}
      <Path
        d="M12.5 6L8.5 13H12L11 18L15.5 11H12L12.5 6Z"
        fill={focused ? color : 'none'}
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ExploreIcon: React.FC<IconProps> = ({ color, size = 22, focused = false }) => {
  if (focused) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x="3" y="3" width="8" height="8" rx="2" fill={color} />
        <Rect x="13" y="3" width="8" height="8" rx="2" fill={color} />
        <Rect x="3" y="13" width="8" height="8" rx="2" fill={color} />
        <Rect x="13" y="13" width="8" height="8" rx="2" fill={color} />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth="2" />
      <Rect x="13.5" y="3" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth="2" />
      <Rect x="3" y="13.5" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth="2" />
      <Rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth="2" />
    </Svg>
  );
};

export const ProfileIcon: React.FC<IconProps> = ({ color, size = 22, focused = false }) => {
  if (focused) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="7" r="4.5" fill={color} />
        <Path
          d="M4 20C4 16.134 7.58172 13 12 13C16.4183 13 20 16.134 20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20Z"
          fill={color}
        />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" />
      <Path
        d="M4.5 20C4.5 16.5 7.8 14 12 14C16.2 14 19.5 16.5 19.5 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const SearchIcon: React.FC<IconProps> = ({ color, size = 18 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2.2" />
      <Path d="M16.5 16.5L21 21" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </Svg>
  );
};

export const BellIcon: React.FC<IconProps> = ({ color, size = 18 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
