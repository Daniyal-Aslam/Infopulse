import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsListing from './components/Pages/NewsListing';
import IndividualNews from './components/Pages/IndividualNews';
import { ThemeProvider } from './context/ThemeProvider';


const App: React.FC = () => {
  return (
    <> 
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<NewsListing />} />
        <Route path="/news"  element={<NewsListing />}/>
        <Route path="/news/:articleUrl" element={<IndividualNews />} />
      </Routes>
    </Router>
    </ThemeProvider>
    </>
  );
};

export default App;
