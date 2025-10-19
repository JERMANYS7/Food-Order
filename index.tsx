/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RecommendedPage from './pages/RecommendedPage';
import AdminPage from './pages/AdminPage'; // Import the new AdminPage
import { useThemeStore } from './store/themeStore';

type Page = 'home' | 'recommended' | 'admin'; // Add 'admin' page type

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  useThemeStore(); // Initialize store to apply theme from localStorage

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage searchQuery={searchQuery} />;
      case 'recommended':
        return <RecommendedPage searchQuery={searchQuery} />;
      case 'admin':
        return <AdminPage />; // Render AdminPage
      default:
        return <HomePage searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
      <Header 
        searchQuery={searchQuery} 
        onSearch={setSearchQuery}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      {renderPage()}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);