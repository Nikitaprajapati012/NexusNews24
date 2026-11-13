import { NewsArticle } from '../data/newsData';
import { getCachedArticles } from '../services/newsService';

export const searchArticlesOffline = (query: string): NewsArticle[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return getCachedArticles().filter(article => {
    return (
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.categoryName.toLowerCase().includes(q) ||
      article.author.toLowerCase().includes(q) ||
      article.paragraphs.some(p => p.toLowerCase().includes(q))
    );
  });
};

