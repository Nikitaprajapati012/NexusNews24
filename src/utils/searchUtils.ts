import { ALL_NEWS_ARTICLES, NewsArticle } from '../data/newsData';

export const searchArticlesOffline = (query: string): NewsArticle[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return ALL_NEWS_ARTICLES.filter(article => {
    return (
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.categoryName.toLowerCase().includes(q) ||
      article.author.toLowerCase().includes(q) ||
      article.paragraphs.some(p => p.toLowerCase().includes(q))
    );
  });
};
