import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import AIConsultantPage from './pages/AIConsultantPage';
import AdminDashboard from './pages/AdminDashboard';
import Portfolio from './pages/Portfolio';

// Simple wrapper for AI Consultant to have its own page
const AIConsultantPageWrapper = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <div className="text-center mb-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">مشاور هوشمند ساختمانی</h1>
      <p className="text-gray-600">
        هر سوالی دارید بپرسید. هوش مصنوعی ما آماده پاسخگویی به سوالات فنی و مالی شماست.
      </p>
    </div>
    <AIConsultantPage />
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ai-consultant" element={<AIConsultantPageWrapper />} />
          <Route path="/about" element={
            <div className="text-center py-20 text-gray-600">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">درباره ما</h1>
              <p>این صفحه جهت نمایش ساختار سایت ایجاد شده است.</p>
            </div>
          } />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
