export interface BreakingNewsItem {
  id: string;
  tickerText: string;
  headline: string;
  summary: string;
  timestamp: string;
  category: string;
  urgency: 'HIGH' | 'CRITICAL' | 'FLASH';
  image: any;
}

export const BREAKING_NEWS: BreakingNewsItem[] = [
  {
    id: 'brk-1',
    tickerText: 'URGENT: MAJOR 7.2 EARTHQUAKE OFF COAST OF JAPAN - TSUNAMI ADVISORY ISSUED',
    headline: 'Major 7.2 Magnitude Earthquake Detected Off Coast of Honshu; Coastal Evacuations Underway',
    summary: 'A powerful tremor struck 120km off the northeast coast of Japan at 14:22 UTC. Disaster management agencies have initiated coastal sirens while maritime traffic has been guided to deep waters.',
    timestamp: '3 mins ago',
    category: 'INTERNATIONAL',
    urgency: 'CRITICAL',
    image: require('../assets/images/breaking_1.png'),
  },
  {
    id: 'brk-2',
    tickerText: 'FLASH: SENSEX CROSSES HISTORIC 90,000 MARK IN RECORD TRADING SESSION',
    headline: 'Dalal Street In Euphoria: Sensex Surpasses Historic 90,000 Milestone Amid Foreign Inflows',
    summary: 'Indian benchmark indices surged to historic highs in early morning trading, driven by aggressive institutional buying across semiconductor, banking and green energy stocks.',
    timestamp: '12 mins ago',
    category: 'BUSINESS',
    urgency: 'HIGH',
    image: require('../assets/images/breaking_2.png'),
  },
  {
    id: 'brk-3',
    tickerText: 'POLITICS: PRIME MINISTER TO ADDRESS SPECIAL JOINT PARLIAMENTARY SESSION TONIGHT AT 8 PM',
    headline: 'Prime Minister Announces Keynote National Address on Economic and Technological Vision 2030',
    summary: 'The Prime Minister will address both houses of Parliament in a special televised broadcast tonight. The national address is expected to outline new manufacturing and digital sovereignty initiatives.',
    timestamp: '25 mins ago',
    category: 'POLITICS',
    urgency: 'FLASH',
    image: require('../assets/images/breaking_3.png'),
  },
  {
    id: 'brk-4',
    tickerText: 'WEATHER ALERT: MET DEPT ISSUES ORANGE ADVISORY FOR COASTAL GUJARAT AND SAURASHTRA',
    headline: 'State Emergency Operation Centre Put on High Alert for Heavy Rainfall Along Gujarat Coast',
    summary: 'Meteorological sensors indicate intense cyclonic low pressure in the Arabian Sea. District collectors across Jamnagar, Porbandar, and Bhavnagar have mobilized NDRF battalions for quick response.',
    timestamp: '42 mins ago',
    category: 'GUJARAT',
    urgency: 'HIGH',
    image: require('../assets/images/breaking_4.png'),
  },
  {
    id: 'brk-5',
    tickerText: 'TECH FLASH: GLOBAL QUANTUM COMPUTING NETWORK ESTABLISHED BETWEEN 6 NATIONS',
    headline: 'Six Nations Successfully Link Quantum Satellite Mesh for Unhackable Diplomatic Comms',
    summary: 'A milestone in telecommunications physics was achieved this morning as the first continuous quantum key distribution satellite cluster synchronized with ground stations across three continents.',
    timestamp: '1 hour ago',
    category: 'TECHNOLOGY',
    urgency: 'FLASH',
    image: require('../assets/images/breaking_5.png'),
  },
];
