import React, { useState } from 'react';
import { Container, Grid, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import NewsCard from '../layout/NewsCard';
import Loader from '../layout/Loader';
import Categories from '../layout/Categories';
import imgInvalid from '../../assets/images/not_available.jpeg';
import Error from '../layout/Error';
import LanguageTheme from '../layout/LanguageTheme';
import ThemeSwitcher from '../layout/ThemeSwitcher';
import { useNewsContext } from '../../context/context';
import { useTheme, lightTheme, darkTheme } from '../../context/ThemeProvider';  

interface Article {
  title: string;
  url: string;
  publishedAt: string;
  urlToImage: string;
}

interface NewsData {
  articles: Article[];
}

const NewsListing: React.FC = () => {
  const { theme } = useTheme();
  const selectedTheme = theme === 'light' ? lightTheme : darkTheme;

  const {
    data,
    loading,
    error,
    selectedCategory,
    updateCategory,
    selectedLanguage,
    updateLanguage,
  } = useNewsContext();
  const [sortedData, setSortedData] = useState<NewsData | null>(null);
  const [isSortingLast7Days, setIsSortingLast7Days] = useState(false);

  const sortArticles = async (articles: Article[], category: string): Promise<Article[]> => {
    return articles.filter((article) => article.title.toLowerCase().includes(category.toLowerCase()));
  };

  const handleSortLast7Days = async () => {
    const last7DaysArticles = data.articles.filter(
      (article: Article) => new Date(article.publishedAt) >= new Date(new Date().setDate(new Date().getDate() - 7))
    );

    const categoryArticles = await sortArticles(last7DaysArticles, selectedCategory);

    setSortedData({
      articles: categoryArticles,
    });

    setIsSortingLast7Days(true);
  };

  const handleRemoveSorting = () => {
    setIsSortingLast7Days(false);
    setSortedData(null);
  };

  const handleCategoryChange = (category: string) => {
    updateCategory(category);
    setIsSortingLast7Days(false);
    setSortedData(null);
  };

  const handleLanguageChange = (newLanguage: string) => { 
    updateLanguage(newLanguage);
    setIsSortingLast7Days(false);
    setSortedData(null);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  const articlesToRender = sortedData ? sortedData.articles : data.articles;

  return (
    <>
      <div className="container-style" style={{ background: selectedTheme.palette.background, color: selectedTheme.palette.text }}>
        <Container maxWidth="lg">
          <h1 className="theme-heading">
            Global News in <span>Arabic</span>
            <ThemeSwitcher />
          </h1>
          <div className="sorting_box">
            <Categories
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onSortLast7Days={handleSortLast7Days}
              isSortingLast7Days={isSortingLast7Days}
            />
            {isSortingLast7Days && (
              <Chip
                label="Last 7 days"
                color="primary"
                onDelete={handleRemoveSorting}
                variant="outlined"
                style={{ cursor: 'pointer', marginLeft: '8px' }}
              />
            )}
            <LanguageTheme selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
          </div>

          <Grid container spacing={2}>
            {articlesToRender.map((article: Article) => (
              <Grid item xs={12} sm={6} md={3} key={article.url}>
                <Link to={`/news/${encodeURIComponent(article.url)}`}>
                  <NewsCard title={article.title} imageUrl={article.urlToImage ?? imgInvalid} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default NewsListing;
