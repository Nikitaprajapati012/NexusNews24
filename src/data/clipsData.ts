export interface RecordedClip {
  id: string;
  title: string;
  headline: string;
  description: string;
  category: string;
  duration: string;
  views: string;
  publishedAt: string;
  videoSource: any;
  thumbnail: any;
}

export const RECORDED_CLIPS: RecordedClip[] = [
  {
    id: 'clip-1',
    title: 'AI Supercomputing & Semiconductor Sovereignty',
    headline: 'Next-Gen Neural Clusters Reshaping Global Science',
    description: 'An investigative report on sovereign compute clusters, AI chip packaging, and their immediate impact on drug discovery and climate modeling.',
    category: 'Technology',
    duration: '06:45',
    views: '482K views',
    publishedAt: '2 hours ago',
    videoSource: {
      uri: 'https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8',
    },
    thumbnail: {
      uri: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=80',
    },
  },
  {
    id: 'clip-2',
    title: 'Global Financial Markets Special Report',
    headline: 'Benchmark Indices Rally Amid Foreign Inflows & Rate Stability',
    description: 'Analysis by top market economists following record surges across Dalal Street, European bourses, and emerging market equities.',
    category: 'Business',
    duration: '08:12',
    views: '320K views',
    publishedAt: '4 hours ago',
    videoSource: {
      uri: 'https://c.mjh.nz/abc-news.m3u8',
    },
    thumbnail: {
      uri: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&q=80',
    },
  },
  {
    id: 'clip-3',
    title: 'Autonomous Lunar & Space Exploration Fleet',
    headline: 'High-Resolution Spectra Reveal Water Ice Deposits at South Pole',
    description: 'Watch the historic descent and telemetry transmission from deep lunar craters by the autonomous rover and robotic payload team.',
    category: 'National',
    duration: '05:30',
    views: '915K views',
    publishedAt: 'Yesterday',
    videoSource: {
      uri: 'https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8',
    },
    thumbnail: {
      uri: 'https://images.unsplash.com/photo-1517976487504-59a1a04d26dd?w=1000&q=80',
    },
  },
  {
    id: 'clip-4',
    title: 'Championship Final Match Highlights',
    headline: 'Dramatic Last-Minute Victory Clinches Global Trophy',
    description: 'Relive the high-voltage final ten minutes in front of a capacity crowd of 90,000 cheering spectators.',
    category: 'Sports',
    duration: '04:18',
    views: '1.2M views',
    publishedAt: 'Yesterday',
    videoSource: {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/11/SpaceX_Falcon_9_launch_with_COTS_Demo_Flight_1_%28high_quality%29.ogv/SpaceX_Falcon_9_launch_with_COTS_Demo_Flight_1_%28high_quality%29.ogv.360p.mpeg4.mov',
    },
    thumbnail: {
      uri: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&q=80',
    },
  },
  {
    id: 'clip-5',
    title: 'Global Climate Accord & Renewable Infrastructure',
    headline: 'Nations Ratify Historic Clean Energy Grid Initiative',
    description: 'Exclusive reporting on international commitments to triple renewable offshore wind and solar capacity by 2030.',
    category: 'Technology',
    duration: '07:05',
    views: '610K views',
    publishedAt: '2 days ago',
    videoSource: {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Flight_of_AS-506_%28Apollo_11%29_from_lift-off_to_1_min_after_S-IC_stage_separation%2C_VJSC_1425D-q1.ogv/Flight_of_AS-506_%28Apollo_11%29_from_lift-off_to_1_min_after_S-IC_stage_separation%2C_VJSC_1425D-q1.ogv.360p.mpeg4.mov',
    },
    thumbnail: {
      uri: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=1000&q=80',
    },
  },
];
