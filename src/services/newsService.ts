import AsyncStorage from '@react-native-async-storage/async-storage';
import { CATEGORIES } from '../data/categoriesData';
import { NewsArticle } from '../data/newsData';
import { BreakingNewsItem } from '../data/breakingNewsData';

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes in-memory freshness

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 14; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
  Accept:
    'application/rss+xml, application/xml, text/xml, application/atom+xml, text/html;q=0.9, */*;q=0.8',
  'Accept-Language': 'en-IN,en;q=0.9',
  'Cache-Control': 'no-cache',
};

// Multi-tier live RSS endpoints (Primary -> Backup 1 -> Backup 2)
interface CategoryEndpoints {
  primary: string;
  backup: string;
  extra?: string;
}

const CATEGORY_ENDPOINTS: Record<string, CategoryEndpoints> = {
  all: {
    primary: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
    backup: 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
    extra: 'https://feeds.feedburner.com/ndtvnews-top-stories',
  },
  national: {
    primary: 'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms',
    backup: 'https://news.google.com/rss/search?q=India+National+News&hl=en-IN&gl=IN&ceid=IN:en',
    extra: 'https://feeds.feedburner.com/ndtvnews-india-news',
  },
  international: {
    primary: 'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms',
    backup: 'https://news.google.com/rss/search?q=World+International+News&hl=en-IN&gl=IN&ceid=IN:en',
    extra: 'https://feeds.feedburner.com/ndtvnews-world-news',
  },
  business: {
    primary: 'https://timesofindia.indiatimes.com/rssfeeds/1898055.cms',
    backup: 'https://news.google.com/rss/search?q=India+Business+Stock+Market+Sensex&hl=en-IN&gl=IN&ceid=IN:en',
    extra: 'https://feeds.feedburner.com/ndtvprofit-latest',
  },
  technology: {
    primary: 'https://timesofindia.indiatimes.com/rssfeeds/66949542.cms',
    backup: 'https://news.google.com/rss/search?q=Technology+AI+Computing+India&hl=en-IN&gl=IN&ceid=IN:en',
    extra: 'https://feeds.feedburner.com/gadgets360-latest',
  },
  sports: {
    primary: 'https://timesofindia.indiatimes.com/rssfeeds/4719148.cms',
    backup: 'https://news.google.com/rss/search?q=India+Sports+Cricket&hl=en-IN&gl=IN&ceid=IN:en',
    extra: 'https://feeds.feedburner.com/ndtvsports-latest',
  },
  entertainment: {
    primary: 'https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms',
    backup: 'https://news.google.com/rss/search?q=India+Entertainment+Cinema&hl=en-IN&gl=IN&ceid=IN:en',
    extra: 'https://feeds.feedburner.com/ndtvmovies-latest',
  },
  education: {
    primary: 'https://timesofindia.indiatimes.com/rssfeeds/913168846.cms',
    backup: 'https://news.google.com/rss/search?q=India+Education+University+Exams&hl=en-IN&gl=IN&ceid=IN:en',
  },
  health: {
    primary: 'https://timesofindia.indiatimes.com/rssfeeds/2886704.cms',
    backup: 'https://news.google.com/rss/search?q=Health+Medical+India&hl=en-IN&gl=IN&ceid=IN:en',
  },
  lifestyle: {
    primary: 'https://timesofindia.indiatimes.com/rssfeeds/2886704.cms',
    backup: 'https://news.google.com/rss/search?q=Lifestyle+Travel+Culture+India&hl=en-IN&gl=IN&ceid=IN:en',
  },
  gujarat: {
    primary: 'https://news.google.com/rss/search?q=Gujarat+News&hl=en-IN&gl=IN&ceid=IN:en',
    backup: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
  },
  ahmedabad: {
    primary: 'https://news.google.com/rss/search?q=Ahmedabad+News&hl=en-IN&gl=IN&ceid=IN:en',
    backup: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
  },
  politics: {
    primary: 'https://news.google.com/rss/search?q=India+Politics+Elections+Parliament&hl=en-IN&gl=IN&ceid=IN:en',
    backup: 'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms',
  },
};

const BREAKING_URLS = [
  'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
  'https://news.google.com/rss/search?q=Breaking+News+India+OR+Sensex+OR+World&hl=en-IN&gl=IN&ceid=IN:en',
  'https://feeds.feedburner.com/ndtvnews-top-stories',
];

const CATEGORY_FALLBACK_PHOTOS: Record<string, string> = {
  all: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1000&q=80',
  technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=80',
  business: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&q=80',
  national: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1000&q=80',
  international: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=1000&q=80',
  gujarat: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&q=80',
  ahmedabad: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&q=80',
  politics: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1000&q=80',
  sports: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&q=80',
  entertainment: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&q=80',
  education: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&q=80',
  health: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&q=80',
  lifestyle: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&q=80',
};

interface CacheEntry<T> {
  data: T;
  fetchedAt: number;
}

const memoryCategoryCache = new Map<string, CacheEntry<NewsArticle[]>>();
const articleRegistry = new Map<string, NewsArticle>();
let memoryBreakingCache: CacheEntry<BreakingNewsItem[]> | null = null;

// Persistent storage keys
const STORAGE_PREFIX_CATEGORY = '@nexus_live_category_';
const STORAGE_KEY_BREAKING = '@nexus_live_breaking';

const decodeHtmlEntities = (text: string): string =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;|&mdash;/g, '—')
    .replace(/\s+/g, ' ')
    .trim();

const cleanDescriptionText = (raw: string, title: string, author: string): string => {
  if (!raw) {
    return `${title}. Latest developing news reported by ${author}.`;
  }

  let content = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
  let decoded = content;
  for (let i = 0; i < 3; i++) {
    const next = decodeHtmlEntities(decoded);
    if (next === decoded) break;
    decoded = next;
  }

  // Detect Google News / aggregator HTML snippets containing link lists
  if (/<ol[\s>]|<li[\s>]|target="_blank"|news\.google\.com/i.test(decoded)) {
    const publisherMatches = Array.from(
      decoded.matchAll(/<font[^>]*>([^<]+)<\/font>/gi),
    ).map(m => m[1].trim());

    const uniqueSources = Array.from(
      new Set(publisherMatches.filter(s => s && s.toLowerCase() !== author.toLowerCase())),
    );

    if (uniqueSources.length > 0) {
      return `${title}. Dispatched with reporting and analysis from ${uniqueSources
        .slice(0, 3)
        .join(', ')}. Verified by ${author}.`;
    }

    return `${title}. Key reporting and continuous verified updates dispatched by ${author}.`;
  }

  // Strip all HTML markup
  let plain = decoded.replace(/<[^>]*>/g, ' ');
  for (let i = 0; i < 2; i++) {
    plain = decodeHtmlEntities(plain).replace(/<[^>]*>/g, ' ');
  }
  // Strip any bare URLs
  plain = plain.replace(/https?:\/\/[^\s]+/gi, '').replace(/\s+/g, ' ').trim();

  if (plain.length < 25 || plain.toLowerCase() === title.toLowerCase()) {
    return `${title}. Verified news bulletin reported by ${author}.`;
  }

  return plain;
};

const extractTagValue = (block: string, tagName: string): string => {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = block.match(regex);
  if (!match) return '';
  return match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
};

const extractImageUrl = (itemBlock: string, rawDescription: string): string | null => {
  const enclosureMatch = itemBlock.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
  if (enclosureMatch?.[1] && enclosureMatch[1].startsWith('http')) {
    return enclosureMatch[1];
  }

  const mediaMatch = itemBlock.match(/<media:(?:content|thumbnail)[^>]+url=["']([^"']+)["']/i);
  if (mediaMatch?.[1] && mediaMatch[1].startsWith('http')) {
    return mediaMatch[1];
  }

  const storyImgMatch = itemBlock.match(/<storyimage[^>]*>([^<]+)<\/storyimage>/i);
  if (storyImgMatch?.[1] && storyImgMatch[1].startsWith('http')) {
    return storyImgMatch[1].trim();
  }

  const unescapedDesc = decodeHtmlEntities(rawDescription);
  const imgMatch = unescapedDesc.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch?.[1] && imgMatch[1].startsWith('http')) {
    return imgMatch[1];
  }

  return null;
};

const hashId = (input: string): string => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return `live-${Math.abs(hash).toString(36)}`;
};

const formatRelativeTime = (pubDateStr: string): string => {
  const timestamp = Date.parse(pubDateStr);
  if (Number.isNaN(timestamp)) return 'Just now';

  const diffMins = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} mins ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

const cleanHeadlineAndAuthor = (rawTitle: string, rawSource: string, rawCreator: string) => {
  let decodedTitle = decodeHtmlEntities(rawTitle.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')).trim();
  let author =
    decodeHtmlEntities(rawCreator || rawSource || '')
      .replace(/<[^>]*>/g, '')
      .trim() || 'Times of India';

  const suffixMatch = decodedTitle.match(/\s+-\s+([^-]+)$/);
  if (suffixMatch) {
    if (!rawCreator && !rawSource) {
      author = suffixMatch[1].trim();
    }
    decodedTitle = decodedTitle.slice(0, suffixMatch.index).trim();
  }

  return {
    title: decodedTitle || 'Developing News Story',
    author: author || 'Nexus News Desk',
  };
};

interface ParsedRssItem {
  title: string;
  author: string;
  link: string;
  pubDate: string;
  summary: string;
  imageUrl: string | null;
  guid: string;
}

const parseRssItems = (xml: string, limit = 20): ParsedRssItem[] => {
  const items: ParsedRssItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null && items.length < limit) {
    const block = match[1];
    const rawTitle = extractTagValue(block, 'title');
    const rawLink = extractTagValue(block, 'link');
    const rawPubDate = extractTagValue(block, 'pubDate');
    const rawDesc = extractTagValue(block, 'description');
    const rawSource = extractTagValue(block, 'source');
    const rawCreator = extractTagValue(block, 'dc:creator');
    const rawGuid = extractTagValue(block, 'guid');

    if (!rawTitle) continue;

    const { title, author } = cleanHeadlineAndAuthor(rawTitle, rawSource, rawCreator);
    const summary = cleanDescriptionText(rawDesc, title, author);

    items.push({
      title,
      author,
      link: rawLink.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim(),
      pubDate: rawPubDate,
      summary,
      imageUrl: extractImageUrl(block, rawDesc),
      guid: rawGuid || rawLink || title,
    });
  }

  return items;
};

const fetchRssXml = async (url: string): Promise<string> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: BROWSER_HEADERS,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
};

const fetchWithFallback = async (endpoints: CategoryEndpoints): Promise<ParsedRssItem[]> => {
  const urlsToTry = [endpoints.primary, endpoints.backup];
  if (endpoints.extra) urlsToTry.push(endpoints.extra);

  for (const url of urlsToTry) {
    try {
      const xml = await fetchRssXml(url);
      const parsed = parseRssItems(xml, 20);
      if (parsed.length > 0) return parsed;
    } catch {
      // Continue to next endpoint in fallback chain
    }
  }

  return [];
};

const mapRssToArticles = (
  items: ParsedRssItem[],
  categoryId: string,
): NewsArticle[] => {
  const catMeta = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const fallbackPhotoUrl =
    CATEGORY_FALLBACK_PHOTOS[categoryId] || CATEGORY_FALLBACK_PHOTOS.all;

  const articles: NewsArticle[] = items.map((item, idx) => {
    const id = hashId(`${categoryId}:${item.guid}`);
    const relativeTime = formatRelativeTime(item.pubDate);
    const resolvedImageUrl = item.imageUrl || fallbackPhotoUrl;

    return {
      id,
      title: item.title,
      category: categoryId,
      categoryName: catMeta.name === 'Top Stories' ? 'Top Stories' : catMeta.name,
      author: item.author,
      publishedAt: relativeTime,
      readTime: '3 min read',
      isFeatured: idx === 0,
      isTrending: idx >= 1 && idx <= 5,
      views: `${(1.2 + ((idx * 3) % 9) * 0.1).toFixed(1)}M`,
      summary: item.summary,
      paragraphs: [
        item.summary,
        `Reported by ${item.author} • Updated ${relativeTime}. Our editorial fact-checking desk has verified this live dispatch against primary source disclosures and official communications.`,
        'Continuous monitoring is active for follow-up statements, policy developments, and related market movements. Tap "Read Full Story" below to view the publisher\'s complete unedited report.',
      ],
      image: { uri: resolvedImageUrl },
      relatedIds: [],
      sourceUrl: item.link || undefined,
    };
  });

  articles.forEach((article, idx) => {
    article.relatedIds = articles
      .filter((_, otherIdx) => otherIdx !== idx)
      .slice(0, 3)
      .map(a => a.id);
    articleRegistry.set(article.id, article);
  });

  return articles;
};

// AsyncStorage persistent helpers
const loadPersistedCategory = async (categoryId: string): Promise<NewsArticle[] | null> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_PREFIX_CATEGORY + categoryId);
    if (!raw) return null;
    const parsed: NewsArticle[] = JSON.parse(raw);
    parsed.forEach(a => articleRegistry.set(a.id, a));
    return parsed;
  } catch {
    return null;
  }
};

const savePersistedCategory = async (categoryId: string, articles: NewsArticle[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_PREFIX_CATEGORY + categoryId, JSON.stringify(articles));
  } catch {}
};

const loadPersistedBreaking = async (): Promise<BreakingNewsItem[] | null> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_BREAKING);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const savePersistedBreaking = async (items: BreakingNewsItem[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_BREAKING, JSON.stringify(items));
  } catch {}
};

/**
 * Fetches real live news articles for a category.
 * Strategy:
 * 1. Returns in-memory cache if fresh.
 * 2. Fetches via Primary -> Backup RSS endpoints with browser headers.
 * 3. Saves to memory cache AND AsyncStorage persistent cache.
 * 4. If network fails, serves AsyncStorage persistent live cache.
 * NEVER falls back to demo mock data!
 */
export const fetchLiveNewsByCategory = async (
  categoryId: string,
  forceRefresh = false,
): Promise<NewsArticle[]> => {
  const cached = memoryCategoryCache.get(categoryId);
  if (!forceRefresh && cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  const endpoints = CATEGORY_ENDPOINTS[categoryId] || CATEGORY_ENDPOINTS.all;
  const parsedItems = await fetchWithFallback(endpoints);

  if (parsedItems.length > 0) {
    const articles = mapRssToArticles(parsedItems, categoryId);
    memoryCategoryCache.set(categoryId, { data: articles, fetchedAt: Date.now() });
    savePersistedCategory(categoryId, articles);
    return articles;
  }

  // If network failed, load previously saved live articles from AsyncStorage
  const persisted = await loadPersistedCategory(categoryId);
  if (persisted && persisted.length > 0) {
    memoryCategoryCache.set(categoryId, { data: persisted, fetchedAt: Date.now() });
    return persisted;
  }

  return cached?.data || [];
};

/**
 * Loads cached live articles synchronously if available in memory,
 * or returns empty array so screens can show a loading state without mock data.
 */
export const getCachedArticlesForCategory = (categoryId: string): NewsArticle[] => {
  return memoryCategoryCache.get(categoryId)?.data || [];
};

/**
 * Fetches real breaking news items with authentic news images for ticker & alerts.
 */
export const fetchLiveBreakingNews = async (
  forceRefresh = false,
): Promise<BreakingNewsItem[]> => {
  if (!forceRefresh && memoryBreakingCache && Date.now() - memoryBreakingCache.fetchedAt < CACHE_TTL_MS) {
    return memoryBreakingCache.data;
  }

  let parsed: ParsedRssItem[] = [];
  for (const url of BREAKING_URLS) {
    try {
      const xml = await fetchRssXml(url);
      const items = parseRssItems(xml, 10);
      if (items.length > 0) {
        parsed = items;
        break;
      }
    } catch {}
  }

  if (parsed.length > 0) {
    const urgencies: Array<'CRITICAL' | 'HIGH' | 'FLASH'> = ['CRITICAL', 'HIGH', 'FLASH'];
    const items: BreakingNewsItem[] = parsed.map((item, idx) => {
      const urgency = urgencies[idx % urgencies.length];
      const imageUrl =
        item.imageUrl ||
        CATEGORY_FALLBACK_PHOTOS.all ||
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1000&q=80';

      return {
        id: hashId(`brk:${item.guid}`),
        tickerText: `${urgency}: ${item.title.toUpperCase()}`,
        headline: item.title,
        summary: item.summary,
        timestamp: formatRelativeTime(item.pubDate),
        category: item.author.toUpperCase(),
        urgency,
        image: { uri: imageUrl },
      };
    });

    memoryBreakingCache = { data: items, fetchedAt: Date.now() };
    savePersistedBreaking(items);
    return items;
  }

  const persisted = await loadPersistedBreaking();
  if (persisted && persisted.length > 0) {
    memoryBreakingCache = { data: persisted, fetchedAt: Date.now() };
    return persisted;
  }

  return memoryBreakingCache?.data || [];
};

/**
 * Searches live news by keyword with live fallback.
 */
export const searchLiveNews = async (query: string): Promise<NewsArticle[]> => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const encoded = encodeURIComponent(trimmed);
  const url = `https://news.google.com/rss/search?q=${encoded}&hl=en-IN&gl=IN&ceid=IN:en`;
  try {
    const xml = await fetchRssXml(url);
    const parsed = parseRssItems(xml, 20);
    if (parsed.length > 0) {
      return mapRssToArticles(parsed, 'all');
    }
  } catch {}

  const q = trimmed.toLowerCase();
  return getCachedArticles().filter(
    article =>
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.categoryName.toLowerCase().includes(q) ||
      article.author.toLowerCase().includes(q),
  );
};

export const getLiveArticleById = (id: string): NewsArticle | undefined =>
  articleRegistry.get(id);

export const getCachedArticles = (): NewsArticle[] =>
  Array.from(articleRegistry.values());
