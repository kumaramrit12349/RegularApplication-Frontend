import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import DashboardPage from "../pages/admin/DashboardPage";
import AddNotificationPage from "../pages/admin/AddNotificationPage";
import EditNotificationPage from "../pages/admin/EditNotificationPage";
import ReviewNotificationPage from "../pages/admin/ReviewNotificationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/addNotification" element={<AddNotificationPage />} />
        <Route path="/admin/edit/:id" element={<EditNotificationPage />} />
        <Route path="/admin/review/:id" element={<ReviewNotificationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
