export interface BroadcastProgram {
  id: string;
  time: string;
  title: string;
  anchor: string;
  isCurrent: boolean;
}

export const LIVE_BROADCAST_DETAILS = {
  channelName: 'NEXUS NEWS 24',
  tagline: 'Truth Unfiltered • 24/7 Global Stream',
  currentProgram: 'Prime Time World Bulletin',
  currentAnchor: 'Elena Vance & Kabir Mehta',
  currentLocation: 'Studio 1 - Global Broadcast Hub',
  liveViewers: '2.4M Watching',
  videoSource: require('../assets/videos/live_stream.mp4'),
  lowerThirds: [
    'BREAKING: GLOBAL CLIMATE ACCORD SIGNED IN GENEVA',
    'MARKET UPDATE: SENSEX SOARS 1,240 POINTS TO HISTORIC HIGH',
    'TECH FOCUS: INDEPENDENT QUANTUM GRID PASSES STRESS TEST',
  ],
  schedule: [
    { id: 'sch-1', time: '18:00 - 19:00', title: 'Global Evening Report', anchor: 'Aarav Sharma', isCurrent: false },
    { id: 'sch-2', time: '19:00 - 20:30', title: 'Prime Time World Bulletin', anchor: 'Elena Vance & Kabir Mehta', isCurrent: true },
    { id: 'sch-3', time: '20:30 - 21:30', title: 'The Big Debate: Economic Frontiers', anchor: 'Devika Patel', isCurrent: false },
    { id: 'sch-4', time: '21:30 - 22:30', title: 'Technology 360: AI & Future Tech', anchor: 'Vikram Joshi', isCurrent: false },
    { id: 'sch-5', time: '22:30 - 23:30', title: 'Nightline India & World Wrap', anchor: 'Rohit Sengupta', isCurrent: false },
  ] as BroadcastProgram[],
};
