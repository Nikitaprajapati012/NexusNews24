export interface BroadcastProgram {
  id: string;
  time: string;
  title: string;
  anchor: string;
  category: string;
  isCurrent: boolean;
  thumbnail: any;
  duration?: string;
}

export const LIVE_BROADCAST_DETAILS = {
  channelName: 'NEXUS NEWS 24',
  tagline: 'Truth Unfiltered • 24/7 Global Live Feed',
  currentProgram: 'World News Live • 24/7 Broadcast',
  currentAnchor: 'Global News Desk',
  currentLocation: 'Studio 1 - 24/7 Live Satellite Stream',
  liveViewers: '2.4M Watching',
  videoSource: {
    uri: 'https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8',
  },
  lowerThirds: [
    'BREAKING: GLOBAL CLIMATE ACCORD SIGNED IN GENEVA',
    'MARKET UPDATE: SENSEX CROSSES HISTORIC 90,000 MARK',
    'TECH FOCUS: ADVANCED AI INFRASTRUCTURE COMES ONLINE',
  ],
  schedule: [
    {
      id: 'sch-1',
      time: '18:00 - 19:00',
      title: 'Global Evening Report',
      anchor: 'Aarav Sharma',
      category: 'Evening Edition',
      isCurrent: false,
      thumbnail: {
        uri: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80',
      },
    },
    {
      id: 'sch-2',
      time: '19:00 - 20:30',
      title: 'Prime Time World Bulletin',
      anchor: 'Elena Vance & Kabir Mehta',
      category: 'Prime Time',
      isCurrent: true,
      thumbnail: {
        uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      },
    },
    {
      id: 'sch-3',
      time: '20:30 - 21:30',
      title: 'The Big Debate: Economic Frontiers',
      anchor: 'Devika Patel',
      category: 'Special Debate',
      isCurrent: false,
      thumbnail: {
        uri: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
      },
    },
    {
      id: 'sch-4',
      time: '21:30 - 22:30',
      title: 'Technology 360: AI & Future Tech',
      anchor: 'Vikram Joshi',
      category: 'Tech Analysis',
      isCurrent: false,
      thumbnail: {
        uri: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      },
    },
    {
      id: 'sch-5',
      time: '22:30 - 23:30',
      title: 'Nightline India & World Wrap',
      anchor: 'Rohit Sengupta',
      category: 'Late Night Wrap',
      isCurrent: false,
      thumbnail: {
        uri: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
      },
    },
  ] as BroadcastProgram[],
};
