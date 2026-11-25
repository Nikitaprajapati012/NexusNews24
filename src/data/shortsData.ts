export interface ShortNewsItem {
  id: string;
  headline: string;
  caption: string;
  category: string;
  channel: string;
  likes: string;
  comments: string;
  videoSource: any;
  thumbnail: any;
}

export const SHORT_NEWS_FEED: ShortNewsItem[] = [
  {
    id: 'short-1',
    headline: 'Clean Energy Breakthrough: Magnetic Fusion Sets Output Milestone ⚡',
    caption: 'Physicists confirm a landmark sustained high-temperature magnetic confinement run delivering clean, zero-carbon thermal energy.',
    category: 'TECH FLASH',
    channel: 'Nexus Science',
    likes: '142K',
    comments: '3.8K',
    videoSource: {
      uri: 'https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8',
    },
    thumbnail: {
      uri: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1000&q=80',
    },
  },
  {
    id: 'short-2',
    headline: 'High-Speed Metro Corridor Connects Gandhinagar & Ahmedabad! 🚇',
    caption: 'The newly inaugurated elevated transit artery cuts city travel times by 60%, providing zero-emission urban mobility.',
    category: 'GUJARAT LOCAL',
    channel: 'Gujarat Direct',
    likes: '98K',
    comments: '2.1K',
    videoSource: {
      uri: 'https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/2774c390ad884e06a7b0257c8489e23d/index.m3u8',
    },
    thumbnail: {
      uri: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&q=80',
    },
  },
  {
    id: 'short-3',
    headline: 'Deep Space Mission Transmits First 8K Telemetry from Lunar Crater! 🚀',
    caption: 'Robotic exploration team verifies sub-surface ice layers and mineral strata in deep permanently shadowed polar craters.',
    category: 'SCIENCE 360',
    channel: 'NASA Science',
    likes: '235K',
    comments: '5.4K',
    videoSource: {
      uri: 'https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8',
    },
    thumbnail: {
      uri: 'https://images.unsplash.com/photo-1517976487504-59a1a04d26dd?w=1000&q=80',
    },
  },
  {
    id: 'short-4',
    headline: 'Sensex & Nifty Surge to Historic Highs in Morning Trading Session 📈',
    caption: 'Domestic institutional buying and overseas inflows power aggressive gains across tech, banking, and manufacturing sectors.',
    category: 'BUSINESS FAST',
    channel: 'Market Pulse',
    likes: '189K',
    comments: '4.2K',
    videoSource: {
      uri: 'https://tv-trtworld.medya.trt.com.tr/master.m3u8',
    },
    thumbnail: {
      uri: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&q=80',
    },
  },
  {
    id: 'short-5',
    headline: 'Electric Flying Taxi Completes First Autonomous Intercity Trial Flight ✈️',
    caption: 'Six-passenger eVTOL aircraft achieves 250 km/h cruising speed in full FAA and civil aviation certification trials.',
    category: 'FUTURE MOBILITY',
    channel: 'Aero Vanguard',
    likes: '310K',
    comments: '6.7K',
    videoSource: {
      uri: 'https://abpmitv.akamaized.net/hls/live/2042842/abpnews/master.m3u8',
    },
    thumbnail: {
      uri: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f4?w=1000&q=80',
    },
  },
];
