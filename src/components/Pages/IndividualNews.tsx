import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, AlertTitle, Container } from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useNewsContext } from '../../context/context';
import Loader from '../layout/Loader';
import imgInvalid from '../../assets/images/not_available.jpeg';
import LanguageTheme from '../layout/LanguageTheme';
import ThemeSwitcher from '../layout/ThemeSwitcher';

import { useTheme, lightTheme, darkTheme } from '../../context/ThemeProvider';

interface Article {
  title: string;
  author: string;
  description: string;
  publishedAt: string;
  urlToImage: string;
  url: string; 
}

const IndividualNews: React.FC = () => {
  const { selectedLanguage, updateLanguage } = useNewsContext();
  const { theme } = useTheme();
  const selectedTheme = theme === 'light' ? lightTheme : darkTheme;

  const { articleUrl } = useParams<{ articleUrl?: string }>();
  const { data } = useNewsContext();

  if (!articleUrl || !data || !data.articles) {
    return <Loader />;
  }

  const selectedArticle = data.articles.find((article: Article) => article.url === decodeURIComponent(articleUrl));

  if (!selectedArticle) {
    return (
      <div className='error-container'>
        <Alert severity="error">
          <AlertTitle>Article Not Found</AlertTitle>
          <Link className='btn-theme' to='/news'>
            Back to News Page
          </Link>
        </Alert>
      </div>
    );
  }

  return (
    <div
      style={{
        background: selectedTheme.palette.background,
        color: selectedTheme.palette.text,
      }}
    >
      <Container maxWidth="lg">
        <div className="single-news-card">
          <div className="single-news-card-head">
            <h2>{selectedArticle.title}</h2>
            <div>
              <ThemeSwitcher />
              <LanguageTheme selectedLanguage={selectedLanguage} onLanguageChange={updateLanguage} />
            </div>
          </div>
          <div className="single-news-card--container">
            <p>
              <AccessTimeFilledIcon />
              {selectedArticle.publishedAt}
            </p>
            <h3>
              <PersonIcon />
              {selectedArticle.author}
            </h3>
          </div>
          <img src={selectedArticle.urlToImage ?? imgInvalid} alt={selectedArticle.title} />
          <p>{selectedArticle.description}</p>
          <Link className="btn-theme" to='/news'>
            Back to News Page
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default IndividualNews;
