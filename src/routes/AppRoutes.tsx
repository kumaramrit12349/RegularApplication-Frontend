import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import DashboardPage from "../pages/admin/DashboardPage";
import AddNotificationPage from "../pages/admin/AddNotificationPage";
import EditNotificationPage from "../pages/admin/EditNotificationPage";
import ReviewNotificationPage from "../pages/admin/ReviewNotificationPage";
import CategoryView from "../features/notifications/components/ListView/CategoryView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Existing admin routes */}
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/addNotification" element={<AddNotificationPage />} />
        <Route path="/admin/edit/:id" element={<EditNotificationPage />} />
        <Route path="/admin/review/:id" element={<ReviewNotificationPage />} />

        {/* New route for infinite scroll per category */}
        <Route path="/notification/category/:category" element={<CategoryView />} />
      </Routes>
    </Router>
  );
}
export default App;
