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
    title: 'AI & Technological Sovereignty in 2026',
    headline: 'How Neural Superclusters are Reshaping Global Science',
    description: 'An investigative report on sovereign compute clusters and their immediate impact on drug discovery and climate modeling.',
    category: 'Technology',
    duration: '06:45',
    views: '482K views',
    publishedAt: '2 hours ago',
    videoSource: require('../assets/videos/clip_1.mp4'),
    thumbnail: require('../assets/images/news_1.png'),
  },
  {
    id: 'clip-2',
    title: 'Global Financial Forum Special Report',
    headline: 'Central Banks Announce Synchronized Liquidity Program',
    description: 'Analysis by top market economists following record surges across European and Asian stock bourses.',
    category: 'Business',
    duration: '08:12',
    views: '320K views',
    publishedAt: '4 hours ago',
    videoSource: require('../assets/videos/clip_2.mp4'),
    thumbnail: require('../assets/images/news_6.png'),
  },
  {
    id: 'clip-3',
    title: 'Lunar South Pole Mission Deployment',
    headline: 'High-Resolution Spectra Reveal Water Ice Formations',
    description: 'Watch the historic descent and transmission from the deep craters of the moon by the autonomous rover team.',
    category: 'National',
    duration: '05:30',
    views: '915K views',
    publishedAt: 'Yesterday',
    videoSource: require('../assets/videos/clip_3.mp4'),
    thumbnail: require('../assets/images/news_14.png'),
  },
  {
    id: 'clip-4',
    title: 'Super Derby Championship Final Match Highlights',
    headline: 'Last-Second Free Kick Clinches Tournament Trophy',
    description: 'Relive the high-voltage final ten minutes in front of a capacity crowd of 90,000 spectators.',
    category: 'Sports',
    duration: '04:18',
    views: '1.2M views',
    publishedAt: 'Yesterday',
    videoSource: require('../assets/videos/clip_4.mp4'),
    thumbnail: require('../assets/images/news_7.png'),
  },
  {
    id: 'clip-5',
    title: 'Offshore Clean Energy Megawatt Milestone',
    headline: 'Massive Wind Turbine Array Goes Operational in Coastal Zone',
    description: 'A deep-dive into the renewable mega-structures supplying clean electrical energy to 15 million households.',
    category: 'National',
    duration: '07:22',
    views: '264K views',
    publishedAt: '2 days ago',
    videoSource: require('../assets/videos/clip_5.mp4'),
    thumbnail: require('../assets/images/news_19.png'),
  },
];
