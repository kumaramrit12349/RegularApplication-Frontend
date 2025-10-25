// App.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNotificationPage from "./pages/admin/AddNotificationPage";
import HomePage from './pages/Home/HomePage';
import DashboardPage from './pages/admin/DashboardPage';
import EditNotificationPage from './pages/admin/EditNotificationPage';
import ReviewNotificationPage from './pages/admin/ReviewNotificationPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/addNotification" element={<AddNotificationPage />} />
        <Route path="/admin/edit/:id" element={<EditNotificationPage />} />
        <Route path="/admin/review/:id" element={<ReviewNotificationPage />} />
      </Routes>
    </Router>
  );
};


export default App;
