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
    headline: 'Fusion Reactor Generates Net Positive Energy for 120 Seconds! ⚡',
    caption: 'Scientists in Geneva have confirmed an unprecedented clean energy output record during continuous magnetic confinement tests.',
    category: 'TECH FLASH',
    channel: 'Nexus Shorts',
    likes: '142K',
    comments: '3.8K',
    videoSource: require('../assets/videos/short_1.mp4'),
    thumbnail: require('../assets/images/news_1.png'),
  },
  {
    id: 'short-2',
    headline: 'Ahmedabad Metro Phase 2 High Speed Corridor Opens to Commuters! 🚇',
    caption: 'The ultra-modern elevated route connects Gandhinagar directly with Ahmedabad airport in under 22 minutes.',
    category: 'GUJARAT LOCAL',
    channel: 'Gujarat Direct',
    likes: '98K',
    comments: '2.1K',
    videoSource: require('../assets/videos/short_2.mp4'),
    thumbnail: require('../assets/images/news_4.png'),
  },
  {
    id: 'short-3',
    headline: 'Next-Gen Quantum Chips Outperform Classic Supercomputers! 💻',
    caption: 'A single palm-sized silicon quantum array solved mathematical benchmarks in 3 minutes that would take supercomputers 10,000 years.',
    category: 'SCIENCE 360',
    channel: 'Future Tech',
    likes: '235K',
    comments: '5.4K',
    videoSource: require('../assets/videos/short_3.mp4'),
    thumbnail: require('../assets/images/news_9.png'),
  },
  {
    id: 'short-4',
    headline: 'Sensex Hits 90,000 Points! Historic Bell Rings at Stock Exchange 📈',
    caption: 'Traders celebrate with fireworks and cheer as Indian markets establish unprecedented global investor dominance.',
    category: 'BUSINESS FAST',
    channel: 'Market Pulse',
    likes: '189K',
    comments: '4.2K',
    videoSource: require('../assets/videos/short_4.mp4'),
    thumbnail: require('../assets/images/news_6.png'),
  },
  {
    id: 'short-5',
    headline: 'Historic Last-Minute Winner in Tournament Final! ⚽',
    caption: 'The curling 35-meter strike in the 94th minute seals the historic championship in breathtaking fashion.',
    category: 'SPORTS ACTION',
    channel: 'Sports Zone',
    likes: '310K',
    comments: '7.9K',
    videoSource: require('../assets/videos/short_5.mp4'),
    thumbnail: require('../assets/images/news_7.png'),
  },
];
