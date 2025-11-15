// App.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from './pages/Home/HomePage';
import DashboardPage from './pages/admin/DashboardPage';
import AddNotificationPage from "./pages/admin/AddNotificationPage";
import EditNotificationPage from './pages/admin/EditNotificationPage';
import ReviewNotificationPage from './pages/admin/ReviewNotificationPage';
import Navbar from './components/Navbar/Navbar';
import Navigation from './components/Navigation/Navigation';
import SearchBar from './components/SearchBar/SearchBar';
import Footer from './components/Footer/Footer';
import CategoryView from './features/notifications/components/ListView/CategoryView';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar - Always visible */}
      <Navbar />
      
      {/* Navigation - Only on public pages */}
      {!isAdminRoute && <Navigation />}
      
      {/* SearchBar - Only on public pages */}
      {!isAdminRoute && <SearchBar />}
      
      {/* Main Content */}
      <main className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/addNotification" element={<AddNotificationPage />} />
          <Route path="/admin/edit/:id" element={<EditNotificationPage />} />
          <Route path="/admin/review/:id" element={<ReviewNotificationPage />} />

            {/* New route for infinite scroll per category */}
          <Route path="/notification/category/:category" element={<CategoryView />} />
        </Routes>
      </main>
      
      {/* Footer - Always visible */}
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
