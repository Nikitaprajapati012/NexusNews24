export interface NewsCategory {
  id: string;
  name: string;
  icon: string;
  badgeColor: string;
  description: string;
}

export const CATEGORIES: NewsCategory[] = [
  { id: 'all', name: 'Top Stories', icon: '🔥', badgeColor: '#EF4444', description: 'Curated headline stories across all sectors' },
  { id: 'national', name: 'National', icon: '🇮🇳', badgeColor: '#3B82F6', description: 'Crucial developments and policy updates from across the nation' },
  { id: 'international', name: 'International', icon: '🌐', badgeColor: '#10B981', description: 'Global geopolitics, international treaties and world events' },
  { id: 'gujarat', name: 'Gujarat', icon: '🏛️', badgeColor: '#F59E0B', description: 'State governance, infrastructure and cultural coverage' },
  { id: 'ahmedabad', name: 'Ahmedabad', icon: '🏙️', badgeColor: '#6366F1', description: 'Local civic developments, transport, and city life' },
  { id: 'politics', name: 'Politics', icon: '⚖️', badgeColor: '#E11D48', description: 'Elections, legislative debates and parliamentary coverage' },
  { id: 'business', name: 'Business', icon: '📈', badgeColor: '#16A34A', description: 'Financial markets, banking, economy and startup ecosystem' },
  { id: 'sports', name: 'Sports', icon: '🏆', badgeColor: '#2563EB', description: 'Cricket, Olympics, athletics and global tournament highlights' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', badgeColor: '#A855F7', description: 'Cinema, streaming releases, culture and arts' },
  { id: 'technology', name: 'Technology', icon: '💻', badgeColor: '#06B6D4', description: 'Artificial Intelligence, quantum computing and consumer tech' },
  { id: 'education', name: 'Education', icon: '📚', badgeColor: '#818CF8', description: 'Academia, university admissions and digital learning' },
  { id: 'health', name: 'Health', icon: '🩺', badgeColor: '#34D399', description: 'Medical research, wellness, public health and nutrition' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🌿', badgeColor: '#D946EF', description: 'Travel, sustainable living, urban design and food culture' },
];
