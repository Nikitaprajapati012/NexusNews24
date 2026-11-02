export interface AppNotification {
  id: string;
  title: string;
  message: string;
  category: string;
  time: string;
  isRead: boolean;
  priority: 'URGENT' | 'STANDARD';
  articleId?: string;
}

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: '🚨 Breaking News Alert',
    message: 'Major 7.2 earthquake strikes off coast of Honshu; tsunami warning system activated.',
    category: 'International',
    time: '5m ago',
    isRead: false,
    priority: 'URGENT',
    articleId: 'art-2',
  },
  {
    id: 'notif-2',
    title: '📈 Market Flash',
    message: 'Sensex reaches historic 90,000 mark in morning session rally.',
    category: 'Business',
    time: '18m ago',
    isRead: false,
    priority: 'URGENT',
    articleId: 'art-6',
  },
  {
    id: 'notif-3',
    title: '🇮🇳 National Policy',
    message: 'Parliament approves Comprehensive Digital Data Protection Bill with bipartisan consensus.',
    category: 'Politics',
    time: '45m ago',
    isRead: false,
    priority: 'STANDARD',
    articleId: 'art-5',
  },
  {
    id: 'notif-4',
    title: '🏛️ Gujarat Infrastructure',
    message: 'Ahmedabad Smart City Traffic Command Center reports 40% reduction in peak-hour congestion.',
    category: 'Ahmedabad',
    time: '1h ago',
    isRead: true,
    priority: 'STANDARD',
    articleId: 'art-4',
  },
  {
    id: 'notif-5',
    title: '💻 Tech Insight',
    message: 'India unveils sovereign 100-Petaflop AI computing grid for public scientific research.',
    category: 'Technology',
    time: '2h ago',
    isRead: true,
    priority: 'STANDARD',
    articleId: 'art-1',
  },
  {
    id: 'notif-6',
    title: '🏆 Sports Special',
    message: 'India triumphs over Australia in nail-biting test match thriller in Melbourne.',
    category: 'Sports',
    time: '4h ago',
    isRead: true,
    priority: 'STANDARD',
    articleId: 'art-7',
  },
  {
    id: 'notif-7',
    title: '🩺 Healthcare Milestone',
    message: 'WHO approves revolutionary next-generation malaria vaccine for rollout.',
    category: 'Health',
    time: '6h ago',
    isRead: true,
    priority: 'STANDARD',
    articleId: 'art-17',
  },
  {
    id: 'notif-8',
    title: '🌿 Lifestyle & Wellbeing',
    message: 'The 2026 digital detox revolution: Why thousands are adopting slow tech weekends.',
    category: 'Lifestyle',
    time: '8h ago',
    isRead: true,
    priority: 'STANDARD',
    articleId: 'art-18',
  },
  {
    id: 'notif-9',
    title: '🎬 Entertainment Tonight',
    message: 'Sci-fi blockbuster Starlight Chronicles sweeps all major international technical awards.',
    category: 'Entertainment',
    time: '12h ago',
    isRead: true,
    priority: 'STANDARD',
    articleId: 'art-8',
  },
  {
    id: 'notif-10',
    title: '📚 Education Portal',
    message: 'Universal higher education portal connects over 15 million rural students with premier institutes.',
    category: 'Education',
    time: '1d ago',
    isRead: true,
    priority: 'STANDARD',
    articleId: 'art-16',
  },
];
