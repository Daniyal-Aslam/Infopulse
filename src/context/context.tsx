import React, { createContext, useContext, useState, useEffect } from 'react';
import Api from '../services/Api';

interface NewsContextProps {
  data: any;
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  selectedLanguage: string;
  updateCategory: (category: string) => void;
  updateLanguage: (language: string) => void;
}

interface NewsContextProviderProps {
  children: React.ReactNode;
}

const NewsContext = createContext<NewsContextProps | undefined>(undefined);

export const NewsContextProvider: React.FC<NewsContextProviderProps> = ({ children }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('apple');  
  const [selectedLanguage, setSelectedLanguage] = useState('en');  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await Api.fetchData(selectedCategory, selectedLanguage);
        setData(apiData);
      } catch (err) {
        setError('An error occurred while fetching the data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, selectedLanguage]);

  const updateCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const updateLanguage = (language: string) => { 
    setSelectedLanguage(language);
  };

  const contextValue: NewsContextProps = {
    data,
    loading,
    error,
    selectedCategory,
    selectedLanguage,
    updateCategory,
    updateLanguage,
  };

  return <NewsContext.Provider value={contextValue}>{children}</NewsContext.Provider>;
};

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext must be used within a NewsContextProvider');
  }
  return context;
};
